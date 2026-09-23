import { useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { GALLERY_ITEMS } from "../data/gallery";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function GalleryGrid({ onSelect, shouldReduce }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });

  return (
    <motion.div
      ref={ref}
      className="columns-1 gap-5 sm:columns-2 lg:columns-3"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ staggerChildren: shouldReduce ? 0 : 0.08 }}
    >
      {GALLERY_ITEMS.map((item) => (
        <motion.button
          key={item.image}
          type="button"
          variants={fadeUp}
          onClick={() => onSelect(item)}
          className="group mb-5 block w-full break-inside-avoid overflow-hidden rounded-xl bg-white text-left shadow-sm ring-1 ring-charcoal/5 transition-shadow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-sage"
        >
          <div className="overflow-hidden">
            <img
              src={item.image}
              alt={item.alt}
              loading="lazy"
              className="block w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="p-5">
            <p className="font-body text-xs uppercase tracking-widest text-sage mb-2">
              Outreach highlight
            </p>
            <h2 className="font-heading text-lg text-charcoal mb-1">{item.title}</h2>
            <p className="font-body text-sm leading-relaxed text-charcoal/60">
              {item.description}
            </p>
          </div>
        </motion.button>
      ))}
    </motion.div>
  );
}

function Lightbox({ item, onClose }) {
  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-5"
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close photo"
        className="absolute right-5 top-5 rounded-full px-3 py-1 text-3xl leading-none text-white/80 hover:text-white"
      >
        ×
      </button>
      <figure className="max-h-full max-w-5xl" onClick={(event) => event.stopPropagation()}>
        <img src={item.image} alt={item.alt} className="max-h-[78vh] w-auto max-w-full rounded-lg object-contain" />
        <figcaption className="mt-4 text-center text-white">
          <p className="font-heading text-xl">{item.title}</p>
          <p className="font-body text-sm text-white/70">{item.description}</p>
        </figcaption>
      </figure>
    </div>
  );
}

export default function Gallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const shouldReduce = useReducedMotion();

  return (
    <>
      <section className="section-padding bg-sage">
        <motion.div
          className="container-narrow px-6 text-center"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: shouldReduce ? 0 : 0.15 } } }}
        >
          <motion.p variants={fadeUp} className="font-body text-sm uppercase tracking-widest text-white/70 mb-3">
            Outreach Gallery
          </motion.p>
          <motion.h1 variants={fadeUp} className="font-heading text-4xl md:text-5xl text-white leading-snug mb-6">
            Nourishing Communities Together
          </motion.h1>
          <motion.p variants={fadeUp} className="font-body text-base text-white/85 leading-relaxed max-w-2xl mx-auto">
            A look at Oncology Nutrition Space outreach, nutrition awareness,
            community connection, and partnerships across Kenya.
          </motion.p>
        </motion.div>
      </section>

      <main className="section-padding bg-cream">
        <div className="container-wide px-6 md:px-12 lg:px-24">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-body text-sm uppercase tracking-widest text-sage mb-3">From the field</p>
              <h2 className="font-heading text-3xl text-charcoal">Outreach Highlights</h2>
            </div>
            <Link to="/" className="font-body text-sm text-sage underline underline-offset-4 hover:text-sage-dark">
              Back to homepage
            </Link>
          </div>
          <GalleryGrid onSelect={setSelectedPhoto} shouldReduce={shouldReduce} />
        </div>
      </main>

      <Lightbox item={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
    </>
  );
}
