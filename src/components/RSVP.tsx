"use client"

import { useState } from "react"
import { motion } from "framer-motion"

const events = ["Haldi", "Sangeet", "Wedding"]

export default function RSVP() {

const [form, setForm] = useState({
  name: "",
  email: "",
  guests: 1,
  dietary: "",
  message: "",
  events: [] as string[],
  attendance: ""
})

const [submitted, setSubmitted] = useState(false)
const [loading, setLoading] = useState(false)

const toggleEvent = (event: string) => {
  let updated = [...form.events]

  if (updated.includes(event)) {
    updated = updated.filter(e => e !== event)
  } else {
    updated.push(event)
  }

  setForm({ ...form, events: updated })
}

const handleSubmit = async (e: any) => {
  e.preventDefault()

  if (!form.attendance) {
    alert("Please select your attendance")
    return
  }

  setLoading(true)

  await fetch("/api/rsvp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form)
  })

  setLoading(false)
  setSubmitted(true)
}

return (

<section className="w-full overflow-hidden relative py-40 bg-[#0f0d0b] text-center">

{/* glow */}
<div
className="absolute inset-0 opacity-[0.08] pointer-events-none"
style={{
background: "radial-gradient(circle at center, rgba(212,175,55,0.4), transparent 60%)"
}}
/>

{/* CONTENT WRAPPER */}
<div className="max-w-2xl mx-auto px-6 relative w-full overflow-hidden">

<motion.h2
initial={{ opacity: 0, y: 40 }}
whileInView={{ opacity: 1, y: 0 }}
className="text-4xl md:text-5xl text-[#f1d48a] mb-12"
>
RSVP
</motion.h2>

{!submitted && (
  <>
    <p className="mt-4 text-lg text-neutral-600">
      We would be delighted to have you join us.
    </p>

    <p className="mt-4 text-base text-neutral-500">
      Please take a moment to let us know your plans below, as it will help us prepare for your presence.
    </p>
  </>
)}

{submitted ? (

<motion.div
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
className="bg-[#1a1714]/70 backdrop-blur-xl border border-[#d4af37]/30 rounded-xl p-10 w-full overflow-hidden"
>
<h3 className="text-2xl text-[#f1d48a] mb-4">Thank You</h3>

<p className="text-gray-300 mb-4">
  We look forward to celebrating with you ✦
</p>

<p className="text-sm text-neutral-400 max-w-md mx-auto leading-relaxed">
  As we will be travelling back to Europe and India after the celebrations, it may be difficult for us to carry larger gifts. 
  We kindly request you to keep this in mind.
</p>

</motion.div>

) : (

<form
onSubmit={handleSubmit}
className="bg-[#1a1714]/70 backdrop-blur-xl border border-[#d4af37]/30 rounded-xl p-8 space-y-6 text-left w-full overflow-hidden"
>

{/* Attendance */}
<div>
<p className="text-[#f1d48a] mb-3">
  We would love to know if you will be able to join us
</p>

<div className="flex gap-3">

{["Yes", "No"].map(option => (
<button
key={option}
type="button"
onClick={() => setForm({ ...form, attendance: option })}
className={`flex-1 border px-4 py-2 rounded-lg transition ${
form.attendance === option
? "bg-[#d4af37] text-black"
: "border-[#d4af37]/30 text-gray-300 hover:border-[#d4af37]"
}`}
>
{option === "Yes" ? "Gladly" : "With regrets"}
</button>
))}

</div>
</div>

<input
required
placeholder="Full Name"
className="w-full p-3 rounded bg-[#0f0d0b] text-white border border-[#d4af37]/20"
onChange={(e) => setForm({ ...form, name: e.target.value })}
/>

<input
required
type="email"
placeholder="Email"
className="w-full p-3 rounded bg-[#0f0d0b] text-white border border-[#d4af37]/20"
onChange={(e) => setForm({ ...form, email: e.target.value })}
/>

{form.attendance !== "No" && (
<>
<select
className="w-full p-3 rounded bg-[#0f0d0b] text-white border border-[#d4af37]/20"
value={form.guests}
onChange={(e) => setForm({ ...form, guests: Number(e.target.value) })}
>
  <option value="1">1 Guest</option>
  <option value="2">2 Guests</option>
  <option value="3">3 Guests</option>
  <option value="4">4 Guests</option>
  <option value="5">5 Guests</option>
  <option value="6">6 Guests</option>
  <option value="7">7 Guests</option>
  <option value="8">8 Guests</option>
  <option value="9">9 Guests</option>
  <option value="10">10 Guests</option>
</select>

<div>
<p className="text-[#f1d48a] mb-4">Events</p>

<div className="flex flex-wrap md:flex-nowrap gap-4">

{events.map(event => (
<button
type="button"
key={event}
onClick={() => toggleEvent(event)}
className={`flex-1 border px-4 py-3 rounded-lg text-sm ${
form.events.includes(event)
? "bg-[#d4af37] text-black"
: "border-[#d4af37]/30 text-gray-300"
}`}
>
{event}
</button>
))}

</div>
</div>

<textarea
placeholder="Dietary restrictions"
className="w-full p-3 rounded bg-[#0f0d0b] text-white border border-[#d4af37]/20"
/>
</>
)}

<textarea
placeholder="Message"
className="w-full p-3 rounded bg-[#0f0d0b] text-white border border-[#d4af37]/20"
/>

<button
disabled={loading}
className="w-full bg-[#d4af37] text-black py-3 rounded font-semibold hover:opacity-90"
>
{loading ? "Sending..." : "Confirm Attendance"}
</button>

</form>

)}

</div>

</section>

)
}
