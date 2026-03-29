import React from "react";
import { Link } from "react-router-dom";
import s from "./Button.module.css";

function Button({
  children,
  variant = "button", // "button" або "Link"
  styleVariant = "primary", // "primary" (синя) або "outline" (твоя)
  className = "",
  ...props
}) {
  // Об'єднуємо: базовий клас + клас стилю + зовнішній клас
  const combinedClass = `${s.button} ${s[styleVariant]} ${className}`;

  if (variant === "Link") {
    return (
      <Link className={combinedClass} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClass} {...props}>
      {children}
    </button>
  );
}

export default Button;
