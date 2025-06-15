import Animation from "@/components/animation";

export default function NotFound() {
  return (
    <Animation>
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Not Found 🚫</h1>
        <p className="opacity-90">
          You have reached a page that does not exist. If you think this is a
          mistake, please contact me.
        </p>
        <a
          className="bg-white/5 border border-white/10 block border-b-4 cursor-pointer p-3 rounded-lg text-center hover:scale-95 transition-all"
          href="/"
        >
          Go back
        </a>
      </div>
    </Animation>
  );
}
