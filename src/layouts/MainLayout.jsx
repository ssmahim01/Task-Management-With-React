import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const MainLayout = () => {
    return (
        <div>
            {/* Navbar Component */}
            <Navbar />

            {/* Children contents of Main layout */}
            <main className="min-h-[calc(100vh-313px)]">
            <Outlet />
            </main>

            {/* Footer Component */}
            <Footer />
        </div>
    );
};

export default MainLayout;