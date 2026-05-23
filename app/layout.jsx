import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/kiet-theme.scss";
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://www.kiet.edu"),
  title: {
    default: "KIET University",
    template: "%s | KIET University",
  },
  description: "Department of Information Technology at KIET University, Delhi-NCR Ghaziabad.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
