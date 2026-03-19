import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Digital Conclave 2025",
    template: "%s | KIET IT Department",
  },
};

export default function ConclaveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />
      {children}
    </>
  );
}
