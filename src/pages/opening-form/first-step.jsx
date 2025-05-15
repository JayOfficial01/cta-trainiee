export default function FirstStep({ bio, handleInputChange }) {
  return (
    <div className="flex flex-col items-start">
      <h2 className="text-2xl lg:text-3xl mb-6 font-semibold">
        Get started with your name
      </h2>
      <div className="flex flex-col sm:flex-row gap-5">
        <input
          type="text"
          placeholder="First Name"
          className="text-base lg:text-lg bg-white outline-none focus:border-[#F2C146] w-52 border-[3px] p-2 rounded-lg"
          value={bio.firstname}
          onChange={(e) => handleInputChange("firstname", e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          className="text-base lg:text-lg bg-white outline-none focus:border-[#F2C146] w-52 border-[3px] p-2 rounded-lg"
          value={bio.lastname}
          onChange={(e) => handleInputChange("lastname", e.target.value)}
        />
      </div>
    </div>
  );
}
