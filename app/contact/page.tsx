import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact WeatherIQ",
  description: "Get in touch with the WeatherIQ team.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-12">
      <h1 className="text-3xl font-bold">Contact Us</h1>
      <p className="mt-2 text-muted text-sm">
        Questions, feedback or found something that doesn&apos;t look right?
        Send us a message below.
      </p>
      <div className="mt-8">
        <ContactForm />
      </div>
    </div>
  );
}
