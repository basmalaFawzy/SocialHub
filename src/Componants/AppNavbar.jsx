import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownTrigger,
  DropdownSection,
  Avatar,
  Skeleton,
} from "@heroui/react";
import { GoHome, GoPerson, GoBell, GoGear, GoSignOut } from "react-icons/go";

import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";
import { FaBars } from "react-icons/fa";
import { UserContext } from "../context/UserContext";

export default function AppNavbar() {
  const {  setuserToken } = useContext(AuthContext);
  const { userData } = useContext(UserContext);
  const { name, photo } = userData || {};
  const navigate = useNavigate();


  function logOut() {
    localStorage.removeItem("userToken");
    setuserToken(null);
    navigate("/auth/login");
  }

  return (
    <Navbar
      className="shadow-sm border-b border-gray-100 bg-white/80 backdrop-blur-md"
      maxWidth="xl"
      height="4rem"
    >
      {/* Logo/Brand */}
      <NavbarBrand>
        <div className="flex items-center gap-1">
          <div className="w-8 h-8 rounded-xl bg-linear-to-br from-blue-500 to-teal-500 flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <p className="font-bold text-xl text-gray-800">
            Social<span className="bg-linear-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent ">Hub</span>
          </p>
        </div>
      </NavbarBrand>

      {/* Main Navigation */}
      <div className="hidden sm:flex bg-gray-50/90 px-2 py-1 rounded-2xl border border-gray-200/80 shadow-sm">
        <NavbarContent
          className=" gap-1 font-medium"
          justify="center"
        >
          <NavbarItem>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "text-blue-600 bg-white shadow-md"
                    : "text-gray-600 hover:bg-white hover:text-gray-900 hover:shadow-sm"
                }`
              }
            >
              <GoHome size={20} strokeWidth={1.5} />
              <span className="hidden md:flex">Home</span>
            </NavLink>
          </NavbarItem>

          <NavbarItem>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "text-blue-600 bg-white shadow-md"
                    : "text-gray-600 hover:bg-white hover:text-gray-900 hover:shadow-sm"
                }`
              }
            >
              <GoPerson size={20} strokeWidth={1.5} />
              <span className="hidden md:flex">Profile</span>
            </NavLink>
          </NavbarItem>

          <NavbarItem>
            <NavLink
              to="/notifications"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "text-blue-600 bg-white shadow-md"
                    : "text-gray-600 hover:bg-white hover:text-gray-900 hover:shadow-sm"
                }`
              }
            >
              <div className="relative">
                <GoBell size={20} strokeWidth={1.5} />
              </div>
              <span className="hidden md:flex">Notifications</span>
            </NavLink>
          </NavbarItem>
        </NavbarContent>
      </div>

      {/* Right Section */}
      <NavbarContent as="div" justify="end" className="gap-3">
        {/* Profile Avatar */}
        <Dropdown placement="bottom-end" className="mt-2">
          <DropdownTrigger>
            <div className="flex items-center gap-2 cursor-pointer text-gray-700 bg-gray-50/90 px-3 py-2 rounded-full border border-gray-200/80 shadow-sm">
              <Avatar
                isBordered
                as="button"
                className="transition-transform hover:scale-105 border-2 border-blue-200 shadow-sm"
                color="primary"
                name="Jason Hughes"
                size="sm"
                src={photo||"https://placehold.co/40x40/png"}
              />
              <span className="hidden md:block font-semibold">{name}</span>
              <FaBars />
            </div>
          </DropdownTrigger>
          <DropdownMenu
            className="py-2"
            aria-label="Profile Actions"
            variant="flat"
          >
            <DropdownSection showDivider>
              <DropdownItem
                key="home-link"
                startContent={<GoHome size={16} />}
                onPress={() => navigate("/")}
                className="flex sm:hidden text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              >
                Home
              </DropdownItem>
              <DropdownItem
                key="profile-link"
                startContent={<GoPerson size={16} />}
                onPress={() => navigate("/profile")}
                className="text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              >
                Profile
              </DropdownItem>
              <DropdownItem
                key="notifications-link"
                startContent={<GoBell size={16} />}
                onPress={() => navigate("/notifications")}
                className="flex sm:hidden text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              >
                Notifications
              </DropdownItem>
              <DropdownItem
                key="settings-link"
                startContent={<GoGear size={16} />}
                onPress={() => navigate("/settings")}
                className="text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              >
                Account Settings
              </DropdownItem>
            </DropdownSection>
            <DropdownItem
              key="logout"
              startContent={<GoSignOut size={16} />}
              onPress={() => logOut()}
              className="text-red-700 hover:bg-red-50"
            >
              Logout
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
