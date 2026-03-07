import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AdminLayout from "../../components/admin/AdminLayout";
import Editor from "../../components/admin/Editor";

export default function PostForm() {
  const { id }       = useParams(); // present when editing
  const { authFetch } = useAuth();
  const navigate      = useNavigate();
  const isEditing     = Boolean(id);

  // Form fields
  const [title,      setTitle]      = useState("");
  const [excerpt,    setExcerpt]    = useState("");
  const [body,       setBody]       = useState("");
  const [status,     setStatus]     = useState("draft");
  const [coverImage, setCoverImage] = useState(null); // File object
  const [coverPreview, setCoverPreview] = useState(null); // preview URL
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTags,       setSelectedTags]       = useState([]);
  const [newTag,     setNewTag]     = useState("");

  // Available options
  const [categories, setCategories] = useState([]);

  // UI state
  const [loading,  setLoading]  = useState(false);
  const [fetching, setFetching] = useState(isEditing);
  const [error,    setError]    = useState(null);

  // Load categories and existing post data (if editing)
  useEffect(() => {
    async function load() {
      try {
        // Always fetch categories
        const catRes  = await authFetch("/api/categories");
        const catData = await catRes.json();
        setCategories(catData.categories ?? []);

        // If editing, fetch the post
        if (isEditing) {
          const postRes  = await authFetch(`/api/posts/admin`);
          const postData = await postRes.json();
          const post     = (postData.posts ?? []).find(p => p.id === id);

          if (post) {
            setTitle(post.title ?? "");
            setExcerpt(post.excerpt ?? "");
            setBody(post.body ?? "");
            setStatus(post.status ?? "draft");
            setCoverPreview(post.cover_image_url ?? null);
            setSelectedCategories(post.categories?.map(c => c.id) ?? []);
            setSelectedTags(post.tags?.map(t => t.name) ?? []);
          }
        }
      } catch (err) {
        setError("Failed to load data.");
      } finally {
        setFetching(false);
      }
    }

    load();
  }, [id]);

  // Handle cover image selection — show preview
  function handleCoverImage(e) {
    const file = e.target.files[0];
    if (!file) return;
    setCoverImage(file);
    setCoverPreview(URL.createObjectURL(file));
  }

  // Add a tag from the input
  function addTag(e) {
    e.preventDefault();
    const tag = newTag.trim().toLowerCase();
    if (tag && !selectedTags.includes(tag)) {
      setSelectedTags(prev => [...prev, tag]);
    }
    setNewTag("");
  }

  function removeTag(tag) {
    setSelectedTags(prev => prev.filter(t => t !== tag));
  }

  function toggleCategory(id) {
    setSelectedCategories(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  }

  // Submit — builds FormData for multipart upload
  async function handleSubmit(submitStatus) {
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }
    if (!body.trim() || body === "<p></p>") {
      setError("Post body is required.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title",      title);
      formData.append("excerpt",    excerpt);
      formData.append("body",       body);
      formData.append("status",     submitStatus);
      formData.append("categories", JSON.stringify(selectedCategories));

      // Convert tag names to tag objects — backend handles upsert
      formData.append("tags", JSON.stringify(selectedTags));

      if (coverImage) {
        formData.append("image", coverImage);
      }

      const res = await authFetch(
        isEditing ? `/api/posts/${id}` : "/api/posts",
        {
          method:  isEditing ? "PUT" : "POST",
          body:    formData,
          // Do NOT set Content-Type — browser sets it with boundary for multipart
        }
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Failed to save post.");
      }

      navigate("/admin/posts");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (fetching) return (
    <AdminLayout>
      <p className="font-body text-sm text-charcoal/50">Loading...</p>
    </AdminLayout>
  );

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl text-charcoal mb-1">
            {isEditing ? "Edit Post" : "New Post"}
          </h1>
          <p className="font-body text-sm text-charcoal/50">
            {isEditing ? "Update your article." : "Write a new article."}
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 font-body text-sm px-4 py-3 rounded-md mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ── Main content — left/center ──────────────────────── */}
        <div className="lg:col-span-2 flex flex-col gap-5">

          {/* Title */}
          <div>
            <label className="font-body text-sm text-charcoal/70 block mb-1.5">
              Title <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Article title"
              className="w-full border border-neutral rounded-md px-3 py-2 font-body text-sm text-charcoal focus:outline-none focus:border-sage transition-colors duration-200"
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="font-body text-sm text-charcoal/70 block mb-1.5">
              Excerpt
              <span className="text-charcoal/30 ml-1">(shown on listing page)</span>
            </label>
            <textarea
              value={excerpt}
              onChange={e => setExcerpt(e.target.value)}
              placeholder="Short summary of the article..."
              rows={3}
              maxLength={160}
              className="w-full border border-neutral rounded-md px-3 py-2 font-body text-sm text-charcoal focus:outline-none focus:border-sage transition-colors duration-200 resize-none"
            />
            <p className="font-body text-xs text-charcoal/30 text-right mt-1">
              {excerpt.length}/160
            </p>
          </div>

          {/* Body editor */}
          <div>
            <label className="font-body text-sm text-charcoal/70 block mb-1.5">
              Body <span className="text-red-400">*</span>
            </label>
            <Editor value={body} onChange={setBody} />
          </div>
        </div>

        {/* ── Sidebar — right ─────────────────────────────────── */}
        <div className="flex flex-col gap-5">

          {/* Publish actions */}
          <div className="bg-white rounded-lg border border-neutral p-5">
            <h3 className="font-heading text-base text-charcoal mb-4">
              Publish
            </h3>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleSubmit("published")}
                disabled={loading}
                className="btn-primary w-full text-center disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Saving..." : isEditing ? "Update & Publish" : "Publish"}
              </button>
              <button
                onClick={() => handleSubmit("draft")}
                disabled={loading}
                className="btn-outline w-full text-center disabled:opacity-60 disabled:cursor-not-allowed"
              >
                Save as Draft
              </button>
            </div>
          </div>

          {/* Cover image */}
          <div className="bg-white rounded-lg border border-neutral p-5">
            <h3 className="font-heading text-base text-charcoal mb-4">
              Cover Image
            </h3>
            {coverPreview && (
              <img
                src={coverPreview}
                alt="Cover preview"
                className="w-full h-32 object-cover rounded-md mb-3"
              />
            )}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleCoverImage}
              className="w-full font-body text-xs text-charcoal/60 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:bg-sage/10 file:text-sage file:font-body file:text-xs hover:file:bg-sage/20 cursor-pointer"
            />
          </div>

          {/* Categories */}
          <div className="bg-white rounded-lg border border-neutral p-5">
            <h3 className="font-heading text-base text-charcoal mb-4">
              Categories
            </h3>
            {categories.length === 0 ? (
              <p className="font-body text-xs text-charcoal/40">
                No categories yet.
              </p>
            ) : (
              <div className="flex flex-col gap-2">
                {categories.map(cat => (
                  <label
                    key={cat.id}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat.id)}
                      onChange={() => toggleCategory(cat.id)}
                      className="accent-sage"
                    />
                    <span className="font-body text-sm text-charcoal">
                      {cat.title}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="bg-white rounded-lg border border-neutral p-5">
            <h3 className="font-heading text-base text-charcoal mb-4">
              Tags
            </h3>

            {/* Tag input */}
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newTag}
                onChange={e => setNewTag(e.target.value)}
                onKeyDown={e => e.key === "Enter" && addTag(e)}
                placeholder="Add a tag..."
                className="flex-1 border border-neutral rounded-md px-3 py-1.5 font-body text-xs text-charcoal focus:outline-none focus:border-sage transition-colors duration-200"
              />
              <button
                type="button"
                onClick={addTag}
                className="btn-primary text-xs px-3 py-1.5"
              >
                Add
              </button>
            </div>

            {/* Tag pills */}
            {selectedTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedTags.map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 bg-sage/10 text-sage font-body text-xs px-2 py-1 rounded-full"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:text-sage-dark transition-colors duration-150 leading-none"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </AdminLayout>
  );
}