"use client";
import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

interface UserFormData {
  firstName: string;
  lastName: string;
  age: number;
  bio: string;
}

const CreateUserWithProfile = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<UserFormData>({
    firstName: "",
    lastName: "",
    age: 0,
    bio: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "age") {
      setFormData({
        ...formData,
        age: parseInt(value) || 0,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:3000/create-user-profiles",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to create user with profile");
      }
      alert("User with profile successfully created");
      router.push(`/user/${data.user.id}`);
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-3">Create a new User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-8">
          <label className="block">
            First Name:
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="p-2 border rounded w-full"
              required
            />
          </label>
        </div>

        <div className="mb-8">
          <label className="block">
            Last Name:
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="p-2 border rounded w-full"
              required
            />
          </label>
        </div>

        <div className="mb-8">
          <label className="block">
            Age:
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age.toString()}
              onChange={handleChange}
              className="p-2 border rounded w-full"
              required
            />
          </label>
        </div>

        <div className="mb-8">
          <label className="block">
            Bio:
            <textarea
              name="bio"
              placeholder="Bio"
              value={formData.bio}
              onChange={handleChange}
              className="p-2 border rounded w-full"
              required
            />
          </label>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateUserWithProfile;
