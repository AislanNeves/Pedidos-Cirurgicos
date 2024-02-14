import { BrowserRouter } from 'react-router-dom'
import { Router } from './infrastructure/navigation'
import React from 'react'
import { SurgeryOrdersContextProvider } from './services/surgery-orders/surgery-orders.context'

export function App() {
  return (
    <BrowserRouter>
      <SurgeryOrdersContextProvider>
        <Router />
      </SurgeryOrdersContextProvider>
    </BrowserRouter>
  )
}
