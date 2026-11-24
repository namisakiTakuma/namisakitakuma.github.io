"use client";

import { useEffect, useRef } from "react";

// 詳細ページの動画。開いた時点では読み込まず（preload="none"）、画面に入ったら音なしで繰り返し再生する。
// 動きを減らす設定やデータセーバーのときは自動で再生せず、再生ボタンを押したときに初めて読み込む。
// 縦長の動画は、画面の高さに収まるよう幅を狭めて真ん中に置く
export function ProjectVideo({
  src,
  poster,
  width,
  height,
  label,
}: {
  src: string;
  poster: string;
  width: number;
  height: number;
  label: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    // React は muted を HTML の属性に出さないので、自動再生の前に自分で付ける
    video.muted = true;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const saveData = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection?.saveData;
    if (reduceMotion || saveData) return;

    let visible = false;
    // 見えているあいだに止められたら、見た人が止めたということなので、もう自動では動かさない
    let auto = true;
    const onPause = () => {
      if (visible) auto = false;
    };
    video.addEventListener("pause", onPause);
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (!auto) return;
        if (visible) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.5 },
    );
    observer.observe(video);
    return () => {
      observer.disconnect();
      video.removeEventListener("pause", onPause);
    };
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      preload="none"
      muted
      loop
      playsInline
      controls
      aria-label={label}
      style={{ aspectRatio: `${width} / ${height}` }}
      className={`block w-full rounded-xl border border-neutral-200 bg-neutral-100 object-cover ${
        height > width ? "mx-auto max-w-72" : ""
      }`}
    />
  );
}
