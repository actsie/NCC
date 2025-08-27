import React, { useState } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import DarkModeToggle from '../DarkModeToggle';

const navigation = [
  { name: 'Features', href: '/#features' },
  { name: 'How it works', href: '/#how-it-works' },
  { name: 'Examples', href: '/#examples' },
  { name: 'Blog', href: '/blog' },
];

const Header = ({ className = "absolute inset-x-0 top-0 z-50" }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Detect current path for active state highlighting
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
  
  const isActive = (href) => {
    if (href === '/blog') {
      return currentPath === '/blog' || currentPath.startsWith('/blog/');
    }
    if (href.startsWith('/#')) {
      return typeof window !== 'undefined' && window.location.hash === href.substring(1);
    }
    return currentPath === href;
  };

  return (
    <header className={className}>
      <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Pawgrammer</span>
            <div className="h-8 w-8 rounded-lg flex items-center justify-center overflow-hidden">
              <img 
                src="/pawgrammer.png" 
                alt="Pawgrammer" 
                className="h-full w-full object-contain"
              />
            </div>
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-[#1F2937] dark:text-white"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a 
              key={item.name} 
              href={item.href} 
              className={`text-sm font-semibold leading-6 ${
                isActive(item.href) 
                  ? 'text-[#7866CC]' 
                  : 'text-[#1F2937] dark:text-white hover:text-[#7866CC] dark:hover:text-[#BEAEE2]'
              }`}
            >
              {item.name}
            </a>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-4">
          <DarkModeToggle />
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white dark:bg-gray-900 p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 dark:ring-gray-100/10">
          <div className="flex items-center justify-between">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Pawgrammer</span>
              <div className="h-8 w-8 rounded-lg flex items-center justify-center overflow-hidden">
                <img 
                  src="/pawgrammer.png" 
                  alt="Pawgrammer" 
                  className="h-full w-full object-contain"
                />
              </div>
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-[#1F2937] dark:text-white"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-50 dark:hover:bg-gray-800 ${
                      isActive(item.href)
                        ? 'text-[#7866CC]'
                        : 'text-[#1F2937] dark:text-white'
                    }`}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                <div className="-mx-3 px-3">
                  <DarkModeToggle />
                </div>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default Header;