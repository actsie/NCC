import React, { useState } from 'react';
import { Dialog, DialogPanel, Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon, PlayCircleIcon } from '@heroicons/react/20/solid';
import {
  ChatBubbleLeftRightIcon,
  MagnifyingGlassIcon,
  DocumentTextIcon,
  ChartBarIcon,
  CodeBracketIcon,
  ClipboardDocumentListIcon,
} from '@heroicons/react/24/outline';
import DarkModeToggle from '../DarkModeToggle';

const navigation = [
  { name: 'Features', href: '/#features' },
  { name: 'How it works', href: '/#how-it-works' },
  { name: 'Blog', href: '/blog' },
];

const automationExamples = [
  { 
    name: 'Job Application Tracker', 
    description: 'Stay organized and track every application, interview, and follow-up in one place.', 
    href: 'https://jobapplication.pawgrammer.com/', 
    icon: ClipboardDocumentListIcon 
  },
];

const callsToAction = [
  { name: 'Watch demo', href: '/examples', icon: PlayCircleIcon },
  { name: 'GitHub', href: 'https://github.com', icon: CodeBracketIcon },
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
        <div className="hidden lg:flex lg:gap-x-12 lg:items-center">
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
          
          {/* Examples Popover */}
          <Popover className="relative">
            {({ open }) => (
              <>
                <PopoverButton className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-[#1F2937] dark:text-white hover:text-[#7866CC] dark:hover:text-[#BEAEE2] focus:outline-none">
                  <span>Examples</span>
                  <ChevronDownIcon 
                    aria-hidden="true" 
                    className={`size-5 transition-transform duration-200 ${open ? 'rotate-180' : 'rotate-0'}`} 
                  />
                </PopoverButton>

            <PopoverPanel
              transition
              className="absolute left-1/2 z-50 mt-5 flex -translate-x-1/2 px-4 transition-all duration-300 ease-out data-[closed]:opacity-0 data-[closed]:scale-95 data-[closed]:-translate-y-2 data-[enter]:duration-300 data-[leave]:duration-200"
            >
              <div className="relative w-96 overflow-hidden rounded-3xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl text-sm leading-6 shadow-xl ring-1 ring-gray-900/10 dark:ring-gray-100/10">
                {/* New ✨ Top Banner */}
                <div className="bg-[#7866CC] px-4 py-2 rounded-t-3xl">
                  <div className="text-center text-white text-sm font-medium">
                    New ✨
                  </div>
                </div>
                
                <div className="p-4">
                  {automationExamples.map((item) => (
                    <div key={item.name} className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <div className="mt-1 flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 dark:bg-gray-700/50 group-hover:bg-[#7866CC] dark:group-hover:bg-[#7866CC]">
                        <item.icon aria-hidden="true" className="size-6 text-gray-600 dark:text-gray-400 group-hover:text-white" />
                      </div>
                      <div>
                        <a href={item.href} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#1F2937] dark:text-white hover:text-[#7866CC] dark:hover:text-[#BEAEE2]">
                          {item.name}
                          <span className="absolute inset-0" />
                        </a>
                        <p className="mt-1 text-gray-600 dark:text-gray-400">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 divide-x divide-gray-900/5 dark:divide-gray-100/10 bg-gray-50 dark:bg-gray-700/50">
                  {callsToAction.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={`flex items-center justify-center gap-x-2.5 p-3 font-semibold text-[#1F2937] dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${
                        item.name === 'GitHub' ? 'cursor-not-allowed' : ''
                      }`}
                      onClick={item.name === 'GitHub' ? (e) => e.preventDefault() : undefined}
                    >
                      <item.icon aria-hidden="true" className="size-5 flex-none text-gray-500 dark:text-gray-400" />
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </PopoverPanel>
              </>
            )}
          </Popover>
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
                
                {/* Mobile Examples Section */}
                <div className="-mx-3 px-3 py-2">
                  <div className="text-base font-semibold leading-7 text-[#1F2937] dark:text-white mb-3">
                    Examples
                  </div>
                  <div className="space-y-2 ml-3">
                    {automationExamples.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-x-3 rounded-lg px-3 py-2 text-sm leading-6 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <item.icon className="size-5 flex-none text-gray-500 dark:text-gray-400" />
                        <span>{item.name}</span>
                      </a>
                    ))}
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {callsToAction.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-center gap-x-2 rounded-lg bg-gray-50 dark:bg-gray-800 px-3 py-2 text-sm font-semibold text-[#1F2937] dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <item.icon className="size-4 flex-none text-gray-500 dark:text-gray-400" />
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
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