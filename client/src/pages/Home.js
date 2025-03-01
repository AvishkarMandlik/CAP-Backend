import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col">
    <Navbar />
    <div className="flex flex-1 justify-center items-center bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">Home Page</h1>
    </div>
    <Footer />
  </div>
  
  )
}

export default Home
