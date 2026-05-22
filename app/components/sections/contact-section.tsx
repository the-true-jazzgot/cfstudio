import { client } from "@/sanity/lib/client";

interface ContactSettings {
  number?: string;
  email?: string;
}

function PhoneIcon() {
  return (
    <svg aria-hidden="true" className="h-9 w-9 flex-none md:h-11 md:w-11" viewBox="0 0 24 24" fill="none">
      <path
        d="M6.6 4.4 8.9 3.8c.7-.2 1.4.2 1.6.9l.8 2.7c.2.6 0 1.2-.5 1.6l-1.4 1.1c.9 1.9 2.5 3.5 4.5 4.5l1.1-1.4c.4-.5 1-.7 1.6-.5l2.7.8c.7.2 1.1.9.9 1.6l-.6 2.3c-.2.7-.8 1.2-1.5 1.2C10.7 18.6 5.4 13.3 5.4 6c0-.8.5-1.4 1.2-1.6Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg aria-hidden="true" className="h-9 w-9 flex-none md:h-11 md:w-11" viewBox="0 0 24 24" fill="none">
      <path
        d="M4.8 6.5h14.4c.9 0 1.6.7 1.6 1.6v7.8c0 .9-.7 1.6-1.6 1.6H4.8c-.9 0-1.6-.7-1.6-1.6V8.1c0-.9.7-1.6 1.6-1.6Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m4 7.4 8 5.4 8-5.4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default async function ContactSection() {
  const settings = await client.fetch<ContactSettings>(
    `*[_type == "generalSettings"][0]{number, email}`
  );

  return (
    <section id="contact" className="relative z-10 flex min-h-screen items-center justify-center px-8 py-24 text-cyan-500">
      <div className="flex w-full max-w-5xl flex-col items-start gap-8 text-left">
        {settings?.number && (
          <a
            href={`tel:${settings.number}`}
            className="flex min-w-0 items-center gap-5 text-3xl font-semibold leading-tight drop-shadow-[0_3px_18px_rgba(0,0,0,0.9)] [-webkit-text-stroke:0.5px_rgba(0,0,0,0.25)] md:text-6xl"
          >
            <PhoneIcon />
            <span className="min-w-0 break-words">{settings.number}</span>
          </a>
        )}

        {settings?.email && (
          <a
            href={`mailto:${settings.email}`}
            className="flex min-w-0 items-center gap-5 text-3xl font-semibold leading-tight drop-shadow-[0_3px_18px_rgba(0,0,0,0.9)] [-webkit-text-stroke:0.5px_rgba(0,0,0,0.25)] md:text-6xl"
          >
            <EmailIcon />
            <span className="min-w-0 break-all md:break-words">{settings.email}</span>
          </a>
        )}
      </div>
    </section>
  );
}
