import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar({ searchTerm, setSearchTerm }) {
  const [input, setInput] = useState(searchTerm || '');

  useEffect(() => {
    setInput(searchTerm || '');
  }, [searchTerm]);

  const onInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    if (setSearchTerm) setSearchTerm(value);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link href="/" className="navbar-brand">
          My Coding Journey
        </Link>

        <div className="navbar-actions">
          <div className="relative flex items-center">
            <input
              id="search-input"
              type="text"
              value={input}
              onChange={onInputChange}
              placeholder="Search posts..."
              className="search-input pl-4 pr-4 py-2"
              aria-label="Search posts"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
