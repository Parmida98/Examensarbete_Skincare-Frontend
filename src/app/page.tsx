export default function HomePage() {
  return (
    <main className="pt-[0px]">
      <section
        className="min-h-[calc(100vh-76.8px)] w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/home-bg.jpeg')" }}
      >
        <div className="flex w-full flex-col items-center pt-32">
  {/* Title box */}
  <div className="bg-[#F5FAF5] px-10 py-6 rounded-xl">
    <h1 className="text-5xl font-semibold text-[#6B9080]">Skin Match</h1>
  </div>

  {/* Second box */}
  <div className="mt-2 w-full max-w-xl bg-[#F5FAF5] px-10 py-7 text-center rounded-xl">
    <p className="text-xl leading-relaxed text-black ">
      Welcome to Skin Match
      <br />
      Here you can learn more about your skin type
      <br />
      and discover which ingredients work best for you
    </p>
  </div>
        

        {/* Button */}
<div className="mt-8">
  <a
    href="/skin-match/search"
    className="inline-block rounded-full bg-[#A4C3B2] px-10 py-4 text-lg font-medium text-[#171717] hover:opacity-90 transition"
  >
    Let’s find out!
  </a>
</div>






        </div>
      



      </section>
    </main>
  )
}
