import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useEffect } from "react";
import { loginRequired } from "../utils/loginRequired";

function Home() {

  useEffect(() => {
    loginRequired();
  }, []);
  return (
    <div className="min-h-screen flex flex-col">
    <Navbar />
  
    <main className="flex-grow container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Home</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-gray-700">Welcome to the home page! Add your content here.</p>
      </div>
    </main>
  
    <Footer />
  </div>
  )
}

export default Home
