import SideBar from "./components/SideBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen ">
      <SideBar />
      <div className=" flex grow flex-col text-white">{children}</div>
    </div>
  );
}
