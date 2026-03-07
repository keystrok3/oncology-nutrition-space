import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
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

// ─── Page ─────────────────────────────────────────────────────
export default function BlogPost() {
  const { slug }                  = useParams();
  const [post,    setPost]        = useState(null);
  const [loading, setLoading]     = useState(true);
  const [error,   setError]       = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);

    apiFetch(`/api/posts/${slug}`)
      .then(data => {
        setPost(data.post);
        setLoading(false);
      })
      .catch(() => {
        setError("Article not found.");
        setLoading(false);
      });
  }, [slug]);

  if (loading) return (
    <div className="section-padding text-center">
      <p className="font-body text-sm text-charcoal/50">Loading article...</p>
    </div>
  );

  if (error) return (
    <div className="section-padding text-center">
      <p className="font-body text-sm text-red-500 mb-4">{error}</p>
      <Link to="/blog" className="btn-outline">← Back to Blog</Link>
    </div>
  );

  const {
    title,
    published_at,
    cover_image_url,
    body,
    author_name,
    author_role,
    author_bio,
    author_photo,
    categories,
  } = post;

  return (
    <article>

      {/* ── Cover Image ──────────────────────────────────────── */}
      {cover_image_url && (
        <div className="w-full h-72 md:h-96 overflow-hidden">
          <img
            src={cover_image_url}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* ── Article Content ───────────────────────────────────── */}
      <div className="section-padding">
        <div className="container-narrow px-6 md:px-0">

          {/* Back link */}
          <Link
            to="/blog"
            className="font-body text-sm text-sage hover:text-sage-dark underline underline-offset-4 transition-colors duration-200 mb-8 inline-block"
          >
            ← Back to Blog
          </Link>

          {/* Categories */}
          {categories?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {categories.map((cat) => (
                <span
                  key={cat.id}
                  className="font-body text-xs uppercase tracking-widest text-lavender"
                >
                  {cat.title}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-charcoal leading-snug mb-4">
            {title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-3 font-body text-sm text-charcoal/50 mb-10 pb-8 border-b border-neutral">
            {author_name && <span>{author_name}</span>}
            {author_name && published_at && <span>·</span>}
            {published_at && <span>{formatDate(published_at)}</span>}
          </div>

          {/* ── Body ─────────────────────────────────────────── */}
          {/* Body is stored as HTML from TipTap — styled via prose classes */}
          {body && (
            <div
              className="
                font-body text-base text-charcoal/80 leading-relaxed
                [&_h2]:font-heading [&_h2]:text-2xl [&_h2]:text-charcoal [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:leading-snug
                [&_h3]:font-heading [&_h3]:text-xl [&_h3]:text-charcoal [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:leading-snug
                [&_h4]:font-heading [&_h4]:text-lg [&_h4]:text-charcoal [&_h4]:mt-6 [&_h4]:mb-2
                [&_p]:mb-5 [&_p]:leading-relaxed
                [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-5 [&_ul]:space-y-2
                [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-5 [&_ol]:space-y-2
                [&_li]:leading-relaxed
                [&_blockquote]:border-l-4 [&_blockquote]:border-sage [&_blockquote]:pl-6 [&_blockquote]:py-1 [&_blockquote]:my-6 [&_blockquote]:italic [&_blockquote]:text-charcoal/70
                [&_a]:text-sage [&_a]:underline [&_a]:underline-offset-2 [&_a]:hover:text-sage-dark
                [&_img]:rounded-lg [&_img]:max-w-full [&_img]:my-8
                [&_strong]:font-semibold [&_strong]:text-charcoal
              "
              dangerouslySetInnerHTML={{ __html: body }}
            />
          )}

          {/* ── Author card ───────────────────────────────────── */}
          {author_name && (
            <div className="mt-12 pt-8 border-t border-neutral flex items-start gap-4">
              {author_photo && (
                <img
                  src={author_photo}
                  alt={author_name}
                  className="w-14 h-14 rounded-full object-cover shrink-0"
                />
              )}
              <div>
                <p className="font-body text-sm font-medium text-charcoal">
                  {author_name}
                </p>
                {author_role && (
                  <p className="font-body text-xs text-sage uppercase tracking-wide mt-0.5 mb-2">
                    {author_role}
                  </p>
                )}
                {author_bio && (
                  <p className="font-body text-sm text-charcoal/70 leading-relaxed">
                    {author_bio}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Bottom nav */}
          <div className="mt-12 pt-8 border-t border-neutral">
            <Link to="/blog" className="btn-outline">
              ← Back to Blog
            </Link>
          </div>

        </div>
      </div>
    </article>
  );
}