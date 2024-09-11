"use client"
import React from 'react'
import { motion } from 'framer-motion'
import styles from './page.module.css'
import BookCard from './BookCard'
import { books } from '@/constants/mockData'
import Link from 'next/link'
import { BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'

const page = () => {
    return (
        <div className={styles.main}>
            <div className='w-full h-full flex flex-col justify-start items-center '>
            <header className="px-4 lg:px-6 h-fit flex items-center py-4 text-black bg-yellow-500 w-full">
                <Link className="flex items-center justify-center" href="#">
                <BookOpen className="h-6 w-6" />
                <span className="ml-2 text-2xl font-bold">BookWorm</span>
                </Link>
                <nav className="ml-auto flex gap-4 sm:gap-6">
                <Link className="" href="/books">
                    <Button className=" p-6  " >
                    Books
                    </Button>
                </Link>
                <Link className="" href="/login">
                    <Button variant="secondary" className=" p-6  " >
                    Login
                    </Button>
                </Link>
                <Link className="" href="/signup">
                <Button variant="" className=" p-6  " >
                    Signup
                    </Button>
                </Link>
                
                </nav>
            </header>
            <div className={styles.grouper}>
                <h1 className={styles.title}>ALL BOOKS</h1>
                <ul className={styles.ulGroupStyle}>
                {books.map((book, i) => (
                    <motion.li
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", damping: 50, mass: 0.75 }}
                    initial={{ opacity: 0, x: 200 * (i + 1) }}
                    animate={{ opacity: 1, x: 0 }}
                    key={i}
                    >
                    <a
                        href={`/books/${book.id}`}
                        style={{ textDecoration: "none" }}
                    >
                        <BookCard
                        title={book.title}
                        coverImage={book.image}
                        description={book.description}
                        />
                    </a>
                    </motion.li>
                ))}
                </ul>
            </div>
            </div>
        </div>
    );
}

export default page
