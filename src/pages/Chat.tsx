import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import  NyayaChatInput  from "@/components/ui/claude-style-chat-input";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasDocument, setHasDocument] = useState(false);
  const [sessionId] = useState(uuidv4());

  const handleSendMessage = async (data: any) => {
    if (loading) return;
    setLoading(true);

    /* ========= UPLOAD ========= */
    if (Array.isArray(data.files) && data.files[0] instanceof File) {
      const file = data.files[0];

      setMessages((p) => [
        ...p,
        { id: uuidv4(), type: "user", content: `📄 ${file.name}` },
        { id: "thinking", type: "assistant", content: "Analyzing document…" },
      ]);

      try {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch(`/api/upload?session_id=${sessionId}`, {
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error("Upload failed");

        const result = await res.json();
        setHasDocument(true);

        setMessages((p) =>
          p.map((m) =>
            m.id === "thinking"
              ? { ...m, content: result.summary }
              : m
          )
        );
      } catch {
        setMessages((p) =>
          p.map((m) =>
            m.id === "thinking"
              ? { ...m, content: "Upload failed." }
              : m
          )
        );
      } finally {
        setLoading(false);
      }
      return;
    }

    /* ========= QUESTION ========= */
    setMessages((p) => [
      ...p,
      { id: uuidv4(), type: "user", content: data.message },
      { id: "thinking", type: "assistant", content: "Thinking…" },
    ]);

    try {
      const endpoint = hasDocument ? "/api/ask-document" : "/api/ask";

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: sessionId,
          question: data.message,
        }),
      });

      const result = await res.json();

      setMessages((p) =>
        p.map((m) =>
          m.id === "thinking"
            ? { ...m, content: result.answer }
            : m
        )
      );
    } catch {
      setMessages((p) =>
        p.map((m) =>
          m.id === "thinking"
            ? { ...m, content: "Server error." }
            : m
        )
      );
    } finally {
      setLoading(false);
    }
  };
return (
  <div className="flex flex-col h-screen p-6">
    {/* CHAT MESSAGES */}
    <div className="flex-1 overflow-y-auto space-y-4 max-w-3xl mx-auto w-full">
      {messages.map((m) => (
        <div
          key={m.id}
          className={`px-4 py-2 rounded-xl max-w-[75%] text-sm leading-relaxed ${
            m.type === "user"
              ? "ml-auto bg-primary text-primary-foreground"
              : "mr-auto bg-secondary text-foreground"
          }`}
        >
          {m.content}
        </div>
      ))}
    </div>

    {/* INPUT */}
    <div className="mt-4">
      <NyayaChatInput
        onSendMessage={handleSendMessage}
        disabled={loading}
      />
    </div>
  </div>
);
};

export default Chat;
