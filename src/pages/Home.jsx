import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { apiFetch } from "../lib/api";
import { FEATURED_GALLERY_ITEMS } from "../data/gallery";

// ─── Animation Helpers ────────────────────────────────────────

// Reusable hook — returns ref and whether element is in view.
// Once in view, stays in view (triggers animation once only).
function useReveal() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });
  return { ref, isInView };
}

// Fade up variant factory — respects reduced motion preference.
// If reduced motion is preferred, elements simply appear without movement.
function useFadeUpVariants(shouldReduce) {
  return {
    hidden: {
      opacity: 0,
      y: shouldReduce ? 0 : 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };
}

// Stagger container — staggers children animations
function useStaggerVariants(shouldReduce, staggerDelay = 0.12) {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduce ? 0 : staggerDelay,
      },
    },
  };
}

// ─── Animated Counter ─────────────────────────────────────────
// Counts up from 0 to the target number when triggered.
// Non-numeric suffixes ("+", "%", "×", "<") are preserved.
function AnimatedCounter({ value, isInView, shouldReduce }) {
  const [display, setDisplay] = useState("0");

  // Parse numeric part and any surrounding symbols
  const prefix = value.match(/^[^0-9]*/)?.[0] ?? "";
  const suffix = value.match(/[^0-9]*$/)?.[0] ?? "";
  const numeric = parseFloat(value.replace(/[^0-9.]/g, ""));

  useEffect(() => {
    // If reduced motion or not yet in view, just show final value
    if (!isInView || shouldReduce || isNaN(numeric)) {
      setDisplay(value);
      return;
    }

    const duration = 1500; // ms
    const steps = 40;
    const increment = numeric / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(current + increment, numeric);

      // Format — if original had decimal, show one decimal place
      const formatted = Number.isInteger(numeric)
        ? Math.round(current).toString()
        : current.toFixed(1);

      setDisplay(`${prefix}${formatted}${suffix}`);

      if (step >= steps) clearInterval(timer);
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, shouldReduce]);

  return <span>{display}</span>;
}

// ─── Data ─────────────────────────────────────────────────────

const HERO_SLIDES = [
  {
    image: "/images/slides/slide1.jpeg",
    alt: "Oncology Nutrition Space at the National Cancer Survivors Walk 2026",
    label: "National Cancer Survivors Walk 2026",
  },
  {
    image: "/images/slides/slide2.jpeg",
    alt: "Nutrition awareness day in Nakuru County",
    label: "Nakuru County Nutrition Awareness Day",
  },
  {
    image: "/images/slides/slide3.jpeg",
    alt: "Oncology Nutrition Space community outreach",
    label: "Community Outreach & Nutrition Awareness",
  },
  {
    image: "/images/slides/slide4.jpeg",
    alt: "Nutrition awareness meetup in Nairobi",
    label: "Nairobi Nutrition Awareness Day",
  },
];

const HERO_HEADLINE = "Nourishing the Fight Against Cancer";
const HERO_WORDS = HERO_HEADLINE.split(" ");

const STATS = [
  { value: "2000", label: "Community Members" },
  { value: "47",     label: "Counties Reached"  },
  { value: "3+",     label: "Years of Impact"   },
  { value: "5+",     label: "Countries Reached" },
];

const PROGRAMS = [
  {
    title: "Patient Education",
    description:
      "Providing cancer patients and their families with daily, evidence-based nutrition information to help them make informed decisions throughout their treatment journey.",
    icon: "🎓",
  },
  {
    title: "Community Support",
    description:
      "An active online support community where patients, caregivers, and clinicians share experiences and access reliable oncology nutrition guidance.",
    icon: "🤝",
  },
  {
    title: "County Outreach",
    description:
      "Planned visits targeting cancer patients across Kenya's 47 counties, bringing oncology nutrition support directly to underserved communities.",
    icon: "📍",
  },
  {
    title: "Wellness / Fitness Buddies",
    description:
      "A new initiative launched this year to encourage safe, appropriate exercise during treatment, supporting quicker recovery, healing, strength, and wellbeing.",
    icon: "💪",
  },
  {
    title: "Capacity Building",
    description:
      "Training healthcare professionals and community health workers to integrate evidence-based nutrition into oncology care across Kenya.",
    icon: "🏗️",
  },
  {
    title: "Advocacy",
    description:
      "Championing policy change and public awareness to ensure nutrition is recognized as an essential component of cancer treatment in Kenya and beyond.",
    icon: "📢",
  },
];


const TESTIMONIALS = [
  {
    id: 1,
    name: "Jane M.",
    role: "Cancer Survivor",
    quote:
      "I had no idea how much nutrition could affect how I felt during chemotherapy. The guidance I received completely changed my recovery journey.",
  },
  {
    id: 2,
    name: "David K.",
    role: "Caregiver",
    quote:
      "As a caregiver, I was overwhelmed. This community gave me practical tools and the reassurance that I was not alone.",
  },
  {
    id: 3,
    name: "Dr. Amina O.",
    role: "Oncology Nurse",
    quote:
      "The resources here are evidence-based and culturally relevant - exactly what our patients in Kenya need and rarely find.",
  },
];

// ─── Section Components ───────────────────────────────────────

// ── Hero ──────────────────────────────────────────────────────
// Hero animates on mount — no scroll trigger needed.
function Hero({ shouldReduce }) {
  const staggerVariants = useStaggerVariants(shouldReduce, 0.18);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (shouldReduce) return undefined;

    const timer = setInterval(() => {
      setActiveSlide((current) => (current + 1) % HERO_SLIDES.length);
    }, 10000);

    return () => clearInterval(timer);
  }, [shouldReduce]);

  const slide = HERO_SLIDES[activeSlide];

  return (
    <section
      className="grain relative flex min-h-screen items-center overflow-hidden bg-charcoal"
      aria-label="Community outreach highlights"
    >
      <AnimatePresence initial={false}>
        <motion.img
          key={slide.image}
          src={slide.image}
          alt={slide.alt}
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ duration: shouldReduce ? 0 : 2, ease: "easeInOut" }}
        />
      </AnimatePresence>
      {/* Directional overlays keep the community photo visible while giving the headline a dark field. */}
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/55 to-charcoal/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/45 via-transparent to-charcoal/20" />

      {/* Stagger container — children animate in sequence */}
      <motion.div
        className="relative z-10 container-wide w-full px-6 pt-36 pb-28 text-left sm:px-10 md:px-16 lg:px-24"
        variants={staggerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={useFadeUpVariants(shouldReduce)}
          className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-cream/85 md:text-sm"
        >
          <span className="h-2 w-2 rounded-full bg-sage-light shadow-[0_0_14px_rgba(118,154,106,0.8)]" />
          {slide.label}
        </motion.p>

        {/* Headline */}
        <motion.h1
          className="mb-8 max-w-5xl font-heading text-[clamp(3.5rem,8vw,7.5rem)] leading-[0.94] tracking-tight text-cream"
        >
          {(() => {
            let characterIndex = 0;
            return HERO_WORDS.map((word) => (
              <span key={word} className="mr-2 inline-block whitespace-nowrap last:mr-0">
                {Array.from(word).map((character) => {
                  const delay = characterIndex++ * 0.08;
                  return (
                    <motion.span
                      key={`${word}-${character}-${characterIndex}`}
                      initial={{ opacity: 0, y: shouldReduce ? 0 : 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: shouldReduce ? 0 : 0.25,
                        delay: shouldReduce ? 0 : delay,
                        ease: "easeOut",
                      }}
                      className="inline-block"
                    >
                      {character}
                    </motion.span>
                  );
                })}
              </span>
            ));
          })()}
        </motion.h1>

        <motion.div
          variants={useFadeUpVariants(shouldReduce)}
          className="flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <Link to="/about" className="inline-flex min-h-12 items-center justify-center rounded-full bg-sage px-7 py-3 font-mono text-xs uppercase tracking-widest text-white transition-colors hover:bg-sage-dark">
            Explore Our Mission
          </Link>
          <Link to="/contact" className="inline-flex min-h-12 items-center justify-center rounded-full border border-cream/60 px-7 py-3 font-mono text-xs uppercase tracking-widest text-cream transition-colors hover:bg-cream hover:text-charcoal">
            Get Support <span aria-hidden="true" className="ml-2">↗</span>
          </Link>
        </motion.div>

      </motion.div>

      <div className="absolute bottom-7 right-6 z-10 flex items-center gap-3 sm:right-10 md:right-16 lg:right-24">
        <button
          type="button"
          aria-label="Previous slide"
          onClick={() => setActiveSlide((current) => (current - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
          className="hidden px-2 py-1 text-lg text-cream/60 transition-colors hover:text-cream sm:block"
        >
          ←
        </button>
        {HERO_SLIDES.map((item, index) => (
          <button
            key={item.image}
            type="button"
            aria-label={`Show slide ${index + 1}: ${item.label}`}
            aria-current={index === activeSlide ? "true" : undefined}
            onClick={() => setActiveSlide(index)}
            className={`h-2 w-2 rounded-full border border-cream/70 transition-colors ${
              index === activeSlide ? "bg-cream" : "bg-cream/20"
            }`}
          />
        ))}
        <button
          type="button"
          aria-label="Next slide"
          onClick={() => setActiveSlide((current) => (current + 1) % HERO_SLIDES.length)}
          className="hidden px-2 py-1 text-lg text-cream/60 transition-colors hover:text-cream sm:block"
        >
          →
        </button>
      </div>
    </section>
  );
}

// ── Stats Strip ───────────────────────────────────────────────
function StatsStrip({ shouldReduce }) {
  const { ref, isInView } = useReveal();
  const staggerVariants = useStaggerVariants(shouldReduce, 0.15);
  const fadeUpVariants = useFadeUpVariants(shouldReduce);

  return (
    <section className="grain relative overflow-hidden bg-charcoal py-12 md:py-16" ref={ref}>
      <div className="container-wide relative z-10 px-6 md:px-12 lg:px-24">
        <motion.div
          className="grid grid-cols-2 gap-y-10 text-left md:grid-cols-4 md:gap-8"
          variants={staggerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {STATS.map(({ value, label }) => (
            <motion.div key={label} variants={fadeUpVariants} className="border-l border-sage/40 pl-4 md:pl-6">
              <p className="font-heading text-5xl md:text-7xl text-cream mb-2">
                {/* Animated counter per stat */}
                <AnimatedCounter
                  value={value}
                  isInView={isInView}
                  shouldReduce={shouldReduce}
                />
              </p>
              <p className="font-mono text-[0.65rem] md:text-xs text-sage-light uppercase tracking-widest">
                {label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ── Mission ───────────────────────────────────────────────────
function Mission({ shouldReduce }) {
  const { ref, isInView } = useReveal();
  const fadeUpVariants = useFadeUpVariants(shouldReduce);
  const staggerVariants = useStaggerVariants(shouldReduce);

  return (
    <section className="section-padding relative overflow-hidden bg-cream" ref={ref}>
      <span aria-hidden="true" className="pointer-events-none absolute bottom-0 right-[4%] hidden font-heading text-[15rem] leading-none text-charcoal/[0.06] md:block">ONS</span>
      <motion.div
        className="container-narrow relative z-10 text-center"
        variants={staggerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.p
          variants={fadeUpVariants}
          className="font-mono text-xs uppercase tracking-widest text-sage mb-3"
        >
          Our Mission
        </motion.p>

        <motion.h2
          variants={fadeUpVariants}
          className="font-heading text-3xl md:text-4xl text-charcoal leading-snug mb-6"
        >
          Transforming Cancer Care <br className="hidden md:block" />
          Through Nutrition
        </motion.h2>

        <motion.p
          variants={fadeUpVariants}
          className="font-body text-base text-charcoal/80 leading-relaxed max-w-2xl mx-auto mb-6"
        >
          Oncology Nutrition Space was born out of a deeply personal experience:
          watching a loved one battle colorectal cancer while the critical role of
          nutrition went unaddressed. Founded in 2022/2023 by Registered
          Nutritionist Nancy Muyoka Makhakha, it began as an online support group
          and has since grown into a community of nearly 2,000 members across all
          47 counties in Kenya and beyond. Oncology Nutrition Space is also a
          registered member of KENCO (Kenya Network of Cancer Organizations).
        </motion.p>

        <motion.p
          variants={fadeUpVariants}
          className="font-body text-base text-charcoal/80 leading-relaxed max-w-2xl mx-auto"
        >
          Our mission is simple but urgent: transforming cancer care through
          evidence-based nutrition and community support because no patient
          should face cancer without knowing how food can help them heal.
        </motion.p>
      </motion.div>
    </section>
  );
}

// ── The Problem ───────────────────────────────────────────────
function TheProblem({ shouldReduce }) {
  const { ref, isInView } = useReveal();
  const fadeUpVariants = useFadeUpVariants(shouldReduce);
  const staggerVariants = useStaggerVariants(shouldReduce);

  return (
    <section className="grain relative overflow-hidden section-padding bg-charcoal" ref={ref}>
      <div className="container-wide px-6 md:px-12 lg:px-24">
        <motion.div
          className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          variants={staggerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Text side */}
          <motion.div variants={fadeUpVariants}>
            <p className="font-mono text-xs uppercase tracking-widest text-sage-light mb-3">
              The Problem
            </p>
            <h2 className="font-heading text-3xl md:text-4xl text-cream leading-snug mb-6">
              Nutrition Is Overlooked <br /> in Cancer Treatment
            </h2>
            <p className="font-body text-base text-cream/80 leading-relaxed mb-4">
              Up to 85% of cancer patients experience malnutrition at some
              point during their treatment yet nutritional care remains an
              afterthought in most oncology settings across Africa.
            </p>
            <p className="font-body text-base text-cream/80 leading-relaxed mb-4">
              The consequences are severe: reduced tolerance to treatment,
              longer hospital stays, higher complication rates, and lower
              survival odds. This is a solvable problem.
            </p>
            <p className="font-body text-base text-cream/80 leading-relaxed">
              We are here to solve it through structured programs, community
              support, and relentless advocacy for change.
            </p>
          </motion.div>

          {/* Stat cards — each staggered individually */}
          <motion.div
            className="flex flex-col gap-6"
            variants={useStaggerVariants(shouldReduce, 0.15)}
          >
            {[
              { stat: "85%",   detail: "of cancer patients face malnutrition during treatment" },
              { stat: "2×",    detail: "higher risk of treatment complications in malnourished patients" },
            ].map(({ stat, detail }) => (
              <motion.div
                key={stat}
                variants={fadeUpVariants}
                className="bg-white rounded-lg p-6 border-l-4 border-sage shadow-sm"
              >
                <p className="font-heading text-3xl text-sage font-bold mb-1">
                  {stat}
                </p>
                <p className="font-body text-sm text-charcoal/70 leading-relaxed">
                  {/* [PLACEHOLDER] — verify stats with client */}
                  {detail}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ── What We Do ────────────────────────────────────────────────
function WhatWeDo({ shouldReduce }) {
  const { ref, isInView } = useReveal();
  const fadeUpVariants = useFadeUpVariants(shouldReduce);
  const staggerVariants = useStaggerVariants(shouldReduce, 0.1);

  return (
    <section className="section-padding bg-cream" ref={ref}>
      <div className="container-wide px-6 md:px-12 lg:px-24">

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          variants={fadeUpVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <p className="font-mono text-xs uppercase tracking-widest text-sage mb-3">
            What We Do
          </p>
          <h2 className="font-heading text-3xl md:text-4xl text-charcoal leading-snug">
            Our Programs & Services
          </h2>
        </motion.div>

        {/* Cards — staggered */}
        <motion.div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {PROGRAMS.map(({ title, description, icon }) => (
            <motion.div
              key={title}
              variants={fadeUpVariants}
              className="bg-white rounded-lg p-6 border border-neutral hover:border-sage/40 hover:shadow-md transition-all duration-200"
            >
              <span className="text-3xl mb-4 block">{icon}</span>
              <h3 className="font-heading text-lg text-charcoal mb-2">
                {title}
              </h3>
              <p className="font-body text-sm text-charcoal/70 leading-relaxed">
                {description}
              </p>
            </motion.div>
          ))}

          {/* CTA card */}
          <motion.div
            variants={fadeUpVariants}
            className="bg-sage/10 rounded-lg p-6 border border-sage/20 flex flex-col justify-center items-center text-center"
          >
            <p className="font-heading text-lg text-sage mb-3">
              Want to learn more?
            </p>
            <Link to="/programs" className="btn-primary rounded-full font-mono uppercase tracking-widest text-xs">
              View All Programs
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ── Outreach & Partnerships ─────────────────────────────────
function OutreachHighlights({ shouldReduce }) {
  const { ref, isInView } = useReveal();
  const fadeUpVariants = useFadeUpVariants(shouldReduce);

  return (
    <section className="section-padding bg-tint" ref={ref}>
      <div className="container-wide px-6 md:px-12 lg:px-24">
        <motion.div
          className="text-center mb-10"
          variants={fadeUpVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <p className="font-mono text-xs uppercase tracking-widest text-sage mb-3">
            Photos & Outreach Highlights
          </p>
          <h2 className="font-heading text-3xl md:text-4xl text-charcoal leading-snug mb-4">
            Taking Support Into Communities
          </h2>
          <p className="font-body text-base text-charcoal/75 leading-relaxed max-w-2xl mx-auto">
            Our outreach work includes Nakuru, Nairobi, and Vihiga. We also
            actively participate in and partner with government initiatives,
            including the National Cancer Control (NCI) project this year.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          variants={useStaggerVariants(shouldReduce, 0.12)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {FEATURED_GALLERY_ITEMS.map(({ image, alt, title, description }) => (
            <motion.div
              key={image}
              variants={fadeUpVariants}
              className="rounded-lg border border-neutral bg-white overflow-hidden shadow-sm"
            >
              <img src={image} alt={alt} loading="lazy" className="h-48 w-full object-cover" />
              <div className="p-4">
                <h3 className="font-heading text-base text-charcoal">{title}</h3>
                <p className="font-body text-sm text-charcoal/60">{description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-10 text-center">
          <Link to="/gallery" className="btn-outline">
            View the Full Gallery →
          </Link>
        </div>
      </div>
    </section>
  );
}

function PartnerStrip({ shouldReduce }) {
  const { ref, isInView } = useReveal();
  const partners = [
    { name: "KENCO", image: "/images/partners/kenco-logo.jpg" },
    { name: "NCI-Kenya", image: "/images/partners/nci-kenya-logo.png", dark: true },
    { name: "Kenyatta National Hospital", image: "/images/partners/knh-logo.jpg" },
    { name: "National Cancer Control Programme", image: "/images/partners/nccp-logo.jpg" },
    { name: "Nakuru Hospice" },
  ];

  return (
    <section className="border-y border-neutral/70 bg-cream py-12 md:py-16" ref={ref}>
      <div className="container-wide px-6 md:px-12 lg:px-24">
        <motion.div
          className="mb-8 flex flex-col items-center gap-3 text-center"
          variants={useStaggerVariants(shouldReduce, 0.08)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.p
            variants={useFadeUpVariants(shouldReduce)}
            className="font-mono text-[0.65rem] uppercase tracking-widest text-sage"
          >
            Working alongside
          </motion.p>
          <motion.h2
            variants={useFadeUpVariants(shouldReduce)}
            className="font-heading text-2xl text-charcoal md:text-3xl"
          >
            Partners & Sponsors
          </motion.h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5"
          variants={useStaggerVariants(shouldReduce, 0.08)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {partners.map(({ name, image, dark }) => (
            <motion.div
              key={name}
              variants={useFadeUpVariants(shouldReduce)}
              className={`flex min-h-24 items-center justify-center rounded-lg border border-neutral px-4 py-3 ${dark ? "bg-charcoal" : "bg-white"}`}
            >
              {image ? (
                <img src={image} alt={name} loading="lazy" className="max-h-16 w-full object-contain" />
              ) : (
                <span className="font-heading text-center text-base text-charcoal">{name}</span>
              )}
            </motion.div>
          ))}
        </motion.div>

        <motion.figure
          variants={useFadeUpVariants(shouldReduce)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-8 overflow-hidden rounded-xl border border-neutral bg-white p-3 md:p-6"
        >
          <img
            src="/images/partners/national-cancer-survivors-day-2026-sponsors.jpg"
            alt="Event sponsor logos: Ministry of Health, National Cancer Control Programme, Kenyatta National Hospital, Texas Cancer Centre, La Roche-Posay, ANT, Oncology Nutrition Space, Kilele Health Association, Sukuma, Guru Nanak Hospital, RFH Healthcare, Henzo Kenya, CMMB, and Kevian."
            loading="lazy"
            className="mx-auto h-auto w-full max-w-5xl"
          />
          <figcaption className="mt-3 text-center font-mono text-[0.65rem] uppercase tracking-widest text-charcoal/50">
            National Cancer Survivors Day Walk · 2026
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
// ── Blog Preview ──────────────────────────────────────────────
function BlogPreview({ shouldReduce }) {
  const { ref, isInView } = useReveal();
  const fadeUpVariants    = useFadeUpVariants(shouldReduce);
  const staggerVariants   = useStaggerVariants(shouldReduce, 0.12);

  const [posts,   setPosts]   = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch latest 3 published posts
  useEffect(() => {
    apiFetch("/api/posts")
      .then(data => {
        // Take only the 3 most recent
        setPosts((data.posts ?? []).slice(0, 3));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="section-padding bg-tint" ref={ref}>
      <div className="container-wide px-6 md:px-12 lg:px-24">

        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4"
          variants={fadeUpVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-sage mb-3">
              From the Blog
            </p>
            <h2 className="font-heading text-3xl md:text-4xl text-charcoal leading-snug">
              Evidence-Based Insights
            </h2>
          </div>
          <Link
            to="/blog"
            className="font-body text-sm text-sage hover:text-sage-dark underline underline-offset-4 transition-colors duration-200 shrink-0"
          >
            View all articles →
          </Link>
        </motion.div>

        {/* Loading state */}
        {loading && (
          <p className="font-body text-sm text-charcoal/50 text-center py-12">
            Loading articles...
          </p>
        )}

        {/* No posts yet */}
        {!loading && posts.length === 0 && (
          <p className="font-body text-sm text-charcoal/50 text-center py-12">
            Articles coming soon.
          </p>
        )}

        {/* Cards */}
        {!loading && posts.length > 0 && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={staggerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {posts.map(({ id, slug, excerpt, published_at, author_name, categories, title, cover_image_url }) => (
              <motion.div
                key={id}
                variants={fadeUpVariants}
                className="bg-white rounded-lg overflow-hidden border border-neutral hover:shadow-md transition-shadow duration-200 flex flex-col"
              >
                {/* Cover image or placeholder */}
                <div className="h-40 bg-sage/10 overflow-hidden">
                  {cover_image_url ? (
                    <img
                      src={cover_image_url}
                      alt={title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="font-body text-xs text-sage/50 uppercase tracking-widest">
                        No Image
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6 flex flex-col flex-1">
                  {/* Category */}
                  {categories?.length > 0 && (
                    <span className="font-body text-xs uppercase tracking-widest text-blue mb-2">
                      {categories[0].title}
                    </span>
                  )}

                  {/* Title */}
                  <Link to={`/blog/${slug}`}>
                    <h3 className="font-heading text-base text-charcoal hover:text-sage transition-colors duration-200 mb-2 leading-snug">
                      {title}
                    </h3>
                  </Link>

                  {/* Excerpt */}
                  {excerpt && (
                    <p className="font-body text-sm text-charcoal/70 leading-relaxed flex-1">
                      {excerpt}
                    </p>
                  )}

                  {/* Meta */}
                  <div className="flex items-center gap-2 font-body text-xs text-charcoal/40 mt-4 pt-4 border-t border-neutral">
                    {author_name && <span>{author_name}</span>}
                    {author_name && published_at && <span>·</span>}
                    {published_at && (
                      <span>
                        {new Date(published_at).toLocaleDateString("en-KE", {
                          day: "numeric", month: "short", year: "numeric",
                        })}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

      </div>
    </section>
  );
}


// ── Testimonials ──────────────────────────────────────────────
// ── Testimonials ──────────────────────────────────────────────
// [PLACEHOLDER] — replace with real testimonials when available
function Testimonials({ shouldReduce }) {
  const { ref, isInView } = useReveal();
  const fadeUpVariants    = useFadeUpVariants(shouldReduce);

  return (
    <section className="section-padding bg-cream" ref={ref}>
      <motion.div
        className="container-narrow text-center px-6"
        variants={fadeUpVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <p className="font-mono text-xs uppercase tracking-widest text-sage mb-3">
          Voices of Impact
        </p>
        <h2 className="font-heading text-3xl md:text-4xl text-charcoal leading-snug mb-4">
          What Our Community Says
        </h2>
        <p className="font-body text-base text-charcoal/60 leading-relaxed max-w-lg mx-auto mb-6">
          Stories from patients, caregivers, and clinicians are coming soon.
          If you have been supported by the Oncology Nutrition Space and would
          like to share your experience, we would love to hear from you.
        </p>
        <Link to="/contact" className="btn-outline">
          Share Your Story
        </Link>
      </motion.div>
    </section>
  );
}
// ── CTA Banner ────────────────────────────────────────────────
function CTABanner({ shouldReduce }) {
  const { ref, isInView } = useReveal();
  const fadeUpVariants = useFadeUpVariants(shouldReduce);
  const staggerVariants = useStaggerVariants(shouldReduce);

  return (
    <section className="bg-sage section-padding" ref={ref}>
      <motion.div
        className="container-narrow text-center px-6"
        variants={staggerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.h2
          variants={fadeUpVariants}
          className="font-heading text-3xl md:text-4xl text-white leading-snug mb-4"
        >
          You Don't Have to Navigate This Alone
        </motion.h2>

        <motion.p
          variants={fadeUpVariants}
          className="font-body text-base text-white/85 leading-relaxed max-w-xl mx-auto mb-10"
        >
          Whether you are a patient, caregiver, or clinician — we have
          resources, community, and support built for you.
        </motion.p>

        <motion.div
          variants={fadeUpVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          {/* [PLACEHOLDER] — update href with actual WhatsApp link */}
          <a
            href="https://chat.whatsapp.com/JpnN1LDuHXk2OejkgmCUj5"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-white text-sage font-mono uppercase tracking-widest text-xs px-6 py-3 rounded-full hover:bg-neutral transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Join Our Community
          </a>

          <Link
            to="/contact"
            className="inline-block border border-white text-white font-mono uppercase tracking-widest text-xs px-6 py-3 rounded-full hover:bg-white hover:text-sage transition-colors duration-200"
          >
            Get in Touch
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── Page Assembly ────────────────────────────────────────────
export default function Home() {
  // Read system reduced motion preference once at the top level
  // and pass it down to all animated sections
  const shouldReduce = useReducedMotion();

  return (
    <>
      <Hero shouldReduce={shouldReduce} />
      <StatsStrip shouldReduce={shouldReduce} />
      <Mission shouldReduce={shouldReduce} />
      <TheProblem shouldReduce={shouldReduce} />
      <WhatWeDo shouldReduce={shouldReduce} />
      <OutreachHighlights shouldReduce={shouldReduce} />
      <PartnerStrip shouldReduce={shouldReduce} />
      {/* <BlogPreview shouldReduce={shouldReduce} /> */}
      {/* <Testimonials shouldReduce={shouldReduce} /> */}
      <CTABanner shouldReduce={shouldReduce} />
    </>
  );
}
