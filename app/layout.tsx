import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Social media Manager",
  description: "Criado por Rodrigo L. de Albuquerque",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <main className="min-h-screen">
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  );
}
