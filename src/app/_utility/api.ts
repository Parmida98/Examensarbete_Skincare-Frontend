export const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080"
  
  // bygger en korrekt URL
  function buildUrl(path: string, query?: Record<string, string | number | boolean | null | undefined>) {
    const url = new URL(path, BACKEND_URL)

  
    // Bygger URL + query params på ett säkert sätt
    if(query){
        for (const[key,value] of Object.entries(query)) {
            if (value === undefined || value === null || value === "") continue 
            url.searchParams.set(key, String(value))
        }
    }
    return url.toString()
  }
  
  /**
   * hanterar http fel
   * läser apierrordto message från backend
   * return T (kastar error vid fel)
   */

  export async function apiFetch<T> (
    path: string,  
    options: RequestInit = {}, 
    query?: Record<string, string | number | boolean | null | undefined> ): 
    Promise<T> { 
        const finalUrl = buildUrl(path, query)
        
        const res = await fetch(finalUrl, {
            cache: "no-store",
            headers: {
                "Content-Type": "application/json",
                ...(options.headers || {}),
            },
            ...options,
        })
    
    // läser ApiErrorDTO från backend
    if (!res.ok) {
        let message = `${res.status} ${res.statusText}`
    try {
        const errJson = await res.json()
        if (errJson?.message) message = errJson.message
     } catch {
     }
    throw new Error(message)
    }
    
    // 204 no content
    if(res.status === 204) {
        return undefined as T
    }
    return (await res.json() as T)
}
