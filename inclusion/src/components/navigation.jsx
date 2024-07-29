import React, { useState } from "react"

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleLinkClick = () => {
    setIsOpen(false) // Close the menu when a link is clicked
  }

  return (
    <nav className="bg-gray-800 shadow-lg fixed w-full top-0 left-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo/Brand */}
        <a className="text-white text-4xl font-bold" href="#page-top">
          InclusiveWorld
        </a>
        {/* Hamburger Menu Button */}
        <button
          onClick={toggleMenu}
          className="text-white block lg:hidden focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
        {/* Navigation Links */}
        <div
          className={`lg:flex lg:items-center lg:space-x-4 lg:ml-auto transition-all duration-300 ease-in-out ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <a
            className="text-white hover:text-gray-400"
            href="#features"
            onClick={handleLinkClick}
          >
            Features
          </a>
          <a
            className="text-white hover:text-gray-400"
            href="#about"
            onClick={handleLinkClick}
          >
            About
          </a>
          <a
            className="text-white hover:text-gray-400"
            href="#services"
            onClick={handleLinkClick}
          >
            Services
          </a>
          <a
            className="text-white hover:text-gray-400"
            href="#portfolio"
            onClick={handleLinkClick}
          >
            Gallery
          </a>
          <a
            className="text-white hover:text-gray-400"
            href="#testimonials"
            onClick={handleLinkClick}
          >
            Testimonials
          </a>
          <a
            className="text-white hover:text-gray-400"
            href="#team"
            onClick={handleLinkClick}
          >
            Team
          </a>
          <a
            className="text-white hover:text-gray-400"
            href="#contact"
            onClick={handleLinkClick}
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  )
}
