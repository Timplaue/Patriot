import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Молодежный центр 'Патриот'",
    description: "Патриотическое воспитание молодежи",
};

export default function Home() {
  return (
      <main className="flex flex-col items-center justify-center w-full md:mx-[100px]">
          <div className="flex flex-col lg:flex-row"></div>
          <section>
              {/*<img src="" alt=""/>*/}
          </section>
      </main>
  );
}
