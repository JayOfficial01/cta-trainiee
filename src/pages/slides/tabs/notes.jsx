export default function Notes({ notes }) {
  return (
    <section className="border-1 border-zinc-600 rounded-md h-[400px] overflow-y-auto">
      <article className="p-2 h-[300px] overflow-y-auto">
        {notes ? (
          <div className="text-black text-lg rounded-md bg-zinc-200 p-3">
            <div dangerouslySetInnerHTML={{ __html: notes }} />
          </div>
        ) : (
          <p className="text-center text-zinc-500 text-lg p-3">
            No notes available
          </p>
        )}
      </article>
    </section>
  );
}
