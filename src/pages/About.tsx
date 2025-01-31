export default function About() {
  return (
    <div className="max-w-3xl mx-auto pt-16">
      <h2 className="text-4xl font-bold text-orange-500 mb-6">
        About <span className="brand">Fetchy</span>
      </h2>
      <p className="text-lg  mb-6">
        <strong>Fetchy</strong> was built as part of a take-home assignment for{" "}
        <a
          href="https://fetch.com/"
          className="text-orange-500 hover:underline"
          target="_blank"
        >
          Fetch Rewards
        </a>
        . The goal of this project is to help dog lovers search for shelter dogs
        and find their perfect match. Users can browse, filter, and favorite
        dogs before generating a match.
      </p>

      <h3 className="text-2xl font-semibold border-b-2 border-orange-500 pb-2 mb-4">
        Features
      </h3>
      <ul className="list-disc pl-5 space-y-3 ">
        <li>
          🔍 <strong>Search & Filter</strong>: Users can filter dogs by breed
          and location.
        </li>
        <li>
          📄 <strong>Pagination</strong>: Results are paginated for easy
          browsing.
        </li>
        <li>
          📌 <strong>Sorting</strong>: Dogs are sorted alphabetically by breed
          by default, with options for ascending or descending order.
        </li>
        <li>
          ❤️ <strong>Favorites & Matchmaking</strong>: Users can favorite dogs
          and generate a match.
        </li>
        <li>
          🖼 <strong>Detailed Dog Profiles</strong>: Each dog’s image, age,
          breed, and location are displayed.
        </li>
        <li>
          🎉 <strong>Animated Match Result</strong>: A confetti animation
          celebrates when a user finds their match.
        </li>
      </ul>

      <h3 className="text-2xl font-semibold border-b-2 border-orange-500 pb-2 mt-8 mb-4">
        Technology Stack
      </h3>
      <ul className="list-disc pl-5 space-y-3 ">
        <li>
          ⚛️ <strong>React</strong> with TypeScript for a scalable and
          maintainable UI.
        </li>
        <li>
          ⚡ <strong>Vite.js</strong> for fast development and optimized builds.
        </li>
        <li>
          🎨 <strong>Tailwind CSS</strong> for modern, responsive styling.
        </li>
        <li>
          📦 <strong>React Query</strong> for efficient API data fetching and
          caching.
        </li>
        <li>
          🛠 <strong>ShadCN UI</strong> for reusable and accessible components.
        </li>
        <li>
          🚀 <strong>Hosted on Vercel</strong> for seamless deployment and
          performance.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold border-b-2 border-orange-500 pb-2 mt-8 mb-4">
        How It Works
      </h2>
      <p className="text-lg  mb-4">
        1️⃣ <strong>Login:</strong> Users enter their name and email to
        authenticate.
        <br />
        2️⃣ <strong>Search:</strong> Users can filter and sort through available
        dogs.
        <br />
        3️⃣ <strong>Favorite:</strong> Users can favorite dogs they’re interested
        in.
        <br />
        4️⃣ <strong>Match:</strong> A matchmaking algorithm selects the best
        match from favorites.
        <br />
        5️⃣ <strong>Celebrate:</strong> Confetti animation highlights the
        successful match!
      </p>
    </div>
  );
}
