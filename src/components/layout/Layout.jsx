import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

// Layout wraps every page — Navbar on top, Footer on bottom.
// <Outlet /> is where React Router renders the matched child page.
export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Page content grows to fill available vertical space */}
      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}