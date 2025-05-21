export default function Modal({ state, children, styles }) {
  return (
    state && (
      <section
        className={`z-100 fixed top-0 left-0 w-full h-full overflow-auto ${styles}`}
      >
        {children}
      </section>
    )
  );
}
