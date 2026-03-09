import AppNavbar from "./../Componants/AppNavbar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      {/* main layout for navbar and pages */}
      <div className="min-h-screen bg-amber-50/50">
        <AppNavbar />
        <main className=" container max-w-7xl mx-auto p-4 ">
          <Outlet />
        </main>
      </div>
    </>
  );
}
