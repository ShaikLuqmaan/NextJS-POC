"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();
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
          <button
            onClick={() => router.push("/createUser")}
            className="outline_btn"
          >
            Create User
          </button>
        </div>
      </h1>
    </section>
  );
};

export default Home;
