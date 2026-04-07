export default function Travel() {
  return (
    <section className="w-full py-32 bg-dark-soft text-center px-6">
      
      <h2 className="text-4xl mb-10">
        Travel & Stay
      </h2>

      <p className="mt-4 text-lg text-neutral-600">
        We look forward to welcoming you.
      </p>

      <p className="mt-4 text-base text-neutral-500 max-w-2xl mx-auto">
        We have reserved room blocks at nearby hotels for our guests. 
        You are welcome to choose either option below and book at your convenience.
      </p>

      {/* 🏨 HYATT */}
      <div className="mt-10">
        <p className="text-[#f1d48a] text-lg mb-3">
          Hyatt Place Atlanta / Alpharetta
        </p>

        <a
          href="https://www.hyatt.com/events/en-US/group-booking/ATLZI/G-BHKA"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-4 rounded-xl border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-all duration-300"
        >
          Reserve Your Room
        </a>
      </div>

      {/* 🏨 COMFORT INN */}
      <div className="mt-10">
        <p className="text-[#f1d48a] text-lg mb-1">
          Comfort Inn Alpharetta–Atlanta North
        </p>

        {/* subtle second line (as you wanted) */}
        <p className="text-neutral-500 text-sm mb-3">
          5455 Windward Parkway West
        </p>

        <a
          href="https://www.choicehotels.com/reservations/groups/RS06Z9"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-4 rounded-xl border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-all duration-300"
        >
          Reserve Your Room
        </a>
      </div>

      {/* NOTE */}
      <p className="mt-8 text-sm text-neutral-500 max-w-xl mx-auto">
        Rooms are available on a first-come basis. We recommend booking early to ensure availability.
      </p>

    </section>
  )
}
