// Schemes.jsx
import React, { useState } from "react"
import "./Schemes.css"

const schemesData = {
  Agriculture: [
    "Pradhan Mantri Kisan Sampada Yojana",
    "Pradhan Mantri Fasal Bima Yojana",
    "Pradhan Mantri Krishi Sinchai Yojana",
    "National Agriculture Market (NAM)",
    "Paramparagat Krishi Vikas Yojana",
    "National livestock mission",
    "Know your eligible scheme",
  ],
  Health: ["Scheme 1", "Scheme 2"],
  Education: ["Scheme 1", "Scheme 2"],
  // Add more categories and schemes as needed
}

const Schemes = () => {
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedScheme, setSelectedScheme] = useState("")

  const handleCategoryClick = (category) => {
    setSelectedCategory(category)
    setSelectedScheme("")
  }

  const handleSchemeClick = (scheme) => {
    setSelectedScheme(scheme)
  }

  const renderSchemes = () => {
    if (!selectedCategory) return null

    return schemesData[selectedCategory].map((scheme, index) => (
      <li key={index} onClick={() => handleSchemeClick(scheme)}>
        {scheme}
      </li>
    ))
  }

  return (
    <div className="App">
      <div className="sidebar">
        <ul>
          {Object.keys(schemesData).map((category, index) => (
            <li key={index} onClick={() => handleCategoryClick(category)}>
              {category}
            </li>
          ))}
        </ul>
      </div>
      <div className="content">
        <h2>Schemes for You</h2>
        <div>
          {selectedCategory && (
            <div>
              <h3>{selectedCategory}</h3>
              <ul>{renderSchemes()}</ul>
            </div>
          )}
          {selectedScheme && <p>{selectedScheme}</p>}
        </div>
      </div>
    </div>
  )
}

export default Schemes
