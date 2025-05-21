export default function Select({
  options,
  inDropdown,
  className,
  label,
  onChange,
  defaultValue,
}) {
  const themes = {
    drop: `w-full p-2 border-1 border-emerald-400 outline-none rounded-md`,
  };
  return (
    <article className={`${label ? "flex flex-col gap-2" : ""}`}>
      {label ? (
        <label className={label.styles ? label.styles : ""}>{label.text}</label>
      ) : (
        ""
      )}
      <select
        defaultValue={defaultValue}
        className={inDropdown ? themes.drop : className}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option, index) => (
          <option key={index + 1} value={option}>
            {option}
          </option>
        ))}
      </select>
    </article>
  );
}
