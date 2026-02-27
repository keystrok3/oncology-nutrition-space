import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        {/* Home page */}
        <Route index element={<Home />} />

        {/* Remaining pages — uncomment as we build them */}
        {/* <Route path="about" element={<About />} /> */}
        {/* <Route path="programs" element={<Programs />} /> */}
        {/* <Route path="blog" element={<Blog />} /> */}
        {/* <Route path="testimonials" element={<Testimonials />} /> */}
        {/* <Route path="faqs" element={<Faqs />} /> */}
        {/* <Route path="contact" element={<Contact />} /> */}

        {/* Fallback for unbuilt routes */}
        <Route
          path="*"
          element={
            <div className="section-padding container-narrow text-center">
              <h1 className="font-heading text-3xl text-sage mb-4">
                Coming Soon
              </h1>
              <p className="font-body text-charcoal">
                This page is under construction.
              </p>
            </div>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;