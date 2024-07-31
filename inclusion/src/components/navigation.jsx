import React from "react"

export const Navigation = () => {
  return (
    <nav className="bg-gray-800 shadow-lg fixed w-full top-0 left-0 z-50">
      <div className="container mx-auto  flex justify-between ">
        {/* Logo/Brand */}
        <a className="text-white text-4xl font-bold " href="#page-top">
          InclusiveWorld
        </a>
        {/* Navigation Links */}
        <div className=" space-x-20 ml-auto">
          <a className="text-white hover:text-gray-400" href="#features">
            Features
          </a>
          <a className="text-white hover:text-gray-400" href="#about">
            About
          </a>
          <a className="text-white hover:text-gray-400" href="#services">
            Services
          </a>
          <a className="text-white hover:text-gray-400" href="#contact">
            Contact
          </a>
        </div>
      </div>
    </nav>
  )
}
