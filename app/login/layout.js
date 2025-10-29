export default function LoginLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <div className="w-20 md:w-64 bg-gray-800 text-white p-4 flex flex-col">
            {/* Logo or App Name */}
            <div className="flex items-center justify-center md:justify-start p-2">
              <i className="fas fa-code text-2xl" />
              <span className="hidden md:block ml-2 font-bold">App Name</span>
            </div>

            {/* Navigation */}
            <ul className="mt-4 flex-1">
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 hover:bg-gray-700 rounded-md"
                >
                  <i className="fas fa-home text-xl" />
                  <span className="hidden md:block ml-3">Home</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 hover:bg-gray-700 rounded-md"
                >
                  <i className="fas fa-user text-xl" />
                  <span className="hidden md:block ml-3">Profile</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 hover:bg-gray-700 rounded-md"
                >
                  <i className="fas fa-cog text-xl" />
                  <span className="hidden md:block ml-3">Settings</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="flex-1 bg-gray-100 p-6">{children}</div>
        </div>
      </body>
    </html>
  );
}
