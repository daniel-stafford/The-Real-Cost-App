import React, { useContext } from "react"
import ErrorBoundary from "../ErrorBoundary"
import ThemeContext from "./ThemeContext"

const Header = () => {
  const [theme] = useContext(ThemeContext)
  return (
    <div>
      <p>{theme}</p>
    </div>
  )
}

export default function HeaderErrorBoundary(props) {
  return (
    <ErrorBoundary>
      {/* use spread operator for props only when passing through components, otherwise makes code pretty unreadable  Error doesn't care about prop specifics, just needs them passed through */}
      <Header {...props} />
    </ErrorBoundary>
  )
}
