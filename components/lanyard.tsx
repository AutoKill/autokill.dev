"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLanyardWS } from "use-lanyard";

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

export default function Lanyard() {
  const lanyard = useLanyardWS("1096880369111945257");
  const [currentTime, setCurrentTime] = useState(new Date().getTime());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().getTime());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return lanyard ? (
    <>
      <a
        className="bg-white/5 border border-white/10 border-b-4 cursor-pointer p-3 py-4 rounded-lg hover:scale-95 transition-all flex items-center"
        href={`https://discord.com/users/${lanyard.discord_user.id}`}
        target="_blank"
      >
        <Image
          src={`https://cdn.discordapp.com/avatars/${lanyard.discord_user.id}/${lanyard.discord_user.avatar}.gif`}
          width={64}
          height={64}
          alt="discord avatar"
          className="mr-3"
        />

        <div>
          <p className="font-bold">Discord</p>
          <p>{lanyard.discord_user.username}</p>
          <p className={`${classNames[lanyard.discord_status]}`}>
            {statusNames[lanyard.discord_status]}
          </p>
        </div>
      </a>

      {lanyard.spotify && (
        <a
          className="bg-white/5 border border-white/10 border-b-4 cursor-pointer p-3 py-4 rounded-lg hover:scale-95 transition-all flex items-center"
          href={`https://open.spotify.com/track/${lanyard.spotify.track_id}`}
          target="_blank"
        >
          {lanyard.spotify.album_art_url && (
            <Image
              src={lanyard.spotify.album_art_url}
              width={64}
              height={64}
              alt="discord avatar"
              className="mr-3"
            />
          )}

          <div>
            <p className="font-bold">Spotify</p>
            <p>
              {lanyard.spotify.song} (
              <span className="opacity-60">
                {formatTime(currentTime - lanyard.spotify.timestamps.start)}/
                {formatTime(
                  lanyard.spotify.timestamps.end -
                    lanyard.spotify.timestamps.start
                )}
              </span>
              )
            </p>
            <p className="opacity-60">{lanyard.spotify.artist}</p>
          </div>
        </a>
      )}
    </>
  ) : (
    <>
      <a className="bg-white/5 border border-white/10 border-b-4 p-3 py-4 rounded-lg">
        <div className="w-28 animate-pulse">
          <div className="mt-1 h-4 w-full overflow-hidden rounded-md bg-white/10"></div>
          <div className="mt-1 h-4 w-2/3 overflow-hidden rounded-md bg-white/10"></div>
        </div>
      </a>
    </>
  );
}
