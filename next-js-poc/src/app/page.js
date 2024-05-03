"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Home = () => {
    return (<section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden"/>
        <span className="orange_gradient text-center"> Next JS</span>
      </h1>
      <p className="desc text-center">Plyground for Next JS</p>
    </section>);
};
exports.default = Home;
