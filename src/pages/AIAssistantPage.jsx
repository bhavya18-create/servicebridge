import { Brain } from 'lucide-react';
import { SectionHeader } from '../components/ui/SectionHeader';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';

export function AIAssistantPage({
  chatMessages,
  chatInput,
  setChatInput,
  isBotTyping,
  chatContainerRef,
  chatInputRef,
  onSend,
}) {
  return (
    <section className="mx-auto max-w-4xl px-4">
      <SectionHeader
        eyebrow="AI Assistant"
        title="Conversational smart assistance"
        description="Compare quotes, schedule service, or request emergency support instantly."
      />
      <GlassCard className="overflow-hidden p-0">
        <div className="h-1 w-full bg-brand-gradient" />
        <div className="flex items-center gap-4 border-b border-glass-border p-5">
          <div className="relative">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gradient">
              <Brain className="h-7 w-7 text-white" />
            </div>
            <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-surface-raised bg-emerald-400" />
          </div>
          <div>
            <h4 className="font-bold text-white">ServiceBridge AI</h4>
            <p className="text-sm text-slate-400">Online · typically replies in seconds</p>
          </div>
        </div>
        <div ref={chatContainerRef} className="scrollbar-thin h-[420px] space-y-4 overflow-y-auto p-5">
          {chatMessages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={
                  message.role === 'user'
                    ? 'max-w-[85%] rounded-3xl bg-brand-gradient px-5 py-3.5 text-sm text-white shadow-glow sm:max-w-xs'
                    : 'max-w-[85%] rounded-3xl bg-gradient-to-r from-sky-600 via-blue-600 to-blue-700 px-5 py-3.5 text-sm text-white shadow-lg sm:max-w-md'
                }
              >
                {message.text}
              </div>
            </div>
          ))}
          {isBotTyping && (
            <div className="flex justify-start">
              <div className="rounded-3xl bg-gradient-to-r from-sky-600/30 to-blue-700/30 border border-blue-500/20 px-5 py-4">
                <p className="mb-2 text-xs text-slate-300">AI is thinking</p>
                <div className="flex items-center gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="h-2 w-2 animate-pulse rounded-full bg-blue-400"
                      style={{ animationDelay: `${i * 150}ms` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center gap-3 border-t border-glass-border bg-white dark:bg-[#1a1a1a] p-5">
          <input
            ref={chatInputRef}
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') onSend();
            }}
            placeholder="Type your message…"
            className="input flex-1"
          />
          <Button onClick={onSend}>Send</Button>
        </div>
      </GlassCard>
    </section>
  );
}
