import {
  FaCss3,
  FaDocker,
  FaGit,
  FaGithub,
  FaHtml5,
  FaJava,
  FaPython,
  FaReact,
  FaUbuntu,
} from 'react-icons/fa6';
import {
  SiCsharp,
  SiJavascript,
  SiTailwindcss,
  SiTypescript,
  SiNextdotjs,
  SiMongodb,
  SiMysql,
} from 'react-icons/si';

interface Props {
  name: string;
  icon: any;
}

const data: Props[] = [
  {
    name: 'Java',
    icon: FaJava,
  },
  {
    name: 'JavaScript',
    icon: SiJavascript,
  },
  {
    name: 'TypeScript',
    icon: SiTypescript,
  },
  {
    name: 'C#',
    icon: SiCsharp,
  },
  {
    name: 'Python',
    icon: FaPython,
  },
  {
    name: 'HTML',
    icon: FaHtml5,
  },
  {
    name: 'CSS',
    icon: FaCss3,
  },
  {
    name: 'React',
    icon: FaReact,
  },
  {
    name: 'Next.js',
    icon: SiNextdotjs,
  },
  {
    name: 'TailwindCSS',
    icon: SiTailwindcss,
  },
  {
    name: 'Ubuntu',
    icon: FaUbuntu,
  },
  {
    name: 'Git',
    icon: FaGit,
  },
  {
    name: 'GitHub',
    icon: FaGithub,
  },
  {
    name: 'Docker',
    icon: FaDocker,
  },
  {
    name: 'MongoDB',
    icon: SiMongodb,
  },
  {
    name: 'MySQL',
    icon: SiMysql,
  },
];

export default function Technologies() {
  return (
    <>
      {data.map((item, i) => (
        <div
          className="flex items-center space-x-2 hover:text-red-400 transition-all"
          key={i}
        >
          <item.icon />
          <p className="pointer-events-none">{item.name}</p>
        </div>
      ))}
    </>
  );
}
