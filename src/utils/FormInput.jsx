/* eslint-disable react/prop-types */

const FormInput = ({ label, name, type, defaultValue, isRequired = true }) => {
  return (
    <div>
      <label
        className="text-sm md:text-base font-regular text-gray-700 block mb-1.5 ml-0.5"
        htmlFor="email"
      >
        {label}
      </label>
      <input
        className="text-sm md:text-base w-full font-light bg-[#f3f6fb] p-[14px] 
        rounded-lg border-[1px] border-[#D4D7E3]"
        name={name}
        type={type}
        placeholder={defaultValue}
        required={isRequired}
      />
    </div>
  );
};

export default FormInput;
