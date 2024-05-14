"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string | null; // Ensure it can handle null values
}

const GetProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error getting products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="app">
      <h1 className="head_text blue_gradient mb-5">Products</h1>
      <ul className="list-none p-0 m-0">
        {products.map((product) => (
          <li
            key={product.id}
            className="py-2 px-4 bg-white shadow-md rounded-lg my-2 flex gap-4 items-center"
          >
            {product.imageUrl && (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-20 h-20 object-cover rounded-full" // Adjust image styling as needed
              />
            )}
            <div>
              <strong>{product.name}</strong> - ${product.price}
              <div className="text-gray-700 text-sm">{product.description}</div>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={() => router.push("/")} className="outline_btn mt-4">
        Back
      </button>
    </div>
  );
};

export default GetProducts;
