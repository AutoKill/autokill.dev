import { FaDiscord, FaGithub } from 'react-icons/fa6';

const data = [
  {
    url: 'https://github.com/AutoKill',
    icon: FaGithub,
    newTab: true,
    rel: 'noreferrer',
  },
  {
    url: 'https://discord.com/users/1096880369111945257',
    icon: FaDiscord,
    newTab: true,
    rel: 'noreferrer',
  },
];

export default function Socials() {
  return (
    <>
      <div className="flex h-full gap-5">
        {data.map((item) => (
          <a
            key={item.url}
            href={item.url}
            target={item.newTab ? '_blank' : undefined}
            rel={item.rel}
            className="text-white/60 hover:text-white transition-all"
          >
            <item.icon className="h-5 w-5" />
          </a>
        ))}
      </div>
    </>
  );
}
