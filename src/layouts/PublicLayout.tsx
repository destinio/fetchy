import { ReactNode } from "react";
import MainLayout from "./MainLayout";

interface IPublicLayoutProps {
  element: ReactNode;
}
export default function ProtectedLayout({ element }: IPublicLayoutProps) {
  return <MainLayout>{element}</MainLayout>;
}
