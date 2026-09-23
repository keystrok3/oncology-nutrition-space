import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const EMAIL = "oncologynutritionspace@gmail.com";
const WHATSAPP = "https://chat.whatsapp.com/JpnN1LDuHXk2OejkgmCUj5";

export default function Contact() {
  return (
    <>
      <section className="border-b border-neutral/70 bg-cream px-6 py-8 md:py-10">
        <motion.div
          className="container-narrow px-6 text-center"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="font-body text-xs uppercase tracking-widest text-sage mb-2">
            Contact Us
          </p>
          <h1 className="font-heading text-3xl md:text-4xl text-charcoal leading-snug mb-3">
            We’re Here to Connect
          </h1>
          <p className="font-body text-sm md:text-base text-charcoal/70 leading-relaxed max-w-2xl mx-auto">
            Whether you’re looking for support, exploring a partnership, or have
            a question about our work, we’d be glad to hear from you.
          </p>
        </motion.div>
      </section>

      <section className="section-padding bg-cream">
        <div className="container-wide px-6 md:px-12 lg:px-24">
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
            <article className="rounded-xl border border-neutral/80 bg-white p-7 shadow-sm md:p-9">
              <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-sage/10 text-2xl" aria-hidden="true">
                ✉
              </span>
              <p className="font-body text-xs uppercase tracking-widest text-sage mb-2">
                Email
              </p>
              <h2 className="font-heading text-2xl text-charcoal mb-3">
                Send us a message
              </h2>
              <p className="font-body text-sm leading-relaxed text-charcoal/70 mb-6">
                Write to us about patient and caregiver support, programmes,
                partnerships, or general enquiries.
              </p>
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex max-w-full break-all font-body text-sm font-medium text-sage underline underline-offset-4 hover:text-sage-dark"
              >
                {EMAIL}
              </a>
              <div className="mt-7">
                <a href={`mailto:${EMAIL}`} className="btn-primary">
                  Email Oncology Nutrition Space
                </a>
              </div>
            </article>

            <article className="rounded-xl border border-neutral/80 bg-white p-7 shadow-sm md:p-9">
              <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-sage/10 text-2xl" aria-hidden="true">
                💬
              </span>
              <p className="font-body text-xs uppercase tracking-widest text-sage mb-2">
                Community
              </p>
              <h2 className="font-heading text-2xl text-charcoal mb-3">
                Connect on WhatsApp
              </h2>
              <p className="font-body text-sm leading-relaxed text-charcoal/70 mb-6">
                Join our community to connect with patients, caregivers, and
                people interested in oncology nutrition.
              </p>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                Join the WhatsApp Community
              </a>
            </article>
          </div>

          <div className="mx-auto mt-12 max-w-3xl rounded-xl bg-tint px-6 py-7 text-center md:px-10">
            <h2 className="font-heading text-xl text-charcoal mb-2">
              Not sure where to start?
            </h2>
            <p className="font-body text-sm text-charcoal/70 leading-relaxed">
              Tell us a little about what you need, and we’ll do our best to
              point you in the right direction. For medical decisions, please
              continue to work with your healthcare team.
            </p>
          </div>

          <div className="mt-8 text-center">
            <Link to="/programs" className="font-body text-sm text-sage underline underline-offset-4 hover:text-sage-dark">
              Explore our programmes and services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
