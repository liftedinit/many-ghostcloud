import React from 'react'
import { Routes, Route } from 'react-router-dom'
import {
  Home,
  Dashboard,
  NotFound,
  PrivacyPolicy,
  TermsOfService,
} from '../../views'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  )
}
