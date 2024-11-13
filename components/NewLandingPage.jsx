'use client'

import React, { useCallback, useEffect, useState, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Sun, Moon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from "next/link"
import ContactUs from "./ContactUs"
import Subscription from "./Subscription"
import bgimg from '@/app/bgimg.webp'


// Theme context
const ThemeContext = React.createContext({ isDark: false, toggle: () => {} })

const FlipWords = ({
  words,
  duration = 5,
  className
}) => {
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  const startAnimation = useCallback(() => {
    const word = words[words.indexOf(currentWord) + 1] || words[0];
    setCurrentWord(word);
    setIsAnimating(true);
  }, [currentWord, words]);

  useEffect(() => {
    if (!isAnimating) {
      const timer = setTimeout(() => {
        startAnimation();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isAnimating, duration, startAnimation]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentWord}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className={cn(
          "absolute left-0 right-0",
          className
        )}
      >
        {currentWord}
      </motion.div>
    </AnimatePresence>
  );
};

const TextRevealCard = ({
  text,
  revealText,
  children,
  className
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "rounded-xl p-8 relative overflow-hidden cursor-pointer bg-gradient-to-br from-amber-900/90 to-amber-800/90",
        className
      )}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { 
        opacity: 1, 
        scale: 1,
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 20
        }
      } : {}}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      <div className="h-40 relative flex items-center overflow-hidden mt-4">
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={false}
          animate={{
            opacity: isHovered ? 0 : 1,
            y: isHovered ? -20 : 0
          }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-2xl font-bold text-amber-50">{text}</p>
        </motion.div>
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={false}
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 20
          }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-lg text-center text-amber-100">{revealText}</p>
        </motion.div>
      </div>
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-amber-500"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default function NewLandingPage() {
  const [isDark, setIsDark] = useState(false);
  const toggleTheme = () => setIsDark(!isDark);

  const whyChooseUsReasons = [
    "Vast Library Collection",
    "Personalized Reading Experience",
    "AI-Powered Recommendations",
    "Read Anywhere, Anytime",
    "Competitive Pricing",
    "Regular Book Updates",
    "Interactive Reading Features",
    "Expert Book Summaries",
    "Community Book Clubs",
    "Seamless Device Sync",
    "Customizable Reading Goals",
    "24/7 Reader Support"
  ];

  return (
    <ThemeContext.Provider value={{ isDark, toggle: toggleTheme }}>
      <div className={`min-h-screen transition-colors duration-500 ${
        isDark ? 'bg-yellow-950 text-yellow-50' : 'bg-yellow-50 text-yellow-950'
      }`}>

        {/* Hero Section */}
        <section className="container min-h-[70vh] mx-auto px-4 py-20 text-center relative ">
        <Image
            src={bgimg}
            alt="Background of books"
            layout="fill"
            objectFit="cover"
            quality={100}
            className="absolute inset-0 opacity-80 brightness-[40%] "
          />
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6 h-20 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FlipWords
              words={whyChooseUsReasons}
              duration={3000}
              className={isDark ? 'text-yellow-300' : 'text-slate-200'}
            />
          </motion.h2>
          
          <h2 className="text-xl text-white " >
            Your gateway to a world of knowledge and imagination
          </h2>
          <motion.div
            className="flex items-center justify-center gap-4 mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Link href={'/sign-up'}>
              <Button
                className={`group relative px-8 py-4 text-lg font-bold rounded-full overflow-hidden ${
                  isDark ? 'bg-yellow-400 text-yellow-950 hover:bg-yellow-300' : 'bg-yellow-500 text-yellow-50 hover:bg-yellow-600'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Reading Adventure
              </Button>
            </Link> 
          </motion.div>
        </section>

        {/* Features Grid */}
        <section className="container mx-auto px-4 py-20">
          <h2 className={`text-3xl md:text-4xl font-bold text-center mb-12 ${
            isDark ? 'text-yellow-100' : 'text-yellow-900'
          }`}>
            Discover the Bookworm Difference
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Vast Collection",
                description: "Browse and purchase from our vast collection of books across all genres. Enjoy competitive prices and frequent discounts."
              },
              {
                title: "Read Anywhere",
                description: "Access your books on any device, anytime. Your library is always with you, whether on your phone, tablet, or computer."
              },
              {
                title: "Smart Notifications",
                description: "Get mobile alerts for new releases, special offers, and personalized recommendations based on your reading preferences."
              },
              {
                title: "AI Insights",
                description: "Quickly grasp key concepts with our AI-powered book summarizer. Get concise overviews of any book in your library."
              }
            ].map((feature, index) => (
              <TextRevealCard
                key={index}
                text={feature.title}
                revealText={feature.description}
                className="h-64"
              >
                <h3 className="text-xl font-semibold mb-2 text-amber-50">
                  {feature.title}
                </h3>
                <p className="text-amber-200/90">
                  {feature.description}
                </p>
              </TextRevealCard>
            ))}
          </div>
        </section>

            {/* <Subscription /> */}
        <ContactUs />

        {/* Footer */}
        <footer className={`py-12 transition-colors duration-500 ${
          isDark ? 'bg-yellow-900 text-yellow-100' : 'bg-yellow-100 text-yellow-900'
        }`}>
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">About Bookworm</h3>
                <p className={isDark ? 'text-yellow-200/80' : 'text-yellow-800/80'}>
                  Your digital haven for literature, offering a vast collection of books and innovative reading features.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  {['Home', 'Library', 'About Us', 'Contact'].map((item) => (
                    <li key={item}>
                      <a href="#" className={`hover:underline ${isDark ? 'text-yellow-200 hover:text-yellow-100' : 'text-yellow-800 hover:text-yellow-900'}`}>
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
                <p>Email: support@bookworm.com</p>
                <p>Address: Salt Lake Sector V, Kolkata</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
                <div className="flex space-x-6">
                  <a href="#" className={`hover:opacity-80 transition-opacity ${isDark ? 'text-yellow-200' : 'text-yellow-800'}`}>
                    <span className="sr-only">Facebook</span>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="hover:opacity-80 transition-opacity">
                    <span className="sr-only">GitHub</span>
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/github-umkKDAwAToTFmzV6VbWYiWOPM63ocJ.png"
                      alt="GitHub"
                      width={24}
                      height={24}
                    />
                  </a>
                  <a href="#" className="hover:opacity-80 transition-opacity">
                    <span className="sr-only">LinkedIn</span>
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/social-WMMKgqDwBWZBcyWPQHj3oECvCKCs3y.png"
                      alt="LinkedIn"
                      width={24}
                      height={24}
                    />
                  </a>
                  <a href="#" className="hover:opacity-80 transition-opacity">
                    <span className="sr-only">Instagram</span>
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/instagram-x03W2va3Lj44BZlU5xVCihe5BZPBMe.png"
                      alt="Instagram"
                      width={24}
                      height={24}
                    />
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-opacity-20 text-center">
              <p>&copy; 2024 Bookworm. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </ThemeContext.Provider>
  );
}