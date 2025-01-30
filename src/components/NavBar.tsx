import { useApp } from "@/hooks/useApp";

export default function NavBar() {
  const { user, logout, login } = useApp();
  return (
    <div className="flex justify-between py-2">
      <h1>Fetchy</h1>
      <nav>
        <ul className="flex space-x-4">
          {user ? (
            <>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/about">About</a>
              </li>
              <li>
                <button onClick={() => logout()}>Logout</button>
              </li>
            </>
          ) : null}
        </ul>
      </nav>
    </div>
  );
}
