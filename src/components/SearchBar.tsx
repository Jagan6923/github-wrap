import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (username: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onSearch(username.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          className="w-full px-4 py-2 pl-10 pr-12 text-sm border rounded-lg focus:outline-none focus:border-blue-500 bg-white/10 backdrop-blur-sm border-gray-700 text-white placeholder-gray-400"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        <button
          type="submit"
          className="absolute right-2 top-1.5 px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Wrap
        </button>
      </div>
    </form>
  );
}