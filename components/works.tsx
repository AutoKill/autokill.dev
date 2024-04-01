interface Props {
  name: string;
  description: string;
  href: string;
  date: string;
}

const data: Props[] = [
  {
    name: "autokill.dev",
    description: "Personal Website",
    href: "https://github.com/AutoKill/autokill.dev",
    date: "03/01/2024",
  },
  {
    name: "mommy-client",
    description: "Custom Discord Bot",
    href: "https://github.com/AutoKill/MommyClient",
    date: "16/01/2024",
  },
  {
    name: "matchcord-profiles",
    description: "Custom Discord Bot",
    href: "https://github.com/AutoKill/MatchcordProfiles",
    date: "31/03/2024",
  },
];

export default function Works() {
  return (
    <>
      {data.map((item, i) => (
        <a
          className="bg-white/5 border border-white/10 border-b-4 cursor-pointer p-3 py-4 rounded-lg hover:scale-105 transition-all"
          key={i}
          href={item.href}
          target="_blank"
        >
          <p className="font-bold">{item.name}</p>
          <p>{item.description}</p>
          <p className="opacity-80">{item.date}</p>
        </a>
      ))}
    </>
  );
}
