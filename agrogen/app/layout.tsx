import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Agrogen",
  description: "Logistic Balance App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
