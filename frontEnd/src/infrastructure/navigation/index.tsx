import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home } from '../../features/surgery-order/screens/home/home.screen'
import { Test } from '../../features/surgery-order/screens/test/test.screen'

export function Router() {
  return (
    <Routes>
      <Route path="/">
        <Route path="/" element={<Home />} />
        {/* <Route path="/index" element={<Test />} /> */}
      </Route>
    </Routes>
  )
}
