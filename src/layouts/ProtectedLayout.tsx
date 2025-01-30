import { ReactNode, useEffect } from "react";
import MainLayout from "./MainLayout";
import { useApp } from "@/hooks/useApp";
import { useNavigate } from "react-router-dom";

interface IProtectedLayoutProps {
  element: ReactNode;
}
export default function ProtectedLayout({ element }: IProtectedLayoutProps) {
  const { user } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  if (!user) {
    return null;
  }

  return <MainLayout>{element}</MainLayout>;
}
