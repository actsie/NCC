import React, { useState } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { CommandLineIcon, BuildingOffice2Icon, RocketLaunchIcon, CloudArrowUpIcon, LockClosedIcon, ServerIcon, ShoppingCartIcon, UserGroupIcon, ChartBarIcon, GiftIcon, SparklesIcon, ArchiveBoxIcon, BookOpenIcon, PhotoIcon, LightBulbIcon, ComputerDesktopIcon, WrenchScrewdriverIcon, BoltIcon } from '@heroicons/react/20/solid';
import { ExclamationTriangleIcon, XMarkIcon as XMarkSolidIcon, CogIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import AnimatedButton from './AnimatedButton';
import DarkModeToggle from './DarkModeToggle';
import BlogPostClaudeNoCode from './BlogPostClaudeNoCode';
import BlogIndex from './BlogIndex';
import Header from './components/Header';
import Footer from './components/Footer';
import ShineText from './components/ShineText';

// Tab styles with neumorphic animations
const tabStyles = `
  <style>
    /* Base tab styles with neumorphic design - only for inactive tabs */
    [id^="tab-"]:not(.tab-active) {
      position: relative;
      background: linear-gradient(145deg, #ffffff, #e6e6e6);
      box-shadow:
        3px 3px 6px rgba(0, 0, 0, 0.1),
        -3px -3px 6px rgba(255, 255, 255, 0.7);
      transition: all 0.2s ease;
      overflow: visible;
      border: none !important;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* Dark mode styles for inactive tabs */
    .dark [id^="tab-"]:not(.tab-active) {
      background: linear-gradient(145deg, #374151, #4b5563);
      box-shadow:
        3px 3px 6px rgba(0, 0, 0, 0.5),
        -3px -3px 6px rgba(30, 35, 42, 0.8);
      color: #e5e7eb !important;
    }

    /* Hover effect for inactive tabs only */
    [id^="tab-"]:hover:not(.tab-active) {
      background: linear-gradient(145deg, #f0f0f0, #ffffff) !important;
      transform: translateY(-1px);
      box-shadow:
        4px 4px 8px rgba(0, 0, 0, 0.1),
        -4px -4px 8px rgba(255, 255, 255, 0.8);
      height: 48px;
    }

    /* Dark mode hover effect for inactive tabs only */
    .dark [id^="tab-"]:hover:not(.tab-active) {
      background: linear-gradient(145deg, #1f2937, #374151) !important;
      box-shadow:
        4px 4px 8px rgba(0, 0, 0, 0.6),
        -4px -4px 8px rgba(17, 24, 39, 0.9);
      color: #f3f4f6 !important;
      height: 48px;
    }

    /* Active tab styles with orange gradient */
    .tab-active {
      background: linear-gradient(145deg, #7866CC, #AF97F8) !important;
      color: white !important;
      font-weight: 600;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
      box-shadow:
        inset 2px 2px 5px rgba(0, 0, 0, 0.2),
        inset -2px -2px 5px rgba(255, 255, 255, 0.1),
        3px 3px 8px rgba(120, 102, 204, 0.3);
      transform: translateY(2px);
      border: none !important;
      animation: select 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* Active tab hover effect */
    [id^="tab-"]:hover.tab-active {
      transform: translateY(1px);
      height: 48px;
    }

    /* Shine effect for solution tab when not active */
    .tab-solution-shine:not(.tab-active)::before {
      content: '';
      position: absolute;
      top: -1px;
      left: -1px;
      right: -1px;
      bottom: -1px;
      background: linear-gradient(45deg, #7866CC, #AF97F8, #7866CC, #AF97F8);
      background-size: 400% 400%;
      border-radius: inherit;
      z-index: -1;
      animation: shimmer 3s ease-in-out infinite;
    }
    
    /* Disable shimmer animation on hover */
    .tab-solution-shine:not(.tab-active):hover::before {
      animation: none;
    }
    
    .tab-solution-shine:not(.tab-active)::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.9);
      border-radius: inherit;
      z-index: 0;
    }

    /* Dark mode shine effect background */
    .dark .tab-solution-shine:not(.tab-active)::after {
      background: rgba(31, 41, 55, 0.95);
    }
    .tab-solution-shine:not(.tab-active) span {
      position: relative;
      z-index: 1;
    }

    /* Particle animation for active tabs */
    .tab-active::before,
    .tab-active::after {
      content: "";
      position: absolute;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      opacity: 0;
      pointer-events: none;
    }

    .tab-active::before {
      background: #AF97F8;
      box-shadow: 
        0 0 6px #AF97F8,
        10px -10px 0 #AF97F8,
        -10px -10px 0 #AF97F8;
      top: -10px;
      left: 50%;
      transform: translateX(-50%);
      animation: multi-particles-top 0.8s ease-out forwards;
    }

    .tab-active::after {
      background: #7866CC;
      box-shadow: 
        0 0 8px #7866CC,
        10px 10px 0 #7866CC,
        -10px 10px 0 #7866CC;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      animation: multi-particles-bottom 0.8s ease-out forwards;
    }

    /* Ripple effect */
    .tab-active {
      position: relative;
    }

    .tab-active:before {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background: radial-gradient(
        circle at 50% 50%,
        rgba(255, 255, 255, 0.5) 0%,
        transparent 50%
      );
      opacity: 0;
      animation: ripple 0.8s ease-out;
      z-index: 1;
    }

    /* Glowing border for active tabs */
    .tab-active:after {
      content: "";
      position: absolute;
      inset: -2px;
      border-radius: inherit;
      background: linear-gradient(
        45deg,
        rgba(241, 39, 17, 0.5),
        rgba(245, 175, 25, 0.5)
      );
      -webkit-mask:
        linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      animation: border-glow 1.5s ease-in-out infinite alternate;
      z-index: -1;
    }

    /* Solution tab particles when active */
    .tab-solution-shine.tab-active .tab-solution-particles {
      display: block;
    }
    .tab-solution-shine.tab-active span {
      background: none !important;
      -webkit-background-clip: unset !important;
      -webkit-text-fill-color: white !important;
      color: white !important;
      position: relative;
      z-index: 2;
    }
    .tab-solution-particles {
      display: none;
      overflow: hidden;
      width: 100%;
      height: 100%;
      pointer-events: none;
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
    }
    .tab-solution-particles .particle {
      bottom: -10px;
      position: absolute;
      animation: floating-particles infinite ease-in-out;
      pointer-events: none;
      width: 2px;
      height: 2px;
      background-color: #fff;
      border-radius: 9999px;
    }

    /* Tab content fade in */
    .tab-content {
      animation: fadeIn 0.3s ease-in-out;
    }

    /* Keyframe animations */
    @keyframes select {
      0% {
        transform: scale(0.95) translateY(2px);
      }
      50% {
        transform: scale(1.05) translateY(-1px);
      }
      100% {
        transform: scale(1) translateY(2px);
      }
    }

    @keyframes multi-particles-top {
      0% {
        opacity: 1;
        transform: translateX(-50%) translateY(0) scale(1);
      }
      40% {
        opacity: 0.8;
      }
      100% {
        opacity: 0;
        transform: translateX(-50%) translateY(-20px) scale(0);
        box-shadow:
          0 0 6px transparent,
          20px -20px 0 transparent,
          -20px -20px 0 transparent;
      }
    }

    @keyframes multi-particles-bottom {
      0% {
        opacity: 1;
        transform: translateX(-50%) translateY(0) scale(1);
      }
      40% {
        opacity: 0.8;
      }
      100% {
        opacity: 0;
        transform: translateX(-50%) translateY(20px) scale(0);
        box-shadow:
          0 0 8px transparent,
          20px 20px 0 transparent,
          -20px 20px 0 transparent;
      }
    }

    @keyframes ripple {
      0% {
        opacity: 1;
        transform: scale(0.2);
      }
      50% {
        opacity: 0.5;
      }
      100% {
        opacity: 0;
        transform: scale(2.5);
      }
    }

    @keyframes border-glow {
      0% {
        opacity: 0.5;
      }
      100% {
        opacity: 1;
      }
    }

    @keyframes floating-particles {
      0% {
        transform: translateY(0);
      }
      85% {
        opacity: 0;
      }
      100% {
        transform: translateY(-40px);
        opacity: 0;
      }
    }

    .tab-solution-particles .particle:nth-child(1) {
      left: 15%;
      opacity: 1;
      animation-duration: 2.35s;
      animation-delay: 0.2s;
    }
    .tab-solution-particles .particle:nth-child(2) {
      left: 35%;
      opacity: 0.7;
      animation-duration: 2.5s;
      animation-delay: 0.5s;
    }
    .tab-solution-particles .particle:nth-child(3) {
      left: 25%;
      opacity: 0.8;
      animation-duration: 2.2s;
      animation-delay: 0.1s;
    }
    .tab-solution-particles .particle:nth-child(4) {
      left: 55%;
      opacity: 0.6;
      animation-duration: 2.05s;
    }
    .tab-solution-particles .particle:nth-child(5) {
      left: 70%;
      opacity: 1;
      animation-duration: 1.9s;
    }
    .tab-solution-particles .particle:nth-child(6) {
      left: 85%;
      opacity: 0.5;
      animation-duration: 1.5s;
      animation-delay: 1.5s;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes shimmer {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    /* Fix placeholder links */
    .placeholder-link {
      cursor: default !important;
      pointer-events: none;
    }
    .placeholder-link:hover {
      text-decoration: none !important;
    }

    /* Update link hover styles */
    a:hover {
      text-decoration: none !important;
      color: #7866CC !important;
    }

    /* Hero announcement banner shine effect */
    .hero-announcement {
      position: relative;
      background: transparent !important;
      border: 1px solid rgba(17, 24, 39, 0.1);
      background-clip: padding-box;
      overflow: hidden;
      transition: all 0.3s ease;
    }

    /* Dark mode border for hero announcement */
    .dark .hero-announcement {
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    /* Replace default border with shine border on hover */
    .hero-announcement:hover {
      border: 1px solid transparent;
    }
    
    .hero-announcement:hover::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(120, 102, 204, 0.4),
        rgba(175, 151, 248, 0.4),
        transparent
      );
      animation: shine-sweep 1.5s ease-in-out;
      z-index: 3;
      border-radius: inherit;
      pointer-events: none;
    }
    
    .hero-announcement:hover::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
      padding: 1px;
      background: linear-gradient(45deg, #7866CC, #AF97F8);
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: exclude;
      mask-composite: exclude;
      z-index: 1;
    }
    
    .hero-announcement .hero-announcement-content {
      position: relative;
      z-index: 2;
    }
    
    @keyframes shine-sweep {
      0% {
        left: -100%;
      }
      100% {
        left: 100%;
      }
    }
  </style>
`;

// Inject styles into document head
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('div');
  styleElement.innerHTML = tabStyles;
  document.head.appendChild(styleElement.firstElementChild);
}

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

const alternativesProblems = [
  {
    name: 'Claude Code is built by Anthropic, the frontier model provider.',
    description: 'Because Claude Code is built by Anthropic, the tokens you can use is a lot more generous than other tools.',
    icon: () => <span className="animate-pulse text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#7866CC] via-[#AF97F8] to-[#7866CC] bg-clip-text text-transparent">*</span>,
  },
  {
    name: 'Claude Code can control your whole computer.',
    description: 'Not only websites, but you can build literally anything from mobile apps, mac apps to just a simple script.',
    icon: () => <span className="animate-pulse text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#7866CC] via-[#AF97F8] to-[#7866CC] bg-clip-text text-transparent">*</span>,
  },
  {
    name: 'Extremely powerful tooling you can add infinitely.',
    description: 'With subagents and MCP, Claude Code makes your code much more robust with fewer problems.',
    icon: () => <span className="animate-pulse text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#7866CC] via-[#AF97F8] to-[#7866CC] bg-clip-text text-transparent">*</span>,
  }
];

const setupChallenges = [
  {
    name: 'Claude.md configuration',
    description: 'Crucial to making Claude behave like an agent — but tricky to get right without deep experience.',
    icon: () => <span className="animate-pulse text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#7866CC] via-[#AF97F8] to-[#7866CC] bg-clip-text text-transparent">*</span>,
  },
  {
    name: 'Complex infrastructure',
    description: 'Requires orchestration across MCP servers, custom testing frameworks, and reliable debugging workflows.',
    icon: () => <span className="animate-pulse text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#7866CC] via-[#AF97F8] to-[#7866CC] bg-clip-text text-transparent">*</span>,
  },
  {
    name: 'Not beginner-friendly',
    description: 'It\'s not just about writing prompts — it\'s about building a system that responds like a teammate.',
    icon: () => <span className="animate-pulse text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#7866CC] via-[#AF97F8] to-[#7866CC] bg-clip-text text-transparent">*</span>,
  }
];

const App = () => {
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [showShareButton, setShowShareButton] = useState(false);
  const [isExpanding, setIsExpanding] = useState(false);
  const [footerButtonBounce, setFooterButtonBounce] = useState(false);

  // Ensure page loads at the top on mobile
  React.useEffect(() => {
    // Force scroll to top on component mount
    window.scrollTo(0, 0);
    
    // Prevent browser scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
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

  // Manual tabs functionality
  React.useEffect(() => {
    const tabs = ['tab-problems', 'tab-setup', 'tab-solution'];
    
    function switchToTab(tabId) {
      // Remove active class from all tabs and reset styles
      document.querySelectorAll('[id^="tab-"]').forEach(tab => {
        tab.classList.remove('tab-active');
        if (tab.id === 'tab-solution') {
          tab.className = 'px-6 py-3 text-sm font-semibold text-[#6B7280] dark:text-gray-300 rounded-lg transition-all duration-200 tab-solution-shine';
        } else {
          tab.className = 'px-6 py-3 text-sm font-semibold text-[#6B7280] dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200';
        }
      });
      document.querySelectorAll('[id^="content-"]').forEach(content => content.classList.add('hidden'));
      
      // Add active class to target tab
      const activeTab = document.getElementById(tabId);
      if (activeTab) {
        activeTab.classList.add('tab-active');
        if (tabId === 'tab-solution') {
          activeTab.className = 'px-6 py-3 text-sm font-semibold text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 tab-active tab-solution-shine';
        } else {
          activeTab.className = 'px-6 py-3 text-sm font-semibold text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 tab-active';
        }
        const contentId = 'content-' + tabId.replace('tab-', '');
        const contentElement = document.getElementById(contentId);
        if (contentElement) {
          contentElement.classList.remove('hidden');
        }
      }
    }
    
    
    // Initialize first tab as active
    switchToTab(tabs[0]); // Ensure first tab is properly initialized
    
    
    
    
    // Cleanup function
    return () => {
      // No cleanup needed for manual-only tabs
    };
  }, []);

  // Simple routing logic
  const currentPath = window.location.pathname;
  
  // If it's the blog index route, render the blog index
  if (currentPath === '/blog') {
    return <BlogIndex />;
  }
  
  // If it's the blog post route, render the blog component
  if (currentPath === '/blog/build-ai-tool-with-claude-no-code') {
    return <BlogPostClaudeNoCode />;
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
      <div className="relative isolate px-6 pt-14 lg:px-8">
        {/* Background gradient blobs */}
        <div aria-hidden="true" className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div 
            style={{
              clipPath: 'polygon(50% 0%, 55% 25%, 75% 7%, 65% 32%, 100% 25%, 70% 45%, 93% 57%, 62% 62%, 75% 93%, 50% 68%, 25% 93%, 38% 62%, 7% 57%, 30% 45%, 0% 25%, 35% 32%, 25% 7%, 45% 25%)'
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#7866CC] to-[#AF97F8] dark:from-[#362B6B] dark:to-[#5E50A0] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
        
        <section className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          {/* Announcement Banner */}
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="hero-announcement relative rounded-full px-3 py-1 text-sm leading-6 text-[#6B7280] dark:text-gray-300">
              <div className="hero-announcement-content">
                Claude Code infrastructure, no complexity. <a href="#features" className="font-semibold text-[#7866CC]"><span aria-hidden="true" className="absolute inset-0"></span>Learn more <span aria-hidden="true">→</span></a>
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
              <ShineText>Pawgrammer</ShineText> makes Claude Code simple. Non-technical users get pro-grade setup — the kind even developers find painful to do on their own.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <div className="relative inline-block">
                {isSignedUp && showShareButton && (
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
                <AnimatedButton 
                  onSignup={() => setIsSignedUp(true)}
                  showSuccess={isSignedUp && !showShareButton}
                  isShareMode={showShareButton}
                  isExpanding={isExpanding}
                >
                  {showShareButton ? 'Share with friends' : isSignedUp ? "You're all set!" : 'Get early access'}
                </AnimatedButton>
              </div>
              <a href="#features" className="text-sm font-semibold leading-6 text-[#1F2937] dark:text-gray-300">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
            <p className="mt-6 text-xs text-[#6B7280] dark:text-gray-400 text-center">
              *Requires Claude Code subscription. Not affiliated with Anthropic.
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
              src="/Pawgrammer-light.png"
              className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0 dark:hidden"
            />
            <img
              alt="Pawgrammer interface"
              src="/Pawgrammer-light.png"
              className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0 hidden dark:block"
            />
          </div>
        </div>
      </section>

      {/* Tab-based Problem & Solution Section */}
      <section className="relative isolate bg-white dark:bg-gray-900 py-24 sm:py-32">
        {/* Background gradient blob */}
        <div aria-hidden="true" className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div 
            style={{
              clipPath: 'polygon(50% 0%, 55% 25%, 75% 7%, 65% 32%, 100% 25%, 70% 45%, 93% 57%, 62% 62%, 75% 93%, 50% 68%, 25% 93%, 38% 62%, 7% 57%, 30% 45%, 0% 25%, 35% 32%, 25% 7%, 45% 25%)'
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#AF97F8] to-[#C3B1FA] dark:from-[#5E50A0] dark:to-[#362B6B] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
        
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Tab Navigation */}
          <div className="mx-auto max-w-4xl lg:text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-[#7866CC] dark:text-purple-300">Understanding the Challenge</h2>
            <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-[#1F2937] dark:text-white sm:text-5xl lg:text-balance">
              Why <ShineText>Pawgrammer</ShineText> exists
            </p>
          </div>
          
          <div className="mx-auto max-w-6xl">
            {/* Tab Buttons */}
            <div className="flex flex-col sm:flex-row justify-center mb-12 gap-2">
              <button 
                id="tab-problems"
                className="px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-[#7866CC] to-[#AF97F8] rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 tab-active"
                onClick={() => {
                  // Remove active class from all tabs and reset styles
                  document.querySelectorAll('[id^="tab-"]').forEach(tab => {
                    tab.classList.remove('tab-active');
                    if (tab.id === 'tab-solution') {
                      tab.className = 'px-6 py-3 text-sm font-semibold text-[#6B7280] dark:text-gray-300 rounded-lg transition-all duration-200 tab-solution-shine';
                    } else {
                      tab.className = 'px-6 py-3 text-sm font-semibold text-[#6B7280] dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200';
                    }
                  });
                  document.querySelectorAll('[id^="content-"]').forEach(content => content.classList.add('hidden'));
                  
                  // Add active class to clicked tab
                  const activeTab = document.getElementById('tab-problems');
                  activeTab.classList.add('tab-active');
                  activeTab.className = 'px-6 py-3 text-sm font-semibold text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 tab-active';
                  document.getElementById('content-problems').classList.remove('hidden');
                }}
              >
                Why Claude Code is better than other tools
              </button>
              <button 
                id="tab-setup"
                className="px-6 py-3 text-sm font-semibold text-[#6B7280] dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200"
                onClick={() => {
                  // Remove active class from all tabs and reset styles
                  document.querySelectorAll('[id^="tab-"]').forEach(tab => {
                    tab.classList.remove('tab-active');
                    if (tab.id === 'tab-solution') {
                      tab.className = 'px-6 py-3 text-sm font-semibold text-[#6B7280] dark:text-gray-300 rounded-lg transition-all duration-200 tab-solution-shine';
                    } else {
                      tab.className = 'px-6 py-3 text-sm font-semibold text-[#6B7280] dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200';
                    }
                  });
                  document.querySelectorAll('[id^="content-"]').forEach(content => content.classList.add('hidden'));
                  
                  // Add active class to clicked tab
                  const activeTab = document.getElementById('tab-setup');
                  activeTab.classList.add('tab-active');
                  activeTab.className = 'px-6 py-3 text-sm font-semibold text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 tab-active';
                  document.getElementById('content-setup').classList.remove('hidden');
                }}
              >
                Why it's hard to use Claude Code
              </button>
              <button 
                id="tab-solution"
                className="px-6 py-3 text-sm font-semibold text-[#6B7280] dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg transition-all duration-200 tab-solution-shine"
                onClick={() => {
                  // Remove active class from all tabs and reset styles
                  document.querySelectorAll('[id^="tab-"]').forEach(tab => {
                    tab.classList.remove('tab-active');
                    if (tab.id === 'tab-solution') {
                      tab.className = 'px-6 py-3 text-sm font-semibold text-[#6B7280] dark:text-gray-300 rounded-lg transition-all duration-200 tab-solution-shine';
                    } else {
                      tab.className = 'px-6 py-3 text-sm font-semibold text-[#6B7280] dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200';
                    }
                  });
                  document.querySelectorAll('[id^="content-"]').forEach(content => content.classList.add('hidden'));
                  
                  // Add active class to clicked tab
                  const activeTab = document.getElementById('tab-solution');
                  activeTab.classList.add('tab-active');
                  activeTab.className = 'px-6 py-3 text-sm font-semibold text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 tab-active tab-solution-shine';
                  document.getElementById('content-solution').classList.remove('hidden');
                }}
              >
                <div className="tab-solution-particles">
                  <i className="particle"></i>
                  <i className="particle"></i>
                  <i className="particle"></i>
                  <i className="particle"></i>
                  <i className="particle"></i>
                  <i className="particle"></i>
                </div>
                <span style={{ position: 'relative', zIndex: 2 }}>
                  <ShineText>How We Solve This</ShineText>
                </span>
              </button>
            </div>


            {/* Tab Content */}
            <div className="relative">
              {/* Problems Tab Content */}
              <div id="content-problems" className="tab-content">
                <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 rounded-2xl shadow-xl p-8 sm:p-12">
                  <div className="mx-auto max-w-4xl text-center mb-12">
                    <h3 className="text-3xl font-semibold text-[#1F2937] dark:text-white mb-4">
                      Claude Code is so much more powerful than any other no-code tools.
                    </h3>
                    <p className="text-lg text-[#6B7280] dark:text-gray-300 max-w-3xl mx-auto">
                      While other tools offer limited functionality, Claude Code delivers unprecedented capabilities that set it apart from every alternative.
                    </p>
                  </div>
                  <div className="grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16 mx-auto">
                    {alternativesProblems.map((problem, index) => (
                      <motion.div 
                        key={problem.name} 
                        className="relative pl-12 sm:pl-16 group"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <dt className="text-base leading-7 font-semibold text-[#1F2937] dark:text-white">
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
                        <dd className="mt-2 text-base leading-7 text-[#6B7280] dark:text-gray-300">{problem.description}</dd>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Setup Tab Content */}
              <div id="content-setup" className="tab-content hidden">
                <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 rounded-2xl shadow-xl p-8 sm:p-12">
                  <div className="mx-auto max-w-4xl text-center mb-12">
                    <h3 className="text-3xl font-semibold text-[#1F2937] dark:text-white mb-4">
                      Claude Code is the real deal — when it's set up right.
                    </h3>
                    <p className="text-lg text-[#6B7280] dark:text-gray-300 max-w-3xl mx-auto">
                      Most people never get past the configuration stage. Even experienced developers struggle to unlock its full potential.
                    </p>
                  </div>
                  <div className="grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16 mx-auto">
                    {setupChallenges.map((challenge, index) => (
                      <motion.div 
                        key={challenge.name} 
                        className="relative pl-12 sm:pl-16 group"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <dt className="text-base leading-7 font-semibold text-[#1F2937] dark:text-white">
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
                        <dd className="mt-2 text-base leading-7 text-[#6B7280] dark:text-gray-300">{challenge.description}</dd>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Solution Tab Content */}
              <div id="content-solution" className="tab-content hidden">
                <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 rounded-2xl shadow-xl p-8 sm:p-12">
                  <div className="mx-auto max-w-4xl text-center mb-12">
                    <h3 className="text-3xl font-semibold text-[#1F2937] dark:text-white mb-4">
                      Our Approach
                    </h3>
                    <p className="text-lg text-[#6B7280] dark:text-gray-300 max-w-3xl mx-auto">
                      Get Claude Code's full power, properly configured
                    </p>
                  </div>
                  <div className="grid gap-4 lg:grid-cols-3 lg:grid-rows-2">
                    <div className="relative lg:row-span-2">
                      <div className="absolute inset-px rounded-lg bg-white dark:bg-gray-700 lg:rounded-l-[2rem]" />
                      <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(0.75rem+1px)] lg:rounded-l-[calc(2rem+1px)]">
                        <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                          <p className="mt-2 text-lg font-medium tracking-tight text-[#1F2937] dark:text-white max-lg:text-center">
                            Built for non-technical users who want real apps
                          </p>
                          <p className="mt-2 max-w-lg text-sm/6 text-[#6B7280] dark:text-gray-300 max-lg:text-center">
                            There's still a learning curve — but the result is real, lasting software. Other tools work for demos. <ShineText>Pawgrammer</ShineText> builds apps you can actually use.
                          </p>
                        </div>
                        <div className="relative min-h-[30rem] w-full grow">
                          <div className="absolute top-10 right-0 bottom-0 left-10 overflow-hidden rounded-lg bg-white dark:bg-gray-800 border-t border-l border-gray-200 dark:border-gray-900 p-2 shadow-2xl">
                            <motion.div 
                              className="cursor-pointer hover:scale-105 transition-transform duration-200 w-full h-full relative z-10"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => {
                                const modal = document.createElement('div');
                                modal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50';
                                modal.onclick = () => document.body.removeChild(modal);
                                
                                const img = document.createElement('img');
                                img.src = '/project_outcome.png';
                                img.className = 'max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl';
                                img.onclick = (e) => e.stopPropagation();
                                
                                modal.appendChild(img);
                                document.body.appendChild(modal);
                              }}
                            >
                              <img 
                                src="/project_outcome.png" 
                                alt="Project Outcome - Built for non-technical users"
                                className="w-full h-full object-cover object-left rounded-lg"
                              />
                            </motion.div>
                          </div>
                        </div>
                      </div>
                      <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 lg:rounded-l-[2rem] z-0" />
                    </div>
                    <div className="relative max-lg:row-start-1">
                      <div className="absolute inset-px rounded-lg bg-white dark:bg-gray-700 max-lg:rounded-t-[2rem]" />
                      <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(0.75rem+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
                        <div className="px-8 pt-8 sm:px-10 sm:pt-10 mb-6">
                          <p className="mt-2 text-lg font-medium tracking-tight text-[#1F2937] dark:text-white max-lg:text-center">Professional setup, ready to use</p>
                          <p className="mt-2 max-w-lg text-sm/6 text-[#6B7280] dark:text-gray-300 max-lg:text-center">
                            Skip the configuration complexity that stops most people. Get the infrastructure knowledge we've refined through trial and error.
                          </p>
                        </div>
                        <div className="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
                          <motion.div 
                            className="cursor-pointer hover:scale-105 transition-transform duration-200"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
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
                              alt="Pawgrammer Professional Setup"
                              className="w-full max-w-xs rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-200"
                            />
                          </motion.div>
                        </div>
                      </div>
                      <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 max-lg:rounded-t-[2rem] z-0" />
                    </div>
                    <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
                      <div className="absolute inset-px rounded-lg bg-white dark:bg-gray-700" />
                      <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(0.75rem+1px)]">
                        <div className="px-8 pt-8 sm:px-10 sm:pt-10 mb-6">
                          <p className="mt-2 text-lg font-medium tracking-tight text-[#1F2937] dark:text-white max-lg:text-center">Same AI, better interface</p>
                          <p className="mt-2 max-w-lg text-sm/6 text-[#6B7280] dark:text-gray-300 max-lg:text-center">
                            Same AI that builds production-ready apps, wrapped in an interface you can use. No architectural limitations.
                          </p>
                        </div>
                        <div className="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
                          <motion.div 
                            className="cursor-pointer hover:scale-105 transition-transform duration-200 relative z-10"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              const modal = document.createElement('div');
                              modal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50';
                              modal.onclick = () => document.body.removeChild(modal);
                              
                              const img = document.createElement('img');
                              img.src = '/betterUI.png';
                              img.className = 'max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl';
                              img.onclick = (e) => e.stopPropagation();
                              
                              modal.appendChild(img);
                              document.body.appendChild(modal);
                            }}
                          >
                            <img 
                              src="/betterUI.png" 
                              alt="Better UI - Same AI, better interface"
                              className="w-full max-w-xs rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-200"
                            />
                          </motion.div>
                        </div>
                      </div>
                      <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 z-0" />
                    </div>
                    <div className="relative lg:row-span-2">
                      <div className="absolute inset-px rounded-lg bg-white dark:bg-gray-700 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]" />
                      <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(0.75rem+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
                        <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                          <p className="mt-2 text-lg font-medium tracking-tight text-[#1F2937] dark:text-white max-lg:text-center">
                            Expert-level infrastructure
                          </p>
                          <p className="mt-2 max-w-lg text-sm/6 text-[#6B7280] dark:text-gray-300 max-lg:text-center">
                            We've built the expert-level infrastructure (Claude.md, testing, debugging) that takes others weeks to figure out.
                          </p>
                        </div>
                        <div className="relative min-h-[30rem] w-full grow">
                          <div className="absolute top-10 right-0 bottom-0 left-10 overflow-hidden rounded-lg bg-white dark:bg-gray-800 border-t border-l border-gray-200 dark:border-gray-900 p-2 shadow-2xl">
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
                      <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem] z-0" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="relative isolate bg-white dark:bg-gray-900 py-24 sm:py-32">
        {/* Background gradient blob */}
        <div aria-hidden="true" className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div 
            style={{
              clipPath: 'polygon(50% 0%, 55% 25%, 75% 7%, 65% 32%, 100% 25%, 70% 45%, 93% 57%, 62% 62%, 75% 93%, 50% 68%, 25% 93%, 38% 62%, 7% 57%, 30% 45%, 0% 25%, 35% 32%, 25% 7%, 45% 25%)'
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#7866CC] to-[#AF97F8] dark:from-[#362B6B] dark:to-[#5E50A0] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-[#7866CC] dark:text-purple-300">Simple Process</h2>
            <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-[#1F2937] dark:text-white sm:text-5xl lg:text-balance">
              How It Works
            </p>
            <p className="mt-6 text-lg leading-8 text-[#6B7280] dark:text-gray-300 max-w-3xl mx-auto">
              From idea to production-ready app in three simple steps
            </p>
            <div className="mt-4 text-center">
              <p className="text-sm text-[#6B7280] dark:text-gray-400 font-medium">
                Note: You'll need an active Claude Code subscription to use this service.
              </p>
            </div>
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
                    className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full shadow-lg group-hover:shadow-xl"
                    style={{
                      backgroundImage: 'linear-gradient(30deg, #7866CC, #AF97F8)'
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
                    <span className="text-2xl font-bold text-white">1</span>
                  </motion.div>
                  <h3 className="text-xl font-semibold text-[#1F2937] dark:text-white mb-3">
                    Describe your app
                  </h3>
                  <div className="p-4 rounded-lg italic text-[#1F2937] dark:text-white mb-4">
                    "<TypewriterText />"
                  </div>
                  <p className="text-sm text-[#6B7280] dark:text-gray-300">
                    Tell our interface to Claude Code what you want to build
                  </p>
                </motion.div>

                {/* Step 2 */}
                <motion.div 
                  className="relative text-center group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div 
                    className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full shadow-lg group-hover:shadow-xl"
                    style={{
                      backgroundImage: 'linear-gradient(30deg, #7866CC, #AF97F8)'
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
                    <span className="text-2xl font-bold text-white">2</span>
                  </motion.div>
                  <h3 className="text-xl font-semibold text-[#1F2937] dark:text-white mb-3">
                    Watch Claude Code build
                  </h3>
                  <p className="text-[#6B7280] dark:text-gray-300 mb-4">
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
                    className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full shadow-lg group-hover:shadow-xl"
                    style={{
                      backgroundImage: 'linear-gradient(30deg, #7866CC, #AF97F8)'
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
                    <span className="text-2xl font-bold text-white">3</span>
                  </motion.div>
                  <h3 className="text-xl font-semibold text-[#1F2937] dark:text-white mb-3">
                    Get production-ready apps
                  </h3>
                  <p className="text-[#6B7280] dark:text-gray-300 mb-4">
                    Fully functional applications that scale with your business needs
                  </p>
                </motion.div>
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
              <video 
                className="w-full h-full object-cover"
                autoPlay 
                muted 
                loop
                poster="/video-poster.jpg"
              >
                <source src="/rank-tool-demo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
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
              <div className="mt-8 flex items-center justify-center">
                <AnimatedButton 
                  onSignup={() => setIsSignedUp(true)}
                  showSuccess={isSignedUp && !showShareButton}
                  isShareMode={showShareButton}
                  isExpanding={isExpanding}
                >
                  {showShareButton ? 'Share with friends' : isSignedUp ? "You're all set!" : 'Build my first tool'}
                </AnimatedButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer id="footer-section" />
    </div>
  );
};

export default App;
