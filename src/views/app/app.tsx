import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDisclosure } from '@chakra-ui/react'
import {
  Home,
  Dashboard,
  NotFound,
  PrivacyPolicy,
  TermsOfService,
} from '../../views'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { AddAccountModal } from '../../features/accounts/components/add-account-modal'

export function App() {
  const {
    isOpen: isAddModalOpen,
    onOpen: onAddModalOpen,
    onClose: onAddModalClose,
  } = useDisclosure()

  return (
    <>
      <Header onAddModalOpen={onAddModalOpen} />
      <Routes>
        <Route path="/" element={<Home onAddModalOpen={onAddModalOpen} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
      <AddAccountModal isOpen={isAddModalOpen} onClose={onAddModalClose} />
    </>
  )
}
