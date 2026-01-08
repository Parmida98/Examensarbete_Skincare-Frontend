"use client"

import { useEffect, useMemo, useState } from "react"
import { apiFetch } from "@/app/_utility/api"
import type { IngredientDTO, PageResponseDTO, SkinTypeDTO } from "@/app/_types/skincare.dto"

export function SearchPage() {
    const [skinTypes, setSkinTypes] = useState<SkinTypeDTO[]>([])
    const [skinType, setSkinType] = useState("")
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(0)
    const [size] = useState(15)
    
    const [data, setData] = useState<PageResponseDTO<IngredientDTO> | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // Debounce för sök (så backend inte spamas)
    const debouncedSearch = useDebouncedValue(search, 350)
    
    // 1. hämta skin types vid load
  useEffect(() => {
    ;(async () => {
      try {
        const sts = await apiFetch<SkinTypeDTO[]>("/skin-match/skin-types")
        setSkinTypes(sts)
      } catch (e: any) {
        setError(e?.message ?? "Failed to load skin types")
      }
    })()
  }, [])
  
  // 2. hämta ingredients när filter ändras
  useEffect(() => {
    if (!skinType) return

    ;(async() =>{
    setLoading(true)
    setError(null)

    try {
        const res = await apiFetch<PageResponseDTO<IngredientDTO>>(
            "/skin-match/ingredients",
            {},
            {
                skinType,
                search: debouncedSearch,
                page,
                size,
            }
        )
        setData(res)
    } catch (e:any) {
        setData(null)
        setError(e?.message ?? "Failed to load ingredients")
    } finally {
        setLoading(false)
    }
  })()
}, [skinType, debouncedSearch, page, size])

const canPrev = useMemo(() => (data ? data.hasPrevious : false), [data])
const canNext = useMemo(() => (data ? data.hasNext : false), [data])


return (
    <main className="mx-auto max-w-5xl p-4">
      <h1 className="text-center text-5xl font-semibold text-[#6B9080] my-10">Search ingredients</h1>
      
      <div className="flex flex-wrap items-end gap-4 mb-6">
        <div className="mx-auto flex max-w-3xl items-center gap-6 px-6">
          <select
            className="h-11 rounded-full bg-[#eaf4f4] px-6 outline-none"
            value={skinType}
            onChange={(e) => {
                const value = e.target.value
                setSkinType(value)
                setPage(0)
                
                if (value === "") {
                    setData(null)
                    setError(null)
                }
            }}
          >
            <option value="">Choose a skin type</option>
            {skinTypes.map((st) => (
              <option key={st.label} value={st.label}>
                {st.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex h-12 flex-1 items-center rounded-full bg-[#eaf4f4] px-6">
          <input
            className="w-full bg-transparent outline-none"
            placeholder="e.g. niacinamide"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(0)
            }}
          />
          <span className="ml-3 text-2xl">🔍</span>
        </div>
      </div>
      {!skinType && <p>Please choose a skin type to see ingredients.</p>}

      {loading && <p>Loading…</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && data && (
        <>
          <p className="text-sm mb-3">
            Showing {data.items.length} of {data.totalItems} ingredients (page {data.page + 1} /{" "}
            {data.totalPages})
          </p>

          <ul className="mx-auto mt-10 max-w-4.5xl space-y-10">
            {data.items.map((i) => (
              <li key={i.inciName} className="bg-[#A4C3B2] px-10 py-8 text-center rounded-xl">
                <div className="font-semibold">{i.inciName}</div>
                <p className="text-sm mt-1">{i.description ?? "No description available."}</p>
              </li>
            ))}
          </ul>

          <div className="mx-auto flex max-w-3xl items-center gap-10 mt-10">
            <button
              className="rounded-full bg-[#A4C3B2] px-6 py-3 disabled:opacity-50"
              disabled={!canPrev}
              onClick={() => setPage((p) => Math.max(0, p - 1))}
            >
              Previous
            </button>

            <button
              className="rounded-full bg-[#A4C3B2] px-6 py-3 disabled:opacity-50"
              disabled={!canNext}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </main>
  )
}

function useDebouncedValue<T>(value: T, delayMs: number)
{
    const [debounced, setDebounced] = useState(value)

    useEffect(()=> {
        const id = setTimeout(() => setDebounced (value), delayMs)
        return () => clearTimeout(id)
    }, [value, delayMs])
    return debounced
}