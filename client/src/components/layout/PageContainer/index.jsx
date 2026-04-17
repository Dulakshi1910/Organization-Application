function PageContainer({ children }) {
  if (!children) return null;

  return (
    <div className="min-h-screen w-full bg-[#0B1220] flex text-gray-200">
      {children}
    </div>
  );
}

export default PageContainer;