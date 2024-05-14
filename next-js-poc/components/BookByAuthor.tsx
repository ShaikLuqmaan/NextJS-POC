import React, { useState } from "react";

interface Book {
  id: number;
  title: string;
}

const BooksByAuthor = () => {
  const [authorName, setAuthorName] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchBooks = () => {
    setLoading(true);
    fetch(
      `http://localhost:3000/get-book-by-author?author=${encodeURIComponent(
        authorName
      )}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }
        return response.json();
      })
      .then(setBooks)
      .catch((error) => {
        console.error(error);
        setError(error.message);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="app container mx-auto px-4 pt-4">
      <h1 className="head_text blue_gradient">Books by Author</h1>
      <div className="flex flex-col items-center my-4">
        <input
          type="text"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          placeholder="Enter author's name"
          className="search_input"
        />
        <button onClick={fetchBooks} className="outline_btn mt-2">
          Search
        </button>
      </div>
      {loading && <div className="flex-center">Loading...</div>}
      {error && <div className="text-red-500 text-center">{error}</div>}
      <ul className="desc list-none p-0 mt-4">
        {books.map((book) => (
          <li key={book.id} className="mt-2 text-gray-800">
            {book.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BooksByAuthor;
