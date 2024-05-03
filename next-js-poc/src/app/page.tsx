import React from "react";
import Feed from "../../components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center"> Next JS</span>
      </h1>
      <p className="desc text-center">Plyground for Next JS</p>
    </section>
  );
};

export default Home;
