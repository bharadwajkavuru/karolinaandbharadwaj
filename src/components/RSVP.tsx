"use client"

import { useState } from "react"

const events = ["Mehendi", "Haldi", "Sangeet", "Wedding"]

export default function RSVP() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    guests: 1,
    dietary: "",
    message: "",
    events: [] as string[]
  })

  const handleEventChange = (event: string) => {

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

    await fetch("/api/rsvp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    })

    alert("Thank you for your RSVP!")
  }

  return (

<section className="py-40 bg-[#0f0d0b] text-center">

<h2 className="text-5xl text-[#f1d48a] mb-16">
RSVP
</h2>

<form
onSubmit={handleSubmit}
className="max-w-xl mx-auto space-y-6 text-left"
>

<input
required
placeholder="Full Name"
className="w-full p-3 rounded bg-[#1b1917] text-white"
onChange={(e) => setForm({ ...form, name: e.target.value })}
/>

<input
required
type="email"
placeholder="Email"
className="w-full p-3 rounded bg-[#1b1917] text-white"
onChange={(e) => setForm({ ...form, email: e.target.value })}
/>

<select
className="w-full p-3 rounded bg-[#1b1917] text-white"
onChange={(e) => setForm({ ...form, guests: Number(e.target.value) })}
>

<option value="1">1 Guest</option>
<option value="2">2 Guests</option>
<option value="3">3 Guests</option>
<option value="4">4 Guests</option>

</select>


<div>

<p className="text-[#f1d48a] mb-2">
Events Attending
</p>

<div className="space-y-2">

{events.map(event => (

<label key={event} className="flex gap-2 text-gray-200">

<input
type="checkbox"
onChange={() => handleEventChange(event)}
/>

{event}

</label>

))}

</div>

</div>


<textarea
placeholder="Dietary restrictions"
className="w-full p-3 rounded bg-[#1b1917] text-white"
onChange={(e) => setForm({ ...form, dietary: e.target.value })}
/>

<textarea
placeholder="Message for the couple"
className="w-full p-3 rounded bg-[#1b1917] text-white"
onChange={(e) => setForm({ ...form, message: e.target.value })}
/>

<button
className="w-full bg-[#d4af37] text-black py-3 rounded font-semibold hover:opacity-90"
>

Submit RSVP

</button>

</form>

</section>

  )
}
