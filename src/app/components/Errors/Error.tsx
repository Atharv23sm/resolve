export default function Error({ error }: { error: string }) {
  return (
    <div className="w-full text-center py-2 font-bold text-[#f00]">{error}</div>
  );
}
