"use client"
import { books } from "@/constants/mockData"
import '@fortawesome/fontawesome-free/css/all.min.css'
import { motion } from 'framer-motion'
import { useParams } from "next/navigation"
import { useEffect } from "react"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Editor, useDomValue } from "reactjs-editor"
import styles from './book.module.css'
import Link from "next/link"
import { Button } from "@/app/signup/Components"
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function BookPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [aiGeneratedSummary, setAIGeneratedSummary] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { id } = useParams();

    const { dom, setDom } = useDomValue();

    const selectedBook = books.filter((book, i) => {
        return id === String(book.id);
    });
    const notify = () => toast("Your changes has been saved!!");
    const handleSummarizeClick = async () => {
        setLoading(true);
        setError('');
        const bookId = selectedBook[0]?.id;
        if (!bookId) {
            setError('Invalid book ID. Please select a valid book.');
            setLoading(false);
            return;
          }
        try {
            const response = await fetch('/api/summarize', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ bookId }),
        });
    
        const data = await response.json();
            if (response.ok) {
            setAIGeneratedSummary(data.summary); // Store the AI summary in state
            } else {
            setError('Failed to generate summary. Please try again.');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
        };
    
    
    const handleSave = () => {
        const updatedDomValue = {
        key: dom?.key,
        props: dom?.props,
        ref: dom?.ref,
        type: dom?.type,
        };

        localStorage.setItem(
        `dom${selectedBook[0].id}`,
        JSON.stringify(updatedDomValue)
        );
        notify();
    };

    useEffect(() => {
        const savedDom = localStorage.getItem(`dom${selectedBook[0].id}`);
        if (savedDom) {
        setDom(JSON.parse(savedDom));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!selectedBook.length) return <p>Book not found</p>;

    return (
        <motion.div
        transition={{ type: "spring", damping: 40, mass: 0.75 }}
        initial={{ opacity: 0, x: 1000 }}
        animate={{ opacity: 1, x: 0 }}
        >
        <motion.section
            transition={{ type: "spring", damping: 44, mass: 0.75 }}
            initial={{ opacity: 0, y: -1000 }}
            animate={{ opacity: 1, y: 0 }}
            className={styles.appBar}
        >
            <Link href={"/books"} className={styles.leftIcons}>
            <i
                style={{ fontSize: "20px", cursor: "pointer" }}
                className="fas fa-chevron-left"
            ></i>
        </Link>
        <div className={styles.title}>
            {" "}
            <h2 className={styles.titleStyles}> {selectedBook[0].title}</h2>
            </div>
            <div className={styles.icons}>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                <Button variant="outline" onClick={handleSummarizeClick}> Generate AI Summary</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[625px] bg-white rounded-lg ">
                <DialogHeader>
                    <DialogTitle>AI-Generated Summary</DialogTitle>
                    <DialogDescription>
                    Here{"'"}s an AI-generated summary of the Book.
                    </DialogDescription>
                </DialogHeader>
                <div className="mt-4 max-h-[400px] bg-white overflow-y-auto">
                    <p className="text-sm text-gray-800 leading-relaxed">
                        {loading && 'Generating Summary...'}
                        {error && <p className="text-red-500">{error}</p>}
                    {aiGeneratedSummary}
                    </p>
                </div>
                </DialogContent>
            </Dialog>
            <button className={styles.saveButton} onClick={handleSave}>
                Save
            </button>
            <i style={iconStyle} className="fas fa-cog"></i>
            <i style={iconStyle} className="fas fa-share"></i>
            <i style={iconStyle} className="fas fa-search"></i>
        </div>
        </motion.section>

    <Editor
        /** htmlContent accepts only one element. Just wrap everything on one element **/
        htmlContent={`
        <main className="bookContainer px-8 ">
    <aside>
    <h1 className="center">${selectedBook[0].title} </h1>
    <span className="center small"> By ${selectedBook[0].author} </span>
    <div className='mx-5'>${selectedBook[0].content}</div>
    </aside>
        </main>
        `}
        className="editor px-8 "
        />
        <ToastContainer />
    </motion.div>
    );
}


const iconStyle ={marginRight:'20px',fontSize:'20px'}




/*
const Groq = require('groq-sdk');

const groq = new Groq();
async function main() {
  const chatCompletion = await groq.chat.completions.create({
    "messages": [
      {
        "role": "user",
        "content": `You are generating a summary for a book titled ${selectedBook[0].title}, authored by ${selectedBook[0].author}. The book's full content is provided in HTML format.\nGenerate a concise and engaging summary of the book titled ${selectedBook[0].title} by ${selectedBook[0].author}. The summary should capture the main themes, characters, and overall essence of the book. The summary should be suitable for someone who wants a quick overview of the story and its key elements without reading the full text.\n\n ${selectedBook[0].content} .\n\nPlease keep the summary between 100-150 words, focusing on the important aspects of the narrative.\n`
      }
    ],
    "model": "llama3-8b-8192",
    "temperature": 1,
    "max_tokens": 1024,
    "top_p": 1,
    "stream": true,
    "stop": null
  });

  for await (const chunk of chatCompletion) {
    process.stdout.write(chunk.choices[0]?.delta?.content || '');
  }
}

main();
*/