
import React, { useState, useEffect } from "react"
import axios from "axios"
import "./Css/Info.css" // Importing the CSS file for styling
import Signlang from "../components/Signlang"
// Replace this with your actual Google Cloud Translation API key
const API_KEY = "AIzaSyBLUyx7EhbBfQ421darqJPWjv6y0So3jSI"

// Function to translate text using Google Cloud Translation API
const translateText = async (text, targetLang) => {
  const url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`

  const response = await axios.post(url, {
    q: text,
    target: targetLang,
  })

  if (response.data && response.data.data && response.data.data.translations) {
    return response.data.data.translations[0].translatedText
  } else {
    throw new Error("Translation API response error")
  }
}

const Info = () => {
  const [synthesis, setSynthesis] = useState(null)
  const [voices, setVoices] = useState([])
  const [quoteText, setQuoteText] = useState(
    'Click "Fetch New Quote" to get a new quote.'
  )
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
    setQuoteText(
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam illo aliquid excepturi iure optio quibusdam atque placeat laboriosam veritatis repellendus fugiat dicta, rem odio omnis, voluptatem maiores. Corrupti, voluptatum unde!")
    setQuotePerson("")
    setVoiceSpeaking(false)
    setVoicePaused(false)

    fetch("/api/quote")
      .then((response) => response.json())
      .then(async (data) => {
        const content = data.data.content.rendered || "No quote text"
        const title = data.data.title.rendered || "Unknown"

        // Translate text to selected language
        const translatedContent = await translateText(content, selectedLanguage)
        const translatedTitle = await translateText(title, selectedLanguage)

        setQuoteText(translatedContent)
        setQuotePerson(translatedTitle)

        // Pick a voice based on the selected language
        const voice =
          voices.find((voice) => voice.lang.startsWith(selectedLanguage)) ||
          null
        setCurrentVoice(voice)
      })
  }

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value)
  }

  const playVoice = () => {
    if (voiceSpeaking) {
      if (voicePaused) {
        synthesis.resume()
        setVoicePaused(false)
      }
      return
    }

    const quoteUtterance = new SpeechSynthesisUtterance(quoteText)
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
          {quoteText}
        </div>
        <div>
          <label htmlFor="language-select">Select Language: </label>
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
    <Signlang/>
    </>

  )
}

export default Info
