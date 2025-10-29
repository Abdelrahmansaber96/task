"use client";

import Navbar from "@/compnants/Navbar";
import "./globals.css";

import { usePathname } from "next/navigation";
import Footer from "@/compnants/Footer";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body>
        {pathname === "/login" ? "" : <Navbar />}
        {children}
        {pathname === "/login" ? "" : <Footer />}
      </body>
    </html>
  );
}
// "use client";

// import Navbar from "@/compnants/Navbar";
// import "./globals.css";
// import { usePathname } from "next/navigation";
// import Footer from "@/compnants/Footer";
// import { Cairo } from "next/font/google"; // ✅ استيراد الخط

// // ✅ تفعيل الخط
// const cairo = Cairo({
//   subsets: ["arabic", "latin"],
//   weight: ["400", "700"],
//   display: "swap",
// });

// export default function RootLayout({ children }) {
//   const pathname = usePathname();

//   return (
//     <html lang="ar">
//       {/* ✅ تطبيق الخط على الـbody */}
//       <body className={cairo.className}>
//         {pathname === "/login" ? null : <Navbar />}
//         {children}
//         {pathname === "/login" ? null : <Footer />}
//       </body>
//     </html>
//   );
// }
