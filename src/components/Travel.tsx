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
        A block of rooms has been reserved for our guests at Comfort Inn Alpharetta–Atlanta North. 
        You are welcome to book directly using the link below at your convenience.
      </p>

      {/* 🔗 BOOKING BUTTON */}
      <div className="mt-8">
        <a
          href="https://www.choicehotels.com/reservations/groups/RS06Z9"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-4 rounded-xl border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-all duration-300"
        >
          Reserve Your Room
        </a>
      </div>

      {/* OPTIONAL DETAILS */}
      <p className="mt-6 text-sm text-neutral-500 max-w-xl mx-auto">
        Rooms are available on a first-come basis. We recommend booking early to ensure availability.
      </p>

    </section>
  )
}
