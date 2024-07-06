export default function ButtonLoading() {
  return (
    <div className="flex justify-center items-center gap-2">
      {[1, 2, 3].map((i) => {
        return <div className="size-6 border-4 animate-pulse" key={i} />;
      })}
    </div>
  );
}
