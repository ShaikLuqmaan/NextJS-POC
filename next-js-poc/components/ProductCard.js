"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const AddToCart_1 = __importDefault(require("./AddToCart"));
const ProductCard = () => {
    return (<div>
      PromptCard
      <AddToCart_1.default />
    </div>);
};
exports.default = ProductCard;
