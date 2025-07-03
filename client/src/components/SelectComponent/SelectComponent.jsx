import React, { useState, useRef, useEffect } from "react";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import { CheckIcon } from "@heroicons/react/20/solid";
import { FaPlus } from "react-icons/fa";

export default function SelectComponent({
  title,
  items,
  value,
  handleChange,
  name,
  placeholder,
  className,
  productSelect = false,
  handleAddCategorie,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (newValue) => {
    handleChange({ target: { name, value: newValue } });
    setIsOpen(false);
  };

  const selectedItem = items.find((item) => item.id === value);

  return (
    <div
      className={`flex justify-between gap-2 items-center mb-5 ${
        className && className
      } `}
      ref={containerRef}
    >
      <label className="block max-w-[30%] text-sm/6 font-medium text-gray-900">
        {title}
      </label>
      <div className="relative flex-none flex justify-between items-center w-[65%]">
        <div className={` flex-none ${productSelect ? "w-[85%]" : "w-full"}  `}>
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          >
            <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
              <span className="block truncate">
                {selectedItem?.nom || placeholder}
              </span>
            </span>
            <ChevronUpDownIcon
              aria-hidden="true"
              className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
            />
          </button>
          {isOpen && (
            <div
              className={`absolute z-20 mt-1 max-h-56 ${
                productSelect ? "w-[85%]" : "w-full"
              } overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 sm:text-sm transition-opacity duration-100 ease-in`}
            >
              {items.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className={`group relative cursor-pointer py-2 pr-9 pl-3 text-gray-900 select-none hover:bg-indigo-600 hover:text-white ${
                    item.id === value ? "font-semibold" : "font-normal"
                  }`}
                >
                  <div className="flex items-center">
                    <span className="ml-3 block truncate">{item.nom}</span>
                  </div>
                  {item.id === value && (
                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-hover:text-white">
                      <CheckIcon aria-hidden="true" className="size-5" />
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        {productSelect && (
          <div
            onClick={handleAddCategorie && handleAddCategorie}
            className=" w-[13%] cursor-default  rounded-md bg-white py-2.5 pr-1 pl-1 text-center text-gray-900 outline-1 -outline-offset-1 outline-gray-300 flex justify-center items-center  "
          >
            <FaPlus color="#4f39f6" />
          </div>
        )}
      </div>
    </div>
  );
}
