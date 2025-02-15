export default function SmallLoader() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-3 h-3">
        <div className="absolute w-full h-full border-4 border-white border-t-transparent animate-spin rounded-full"></div>
      </div>
    </div>
  );
}
