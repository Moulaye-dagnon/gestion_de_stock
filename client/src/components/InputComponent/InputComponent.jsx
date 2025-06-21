export function InputComponent({
  label,
  name,
  id,
  placeholder,
  type,
  value,
  handlechange,
  addInput = false,
}) {
  return (
    <div
      className={`  ${
        addInput
          ? " gap-2 flex justify-between mx-auto items-center mb-5"
          : "mb-4 w-80"
      } `}
    >
      <label
        htmlFor={id}
        className={` ${
          addInput ? "text-lg max-w-[30%]" : ""
        } block text-sm/6 font-medium text-gray-900`}
      >
        {label}
      </label>
      <div
        className={`  ${
          addInput ? " flex-none w-[65%] " : "w-full mt-1"
        }  flex-1 rounded-md bg-white  outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600`}
      >
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={handlechange}
          required
          className="block border border-transparent user-invalid:border-red-500  w-full pl-3 grow py-1.5   text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
        />
      </div>
    </div>
  );
}
