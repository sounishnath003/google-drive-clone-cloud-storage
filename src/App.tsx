import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App p-2 bg-gray-50 h-screen">
      <div className="text-xl px-4 py-2 text-gray-800">Google Drive</div>
    </div>
  )
}

export default App
