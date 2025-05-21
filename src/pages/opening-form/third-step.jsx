export default function ThirdStep({ educationLevels, bio, handleInputChange }) {
  return (
    <div className="text-left">
      <h2 className="text-2xl lg:text-3xl mb-6 font-semibold">
        Select your Level of education
      </h2>
      {educationLevels.map((level) => (
        <label
          key={level}
          className="block mb-2 sm:mb-3 cursor-pointer text-sm md:text-lg lg:text-xl"
        >
          <input
            type="radio"
            name="education_level"
            id="course"
            checked={bio.course === level ? true : false}
            onChange={() => handleInputChange("course", level)}
            className="mr-2 sm:w-4 sm:h-4 cursor-pointer"
          />
          {level}
        </label>
      ))}
    </div>
  );
}
