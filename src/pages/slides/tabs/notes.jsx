export default function Notes({ notes }) {
  return (
    <div>
      {notes ? (
        <div className="text-black text-lg rounded-md bg-zinc-200 p-3">
          <div dangerouslySetInnerHTML={{ __html: notes }} />
        </div>
      ) : (
        <p className="text-center text-zinc-500 text-lg p-3">
          No notes available
        </p>
      )}
    </div>
  );
}
