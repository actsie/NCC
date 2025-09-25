import React, { useState, useRef } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { CommandLineIcon, BuildingOffice2Icon, RocketLaunchIcon, CloudArrowUpIcon, LockClosedIcon, ServerIcon, ShoppingCartIcon, UserGroupIcon, ChartBarIcon, GiftIcon, SparklesIcon, ArchiveBoxIcon, BookOpenIcon, PhotoIcon, LightBulbIcon, ComputerDesktopIcon, WrenchScrewdriverIcon, BoltIcon } from '@heroicons/react/20/solid';
import { ExclamationTriangleIcon, XMarkIcon as XMarkSolidIcon, CogIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import EnhancedButton from './EnhancedButton';
import ChatInterface from './ChatInterface';
import DarkModeToggle from './DarkModeToggle';
import BlogPostClaudeNoCode from './BlogPostClaudeNoCode';
import BlogPostJobTracking from './components/BlogPostJobTracking';
import BlogPostTravelPacking from './components/BlogPostTravelPacking';
import BlogIndex from './BlogIndex';
import ExamplesIndex from './ExamplesIndex';
import Header from './components/Header';
import Footer from './components/Footer';
import EarlyAccessModal from './components/EarlyAccessModal';
import ProblemSolutionTabs from './components/ProblemSolutionTabs';

const TYPEWRITER_TEXTS = [
  'Create a website for my bakery',
  'Help me organize my photos by date',
  'Build a simple game for my kids',
  'Make a todo list app',
  'Create a budget tracker',
  'Build a recipe organizer',
];

// Typewriter effect component
const TypewriterText = () => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  React.useEffect(() => {
    const currentFullText = TYPEWRITER_TEXTS[currentIndex];

    if (!currentFullText) {
      return undefined;
    }

    if (isDeleting) {
      const timeoutId = setTimeout(() => {
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentIndex((prevIndex) => (prevIndex + 1) % TYPEWRITER_TEXTS.length);
        } else {
          setCurrentText(currentFullText.substring(0, currentText.length - 1));
        }
      }, 50);

      return () => clearTimeout(timeoutId);
    }

    if (currentText === currentFullText) {
      const pauseId = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(pauseId);
    }

    const timeoutId = setTimeout(() => {
      setCurrentText(currentFullText.substring(0, currentText.length + 1));
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [currentText, currentIndex, isDeleting]);

  return (
    <span>
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
};



const claudeFeatures = [
  {
    name: 'Full system control.',
    description: 'Reads/writes files, installs tools, creates databases, runs apps locally',
    icon: CommandLineIcon,
  },
  {
    name: 'Claude Code is built by Anthropic.',
    description: 'Who makes Claude—not a third-party tool paying for API access',
    icon: BuildingOffice2Icon,
  },
  {
    name: 'End-to-end capability.',
    description: 'From idea to deployed app without developer intervention',
    icon: RocketLaunchIcon,
  }
];

const App = () => {
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [isEarlyAccessModalOpen, setIsEarlyAccessModalOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [showShareButton, setShowShareButton] = useState(false);
  const [isExpanding, setIsExpanding] = useState(false);
  const [footerButtonBounce, setFooterButtonBounce] = useState(false);
  const chatInterfaceRef = useRef(null);

  // Function to navigate to chat interface with wiggle
  const navigateToChatInterface = () => {
    if (chatInterfaceRef.current) {
      chatInterfaceRef.current.scrollToAndWiggle();
    }
  };

  // Ensure page loads at the top on mobile
  React.useEffect(() => {
    // Force scroll to top on component mount
    window.scrollTo(0, 0);

    // Prevent browser scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Check if we need to trigger chat interface navigation
    if (sessionStorage.getItem('triggerChatInterface') === 'true') {
      sessionStorage.removeItem('triggerChatInterface');
      // Delay to ensure page is fully loaded
      setTimeout(() => {
        if (chatInterfaceRef.current) {
          chatInterfaceRef.current.scrollToAndWiggle();
        }
      }, 1000);
    }
  }, []);

  // Handle hash scroll navigation for cross-page links
  React.useEffect(() => {
    const scrollToHash = (hash) => {
      if (hash) {
        // Run after DOM is painted
        setTimeout(() => {
          const id = hash.replace("#", "");
          const element = document.getElementById(id);
          if (element) {
            // Account for header height (adjust as needed)
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth"
            });
          }
        }, 100);
      }
    };

    // Handle hash on initial load
    if (window.location.hash) {
      scrollToHash(window.location.hash);
    }

    // Handle hash changes (for same-page navigation)
    const handleHashChange = () => {
      scrollToHash(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

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

  // Simple routing logic
  const currentPath = window.location.pathname;
  console.log('Current path:', currentPath);
  
  // If it's the blog index route, render the blog index
  if (currentPath === '/blog') {
    return <BlogIndex />;
  }
  
  // If it's the blog post route, render the blog component
  if (currentPath === '/blog/build-custom-ai-workflows-without-code') {
    return <BlogPostClaudeNoCode />;
  }
  
  if (currentPath === '/blog/how-job-seekers-track-applications') {
    return <BlogPostJobTracking />;
  }

  if (currentPath === '/blog/how-travelers-really-pack') {
    return <BlogPostTravelPacking />;
  }
  
  // If it's the examples route, render the examples index
  if (currentPath === '/examples' || currentPath === '/examples/') {
    return <ExamplesIndex navigateToChatInterface={navigateToChatInterface} />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
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
      <Header />

      {/* Hero Section */}
      <div className="relative isolate px-6 pt-20 lg:px-8">
        {/* Background gradient blobs */}
        <div aria-hidden="true" className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div 
            style={{
              clipPath: 'polygon(50% 0%, 55% 25%, 75% 7%, 65% 32%, 100% 25%, 70% 45%, 93% 57%, 62% 62%, 75% 93%, 50% 68%, 25% 93%, 38% 62%, 7% 57%, 30% 45%, 0% 25%, 35% 32%, 25% 7%, 45% 25%)'
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#7866CC] to-[#AF97F8] dark:from-[#362B6B] dark:to-[#5E50A0] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
        
        <section className="mx-auto max-w-2xl py-16 sm:py-20 lg:py-24">
          {/* Announcement Banner */}
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="hero-announcement relative rounded-full px-3 py-1 text-sm leading-6 text-[#6B7280] dark:text-gray-300">
              <div className="hero-announcement-content">
                Claude Code infrastructure, no complexity. <a href="#community" className="font-semibold text-[#7866CC]"><span aria-hidden="true" className="absolute inset-0"></span>Join a builder community <span aria-hidden="true">→</span></a>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <h1 className="text-5xl font-semibold tracking-tight text-balance text-[#1F2937] dark:text-white sm:text-7xl">
              Unlock the power of Claude Code
            </h1>
            <p className="mt-4 text-2xl font-medium text-[#7866CC] dark:text-purple-300 sm:text-3xl">
              For everyone, not just developers
            </p>
            <p className="mt-8 text-lg font-medium text-pretty text-[#6B7280] dark:text-gray-300 sm:text-xl/8">
              <img 
                src="/pawgrammer-logo-purple.svg" 
                alt="Pawgrammer" 
                className="h-7 sm:h-8 inline"
                style={{transform: 'translateY(-0.25rem)'}}
              /> makes Claude Code simple. Non-technical users get pro-grade setup — the kind even developers find painful to do on their own.
            </p>

            {/* Chat Interface */}
            <div className="mt-16 mb-8">
              <ChatInterface ref={chatInterfaceRef} />
            </div>

            <p className="mt-6 text-xs text-[#6B7280] dark:text-gray-400 text-center">
              ✨ Build your personal app for free, no Claude account or API keys required. First month's on us<br/>(limited tester spots - Mac-only for now).
            </p>
          </div>
        </section>
        
        {/* Bottom gradient blob */}
        <div aria-hidden="true" className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
          <div 
            style={{
              clipPath: 'polygon(50% 0%, 55% 25%, 75% 7%, 65% 32%, 100% 25%, 70% 45%, 93% 57%, 62% 62%, 75% 93%, 50% 68%, 25% 93%, 38% 62%, 7% 57%, 30% 45%, 0% 25%, 35% 32%, 25% 7%, 45% 25%)'
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#7866CC] to-[#AF97F8] dark:from-[#362B6B] dark:to-[#5E50A0] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>

      {/* Why Claude Code Matters */}
      <section id="features" className="overflow-hidden bg-white dark:bg-gray-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:pt-4 lg:pr-8">
              <div className="lg:max-w-lg">
                <h2 className="text-base font-semibold leading-7 text-[#7866CC] dark:text-[#AF97F8]">Why Claude Code matters</h2>
                <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-[#1F2937] dark:text-white sm:text-5xl">
                  Real developer tools accessible to everyone
                </p>
                <p className="mt-6 text-lg leading-8 text-[#6B7280] dark:text-gray-300">
                  Professional developers trust Claude Code because it's uniquely powerful—offering capabilities that other tools simply can't match.
                </p>
                <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-[#6B7280] dark:text-gray-300 lg:max-w-none">
                  {claudeFeatures.map((feature, index) => (
                    <div key={feature.name} className="relative pl-9">
                      <dt className="inline font-semibold text-[#1F2937] dark:text-white">
                        <motion.div
                          className="absolute top-1 left-1 size-5 text-[#7866CC]"
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
              alt="Pawgrammer interface"
              src="/step1.gif"
              className="w-full max-w-full sm:w-[57rem] sm:max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 md:-ml-4 lg:-ml-0"
            />
          </div>
        </div>
      </section>

      {/* Tab-based Problem & Solution Section */}
      <ProblemSolutionTabs />

      {/* How It Works - Expandable Cards */}
      <section id="how-it-works" className="relative bg-gradient-to-br from-white/60 via-gray-50/80 to-white/40 dark:from-gray-900/60 dark:via-gray-800/80 dark:to-gray-900/40 backdrop-blur-xl backdrop-saturate-150 py-24 sm:py-32">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

          .step-gallery * {
            font-family: 'Poppins', sans-serif;
          }

          .glass-card {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
          }

          .step-container .step-gallery .step-container-1:hover ~ .step-descriptions .step-description-1,
          .step-container .step-gallery .step-container-2:hover ~ .step-descriptions .step-description-2,
          .step-container .step-gallery .step-container-3:hover ~ .step-descriptions .step-description-3,
          .step-container .step-gallery .step-container-4:hover ~ .step-descriptions .step-description-4,
          .step-container .step-gallery .step-container-5:hover ~ .step-descriptions .step-description-5,
          .step-container:has(.step-container-1:hover) .step-description-1,
          .step-container:has(.step-container-2:hover) .step-description-2,
          .step-container:has(.step-container-3:hover) .step-description-3,
          .step-container:has(.step-container-4:hover) .step-description-4,
          .step-container:has(.step-container-5:hover) .step-description-5 {
            transform: scale(1.02);
            background: rgba(120, 102, 204, 0.05);
            border-color: rgba(120, 102, 204, 0.2);
            box-shadow: 0 4px 12px rgba(120, 102, 204, 0.1);
          }

          .step-description {
            transition: all 0.5s ease;
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
          }

          .dark .step-description {
            background: rgba(31, 41, 55, 0.8);
            border-color: rgba(75, 85, 99, 0.3);
          }

          .dark .step-container:has(.step-container-1:hover) .step-description-1,
          .dark .step-container:has(.step-container-2:hover) .step-description-2,
          .dark .step-container:has(.step-container-3:hover) .step-description-3,
          .dark .step-container:has(.step-container-4:hover) .step-description-4,
          .dark .step-container:has(.step-container-5:hover) .step-description-5 {
            background: rgba(120, 102, 204, 0.1);
            border-color: rgba(120, 102, 204, 0.25);
          }

          /* Bidirectional: Card hover expands corresponding image */
          .step-container:has(.step-description-1:hover) .step-container-1,
          .step-container:has(.step-description-2:hover) .step-container-2,
          .step-container:has(.step-description-3:hover) .step-container-3,
          .step-container:has(.step-description-4:hover) .step-container-4,
          .step-container:has(.step-description-5:hover) .step-container-5 {
            width: 120%;
            z-index: 10;
          }

          /* Reset Step 1 when other steps are hovered */
          .step-container:has(.step-container-2:hover) .step-container-1,
          .step-container:has(.step-container-3:hover) .step-container-1,
          .step-container:has(.step-container-4:hover) .step-container-1,
          .step-container:has(.step-container-5:hover) .step-container-1,
          .step-container:has(.step-description-2:hover) .step-container-1,
          .step-container:has(.step-description-3:hover) .step-container-1,
          .step-container:has(.step-description-4:hover) .step-container-1,
          .step-container:has(.step-description-5:hover) .step-container-1 {
            width: 14rem;
            z-index: 1;
          }

          /* Card hover self-highlighting */
          .step-description-1:hover,
          .step-description-2:hover,
          .step-description-3:hover,
          .step-description-4:hover,
          .step-description-5:hover {
            transform: scale(1.02);
            background: rgba(120, 102, 204, 0.05);
            border-color: rgba(120, 102, 204, 0.2);
            box-shadow: 0 4px 12px rgba(120, 102, 204, 0.1);
          }

          .dark .step-description-1:hover,
          .dark .step-description-2:hover,
          .dark .step-description-3:hover,
          .dark .step-description-4:hover,
          .dark .step-description-5:hover {
            background: rgba(120, 102, 204, 0.1);
            border-color: rgba(120, 102, 204, 0.25);
          }

          /* Reset Step 1 card when other cards/images are hovered */
          .step-container:has(.step-container-2:hover) .step-description-1,
          .step-container:has(.step-container-3:hover) .step-description-1,
          .step-container:has(.step-container-4:hover) .step-description-1,
          .step-container:has(.step-container-5:hover) .step-description-1,
          .step-container:has(.step-description-2:hover) .step-description-1,
          .step-container:has(.step-description-3:hover) .step-description-1,
          .step-container:has(.step-description-4:hover) .step-description-1,
          .step-container:has(.step-description-5:hover) .step-description-1 {
            transform: scale(1) !important;
            background: rgba(255, 255, 255, 0.8) !important;
            border-color: rgba(255, 255, 255, 0.2) !important;
            box-shadow: none !important;
          }

          .dark .step-container:has(.step-container-2:hover) .step-description-1,
          .dark .step-container:has(.step-container-3:hover) .step-description-1,
          .dark .step-container:has(.step-container-4:hover) .step-description-1,
          .dark .step-container:has(.step-container-5:hover) .step-description-1,
          .dark .step-container:has(.step-description-2:hover) .step-description-1,
          .dark .step-container:has(.step-description-3:hover) .step-description-1,
          .dark .step-container:has(.step-description-4:hover) .step-description-1,
          .dark .step-container:has(.step-description-5:hover) .step-description-1 {
            background: rgba(31, 41, 55, 0.8) !important;
            border-color: rgba(75, 85, 99, 0.3) !important;
          }
        `}</style>

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-[#7866CC] dark:text-purple-300">Simple Process</h2>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-[#1F2937] dark:text-white sm:text-5xl lg:text-balance">
              How It Works
            </h1>
            <p className="mt-6 text-lg leading-8 text-[#6B7280] dark:text-gray-300 max-w-3xl mx-auto">
              See your ideas turn into working apps in real time.
            </p>
          </div>

          {/* Steps Container */}
          <div className="step-container w-full max-w-4xl mt-10 mx-auto">

            {/* Mobile: Vertical Stack Layout */}
            <div className="block md:hidden">
              <div className="flex flex-col gap-6">
                {/* Mobile Step 1 */}
                <div className="mobile-step-card w-full border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-lg">
                  <div className="aspect-[16/10] w-full">
                    <img
                      className="h-full w-full object-cover object-center"
                      src="/step1.png"
                      alt="Step 1 - Describe your app"
                    />
                  </div>
                  <div className="p-4">
                    <div className="text-sm font-medium text-[#7866CC] dark:text-purple-300 mb-2">Step 1</div>
                    <h4 className="font-semibold text-[#1F2937] dark:text-white mb-2">Describe your app idea</h4>
                    <p className="text-sm text-[#6B7280] dark:text-gray-300">Write what you want in plain language — no code needed.</p>
                  </div>
                </div>

                {/* Mobile Step 2 */}
                <div className="mobile-step-card w-full border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-lg">
                  <div className="aspect-[16/10] w-full">
                    <img
                      className="h-full w-full object-cover object-center"
                      src="/step2.png"
                      alt="Step 2 - Review AI changes"
                    />
                  </div>
                  <div className="p-4">
                    <div className="text-sm font-medium text-[#7866CC] dark:text-purple-300 mb-2">Step 2</div>
                    <h4 className="font-semibold text-[#1F2937] dark:text-white mb-2">Answer a few quick questions</h4>
                    <p className="text-sm text-[#6B7280] dark:text-gray-300">Pick from multiple-choice or checkboxes to refine details.</p>
                  </div>
                </div>

                {/* Mobile Step 3 */}
                <div className="mobile-step-card w-full border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-lg">
                  <div className="aspect-[16/10] w-full">
                    <img
                      className="h-full w-full object-cover object-center"
                      src="/step3.png"
                      alt="Step 3 - Tweak and customize"
                    />
                  </div>
                  <div className="p-4">
                    <div className="text-sm font-medium text-[#7866CC] dark:text-purple-300 mb-2">Step 3</div>
                    <h4 className="font-semibold text-[#1F2937] dark:text-white mb-2">Review your generated spec</h4>
                    <p className="text-sm text-[#6B7280] dark:text-gray-300">See the step-by-step plan before anything gets built.</p>
                  </div>
                </div>

                {/* Mobile Step 4 */}
                <div className="mobile-step-card w-full border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-lg">
                  <div className="aspect-[16/10] w-full">
                    <img
                      className="h-full w-full object-cover object-center"
                      src="/step4.png"
                      alt="Step 4 - Deploy and share"
                    />
                  </div>
                  <div className="p-4">
                    <div className="text-sm font-medium text-[#7866CC] dark:text-purple-300 mb-2">Step 4</div>
                    <h4 className="font-semibold text-[#1F2937] dark:text-white mb-2">Execute build tasks</h4>
                    <p className="text-sm text-[#6B7280] dark:text-gray-300">Each click executes a task — watch your app take shape.</p>
                  </div>
                </div>

                {/* Mobile Step 5 */}
                <div className="mobile-step-card w-full border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-lg">
                  <div className="aspect-[16/10] w-full">
                    <img
                      className="h-full w-full object-cover object-center"
                      src="/step5.png"
                      alt="Step 5 - Monitor and scale"
                    />
                  </div>
                  <div className="p-4">
                    <div className="text-sm font-medium text-[#7866CC] dark:text-purple-300 mb-2">Step 5</div>
                    <h4 className="font-semibold text-[#1F2937] dark:text-white mb-2">Chat with AI to tweak or improve</h4>
                    <p className="text-sm text-[#6B7280] dark:text-gray-300">Ask for changes in simple language, get instant updates.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tablet: 2-Column Grid Layout */}
            <div className="hidden md:block lg:hidden">
              <div className="grid grid-cols-2 gap-6">
                {/* Tablet Step 1 */}
                <div className="tablet-step-card border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-lg">
                  <div className="aspect-[16/10] w-full">
                    <img
                      className="h-full w-full object-cover object-center"
                      src="/step1.png"
                      alt="Step 1 - Describe your app"
                    />
                  </div>
                  <div className="p-4">
                    <div className="text-sm font-medium text-[#7866CC] dark:text-purple-300 mb-2">Step 1</div>
                    <h4 className="font-semibold text-[#1F2937] dark:text-white mb-2">Describe your app idea</h4>
                    <p className="text-sm text-[#6B7280] dark:text-gray-300">Write what you want in plain language — no code needed.</p>
                  </div>
                </div>

                {/* Tablet Step 2 */}
                <div className="tablet-step-card border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-lg">
                  <div className="aspect-[16/10] w-full">
                    <img
                      className="h-full w-full object-cover object-center"
                      src="/step2.png"
                      alt="Step 2 - Review AI changes"
                    />
                  </div>
                  <div className="p-4">
                    <div className="text-sm font-medium text-[#7866CC] dark:text-purple-300 mb-2">Step 2</div>
                    <h4 className="font-semibold text-[#1F2937] dark:text-white mb-2">Answer a few quick questions</h4>
                    <p className="text-sm text-[#6B7280] dark:text-gray-300">Pick from multiple-choice or checkboxes to refine details.</p>
                  </div>
                </div>

                {/* Tablet Step 3 */}
                <div className="tablet-step-card border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-lg">
                  <div className="aspect-[16/10] w-full">
                    <img
                      className="h-full w-full object-cover object-center"
                      src="/step3.png"
                      alt="Step 3 - Tweak and customize"
                    />
                  </div>
                  <div className="p-4">
                    <div className="text-sm font-medium text-[#7866CC] dark:text-purple-300 mb-2">Step 3</div>
                    <h4 className="font-semibold text-[#1F2937] dark:text-white mb-2">Review your generated spec</h4>
                    <p className="text-sm text-[#6B7280] dark:text-gray-300">See the step-by-step plan before anything gets built.</p>
                  </div>
                </div>

                {/* Tablet Step 4 */}
                <div className="tablet-step-card border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-lg">
                  <div className="aspect-[16/10] w-full">
                    <img
                      className="h-full w-full object-cover object-center"
                      src="/step4.png"
                      alt="Step 4 - Deploy and share"
                    />
                  </div>
                  <div className="p-4">
                    <div className="text-sm font-medium text-[#7866CC] dark:text-purple-300 mb-2">Step 4</div>
                    <h4 className="font-semibold text-[#1F2937] dark:text-white mb-2">Execute build tasks</h4>
                    <p className="text-sm text-[#6B7280] dark:text-gray-300">Each click executes a task — watch your app take shape.</p>
                  </div>
                </div>

                {/* Tablet Step 5 - Centered */}
                <div className="tablet-step-card border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-lg col-span-2 max-w-md mx-auto">
                  <div className="aspect-[16/10] w-full">
                    <img
                      className="h-full w-full object-cover object-center"
                      src="/step5.png"
                      alt="Step 5 - Monitor and scale"
                    />
                  </div>
                  <div className="p-4">
                    <div className="text-sm font-medium text-[#7866CC] dark:text-purple-300 mb-2">Step 5</div>
                    <h4 className="font-semibold text-[#1F2937] dark:text-white mb-2">Chat with AI to tweak or improve</h4>
                    <p className="text-sm text-[#6B7280] dark:text-gray-300">Ask for changes in simple language, get instant updates.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop: Original Horizontal Gallery */}
            <div className="hidden lg:block">
              {/* Expandable Cards */}
              <div className="step-gallery flex items-center gap-2 h-[400px]">
                {/* Step 1 */}
                <div className="step-container-1 relative group flex-grow transition-all w-[120%] rounded-lg overflow-visible h-[400px] duration-500 hover:w-[120%] z-10">
                  <img
                    className="h-full w-full object-cover object-center rounded-lg"
                    src="/step1.png"
                    alt="Step 1 - Describe your app"
                  />
                </div>

                {/* Step 2 */}
                <div className="step-container-2 relative group flex-grow transition-all w-56 rounded-lg overflow-visible h-[400px] duration-500 hover:w-[120%] hover:z-10">
                  <img
                    className="h-full w-full object-cover object-center rounded-lg"
                    src="/step2.png"
                    alt="Step 2 - Review AI changes"
                  />
                </div>

                {/* Step 3 */}
                <div className="step-container-3 relative group flex-grow transition-all w-56 rounded-lg overflow-visible h-[400px] duration-500 hover:w-[120%] hover:z-10">
                  <img
                    className="h-full w-full object-cover object-center rounded-lg"
                    src="/step3.png"
                    alt="Step 3 - Tweak and customize"
                  />
                </div>

                {/* Step 4 */}
                <div className="step-container-4 relative group flex-grow transition-all w-56 rounded-lg overflow-visible h-[400px] duration-500 hover:w-[120%] hover:z-10">
                  <img
                    className="h-full w-full object-cover object-center rounded-lg"
                    src="/step4.png"
                    alt="Step 4 - Deploy and share"
                  />
                </div>

                {/* Step 5 */}
                <div className="step-container-5 relative group flex-grow transition-all w-56 rounded-lg overflow-visible h-[400px] duration-500 hover:w-[120%] hover:z-10">
                  <img
                    className="h-full w-full object-cover object-center rounded-lg"
                    src="/step5.png"
                    alt="Step 5 - Monitor and scale"
                  />
                </div>
              </div>

              {/* Step Description Cards */}
              <div className="step-descriptions grid grid-cols-1 md:grid-cols-5 gap-4 mt-8">
                {/* Description 1 */}
                <div className="step-description-1 step-description rounded-lg p-4 border transform scale-[1.02]" style={{background: 'rgba(120, 102, 204, 0.05)', borderColor: 'rgba(120, 102, 204, 0.2)', boxShadow: '0 4px 12px rgba(120, 102, 204, 0.1)'}}>
                  <div className="text-sm font-medium text-[#7866CC] dark:text-purple-300 mb-2">Step 1</div>
                  <h4 className="font-semibold text-[#1F2937] dark:text-white mb-2">Describe your app idea</h4>
                  <p className="text-sm text-[#6B7280] dark:text-gray-300">Write what you want in plain language — no code needed.</p>
                </div>

                {/* Description 2 */}
                <div className="step-description-2 step-description rounded-lg p-4 border">
                  <div className="text-sm font-medium text-[#7866CC] dark:text-purple-300 mb-2">Step 2</div>
                  <h4 className="font-semibold text-[#1F2937] dark:text-white mb-2">Answer a few quick questions</h4>
                  <p className="text-sm text-[#6B7280] dark:text-gray-300">Pick from multiple-choice or checkboxes to refine details.</p>
                </div>

                {/* Description 3 */}
                <div className="step-description-3 step-description rounded-lg p-4 border">
                  <div className="text-sm font-medium text-[#7866CC] dark:text-purple-300 mb-2">Step 3</div>
                  <h4 className="font-semibold text-[#1F2937] dark:text-white mb-2">Review your generated spec</h4>
                  <p className="text-sm text-[#6B7280] dark:text-gray-300">See the step-by-step plan before anything gets built.</p>
                </div>

                {/* Description 4 */}
                <div className="step-description-4 step-description rounded-lg p-4 border">
                  <div className="text-sm font-medium text-[#7866CC] dark:text-purple-300 mb-2">Step 4</div>
                  <h4 className="font-semibold text-[#1F2937] dark:text-white mb-2">Execute build tasks</h4>
                  <p className="text-sm text-[#6B7280] dark:text-gray-300">Each click executes a task — watch your app take shape.</p>
                </div>

                {/* Description 5 */}
                <div className="step-description-5 step-description rounded-lg p-4 border">
                  <div className="text-sm font-medium text-[#7866CC] dark:text-purple-300 mb-2">Step 5</div>
                  <h4 className="font-semibold text-[#1F2937] dark:text-white mb-2">Chat with AI to tweak or improve</h4>
                  <p className="text-sm text-[#6B7280] dark:text-gray-300">Ask for changes in simple language, get instant updates.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You Can Build */}
      <section id="examples" className="relative isolate overflow-hidden bg-white dark:bg-gray-900 px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="lg:max-w-lg">
                <p className="text-base/7 font-semibold text-[#7866CC] dark:text-purple-300">Real Examples</p>
                <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-[#1F2937] dark:text-white sm:text-5xl">
                  What You Can Build
                </h1>
                <p className="mt-6 text-lg leading-8 text-[#6B7280] dark:text-gray-300">
                  Claude Code builds real, production-level apps — not just frontends.<br />
                  Think full system control, real databases, custom logic, and end-to-end testing. It's what professional developers use when they want working software, not workarounds.
                </p>
                <p className="mt-6 text-lg leading-8 text-[#6B7280] dark:text-gray-300">
                  The problem? Claude Code requires terminal skills and setup knowledge most people don't have.
                </p>
                <p className="mt-6 text-lg leading-8 text-[#1F2937] dark:text-white font-semibold">
                  We solve that.
                </p>
              </div>
            </div>
          </div>
          <div className="-mt-12 -ml-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
            <div className="w-full max-w-none rounded-xl shadow-xl overflow-hidden">
              <div className="relative w-full h-0" style={{paddingBottom: '56.25%'}}>
                <iframe 
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/DadTiwSlrC4?autoplay=1&mute=1&loop=1&playlist=DadTiwSlrC4&controls=0&showinfo=0&rel=0&modestbranding=1&vq=hd1080"
                  title="Pawgrammer Demo Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="max-w-xl text-base/7 text-[#6B7280] dark:text-gray-300 lg:max-w-lg">
                <h2 className="mt-8 text-2xl font-bold tracking-tight text-[#1F2937] dark:text-white">Ready for Claude Code that's properly configured?</h2>
                <div className="mt-6 relative inline-block">
                  {isSignedUp && (showShareButton || isFooterVisible) && (
                    <div className={`signup-tooltip ${showTooltip ? 'show' : ''}`}>
                      <div className="flex items-center">
                        <span className="heart-icon">
                        <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="m12 21.35-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                      </span>
                        <span className="heart-text">You're all set!</span>
                      </div>
                    </div>
                  )}
                  <EnhancedButton
                    showSuccess={isSignedUp && !showShareButton}
                    navigateToChat={false}
                    onClick={() => setIsEarlyAccessModalOpen(true)}
                  >
                    {showShareButton ? 'Share with friends' : isSignedUp ? "You're all set!" : 'Get early access'}
                  </EnhancedButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* From Simple Ideas to Enterprise Solutions */}
      <section className="py-16 px-6 bg-gradient-to-b from-white via-violet-50/30 to-white dark:from-gray-900 dark:via-violet-950/20 dark:to-gray-900">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              Personal tools that solve your actual problems
            </h2>
            <p className="mt-3 text-base sm:text-lg text-neutral-600 dark:text-gray-300 max-w-3xl mx-auto">
              Turn daily workflow frustrations into custom tools using Claude Code's power — without the technical headaches.
            </p>
          </div>

          {/* Tier 1: Workflow Problems Card */}
          <div className="mb-12">
            <div className="rounded-3xl border border-violet-200 dark:border-violet-800/50 bg-white/70 dark:bg-gray-800/70 shadow-sm p-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
                The ideas that you can build with our tool:
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 hover:shadow-md transition-shadow">
                  <GiftIcon className="h-6 w-6 text-gray-600 dark:text-gray-400 mb-2" />
                  <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">Gift Idea Tracker</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">"Sarah mentioned mystery novels" → logged for December</div>
                </div>
                
                <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 hover:shadow-md transition-shadow">
                  <SparklesIcon className="h-6 w-6 text-gray-600 dark:text-gray-400 mb-2" />
                  <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">Smart Plant Care</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Water plants *before* they die, not on a rigid schedule</div>
                </div>
                
                <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 hover:shadow-md transition-shadow">
                  <ArchiveBoxIcon className="h-6 w-6 text-gray-600 dark:text-gray-400 mb-2" />
                  <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">Lending Tracker</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">"Who has my camping gear?" with gentle reminder system</div>
                </div>
                
                <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 hover:shadow-md transition-shadow">
                  <BookOpenIcon className="h-6 w-6 text-gray-600 dark:text-gray-400 mb-2" />
                  <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">Reading List That Learns</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Track books by mood, remind you about exciting ones</div>
                </div>
                
                <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 hover:shadow-md transition-shadow">
                  <ChartBarIcon className="h-6 w-6 text-gray-600 dark:text-gray-400 mb-2" />
                  <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">Pattern Spotter</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Find patterns in your mood tracking spreadsheet</div>
                </div>
                
                <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 hover:shadow-md transition-shadow">
                  <PhotoIcon className="h-6 w-6 text-gray-600 dark:text-gray-400 mb-2" />
                  <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">Memory-Based Organizer</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Sort photos by vacation and moments, not just dates</div>
                </div>
              </div>
            </div>
          </div>

          {/* Transition Connector */}
          <div className="relative mb-12">
            <div className="h-px bg-gradient-to-r from-transparent via-violet-300 dark:via-violet-600 to-transparent"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-white dark:bg-gray-900 px-4 py-2 text-sm font-medium text-violet-700 dark:text-violet-300 rounded-full border border-violet-200 dark:border-violet-700">
                Claude Code doesn't just organize — it thinks
              </span>
            </div>
          </div>

          {/* Tier 2: Claude Code Power Card */}
          <div className="mb-12">
            <div className="rounded-3xl bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30 border-2 border-violet-200 dark:border-violet-700 p-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
                Claude Code's power, no technical headaches.
              </h3>
              
              <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
                <div className="flex items-start space-x-3 p-4 bg-white/70 dark:bg-gray-800/70 rounded-xl border border-violet-100 dark:border-violet-800">
                  <div className="bg-violet-600 p-2 rounded-lg flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9,2V8H11V11H5L12,22V16H10V13H16L9,2Z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Actually Thinks</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Suggests improvements you hadn't thought of, adapts to your workflow</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-white/70 dark:bg-gray-800/70 rounded-xl border border-violet-100 dark:border-violet-800">
                  <div className="bg-violet-600 p-2 rounded-lg flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.22,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.22,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Your Computer, Your Data</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Work directly with your files, databases, and tools — not stuck behind APIs or cloud limits</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-white/70 dark:bg-gray-800/70 rounded-xl border border-violet-100 dark:border-violet-800">
                  <div className="bg-violet-600 p-2 rounded-lg flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Personal Tools, Not Products</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Built for your life, not the app store — exactly how you think about your stuff</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-white/70 dark:bg-gray-800/70 rounded-xl border border-violet-100 dark:border-violet-800">
                  <div className="bg-violet-600 p-2 rounded-lg flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8,3A2,2 0 0,0 6,5V9A2,2 0 0,1 4,11H3V13H4A2,2 0 0,1 6,15V19A2,2 0 0,0 8,21H10V19H8V14A2,2 0 0,0 6,12A2,2 0 0,0 8,10V5H10V3M16,3A2,2 0 0,1 18,5V9A2,2 0 0,0 20,11H21V13H20A2,2 0 0,0 18,15V19A2,2 0 0,1 16,21H14V19H16V14A2,2 0 0,1 18,12A2,2 0 0,1 16,10V5H14V3H16Z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Real Software</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Not templates or simple automation — tools that adapt and learn from your patterns</p>
                  </div>
                </div>
              </div>

              {/* Call-to-Action Row */}
              <div className="mt-8 text-right sm:text-center">
                <div className="relative inline-block">
                  <EnhancedButton
                    showSuccess={isSignedUp && !showShareButton}
                    navigateToChat={false}
                    onClick={() => setIsEarlyAccessModalOpen(true)}
                  >
                    {showShareButton ? 'Share with friends' : isSignedUp ? "You're all set!" : 'Build my first tool'}
                  </EnhancedButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founding Team Section */}
      <section className="bg-white dark:bg-gray-900 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-[#7866CC] dark:text-purple-300">Who We Are</h2>
            <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-[#1F2937] dark:text-white sm:text-5xl lg:text-balance">
              Team
            </p>
          </div>
          
          <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 sm:mt-20 lg:grid-cols-3">
            {/* Mai - Co-Founder */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center shadow-lg dark:shadow-none">
              <div className="mb-6 h-10 flex items-center justify-center">
                <span className="text-sm font-mono text-[#7866CC] dark:text-purple-300">[ CO-FOUNDER ]</span>
              </div>
              <div className="mx-auto mb-6 h-32 w-32 rounded-full bg-gradient-to-r from-[#7866CC] to-[#AF97F8] p-1">
                <img 
                  src="/mai.jpeg" 
                  alt="Mai" 
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-semibold text-[#1F2937] dark:text-white mb-4">Mai</h3>
              <div className="flex justify-center space-x-4 mb-6">
                <a href="https://x.com/mai_on_chain" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-[#7866CC] dark:hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/mai-akiyoshi-97234533/" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-[#7866CC] dark:hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
              <p className="text-[#6B7280] dark:text-gray-300 text-sm leading-relaxed">
                Mai co-founded a startup that generated $2M in revenue, grew to over 1M users, raised $3.4M in venture funding, and was acquired by one of the fastest-growing unicorns. Previously, she was a Senior Software Engineer on the Growth team at Gusto, where she led the Top-of-Funnel team driving user acquisition.
              </p>
            </div>

            {/* Ben - Co-Founder */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center shadow-lg dark:shadow-none">
              <div className="mb-6 h-10 flex items-center justify-center">
                <span className="text-sm font-mono text-[#7866CC] dark:text-purple-300">[ CO-FOUNDER ]</span>
              </div>
              <div className="mx-auto mb-6 h-32 w-32 rounded-full bg-gradient-to-r from-[#7866CC] to-[#AF97F8] p-1">
                <img 
                  src="/ben.jpeg" 
                  alt="Ben" 
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-semibold text-[#1F2937] dark:text-white mb-4">Ben</h3>
              <div className="flex justify-center space-x-4 mb-6">
                <a href="https://x.com/intenex" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-[#7866CC] dark:hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/intenex/" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-[#7866CC] dark:hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
              <p className="text-[#6B7280] dark:text-gray-300 text-sm leading-relaxed">
                Ben dropped out of Harvard to become an inaugural Thiel Fellow, immersing himself early in the startup space. In 2017, he co-founded Stream, a startup that raised $20 million led by Pantera Capital, aiming to align incentives for content creators through blockchain technology.
              </p>
            </div>

            {/* Stacy - Head of Marketing and Customer Success */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center shadow-lg dark:shadow-none">
              <div className="mb-6 h-10 flex items-center justify-center">
                <span className="text-sm font-mono text-[#7866CC] dark:text-purple-300 text-center leading-tight">[ HEAD OF MARKETING AND CUSTOMER SUCCESS ]</span>
              </div>
              <div className="mx-auto mb-6 h-32 w-32 rounded-full bg-gradient-to-r from-[#7866CC] to-[#AF97F8] p-1">
                <img 
                  src="/stacy2.jpg" 
                  alt="Stacy" 
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-semibold text-[#1F2937] dark:text-white mb-4">Stacy</h3>
              <div className="flex justify-center space-x-4 mb-6">
                <a href="https://x.com/stacydj0x" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-[#7866CC] dark:hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/stacydonnaj/" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-[#7866CC] dark:hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
              <p className="text-[#6B7280] dark:text-gray-300 text-sm leading-relaxed">
                Stacy began her career in Customer Success and quickly rose through the ranks to become CS Manager, then expanded her scope to social media and marketing. Her talent and work ethic propelled her to Head of Marketing at a Silicon Valley startup, where she drove growth and brand presence across multiple channels.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community CTA Section */}
      <section id="community" className="py-24 px-6 bg-white dark:bg-gray-900 relative overflow-hidden">
        {/* Discord Banner Background - Full Width */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/Discord-Banner_8.png)'
          }}
        ></div>

        <div className="mx-auto max-w-7xl relative z-10">
          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

            .cta-background {
              background: linear-gradient(to bottom, #f4eefc, #fcf3fa, #fdf6ef, #f9f1fc);
              backdrop-filter: blur(20px);
              box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.3);
            }

            .dark .cta-background {
              background: linear-gradient(to bottom, #202a37, #111827);
              box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1);
              border: 1px solid rgba(255, 255, 255, 0.1);
            }

            .join-community-btn {
              color: white !important;
              font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji" !important;
            }

            .join-community-btn:hover {
              color: white !important;
            }

            .cta-text {
              font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji" !important;
            }
          `}</style>
          <div
            className="cta-background relative max-w-5xl py-16 md:pl-24 md:pr-24 md:w-full mx-2 md:mx-auto flex flex-col items-start justify-center text-left rounded-2xl p-10 overflow-hidden border border-white/20 shadow-2xl"
            style={{
              fontFamily: 'Poppins, sans-serif'
            }}
          >

            {/* Content */}
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
              {/* Left Content */}
              <div className="lg:flex-1">
                <div className="flex items-center mb-5">
                  <div className="flex pr-3">
                    <img src="/discord.svg" alt="Discord" className="size-6 hover:-translate-y-px transition" />
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="cta-text text-sm text-gray-600 dark:text-gray-300">Join our Discord community</p>
                    <div className="flex items-center">
                      <div className="relative">
                        <div className="w-8 h-8 rounded-full bg-white/15 dark:bg-gray-600/40 backdrop-blur-lg border border-white/40 dark:border-gray-700/70 shadow-md p-0.5 relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent dark:from-gray-400/10 dark:to-transparent rounded-full"></div>
                          <img src="/royaldependent.png" alt="Community Member" className="w-full h-full rounded-full object-cover object-top relative z-10" />
                        </div>
                      </div>
                      <div className="relative -ml-2">
                        <div className="w-8 h-8 rounded-full bg-white/15 dark:bg-gray-600/40 backdrop-blur-lg border border-white/40 dark:border-gray-700/70 shadow-md p-0.5 relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent dark:from-gray-400/10 dark:to-transparent rounded-full"></div>
                          <img src="/pawgrammericonnew.png" alt="Community Member" className="w-full h-full rounded-full object-cover relative z-10" />
                        </div>
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <h1 className="cta-text text-4xl md:text-[46px] md:leading-[60px] font-semibold bg-gradient-to-r from-[#4C0083] to-[#7866CC] dark:from-[#EBE5FD] dark:to-[#EBE5FD] text-transparent bg-clip-text">
                  Bring an idea. Leave with a tool.
                </h1>
                <div className="cta-text mt-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="relative overflow-hidden rounded-full bg-white/10 dark:bg-gray-700/30 backdrop-blur-lg border border-white/20 dark:border-gray-600/40 shadow-md px-6 py-3 text-base font-medium text-[#7866CC] dark:text-[#D1C7F0] hover:bg-white/15 dark:hover:bg-gray-600/40 hover:scale-[1.02] transition-all duration-200 flex items-center gap-2">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#7866CC]/5 to-[#BEAEE2]/5 dark:from-[#7866CC]/15 dark:to-[#BEAEE2]/15"></div>
                      <span className="relative text-lg">🎯</span>
                      <span className="relative">Get step-by-step guidance on where to start</span>
                    </div>
                    <div className="relative overflow-hidden rounded-full bg-white/10 dark:bg-gray-700/30 backdrop-blur-lg border border-white/20 dark:border-gray-600/40 shadow-md px-6 py-3 text-base font-medium text-[#7866CC] dark:text-[#D1C7F0] hover:bg-white/15 dark:hover:bg-gray-600/40 hover:scale-[1.02] transition-all duration-200 flex items-center gap-2">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#7866CC]/5 to-[#BEAEE2]/5 dark:from-[#7866CC]/15 dark:to-[#BEAEE2]/15"></div>
                      <span className="relative text-lg">⚡</span>
                      <span className="relative">Learn the shortcuts builders use to move faster</span>
                    </div>
                    <div className="relative overflow-hidden rounded-full bg-white/10 dark:bg-gray-700/30 backdrop-blur-lg border border-white/20 dark:border-gray-600/40 shadow-md px-6 py-3 text-base font-medium text-[#7866CC] dark:text-[#D1C7F0] hover:bg-white/15 dark:hover:bg-gray-600/40 hover:scale-[1.02] transition-all duration-200 flex items-center gap-2">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#7866CC]/5 to-[#BEAEE2]/5 dark:from-[#7866CC]/15 dark:to-[#BEAEE2]/15"></div>
                      <span className="relative text-lg">🔨</span>
                      <span className="relative">Build simple apps with guidance (we'll walk you through it)</span>
                    </div>
                    <div className="relative overflow-hidden rounded-full bg-white/10 dark:bg-gray-700/30 backdrop-blur-lg border border-white/20 dark:border-gray-600/40 shadow-md px-6 py-3 text-base font-medium text-[#7866CC] dark:text-[#D1C7F0] hover:bg-white/15 dark:hover:bg-gray-600/40 hover:scale-[1.02] transition-all duration-200 flex items-center gap-2">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#7866CC]/5 to-[#BEAEE2]/5 dark:from-[#7866CC]/15 dark:to-[#BEAEE2]/15"></div>
                      <span className="relative text-lg">💬</span>
                      <span className="relative">Ask questions anytime and get direct feedback from us</span>
                    </div>
                  </div>

                  {/* Join Us Button - Right Aligned */}
                  <div className="flex justify-end">
                    <a
                      href="https://discord.gg/RFuCgdTxXx"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="join-community-btn inline-flex items-center px-6 py-3 bg-[#7866CC] text-white text-base font-medium rounded-lg hover:bg-[#6B5BB3] hover:text-white dark:hover:bg-[#6242c3] dark:hover:text-white transition-colors duration-200"
                    >
                      Join Us
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer id="footer-section" />

      {/* Early Access Modal */}
      <EarlyAccessModal
        isOpen={isEarlyAccessModalOpen}
        onClose={() => setIsEarlyAccessModalOpen(false)}
      />
    </div>
  );
};

export default App;
