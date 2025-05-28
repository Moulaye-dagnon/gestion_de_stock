import React from "react";

export default function ButtonComponent({
  type,
  handleClick,
  name,
  style = {},
}) {
  return (
    <>
      <button
        type={type}
        style={style}
        onClick={handleClick ? handleClick : null}
        className={`px-4  py-2.5 text-slate-50 bg-my-primary border border-my-primary hover:bg-slate-50 hover:text-my-primary rounded-md `}
      >
        {name}
      </button>
    </>
  );
}
