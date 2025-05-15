export default function SlideViewer({ loading, content }) {
  return (
    <div
      className={`h-[52vh] overflow-x-hidden ${
        loading ? "overflow-y-hidden" : "overflow-y-auto"
      } border border-zinc-400 rounded-md relative`}
    >
      {content}
      {loading && (
        <div className="absolute top-0 left-0 flex items-center justify-center gap-3 bg-black opacity-50 h-[100%] w-[100%]">
          <div className="animate-spin rounded-full h-12 sm:h-16 w-12 sm:w-16 border-t-4 border-green-500"></div>
          <p className="text-white mt-4">Preparing Quiz...</p>
        </div>
      )}
    </div>
  );
}
