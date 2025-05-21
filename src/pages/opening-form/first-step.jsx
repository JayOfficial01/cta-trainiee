import { Input } from "@/components/custom";

export default function FirstStep({ bio, handleInputChange }) {
  return (
    <div className="flex flex-col items-start">
      <h2 className="text-2xl lg:text-3xl mb-6 font-semibold">
        Get started with your name
      </h2>
      <div className="flex flex-col sm:flex-row gap-5">
        <Input
          type="text"
          placeholder="First Name"
          className={true}
          value={bio.firstname}
          onChange={(value) => handleInputChange("firstname", value)}
        />

        <Input
          type="text"
          placeholder="Last Name"
          className={true}
          value={bio.lastname}
          onChange={(value) => handleInputChange("lastname", value)}
        />
      </div>
    </div>
  );
}
