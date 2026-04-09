import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";

function useReveal() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });
  return { ref, isInView };
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

function AboutHero() {
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
          About Us
        </motion.p>
        <motion.h1
          variants={fadeUp}
          className="font-heading text-4xl md:text-5xl text-white leading-snug mb-6"
        >
          Nourishing Cancer Care <br className="hidden md:block" />
          From the Inside Out
        </motion.h1>
        <motion.p
          variants={fadeUp}
          className="font-body text-base text-white/85 leading-relaxed max-w-2xl mx-auto"
        >
          We are a registered community-based organization founded in Kenya,
          with a mission to transform cancer care through evidence-based
          nutrition and compassionate community support.
        </motion.p>
      </motion.div>
    </section>
  );
}

function FounderStory() {
  const { ref, isInView } = useReveal();

  return (
    <section className="section-padding bg-cream" ref={ref}>
      <div className="container-wide px-6 md:px-12 lg:px-24">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeUp} className="flex justify-center">
            <div className="w-72 h-72 md:w-80 md:h-80 rounded-2xl overflow-hidden bg-sage/10 border border-neutral flex items-center justify-center">
              <p className="font-body text-xs text-sage/40 uppercase tracking-widest text-center px-6">
                Founder photo coming soon
              </p>
            </div>
          </motion.div>

          <motion.div variants={fadeUp}>
            <p className="font-body text-sm uppercase tracking-widest text-sage mb-3">
              The Founder
            </p>
            <h2 className="font-heading text-3xl md:text-4xl text-charcoal leading-snug mb-2">
              Nancy Muyoka
            </h2>
            <p className="font-body text-sm text-sage uppercase tracking-wide mb-6">
              Founder
            </p>

            <p className="font-body text-base text-charcoal/80 leading-relaxed mb-4">
              Nancy Muyoka is the founder of Oncology Nutrition Space.
            </p>

            <p className="font-body text-base text-charcoal/80 leading-relaxed">
              She founded it in 2022 while taking care of her Dad, who was
              fighting colorectal cancer.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function MissionVision() {
  const { ref, isInView } = useReveal();

  return (
    <section className="section-padding bg-tint" ref={ref}>
      <div className="container-wide px-6 md:px-12 lg:px-24">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div
            variants={fadeUp}
            className="bg-white rounded-lg p-8 border border-neutral shadow-sm"
          >
            <span className="text-3xl mb-4 block">Mission</span>
            <h3 className="font-heading text-2xl text-charcoal mb-4">
              Our Mission
            </h3>
            <p className="font-body text-base text-charcoal/80 leading-relaxed">
              Transforming cancer care through evidence-based nutrition and
              community support, ensuring every patient in Kenya and beyond
              has access to the nutritional knowledge they need to heal.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="bg-white rounded-lg p-8 border border-neutral shadow-sm"
          >
            <span className="text-3xl mb-4 block">Vision</span>
            <h3 className="font-heading text-2xl text-charcoal mb-4">
              Our Vision
            </h3>
            <p className="font-body text-base text-charcoal/80 leading-relaxed">
              A future where oncology nutrition is an integral part of cancer
              care across Africa. Where no patient faces treatment without
              evidence-based nutritional support, and where communities are
              empowered to nourish their healing.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Philosophy() {
  const { ref, isInView } = useReveal();

  const principles = [
    {
      title: "Evidence First",
      description:
        "Every piece of information we share is grounded in peer-reviewed research and clinical guidelines. We do not promote fads, myths, or unverified supplements.",
    },
    {
      title: "Culturally Relevant",
      description:
        "We understand the Kenyan and African context, local foods, cultural practices, and economic realities shape how we deliver nutrition guidance.",
    },
    {
      title: "Compassion-Led",
      description:
        "Behind every patient is a human story. We approach every interaction with empathy, recognizing that cancer affects not just the body but the whole person.",
    },
    {
      title: "Community-Powered",
      description:
        "We believe in the power of shared experience. Our community of patients, caregivers, and clinicians learns and heals together.",
    },
  ];

  return (
    <section className="section-padding bg-cream" ref={ref}>
      <div className="container-wide px-6 md:px-12 lg:px-24">
        <motion.div
          className="text-center mb-12"
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <p className="font-body text-sm uppercase tracking-widest text-sage mb-3">
            How We Work
          </p>
          <h2 className="font-heading text-3xl md:text-4xl text-charcoal leading-snug">
            Our Evidence-Based Philosophy
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {principles.map(({ title, description }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              className="bg-white rounded-lg p-6 border-l-4 border-sage shadow-sm"
            >
              <h3 className="font-heading text-lg text-charcoal mb-2">
                {title}
              </h3>
              <p className="font-body text-sm text-charcoal/70 leading-relaxed">
                {description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function LongTermVision() {
  const { ref, isInView } = useReveal();

  const milestones = [
    {
      phase: "2022",
      title: "Founded",
      description: "Launched as an online support group for cancer patients and caregivers seeking nutrition guidance.",
    },
    {
      phase: "2025",
      title: "Registered CBO",
      description: "Formally registered as a Community-Based Organization, reflecting our growing impact and structured approach.",
    },
    {
      phase: "Now",
      title: "County Outreach",
      description: "Expanding beyond digital, planned visits across Kenya's 47 counties to reach patients where they are.",
    },
    {
      phase: "Future",
      title: "Pan-African Reach",
      description: "Building toward a future where oncology nutrition is embedded in cancer care systems across Africa.",
    },
  ];

  return (
    <section className="section-padding bg-tint" ref={ref}>
      <div className="container-wide px-6 md:px-12 lg:px-24">
        <motion.div
          className="text-center mb-12"
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <p className="font-body text-sm uppercase tracking-widest text-sage mb-3">
            Where We Are Headed
          </p>
          <h2 className="font-heading text-3xl md:text-4xl text-charcoal leading-snug">
            Our Long-Term Vision
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {milestones.map(({ phase, title, description }) => (
            <motion.div
              key={phase}
              variants={fadeUp}
              className="bg-white rounded-lg p-6 border border-neutral shadow-sm text-center"
            >
              <span className="inline-block font-body text-xs uppercase tracking-widest text-white bg-sage px-3 py-1 rounded-full mb-4">
                {phase}
              </span>
              <h3 className="font-heading text-lg text-charcoal mb-2">
                {title}
              </h3>
              <p className="font-body text-sm text-charcoal/70 leading-relaxed">
                {description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function AboutCTA() {
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
          Join the Movement
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="font-body text-base text-white/85 leading-relaxed max-w-xl mx-auto mb-10"
        >
          Whether you are a patient, caregiver, clinician, or partner,
          there is a place for you in the Oncology Nutrition Space community.
        </motion.p>
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
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
            Get in Touch
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default function About() {
  return (
    <>
      <AboutHero />
      <FounderStory />
      <MissionVision />
      <Philosophy />
      <LongTermVision />
      <AboutCTA />
    </>
  );
}
