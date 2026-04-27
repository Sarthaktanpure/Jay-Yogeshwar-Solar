import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import WhatsAppFloat from "./WhatsAppFloat";

function MainLayout() {
  return (
    <div className="site-shell">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

export default MainLayout;
