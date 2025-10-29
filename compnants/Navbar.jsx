"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Navbar() {
  const path = usePathname();
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                href="/"
                className={`${
                  path === "/"
                    ? "text-blue-700 font-semibold"
                    : "text-gray-900 hover:text-blue-700 dark:text-white"
                }`}
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={`${
                  path === "/about"
                    ? "text-blue-700 font-semibold"
                    : "text-gray-900 hover:text-blue-700 dark:text-white"
                }`}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/login"
                className={`${
                  path === "/login"
                    ? "text-blue-700 font-semibold"
                    : "text-gray-900 hover:text-blue-700 dark:text-white"
                }`}
              >
                login
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className={`${
                  path === "/products"
                    ? "text-blue-700 font-semibold"
                    : "text-gray-900 hover:text-blue-700 dark:text-white"
                }`}
              >
                products
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className={`${
                  path === "/contact"
                    ? "text-blue-700 font-semibold"
                    : "text-gray-900 hover:text-blue-700 dark:text-white"
                }`}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/isr"
                className={`${
                  path === "/isr"
                    ? "text-blue-700 font-semibold"
                    : "text-gray-900 hover:text-blue-700 dark:text-white"
                }`}
              >
                isr
              </Link>
            </li>
            <li>
              <Link
                href="/ssg"
                className={`${
                  path === "/ssg"
                    ? "text-blue-700 font-semibold"
                    : "text-gray-900 hover:text-blue-700 dark:text-white"
                }`}
              >
                ssg
              </Link>
            </li>
            <li>
              <Link
                href="/ssr"
                className={`${
                  path === "/ssr"
                    ? "text-blue-700 font-semibold"
                    : "text-gray-900 hover:text-blue-700 dark:text-white"
                }`}
              >
                ssr
              </Link>
            </li>
             <li>
              <Link
                href="/todos"
                className={`${
                  path === "/todos"
                    ? "text-blue-700 font-semibold"
                    : "text-gray-900 hover:text-blue-700 dark:text-white"
                }`}
              >
                todos
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
