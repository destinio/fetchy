export default function NavBar() {
  return (
    <div className="flex justify-between py-2">
      <h1>Fetchy</h1>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
