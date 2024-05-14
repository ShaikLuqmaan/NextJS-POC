"use client";
import { useRouter, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Profile {
  age: number;
  bio: string;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  profile: Profile;
}

const UserDetails = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/user/${id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch user details");
          }
          return res.json();
        })
        .then((data) => {
          setUser(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError(err.message);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  return (
    <div className="app  container mx-auto p-4">
      <h1 className="head_text blue_gradient">User Details</h1>
      {user && (
        <div className="max-w-2xl glassmorphism mx-auto bg-white p-5 rounded-lg shadow prompt_card">
          <p className="desc">
            <strong>ID:</strong> {user.id}
          </p>
          <p className="desc">
            <strong>First Name:</strong> {user.firstName}
          </p>
          <p className="desc">
            <strong>Last Name:</strong> {user.lastName}
          </p>
          <p className="desc">
            <strong>Age:</strong> {user.profile.age}
          </p>
          <p className="desc">
            <strong>Bio:</strong> {user.profile.bio}
          </p>
        </div>
      )}
      <button onClick={() => router.push("/")} className="outline_btn mt-4">
        Back
      </button>
    </div>
  );
};
export default UserDetails;
