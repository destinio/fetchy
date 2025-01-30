import NavBar from "@/components/NavBar";
import { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="m-auto p-4 max-w-screen-md">
      {" "}
      <NavBar />
      {children}
    </div>
  );
}
