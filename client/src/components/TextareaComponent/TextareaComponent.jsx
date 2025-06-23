import React from "react";

function TextareaComponent({
  label,
  name,
  id,
  placeholder,
  type,
  value,
  handlechange,
}) {
  return (
    <div className=" gap-2 flex justify-between mx-auto items-center mb-5">
      <label
        htmlFor={id}
        className=" text-sm/6 max-w-[30%] block font-medium text-gray-900"
      >
        {label}
      </label>
      <div className=" flex-none w-[65%] rounded-md bg-white  outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600 ">
        <textarea
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={handlechange}
          className="block border border-transparent user-invalid:border-red-500  w-full pl-3 grow py-1.5   text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
        ></textarea>
      </div>
    </div>
  );
}

export default TextareaComponent;
