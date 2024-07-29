// client/src/App.js

import React, { useState } from "react"
import axios from "axios"
import "./css/SignLang.css"

const SignLang = () => {
  const [text, setText] = useState("")
  const [signs, setSigns] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await axios.post(
        "http://localhost:3000/api/sign-language",
        { text }
      )

      if (response.data && response.data.length > 0) {
        setSigns(response.data)
      } else {
        setSigns([])
        setError("No signs available for this text.")
      }
    } catch (error) {
      console.error("Error fetching sign language data", error)
      setError("Failed to fetch sign language data. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Text to Sign Language
      </h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          placeholder="Type a phrase..."
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full transition duration-200 hover:bg-blue-500 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Converting..." : "Convert"}
        </button>
      </form>
      {error && <p className="text-red-600 text-center">{error}</p>}
      <div className="flex flex-wrap justify-center">
        {signs.length > 0 ? (
          signs.map((sign, index) => (
            <div key={index} className="m-4 text-center">
              <img
                src={sign.sign}
                alt={sign.word}
                className="w-24 h-24 rounded-lg shadow-lg"
              />
              <p className="mt-2 text-lg font-semibold text-gray-700">
                {sign.word}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">
            No signs available for this text.
          </p>
        )}
      </div>
    </div>
  )
}

export default SignLang
