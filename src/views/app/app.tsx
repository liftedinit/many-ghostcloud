import React from 'react'
import { Routes, Route } from 'react-router-dom'
import {
  Home,
  Dashboard,
  NotFound,
  PrivacyPolicy,
  TermsOfService,
} from '../../views'
import { useDisclosure } from '@liftedinit/ui'
import { AddAccountModal } from '../../features/accounts'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export function App() {
  const modalDisclosure = useDisclosure()
  const { isOpen: isAddAccountOpen, onClose: onCloseAddAccount } =
    modalDisclosure
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={<Dashboard modalDisclosure={modalDisclosure} />}
        />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
      <AddAccountModal isOpen={isAddAccountOpen} onClose={onCloseAddAccount} />
    </>
  )
}
