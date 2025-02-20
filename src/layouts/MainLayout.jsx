import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const MainLayout = () => {
    return (
        <div>
            <Navbar />
            <main className="bg-neutral-100 min-h-[calc(100vh-313px)]">
            <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;