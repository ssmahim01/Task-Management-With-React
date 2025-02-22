import { useEffect, useState } from "react";
import { Outlet } from "react-router";

const AuthLayout = () => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    
      useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
      }, [theme]);

    return (
        <div className={`${theme === "light" ? "bg-neutral-200" : "bg-neutral-800"} min-h-screen`}>
           <Outlet />
        </div>
    );
};

export default AuthLayout;