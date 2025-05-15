export default function FifthStep({ bio, handleInputChange }) {
  return (
    <div className="text-left flex flex-col items-start">
      <h2 className="text-2xl lg:text-3xl mb-6 font-semibold">
        Express yourself
      </h2>
      <textarea
        placeholder="Write something about yourself"
        className="w-[70%] sm:w-[35%] h-32 text-base sm:text-lg bg-white  outline-none my-4 border border-slate-400 rounded-lg p-2"
        value={bio.description}
        onChange={(e) => handleInputChange("description", e.target.value)}
      />
    </div>
  );
}
