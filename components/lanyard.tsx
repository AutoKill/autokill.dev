"use client";

import Image from "next/image";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { useLanyardWS } from "use-lanyard";
import { motion } from "framer-motion";

const classNames = {
  online: "text-green-400",
  offline: "opacity-60",
  idle: "text-yellow-400",
  dnd: "text-red-400",
};

const statusNames = {
  online: "Online",
  offline: "Offline",
  idle: "Idle",
  dnd: "Do Not Disturb",
};

function formatTime(ms: number) {
  const totalSeconds = ms / 1000;
  const minutes = (~~(totalSeconds / 60)).toString();
  const seconds = (~~(totalSeconds % 60)).toString();
  return minutes + ":" + seconds.padStart(2, "0");
}

function getDevices(desktop: boolean, mobile: boolean, web: boolean) {
  const devices = [];
  if (desktop) devices.push("Desktop");
  if (mobile) devices.push("Mobile");
  if (web) devices.push("Web");
  return devices.length ? devices.join(", ") : "Nowhere";
}

function MarqueeText({ children, className = "", speed = 60, maxWidth = "100%", pause = 1 }: { children: string; className?: string; speed?: number; maxWidth?: string; pause?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [shouldScroll, setShouldScroll] = useState(false);
  const [distance, setDistance] = useState(0);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;
    if (container && text) {
      setShouldScroll(text.scrollWidth > container.offsetWidth);
      setDistance(text.scrollWidth - container.offsetWidth);
    }
  }, [children]);

  const xKeyframes = [0, -distance, -distance, 0, 0];
  const totalScrollTime = distance / speed;
  const totalPauseTime = pause;
  const totalDuration = totalScrollTime * 2 + totalPauseTime * 2;
  const times = [0, totalScrollTime / totalDuration, (totalScrollTime + totalPauseTime) / totalDuration, (totalScrollTime * 2 + totalPauseTime) / totalDuration, 1];

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden whitespace-nowrap ${className}`}
      style={{ maxWidth, width: "100%" }}
    >
      {shouldScroll ? (
        <motion.span
          ref={textRef}
          initial={{ x: 0 }}
          animate={{ x: xKeyframes }}
          transition={{
            x: {
              duration: totalDuration,
              times,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            },
          }}
          style={{ display: "inline-block", minWidth: "100%" }}
        >
          {children}
        </motion.span>
      ) : (
        <span ref={textRef} style={{ display: "inline-block", minWidth: "100%" }}>{children}</span>
      )}
    </div>
  );
}

export default function Lanyard() {
  const lanyard = useLanyardWS("1096880369111945257");
  const [currentTime, setCurrentTime] = useState(new Date().getTime());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().getTime());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  let avatarSrc = "";
  if (lanyard && lanyard.discord_user.avatar) {
    const isAnimated = lanyard.discord_user.avatar.startsWith("a_");
    const ext = isAnimated ? "gif" : "png";
    avatarSrc = `https://cdn.discordapp.com/avatars/${lanyard.discord_user.id}/${lanyard.discord_user.avatar}.${ext}`;
  } else if (lanyard) {
    const defaultAvatarIndex = (BigInt(lanyard.discord_user.id) >> BigInt(22)) % BigInt(6);
    avatarSrc = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarIndex}.png`;
  }

  return lanyard ? (
    <>
      <a
        className="bg-white/5 border border-white/10 border-b-4 cursor-pointer p-3 py-4 rounded-lg hover:scale-95 transition-all flex items-center"
        href={`https://discord.com/users/${lanyard.discord_user.id}`}
        target="_blank" rel="noreferrer"
      > 
        <Image
          src={avatarSrc}
          width={96}
          height={96}
          alt="discord avatar"
          className="mr-3"
        />

        <div>
          <p className="font-bold">Discord</p>
          <p>@{lanyard.discord_user.username}</p>
          <p className="opacity-80">
            {getDevices(
              lanyard.active_on_discord_desktop,
              lanyard.active_on_discord_mobile,
              lanyard.active_on_discord_web
            )}
          </p>
          <p className={`${classNames[lanyard.discord_status]}`}>
            {statusNames[lanyard.discord_status]}
          </p>
        </div>
      </a>

      {lanyard.spotify && (
        <a
          className="bg-white/5 border border-white/10 border-b-4 cursor-pointer p-3 py-4 rounded-lg hover:scale-95 transition-all flex items-center"
          href={`https://open.spotify.com/track/${lanyard.spotify.track_id}`}
          target="_blank" rel="noreferrer"
        >
          {lanyard.spotify.album_art_url && (
            <Image
              src={lanyard.spotify.album_art_url}
              width={96}
              height={96}
              alt="discord avatar"
              className="mr-3"
            />
          )}

          <div className="flex-1 min-w-0">
            <p className="font-bold">Spotify</p>
            <MarqueeText speed={15} pause={1} className="font-medium" maxWidth="100%">{`${lanyard.spotify.song}`}</MarqueeText>
            <span className="opacity-80">
              {formatTime(currentTime - lanyard.spotify.timestamps.start)}/
              {formatTime(
                lanyard.spotify.timestamps.end -
                  lanyard.spotify.timestamps.start
              )}
            </span>
            <MarqueeText className="opacity-60" speed={15} pause={1} maxWidth="100%">{lanyard.spotify.artist.split(";").join(", ")}</MarqueeText>
          </div>
        </a>
      )}
    </>
  ) : (
    <>
      <a className="bg-white/5 border border-white/10 border-b-4 p-3 py-4 rounded-lg">
        <div className="w-28 animate-pulse">
          <div className="mt-1 h-4 w-full overflow-hidden rounded-md bg-white/10" />
          <div className="mt-1 h-4 w-2/3 overflow-hidden rounded-md bg-white/10" />
        </div>
      </a>
    </>
  );
}
