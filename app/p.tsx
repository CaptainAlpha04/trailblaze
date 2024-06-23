import React from 'react'
import Link from 'next/link'
import Header from './components/Header'
import Footer from './components/Footer'

function page() {
  return (
    <>
    <div className="hero min-h-screen bg-contain bg-fixed font-mono" style={{ backgroundImage: 'url("https://wallpapercave.com/wp/wp9366411.png")' }}>
    <div className="hero bg-black h-full w-full bg-opacity-80">
    <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Hello there!</h1>
          <p className="py-6">Welcome to 🔥TrailBlaze: Your AI-Powered Platform for Discovering the Perfect Career Path!</p>
          <div className="flex justify-evenly">
            <Link href="/personalized" className="tooltip-bottom tooltip" data-tip="Let the AI decide a career for you based on few options">
              <button className="btn btn-primary">Personalized</button>
            </Link>
            <Link href="/generalized" className="tooltip-bottom tooltip" data-tip="Get a roadmap and resources for a career you like! ">
              <button className="btn btn-outline">Generalized</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
    </div>
  </>
  )
}

export default page
