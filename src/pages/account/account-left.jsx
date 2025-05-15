export default function AccountLeft() {
  return (
    <section className="sm:w-[50vw] md:w-[55vw] hidden sm:flex flex-col items-center justify-center gap-8 2xl:gap-10">
      <div className="flex flex-col items-center">
        <img src="/cta_logo1.png" alt="" className="w-24 2xl:w-32" />
        <img src="/cta_logo.png" alt="" className="w-[460px] 2xl:w-[600px]" />
      </div>
      <h1 className="uppercase font-semibold text-[#393939] sm:text-xl md:text-2xl 2xl:text-3xl tracking-wide">
        Codi training assistant
      </h1>

      <div className="flex flex-col gap-3 text-center text-[#7C7C7C] text-sm font-semibold">
        <div className="flex gap-5 items-center">
          <h1 className="uppercase">powered by</h1>
          <img src="/codibot_logo.png" alt="" className="" />
        </div>
        <p>version 1.5</p>
      </div>
    </section>
  );
}
