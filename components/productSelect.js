import Link from "next/link";

export default function ProductSelect({ dir, active }) {
  return (
    <div className="flex justify-between">
      {active === "fermented" ? (
        <div className="p-4 bg-cyan-600 flex-grow text-center text-white underline underline-offset-8 font-bold">Fermented</div>
      ) : (
        <Link
          href={`/${dir}/fermented`}
          className="p-4 bg-cyan-600 flex-grow text-center hover:scale-110 text-white"
        >
          Fermented
        </Link>
      )}
      {active === "ESL" ? (
        <div className="p-4 bg-purple-700 flex-grow text-center text-white underline underline-offset-8 font-bold">ESL</div>
      ) : (
        <Link
          href={`/${dir}/ESL`}
          className="p-4 bg-purple-700 flex-grow text-center text-white hover:scale-110"
        >
          ESL
        </Link>
      )}
      {active === "cheese" ? (
        <div className="p-4 bg-indigo-700 flex-grow text-center text-white underline underline-offset-8 font-bold">Cheese</div>
      ) : (
        <Link
          href={`/${dir}/cheese`}
          className="p-4 bg-indigo-700 flex-grow text-center text-white hover:scale-110"
        >
          Cheese
        </Link>
      )}
    </div>
  );
}
