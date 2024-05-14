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
    <div className="app container mx-auto px-6 py-4">
      <h2 className="head_text">Create a new User</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="mb-6">
          <label className="block desc">
            First Name:
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="form_input"
              required
            />
          </label>
        </div>

        <div className="mb-6">
          <label className="block desc">
            Last Name:
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="form_input"
              required
            />
          </label>
        </div>

        <div className="mb-6">
          <label className="block desc">
            Age:
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age.toString()}
              onChange={handleChange}
              className="form_input"
              required
            />
          </label>
        </div>

        <div className="mb-6">
          <label className="block desc">
            Bio:
            <textarea
              name="bio"
              placeholder="Bio"
              value={formData.bio}
              onChange={handleChange}
              className="form_textarea"
              required
            />
          </label>
        </div>

        <button type="submit" className="outline_btn px-6 py-2 mt-4">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateUserWithProfile;
