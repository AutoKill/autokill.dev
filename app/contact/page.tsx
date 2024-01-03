import Animation from '@/components/animation';

export default function Contact() {
  return (
    <Animation>
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Contact 📥</h1>
        <p className="opacity-90">
          Send an email to{' '}
          <span className="font-semibold">contact@autokill.dev</span> if you
          want to contact me or if you have any questions. I&apos;ll try to
          respond to you as quickly as I can. I appreciate you visiting my
          website, and I hope to speak with you soon.
        </p>
        <a
          className="bg-white/5 border border-white/10 block border-b-4 cursor-pointer p-3 rounded-lg text-center hover:scale-105 transition-all"
          href="mailto:contact@autokill.dev"
          target="_blank"
        >
          Send email
        </a>
      </div>
    </Animation>
  );
}
