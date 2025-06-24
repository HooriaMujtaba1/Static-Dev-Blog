import '../styles/globals.css';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

export default function App({ Component, pageProps }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Load and sync searchTerm with localStorage on client only
  useEffect(() => {
    const stored = localStorage.getItem('searchTerm');
    if (stored) setSearchTerm(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem('searchTerm', searchTerm);
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <main className="pt-20 px-4">
        <Component {...pageProps} searchTerm={searchTerm} />
      </main>
    </div>
  );
}

