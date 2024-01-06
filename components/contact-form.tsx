"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const SUCCESS_COLOR = "#34d399";
const ERROR_COLOR = "#f87171";
const LOADING_COLOR = "#333333";

export default function ContactForm() {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const isValidEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) || email === "";
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValidEmail() || !message) {
      toast.error("Please enter a valid email address and message.", {
        id: "error-toast",
        position: "top-right",
        style: {
          background: ERROR_COLOR,
          color: "#fff",
        },
        iconTheme: {
          primary: "#fff",
          secondary: ERROR_COLOR,
        },
      });
      return;
    }

    toast.loading("Please wait while message is being sent...", {
      id: "loading-toast",
      position: "top-right",
      style: {
        background: LOADING_COLOR,
        color: "#fff",
      },
      iconTheme: {
        primary: "#fff",
        secondary: LOADING_COLOR,
      },
    });

    await fetch("/api/sendMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        message,
      }),
    });

    toast.remove("loading-toast");
    toast.success(
      "Thank you for your message! I will get back to you as soon as I can.",
      {
        id: "success-toast",
        position: "top-right",
        style: {
          background: SUCCESS_COLOR,
          color: "#fff",
        },
        iconTheme: {
          primary: "#fff",
          secondary: SUCCESS_COLOR,
        },
      }
    );

    setEmail("");
    setMessage("");
  };

  return (
    <form className="space-y-4" onSubmit={handleFormSubmit}>
      <div className="space-y-2">
        <label className="block font-semibold" htmlFor="email">
          Email
        </label>
        <input
          className="bg-white/5 border border-white/10 block border-b-4 p-3 rounded-lg w-full"
          onChange={handleEmailChange}
          value={email}
          placeholder="johndoe@gmail.com"
          id="email"
          type="text"
          maxLength={32}
        />
      </div>

      <div className="space-y-2">
        <label className="block font-semibold" htmlFor="message">
          Message
        </label>
        <textarea
          className="bg-white/5 border border-white/10 block border-b-4 p-3 rounded-lg w-full"
          style={{ resize: "none" }}
          onChange={handleMessageChange}
          value={message}
          placeholder="Hello AutoKill, I wanted to say..."
          id="message"
          rows={4}
          maxLength={264}
        />
      </div>

      <button
        className="w-full bg-white/5 border border-white/10 block border-b-4 cursor-pointer p-3 rounded-lg text-center hover:scale-95 transition-all"
        type="submit"
      >
        Send message
      </button>
      <Toaster />
    </form>
  );
}
