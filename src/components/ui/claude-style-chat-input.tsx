import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Plus,
  ChevronDown,
  ArrowUp,
  X,
  FileText,
  Loader2,
  Check,
  Archive,
  Scale,
} from "lucide-react";

/* ---------------- ICONS ---------------- */
const Icons = {
  Plus,
  ArrowUp,
  X,
  FileText,
  Loader2,
  Archive,
  Scale,
  Check,
  SelectArrow: ChevronDown,
};

/* ---------------- TYPES ---------------- */
interface AttachedFile {
  id: string;
  file: File;              // 🔥 REAL File stored here
  preview: string | null;
  uploadStatus: "pending" | "complete";
}

interface NyayaChatInputProps {
  onSendMessage: (data: {
    message: string;
    files: File[];          // 🔥 MUST BE File[]
    pastedContent: any[];
    model: string;
    isThinkingEnabled: boolean;
  }) => void;
  disabled?: boolean;
}

/* ---------------- COMPONENT ---------------- */
const NyayaChatInput: React.FC<NyayaChatInputProps> = ({
  onSendMessage,
  disabled,
}) => {
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState<AttachedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* ---------------- AUTO RESIZE ---------------- */
  useEffect(() => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height =
      Math.min(textareaRef.current.scrollHeight, 300) + "px";
  }, [message]);

  /* ---------------- FILE HANDLING ---------------- */
  const handleFiles = useCallback((fileList: FileList | File[]) => {
    const incoming = Array.from(fileList).map((file) => ({
      id: crypto.randomUUID(),
      file,
      preview: file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : null,
      uploadStatus: "complete",
    }));

    setFiles((prev) => [...prev, ...incoming]);

    if (!message && incoming.length === 1) {
      setMessage("Please analyze the uploaded document.");
    }
  }, [message]);

  /* ---------------- SEND ---------------- */
  const handleSend = () => {
    if (disabled) return;
    if (!message.trim() && files.length === 0) return;

    // 🔥🔥🔥 CRITICAL FIX 🔥🔥🔥
    // Extract REAL File objects
    const realFiles: File[] = files.map((f) => f.file);

    onSendMessage({
      message,
      files: realFiles,     // ✅ CORRECT
      pastedContent: [],
      model: "nyaya-standard",
      isThinkingEnabled: false,
    });

    setMessage("");
    setFiles([]);
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  /* ---------------- KEYBOARD ---------------- */
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  /* ---------------- DRAG & DROP ---------------- */
  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => setIsDragging(false);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) handleFiles(e.dataTransfer.files);
  };

  /* ---------------- UI ---------------- */
  return (
    <div
      className="relative w-full max-w-2xl mx-auto"
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <div className="border rounded-xl bg-card shadow-book p-3 space-y-2">

        {/* FILE PREVIEWS */}
        {files.length > 0 && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {files.map((f) => (
              <div
                key={f.id}
                className="relative w-24 h-24 border rounded-lg p-2 bg-secondary"
              >
                <div className="flex items-center gap-2">
                  <Icons.FileText className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs truncate">
                    {f.file.name}
                  </span>
                </div>

                <button
                  onClick={() =>
                    setFiles((prev) => prev.filter((x) => x.id !== f.id))
                  }
                  className="absolute top-1 right-1 text-muted-foreground hover:text-foreground"
                >
                  <Icons.X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* TEXTAREA */}
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Ask a legal question in plain language..."
          rows={1}
          disabled={disabled}
          className="w-full resize-none bg-transparent outline-none text-sm"
        />

        {/* ACTION BAR */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={disabled}
              className="text-muted-foreground hover:text-foreground"
            >
              <Icons.Plus className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={handleSend}
            disabled={disabled}
            className="bg-primary text-primary-foreground px-3 py-1 rounded-lg"
          >
            <Icons.ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* DRAG OVERLAY */}
      {isDragging && (
        <div className="absolute inset-0 border-2 border-dashed border-primary bg-secondary/80 flex items-center justify-center rounded-xl z-50">
          <div className="flex flex-col items-center">
            <Icons.Archive className="w-8 h-8 text-primary mb-2" />
            <span className="text-primary font-medium">
              Drop files to upload
            </span>
          </div>
        </div>
      )}

      {/* FILE INPUT */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.docx,.txt"
        className="hidden"
        onChange={(e) => {
          if (e.target.files) handleFiles(e.target.files);
          e.target.value = "";
        }}
      />

      <p className="text-xs text-muted-foreground text-center mt-3">
        Nyaya AI provides legal information, not legal advice.
      </p>
    </div>
  );
};

export default NyayaChatInput;
