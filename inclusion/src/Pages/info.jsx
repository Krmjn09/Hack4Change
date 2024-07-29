// Info.jsx
import React from "react"
import {
  MagnifyingGlassIcon,
  MicrophoneIcon,
} from "@heroicons/react/24/outline"
import Schemes from "../components/Schemes"

const Info = () => {
  return (
    <>
      <nav className="bg-[#54363b] text-white p-4 flex items-center justify-between">
        <div className="flex-1">
          <div className="horizontal-scroller flex items-center overflow-x-auto">
            <div className="text-center">
              <ul className="flex space-x-10">
                <li>Choose Language</li>
                <li>ਭਾਸ਼ਾ ਚੁਣੋ</li>
                <li>भाषा चुनें</li>
                <li>ಭಾಷೆ ಆಯ್ಕೆಮಾಡಿ</li>
              </ul>
              <ul className="flex space-x-32 mt-4">
                <li>
                  <a href="/english" className="hover:underline">
                    English
                  </a>
                </li>
                <li>
                  <a href="/punjabi" className="hover:underline">
                    ਪੰਜਾਬੀ
                  </a>
                </li>
                <li>
                  <a href="/hindi" className="hover:underline">
                    हिंदी
                  </a>
                </li>
                <li>
                  <a href="/kannada" className="hover:underline">
                    ಕನ್ನಡ
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 rounded bg-white text-black placeholder-gray-500"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
          </div>
          <MicrophoneIcon className="w-6 h-6 text-white cursor-pointer" />
        </div>
      </nav>
      <Schemes />
    </>
  )
}

export default Info
