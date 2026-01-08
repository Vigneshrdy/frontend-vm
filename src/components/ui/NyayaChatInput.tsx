import { useRef, useState } from "react";
import { Plus } from "lucide-react";

export function NyayaChatInput({
  onSendMessage,
  disabled,
}: {
  onSendMessage: (data: {
    message: string;
    files: File[];
    pastedContent: any[];
    model: string;
    isThinkingEnabled: boolean;
  }) => void;
  disabled?: boolean;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState("");

  return (
    <div className="relative w-full">
      {/* 🔥 REAL FILE INPUT */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.docx,.txt"
        hidden
        onChange={(e) => {
          const files = e.target.files;
          if (!files || files.length === 0) return;

          // ✅ SEND REAL FILE OBJECT
          onSendMessage({
            message: "",
            files: [files[0]],
            pastedContent: [],
            model: "nyaya-standard",
            isThinkingEnabled: false,
          });

          // reset input
          e.target.value = "";
        }}
      />

      <div className="flex items-center gap-2 border rounded-xl px-3 py-2 bg-card">
        {/* Upload button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled}
          className="text-muted-foreground hover:text-foreground"
        >
          <Plus className="w-5 h-5" />
        </button>

        {/* Text input */}
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask a legal question…"
          rows={1}
          disabled={disabled}
          className="flex-1 resize-none bg-transparent outline-none text-sm"
        />

        {/* Send button */}
        <button
          onClick={() => {
            if (!message.trim()) return;

            onSendMessage({
              message,
              files: [],
              pastedContent: [],
              model: "nyaya-standard",
              isThinkingEnabled: false,
            });

            setMessage("");
          }}
          disabled={disabled}
          className="px-3 py-1 rounded-lg bg-primary text-primary-foreground"
        >
          ↑
        </button>
      </div>
    </div>
  );
}
