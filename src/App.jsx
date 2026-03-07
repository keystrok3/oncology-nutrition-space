import { Routes, Route } from "react-router-dom";
import Layout         from "./components/layout/Layout";
import Home           from "./pages/Home";
import Blog           from "./pages/Blog";
import BlogPost       from "./pages/BlogPost";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import AdminLogin     from "./pages/admin/Login";
import Dashboard      from "./pages/admin/Dashboard";
import Posts          from "./pages/admin/Posts";
import PostForm       from "./pages/admin/PostForm";
import About from "./pages/About";
import Programs from "./pages/Programs";

function App() {
  return (
    <Routes>
      {/* ── Public site ──────────────────────────────────────── */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="blog"        element={<Blog />}     />
        <Route path="blog/:slug"  element={<BlogPost />} />

        {/* Remaining pages — uncomment as we build them */}
        <Route path="about"        element={<About />}        />
        <Route path="programs"     element={<Programs />}     />
        {/* <Route path="testimonials" element={<Testimonials />} /> */}
        {/* <Route path="faqs"         element={<Faqs />}         /> */}
        {/* <Route path="contact"      element={<Contact />}      /> */}

        <Route
          path="*"
          element={
            <div className="section-padding container-narrow text-center">
              <h1 className="font-heading text-3xl text-sage mb-4">Coming Soon</h1>
              <p className="font-body text-charcoal">This page is under construction.</p>
            </div>
          }
        />
      </Route>

      {/* ── Admin ─────────────────────────────────────────────── */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/admin/posts" element={<ProtectedRoute><Posts /></ProtectedRoute>} />
      <Route path="/admin/posts/new" element={<ProtectedRoute><PostForm /></ProtectedRoute>} />
      <Route path="/admin/posts/:id/edit" element={<ProtectedRoute><PostForm /></ProtectedRoute>} />
    </Routes>
  );
}

export default App;