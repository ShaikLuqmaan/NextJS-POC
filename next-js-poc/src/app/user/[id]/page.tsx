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
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/user/${id}`)
        .then((res) => res.json())
        .then(setUser)
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "profile.age") {
      setUser((prev) =>
        prev
          ? {
              ...prev,
              profile: { ...prev.profile, age: parseInt(value) },
            }
          : null
      );
    } else if (name === "profile.bio") {
      setUser((prev) =>
        prev
          ? {
              ...prev,
              profile: { ...prev.profile, bio: value },
            }
          : null
      );
    } else {
      setUser((prev) => (prev ? { ...prev, [name]: value } : null));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    fetch(`http://localhost:3000/update-user-profiles/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: user.firstName,
        lastName: user.lastName,
        age: user.profile.age,
        bio: user.profile.bio,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update user");
        }
        return res.json();
      })
      .then((updatedUser) => {
        setUser(updatedUser);
        setEditing(false);
        alert("User updated successfully");
      })
      .catch((err) => {
        setError(err.message);
        alert("Failed to update user");
      })
      .finally(() => setLoading(false));
  };

  const handleDelete = async () => {
    if (!id) return;
    fetch(`http://localhost:3000/delete-user-profile/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete user");
        }
        router.push("/users");
      })
      .catch((err) => alert(err.message));
  };
  if (loading) return <div className="text-center">Loading...</div>;
  if (error)
    return <div className="text-red-500 text-center">Error: {error}</div>;

  const ConfirmationModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center mt-4">
      <div className="bg-white p-4 rounded-lg">
        <p>Are you sure you want to delete this user?</p>
        <button onClick={handleDelete} className="delete_btn mt-2">
          Yes, Delete
        </button>
        <button
          onClick={() => setShowModal(false)}
          className="outline_btn mt-2"
        >
          Cancel
        </button>
      </div>
    </div>
  );
  return (
    <div className="app container mx-auto p-4">
      <h1 className="head_text blue_gradient">User Details</h1>
      {!editing ? (
        <div className="max-w-2xl glassmorphism mx-auto bg-white p-5 rounded-lg shadow prompt_card">
          <p className="desc">
            <strong>ID:</strong> {user?.id}
          </p>
          <p className="desc">
            <strong>First Name:</strong> {user?.firstName}
          </p>
          <p className="desc">
            <strong>Last Name:</strong> {user?.lastName}
          </p>
          <p className="desc">
            <strong>Age:</strong> {user?.profile.age}
          </p>
          <p className="desc">
            <strong>Bio:</strong> {user?.profile.bio}
          </p>
          <button onClick={() => setEditing(true)} className="outline_btn mt-4">
            Update User
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="delete_btn mt-4"
          >
            Delete
          </button>
          {showModal && <ConfirmationModal />}
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow glassmorphism"
        >
          <label className="desc block">
            First Name:
            <input
              type="text"
              name="firstName"
              value={user?.firstName}
              onChange={handleChange}
              className="form_input"
              required
            />
          </label>
          <label className="desc block">
            Last Name:
            <input
              type="text"
              name="lastName"
              value={user?.lastName}
              onChange={handleChange}
              className="form_input"
              required
            />
          </label>
          <label className="desc block">
            Age:
            <input
              type="number"
              name="profile.age"
              value={user?.profile.age.toString()}
              onChange={handleChange}
              className="form_input"
              required
            />
          </label>
          <label className="desc block">
            Bio:
            <textarea
              name="profile.bio"
              value={user?.profile.bio}
              onChange={handleChange}
              className="form_textarea"
              required
            />
          </label>

          <button type="submit" className="outline_btn mt-4">
            Submit Changes
          </button>
          <button
            type="button"
            onClick={() => setEditing(false)}
            className="outline_btn mt-4"
          >
            Cancel
          </button>
        </form>
      )}
      <button onClick={() => router.push("/")} className="outline_btn mt-4">
        Back
      </button>
    </div>
  );
};
export default UserDetails;
