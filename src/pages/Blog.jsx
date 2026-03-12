import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiFetch } from "../lib/api";

// ─── Helpers ──────────────────────────────────────────────────

function formatDate(dateString) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-KE", {
    day:   "numeric",
    month: "long",
    year:  "numeric",
  });
}

// ─── Sub-components ───────────────────────────────────────────

// ── Category Filter ───────────────────────────────────────────
function CategoryFilter({ categories, active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2 mb-10">

      {/* All pill */}
      <button
        onClick={() => onChange(null)}
        className={`font-body text-sm px-4 py-1.5 rounded-full border transition-colors duration-200 ${
          active === null
            ? "bg-sage text-white border-sage"
            : "bg-white text-charcoal border-neutral hover:border-sage hover:text-sage"
        }`}
      >
        All
      </button>

      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onChange(cat.slug)}
          className={`font-body text-sm px-4 py-1.5 rounded-full border transition-colors duration-200 ${
            active === cat.slug
              ? "bg-sage text-white border-sage"
              : "bg-white text-charcoal border-neutral hover:border-sage hover:text-sage"
          }`}
        >
          {cat.title}
        </button>
      ))}
    </div>
  );
}

// ── Post Row ──────────────────────────────────────────────────
function PostRow({ post }) {
  const { title, slug, excerpt, published_at, author_name, categories } = post;

  return (
    <article className="border-b border-neutral py-8 last:border-b-0">
      <div className="flex flex-col md:flex-row md:items-start gap-6">

        {/* Text content */}
        <div className="flex-1">

          {/* Categories */}
          {categories?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {categories.map((cat) => (
                <span
                  key={cat.id}
                  className="font-body text-xs uppercase tracking-widest text-blue"
                >
                  {cat.title}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <Link to={`/blog/${slug}`}>
            <h2 className="font-heading text-2xl text-charcoal hover:text-sage transition-colors duration-200 leading-snug mb-3">
              {title}
            </h2>
          </Link>

          {/* Excerpt */}
          {excerpt && (
            <p className="font-body text-sm text-charcoal/70 leading-relaxed mb-4">
              {excerpt}
            </p>
          )}

          {/* Meta */}
          <div className="flex items-center gap-3 font-body text-xs text-charcoal/50">
            {author_name && (
              <>
                <span>{author_name}</span>
                <span>·</span>
              </>
            )}
            {published_at && <span>{formatDate(published_at)}</span>}
          </div>
        </div>

        {/* Read more */}
        <div className="md:pt-1 shrink-0">
          <Link
            to={`/blog/${slug}`}
            className="font-body text-sm text-sage hover:text-sage-dark underline underline-offset-4 transition-colors duration-200"
          >
            Read article →
          </Link>
        </div>

      </div>
    </article>
  );
}

// ─── Page ─────────────────────────────────────────────────────
export default function Blog() {
  const [posts,          setPosts]          = useState([]);
  const [categories,     setCategories]     = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [loading,        setLoading]        = useState(true);
  const [error,          setError]          = useState(null);

  // Fetch categories once on mount
  useEffect(() => {
    apiFetch("/api/categories")
      .then(data => setCategories(data.categories ?? []))
      .catch(() => {}); // non-critical — filter just won't show
  }, []);

  // Fetch posts whenever active category changes
  useEffect(() => {
    setLoading(true);
    setError(null);

    const path = activeCategory
      ? `/api/posts?category=${activeCategory}`
      : "/api/posts";

    apiFetch(path)
      .then(data => {
        setPosts(data.posts ?? []);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load articles. Please try again.");
        setLoading(false);
      });
  }, [activeCategory]);

  return (
    <div className="section-padding">
      <div className="container-narrow px-6 md:px-0">

        {/* Page header */}
        <div className="mb-10">
          <p className="font-body text-sm uppercase tracking-widest text-sage mb-3">
            The Blog
          </p>
          <h1 className="font-heading text-4xl md:text-5xl text-charcoal leading-snug mb-4">
            Evidence-Based Insights
          </h1>
          <p className="font-body text-base text-charcoal/70 leading-relaxed max-w-xl">
            Research-informed articles on oncology nutrition for patients,
            caregivers, and clinicians.
          </p>
        </div>

        {/* Category filter */}
        {categories.length > 0 && (
          <CategoryFilter
            categories={categories}
            active={activeCategory}
            onChange={setActiveCategory}
          />
        )}

        {/* States */}
        {loading && (
          <p className="font-body text-sm text-charcoal/50 py-12 text-center">
            Loading articles...
          </p>
        )}

        {error && (
          <p className="font-body text-sm text-red-500 py-12 text-center">
            {error}
          </p>
        )}

        {!loading && !error && posts.length === 0 && (
          <p className="font-body text-sm text-charcoal/50 py-12 text-center">
            No articles found.
          </p>
        )}

        {!loading && !error && posts.length > 0 && (
          <div>
            {posts.map((post) => (
              <PostRow key={post.id} post={post} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}