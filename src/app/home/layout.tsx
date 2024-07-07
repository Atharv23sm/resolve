import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <section className="select-none">
      <Navbar />
      <main>
        <section className="relative min-h-screen bg-1">
          <Sidebar />
          {children}
        </section>
      </main>
    </section>
  );
}
