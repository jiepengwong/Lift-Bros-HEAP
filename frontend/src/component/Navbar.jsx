import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { clearGlobalTimer } from "../utils/GlobalTimer";
import Swal from "sweetalert2";

function Navbar() {
  const [navbar, setNavbar] = useState(["Home", "Routine", "Logout"]);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    // Remove token and username from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("expirationTime");
    // Clear the global timer
    clearGlobalTimer();
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    Swal.fire({
      title: "Success!",
      text: "You have successfully logged out!",
      icon: "success",
      confirmButtonText: "Cool",
    });
  };

  const toggleMenu = () => {
    setMenuOpen((prevMenuOpen) => !prevMenuOpen);
  };

  const handleMenuClick = () => {
    // Close the menu after clicking an item
    setMenuOpen(false);
  };

  // To close the menu when the window size reaches desktop breakpoint (e.g., 640px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="top-0 w-full block">
      <div className="bg-yellow-300 flex justify-between items-center w-full h-20 px-2 2xl:px-16">
        <Link to="/" onClick={handleMenuClick}>
          <div>
            <p className="font-bold text-2xl">Lift Bro 🦾</p>
          </div>
        </Link>

        {/* Navbar desktop */}
        <div className={`hidden sm:block ${menuOpen ? "hidden" : ""}`}>
          <ul>
            {navbar.map((item) => (
              <li
                key={item}
                className="font-bold cursor-pointer inline-block px-6 py-2 mx-2 rounded-md hover:bg-green-300"
              >
                {item === "Home" ? (
                  <Link to="/" onClick={handleMenuClick}>
                    {item}
                  </Link>
                ) : item === "Logout" ? (
                  <Link to="/login" onClick={handleLogout}>
                    {item}
                  </Link>
                ) : (
                  <Link to={`/${item}`} onClick={handleMenuClick}>
                    {item}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Navbar mobile */}
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <div
            className={`cursor-pointer flex flex-col justify-center items-center w-6 h-6`}
            onClick={toggleMenu}
          >
            <div
              className={`w-6 h-0.5 bg-black transition-all duration-300 transform ${
                menuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            ></div>
            <div
              className={`w-6 h-0.5 bg-black my-1 transition-all duration-300 opacity ${
                menuOpen ? "opacity-0" : ""
              }`}
            ></div>
            <div
              className={`w-6 h-0.5 bg-black transition-all duration-300 transform ${
                menuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            ></div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          menuOpen
            ? "flex flex-col opacity-100 max-h-full"
            : "opacity-0 max-h-0"
        } z-10 bg-white shadow-lg relative rounded-xl sidebar`}
        style={{
          backgroundColor: menuOpen ? "#f0f0f0" : "white",
          borderRadius: menuOpen ? "4px" : "0",
          overflow: menuOpen ? "visible" : "hidden",
          transition: "opacity 0.3s ease-in-out, max-height 0.3s ease-in-out",
        }}
      >
        <ul className={`${menuOpen ? "block sm:hidden" : "hidden"}`}>
          {navbar.map((item, index) => (
            <li
              key={item}
              className={`z-10 font-bold cursor-pointer block py-2 mx-2 rounded-md ${
                index === navbar.length - 1 ? "last-item" : ""
              }`}
              onClick={handleMenuClick}
            >
              {item === "Home" ? (
                <Link to="/">{item}</Link>
              ) : item === "Logout" ? (
                <Link to="/login" onClick={handleLogout}>
                  {item}
                </Link>
              ) : (
                <Link to={`/${item}`}>{item}</Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
