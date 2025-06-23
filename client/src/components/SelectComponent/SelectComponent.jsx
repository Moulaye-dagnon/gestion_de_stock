import React, { useState, useRef, useEffect } from "react";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import { CheckIcon } from "@heroicons/react/20/solid";

export default function SelectComponent({
  title,
  items,
  value,
  handleChange,
  name,
  placeholder,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Ferme le menu si on clique à l'extérieur
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
      className="flex justify-between gap-2 items-center mb-5"
      ref={containerRef}
    >
      <label className="block max-w-[30%] text-sm/6 font-medium text-gray-900">
        {title}
      </label>
      <div className="relative flex-none w-[65%]">
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
          <div className="absolute z-20 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 sm:text-sm transition-opacity duration-100 ease-in">
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
    </div>
  );
}
