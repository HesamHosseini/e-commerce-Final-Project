import React from "react";

function MyButton({ bgColor, task, size, title }) {
  return (
    <button
      className={`bg-${bgColor} ${
        size === "small"
          ? "px-3 rounded-md py-1 text-[10px]"
          : size === "medium"
          ? "px-4 rounded-lg py-2 text-[12px]"
          : ""
      }
              hover:text-myWhite-1
              transition-all
      `}
    >
      {title}
    </button>
  );
}

export default MyButton;
