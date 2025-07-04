"use client"

import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "motion/react"
import { gsap } from "gsap"
import { 
  ShoppingCart, 
  User, 
  Search, 
  Menu, 
  X, 
  ChevronDown,
  Heart,
  Package
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}

const navItems: NavItem[] = [
  {
    label: "Shop",
    href: "/shop",
    children: [
      { label: "New Arrivals", href: "/shop/new-arrivals" },
      { label: "Best Sellers", href: "/shop/best-sellers" },
      { label: "Sale", href: "/shop/sale" },
      { label: "Collections", href: "/shop/collections" }
    ]
  },
  {
    label: "Categories",
    href: "/categories",
    children: [
      { label: "Electronics", href: "/categories/electronics" },
      { label: "Fashion", href: "/categories/fashion" },
      { label: "Home & Garden", href: "/categories/home-garden" },
      { label: "Sports", href: "/categories/sports" },
      { label: "Books", href: "/categories/books" }
    ]
  },
  {
    label: "Brands",
    href: "/brands",
    children: [
      { label: "Premium Brands", href: "/brands/premium" },
      { label: "Popular Brands", href: "/brands/popular" },
      { label: "New Brands", href: "/brands/new" }
    ]
  },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" }
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const cartCountRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (logoRef.current) {
      gsap.fromTo(logoRef.current, 
        { scale: 0, rotation: -180 },
        { scale: 1, rotation: 0, duration: 1, ease: "back.out(1.7)" }
      )
    }
  }, [])

  useEffect(() => {
    if (cartCountRef.current) {
      gsap.fromTo(cartCountRef.current,
        { scale: 0 },
        { scale: 1, duration: 0.3, ease: "back.out(1.7)" }
      )
    }
  }, [])

  const handleDropdownEnter = (label: string) => {
    setActiveDropdown(label)
  }

  const handleDropdownLeave = () => {
    setActiveDropdown(null)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    if (!isMobileMenuOpen) {
      gsap.fromTo(".mobile-menu-item",
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.3, stagger: 0.1 }
      )
    }
  }

  return (
    <>
      <motion.nav
        ref={navRef}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          " top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled 
            ? "backdrop-blur-md bg-white/80 dark:bg-black/80 shadow-lg border-b border-white/20 transition-all duration-300"
            : "sticky backdrop-blur-sm bg-white/60 dark:bg-black/60"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <motion.div 
              ref={logoRef}
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                </div>
                <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ShopVibe
                </span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => handleDropdownEnter(item.label)}
                  onMouseLeave={handleDropdownLeave}
                >
                  <Link
                    href={item.href}
                    className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium"
                  >
                    <span>{item.label}</span>
                    {item.children && (
                      <ChevronDown className="w-4 h-4 transition-transform duration-200" />
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {item.children && activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-56 bg-white/90 dark:bg-black/90 backdrop-blur-md rounded-xl shadow-xl border border-white/20 py-2"
                      >
                        {item.children.map((child, index) => (
                          <motion.div
                            key={child.label}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <Link
                              href={child.href}
                              className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                            >
                              {child.label}
                            </Link>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex items-center">
              <AnimatePresence>
                {isSearchOpen ? (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 300, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center"
                  >
                    <Input
                      type="text"
                      placeholder="Search products..."
                      className="bg-white/80 dark:bg-black/80 backdrop-blur-md border-white/20"
                      autoFocus
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsSearchOpen(false)}
                      className="ml-2"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </motion.div>
                ) : (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsSearchOpen(true)}
                    className="hover:bg-white/20 dark:hover:bg-black/20"
                  >
                    <Search className="w-5 h-5" />
                  </Button>
                )}
              </AnimatePresence>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-2 lg:space-x-4">
              {/* Wishlist */}
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hidden sm:flex hover:bg-white/20 dark:hover:bg-black/20"
                >
                  <Heart className="w-5 h-5" />
                </Button>
              </motion.div>

              {/* User Account */}
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-white/20 dark:hover:bg-black/20"
                >
                  <User className="w-5 h-5" />
                </Button>
              </motion.div>

              {/* Shopping Cart */}
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.1 }} 
                whileTap={{ scale: 0.9 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-white/20 dark:hover:bg-black/20"
                >
                  <ShoppingCart className="w-5 h-5" />
                </Button>
                <motion.span
                  ref={cartCountRef}
                  className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium"
                  whileHover={{ scale: 1.2 }}
                >
                  3
                </motion.span>
              </motion.div>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden hover:bg-white/20 dark:hover:bg-black/20"
                onClick={toggleMobileMenu}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white/90 dark:bg-black/90 backdrop-blur-md border-t border-white/20"
            >
              <div className="px-4 py-6 space-y-4">
                {/* Mobile Search */}
                <div className="mobile-menu-item">
                  <Input
                    type="text"
                    placeholder="Search products..."
                    className="bg-white/80 dark:bg-black/80 backdrop-blur-md border-white/20"
                  />
                </div>

                {/* Mobile Navigation Items */}
                {navItems.map((item) => (
                  <div key={item.label} className="mobile-menu-item">
                    <Link
                      href={item.href}
                      className="block py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                    {item.children && (
                      <div className="ml-4 mt-2 space-y-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="block py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-16 lg:h-20" />
    </>
  )
}