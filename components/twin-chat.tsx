"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/lib/profile";

type Message = { role: "user" | "assistant"; content: string };

const STARTERS = [
  "What did you actually build in HealthMate?",
  "Why neuroscience, then AI?",
  "What is your strongest evidence of agent engineering?",
];

// Reads the SSE passthrough from /api/twin and yields content deltas.
async function* streamReply(res: Response) {
  const reader = res.body!.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    const chunks = buffer.split("\n\n");
    buffer = chunks.pop() ?? "";

    for (const chunk of chunks) {
      for (const line of chunk.split("\n")) {
        if (!line.startsWith("data: ")) continue;
        const data = line.slice(6).trim();
        if (data === "[DONE]") return;
        try {
          const delta = JSON.parse(data)?.choices?.[0]?.delta?.content;
          if (delta) yield delta as string;
        } catch {
          // OpenRouter interleaves keep-alive comments; ignore anything unparseable.
        }
      }
    }
  }
}

export function TwinChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [messages]);

  async function send(text: string) {
    const question = text.trim();
    if (!question || busy) return;

    const next: Message[] = [...messages, { role: "user", content: question }];
    setMessages(next);
    setInput("");
    setError(null);
    setBusy(true);

    try {
      const res = await fetch("/api/twin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      if (!res.ok) {
        const { error: message } = await res.json().catch(() => ({ error: null }));
        setError(message ?? "Something went wrong.");
        setBusy(false);
        return;
      }

      setMessages([...next, { role: "assistant", content: "" }]);
      for await (const delta of streamReply(res)) {
        setMessages((current) => {
          const copy = [...current];
          copy[copy.length - 1] = {
            role: "assistant",
            content: copy[copy.length - 1].content + delta,
          };
          return copy;
        });
      }
    } catch {
      setError("Could not reach the twin.");
    } finally {
      setBusy(false);
    }
  }

  const started = messages.length > 0;

  return (
    <div className="max-w-2xl">
      <p className="text-xl leading-snug font-medium tracking-tight text-balance sm:text-2xl">
        Rather than read all of this, ask an AI version of me about it.
      </p>
      <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
        It answers from my actual background, and tells you when it does not know
        something rather than guessing.
      </p>

      <div className="mt-8 border border-rule bg-panel">
        <div className="flex items-center justify-between border-b border-rule px-4 py-2 font-mono text-[11px] tracking-wide text-muted uppercase">
          <span>Twin</span>
          <span className={busy ? "text-accent" : ""}>{busy ? "Thinking" : "Ready"}</span>
        </div>

        {started && (
          <div ref={logRef} className="max-h-96 space-y-4 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => (
              <div key={i}>
                <div className="font-mono text-[11px] tracking-wide text-muted uppercase">
                  {m.role === "user" ? "You" : profile.name}
                </div>
                <div
                  className={`mt-1 text-sm leading-relaxed whitespace-pre-wrap ${
                    m.role === "user" ? "text-muted" : ""
                  }`}
                >
                  {m.content}
                  {busy && m.role === "assistant" && i === messages.length - 1 && (
                    <span className="ml-0.5 inline-block h-4 w-1.5 translate-y-0.5 animate-pulse bg-accent" />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {!started && (
          <ul className="divide-y divide-rule border-b border-rule">
            {STARTERS.map((q) => (
              <li key={q}>
                <button
                  type="button"
                  onClick={() => send(q)}
                  className="w-full px-4 py-3 text-left font-mono text-xs text-muted transition-colors hover:text-accent"
                >
                  &gt; {q}
                </button>
              </li>
            ))}
          </ul>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex items-center gap-2 border-t border-rule px-4 py-3"
        >
          <span className="font-mono text-xs text-accent" aria-hidden="true">
            &gt;
          </span>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            maxLength={1000}
            disabled={busy}
            aria-label="Ask the digital twin a question"
            placeholder="Ask about my work"
            className="min-w-0 flex-1 bg-transparent font-mono text-xs outline-none placeholder:text-muted disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={busy || !input.trim()}
            className="font-mono text-[11px] tracking-wide text-muted uppercase transition-colors enabled:hover:text-accent disabled:opacity-40"
          >
            Send
          </button>
        </form>
      </div>

      {error && <p className="mt-3 font-mono text-xs text-accent">{error}</p>}

      <p className="mt-4 font-mono text-xs text-muted">
        AI, so check anything that matters.{" "}
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent underline underline-offset-4"
        >
          Ask me directly
        </a>
        .
      </p>
    </div>
  );
}
