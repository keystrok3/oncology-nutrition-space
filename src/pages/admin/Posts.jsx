import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AdminLayout from "../../components/admin/AdminLayout";

// Format date to readable string
function formatDate(dateString) {
  if (!dateString) return "—";
  return new Date(dateString).toLocaleDateString("en-KE", {
    day: "numeric", month: "short", year: "numeric",
  });
}

export default function Posts() {
  const { authFetch }              = useAuth();
  const [posts,   setPosts]        = useState([]);
  const [loading, setLoading]      = useState(true);
  const [error,   setError]        = useState(null);
  const [deleting, setDeleting]    = useState(null);

  // Load posts on mount
  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    setLoading(true);
    try {
      const res  = await authFetch("/api/posts/admin");
      const data = await res.json();
      setPosts(data.posts ?? []);
    } catch (err) {
      setError("Failed to load posts.");
    } finally {
      setLoading(false);
    }
  }

  // Toggle post status between draft and published
  async function toggleStatus(post) {
    const newStatus = post.status === "published" ? "draft" : "published";
    try {
      await authFetch(`/api/posts/${post.id}`, {
        method:  "PUT",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ status: newStatus }),
      });
      // Update local state without refetching
      setPosts(prev =>
        prev.map(p => p.id === post.id ? { ...p, status: newStatus } : p)
      );
    } catch (err) {
      alert("Failed to update post status.");
    }
  }

  // Delete post with confirmation
  async function deletePost(id) {
    if (!window.confirm("Are you sure you want to delete this post? This cannot be undone.")) return;
    setDeleting(id);
    try {
      await authFetch(`/api/posts/${id}`, { method: "DELETE" });
      setPosts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      alert("Failed to delete post.");
    } finally {
      setDeleting(null);
    }
  }

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl text-charcoal mb-1">Posts</h1>
          <p className="font-body text-sm text-charcoal/50">
            Manage your blog articles.
          </p>
        </div>
        <Link to="/admin/posts/new" className="btn-primary">
          + New Post
        </Link>
      </div>

      {/* Posts table */}
      {loading && (
        <p className="font-body text-sm text-charcoal/50">Loading posts...</p>
      )}

      {error && (
        <p className="font-body text-sm text-red-500">{error}</p>
      )}

      {!loading && !error && posts.length === 0 && (
        <div className="text-center py-16 border border-dashed border-neutral rounded-lg">
          <p className="font-body text-sm text-charcoal/50 mb-4">
            No posts yet.
          </p>
          <Link to="/admin/posts/new" className="btn-primary">
            Write your first post
          </Link>
        </div>
      )}

      {!loading && posts.length > 0 && (
        <div className="bg-white rounded-lg border border-neutral overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-neutral bg-cream">
                <th className="font-body text-xs uppercase tracking-wide text-charcoal/50 px-4 py-3">
                  Title
                </th>
                <th className="font-body text-xs uppercase tracking-wide text-charcoal/50 px-4 py-3 hidden md:table-cell">
                  Author
                </th>
                <th className="font-body text-xs uppercase tracking-wide text-charcoal/50 px-4 py-3 hidden md:table-cell">
                  Date
                </th>
                <th className="font-body text-xs uppercase tracking-wide text-charcoal/50 px-4 py-3">
                  Status
                </th>
                <th className="font-body text-xs uppercase tracking-wide text-charcoal/50 px-4 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr
                  key={post.id}
                  className="border-b border-neutral last:border-b-0 hover:bg-cream/50 transition-colors duration-150"
                >
                  {/* Title */}
                  <td className="px-4 py-3">
                    <p className="font-body text-sm text-charcoal font-medium line-clamp-1">
                      {post.title}
                    </p>
                    {post.excerpt && (
                      <p className="font-body text-xs text-charcoal/40 line-clamp-1 mt-0.5">
                        {post.excerpt}
                      </p>
                    )}
                  </td>

                  {/* Author */}
                  <td className="px-4 py-3 hidden md:table-cell">
                    <p className="font-body text-sm text-charcoal/70">
                      {post.author_name}
                    </p>
                  </td>

                  {/* Date */}
                  <td className="px-4 py-3 hidden md:table-cell">
                    <p className="font-body text-sm text-charcoal/50">
                      {formatDate(post.published_at ?? post.created_at)}
                    </p>
                  </td>

                  {/* Status badge */}
                  <td className="px-4 py-3">
                    <span
                      className={`font-body text-xs px-2 py-1 rounded-full ${
                        post.status === "published"
                          ? "bg-sage/10 text-sage"
                          : "bg-neutral text-charcoal/50"
                      }`}
                    >
                      {post.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {/* Edit */}
                      <Link
                        to={`/admin/posts/${post.id}/edit`}
                        className="font-body text-xs text-sage hover:text-sage-dark underline underline-offset-2 transition-colors duration-200"
                      >
                        Edit
                      </Link>

                      {/* Publish / Unpublish */}
                      <button
                        onClick={() => toggleStatus(post)}
                        className="font-body text-xs text-charcoal/50 hover:text-charcoal underline underline-offset-2 transition-colors duration-200"
                      >
                        {post.status === "published" ? "Unpublish" : "Publish"}
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => deletePost(post.id)}
                        disabled={deleting === post.id}
                        className="font-body text-xs text-red-400 hover:text-red-600 underline underline-offset-2 transition-colors duration-200 disabled:opacity-50"
                      >
                        {deleting === post.id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
}