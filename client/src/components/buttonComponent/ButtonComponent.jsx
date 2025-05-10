import React from "react";

export default function ButtonComponent({ type, handleClick, bgColor, name }) {
  return (
    <>
      <button
        type={type}
        onClick={handleClick ? handleClick : null}
        className={`w-full py-2.5 text-slate-50 bg-my-primary border border-my-primary hover:bg-slate-50 hover:text-my-primary rounded-md `}
      >
        {name}
      </button>
    </>
  );
}
