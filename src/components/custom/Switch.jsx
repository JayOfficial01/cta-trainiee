export default function Switch({ onChange, open, disabled }) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => (disabled ? "" : onChange())}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
          open ? "bg-emerald-600" : "bg-zinc-700"
        } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
            open ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}
