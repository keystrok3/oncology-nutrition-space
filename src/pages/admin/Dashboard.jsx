import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AdminLayout from "../../components/admin/AdminLayout";

export default function Dashboard() {
  const { authFetch, user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authFetch("/api/posts/admin")
      .then(res => res.json())
      .then(data => {
        const posts = data.posts ?? [];
        const published = posts.filter(p => p.status === "published").length;
        const drafts = posts.filter(p => p.status === "draft").length;
        setStats({ total: posts.length, published, drafts });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="font-heading text-3xl text-charcoal mb-1">
          Welcome back, {user?.name}
        </h1>
        <p className="font-body text-sm text-charcoal/50">
          Here&apos;s an overview of your content.
        </p>
      </div>

      {loading ? (
        <p className="font-body text-sm text-charcoal/50">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[
            { label: "Total Posts", value: stats?.total ?? 0 },
            { label: "Published", value: stats?.published ?? 0 },
            { label: "Drafts", value: stats?.drafts ?? 0 },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="bg-white rounded-lg border border-neutral p-6 shadow-sm"
            >
              <p className="font-heading text-3xl text-sage mb-1">{value}</p>
              <p className="font-body text-sm text-charcoal/60 uppercase tracking-wide">
                {label}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <Link to="/admin/posts/new" className="btn-primary">
          + New Post
        </Link>
        <Link to="/admin/posts" className="btn-outline">
          View All Posts
        </Link>
        {user?.role === "admin" && (
          <Link to="/admin/users" className="btn-outline">
            Manage Users
          </Link>
        )}
      </div>
    </AdminLayout>
  );
}
