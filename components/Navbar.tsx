"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image'; // Pastikan ini sudah ada
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Building } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/contact', label: 'Contact' },
  ];

  const isActive = (href: string) => pathname === href;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const getLinkClasses = (href: string) => {
    const baseClasses = "relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap";
    const activeHoverBgClasses = "bg-white/20 backdrop-blur-sm";
    const activeHoverTextColor = scrolled ? 'text-black' : 'text-white';
    const defaultTextColor = scrolled ? 'text-gray-600' : 'text-gray-300';

    if (isActive(href)) {
      return `${baseClasses} ${activeHoverBgClasses} ${activeHoverTextColor}`;
    } else {
      return `${baseClasses} ${defaultTextColor} hover:${activeHoverBgClasses} hover:${activeHoverTextColor}`;
    }
  };

  return (
    <nav className={`fixed py-2 top-0 left-0 right-0 z-50 transition-colors duration-300 ${
      scrolled
        ? 'bg-white shadow-sm'
        : 'backdrop-blur-sm' // Added back 'border-b border-black' that was missing in your last paste
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Conditional rendering based on 'scrolled' state */}
          <Link href="/" className="flex items-center"> {/* Removed space-x-2 if only one image */}
            {scrolled ? (
              <Image
                src="/images/logo-merah.svg" // Logo when scrolled (e.g., on white background)
                alt="Reswara Logo Merah"
                width={100} // Sesuaikan lebar sesuai kebutuhan desain
                height={100} // Sesuaikan tinggi sesuai kebutuhan desain
                priority // Optimal untuk logo di navbar
              />
            ) : (
              <Image
                src="/images/logo-putih.svg" // Logo when at the top (e.g., on dark background)
                alt="Reswara Logo Putih"
                width={100} // Sesuaikan lebar sesuai kebutuhan desain
                height={100} // Sesuaikan tinggi sesuai kebutuhan desain
                priority // Optimal untuk logo di navbar
              />
            )}
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={getLinkClasses(item.href)}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 transition-colors duration-200 ${
                scrolled ? 'text-gray-600 hover:text-black' : 'text-gray-300 hover:text-white'
              }`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className={`md:hidden py-4 transition-colors duration-300 ${
            scrolled ? 'border-t border-gray-200' : 'border-t border-slate-800'
          }`}>
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={getLinkClasses(item.href)}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;