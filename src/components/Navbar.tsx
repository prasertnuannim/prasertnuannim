'use client'

import { useEffect, useState } from 'react'
import {
  FiHome, FiUser, FiGrid, FiMail, FiBriefcase,
  FiArchive,
} from 'react-icons/fi'
import { motion } from 'framer-motion'

const navItems = [
  { id: 'home', label: 'Home', icon: <FiHome size={20} /> },
  { id: 'about', label: 'About', icon: <FiUser size={20} /> },
  { id: 'skills', label: 'Skills', icon: <FiGrid size={20} /> },
  { id: 'projects', label: 'Projects', icon: <FiBriefcase size={20} /> },
  { id: 'works', label: 'Works', icon: <FiArchive size={20} /> },
  { id: 'contact', label: 'Contact', icon: <FiMail size={20} /> },
]

export default function Navbar() {
  const [active, setActive] = useState('home')

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        })
      },
      { threshold: 0.6 }
    )
    navItems.forEach(item => {
      const section = document.getElementById(item.id)
      if (section) observer.observe(section)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* Sidebar (Desktop) */}
      <nav className="hidden md:fixed md:top-1/2 md:left-0 md:-translate-y-1/2 md:z-50 md:w-14 md:py-4 md:bg-[#1e1a36] md:rounded-r-2xl md:flex md:flex-col md:items-center md:space-y-6">
        {navItems.map(item => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`relative transition-all duration-300 ease-in-out hover:scale-110 ${active === item.id ? 'text-red-500 scale-110' : 'text-white'}`}
          >
            {item.icon}
            {active === item.id && (
              <motion.div
                layoutId="activeIndicator"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-4 bg-red-500 rounded"
              />
            )}
          </a>
        ))}
      </nav>

      {/* Bottom Navbar (Mobile) */}
      <nav className="fixed bottom-0 z-50 w-full bg-black p-1 md:hidden">
        <div className="flex justify-around py-2">
          {navItems.map(item => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`flex flex-col items-center text-xs transition-all duration-300 ease-in-out ${active === item.id ? 'text-white scale-110' : 'text-gray-500'}`}
            >
              {item.icon}
              {active === item.id && (
                <motion.div
                  layoutId="underline"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="w-5 h-1 bg-red-500 rounded-md mt-1"
                />
              )}
            </a>
          ))}
        </div>
      </nav>
    </>
  )
}
