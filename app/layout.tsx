export const metadata = {
  title: "Sales Dashboard",
  description: "Dashboard built with Next.js + Recharts",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
