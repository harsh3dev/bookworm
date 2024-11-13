"use client"
import React, { useEffect } from 'react'
import { useAuth, useUser } from '@clerk/nextjs'
import { motion } from 'framer-motion'  
import styles from '../page.module.css'
import BookCard from '../BookCard'
import { useSelector } from 'react-redux';
import Link from 'next/link'




const Page = () => {
    const user = useUser()
    const [books, setBooks] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const favorites = useSelector((state) => state.favorites.favorites);

    useEffect(() => {
        console.log(favorites)
        console.log(favorites[0])
        const fetchBooks = async () => {
            try {
                setLoading(true)
                const response = await fetch('/api/books')
                const data = await response.json()
                setBooks(data)
                setLoading(false)
                console.log(data)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        fetchBooks()
    }, [])

    const session = useAuth();
    if(session.isSignedIn === false){
        return <div>
            <h1>You are not logged in</h1>
        </div>
    }


    return (
        loading ? <div className={styles.main}>
        <div className='w-full h-full flex flex-col justify-start items-center '>
        <div className={styles.grouper}>
            <h1 className={styles.title}>Saved Books</h1>
            <ul className={styles.ulGroupStyle}>
            {Array.from({ length: 10 }, (_, index) => index + 1).map((_, i) => (
                <li
                key={i}
                className='w-72 h-96 bg-gray-300 rounded-lg shadow-lg p-4 m-4'
                >    
                </li>
            ))}
            </ul>
        </div>
        </div>
    </div> :
        <div className={styles.main}>
            <div className='w-full h-full flex flex-col justify-start items-center '>
            {
                favorites.length === 0 ? <div className={styles.grouper}>
                <h1 className={styles.title}>Saved Books</h1>
                <h1 className='text-3xl'>No books saved</h1>
            </div> : <div className={styles.grouper}>
                <h1 className={styles.title}>Saved Books</h1>
                <ul className={styles.ulGroupStyle}>
                {favorites?.map((book, i) => (
                    <motion.li
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", damping: 50, mass: 0.75 }}
                    initial={{ opacity: 0, x: 200 * (i + 1) }}
                    animate={{ opacity: 1, x: 0 }}
                    key={i}
                    >
                    <Link
                        href={`/books/${book[0].id}`}
                        style={{ textDecoration: "none" }}
                    >
                        <BookCard
                        title={book[0].title}
                        coverImage={book[0].image}
                        description={book[0].description}
                        />
                    </Link>
                    </motion.li>
                ))}
                </ul>
            </div>
            }
            </div>
        </div>
    );
}

export default Page
