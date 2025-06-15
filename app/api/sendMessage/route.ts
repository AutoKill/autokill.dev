import { RateLimiter } from "limiter";

// In-memory map to store rate limiters per IP
const ipLimiters = new Map<string, RateLimiter>();

export async function POST(req: Request) {
	try {
		const forwarded = req.headers.get("x-forwarded-for");
		const ip = forwarded ? forwarded.split(",")[0].trim() : undefined;

		if (!ip) {
			console.error("Could not determine client IP address.");
			return new Response(JSON.stringify({ success: false, error: "Could not determine client IP address." }), {
				status: 400,
			});
		}

		let limiter = ipLimiters.get(ip);
		if (!limiter) {
			limiter = new RateLimiter({ tokensPerInterval: 2, interval: "minute", fireImmediately: true });
			ipLimiters.set(ip, limiter);
		}

		const remaining = await limiter.removeTokens(1);
		if (remaining < 0) {
			return new Response(
				JSON.stringify({ success: false, error: "You are being rate limited. Please try again in a minute." }),
				{ status: 429 }
			);
		}

		const contentType = req.headers.get("Content-Type");
		if (!contentType || !contentType.includes("application/json")) {
			console.error("Invalid content type. Expected application/json.");
			return new Response(JSON.stringify({ success: false }), {
				status: 400,
			});
		}

		const { email, message } = await req.json();

		const response = await fetch(process.env.webhookUrl!, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: "Contact Form",
				content: "<@1096880369111945257>",
				embeds: [
					{
						title: "New Message",
						color: 0x00ff00,
						fields: [
							{
								name: "Email",
								value: email,
							},
							{
								name: "Message",
								value: message,
							},
						],
					},
				],
			}),
		});

		if (!response.ok) {
			console.error("Failed to send request. Status:", response.status);
			return new Response(JSON.stringify({ success: false }), {
				status: response.status,
			});
		}

		return new Response(JSON.stringify({ success: true }), {
			status: 200,
		});
	} catch (error) {
		console.error("Error processing request:", error);
		return new Response(JSON.stringify({ success: false }), {
			status: 500,
		});
	}
}
