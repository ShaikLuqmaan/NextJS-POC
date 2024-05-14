"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import BooksByAuthor from "../../components/BookByAuthor";

interface Author {
  id: number;
  name: string;
}
const Home = () => {
  const router = useRouter();
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/get-authors")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch authors");
        }
        return response.json();
      })
      .then(setAuthors)
      .catch((error) => {
        console.error(error);
        setError(error.message);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Learn
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center"> Next JS</span>
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={() => router.push("/createStudent")}
            className="outline_btn"
          >
            Add Students
          </button>
          <button
            onClick={() => router.push("/students")}
            className="black_btn"
          >
            List Students
          </button>
          <button
            onClick={() => router.push("/createProduct")}
            className="outline_btn"
          >
            Add Products
          </button>
          <button
            onClick={() => router.push("/products")}
            className="black_btn"
          >
            List Products
          </button>
          <button onClick={() => router.push("/users")} className="outline_btn">
            User Services
          </button>
        </div>
        <h1 className="head_text blue_gradient">All Authors</h1>
        <ul className="desc">
          {authors.map((author) => (
            <li key={author.id}>{author.name}</li>
          ))}
        </ul>
      </h1>
      <BooksByAuthor />
    </section>
  );
};

export default Home;
