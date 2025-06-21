import { useState } from "react";

const useForm = (initiaValue, onSubmit) => {
  const [inputValue, setInputValue] = useState(initiaValue);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(inputValue);
    // setInputValue(initiaValue);
  };

  return {
    inputValue,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
