import { useState } from 'react'
import './App.css'
import RecipeList from "./components/RecipeList"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <RecipeList />
    </>
  )
}

export default App
