import './App.css'
import { Home, SubmitReport } from 'pages'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar, NotificationBar, NotificationProvider } from 'components'

function App() {
  return (
    <NotificationProvider>
      <BrowserRouter>
        <Navbar />
        <NotificationBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='report' element={<SubmitReport />} />
        </Routes>
      </BrowserRouter>
    </NotificationProvider>
  )
}

export default App
