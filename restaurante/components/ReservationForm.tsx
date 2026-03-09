"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Phone } from "lucide-react";

type Site = any;

function buildMessage(values: {
  name: string;
  email: string;
  phone: string;
  people: string;
  date: string;
  time: string;
  seating: string;
  occasion: string;
  notes: string;
}) {
  return [
    `Hola, soy ${values.name}.`,
    values.email ? `Email: ${values.email}.` : null,
    values.phone ? `Teléfono: ${values.phone}.` : null,
    `Personas: ${values.people}.`,
    values.date ? `Fecha: ${values.date}.` : null,
    values.time ? `Hora: ${values.time}.` : null,
    values.seating ? `Zona: ${values.seating}.` : null,
    values.occasion ? `Motivo: ${values.occasion}.` : null,
    values.notes ? `Notas: ${values.notes}.` : null,
  ]
    .filter(Boolean)
    .join(" ");
}

export default function ReservationForm({ site }: { site: Site }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    people: "2",
    date: "",
    time: "",
    seating: "Terraza",
    occasion: "",
    notes: "",
  });

  const message = useMemo(() => buildMessage(form), [form]);
  const whatsappBase = String(site.links.whatsapp).split("?")[0];
  const whatsappLink = `${whatsappBase}?text=${encodeURIComponent(message)}`;

  return (
    <form
      className="grid gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        window.open(whatsappLink, "_blank", "noopener,noreferrer");
      }}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm">
          <span className="font-semibold text-white/80">Nombre</span>
          <input
            required
            type="text"
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            placeholder="Tu nombre"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40"
          />
        </label>

        <label className="grid gap-2 text-sm">
          <span className="font-semibold text-white/80">Email</span>
          <input
            type="email"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
            placeholder="tu@email.com"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40"
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm">
          <span className="font-semibold text-white/80">Teléfono</span>
          <input
            type="tel"
            value={form.phone}
            onChange={(event) => setForm({ ...form, phone: event.target.value })}
            placeholder="+34 600 000 000"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40"
          />
        </label>

        <label className="grid gap-2 text-sm">
          <span className="font-semibold text-white/80">Comensales</span>
          <input
            required
            min={1}
            type="number"
            value={form.people}
            onChange={(event) => setForm({ ...form, people: event.target.value })}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white"
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <label className="grid gap-2 text-sm">
          <span className="font-semibold text-white/80">Fecha</span>
          <input
            type="date"
            value={form.date}
            onChange={(event) => setForm({ ...form, date: event.target.value })}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white"
          />
        </label>

        <label className="grid gap-2 text-sm">
          <span className="font-semibold text-white/80">Hora</span>
          <input
            type="time"
            value={form.time}
            onChange={(event) => setForm({ ...form, time: event.target.value })}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white"
          />
        </label>

        <label className="grid gap-2 text-sm md:col-span-3 md:max-w-56">
          <span className="font-semibold text-white/80">¿Terraza o interior?</span>
          <select
            value={form.seating}
            onChange={(event) => setForm({ ...form, seating: event.target.value })}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white w-full"
          >
            <option value="Terraza">Terraza</option>
            <option value="Interior">Interior</option>
            <option value="Indiferente">Indiferente</option>
          </select>
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm">
          <span className="font-semibold text-white/80">Motivo (opcional)</span>
          <input
            value={form.occasion}
            onChange={(event) => setForm({ ...form, occasion: event.target.value })}
            placeholder="Cumpleaños, aniversario..."
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40"
          />
        </label>
        <label className="grid gap-2 text-sm">
          <span className="font-semibold text-white/80">Notas (opcional)</span>
          <input
            type="text"
            value={form.notes}
            onChange={(event) => setForm({ ...form, notes: event.target.value })}
            placeholder="Alergias, preferencias..."
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40"
          />
        </label>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-black hover:bg-white/90"
        >
          Enviar por WhatsApp
          <ArrowRight className="icon" aria-hidden="true" />
        </button>

        <a
          className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 font-semibold text-white hover:bg-white/10"
          href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
        >
          <Phone className="icon" aria-hidden="true" />
          Llamar ahora
        </a>
      </div>
    </form>
  );
}
