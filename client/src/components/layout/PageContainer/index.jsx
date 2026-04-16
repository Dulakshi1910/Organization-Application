function PageContainer({ children }) {
  return (
    <div className="flex bg-[#0B1220] min-h-screen">
      {children}
    </div>
  );
}

export default PageContainer;