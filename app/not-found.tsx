import Link from "next/link";
import { Header } from "@/components/Header";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="container">
        <h1 className="page-title">No encontramos esa página</h1>
        <p>
          <Link href="/">Volver al inicio</Link>
        </p>
      </main>
    </>
  );
}
