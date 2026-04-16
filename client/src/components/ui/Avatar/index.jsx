function Avatar({ name }) {
  const initial = name?.charAt(0)?.toUpperCase() || "?";

  return (
    <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-sm">
      {initial}
    </div>
  );
}

export default Avatar;