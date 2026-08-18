import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#faf2f4] text-[#171717]">
      {/* Newsletter */}
      <div className="border-b border-[#eadde0]">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-12 md:flex-row md:items-center md:justify-between lg:px-8">
          <h2 className="text-2xl font-medium font-[Marcellus]">Subscribe to our newsletter</h2>

          <div className="flex w-full max-w-2xl flex-col gap-4 sm:flex-row">
            <input
              type="email"
              placeholder="Your email address *"
              className="w-full h-12 sm:flex-1 border border-[#d9aeb7] bg-transparent px-4 text-sm outline-none placeholder:text-[#9a858a] rounded-lg"
            />

            <button
              type="button"
            //   className="h-12 min-w-[170px] bg-black px-6 text-sm font-medium text-white transition hover:bg-[#333] rounded-lg cursor-pointer"
                          className="h-12 w-full sm:w-auto sm:min-w-[170px] bg-black px-6 text-sm font-medium text-white transition hover:bg-[#333] rounded-lg cursor-pointer"

            >
              SUBSCRIBE
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="border-b border-[#eadde0]">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4 lg:px-8">
          {/* Logo */}
          <div className="flex flex-col items-start">
            <Link href="/" className="text-3xl font-bold tracking-tight">
               LUM
              <span className="text-[#d4a6b6]">É</span>RA
            </Link>

    <p className="mt-4 max-w-xs text-sm leading-6 text-[#5f5659]">
      Discover beauty essentials made to inspire confidence and enhance your everyday glow.
    </p>
          </div>

          {/* Shop Links */}
          <div className="md:ml-10">
            <div className="space-y-3 text-[15px]">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">
                Categories
              </h3>
              <Link href="/shop" className="block hover:underline">
                Shop All
              </Link>

              <Link href="/categories/makeup" className="block hover:underline">
                Makeup
              </Link>

              <Link
                href="/categories/skincare"
                className="block hover:underline"
              >
                Skin Care
              </Link>

              <Link
                href="/categories/hair-care"
                className="block hover:underline"
              >
                Hair Care
              </Link>
            </div>
          </div>

          {/* Information Links */}
          <div className="md:ml-10">
            <div className="space-y-3 text-[15px]">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">
                Quick Links
              </h3>
              <Link href="/about" className="block hover:underline">
                About
              </Link>

              <Link href="/contact" className="block hover:underline">
                Contact
              </Link>

              <Link href="/refund-policy" className="block hover:underline">
                Refund Policy
              </Link>

              <Link href="/terms" className="block hover:underline">
                Terms & Conditions
              </Link>

              <Link href="/faq" className="block hover:underline">
                FAQs & Help
              </Link>

              <Link href="/privacy-policy" className="block hover:underline">
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-start gap-5 md:justify-end">
            {/* Facebook */}
            <a
              href="#"
              aria-label="Facebook"
              className="transition hover:opacity-60"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 8h3V4h-3c-3.3 0-5 1.7-5 5v3H6v4h3v8h4v-8h3l1-4h-4V9c0-.7.3-1 1-1Z" />
              </svg>
            </a>

            {/* Twitter / X */}
            <a
              href="#"
              aria-label="Twitter"
              className="transition hover:opacity-60"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.9 2H22l-6.8 7.8L23 22h-6.1l-4.8-6.3L6.6 22H3.5l7.3-8.4L3 2h6.2l4.3 5.7L18.9 2Zm-1.1 17.8h1.7L8.2 4.1H6.4l11.4 15.7Z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="#"
              aria-label="Instagram"
              className="transition hover:opacity-60"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle
                  cx="17.5"
                  cy="6.5"
                  r="1"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div>
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-7 text-sm text-[#5f5659] md:flex-row md:items-center md:justify-between lg:px-8">
          <p>Copyright © 2026 LUMÉRA All rights reserved.</p>

          <p>Beauty • Care • Confidence</p>
        </div>
      </div>
    </footer>
  );
}
