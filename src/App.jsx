
import Home from './Pages/Home'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Dashboard from './Pages/Dashboard'
import './App.css'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import CreateAnnouncement from './components/CreateAnnouncement'
import Announcements from './Pages/Announcements'
import MyAnnouncements from './Pages/MyAnnouncements'
import ProtectedRoute from './components/ProtectedRoute'
import ProductDetail from './Pages/ProductDetail'
import PublicAnnouncements from './Pages/PublicAnnouncements'
import EditProfile from './Pages/EditeProfile'
import Chat from './Pages/Chat'
import Messages from './Pages/Messages'
import VerifyEmail from './Pages/VerifyEmail'
import ChiSiamo from './Pages/ChiSiamo'
import Contacts from './Pages/Contacts'
import Privacy from './Pages/Privacy'
import Terms from './Pages/Terms'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Pagina iniziale */}
        <Route
          path="/"
          element={<Navigate to="/home" replace />}
        />

        {/* Home */}
        <Route path="/home" element={<Home />} />

        {/* Pagine pubbliche */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/announcements" element={<PublicAnnouncements />} />
        <Route path="/announcements/:id" element={<ProductDetail />} />
        <Route path="/verifica-email/:token" element={<VerifyEmail />} />

        {/* Pagine informative */}
        <Route path="/chi-siamo" element={<ChiSiamo />} />
        <Route path="/contatti" element={<Contacts />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/termini" element={<Terms />} />

        {/* Pagine riservate agli utenti autenticati */}
        <Route element={<ProtectedRoute />}>
          <Route path="/messaggi" element={<Messages />} />
          <Route path="/chat/:id" element={<Chat />} />
          <Route path="/modifica-profilo" element={<EditProfile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/announcements/create" element={<CreateAnnouncement />} />
          <Route path="/my-announcements" element={<MyAnnouncements />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
