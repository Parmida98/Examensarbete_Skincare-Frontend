import Link from "next/link"

const textClass =
  "text-[#6b9080] hover:underline hover:decoration-[#6b9080] hover:underline-offset-4"

export function Navbar() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full bg-[#eaf4f4] border-b border-[#6b9080] h-[76.8px]">
      <nav className="h-full flex items-center justify-center">
        <div className="flex gap-[100px] text-xl font-medium">
          <Link className={textClass} href="/skin-match/search">
            Find ingredients
          </Link>
          <Link className={textClass} href="/skin-match">
            Home
          </Link>
          <Link className={textClass} href="/skin-match/skin-types">
            Your skin type
          </Link>
        </div>
      </nav>
    </header>
  )
}

