"use client";

import Image from "next/image";
import { useLanyardWS } from "use-lanyard";

const classNames = {
  online: "text-green-400",
  offline: "opacity-60",
  idle: "text-yellow-400",
  dnd: "text-red-400",
};

const capitalize = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

export default function Lanyard() {
  const lanyard = useLanyardWS("1096880369111945257");
  let status = lanyard?.discord_status.toString();
  if (status === "dnd") status = "Do Not Disturb";

  return lanyard ? (
    <>
      <a
        className="bg-white/5 border border-white/10 border-b-4 cursor-pointer p-3 py-4 rounded-lg hover:scale-95 transition-all flex items-center"
        href="https://discord.com/users/1096880369111945257"
        target="_blank"
      >
        <Image
          src={`https://cdn.discordapp.com/avatars/1096880369111945257/${lanyard.discord_user.avatar}.png`}
          width={64}
          height={64}
          alt="discord avatar"
          className="mr-3"
        />

        <div>
          <p className="font-bold">Discord</p>
          <p>@{lanyard.discord_user.username}</p>
          <p className={`${classNames[lanyard.discord_status]}`}>
            {capitalize(status!)}
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
            <p>{lanyard.spotify.song}</p>
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
