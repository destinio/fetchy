import { useEffect, useRef, useState } from "react";
import { useApp } from "@/hooks/useApp";
import NavBarLink from "./NavBarLink";
import { useDogs } from "@/hooks/useDogs";

export default function NavBar() {
  const { user, logout } = useApp();
  const { interestedDogs } = useDogs();
  const navRef = useRef<HTMLDivElement>(null);
  const [isFixed, setIsFixed] = useState(false);
  const [navHeight, setNavHeight] = useState(0);

  useEffect(() => {
    if (navRef.current) {
      setNavHeight(navRef.current.offsetHeight); // Get the navbar height dynamically
    }

    const handleScroll = () => {
      if (navRef.current) {
        setIsFixed(window.scrollY > navHeight);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navHeight]);

  return (
    <div
      ref={navRef}
      className={`pt-8 pb-4 bg-slate-900 ${
        isFixed ? "fixed top-0 left-0 w-full z-50" : "relative"
      }`}
    >
      <div
        className={`flex justify-between items-center ${isFixed && "w-full max-w-screen-md m-auto px-8 pb-4 border-b-2 border-orange-500"}`}
      >
        <h1 className="brand text-3xl">Fetchy</h1>
        <nav>
          <ul className="flex space-x-4 text-xl">
            {user ? (
              <>
                <NavBarLink href="/" text="search" />
                <NavBarLink href="/about" text="about" />
                <div className="flex gap-2">
                  <NavBarLink href="/interested" text="cart" />
                  <span
                    className={`${interestedDogs.length > 0 && "font-bold text-orange-500"}`}
                  >
                    {interestedDogs.length}
                  </span>
                </div>
                <NavBarLink onClick={logout} text="logout" />
              </>
            ) : null}
          </ul>
        </nav>
      </div>
    </div>
  );
}
