'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ArrowRight, BookOpen } from 'lucide-react'
import { useRouter } from 'next/navigation'

const genreCategories = {
  "Fiction": [
    "Adventure", "Classics", "Contemporary", "Crime", "Drama", 
    "Fantasy", "Literary Fiction", "Mystery", "Mythology", "Realistic Fiction", "Romance",
    "Science Fiction (Sci-Fi)", "Suspense", "Thriller"
  ],
  "Non-Fiction": [
    "Autobiography", "Biography", "Business", "Essays", "Health & Wellness",
    "History", "Memoir",
    "Religion & Spirituality", "Science", "Self-help", "Society & Culture", "Travel"
  ],
  "Young Adult (YA)": [
    "Coming of Age", "Fantasy", "Dystopian", "Mystery", "Romance", "Adventure"
  ],
  "Children's Books": [
    "Picture Books", "Early Readers", "Middle Grade", "Young Readers"
  ],
  "Other Genres": [
    "Anthology", "Comic Books", "Graphic Novels", "Poetry", "Short Stories", "Essays"
  ]
}

const readingFrequencies = ["Daily", "Several times a week", "Weekly", "Monthly", "Occasionally"]
const bookFormats = ["Hardcover", "Paperback", "eBook", "Audiobook"]
const languages = ["English", "Spanish", "French", "German", "Chinese", "Japanese", "Other"]
const bookstoreExperiences = ["New Releases", "Bestsellers", "Staff Picks", "Discounts/Deals", "Author Events"]

export default function Page() {
  const [preferences, setPreferences] = useState({
    genres: [] ,
    readingFrequency: '',
    bookFormats: [] ,
    languages: [] ,
    bookstoreExperiences: [] 
  })

  const router = useRouter()

  const handleGenreToggle = (genre) => {
    setPreferences(prev => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter(g => g !== genre)
        : [...prev.genres, genre]
    }))
  }

  const handleMultiSelect = (category, item) => {
    setPreferences(prev => ({
      ...prev,
      [category]: prev[category].includes(item)
        ? prev[category].filter(i => i !== item)
        : [...prev[category], item]
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('User preferences:', preferences)
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
    router.push('/books')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-xl shadow-xl w-full max-w-4xl border border-amber-200"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-3xl font-bold mb-6 text-center text-amber-800 flex items-center justify-center"
        >
          <BookOpen className="mr-2" />
          Your Reading Preferences
        </motion.h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="genres">
              <AccordionTrigger className="text-xl font-semibold text-amber-700">
                Genre Preferences
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.entries(genreCategories).map(([category, genres]) => (
                    <div key={category} className="space-y-2">
                      <h3 className="font-semibold text-lg text-amber-600">{category}</h3>
                      {genres.map((genre) => (
                        <div key={genre} className="flex items-center space-x-2">
                          <Checkbox
                            id={genre}
                            checked={preferences.genres.includes(genre)}
                            onCheckedChange={() => handleGenreToggle(genre)}
                          />
                          <Label
                            htmlFor={genre}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {genre}
                          </Label>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="reading-frequency">
              <AccordionTrigger className="text-xl font-semibold text-amber-700">
                Reading Frequency
              </AccordionTrigger>
              <AccordionContent>
                <RadioGroup
                  value={preferences.readingFrequency}
                  onValueChange={(value) => setPreferences(prev => ({ ...prev, readingFrequency: value }))}
                  className="flex flex-col space-y-2"
                >
                  {readingFrequencies.map((frequency) => (
                    <div key={frequency} className="flex items-center space-x-2">
                      <RadioGroupItem value={frequency} id={frequency} />
                      <Label htmlFor={frequency}>{frequency}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="book-formats">
              <AccordionTrigger className="text-xl font-semibold text-amber-700">
                Preferred Book Formats
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-wrap gap-4">
                  {bookFormats.map((format) => (
                    <Button
                      key={format}
                      type="button"
                      variant={preferences.bookFormats.includes(format) ? "default" : "outline"}
                      onClick={() => handleMultiSelect('bookFormats', format)}
                      className="flex-grow"
                    >
                      {format}
                    </Button>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="languages">
              <AccordionTrigger className="text-xl font-semibold text-amber-700">
                Book Language Preferences
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-wrap gap-4">
                  {languages.map((language) => (
                    <Button
                      key={language}
                      type="button"
                      variant={preferences.languages.includes(language) ? "default" : "outline"}
                      onClick={() => handleMultiSelect('languages', language)}
                      className="flex-grow"
                    >
                      {language}
                    </Button>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="bookstore-experience">
              <AccordionTrigger className="text-xl font-semibold text-amber-700">
                Preferred Bookstore Experience
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-wrap gap-4">
                  {bookstoreExperiences.map((experience) => (
                    <Button
                      key={experience}
                      type="button"
                      variant={preferences.bookstoreExperiences.includes(experience) ? "default" : "outline"}
                      onClick={() => handleMultiSelect('bookstoreExperiences', experience)}
                      className="flex-grow"
                    >
                      {experience}
                    </Button>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="pt-6"
          >
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50"
            >
              <motion.span
                className="flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Save Preferences
                <ArrowRight className="ml-2" size={20} />
              </motion.span>
            </Button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  )
}