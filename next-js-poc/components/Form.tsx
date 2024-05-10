"use client";
import React, { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";

interface IForm {
  name: string;
  description: string;
  price: string;
  isActive: boolean;
  image: File | null;
}

const Form: React.FC = () => {
  const [product, setProduct] = useState<IForm>({
    name: "",
    description: "",
    price: "",
    isActive: false,
    image: null,
  });
  const router = useRouter();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement; // Cast to HTMLInputElement
    const value = target.type === "checkbox" ? target.checked : target.value;
    setProduct({
      ...product,
      [target.name]: value,
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProduct({ ...product, image: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("isActive", String(product.isActive));
    if (product.image) {
      formData.append("image", product.image);
    }

    try {
      const response = await fetch(
        "http://localhost:3000/create-product-image",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      await response.json();
      router.push("/products");
    } catch (error) {
      console.error("Failed to submit the form:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={product.name}
        onChange={handleChange}
        required
      />

      <label htmlFor="description">Description:</label>
      <textarea
        id="description"
        name="description"
        value={product.description}
        onChange={handleChange}
        required
      />

      <label htmlFor="price">Price:</label>
      <input
        type="number"
        id="price"
        name="price"
        value={product.price}
        onChange={handleChange}
        required
      />

      <label htmlFor="isActive">Active:</label>
      <input
        type="checkbox"
        id="isActive"
        name="isActive"
        checked={product.isActive}
        onChange={handleChange}
      />

      <label htmlFor="image">Image:</label>
      <input type="file" id="image" name="image" onChange={handleFileChange} />

      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
