export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-[#F8FAF9] text-[#073524] flex flex-col antialiased selection:bg-[#00A65E] selection:text-white">
      {children}
    </div>
  );
}
