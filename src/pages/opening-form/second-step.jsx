import { Input } from "@/components/custom";

export default function SecondStep({ bio, handleInputChange }) {
  return (
    <div className="flex flex-col items-start">
      <h2 className="text-2xl lg:text-3xl mb-6 font-semibold">
        Select your Date of Birth
      </h2>
      <Input
        value={bio.date}
        type="date"
        className={true}
        onChange={(value) => handleInputChange("date", value)}
      />
    </div>
  );
}
