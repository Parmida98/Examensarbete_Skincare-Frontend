import { apiFetch } from "@/app/_utility/api"
import type { SkinTypeDTO } from "@/app/_types/skincare.dto"

export default async function Home() {
  const skinTypes = await apiFetch<SkinTypeDTO[]>("/skin-match/skin-types")

  return (
    <main>
      <h1>Skin Match</h1>
      <ul>
        {skinTypes.map((st) => (
          <li key={st.label}>{st.label}</li>
        ))}
      </ul>
    </main>
  )
}
