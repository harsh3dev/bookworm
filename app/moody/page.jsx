'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Moon, Sun, ArrowLeft, ArrowRight, ChevronLeft, BookOpen, Sparkles } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { moodBooks } from './moodyData'




const moodEmojis= {
  happy: { emoji: "😊", gif: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/happy-CqbV5H1n3ZWkh2Q3e2v06ZiSr5zTC6.gif" },
  excited: { emoji: "🎉", gif: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/laugh-p3MCiY5qevBes3sOjivv93hJckugBB.gif" },
  calm: { emoji: "😌", gif: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bored-pdipe0p3LcbIDYlbkcfXgnKDDPDU4T.gif" },
  nostalgic: { emoji: "🕰️", gif: null },
  mysterious: { emoji: "🕵️", gif: null },
  melancholic: { emoji: "😢", gif: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cry-VbbCwtr4KTHLOIXxGKCJYThYqgLpkX.gif" },
  adventurous: { emoji: "🌄", gif: null },
  angry: { emoji: "😠", gif: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/angry-B6CiZXniCldDPq72PFgPlPvM89JIh0.gif" },
  inLove: { emoji: "😍", gif: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/in-love-tVjRjdIW1ZGYPwfRtTaluKTEZRyTbT.gif" },
  inspirational: { emoji: "💡", gif: null },
  intriguing: { emoji: "🤔", gif: null },
}

export default function Page() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [stage, setStage] = useState('initial')
  const [mood, setMood] = useState('')
  const [books, setBooks] = useState([])
  const [activeBook, setActiveBook] = useState(0)
  const [header, setHeader] = useState('Moody')
  const [currentGif, setCurrentGif] = useState("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/robot-Ze9iy4HGsn5rPlZZjuaKZLDUui96a1.gif")
  const [currentMoodGif, setCurrentMoodGif] = useState(null)
  


  const getRandomBook = useCallback(() => {
    const allBooks = Object.values(moodBooks).flat()
    const randomIndex = Math.floor(Math.random() * allBooks.length)
    return allBooks[randomIndex]
  }, [])

  const handleMoodyReads = () => {
    setBooks([])
    setActiveBook(0)
    setStage('mood')
    setHeader('Moody Reads')
    setCurrentGif("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/spell-book-T6s5LpbHTMWQ4ln2zC3oHyGjWEFVlB.gif")
    setCurrentMoodGif(null)
  }

  const handleMysteryMaven = () => {
    const allMoods = Object.keys(moodBooks)
    const randomMood = allMoods[Math.floor(Math.random() * allMoods.length)]
    const moodBooksArray = moodBooks[randomMood]
    const shuffled = [...moodBooksArray].sort(() => 0.5 - Math.random())
    const selectedBooks = shuffled.slice(0, 5)
    setBooks(selectedBooks)
    setActiveBook(0)
    setStage('books')
    setHeader(`Mystery Maven: ${randomMood.charAt(0).toUpperCase() + randomMood.slice(1)} Books`)
    setCurrentGif("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/read-2h3SM4GEAbvqIBu9geyHdMoTQMW4ho.gif")
    setCurrentMoodGif(moodEmojis[randomMood]?.gif || null)
  }

  const handleMoodSubmit = (selectedMood) => {
    setMood(selectedMood)
    const selectedBooks = moodBooks[selectedMood] || []
    setBooks(selectedBooks)
    setActiveBook(0)
    setStage('books')
    setCurrentMoodGif(moodEmojis[selectedMood]?.gif || null)
  }

  const handleNext = () => {
    setActiveBook((prev) => (prev + 1) % books.length)
  }

  const handlePrev = () => {
    setActiveBook((prev) => (prev - 1 + books.length) % books.length)
  }

  const handleBack = () => {
    setStage('initial')
    setBooks([])
    setActiveBook(0)
    setMood('')
    setHeader('Moody')
    setCurrentGif("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/robot-Ze9iy4HGsn5rPlZZjuaKZLDUui96a1.gif")
    setCurrentMoodGif(null)
  }

  // const handleRead = (book) => {
  //   console.log(`Reading ${book.title}`)
  //   router.push(`/book/${book.id}`)
  // }

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-6 md:p-12 transition-colors duration-300 bg-gray-100 text-black `}
    >
  
      {/* Header Section */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center gap-6 mb-16"
      >
        <div className="relative">
          <Image
            src={currentGif}
            alt="Moody AI"
            width={120}
            height={120}
            className="rounded-full"
          />
          {currentMoodGif && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -bottom-4 -right-4"
            >
              <Image
                src={currentMoodGif}
                alt="Mood"
                width={50}
                height={50}
                className="rounded-full"
              />
            </motion.div>
          )}
        </div>
        <h1 className="text-6xl font-bold text-blue-600 dark:text-blue-400 tracking-tight">{header}</h1>
      </motion.div>
  
      {/* Main Content */}
      {stage === 'initial' && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col gap-6 w-full max-w-2xl"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleMoodyReads}
            className="flex items-center justify-center gap-6 px-12 py-8 bg-purple-500 text-white rounded-2xl hover:bg-purple-600 transition-all duration-300 text-xl"
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/spell-book-T6s5LpbHTMWQ4ln2zC3oHyGjWEFVlB.gif"
              alt="Moody Reads"
              width={60}
              height={60}
            />
            <span className="font-semibold">Moody Reads</span>
            <Sparkles className="w-8 h-8" />
          </motion.button>
  
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleMysteryMaven}
            className="flex items-center justify-center gap-6 px-12 py-8 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 transition-all duration-300 text-xl"
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/read-2h3SM4GEAbvqIBu9geyHdMoTQMW4ho.gif"
              alt="Mystery Maven"
              width={60}
              height={60}
            />
            <span className="font-semibold">Mystery Maven</span>
            <Sparkles className="w-8 h-8" />
          </motion.button>
        </motion.div>
      )}
  
      {/* Mood Selection Grid */}
      {stage === 'mood' && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-5xl"
        >
          {Object.entries(moodEmojis).map(([moodKey, { emoji }]) => (
            <motion.button
              key={moodKey}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleMoodSubmit(moodKey)}
              className="px-8 py-6 bg-gray-200 dark:bg-gray-700 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 flex flex-col items-center gap-3 text-xl"
            >
              <span className="text-4xl">{emoji}</span>
              <span className="capitalize font-medium">{moodKey}</span>
            </motion.button>
          ))}
        </motion.div>
      )}
  
      {/* Book Display */}
      {stage === 'books' && (
        <div className="w-full h-screen max-w-6xl mx-auto">
          <div className="relative h-[600px] w-full">
            <AnimatePresence mode="wait">
              {books.map((book, index) => (
                <motion.div
                  key={book.title}
                  initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                  animate={{
                    opacity: index === activeBook ? 1 : 0,
                    scale: index === activeBook ? 1 : 0.8,
                    rotateY: index === activeBook ? 0 : 45,
                    zIndex: index === activeBook ? 10 : 1,
                  }}
                  exit={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                  transition={{ duration: 0.5 }}
                  className={`absolute inset-0 ${index === activeBook ? 'pointer-events-auto' : 'pointer-events-none'}`}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-full">
                    <div className="w-full md:w-1/2 p-8 flex items-center justify-center bg-gray-100 dark:bg-gray-900">
                      <Image
                        src={book.image}
                        alt={book.title}
                        width={400}
                        height={600}
                        className="w-auto h-full object-contain rounded-lg shadow-lg"
                      />
                    </div>
                    <div className="w-full md:w-1/2 p-8 flex flex-col justify-between">
                      <div>
                        <motion.h2
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-3xl font-bold mb-4"
                        >
                          {book.title}
                        </motion.h2>
                        <motion.p
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                          className="text-xl text-gray-600 dark:text-gray-400 mb-4"
                        >
                          by {book.author}
                        </motion.p>
                        <motion.span
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-lg mb-6"
                        >
                          {book.genre}
                        </motion.span>
                        <div className="h-48 overflow-y-auto pr-4 mb-6">
                          <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-lg text-gray-800 dark:text-gray-200"
                          >
                            {book.description}
                          </motion.p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-10">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={handlePrev}
                          className="p-3 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
                        >
                          <ArrowLeft className="w-8 h-8" />
                          <span className="sr-only">Previous book</span>
                        </motion.button>
                        <Link href={`/books/${book.id}`}
                          className="flex items-center gap-3 px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors duration-300"
                        >
                          <span className="text-xl">Start Reading</span>
                          <ArrowRight className="w-6 h-6" />
                        </Link>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={handleNext}
                          className="p-3 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
                        >
                          <ArrowRight className="w-8 h-8" />
                          <span className="sr-only">Next book</span>
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
  
}