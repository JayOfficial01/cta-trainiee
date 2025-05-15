export default function ResourceTab({ resources }) {
  const renderType = (type) => {};

  return resources.length === 0 ? (
    <p className="text-center text-zinc-500 text-lg p-3">
      No Resource available
    </p>
  ) : (
    <div className="flex flex-col gap-3">
      {/* {resources.map((resource) => renderType(resource.))} */}
    </div>
  );
}
