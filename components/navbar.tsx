"use client";

import Link from "next/link";
import Socials from "./socials";
import { usePathname } from "next/navigation";

interface Props {
  name: string;
  href: string;
}

const data: Props[] = [
  {
    name: "home",
    href: "/",
  },
  {
    name: "contact",
    href: "/contact",
  },
];

export default function Navbar() {
  const pathName = usePathname();

  const handleClick = (href: string) => {
    if (pathName === href) return;

    void new Audio("/pop.mp3").play().catch(() => null);
  };

  return (
    <div className="py-6 mb-2">
      <div className="flex flex-row space-x-2 items-center">
        <div className="flex-1">
          <div className="flex space-x-4">
            {data.map((item) => (
              <div
                key={item.name}
                className="font-semibold cursor-pointer hover:text-white/60 transition-all"
              >
                <Link href={item.href} onClick={() => handleClick(item.href)}>
                  {item.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
        <Socials />
      </div>
      <hr className="mt-3 h-px bg-white/20 border-0" />
    </div>
  );
}
