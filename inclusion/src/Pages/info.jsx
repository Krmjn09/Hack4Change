import React, { useState, useEffect } from "react"
import axios from "axios"
import { FaUsers, FaPlus, FaMobileAlt, FaGlobe } from "react-icons/fa"
import "./Css/Info.css"
import Signlang from "../components/Signlang"
import VideoWithCaptions from "../components/VideoWithCaptions" // Import the VideoWithCaptions component

const API_KEY = "AIzaSyBLUyx7EhbBfQ421darqJPWjv6y0So3jSI"

// Function to translate text using Google Cloud Translation API
const translateText = async (text, targetLang) => {
  const url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`

  try {
    const response = await axios.post(url, {
      q: text,
      target: targetLang,
    })

    if (
      response.data &&
      response.data.data &&
      response.data.data.translations
    ) {
      return response.data.data.translations[0].translatedText
    } else {
      throw new Error("Translation API response error")
    }
  } catch (error) {
    console.error("Error translating text:", error)
    return text // Return original text if translation fails
  }
}

const Info = () => {
  const [synthesis, setSynthesis] = useState(null)
  const [voices, setVoices] = useState([])
  const [quoteText, setQuoteText] = useState([])
  const [quotePerson, setQuotePerson] = useState("")
  const [voiceSpeaking, setVoiceSpeaking] = useState(false)
  const [voicePaused, setVoicePaused] = useState(false)
  const [currentVoice, setCurrentVoice] = useState(null)
  const [selectedLanguage, setSelectedLanguage] = useState("en") // Default language

  useEffect(() => {
    if ("speechSynthesis" in window) {
      const synth = window.speechSynthesis
      setSynthesis(synth)

      const timer = setInterval(() => {
        const voices = synth.getVoices()
        if (voices.length > 0) {
          getVoices(voices)
          clearInterval(timer)
        }
      }, 200)
    } else {
      console.log("Text-to-speech not supported by your browser.")
    }
  }, [])

  useEffect(() => {
    const fetchNewQuote = async () => {
      const links = [
        {
          name: "Pradhan Mantri Kisan Sampada Yojana",
          url: "https://www.mofpi.gov.in/Schemes/pradhan-mantri-kisan-sampada-yojana",
          target: "_blank",
        },
        {
          name: "Pradhan Mantri Fasal Bima Yojana",
          url: "https://en.wikipedia.org/wiki/Pradhan_Mantri_Fasal_Bima_Yojana",
          target: "_blank",
        },
        {
          name: "Pradhan Mantri Krishi Sinchai Yojana",
          url: "https://en.wikipedia.org/wiki/Pradhan_Mantri_Krishi_Sinchai_Yojana",
          target: "_blank",
        },
        {
          name: "National Agriculture Market (NAM)",
          url: "https://en.wikipedia.org/wiki/E-NAM",
          target: "_blank",
        },
        { name: "Know your eligible scheme", url: "#" },
      ]

      setQuoteText(links)
      setQuotePerson("")
      setVoiceSpeaking(false)
      setVoicePaused(false)

      try {
        const response = await fetch("/api/quote")
        const data = await response.json()
        const content = data.data.content.rendered || "No quote text"
        const title = data.data.title.rendered || "Unknown"

        const translatedContent = await translateText(content, selectedLanguage)
        const translatedTitle = await translateText(title, selectedLanguage)

        setQuoteText([{ name: translatedContent, url: "#" }])
        setQuotePerson(translatedTitle)

        const voice =
          voices.find((voice) => voice.lang.startsWith(selectedLanguage)) ||
          null
        setCurrentVoice(voice)
      } catch (error) {
        console.error("Error fetching new quote:", error)
      }
    }

    if (synthesis && voices.length > 0) {
      fetchNewQuote()
    }
  }, [synthesis, voices, selectedLanguage])

  const getVoices = (voices) => {
    const langRegex = /^(en|hi|pa|kn)(-[a-z]{2})?$/i
    setVoices(
      voices
        .filter((voice) => langRegex.test(voice.lang))
        .map((voice) => ({
          voice,
          name: voice.name,
          lang: voice.lang.toUpperCase(),
        }))
    )
  }

  const fetchNewQuote = async () => {
    const links = [
      { name: "Pradhan Mantri Kisan Sampada Yojana", url: "#" },
      { name: "Pradhan Mantri Fasal Bima Yojana", url: "#" },
      { name: "Pradhan Mantri Krishi Sinchai Yojana", url: "#" },
      { name: "National Agriculture Market (NAM)", url: "#" },
      { name: "Paramparagat Krishi Vikas Yojana", url: "#" },
      { name: "National livestock mission", url: "#" },
      { name: "Know your eligible scheme", url: "#" },
    ]

    setQuoteText(links)
    setQuotePerson("")
    setVoiceSpeaking(false)
    setVoicePaused(false)

    try {
      const response = await fetch("/api/quote")
      const data = await response.json()
      const content = data.data.content.rendered || "No quote text"
      const title = data.data.title.rendered || "Unknown"

      const translatedContent = await translateText(content, selectedLanguage)
      const translatedTitle = await translateText(title, selectedLanguage)

      setQuoteText([{ name: translatedContent, url: "#" }])
      setQuotePerson(translatedTitle)

      const voice =
        voices.find((voice) => voice.lang.startsWith(selectedLanguage)) || null
      setCurrentVoice(voice)
    } catch (error) {
      console.error("Error fetching new quote:", error)
    }
  }

  const playVoice = () => {
    if (voiceSpeaking) {
      if (voicePaused) {
        synthesis.resume()
        setVoicePaused(false)
      }
      return
    }

    const quoteUtterance = new SpeechSynthesisUtterance(
      quoteText.map((link) => link.name).join(" ")
    )
    const personUtterance = new SpeechSynthesisUtterance(quotePerson)

    if (currentVoice) {
      quoteUtterance.voice = currentVoice.voice
      personUtterance.voice = currentVoice.voice
    }

    quoteUtterance.onpause = () => setVoicePaused(true)
    quoteUtterance.onresume = () => setVoicePaused(false)
    quoteUtterance.onboundary = () => updateVoiceControls()

    quoteUtterance.onstart = () => {
      setVoiceSpeaking(true)
      updateVoiceControls()
    }

    personUtterance.onend = fetchNewQuote

    synthesis.speak(quoteUtterance)
    synthesis.speak(personUtterance)
  }

  const pauseVoice = () => {
    if (voiceSpeaking) {
      synthesis.pause()
      setVoicePaused(true)
    }
  }

  const stopVoice = () => {
    if (voiceSpeaking) {
      synthesis.cancel()
      setVoiceSpeaking(false)
      updateVoiceControls()
    }
  }

  const updateVoiceControls = () => {
    console.log("Voice speaking:", voiceSpeaking)
    console.log("Voice paused:", voicePaused)
  }

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value)
  }

  return (
    <>
      <div className="speech">
        <nav className="navbar">
          <h1>Inclusive World</h1>
        </nav>
        <div className="content">
          <h2>Text To Speech Converter Using React Js</h2>
          <h1 id="quote-person">{quotePerson}</h1>
          <div id="quote-text" className="quote-text">
            {quoteText.map((link, index) => (
              <div key={index}>
                <a
                  href={link.url}
                  className="text-blue-500 hover:text-blue-700"
                >
                  {link.name}
                </a>
              </div>
            ))}
          </div>
          <div>
            <label htmlFor="language-select">Speak</label>
            <select
              id="language-select"
              value={selectedLanguage}
              onChange={handleLanguageChange}
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="pa">Punjabi</option>
              <option value="kn">Kannada</option>
            </select>
          </div>
          <div className="button2-group">
            <button onClick={playVoice}>Play</button>
            <button onClick={pauseVoice}>Pause</button>
            <button onClick={stopVoice}>Stop</button>
          </div>
        </div>
      </div>
      <Signlang />
      <div className="container mx-auto p-4">
        <h1 className="text-center text-4xl font-bold text-black p-4">
          More Features and Better Features to Be Added Soon




        </h1>

        <br />

        <p className="text-center text-xl font-semibold text-black p-4">
          Video With Captions
        </p>

       
      </div>
      <VideoWithCaptions /> {/* Include the VideoWithCaptions component */}
      <footer>
        <div className="footer">
          <p className="footer-text 1xl font-bold text-center text-black p-4">
            © 2021 Inclusive World. All Rights Reserved.
          </p>
        </div>
      </footer>
    </>
  )
}

export default Info
