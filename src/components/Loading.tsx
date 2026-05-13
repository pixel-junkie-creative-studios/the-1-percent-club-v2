'use client';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center font-mono">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-[2px] bg-white animate-pulse" />
        <p className="text-[10px] text-white uppercase tracking-[0.5em] animate-pulse">
          INITIALIZING VENTURE TERMINAL...
        </p>
      </div>
    </div>
  );
}
