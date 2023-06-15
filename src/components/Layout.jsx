import { Box } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Navbar from "./Navbar"

const Layout = () => {
  return (
    <Box style={{minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
        <Navbar />
        <Box variant='main'>
        <Outlet />
        </Box>
        <Footer />
    </Box>
  )
}

export default Layout