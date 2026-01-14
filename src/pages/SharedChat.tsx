import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { API_BASE } from "@/lib/api";

interface SharedMessage {
  question?: string;
  answer?: string;
}

const SharedChat = () => {
  const { id } = useParams(); // ✅ MUST match route param
  const [messages, setMessages] = useState<SharedMessage[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetch(`${API_BASE}/api/share/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Chat not found or expired");
        return res.json();
      })
      .then((data) => {
        setMessages(data.messages || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/40">
      <Navbar />

      <main className="pt-24 pb-16 max-w-3xl mx-auto px-6 space-y-4">
        <h1 className="text-2xl font-semibold text-center">
          Shared Conversation
        </h1>

        {loading && (
          <p className="text-center text-muted-foreground">Loading…</p>
        )}

        {error && (
          <div className="text-sm text-red-500 text-center">{error}</div>
        )}

        {!loading &&
          messages.map((m, i) => (
            <div key={i} className="space-y-3">
              {m.question && (
                <div className="flex justify-end">
                  <div className="max-w-[80%] rounded-2xl px-4 py-3 text-sm bg-primary text-primary-foreground">
                    <ReactMarkdown>{m.question}</ReactMarkdown>
                  </div>
                </div>
              )}

              {m.answer && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-2xl px-4 py-3 text-sm bg-secondary text-secondary-foreground">
                    <ReactMarkdown>{m.answer}</ReactMarkdown>
                  </div>
                </div>
              )}
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
