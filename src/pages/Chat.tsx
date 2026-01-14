import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import NyayaChatInput from "@/components/ui/claude-style-chat-input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  MessageCircle,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  UploadCloud,
} from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
}

interface ChatInputPayload {
  message: string;
  files: File[];
  pastedContent: unknown[];
  model: string;
  isThinkingEnabled: boolean;
}

const starterMessage: Message = {
  id: "welcome",
  type: "assistant",
  content:
    "Namaste. I am Nyaya, your legal copilot. I can summarize documents, explain rights in plain language, and draft clear next steps.",
};

const quickPrompts = [
  "Explain the key clauses in this agreement",
  "Draft a simple notice to my landlord about repair delays",
  "What happens after an FIR is filed in India?",
  "Summarize this judgment and list action items",
];


  

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([starterMessage]);
  const [loading, setLoading] = useState(false);
  const [hasDocument, setHasDocument] = useState(false);
  const [sessionId] = useState(() => uuidv4());
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollAreaRef.current;
    if (el) {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }
  }, [messages]);

  
  const updateThinking = (content: string) => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === "thinking"
          ? { ...m, id: uuidv4(), content }
          : m,
      ),
    );
  };

  const handleSendMessage = async (data: ChatInputPayload) => {
    if (loading) return;

    const trimmedMessage = data.message?.trim() ?? "";
    const isUpload = Array.isArray(data.files) && data.files[0] instanceof File;

    if (!trimmedMessage && !isUpload) return;

    setLoading(true);

    /* ========= UPLOAD ========= */
    if (isUpload) {
      const file = data.files[0];

      setMessages((prev) => [
        ...prev.filter((m) => m.id !== "thinking"),
        { id: uuidv4(), type: "user", content: `📄 ${file.name}` },
        { id: "thinking", type: "assistant", content: "Analyzing the document…" },
      ]);

      try {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch(`/api/upload?session_id=${sessionId}`, {
  method: "POST",
  body: formData,
});

if (!res.ok) {
  const errorData = await res.json();
  throw new Error(errorData.detail || "Upload failed");
}

const result = await res.json();
        setHasDocument(true);
        updateThinking(result.summary ?? "Document added.");
      } catch  (err: any){
       updateThinking(err?.message || "I could not upload the document.");
      } finally {
        setLoading(false);
      }
      return;
    }

    /* ========= QUESTION ========= */
    setMessages((prev) => [
      ...prev.filter((m) => m.id !== "thinking"),
      { id: uuidv4(), type: "user", content: trimmedMessage },
      { id: "thinking", type: "assistant", content: "Thinking…" },
    ]);

    try {
      const endpoint = hasDocument ? "/api/ask-document" : "/api/ask";

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: sessionId,
          question: trimmedMessage,
        }),
      });

      if (!res.ok) throw new Error("Request failed");

      const result = await res.json();
      updateThinking(result.answer ?? "I could not find an answer yet.");
    } catch {
      updateThinking("I could not reach the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickPrompt = (prompt: string) => {
    handleSendMessage({
      message: prompt,
      files: [],
      pastedContent: [],
      model: "nyaya-standard",
      isThinkingEnabled: false,
    });
  };

  const resetChat = () => {
    setMessages([starterMessage]);
    setHasDocument(false);
  };
  const handleShare = async () => {
    try {
      const res = await fetch("/api/share-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId }),
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(err);
      }

      const data = await res.json();
      await navigator.clipboard.writeText(data.share_url);
      alert("Share link copied to clipboard");
    
    } catch (err) {
      console.error(err);
      alert("Failed to generate share link");
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/80 to-secondary/40">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6 space-y-8">
          <section className="bg-card border border-border/70 rounded-2xl shadow-elevated p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ShieldCheck className="w-4 h-4" />
                <span>Private session · Session ID {sessionId.slice(0, 8)}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-semibold leading-tight">Ask Nyaya</h1>
              <p className="text-muted-foreground max-w-2xl">
                Upload a legal document or ask a question in plain language. Nyaya summarizes, explains your rights, and outlines actionable next steps.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant={hasDocument ? "default" : "outline"} className="bg-secondary text-secondary-foreground border-dashed">
                  <UploadCloud className="w-3 h-3 mr-1" />
                  {hasDocument ? "Document in context" : "No document attached"}
                </Badge>
                <Badge variant="outline">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Legal reasoning + summaries
                </Badge>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button variant="outline" size="sm" onClick={resetChat} className="border-dashed">
                <RotateCcw className="w-4 h-4" />
                New session
              </Button>
            </div>
          </section>

          <div className="grid lg:grid-cols-4 gap-6">
            <section className="lg:col-span-3 space-y-4">
              <div className="bg-card border border-border/70 rounded-2xl shadow-book overflow-hidden">
                <div className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-border/70 bg-muted/40">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MessageCircle className="w-4 h-4" />
                    <Button
                    variant="outline"
                      size="sm"
                    onClick={handleShare}
                    >
                  🔗 Share
                    </Button>
                    <span>Conversation</span>
                  </div>
                  <div className="text-xs text-muted-foreground">Context: {hasDocument ? "document + chat" : "chat only"}</div>
                </div>

                <div className="p-4 md:p-6">
                  <div
                    ref={scrollAreaRef}
                    className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 scroll-smooth"
                  >
                    {messages.length === 0 ? (
                      <div className="rounded-xl border border-dashed border-border/70 p-6 text-center text-muted-foreground bg-muted/30">
                        Ask a question or drop a document to begin.
                      </div>
                    ) : (
                      messages.map((m) => (
                        <div key={m.id} className={`flex ${m.type === "user" ? "justify-end" : "justify-start"}`}>
                          <div
                            className={`max-w-[85%] md:max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-page ${
                              m.type === "user"
                                ? "bg-primary text-primary-foreground ml-auto"
                                : "bg-secondary text-secondary-foreground"
                            }`}
                          >
                            <ReactMarkdown
  components={{
    h3: ({ children }) => (
      <h3 className="text-base font-semibold mt-3 mb-1">{children}</h3>
    ),
    ul: ({ children }) => (
      <ul className="list-disc pl-5 space-y-1">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal pl-5 space-y-1">{children}</ol>
    ),
    li: ({ children }) => <li>{children}</li>,
    p: ({ children }) => <p className="mb-2">{children}</p>,
  }}
>
  {m.content}
</ReactMarkdown>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="mt-6">
                    <NyayaChatInput onSendMessage={handleSendMessage} disabled={loading} />
                    <p className="text-xs text-muted-foreground mt-3 text-center">
                      Nyaya provides legal information, not legal advice. For complex matters, consult a licensed lawyer.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <aside className="space-y-4">
              <div className="bg-card border border-border/70 rounded-2xl shadow-page p-4 space-y-3">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <BookOpen className="w-4 h-4 text-primary" />
                  Quick prompts
                </div>
                <div className="space-y-2">
                  {quickPrompts.map((prompt) => (
                    <Button
                      key={prompt}
                      variant="outline"
                      size="sm"
                      className="w-full justify-start text-left whitespace-normal rounded-xl px-4 py-3 border-border/60 bg-muted/30 hover:bg-muted/60"
                      onClick={() => handleQuickPrompt(prompt)}
                    >
                      {prompt}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="bg-card border border-border/70 rounded-2xl shadow-page p-4 space-y-3">
                <div className="flex items-center gap-2 text-sm font-medium text-primary">
                  <ShieldCheck className="w-4 h-4" />
                  Best results
                </div>
                <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                  <li>Ask one focused question at a time.</li>
                  <li>Attach the document you want summarized first.</li>
                  <li>Mention deadlines or jurisdictions if relevant.</li>
                  <li>Keep personal identifiers out for privacy.</li>
                </ul>
              </div>

              <div className="bg-card border border-border/70 rounded-2xl shadow-page p-4 space-y-3">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <UploadCloud className="w-4 h-4 text-primary" />
                  Supported files
                </div>
                <p className="text-sm text-muted-foreground">
                  Upload PDF, DOCX, or TXT. Nyaya will summarize, pull obligations and rights, and generate an action checklist.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Chat;
