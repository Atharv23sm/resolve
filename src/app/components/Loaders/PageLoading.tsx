export default function PageLoading() {
  return (
    <div className="w-full min-h-screen bg-black text-white flex flex-col justify-center items-center">
      <div className="size-8 border-4 animate-pulse" />
      <div>Please wait</div>
    </div>
  );
}
