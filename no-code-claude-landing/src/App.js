import React, { useState } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { CommandLineIcon, BuildingOffice2Icon, RocketLaunchIcon } from '@heroicons/react/20/solid';
import { ExclamationTriangleIcon, XMarkIcon as XMarkSolidIcon, CogIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const navigation = [
  { name: 'Features', href: '#features' },
  { name: 'How it works', href: '#how-it-works' },
  { name: 'Examples', href: '#examples' },
];

const claudeFeatures = [
  {
    name: 'Full system control.',
    description: 'Reads/writes files, installs tools, creates databases, runs apps locally',
    icon: CommandLineIcon,
  },
  {
    name: 'Built by Anthropic.',
    description: 'Who makes Claude—not a third-party tool paying for API access',
    icon: BuildingOffice2Icon,
  },
  {
    name: 'End-to-end capability.',
    description: 'From idea to deployed app without developer intervention',
    icon: RocketLaunchIcon,
  }
];

const otherToolsLimitations = [
  {
    name: 'Template-based builders have limits',
    description: 'Like Lovable work for demos but need developer cleanup for real apps',
    icon: ExclamationTriangleIcon,
  },
  {
    name: 'Limited infrastructure',
    description: 'Simple tools break down when requirements get complex',
    icon: ExclamationTriangleIcon,
  },
  {
    name: 'Third-party limitations',
    description: 'Built by companies that pay Anthropic for compressed Claude access—lower accuracy',
    icon: ExclamationTriangleIcon,
  }
];

const claudeCodeComplexity = [
  {
    name: 'Claude.md configuration',
    description: 'Effective Claude.md configuration that most people never get right',
    icon: DocumentTextIcon,
  },
  {
    name: 'Complex infrastructure',
    description: 'MCP servers, testing frameworks, debugging workflows',
    icon: CogIcon,
  },
  {
    name: 'Expert-level setup',
    description: 'Even experienced developers struggle with proper setup',
    icon: XMarkSolidIcon,
  }
];

const App = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">No Code Claude</span>
              <div className="h-8 w-8 bg-[#6366F1] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">NC</span>
              </div>
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-[#1F2937]"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-[#1F2937]">
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a href="#" className="text-sm font-semibold leading-6 text-[#1F2937]">Log in <span aria-hidden="true">→</span></a>
          </div>
        </nav>
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">No Code Claude</span>
                <div className="h-8 w-8 bg-[#6366F1] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">NC</span>
                </div>
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-[#1F2937]"
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
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-[#1F2937] hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-[#1F2937] hover:bg-gray-50"
                  >
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        {/* Background gradient blobs */}
        <div aria-hidden="true" className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div 
            style={{
              clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#6366F1] to-[#0D9488] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
        
        <section className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          {/* Announcement Banner */}
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-[#6B7280] ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Professional Claude Code setup, no complexity. <a href="#" className="font-semibold text-[#6366F1]"><span aria-hidden="true" className="absolute inset-0"></span>Learn more <span aria-hidden="true">→</span></a>
            </div>
          </div>
          
          <div className="text-center">
            <h1 className="text-5xl font-semibold tracking-tight text-balance text-[#1F2937] sm:text-7xl">
              Claude Code for non-developers
            </h1>
            <p className="mt-8 text-lg font-medium text-pretty text-[#6B7280] sm:text-xl/8">
              No Code Claude gives non-technical users access to Claude Code with professional-grade infrastructure that even experienced developers struggle to set up themselves.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a href="#" className="rounded-md bg-[#6366F1] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#5B5BD6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6366F1]">
                Request early access
              </a>
              <a href="#features" className="text-sm font-semibold leading-6 text-[#1F2937]">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </section>
        
        {/* Bottom gradient blob */}
        <div aria-hidden="true" className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
          <div 
            style={{
              clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#6366F1] to-[#0D9488] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>

      {/* Why Claude Code Matters */}
      <section id="features" className="overflow-hidden bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:pt-4 lg:pr-8">
              <div className="lg:max-w-lg">
                <h2 className="text-base font-semibold leading-7 text-[#6366F1]">Why Claude Code matters</h2>
                <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-[#1F2937] sm:text-5xl">
                  Real developers choose Claude Code
                </p>
                <p className="mt-6 text-lg leading-8 text-[#6B7280]">
                  Professional developers trust Claude Code because it's uniquely powerful—offering capabilities that other tools simply can't match.
                </p>
                <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-[#6B7280] lg:max-w-none">
                  {claudeFeatures.map((feature, index) => (
                    <motion.div 
                      key={feature.name} 
                      className="relative pl-9 group cursor-pointer hover:bg-white/50 rounded-lg p-3 -m-3 transition-colors duration-300"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <dt className="inline font-semibold text-[#1F2937]">
                        <motion.div 
                          className="absolute top-1 left-1 size-8 bg-white grid place-items-center ring-1 ring-black/[0.08] rounded-xl shadow-sm group-hover:shadow-md"
                          animate={{ 
                            y: [-1, -4, -1],
                            rotate: [
                              index === 0 ? -3 : index === 1 ? 0 : 3,
                              index === 0 ? -6 : index === 1 ? 0 : 6,  
                              index === 0 ? -3 : index === 1 ? 0 : 3
                            ],
                            scale: [1, 1.05, 1]
                          }}
                          transition={{ 
                            duration: 3 + (index * 0.5),
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: index * 0.8
                          }}
                          whileHover={{ 
                            scale: 1.15,
                            y: -6
                          }}
                        >
                          <feature.icon aria-hidden="true" className="size-5 text-[#6366F1]" />
                        </motion.div>
                        <span className="ml-6">{feature.name}</span>
                      </dt>{' '}
                      <dd className="inline ml-6">{feature.description}</dd>
                    </motion.div>
                  ))}
                </dl>
              </div>
            </div>

            <img
              alt="Claude Code terminal interface"
              src="/claude-code-screenshot.png"
              className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
            />
          </div>
        </div>
      </section>

      {/* Sticky Problem Slides */}
      <div className="relative">
        {/* First Slide - Other tools limitations */}
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center relative isolate bg-white py-24 sm:py-32">
          {/* Background gradient blob */}
          <div aria-hidden="true" className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
            <div 
              style={{
                clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
              }}
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#F59E0B] to-[#EAB308] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            />
          </div>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-[#F59E0B]">The problem with alternatives</h2>
              <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-[#1F2937] sm:text-5xl lg:text-balance">
                Other tools reach their limits fast
              </p>
              <p className="mt-6 text-lg leading-8 text-[#6B7280]">
                While other solutions might seem attractive initially, they quickly show their limitations when you need real functionality.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
                {otherToolsLimitations.map((limitation, index) => (
                  <motion.div 
                    key={limitation.name} 
                    className="relative pl-16 group cursor-pointer hover:bg-[#FEF3C7]/30 rounded-lg p-4 -m-4 transition-colors duration-300"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <dt className="text-base leading-7 font-semibold text-[#1F2937]">
                      <motion.div 
                        className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-[#F59E0B] shadow-sm group-hover:shadow-md"
                        animate={{ 
                          y: [-1, -3, -1],
                          rotate: [-2, 2, -2],
                          scale: [1, 1.03, 1]
                        }}
                        transition={{ 
                          duration: 2.5 + (index * 0.3),
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.6
                        }}
                        whileHover={{ 
                          scale: 1.1,
                          y: -5
                        }}
                      >
                        <limitation.icon aria-hidden="true" className="size-6 text-white" />
                      </motion.div>
                      {limitation.name}
                    </dt>
                    <dd className="mt-2 text-base leading-7 text-[#6B7280]">{limitation.description}</dd>
                  </motion.div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* Second Slide - Claude Code complexity */}
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center relative isolate bg-white py-24 sm:py-32">
          {/* Background gradient blob */}
          <div aria-hidden="true" className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
            <div 
              style={{
                clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
              }}
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#EF4444] to-[#F97316] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            />
          </div>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-[#EF4444]">The setup challenge</h2>
              <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-[#1F2937] sm:text-5xl lg:text-balance">
                But Claude Code requires expert-level setup
              </p>
              <p className="mt-6 text-lg leading-8 text-[#6B7280]">
                Even experienced developers struggle with the complex configuration needed to unlock Claude Code's full potential.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
                {claudeCodeComplexity.map((complexity, index) => (
                  <motion.div 
                    key={complexity.name} 
                    className="relative pl-16 group cursor-pointer hover:bg-[#FEE2E2]/30 rounded-lg p-4 -m-4 transition-colors duration-300"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <dt className="text-base leading-7 font-semibold text-[#1F2937]">
                      <motion.div 
                        className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-[#EF4444] shadow-sm group-hover:shadow-md"
                        animate={{ 
                          y: [-1, -4, -1],
                          rotate: [
                            index === 0 ? -4 : index === 1 ? 0 : 4,
                            index === 0 ? -8 : index === 1 ? 0 : 8,
                            index === 0 ? -4 : index === 1 ? 0 : 4
                          ],
                          scale: [1, 1.04, 1]
                        }}
                        transition={{ 
                          duration: 3.2 + (index * 0.4),
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.7
                        }}
                        whileHover={{ 
                          scale: 1.15,
                          y: -6
                        }}
                      >
                        <complexity.icon aria-hidden="true" className="size-6 text-white" />
                      </motion.div>
                      {complexity.name}
                    </dt>
                    <dd className="mt-2 text-base leading-7 text-[#6B7280]">{complexity.description}</dd>
                  </motion.div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* How No Code Claude Solves This - Bento Grid */}
      <section className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-center text-base/7 font-semibold text-[#6366F1]">How No Code Claude Solves This</h2>
          <p className="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-[#1F2937] sm:text-5xl">
            Get Claude Code's full power, properly configured
          </p>
          <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
            <div className="relative lg:row-span-2">
              <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-[2rem]" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(0.75rem+1px)] lg:rounded-l-[calc(2rem+1px)]">
                <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                  <p className="mt-2 text-lg font-medium tracking-tight text-[#1F2937] max-lg:text-center">
                    Built for non-technical users who want real apps
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-[#6B7280] max-lg:text-center">
                    Yes, there's a learning curve—but you get apps that actually work long-term. Other tools work for demos. No Code Claude builds apps you can actually use.
                  </p>
                </div>
                <div className="relative min-h-[30rem] w-full grow max-lg:mx-auto max-lg:max-w-sm">
                  <div className="absolute inset-x-10 top-10 bottom-0 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-gray-700 bg-gray-900 shadow-2xl">
                    <div className="size-full bg-gradient-to-br from-[#6366F1] to-[#0D9488] flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="text-4xl mb-2">🎯</div>
                        <div className="text-sm">Real Apps</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 lg:rounded-l-[2rem]" />
            </div>
            <div className="relative max-lg:row-start-1">
              <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem]" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(0.75rem+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
                <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                  <p className="mt-2 text-lg font-medium tracking-tight text-[#1F2937] max-lg:text-center">Professional setup, ready to use</p>
                  <p className="mt-2 max-w-lg text-sm/6 text-[#6B7280] max-lg:text-center">
                    Skip the configuration complexity that stops most people. Get the infrastructure knowledge we've refined through trial and error.
                  </p>
                </div>
                <div className="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
                  <div className="w-full max-lg:max-w-xs bg-gradient-to-r from-[#0D9488] to-[#6366F1] rounded-lg p-8 text-white text-center">
                    <div className="text-3xl mb-2">⚙️</div>
                    <div className="text-lg font-semibold">Ready to Use</div>
                    <div className="text-sm opacity-90">Professional setup</div>
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 max-lg:rounded-t-[2rem]" />
            </div>
            <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
              <div className="absolute inset-px rounded-lg bg-white" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(0.75rem+1px)]">
                <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                  <p className="mt-2 text-lg font-medium tracking-tight text-[#1F2937] max-lg:text-center">Same AI, better interface</p>
                  <p className="mt-2 max-w-lg text-sm/6 text-[#6B7280] max-lg:text-center">
                    Same AI that builds production-ready apps, wrapped in an interface you can use. No architectural limitations.
                  </p>
                </div>
                <div className="flex flex-1 items-center max-lg:py-6 lg:pb-2">
                  <div className="w-full bg-gradient-to-br from-[#6366F1] to-[#0D9488] rounded-lg p-6 text-white text-center">
                    <div className="text-2xl mb-2">🤖</div>
                    <div className="text-sm font-semibold">Same Powerful AI</div>
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5" />
            </div>
            <div className="relative lg:row-span-2">
              <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(0.75rem+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
                <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                  <p className="mt-2 text-lg font-medium tracking-tight text-[#1F2937] max-lg:text-center">
                    Expert-level infrastructure
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-[#6B7280] max-lg:text-center">
                    We've built the expert-level infrastructure (Claude.md, testing, debugging) that takes others weeks to figure out.
                  </p>
                </div>
                <div className="relative min-h-[30rem] w-full grow">
                  <div className="absolute top-10 right-0 bottom-0 left-10 overflow-hidden rounded-tl-xl bg-gray-900 shadow-2xl ring-1 ring-white/10">
                    <div className="flex bg-gray-800 ring-1 ring-white/5">
                      <div className="-mb-px flex text-sm/6 font-medium text-gray-400">
                        <div className="border-r border-b border-r-white/10 border-b-white/20 bg-white/5 px-4 py-2 text-white">
                          claude.md
                        </div>
                        <div className="border-r border-gray-600/10 px-4 py-2">App.jsx</div>
                      </div>
                    </div>
                    <div className="px-6 pt-6 pb-14 text-sm text-gray-300 font-mono">
                      <div className="text-emerald-400"># Expert Infrastructure</div>
                      <div className="mt-2 text-gray-400">- Claude.md configuration ✓</div>
                      <div className="text-gray-400">- MCP servers ✓</div>
                      <div className="text-gray-400">- Testing frameworks ✓</div>
                      <div className="text-gray-400">- Debugging workflows ✓</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]" />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="px-6 py-16 bg-[#F8FAFC]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-semibold tracking-tight text-[#1F2937] mb-12 text-center sm:text-5xl">
            How It Works
          </h2>
          
          <div className="space-y-12">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
              <div className="bg-[#BEAEE2] text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#1F2937] mb-3">
                  Describe your app to our Claude Code interface
                </h3>
                <div className="bg-white p-4 rounded-lg italic text-[#1F2937] border border-gray-200 shadow-sm">
                  "Build a budget tracker that splits roommate expenses, integrates with bank APIs, and sends weekly reports"
                </div>
              </div>
            </div>
            
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
              <div className="bg-[#BEAEE2] text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#1F2937] mb-3">
                  Watch Claude Code build with our expert infrastructure
                </h3>
                <p className="text-[#6B7280]">
                  Same powerful AI, supported by professional-grade configuration and testing
                </p>
              </div>
            </div>
            
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
              <div className="bg-[#BEAEE2] text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#1F2937] mb-3">
                  Get production-ready apps, not prototypes
                </h3>
                <p className="text-[#6B7280]">
                  Fully functional applications that scale with your business needs
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You Can Build */}
      <section id="examples" className="px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-semibold tracking-tight text-[#1F2937] mb-12 text-center sm:text-5xl">
            What You Can Build
          </h2>
          <p className="text-lg font-medium text-[#6B7280] mb-12 text-center">
            Real examples from our expert-configured Claude Code:
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="font-semibold text-[#1F2937] mb-2">Multi-tenant SaaS</h3>
              <p className="text-[#6B7280]">With user authentication and billing</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="font-semibold text-[#1F2937] mb-2">E-commerce platform</h3>
              <p className="text-[#6B7280]">With payment processing and inventory management</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="font-semibold text-[#1F2937] mb-2">Project management system</h3>
              <p className="text-[#6B7280]">With team collaboration and reporting</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="font-semibold text-[#1F2937] mb-2">Custom CRM</h3>
              <p className="text-[#6B7280]">With automated workflows and integrations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-6 py-16 bg-[#333333] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-semibold tracking-tight mb-6">
            The Bottom Line
          </h2>
          <div className="space-y-6 text-lg lg:text-xl mb-12 max-w-3xl mx-auto">
            <p>
              Most people never unlock Claude Code's full potential because proper setup is incredibly complex. We've solved that problem.
            </p>
            <p>
              You get the same AI that professional developers trust, with infrastructure that even experienced engineers struggle to configure properly.
            </p>
          </div>
          <div>
            <p className="text-xl mb-6">Ready for Claude Code that's properly configured?</p>
            <button className="bg-[#6366F1] hover:bg-[#5B5BD6] text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-200 shadow-sm hover:shadow-md">
              Request early access
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
