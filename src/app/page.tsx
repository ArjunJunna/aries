import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center font-mono justify-center text-primary">
      <span className="text-9xl">Aries</span>
      <p className="text-2xl text-wrap text-center">
        All in one tool for design and documentation.
      </p>
    </main>
  );
}
