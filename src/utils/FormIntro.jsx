/* eslint-disable react/prop-types */
const FormIntro = ({ title, subTitle }) => {
  return (
    <div className="flex flex-col gap-4 md:gap-7">
      <h1 className="text-2xl md:text-4xl font-bold text-gray-900">{title}</h1>
      <h2 className="text-base md:text-xl font-light text-gray-700">
        {subTitle}
      </h2>
    </div>
  );
};

export default FormIntro;
