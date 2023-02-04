import React from "react";
import css from "../styles/glassmorphism/Glassmorphism.module.scss";

const Glassmorphism = ({ children, className }) => {
  return (
    <div className={`${css["glassmorphism"]} ${className}`}>{children}</div>
  );
};

export default Glassmorphism;
