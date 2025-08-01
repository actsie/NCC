import React, { useState } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { CommandLineIcon, BuildingOffice2Icon, RocketLaunchIcon, CloudArrowUpIcon, LockClosedIcon, ServerIcon, ShoppingCartIcon, UserGroupIcon, ChartBarIcon } from '@heroicons/react/20/solid';
import { ExclamationTriangleIcon, XMarkIcon as XMarkSolidIcon, CogIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import AnimatedButton from './AnimatedButton';

// Typewriter effect component
const TypewriterText = () => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const texts = [
    "Create a website for my bakery",
    "Help me organize my photos by date", 
    "Build a simple game for my kids",
    "Make a todo list app",
    "Create a budget tracker",
    "Build a recipe organizer"
  ];

  React.useEffect(() => {
    const currentFullText = texts[currentIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting && currentText === currentFullText) {
        // Pause at end before deleting
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentText === '') {
        // Move to next text
        setIsDeleting(false);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
      } else if (isDeleting) {
        // Delete character
        setCurrentText(currentFullText.substring(0, currentText.length - 1));
      } else {
        // Add character
        setCurrentText(currentFullText.substring(0, currentText.length + 1));
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentText, currentIndex, isDeleting]);

  return (
    <span>
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

// Styled component for shining separator line
const ShineLine = styled.hr`
  height: 1px;
  border: none;
  background: linear-gradient(to right, #f12711 0, #f5af19 10%, #f12711 20%);
  background-size: 300% 100%;
  background-position: -300% 0;
  animation: shine 36s infinite linear;
  margin: 1.5rem auto;

  @-moz-keyframes shine {
    0% {
      background-position: -300% 0;
    }
    100% {
      background-position: 300% 0;
    }
  }
  @-webkit-keyframes shine {
    0% {
      background-position: -300% 0;
    }
    100% {
      background-position: 300% 0;
    }
  }
  @-o-keyframes shine {
    0% {
      background-position: -300% 0;
    }
    100% {
      background-position: 300% 0;
    }
  }
  @keyframes shine {
    0% {
      background-position: -300% 0;
    }
    100% {
      background-position: 300% 0;
    }
  }
`;

// Styled component for gradient shine effect on "No Code Claude" text
const ShineText = styled.span`
  background: linear-gradient(to right, #f12711 0, #f5af19 10%, #f12711 20%);
  background-size: 300% 100%;
  background-position: -300% 0;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shine 36s infinite linear;
  animation-fill-mode: forwards;
  -webkit-text-size-adjust: none;
  font-weight: 600;
  white-space: nowrap;

  @-moz-keyframes shine {
    0% {
      background-position: -300% 0;
    }
    100% {
      background-position: 300% 0;
    }
  }
  @-webkit-keyframes shine {
    0% {
      background-position: -300% 0;
    }
    100% {
      background-position: 300% 0;
    }
  }
  @-o-keyframes shine {
    0% {
      background-position: -300% 0;
    }
    100% {
      background-position: 300% 0;
    }
  }
  @keyframes shine {
    0% {
      background-position: -300% 0;
    }
    100% {
      background-position: 300% 0;
    }
  }
`;

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

const alternativesProblems = [
  {
    name: 'They\'re not built for Claude Code.',
    description: 'Many tools wrap Claude with limited API access — meaning weaker results and capped capabilities.',
    icon: () => <span className="animate-pulse text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#f12711] via-[#f5af19] to-[#f12711] bg-clip-text text-transparent">*</span>,
  },
  {
    name: 'They skip the hard setup.',
    description: 'Claude.md configuration, MCP servers, debugging workflows — even experienced developers get stuck here.',
    icon: () => <span className="animate-pulse text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#f12711] via-[#f5af19] to-[#f12711] bg-clip-text text-transparent">*</span>,
  },
  {
    name: 'They rely on templates, not full control.',
    description: 'You\'re locked into pre-built flows. Real apps need custom logic, not canned components.',
    icon: () => <span className="animate-pulse text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#f12711] via-[#f5af19] to-[#f12711] bg-clip-text text-transparent">*</span>,
  }
];

const setupChallenges = [
  {
    name: 'Claude.md configuration',
    description: 'Crucial to making Claude behave like an agent — but tricky to get right without deep experience.',
    icon: () => <span className="animate-pulse text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#f12711] via-[#f5af19] to-[#f12711] bg-clip-text text-transparent">*</span>,
  },
  {
    name: 'Complex infrastructure',
    description: 'Requires orchestration across MCP servers, custom testing frameworks, and reliable debugging workflows.',
    icon: () => <span className="animate-pulse text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#f12711] via-[#f5af19] to-[#f12711] bg-clip-text text-transparent">*</span>,
  },
  {
    name: 'Not beginner-friendly',
    description: 'It\'s not just about writing prompts — it\'s about building a system that responds like a teammate.',
    icon: () => <span className="animate-pulse text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#f12711] via-[#f5af19] to-[#f12711] bg-clip-text text-transparent">*</span>,
  }
];

const App = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [showShareButton, setShowShareButton] = useState(false);
  const [isExpanding, setIsExpanding] = useState(false);
  const [footerButtonBounce, setFooterButtonBounce] = useState(false);

  // Handle tooltip visibility when user signs up
  React.useEffect(() => {
    if (isSignedUp) {
      // After 2 seconds, start expanding and changing to "Share with friends"
      setTimeout(() => {
        setIsExpanding(true);
        // Show tooltip and change text after expansion starts
        setTimeout(() => {
          setShowShareButton(true);
          setShowTooltip(true);
          setIsExpanding(false);
        }, 300); // Match CSS transition duration
      }, 2000);
      
      // Hide tooltip after 2.5 more seconds (4.5 seconds total from signup)
      setTimeout(() => {
        setShowTooltip(false);
      }, 4500);
    }
  }, [isSignedUp]);

  // Handle scroll detection for footer visibility
  React.useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector('#footer-section');
      if (footer) {
        const rect = footer.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        if (isVisible && isSignedUp && !isFooterVisible) {
          setIsFooterVisible(true);
          
          // Show tooltip and bounce animation for footer button if user signed up
          setShowTooltip(true);
          setFooterButtonBounce(true);
          
          // Hide tooltip after 2.5 seconds
          setTimeout(() => {
            setShowTooltip(false);
          }, 2500);
          
          // Stop bouncing after 2 bounces (1.2 seconds)
          setTimeout(() => {
            setFooterButtonBounce(false);
          }, 1200);
        } else if (!isVisible) {
          setIsFooterVisible(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isSignedUp, isFooterVisible]);

  return (
    <div className="min-h-screen bg-white">
      <style jsx>{`
        .signup-tooltip {
          position: absolute;
          bottom: calc(100% + 15px);
          left: 50%;
          transform: translateX(-50%) translateY(10px);
          padding: 12px 20px;
          background: linear-gradient(135deg, #ffffff, #f8f9fa);
          border-radius: 10px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          color: #1f2937;
          font-size: 14px;
          white-space: nowrap;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
          border: 1px solid rgba(229, 231, 235, 1);
          z-index: 10;
        }

        .signup-tooltip.show {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(0);
        }

        /* Tooltip arrow */
        .signup-tooltip::after {
          content: "";
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border-width: 8px;
          border-style: solid;
          border-color: #ffffff transparent transparent transparent;
        }


        @keyframes glow {
          0% { text-shadow: 0 0 10px rgba(239, 9, 121, 0.5); }
          50% { text-shadow: 0 0 20px rgba(239, 9, 121, 0.7); }
          100% { text-shadow: 0 0 10px rgba(239, 9, 121, 0.5); }
        }

        .signup-tooltip .heart-text {
          animation: glow 2s infinite;
          font-weight: 600;
        }

        .signup-tooltip .heart-icon {
          margin-right: 6px;
          color: #ef0979;
        }

        @media (max-width: 768px) {
          .signup-tooltip {
            font-size: 13px;
            padding: 10px 16px;
          }
        }
      `}</style>
      {/* Navigation Header */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">No Code Claude</span>
              <div className="h-8 w-8 bg-[#D97706] rounded-lg flex items-center justify-center">
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
                <div className="h-8 w-8 bg-[#D97706] rounded-lg flex items-center justify-center">
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
              clipPath: 'polygon(50% 0%, 55% 25%, 75% 7%, 65% 32%, 100% 25%, 70% 45%, 93% 57%, 62% 62%, 75% 93%, 50% 68%, 25% 93%, 38% 62%, 7% 57%, 30% 45%, 0% 25%, 35% 32%, 25% 7%, 45% 25%)'
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#D97706] to-[#F59E0B] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
        
        <section className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          {/* Announcement Banner */}
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-[#6B7280] ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Professional Claude Code setup, no complexity. <a href="#" className="font-semibold text-[#D97706]"><span aria-hidden="true" className="absolute inset-0"></span>Learn more <span aria-hidden="true">→</span></a>
            </div>
          </div>
          
          <div className="text-center">
            <h1 className="text-5xl font-semibold tracking-tight text-balance text-[#1F2937] sm:text-7xl">
              Claude Code for non-developers
            </h1>
            <p className="mt-8 text-lg font-medium text-pretty text-[#6B7280] sm:text-xl/8">
              <ShineText>No Code Claude</ShineText> gives non-technical users access to Claude Code with professional-grade infrastructure that even experienced developers struggle to set up themselves.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <div className="relative inline-block">
                {isSignedUp && showShareButton && (
                  <div className={`signup-tooltip ${showTooltip ? 'show' : ''}`}>
                    <div className="flex items-center">
                      <span className="heart-icon">❤️</span>
                      <span className="heart-text">You're all set!</span>
                    </div>
                  </div>
                )}
                <AnimatedButton 
                  onSignup={() => setIsSignedUp(true)}
                  showSuccess={isSignedUp && !showShareButton}
                  isShareMode={showShareButton}
                  isExpanding={isExpanding}
                >
                  {showShareButton ? 'Share with friends' : isSignedUp ? "You're all set!" : 'Get early access'}
                </AnimatedButton>
              </div>
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
              clipPath: 'polygon(50% 0%, 55% 25%, 75% 7%, 65% 32%, 100% 25%, 70% 45%, 93% 57%, 62% 62%, 75% 93%, 50% 68%, 25% 93%, 38% 62%, 7% 57%, 30% 45%, 0% 25%, 35% 32%, 25% 7%, 45% 25%)'
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#D97706] to-[#F59E0B] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>

      {/* Why Claude Code Matters */}
      <section id="features" className="overflow-hidden bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:pt-4 lg:pr-8">
              <div className="lg:max-w-lg">
                <h2 className="text-base font-semibold leading-7 text-[#D97706]">Why Claude Code matters</h2>
                <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-[#1F2937] sm:text-5xl">
                  Real developers choose Claude Code
                </p>
                <p className="mt-6 text-lg leading-8 text-[#6B7280]">
                  Professional developers trust Claude Code because it's uniquely powerful—offering capabilities that other tools simply can't match.
                </p>
                <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-[#6B7280] lg:max-w-none">
                  {claudeFeatures.map((feature, index) => (
                    <div key={feature.name} className="relative pl-9">
                      <dt className="inline font-semibold text-[#1F2937]">
                        <motion.div
                          className="absolute top-1 left-1 size-5 text-[#D97706]"
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
                        >
                          <feature.icon aria-hidden="true" className="size-5" />
                        </motion.div>
                        {feature.name}
                      </dt>{' '}
                      <dd className="inline">{feature.description}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <img
              alt="Claude Code terminal interface"
              src="/ClaudeCode.png"
              className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
            />
          </div>
        </div>
      </section>

      {/* Sticky Stacking Container */}
      <div className="relative">
        {/* Problem with Alternatives Section */}
        <section className="sticky top-0 min-h-screen flex flex-col items-center justify-center relative isolate bg-white py-24 sm:py-32">
        {/* Background gradient blob */}
        <div aria-hidden="true" className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div 
            style={{
              clipPath: 'polygon(50% 0%, 55% 25%, 75% 7%, 65% 32%, 100% 25%, 70% 45%, 93% 57%, 62% 62%, 75% 93%, 50% 68%, 25% 93%, 38% 62%, 7% 57%, 30% 45%, 0% 25%, 35% 32%, 25% 7%, 45% 25%)'
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#F59E0B] to-[#EAB308] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-[#F59E0B]">The Problem with Alternatives</h2>
            <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-[#1F2937] sm:text-5xl lg:text-balance">
              Claude Code is powerful — but most tools can't handle it.
            </p>
            <p className="mt-6 text-lg leading-8 text-[#6B7280] max-w-3xl mx-auto">
              Claude Code is capable of building real, production-level apps with minimal human input. But unlocking that power takes serious setup: expert-level config files, server orchestration, and testing infrastructure.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
              {alternativesProblems.map((problem, index) => (
                <motion.div 
                  key={problem.name} 
                  className="relative pl-12 sm:pl-16 group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <dt className="text-base leading-7 font-semibold text-[#1F2937]">
                    <motion.div 
                      className="absolute top-0 left-0 flex size-8 sm:size-10 items-center justify-center"
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
                      <problem.icon />
                    </motion.div>
                    {problem.name}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-[#6B7280]">{problem.description}</dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
        </section>

        {/* Setup Challenge Section */}
        <section className="sticky top-0 min-h-screen flex flex-col items-center justify-center relative isolate bg-white py-24 sm:py-32">
          {/* Background gradient blob */}
          <div aria-hidden="true" className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
            <div 
              style={{
                clipPath: 'polygon(50% 0%, 55% 25%, 75% 7%, 65% 32%, 100% 25%, 70% 45%, 93% 57%, 62% 62%, 75% 93%, 50% 68%, 25% 93%, 38% 62%, 7% 57%, 30% 45%, 0% 25%, 35% 32%, 25% 7%, 45% 25%)'
              }}
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#D97706] to-[#F59E0B] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            />
          </div>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-4xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-[#EF4444]">The Setup Challenge</h2>
              <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-[#1F2937] sm:text-5xl lg:text-balance">
                Claude Code is the real deal — when it's set up right.
              </p>
              <p className="mt-6 text-lg leading-8 text-[#6B7280] max-w-3xl mx-auto">
                Most people never get past the configuration stage. Even experienced developers struggle to unlock its full potential.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
              <dl className="grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
                {setupChallenges.map((challenge, index) => (
                  <motion.div 
                    key={challenge.name} 
                    className="relative pl-12 sm:pl-16 group"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <dt className="text-base leading-7 font-semibold text-[#1F2937]">
                      <motion.div 
                        className="absolute top-0 left-0 flex size-8 sm:size-10 items-center justify-center"
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
                        <challenge.icon />
                      </motion.div>
                      {challenge.name}
                    </dt>
                    <dd className="mt-2 text-base leading-7 text-[#6B7280]">{challenge.description}</dd>
                  </motion.div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* How No Code Claude Solves This - Bento Grid */}
        <section className="sticky top-0 min-h-screen flex flex-col items-center justify-center relative isolate bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-center text-base/7 font-semibold text-[#D97706]">Get Claude Code's full power, properly configured</h2>
          <p className="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-[#1F2937] sm:text-5xl">
            How <ShineText>No Code Claude</ShineText> Solves This
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
                    Yes, there's a learning curve—but you get apps that actually work long-term. Other tools work for demos. <ShineText>No Code Claude</ShineText> builds apps you can actually use.
                  </p>
                </div>
                <div className="relative min-h-[30rem] w-full grow max-lg:mx-auto max-lg:max-w-sm flex items-center justify-center">
                  <motion.div 
                    className="cursor-pointer hover:scale-105 transition-transform duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      // Create modal overlay
                      const modal = document.createElement('div');
                      modal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50';
                      modal.onclick = () => document.body.removeChild(modal);
                      
                      const img = document.createElement('img');
                      img.src = '/no-code-claude-simple-ui.png';
                      img.className = 'max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl';
                      img.onclick = (e) => e.stopPropagation();
                      
                      modal.appendChild(img);
                      document.body.appendChild(modal);
                    }}
                  >
                    <img 
                      src="/no-code-claude-simple-ui.png" 
                      alt="No Code Claude Simple Interface"
                      className="w-full h-auto max-w-xs rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-200"
                    />
                  </motion.div>
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
                  <motion.div 
                    className="cursor-pointer hover:scale-105 transition-transform duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      // Create modal overlay
                      const modal = document.createElement('div');
                      modal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50';
                      modal.onclick = () => document.body.removeChild(modal);
                      
                      const img = document.createElement('img');
                      img.src = '/no-code-claude-professional-setup.png';
                      img.className = 'max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl';
                      img.onclick = (e) => e.stopPropagation();
                      
                      modal.appendChild(img);
                      document.body.appendChild(modal);
                    }}
                  >
                    <img 
                      src="/no-code-claude-professional-setup.png" 
                      alt="No Code Claude Professional Setup"
                      className="w-full max-w-xs rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-200"
                    />
                  </motion.div>
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
                  <motion.div 
                    className="cursor-pointer hover:scale-105 transition-transform duration-200 w-full"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      // Create modal overlay
                      const modal = document.createElement('div');
                      modal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50';
                      modal.onclick = () => document.body.removeChild(modal);
                      
                      const img = document.createElement('img');
                      img.src = '/ncc-same-ai-better-ui.png';
                      img.className = 'max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl';
                      img.onclick = (e) => e.stopPropagation();
                      
                      modal.appendChild(img);
                      document.body.appendChild(modal);
                    }}
                  >
                    <img 
                      src="/ncc-same-ai-better-ui.png" 
                      alt="No Code Claude Same AI Better Interface"
                      className="w-full rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-200"
                    />
                  </motion.div>
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
                  <div className="absolute top-10 right-0 bottom-0 left-10 overflow-hidden rounded-lg bg-white border-t border-l border-gray-200 p-2 shadow-2xl">
                    <div className="relative flex text-center">
                      <div className="flex pl-3.5 pt-3">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="-ml-0.5 mr-1.5 h-3 w-3 text-red-500/60">
                          <circle r="12" cy="12" cx="12"></circle>
                        </svg>
                        <svg viewBox="0 0 24 24" fill="currentColor" className="-ml-0.75 mr-1.5 h-3 w-3 text-yellow-500/60">
                          <circle r="12" cy="12" cx="12"></circle>
                        </svg>
                        <svg viewBox="0 0 24 24" fill="currentColor" className="-ml-0.75 mr-1.5 h-3 w-3 text-green-500/60">
                          <circle r="12" cy="12" cx="12"></circle>
                        </svg>
                      </div>
                      <span className="absolute inset-x-0 top-2 text-xs text-gray-600">claude.md</span>
                    </div>
                    <div className="mt-5 space-y-1.5 px-5 pb-10">
                      <p className="mt-4 font-mono text-xs font-normal tracking-wide text-gray-700">
                        <span className="text-gray-500">#</span> <span className="relative inline-block px-1 before:absolute before:-inset-0.5 before:block before:rounded before:bg-blue-100"><span className="relative text-blue-700">Expert Infrastructure</span></span>
                      </p>
                      <p className="ml-3 font-mono text-xs font-normal tracking-wide text-gray-700">
                        <span className="text-gray-500">-</span> <span className="relative inline-block px-1 before:absolute before:-inset-0.5 before:block before:rounded before:bg-blue-100"><span className="relative text-blue-700">Claude.md configuration</span></span> <span className="text-green-600">✓</span>
                      </p>
                      <p className="ml-3 font-mono text-xs font-normal leading-4 tracking-wide text-gray-700">
                        <span className="text-gray-500">-</span> <span className="relative inline-block px-1 before:absolute before:-inset-0.5 before:block before:rounded before:bg-blue-100"><span className="relative text-blue-700">MCP servers</span></span> <span className="text-green-600">✓</span>
                      </p>
                      <p className="ml-3 font-mono text-xs font-normal tracking-wide text-gray-700">
                        <span className="text-gray-500">-</span> <span className="relative inline-block px-1 before:absolute before:-inset-0.5 before:block before:rounded before:bg-blue-100"><span className="relative text-blue-700">Testing frameworks</span></span> <span className="text-green-600">✓</span>
                      </p>
                      <p className="ml-3 font-mono text-xs font-normal tracking-wide text-gray-700">
                        <span className="text-gray-500">-</span> <span className="relative inline-block px-1 before:absolute before:-inset-0.5 before:block before:rounded before:bg-blue-100"><span className="relative text-blue-700">Debugging workflows</span></span> <span className="text-green-600">✓</span>
                      </p>
                      <p className="ml-3 font-mono text-xs font-normal leading-4 tracking-wide text-gray-700">
                        <span className="text-gray-500">-</span> <span className="relative inline-block px-1 before:absolute before:-inset-0.5 before:block before:rounded before:bg-blue-100"><span className="relative text-blue-700">Production deployment</span></span> <span className="text-green-600">✓</span>
                      </p>
                      <p className="ml-3 font-mono text-xs font-normal tracking-wide text-gray-700">
                        <span className="text-gray-500">-</span> <span className="relative inline-block px-1 before:absolute before:-inset-0.5 before:block before:rounded before:bg-blue-100"><span className="relative text-blue-700">Security hardening</span></span> <span className="text-green-600">✓</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]" />
            </div>
          </div>
        </div>
        </section>
      </div>

      {/* How It Works */}
      <section id="how-it-works" className="relative isolate bg-white py-24 sm:py-32">
        {/* Background gradient blob */}
        <div aria-hidden="true" className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div 
            style={{
              clipPath: 'polygon(50% 0%, 55% 25%, 75% 7%, 65% 32%, 100% 25%, 70% 45%, 93% 57%, 62% 62%, 75% 93%, 50% 68%, 25% 93%, 38% 62%, 7% 57%, 30% 45%, 0% 25%, 35% 32%, 25% 7%, 45% 25%)'
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#D97706] to-[#F59E0B] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-[#D97706]">Simple Process</h2>
            <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-[#1F2937] sm:text-5xl lg:text-balance">
              How It Works
            </p>
            <p className="mt-6 text-lg leading-8 text-[#6B7280] max-w-3xl mx-auto">
              From idea to production-ready app in three simple steps
            </p>
          </div>
          
          {/* Horizontal Timeline */}
          <div className="mx-auto mt-16 max-w-6xl sm:mt-20 lg:mt-24">
            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
                {/* Step 1 */}
                <motion.div 
                  className="relative text-center group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div 
                    className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full shadow-lg group-hover:shadow-xl relative overflow-hidden"
                    style={{
                      backgroundImage: 'linear-gradient(30deg, #f12711, #f5af19)'
                    }}
                    animate={{ 
                      y: [-1, -3, -1],
                      scale: [1, 1.03, 1]
                    }}
                    transition={{ 
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0
                    }}
                    whileHover={{ 
                      scale: 1.1,
                      y: -5
                    }}
                  >
                    <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-full">
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-0.5 h-0.5 bg-white rounded-full opacity-60"
                          style={{
                            left: `${15 + (i * 9)}%`,
                            bottom: '8px'
                          }}
                          animate={{
                            y: [0, -40],
                            opacity: [0.6, 0]
                          }}
                          transition={{
                            duration: 2.0 + (i * 0.1),
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.3 + (i * 0.15)
                          }}
                        />
                      ))}
                    </div>
                    <span className="text-2xl font-bold text-white relative z-10">1</span>
                  </motion.div>
                  <h3 className="text-xl font-semibold text-[#1F2937] mb-3">
                    Describe your app
                  </h3>
                  <div className="bg-white p-4 rounded-lg italic text-[#1F2937] shadow-sm mb-4">
                    "<TypewriterText />"
                  </div>
                  <p className="text-sm text-[#6B7280]">
                    Tell our Claude Code interface what you want to build
                  </p>
                </motion.div>

                {/* Step 2 */}
                <motion.div 
                  className="relative text-center group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div 
                    className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full shadow-lg group-hover:shadow-xl relative overflow-hidden"
                    style={{
                      backgroundImage: 'linear-gradient(30deg, #f12711, #f5af19)'
                    }}
                    animate={{ 
                      y: [-1, -4, -1],
                      scale: [1, 1.04, 1]
                    }}
                    transition={{ 
                      duration: 3.0,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5
                    }}
                    whileHover={{ 
                      scale: 1.1,
                      y: -5
                    }}
                  >
                    <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-full">
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-0.5 h-0.5 bg-white rounded-full opacity-60"
                          style={{
                            left: `${15 + (i * 9)}%`,
                            bottom: '8px'
                          }}
                          animate={{
                            y: [0, -40],
                            opacity: [0.6, 0]
                          }}
                          transition={{
                            duration: 2.0 + (i * 0.1),
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.5 + (i * 0.15)
                          }}
                        />
                      ))}
                    </div>
                    <span className="text-2xl font-bold text-white relative z-10">2</span>
                  </motion.div>
                  <h3 className="text-xl font-semibold text-[#1F2937] mb-3">
                    Watch Claude Code build
                  </h3>
                  <p className="text-[#6B7280] mb-4">
                    Same powerful AI, supported by professional-grade configuration and testing
                  </p>
                </motion.div>

                {/* Step 3 */}
                <motion.div 
                  className="relative text-center group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div 
                    className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full shadow-lg group-hover:shadow-xl relative overflow-hidden"
                    style={{
                      backgroundImage: 'linear-gradient(30deg, #f12711, #f5af19)'
                    }}
                    animate={{ 
                      y: [-1, -3, -1],
                      scale: [1, 1.03, 1]
                    }}
                    transition={{ 
                      duration: 2.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1.0
                    }}
                    whileHover={{ 
                      scale: 1.1,
                      y: -5
                    }}
                  >
                    <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-full">
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-0.5 h-0.5 bg-white rounded-full opacity-60"
                          style={{
                            left: `${15 + (i * 9)}%`,
                            bottom: '8px'
                          }}
                          animate={{
                            y: [0, -40],
                            opacity: [0.6, 0]
                          }}
                          transition={{
                            duration: 2.0 + (i * 0.1),
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1.0 + (i * 0.15)
                          }}
                        />
                      ))}
                    </div>
                    <span className="text-2xl font-bold text-white relative z-10">3</span>
                  </motion.div>
                  <h3 className="text-xl font-semibold text-[#1F2937] mb-3">
                    Get production-ready apps
                  </h3>
                  <p className="text-[#6B7280] mb-4">
                    Fully functional applications that scale with your business needs
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You Can Build */}
      <section id="examples" className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="lg:max-w-lg">
                <p className="text-base/7 font-semibold text-[#D97706]">Real Examples</p>
                <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-[#1F2937] sm:text-5xl">
                  What You Can Build
                </h1>
                <p className="mt-6 text-lg leading-8 text-[#6B7280]">
                  Claude Code builds real, production-level apps — not just frontends.<br />
                  Think full system control, real databases, custom logic, and end-to-end testing. It's what professional developers use when they want working software, not workarounds.
                </p>
                <p className="mt-6 text-lg leading-8 text-[#6B7280]">
                  The problem? Claude Code requires terminal skills and setup knowledge most people don't have.
                </p>
                <p className="mt-6 text-lg leading-8 text-[#1F2937] font-semibold">
                  We solve that.
                </p>
                <p className="mt-6 text-lg leading-8 text-[#6B7280]">
                  You get Claude Code's full capabilities — without touching the terminal.
                </p>
                <h3 className="mt-8 text-xl font-semibold text-[#1F2937]">
                  What You Can Build
                </h3>
                <p className="mt-4 text-lg leading-8 text-[#6B7280]">
                  Just describe what you want:
                </p>
                <dl className="mt-6 max-w-xl space-y-4 text-base/7 text-[#6B7280] lg:max-w-none">
                  <div className="relative pl-9">
                    <dt className="inline font-semibold text-[#1F2937]">
                      <motion.div
                        className="absolute top-1 left-1 size-5"
                        animate={{ 
                          y: [-1, -4, -1],
                          rotate: [-3, -6, -3],
                          scale: [1, 1.05, 1]
                        }}
                        transition={{ 
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0
                        }}
                        style={{
                          background: 'linear-gradient(45deg, #f12711, #f5af19)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          fontSize: '20px',
                          fontWeight: 'bold'
                        }}
                      >
                        *
                      </motion.div>
                    </dt>{' '}
                    <dd className="inline">Create a website for my bakery</dd>
                  </div>
                  <div className="relative pl-9">
                    <dt className="inline font-semibold text-[#1F2937]">
                      <motion.div
                        className="absolute top-1 left-1 size-5"
                        animate={{ 
                          y: [-1, -4, -1],
                          rotate: [0, 0, 0],
                          scale: [1, 1.05, 1]
                        }}
                        transition={{ 
                          duration: 3.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0.8
                        }}
                        style={{
                          background: 'linear-gradient(45deg, #f12711, #f5af19)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          fontSize: '20px',
                          fontWeight: 'bold'
                        }}
                      >
                        *
                      </motion.div>
                    </dt>{' '}
                    <dd className="inline">Help me organize my photos by date</dd>
                  </div>
                  <div className="relative pl-9">
                    <dt className="inline font-semibold text-[#1F2937]">
                      <motion.div
                        className="absolute top-1 left-1 size-5"
                        animate={{ 
                          y: [-1, -4, -1],
                          rotate: [3, 6, 3],
                          scale: [1, 1.05, 1]
                        }}
                        transition={{ 
                          duration: 3.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 1.6
                        }}
                        style={{
                          background: 'linear-gradient(45deg, #f12711, #f5af19)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          fontSize: '20px',
                          fontWeight: 'bold'
                        }}
                      >
                        *
                      </motion.div>
                    </dt>{' '}
                    <dd className="inline">Build a simple game for my kids</dd>
                  </div>
                  <div className="relative pl-9">
                    <dt className="inline font-semibold text-[#1F2937]">
                      <motion.div
                        className="absolute top-1 left-1 size-5"
                        animate={{ 
                          y: [-1, -4, -1],
                          rotate: [-3, -6, -3],
                          scale: [1, 1.05, 1]
                        }}
                        transition={{ 
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 2.4
                        }}
                        style={{
                          background: 'linear-gradient(45deg, #f12711, #f5af19)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          fontSize: '20px',
                          fontWeight: 'bold'
                        }}
                      >
                        *
                      </motion.div>
                    </dt>{' '}
                    <dd className="inline">Make a todo list app</dd>
                  </div>
                  <div className="relative pl-9">
                    <dt className="inline font-semibold text-[#1F2937]">
                      <motion.div
                        className="absolute top-1 left-1 size-5"
                        animate={{ 
                          y: [-1, -4, -1],
                          rotate: [0, 0, 0],
                          scale: [1, 1.05, 1]
                        }}
                        transition={{ 
                          duration: 3.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 3.2
                        }}
                        style={{
                          background: 'linear-gradient(45deg, #f12711, #f5af19)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          fontSize: '20px',
                          fontWeight: 'bold'
                        }}
                      >
                        *
                      </motion.div>
                    </dt>{' '}
                    <dd className="inline">Create a budget tracker</dd>
                  </div>
                  <div className="relative pl-9">
                    <dt className="inline font-semibold text-[#1F2937]">
                      <motion.div
                        className="absolute top-1 left-1 size-5"
                        animate={{ 
                          y: [-1, -4, -1],
                          rotate: [3, 6, 3],
                          scale: [1, 1.05, 1]
                        }}
                        transition={{ 
                          duration: 3.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 4.0
                        }}
                        style={{
                          background: 'linear-gradient(45deg, #f12711, #f5af19)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          fontSize: '20px',
                          fontWeight: 'bold'
                        }}
                      >
                        *
                      </motion.div>
                    </dt>{' '}
                    <dd className="inline">Build a recipe organizer</dd>
                  </div>
                </dl>
                <p className="mt-8 text-lg leading-8 text-[#1F2937] font-semibold">
                  No templates. No simplified builders. Just real software.
                </p>
                <h3 className="mt-8 text-xl font-semibold text-[#1F2937]">
                  What It's Really Capable Of
                </h3>
                <p className="mt-4 text-lg leading-8 text-[#6B7280]">
                  Unlike other tools, you're not limited to toy apps. Claude Code (with the right setup) can build:
                </p>
                <dl className="mt-6 max-w-xl space-y-4 text-base/7 text-[#6B7280] lg:max-w-none">
                  <div className="relative pl-9">
                    <dt className="inline font-semibold text-[#1F2937]">
                      <motion.div
                        className="absolute top-1 left-1 size-5 text-[#D97706]"
                        animate={{ 
                          y: [-1, -4, -1],
                          rotate: [-3, -6, -3],
                          scale: [1, 1.05, 1]
                        }}
                        transition={{ 
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0
                        }}
                      >
                        <BuildingOffice2Icon aria-hidden="true" className="size-5" style={{
                          background: 'linear-gradient(45deg, #f12711, #f5af19)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          color: '#f12711'
                        }} />
                      </motion.div>
                    </dt>{' '}
                    <dd className="inline">Multi-tenant SaaS platforms</dd>
                  </div>
                  <div className="relative pl-9">
                    <dt className="inline font-semibold text-[#1F2937]">
                      <motion.div
                        className="absolute top-1 left-1 size-5 text-[#D97706]"
                        animate={{ 
                          y: [-1, -4, -1],
                          rotate: [0, 0, 0],
                          scale: [1, 1.05, 1]
                        }}
                        transition={{ 
                          duration: 3.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0.8
                        }}
                      >
                        <ShoppingCartIcon aria-hidden="true" className="size-5" style={{
                          background: 'linear-gradient(45deg, #f12711, #f5af19)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          color: '#f12711'
                        }} />
                      </motion.div>
                    </dt>{' '}
                    <dd className="inline">E-commerce flows with custom logic</dd>
                  </div>
                  <div className="relative pl-9">
                    <dt className="inline font-semibold text-[#1F2937]">
                      <motion.div
                        className="absolute top-1 left-1 size-5 text-[#D97706]"
                        animate={{ 
                          y: [-1, -4, -1],
                          rotate: [3, 6, 3],
                          scale: [1, 1.05, 1]
                        }}
                        transition={{ 
                          duration: 3.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 1.6
                        }}
                      >
                        <UserGroupIcon aria-hidden="true" className="size-5" style={{
                          background: 'linear-gradient(45deg, #f12711, #f5af19)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          color: '#f12711'
                        }} />
                      </motion.div>
                    </dt>{' '}
                    <dd className="inline">Team tools with real-time sync</dd>
                  </div>
                  <div className="relative pl-9">
                    <dt className="inline font-semibold text-[#1F2937]">
                      <motion.div
                        className="absolute top-1 left-1 size-5 text-[#D97706]"
                        animate={{ 
                          y: [-1, -4, -1],
                          rotate: [-3, -6, -3],
                          scale: [1, 1.05, 1]
                        }}
                        transition={{ 
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 2.4
                        }}
                      >
                        <ChartBarIcon aria-hidden="true" className="size-5" style={{
                          background: 'linear-gradient(45deg, #f12711, #f5af19)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          color: '#f12711'
                        }} />
                      </motion.div>
                    </dt>{' '}
                    <dd className="inline">Dashboards pulling from multiple APIs</dd>
                  </div>
                </dl>
                <p className="mt-8 text-lg leading-8 text-[#1F2937] font-semibold">
                  Apps that work like a developer built them — because the same AI that builds them did.
                </p>
              </div>
            </div>
          </div>
          <div className="-mt-12 -ml-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
            <div className="w-full max-w-none rounded-xl shadow-2xl overflow-hidden">
              <video 
                className="w-full h-full object-cover"
                autoPlay 
                muted 
                loop
                poster="/video-poster.jpg"
              >
                <source src="/demo-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="max-w-xl text-base/7 text-[#6B7280] lg:max-w-lg">
                <h2 className="mt-8 text-2xl font-bold tracking-tight text-[#1F2937]">Ready for Claude Code that's properly configured?</h2>
                <div className="mt-6 relative inline-block">
                  {isSignedUp && (showShareButton || isFooterVisible) && (
                    <div className={`signup-tooltip ${showTooltip ? 'show' : ''}`}>
                      <div className="flex items-center">
                        <span className="heart-icon">❤️</span>
                        <span className="heart-text">You're all set!</span>
                      </div>
                    </div>
                  )}
                  <AnimatedButton 
                    isShareMode={showShareButton} 
                    showSuccess={isSignedUp && !showShareButton}
                    onSignup={() => setIsSignedUp(true)}
                    isExpanding={isExpanding}
                    forceBounce={footerButtonBounce}
                  >
                    {showShareButton ? 'Share with friends' : isSignedUp ? "You're all set!" : 'Get early access'}
                  </AnimatedButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer-section" className="bg-white">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0">
              <a href="#" className="flex items-center">
                <span className="self-center text-2xl font-semibold whitespace-nowrap text-[#1F2937]"><ShineText>No Code Claude</ShineText></span>
              </a>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                <h2 className="mb-6 text-sm font-semibold text-[#1F2937] uppercase">Product</h2>
                <ul className="text-[#6B7280] font-medium">
                  <li className="mb-4">
                    <a href="#features" className="hover:underline">Features</a>
                  </li>
                  <li>
                    <a href="#how-it-works" className="hover:underline">How it works</a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold text-[#1F2937] uppercase">Support</h2>
                <ul className="text-[#6B7280] font-medium">
                  <li className="mb-4">
                    <a href="#" className="hover:underline">Documentation</a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">Help Center</a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold text-[#1F2937] uppercase">Legal</h2>
                <ul className="text-[#6B7280] font-medium">
                  <li className="mb-4">
                    <a href="#" className="hover:underline">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">Terms & Conditions</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <ShineLine className="sm:mx-auto lg:my-8" />
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-[#6B7280] sm:text-center">© 2025 <a href="#" className="hover:underline">No Code Claude</a>. All Rights Reserved.</span>
            <div className="flex mt-4 sm:justify-center sm:mt-0">
              <a href="#" className="text-[#6B7280] hover:text-[#1F2937]">
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 17">
                  <path fillRule="evenodd" d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z" clipRule="evenodd"/>
                </svg>
                <span className="sr-only">Twitter page</span>
              </a>
              <a href="#" className="text-[#6B7280] hover:text-[#1F2937] ms-5">
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clipRule="evenodd"/>
                </svg>
                <span className="sr-only">GitHub account</span>
              </a>
              <a href="#" className="text-[#6B7280] hover:text-[#1F2937] ms-5">
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 21 16">
                  <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z"/>
                </svg>
                <span className="sr-only">Discord community</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
