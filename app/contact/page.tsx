import Animation from "@/components/animation";
import ContactForm from "@/components/contact-form";

export default function Contact() {
  const getTime = () => {
    const date = new Date();

    const hours = date.getHours() % 12 || 12;
    const minutes = date.getMinutes();
    const suffix = date.getHours() >= 12 ? "PM" : "AM";

    return `${hours}:${minutes < 10 ? "0" : ""}${minutes} ${suffix}`;
  };

  const getAwakeStatus = () => {
    const hour = new Date().getHours();

    return hour >= 23 || hour <= 7 ? "asleep" : "awake";
  };

  return (
    <Animation>
      <div className="space-y-10">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Contact 📥</h1>
          <p className="opacity-90">
            If you have any questions or would like to get in touch, feel free
            to reach out using the form below or by sending an email to{" "}
            <span className="font-bold">contact@autokill.dev</span>. I&apos;ll
            do my best to respond as quickly as possible. Your feedback is
            valuable, and I look forward to hearing from you. Thank you for
            visiting my website!
          </p>

          <ContactForm />
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Do I Sleep 😴</h1>
          <p className="opacity-90">
            As of <strong>{getTime()}</strong>, I&apos;m currently{" "}
            <strong>{getAwakeStatus()}</strong>. However, don&apos;t worry if
            it&apos;s late — you can still send an email, and I&apos;ll get back
            to you once I&apos;m awake. Your messages are important to me!
          </p>
        </div>
      </div>
    </Animation>
  );
}
