import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";

// ─── Animation Helpers ────────────────────────────────────────
function useReveal() {
  const ref      = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });
  return { ref, isInView };
}

const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12 } },
};

// ─── Data ─────────────────────────────────────────────────────
const PROGRAMS = [
  {
    title:       "Patient & Caregiver Education",
    status:      "active",
    icon:        "🎓",
    audience:    "Cancer patients and their families",
    description:
      "Daily, evidence-based nutrition articles and guidance shared directly with patients and caregivers navigating cancer treatment. We break down complex clinical information into practical, accessible advice — covering topics from managing treatment side effects through diet, to building strength during recovery.",
    highlights: [
      "Daily nutrition content across community platforms",
      "Guidance tailored to common cancer types and treatments",
      "Practical advice using locally available foods",
    ],
  },
  {
    title:       "Community Support Network",
    status:      "active",
    icon:        "🤝",
    audience:    "Patients, caregivers, and clinicians",
    description:
      "An active online community of over 1,500 members spanning all 47 counties in Kenya and reaching internationally. Members share experiences, ask questions, and access reliable oncology nutrition guidance in a safe, moderated space.",
    highlights: [
      "1,500+ members across Kenya and beyond",
      "Moderated for accuracy and safety",
      "Peer support combined with professional guidance",
    ],
  },
  {
    title:       "County Outreach Program",
    status:      "coming-soon",
    icon:        "📍",
    audience:    "Cancer patients in underserved communities",
    description:
      "Planned visits across Kenya's 47 counties to bring oncology nutrition support directly to patients in their communities. This program aims to bridge the gap between digital access and on-the-ground impact — reaching patients who may not have consistent internet access but urgently need nutritional support.",
    highlights: [
      "Targeting all 47 counties across Kenya",
      "Focus on underserved and rural communities",
      "In-person education and support sessions",
    ],
  },
  {
    title:       "Capacity Building",
    status:      "coming-soon",
    icon:        "🏗️",
    audience:    "Healthcare professionals and community health workers",
    description:
      "Training programs designed to equip nurses, clinicians, and community health workers with the knowledge and tools to integrate evidence-based nutrition into their oncology care practice. Nutrition should be a standard part of every cancer care team — not an afterthought.",
    highlights: [
      "Workshops for clinical and community health staff",
      "Evidence-based curriculum grounded in oncology nutrition research",
      "Building a network of nutrition-aware oncology practitioners",
    ],
  },
  {
    title:       "Institutional Collaboration",
    status:      "coming-soon",
    icon:        "🏥",
    audience:    "Hospitals, research institutions, and NGOs",
    description:
      "Partnering with healthcare institutions, research bodies, and non-governmental organizations to embed nutrition into standard oncology protocols. We aim to work alongside existing systems — not in isolation — to drive sustainable, systemic change.",
    highlights: [
      "Partnerships with oncology units and hospitals",
      "Collaboration with research institutions",
      "Joint programs with NGOs and health organizations",
    ],
  },
  {
    title:       "Advocacy",
    status:      "coming-soon",
    icon:        "📢",
    audience:    "Policymakers, health systems, and the public",
    description:
      "Championing policy change at local, national, and continental levels to ensure oncology nutrition is recognized as an essential component of cancer care. We use evidence, community voices, and strategic partnerships to push for meaningful reform.",
    highlights: [
      "Policy engagement at county and national levels",
      "Public awareness campaigns on nutrition and cancer",
      "Amplifying patient and caregiver voices",
    ],
  },
];

// ─── Status Badge ─────────────────────────────────────────────
function StatusBadge({ status }) {
  return status === "active" ? (
    <span className="inline-flex items-center gap-1.5 font-body text-xs uppercase tracking-widest text-sage bg-sage/10 px-3 py-1 rounded-full">
      <span className="w-1.5 h-1.5 rounded-full bg-sage inline-block" />
      Active
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 font-body text-xs uppercase tracking-widest text-charcoal/40 bg-neutral px-3 py-1 rounded-full">
      <span className="w-1.5 h-1.5 rounded-full bg-charcoal/30 inline-block" />
      Coming Soon
    </span>
  );
}

// ─── Section: Hero ────────────────────────────────────────────
function ProgramsHero() {
  return (
    <section className="section-padding bg-sage">
      <motion.div
        className="container-narrow text-center px-6"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={fadeUp}
          className="font-body text-sm uppercase tracking-widest text-white/70 mb-3"
        >
          Programs & Services
        </motion.p>
        <motion.h1
          variants={fadeUp}
          className="font-heading text-4xl md:text-5xl text-white leading-snug mb-6"
        >
          What We Do
        </motion.h1>
        <motion.p
          variants={fadeUp}
          className="font-body text-base text-white/85 leading-relaxed max-w-2xl mx-auto"
        >
          From daily nutrition education to planned county outreach, our
          programs are designed to meet cancer patients, caregivers, and
          clinicians where they are and equip them with the knowledge to
          make nutrition a cornerstone of cancer care.
        </motion.p>
      </motion.div>
    </section>
  );
}

// ─── Section: 2025 Theme ──────────────────────────────────────
function YearlyTheme() {
  const { ref, isInView } = useReveal();

  return (
    <section className="section-padding bg-cream" ref={ref}>
      <div className="container-wide px-6 md:px-12 lg:px-24">
        <motion.div
          className="bg-white border border-blue/40 rounded-2xl p-8 md:p-12 text-center shadow-sm"
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Year label */}
          <motion.span
            variants={fadeUp}
            className="inline-block font-body text-xs uppercase tracking-widest text-blue bg-blue/10 px-4 py-1.5 rounded-full mb-6"
          >
            2025 Annual Theme
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="font-heading text-2xl md:text-3xl lg:text-4xl text-charcoal leading-snug mb-6 max-w-3xl mx-auto"
          >
            "Demystifying the Myths and Misconceptions About Cancer and Nutrition"
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="font-body text-base text-charcoal/70 leading-relaxed max-w-2xl mx-auto mb-6"
          >
            Misinformation about food and cancer is widespread — and dangerous.
            This year, the Oncology Nutrition Space is dedicated to tackling
            the myths head-on. Through daily articles, community discussions,
            and outreach, we are equipping patients and caregivers with
            accurate, evidence-based answers to the questions that matter most.
          </motion.p>

          <motion.div variants={fadeUp}>
            <Link to="/blog" className="btn-primary">
              Read Our Articles
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Section: Programs List ───────────────────────────────────
function ProgramsList() {
  const { ref, isInView } = useReveal();

  return (
    <section className="section-padding bg-tint" ref={ref}>
      <div className="container-wide px-6 md:px-12 lg:px-24">

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <p className="font-body text-sm uppercase tracking-widest text-sage mb-3">
            Our Programs
          </p>
          <h2 className="font-heading text-3xl md:text-4xl text-charcoal leading-snug">
            Building a Comprehensive <br className="hidden md:block" />
            Oncology Nutrition System
          </h2>
        </motion.div>

        {/* Program cards */}
        <motion.div
          className="flex flex-col gap-6"
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {PROGRAMS.map(({ title, status, icon, audience, description, highlights }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              className="bg-white rounded-lg border border-neutral shadow-sm overflow-hidden"
            >
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-start gap-6">

                  {/* Icon */}
                  <span className="text-4xl shrink-0">{icon}</span>

                  {/* Content */}
                  <div className="flex-1">
                    {/* Title row */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                      <h3 className="font-heading text-xl text-charcoal">
                        {title}
                      </h3>
                      <StatusBadge status={status} />
                    </div>

                    {/* Audience */}
                    <p className="font-body text-xs uppercase tracking-widest text-blue mb-3">
                      For: {audience}
                    </p>

                    {/* Description */}
                    <p className="font-body text-sm text-charcoal/70 leading-relaxed mb-5">
                      {description}
                    </p>

                    {/* Highlights */}
                    <ul className="flex flex-col gap-2">
                      {highlights.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-2 font-body text-sm text-charcoal/70"
                        >
                          <span className="text-sage mt-0.5 shrink-0">✓</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Section: CTA ─────────────────────────────────────────────
function ProgramsCTA() {
  const { ref, isInView } = useReveal();

  return (
    <section className="section-padding bg-sage" ref={ref}>
      <motion.div
        className="container-narrow text-center px-6"
        variants={stagger}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.h2
          variants={fadeUp}
          className="font-heading text-3xl md:text-4xl text-white leading-snug mb-4"
        >
          Get Involved
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="font-body text-base text-white/85 leading-relaxed max-w-xl mx-auto mb-10"
        >
          Whether you are a patient seeking support, a clinician looking to
          collaborate, or an organization interested in partnership — we would
          love to hear from you.
        </motion.p>
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          {/* [PLACEHOLDER] — update href with actual WhatsApp link */}
          <a
            href="https://chat.whatsapp.com/JpnN1LDuHXk2OejkgmCUj5"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-white text-sage font-body font-medium text-sm px-6 py-3 rounded-md hover:bg-neutral transition-colors duration-200"
          >
            Join Our Community
          </a>
          <Link
            to="/contact"
            className="inline-block border border-white text-white font-body font-medium text-sm px-6 py-3 rounded-md hover:bg-white hover:text-sage transition-colors duration-200"
          >
            Partner With Us
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── Page Assembly ────────────────────────────────────────────
export default function Programs() {
  return (
    <>
      <ProgramsHero />
      <YearlyTheme />
      <ProgramsList />
      <ProgramsCTA />
    </>
  );
}