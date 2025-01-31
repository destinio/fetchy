import { ReactNode } from "react";

interface FetchyMsgProps {
  message: string;
  children?: ReactNode;
}
export default function FetchyMsg({ message, children }: FetchyMsgProps) {
  return (
    <div className="flex flex-col items-center order-1 md:order-2">
      <div className="relative bg-blue-500 text-white p-4 rounded-lg shadow-lg w-64 text-center before:content-[''] before:absolute before:-bottom-2 before:left-1/2 before:-translate-x-1/2 before:w-0 before:h-0 before:border-t-[10px] before:border-t-blue-500 before:border-l-[10px] before:border-l-transparent before:border-r-[10px] before:border-r-transparent">
        <p className="text-lg">{message}</p>
        {children && <div className="mt-4">{children}</div>}
      </div>
      <img src="/images/fetchy.png" alt="dog" className="h-32 mt-4" />
    </div>
  );
}
