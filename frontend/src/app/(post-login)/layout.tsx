import Sidebar from "./Sidebar";

export default function PostLoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-full w-full">
      <Sidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
