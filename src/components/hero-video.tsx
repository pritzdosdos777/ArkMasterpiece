"use client";

import { useEffect, useRef, useState } from "react";
import { X, Volume2, VolumeX } from "lucide-react";
import { useReducedMotion } from "motion/react";

export function HeroVideo({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
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
              ref={videoRef}
              id="hero-introduction-video"
              aria-label="Ark Masterpiece introduction video"
              src="/brand/videos/menu-intro.mp4"
              poster="/brand/videos/menu-intro.webp"
              width={1920}
              height={1080}
              controls
              autoPlay={!reduced}
              muted={muted}
              onVolumeChange={(event) =>
                setMuted(
                  event.currentTarget.muted || event.currentTarget.volume === 0,
                )
              }
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
                setMuted(true);
                setDismissed(true);
              }}
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>
          <button
            type="button"
            className="hero-video-sound"
            aria-controls="hero-introduction-video"
            onClick={() => {
              const video = videoRef.current;
              if (!video) return;
              const shouldMute = !video.muted && video.volume > 0;
              video.muted = shouldMute;
              if (!shouldMute && video.volume === 0) video.volume = 1;
              setMuted(shouldMute);
            }}
          >
            {muted ? (
              <VolumeX size={20} aria-hidden="true" />
            ) : (
              <Volume2 size={20} aria-hidden="true" />
            )}
            {muted ? "Unmute video" : "Mute video"}
          </button>
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
