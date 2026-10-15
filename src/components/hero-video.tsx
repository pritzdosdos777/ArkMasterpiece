"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useReducedMotion } from "motion/react";

export function HeroVideo({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), 1000);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section
      className={`hero hero-with-intro${visible ? " hero-video-visible" : ""}`}
    >
      {children}
      {visible && (
        <div
          className="hero-video-panel"
          aria-label="Ark Masterpiece introduction"
        >
          <div className="hero-video-frame">
            <video
              aria-label="Ark Masterpiece introduction video"
              src="/brand/videos/menu-intro.mp4"
              poster="/brand/videos/menu-intro.webp"
              width={1920}
              height={1080}
              controls
              autoPlay={!reduced}
              muted
              loop={!reduced}
              playsInline
              preload="metadata"
              onError={() => setFailed(true)}
            />
            <button
              type="button"
              className="hero-video-close"
              aria-label="Close introduction video"
              onClick={() => {
                setVisible(false);
                setDismissed(true);
              }}
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>
          {failed && (
            <p role="status">
              Unable to load the video.{" "}
              <a
                href="/brand/videos/menu-intro.mp4"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open video directly
              </a>
              .
            </p>
          )}
        </div>
      )}
      {!visible && dismissed && (
        <button
          className="hero-video-replay button button-outline"
          onClick={() => {
            setFailed(false);
            setVisible(true);
          }}
        >
          Watch introduction
        </button>
      )}
    </section>
  );
}
