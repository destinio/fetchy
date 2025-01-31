import { useApp } from "@/hooks/useApp";
import NavBarLink from "./NavBarLink";
import { useDogs } from "@/hooks/useDogs";

export default function NavBar() {
  const { user, logout } = useApp();
  const { interestedDogs } = useDogs();
  return (
    <div className="flex justify-between pt-8 pb-4">
      <h1 className="brand text-3xl">Fetchy</h1>
      <nav>
        <ul className="flex space-x-4 text-xl">
          {user ? (
            <>
              <NavBarLink href="/" text="search" />
              <NavBarLink href="/about" text="about" />
              <div className="flex gap-2">
                <NavBarLink href="/interested" text="cart" />
                <span>{interestedDogs.length}</span>
              </div>
              <NavBarLink onClick={logout} text="logout" />
            </>
          ) : null}
        </ul>
      </nav>
    </div>
  );
}
