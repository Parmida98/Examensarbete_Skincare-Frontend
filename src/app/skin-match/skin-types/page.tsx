import { apiFetch } from "@/app/_utility/api"
import type { SkinTypeDTO } from "@/app/_types/skincare.dto"

function formatLabel(label: string) {
  return label.charAt(0).toUpperCase() + label.slice(1).toLowerCase()
}

export default async function SkinTypesPage() {
  const skinTypes = await apiFetch<SkinTypeDTO[]>("/skin-match/skin-types")

  return (
    <main className="min-h-screen">
      <h1 className="text-center text-5xl font-semibold text-[#6B9080] my-10">
        Understanding Skin types
      </h1>
      
      <div className="mx-auto max-w-3xl px-6">
        <div className="space-y-10">
          {skinTypes.map((st) => (
            <article key={st.label} className="bg-[#A4C3B2] px-9 py-8 text-center rounded-xl">
              <div className="text-x3 font-semibold">{formatLabel(st.label)} skin</div>
              <p className="mt-3 text-base">{st.description}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}
