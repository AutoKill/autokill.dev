"use client";
import Animation from "@/components/animation";
import Lanyard from "@/components/lanyard";
import Technologies from "@/components/technologies";
import Works from "@/components/works";

export default function Home() {
  return (
    <Animation>
      <div className="space-y-10">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold">
            Hey there, I&apos;m <span className="text-red-400">AutoKill</span>{" "}
            👋
          </h1>
          <p className="opacity-90">
            A software engineer from Belgrade, Serbia. I develop mainly backend
            software, but I can also do frontend. I love exploring new
            technologies and I&apos;m not afraid of trying new things.
          </p>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Technologies 💡</h1>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <Technologies />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Lanyard 📌</h1>
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
            <Lanyard />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Projects 🔧</h1>
          <p className="opacity-90">
            I built a lot of things, most of them are private. If you want to
            see all my public & open source projects, check out my{" "}
            <a
              className="text-red-400 hover:underline underline-offset-4"
              href="https://github.com/AutoKill"
              target="_blank"
            >
              GitHub profile
            </a>
            . You can find some of my projects below.
          </p>
          {/* <hr className="mt-3 h-px bg-white/20 border-0" /> */}
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
            <Works />
          </div>
        </div>
      </div>
    </Animation>
  );
}
