import { Outlet } from "react-router";

const AuthLayout = () => {
    return (
        <div className="bg-neutral-200 min-h-screen">
           <Outlet />
        </div>
    );
};

export default AuthLayout;