"use client";

import { useEffect, useState, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function ProgressBarInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setLoading(true);
    setProgress(30);

    const timer1 = setTimeout(() => setProgress(75), 120);
    const timer2 = setTimeout(() => setProgress(100), 280);
    const timer3 = setTimeout(() => {
      setLoading(false);
      setProgress(0);
    }, 450);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [pathname, searchParams]);

  if (!loading && progress === 0) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: `${progress}%`,
        height: "3.5px",
        background: "linear-gradient(90deg, #126ebb, #00d2ff)",
        boxShadow: "0 0 12px #126ebb, 0 0 6px #00d2ff",
        zIndex: 99999,
        transition: "width 200ms ease-out, opacity 150ms ease-in-out",
        opacity: loading ? 1 : 0,
        pointerEvents: "none",
      }}
    />
  );
}

export default function PageProgressBar() {
  return (
    <Suspense fallback={null}>
      <ProgressBarInner />
    </Suspense>
  );
}
