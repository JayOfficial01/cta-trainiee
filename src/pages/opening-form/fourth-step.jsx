import {} from "react-icons/fa";
import Select from "react-select";

export default function FourthStep({
  interestsOptions,
  bio,
  handleInputChange,
}) {
  return (
    <div className="text-left">
      <h2 className="text-2xl lg:text-3xl mb-6 font-semibold">
        Select your Interests
      </h2>
      <Select
        options={interestsOptions}
        isMulti={true}
        isSearchable={false}
        placeholder="Select your interests"
        value={interestsOptions.filter((item) =>
          bio.interest.includes(item.value)
        )}
        className="text-black text-sm sm:text-base md:text-lg w-[70%] sm:w-[65%] md:w-[35%] border"
        onChange={(selected) => {
          handleInputChange(
            "interest",
            selected ? selected.map((item) => item.value) : []
          );
        }}
        styles={{
          control: (base, state) => ({
            ...base,
            cursor: "pointer", // Makes the cursor a pointer on the main input field
            borderColor: state.isFocused ? "#F2C146" : base.borderColor, // Change border color on focus
            boxShadow: state.isFocused ? "0 0 0 1px #F2C146" : base.boxShadow, // Add focus ring with custom color
            "&:hover": {
              borderColor: "#F2C146", // Change border color on hover
            },
          }),
          dropdownIndicator: (base) => ({
            ...base,
            cursor: "pointer",
          }),
        }}
      />
    </div>
  );
}
