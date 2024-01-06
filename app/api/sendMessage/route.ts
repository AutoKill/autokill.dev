export async function POST(req: Request) {
  try {
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
