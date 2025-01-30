import { useApp } from "@/hooks/useApp";
import NavBarLink from "./NavBarLink";

export default function NavBar() {
  const { user, logout } = useApp();
  return (
    <div className="flex justify-between pt-8 pb-4">
      <h1 className="brand text-3xl">Fetchy</h1>
      <nav>
        <ul className="flex space-x-4 text-xl">
          {user ? (
            <>
              <NavBarLink href="/" text="search" />
              <NavBarLink href="/about" text="about" />
              <NavBarLink onClick={logout} text="logout" />
            </>
          ) : null}
        </ul>
      </nav>
    </div>
  );
}
