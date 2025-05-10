export function InputComponent({
  label,
  name,
  id,
  placeholder,
  type,
  value,
  handlechange,
  emptyValue,
}) {
  return (
    <div className=" w-80 mb-4 ">
      <label htmlFor={id} className="block text-sm/6 font-medium text-gray-900">
        {label}
      </label>
      <div className=" mt-1 w-full rounded-md bg-white  outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
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
