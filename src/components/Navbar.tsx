'use client'

import { useEffect, useState } from 'react'
import {
  FiHome, FiUser, FiGrid, FiMail, FiBriefcase, FiArchive,
} from 'react-icons/fi'
import { motion } from 'framer-motion'

const navItems = [
  { id: 'home', label: 'Home', icon: FiHome },
  { id: 'about', label: 'About', icon: FiUser },
  { id: 'skills', label: 'Skills', icon: FiGrid },
  { id: 'projects', label: 'Projects', icon: FiBriefcase },
  { id: 'works', label: 'Works', icon: FiArchive },
  { id: 'contact', label: 'Contact', icon: FiMail },
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
      { threshold: 0.1 }
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
        {navItems.map(item => {
          const Icon = item.icon
          return (
            <motion.a
              key={item.id}
              href={`#${item.id}`}
              className="group relative flex items-center justify-center text-white"
              whileHover={{ scale: 1.15 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Icon size={20} className={active === item.id ? 'text-red-500' : 'text-white'} />
              {active === item.id && (
                <motion.div
                  layoutId="activeIndicator"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-4 bg-red-500 rounded"
                />
              )}
            </motion.a>
          )
        })}
      </nav>

      {/* Bottom Navbar (Mobile) */}
      <nav className="fixed bottom-0 z-50 w-full bg-black p-1 md:hidden">
        <div className="flex justify-around py-2">
          {navItems.map(item => {
            const Icon = item.icon
            return (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                className="flex flex-col items-center text-xs"
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Icon size={20} className={active === item.id ? 'text-white' : 'text-gray-500'} />
                {active === item.id && (
                  <motion.div
                    layoutId="underline"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className="w-5 h-1 bg-red-500 rounded-md mt-1"
                  />
                )}
              </motion.a>
            )
          })}
        </div>
      </nav>
    </>
  )
}
