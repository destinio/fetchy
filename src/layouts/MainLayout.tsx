import NavBar from "@/components/NavBar";
import { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return <div className="m-auto px-8 max-w-screen-md">{children}</div>;
}
