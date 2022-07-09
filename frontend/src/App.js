import './App.css'
import { Home, SubmitReport } from 'pages'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from 'components'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='report' element={<SubmitReport />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
