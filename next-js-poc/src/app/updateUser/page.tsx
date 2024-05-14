"use client";
import React, { useState, useEffect, FormEvent } from "react";
import { useRouter, useParams } from "next/navigation";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  bio: string;
}

const UpdateUser = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/user/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
          setLoading(false);
        })
        .catch((err) => setError("Failed to get user"));
    }
  }, [id]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (user) {
      fetch(`http://localhost:3000/user/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((response) => response.json())
        .then((data) => {
          alert("User updated successfully");
        })
        .catch((error) => alert("Failed to update user"));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUser((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="app glassmorphism">
      <h1 className="head_text">Update User</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block desc">
          First Name:
          <input
            type="text"
            name="firstName"
            value={user?.firstName || ""}
            onChange={handleChange}
            className="form_input"
            required
          />
        </label>
        <label className="block desc">
          Last Name:
          <input
            type="text"
            name="lastName"
            value={user?.lastName || ""}
            onChange={handleChange}
            className="form_input"
            required
          />
        </label>
        <label className="block desc">
          Age:
          <input
            type="number"
            name="age"
            value={user?.age || 0}
            onChange={handleChange}
            className="form_input"
            required
          />
        </label>
        <label className="block desc">
          Bio:
          <textarea
            name="bio"
            value={user?.bio || ""}
            onChange={handleChange}
            className="form_textarea"
            required
          />
        </label>
        <button type="submit" className="black_btn">
          Update User
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
