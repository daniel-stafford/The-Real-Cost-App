import React, { useState } from "react"
import Header from "./components/Header"
import ThemeContext from "./components/ThemeContext"
import Footer from "./components/Footer"

const App = () => {
  const themeHook = useState("darkblue")
  return (
    <ThemeContext.Provider value={themeHook}>
      <div>
        <Header />
        <Footer />
      </div>
    </ThemeContext.Provider>
  )
}

export default App
