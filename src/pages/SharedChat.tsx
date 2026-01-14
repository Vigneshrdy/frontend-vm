import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SharedChat = () => {
  const { shareId } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!shareId) return;

    fetch(`/api/share/${shareId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Chat not found or expired");
        return res.json();
      })
      .then((data) => setMessages(data.messages))
      .catch((err) => setError(err.message));
  }, [shareId]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/40">
      <Navbar />

      <main className="pt-24 pb-16 max-w-3xl mx-auto px-6 space-y-4">
        <h1 className="text-2xl font-semibold">Shared Conversation</h1>

        {error && (
          <div className="text-sm text-red-500">{error}</div>
        )}

        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${
              m.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                m.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              <ReactMarkdown>{m.content}</ReactMarkdown>
            </div>
          </div>
        ))}

        <p className="text-xs text-muted-foreground text-center mt-6">
          Read-only shared chat · Nyaya AI
        </p>
      </main>

      <Footer />
    </div>
  );
};

export default SharedChat;
