import { Link } from "react-router-dom";

// ─── Data ─────────────────────────────────────────────────────
// All placeholder content is marked with [PLACEHOLDER] for easy
// handoff to the client for copy updates.

const STATS = [
  { value: "500+",  label: "Patients Supported" },
  { value: "1,000+", label: "Community Members" },
  { value: "3",     label: "Counties Reached" },
  { value: "5+",    label: "Years of Practice" },
];

const PROGRAMS = [
  {
    title: "Patient Education",
    description:
      // [PLACEHOLDER] — replace with actual program description
      "Equipping cancer patients and their families with evidence-based nutritional knowledge to navigate treatment with confidence.",
    icon: "🎓",
  },
  {
    title: "Capacity Building",
    description:
      // [PLACEHOLDER]
      "Training healthcare professionals and community health workers to integrate nutrition into oncology care across Kenya.",
    icon: "🏗️",
  },
  {
    title: "Outreach",
    description:
      // [PLACEHOLDER]
      "Reaching underserved communities with practical, culturally relevant nutrition support for those affected by cancer.",
    icon: "🤝",
  },
  {
    title: "Institutional Collaboration",
    description:
      // [PLACEHOLDER]
      "Partnering with hospitals, research institutions, and NGOs to embed nutrition into standard oncology protocols.",
    icon: "🏥",
  },
  {
    title: "Advocacy",
    description:
      // [PLACEHOLDER]
      "Championing policy change to ensure nutrition is recognized as an essential component of cancer treatment in Kenya and beyond.",
    icon: "📢",
  },
];

const BLOG_POSTS = [
  // [PLACEHOLDER] — replace with real posts when blog is live
  {
    id: 1,
    category: "Nutrition Science",
    title: "Why Nutrition Is the Missing Piece in Cancer Care",
    excerpt:
      "Malnutrition affects up to 85% of cancer patients globally. Here is why addressing it early changes outcomes.",
    date: "Coming Soon",
  },
  {
    id: 2,
    category: "Patient Guidance",
    title: "Eating Well During Chemotherapy: What the Evidence Says",
    excerpt:
      "Chemotherapy-induced nausea and appetite loss are common. Evidence-based strategies can help patients maintain strength.",
    date: "Coming Soon",
  },
  {
    id: 3,
    category: "Caregiver Resources",
    title: "How to Support a Loved One's Nutritional Needs During Treatment",
    excerpt:
      "Caregivers play a critical role in a patient's nutrition. Practical guidance for the people who show up every day.",
    date: "Coming Soon",
  },
];

const TESTIMONIALS = [
  // [PLACEHOLDER] — replace with verified patient/caregiver testimonials
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
      "The resources here are evidence-based and culturally relevant — exactly what our patients in Kenya need and rarely find.",
  },
];

// ─── Section Components ───────────────────────────────────────
// Broken into small components for readability and future reuse.

// ── Hero ──────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      className="relative min-h-[90vh] flex items-center justify-center bg-cover bg-center"
      // [PLACEHOLDER] — replace with actual hero image path once provided
      style={{ backgroundImage: "url('/images/hero.png')" }}
    >
      {/* Dark overlay for readability over the background image */}
      <div className="absolute inset-0 bg-charcoal/65" />

      {/* Hero content sits above the overlay */}
      <div className="relative z-10 container-narrow text-center px-6 py-24">
        {/* Eyebrow label */}
        <p className="font-body text-sm uppercase tracking-widest text-lavender mb-4">
          Oncology Nutrition Space
        </p>

        {/* Main headline — [PLACEHOLDER] */}
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
          Nourishing the Fight <br className="hidden md:block" />
          Against Cancer
        </h1>

        {/* Subheadline — [PLACEHOLDER] */}
        <p className="font-body text-lg text-neutral/90 max-w-2xl mx-auto mb-10 leading-relaxed">
          Evidence-based oncology nutrition support for patients, caregivers,
          and clinicians in Kenya and beyond. Because what you eat during cancer
          care matters deeply.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/contact" className="btn-primary px-8 py-3 text-base">
            Get Support
          </Link>
          <Link to="/about" className="btn-outline px-8 py-3 text-base border-white text-white hover:bg-white hover:text-charcoal">
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── Stats Strip ───────────────────────────────────────────────
function StatsStrip() {
  return (
    <section className="bg-sage py-10">
      <div className="container-wide px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map(({ value, label }) => (
            <div key={label}>
              <p className="font-heading text-3xl font-bold text-white mb-1">
                {value}
              </p>
              <p className="font-body text-sm text-white/80 uppercase tracking-wide">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Mission Statement ─────────────────────────────────────────
function Mission() {
  return (
    <section className="section-padding bg-cream">
      <div className="container-narrow text-center">
        {/* Section eyebrow */}
        <p className="font-body text-sm uppercase tracking-widest text-sage mb-3">
          Our Mission
        </p>

        {/* [PLACEHOLDER] — replace with finalized mission statement */}
        <h2 className="font-heading text-3xl md:text-4xl text-charcoal leading-snug mb-6">
          Closing the Nutrition Gap <br className="hidden md:block" />
          in Cancer Care
        </h2>

        <p className="font-body text-base text-charcoal/80 leading-relaxed max-w-2xl mx-auto mb-6">
          Across Kenya and much of Sub-Saharan Africa, cancer patients face a
          silent crisis alongside their diagnosis — malnutrition. Inadequate
          nutritional support compromises treatment outcomes, weakens immune
          response, and diminishes quality of life. We exist to change that.
        </p>

        <p className="font-body text-base text-charcoal/80 leading-relaxed max-w-2xl mx-auto">
          Through education, outreach, and institutional collaboration, the
          Oncology Nutrition Space is building a future where every cancer
          patient in Kenya receives the nutritional care they deserve —
          grounded in evidence, delivered with compassion.
        </p>
      </div>
    </section>
  );
}

// ── The Problem ───────────────────────────────────────────────
function TheProblem() {
  return (
    <section className="section-padding bg-neutral/40">
      <div className="container-wide px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Text side */}
          <div>
            <p className="font-body text-sm uppercase tracking-widest text-sage mb-3">
              The Problem
            </p>
            {/* [PLACEHOLDER] */}
            <h2 className="font-heading text-3xl md:text-4xl text-charcoal leading-snug mb-6">
              Nutrition Is Overlooked <br /> in Cancer Treatment
            </h2>
            <p className="font-body text-base text-charcoal/80 leading-relaxed mb-4">
              Up to 85% of cancer patients experience malnutrition at some
              point during their treatment — yet nutritional care remains an
              afterthought in most oncology settings across Africa.
            </p>
            <p className="font-body text-base text-charcoal/80 leading-relaxed mb-4">
              The consequences are severe: reduced tolerance to treatment,
              longer hospital stays, higher complication rates, and lower
              survival odds. This is a solvable problem.
            </p>
            <p className="font-body text-base text-charcoal/80 leading-relaxed">
              We are here to solve it — through structured programs, community
              support, and relentless advocacy for change.
            </p>
          </div>

          {/* Visual side — decorative stat callout */}
          <div className="flex flex-col gap-6">
            {[
              { stat: "85%",  detail: "of cancer patients face malnutrition during treatment" },
              { stat: "2×",   detail: "higher risk of treatment complications in malnourished patients" },
              { stat: "< 10%", detail: "of oncology units in Kenya have a dedicated nutritionist" },
            ].map(({ stat, detail }) => (
              <div
                key={stat}
                className="bg-white rounded-lg p-6 border-l-4 border-sage shadow-sm"
              >
                <p className="font-heading text-3xl text-sage font-bold mb-1">
                  {stat}
                </p>
                {/* [PLACEHOLDER] — verify stats with client */}
                <p className="font-body text-sm text-charcoal/70 leading-relaxed">
                  {detail}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

// ── What We Do ────────────────────────────────────────────────
function WhatWeDo() {
  return (
    <section className="section-padding bg-cream">
      <div className="container-wide px-6 md:px-12 lg:px-24">

        {/* Section header */}
        <div className="text-center mb-12">
          <p className="font-body text-sm uppercase tracking-widest text-sage mb-3">
            What We Do
          </p>
          <h2 className="font-heading text-3xl md:text-4xl text-charcoal leading-snug">
            Our Programs & Services
          </h2>
        </div>

        {/* Program cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROGRAMS.map(({ title, description, icon }) => (
            <div
              key={title}
              className="bg-white rounded-lg p-6 border border-neutral hover:border-sage/40 hover:shadow-md transition-all duration-200"
            >
              <span className="text-3xl mb-4 block">{icon}</span>
              <h3 className="font-heading text-lg text-charcoal mb-2">
                {title}
              </h3>
              <p className="font-body text-sm text-charcoal/70 leading-relaxed">
                {description}
              </p>
            </div>
          ))}

          {/* "See all programs" card */}
          <div className="bg-sage/10 rounded-lg p-6 border border-sage/20 flex flex-col justify-center items-center text-center">
            <p className="font-heading text-lg text-sage mb-3">
              Want to learn more?
            </p>
            <Link to="/programs" className="btn-primary">
              View All Programs
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}

// ── Blog Preview ──────────────────────────────────────────────
function BlogPreview() {
  return (
    <section className="section-padding bg-neutral/40">
      <div className="container-wide px-6 md:px-12 lg:px-24">

        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <p className="font-body text-sm uppercase tracking-widest text-sage mb-3">
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
        </div>

        {/* Blog cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.map(({ id, category, title, excerpt, date }) => (
            <div
              key={id}
              className="bg-white rounded-lg overflow-hidden border border-neutral hover:shadow-md transition-shadow duration-200 flex flex-col"
            >
              {/* Placeholder image strip */}
              <div className="h-40 bg-sage/10 flex items-center justify-center">
                <span className="font-body text-xs text-sage/50 uppercase tracking-widest">
                  Image Coming Soon
                </span>
              </div>

              <div className="p-6 flex flex-col flex-1">
                {/* Category tag */}
                <span className="font-body text-xs uppercase tracking-widest text-lavender mb-2">
                  {category}
                </span>
                <h3 className="font-heading text-base text-charcoal mb-2 leading-snug">
                  {title}
                </h3>
                <p className="font-body text-sm text-charcoal/70 leading-relaxed flex-1">
                  {excerpt}
                </p>
                {/* Date / Coming soon badge */}
                <p className="font-body text-xs text-neutral mt-4 pt-4 border-t border-neutral">
                  {date}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// ── Testimonials ──────────────────────────────────────────────
function Testimonials() {
  return (
    <section className="section-padding bg-cream">
      <div className="container-wide px-6 md:px-12 lg:px-24">

        <div className="text-center mb-12">
          <p className="font-body text-sm uppercase tracking-widest text-sage mb-3">
            Voices of Impact
          </p>
          <h2 className="font-heading text-3xl md:text-4xl text-charcoal leading-snug">
            What Our Community Says
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map(({ id, name, role, quote }) => (
            <div
              key={id}
              className="bg-white rounded-lg p-6 border border-neutral shadow-sm flex flex-col"
            >
              {/* Opening quote mark */}
              <span className="font-heading text-5xl text-lavender leading-none mb-2">
                "
              </span>
              {/* [PLACEHOLDER] quote */}
              <p className="font-body text-sm text-charcoal/80 leading-relaxed flex-1 mb-6">
                {quote}
              </p>
              {/* Attribution */}
              <div className="border-t border-neutral pt-4">
                <p className="font-body text-sm font-medium text-charcoal">
                  {name}
                </p>
                <p className="font-body text-xs text-sage uppercase tracking-wide mt-0.5">
                  {role}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Link to full testimonials page */}
        <div className="text-center mt-10">
          <Link to="/testimonials" className="btn-outline">
            Read More Stories
          </Link>
        </div>

      </div>
    </section>
  );
}

// ── CTA Banner ────────────────────────────────────────────────
function CTABanner() {
  return (
    <section className="bg-sage section-padding">
      <div className="container-narrow text-center px-6">
        {/* [PLACEHOLDER] */}
        <h2 className="font-heading text-3xl md:text-4xl text-white leading-snug mb-4">
          You Don't Have to Navigate This Alone
        </h2>
        <p className="font-body text-base text-white/85 leading-relaxed max-w-xl mx-auto mb-10">
          Whether you are a patient, caregiver, or clinician — we have
          resources, community, and support built for you.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* WhatsApp community link — [PLACEHOLDER] update href */}
          <a
            href="https://wa.me/yournumberhere"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-white text-sage font-body font-medium text-sm px-6 py-3 rounded-md hover:bg-neutral transition-colors duration-200"
          >
            {/* WhatsApp icon */}
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
            className="inline-block border border-white text-white font-body font-medium text-sm px-6 py-3 rounded-md hover:bg-white hover:text-sage transition-colors duration-200"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Page Assembly ────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <Mission />
      <TheProblem />
      <WhatWeDo />
      <BlogPreview />
      <Testimonials />
      <CTABanner />
    </>
  );
}