export default function App() {
  const tableRows = [
    { col1: "Alpha", col2: "10", col3: "Active" },
    { col1: "Beta", col2: "20", col3: "Pending" },
    { col1: "Gamma", col2: "30", col3: "Active" },
    { col1: "Delta", col2: "40", col3: "Inactive" },
  ];

  const gridCards = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    title: `Grid Card ${i + 1}`,
    desc: "Small responsive card using Tailwind grid utilities.",
  }));

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="font-extrabold text-lg">Tailwind Mini Page</div>

            {/* Requirement: flex-col on small, row on md+ */}
            <div className="flex flex-col md:flex-row md:gap-6 gap-2">
              <a className="hover:text-blue-600 font-semibold" href="#hero">
                Home
              </a>
              <a className="hover:text-blue-600 font-semibold" href="#features">
                Features
              </a>
              <a className="hover:text-blue-600 font-semibold" href="#contact">
                Contact
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero section */}
      <section id="hero" className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            {/* Responsive text requirement + gradient + bold */}
            <h2 className="text-xl md:text-3xl lg:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Tailwind CSS Basics Exploration
            </h2>

            <p className="mt-4 text-gray-700">
              This page demonstrates button states, hover effects, responsive typography, lists,
              cards, tables, forms, navbars, and grid layouts using Tailwind utilities.
            </p>

            {/* Button Styling requirement */}
            <button
              className="
                mt-6
                rounded-lg
                bg-gray-200
                px-5 py-2.5
                font-bold
                hover:bg-gray-300
                active:bg-gray-400
                transition
              "
            >
              Button (Hover + Active)
            </button>

            {/* List styling requirement */}
            <ul className="mt-6 list-disc list-inside pl-5 space-y-1">
              <li className="hover:text-blue-600">Rounded borders and button states</li>
              <li className="hover:text-blue-600">Hover scale image with transition</li>
              <li className="hover:text-blue-600">Responsive layout using flex and grid</li>
            </ul>
          </div>

          {/* Image with hover effect requirement */}
          <div className="flex justify-center">
            <div className="rounded-2xl shadow-lg overflow-hidden transform transition hover:scale-105">
              <img
                className="w-full h-72 object-cover"
                src="https://images.unsplash.com/photo-1520975958225-87f8d7b6b98b?auto=format&fit=crop&w=1200&q=60"
                alt="Hero"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features section: 3 cards grid */}
      <section id="features" className="bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <h3 className="text-2xl font-extrabold">Features (3 Cards)</h3>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card Component requirement */}
            {[
              {
                title: "Card One",
                desc: "White background card with image, title, description, and button.",
              },
              {
                title: "Card Two",
                desc: "Uses spacing, borders, shadows, and responsive grid.",
              },
              {
                title: "Card Three",
                desc: "Simple, minimal, and functional styling.",
              },
            ].map((c) => (
              <div key={c.title} className="bg-white border border-gray-200 rounded-2xl shadow-sm">
                <img
                  className="w-full h-40 object-cover rounded-t-2xl"
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=60"
                  alt={c.title}
                />
                <div className="p-4">
                  <h4 className="font-extrabold text-lg">{c.title}</h4>
                  <p className="text-gray-700 mt-2">{c.desc}</p>
                  <button className="mt-4 rounded-lg bg-gray-200 px-4 py-2 font-bold hover:bg-gray-300 active:bg-gray-400 transition">
                    Action
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Responsive Grid Layout requirement: 6 cards */}
          <h3 className="text-2xl font-extrabold mt-10">Responsive Grid (6 Cards)</h3>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gridCards.map((card) => (
              <div
                key={card.id}
                className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm"
              >
                <h4 className="font-extrabold">{card.title}</h4>
                <p className="text-gray-700 mt-2">{card.desc}</p>
                <button className="mt-4 rounded-lg bg-gray-200 px-4 py-2 font-bold hover:bg-gray-300 active:bg-gray-400 transition">
                  View
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Table Section */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h3 className="text-2xl font-extrabold">Table Section</h3>

        {/* 3-column, 4-row table with borders, zebra, hover */}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full border border-gray-200 bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-200 p-3 text-left">Column 1</th>
                <th className="border border-gray-200 p-3 text-left">Column 2</th>
                <th className="border border-gray-200 p-3 text-left">Column 3</th>
              </tr>
            </thead>

            <tbody>
              {tableRows.map((r, idx) => (
                <tr
                  key={r.col1}
                  className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100`}
                >
                  <td className="border border-gray-200 p-3">{r.col1}</td>
                  <td className="border border-gray-200 p-3">{r.col2}</td>
                  <td className="border border-gray-200 p-3">{r.col3}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <h3 className="text-2xl font-extrabold">Contact Form</h3>

          {/* Input Form requirement */}
          <form className="mt-6 max-w-xl space-y-4">
            <div>
              <label className="font-bold block mb-1">Name</label>
              <input
                className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                type="text"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="font-bold block mb-1">Email</label>
              <input
                className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                type="email"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="font-bold block mb-1">Password</label>
              <input
                className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                type="password"
                placeholder="••••••••"
              />
            </div>

            <button
              type="button"
              className="rounded-lg bg-gray-200 px-5 py-2.5 font-bold hover:bg-gray-300 active:bg-gray-400 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </section>

      <footer className="py-6 text-center text-sm text-gray-600">
        Built with Tailwind utilities only.
      </footer>
    </div>
  );
}
