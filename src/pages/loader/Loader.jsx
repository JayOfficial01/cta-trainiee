export default function Loader() {
  return (
    <article className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col items-center justify-center w-full">
      <img
        src="./cta_logo1.png"
        alt="Cta Image"
        className="w-20 animate-bounce"
      />
      <h3>fetching...</h3>
    </article>
  );
}
