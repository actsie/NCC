import React, { useState } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { CommandLineIcon, BuildingOffice2Icon, RocketLaunchIcon, CloudArrowUpIcon, LockClosedIcon, ServerIcon, ShoppingCartIcon, UserGroupIcon, ChartBarIcon } from '@heroicons/react/20/solid';
import { ExclamationTriangleIcon, XMarkIcon as XMarkSolidIcon, CogIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import AnimatedButton from './AnimatedButton';

// Tab styles with neumorphic animations
const tabStyles = `
  <style>
    /* Base tab styles with neumorphic design */
    [id^="tab-"] {
      position: relative;
      background: linear-gradient(145deg, #ffffff, #e6e6e6);
      box-shadow:
        3px 3px 6px rgba(0, 0, 0, 0.1),
        -3px -3px 6px rgba(255, 255, 255, 0.7);
      transition: all 0.2s ease;
      overflow: visible;
      border: none !important;
    }

    /* Hover effect for all tabs */
    [id^="tab-"]:hover:not(.tab-active) {
      background: linear-gradient(145deg, #f0f0f0, #ffffff);
      transform: translateY(-1px);
      box-shadow:
        4px 4px 8px rgba(0, 0, 0, 0.1),
        -4px -4px 8px rgba(255, 255, 255, 0.8);
    }

    /* Active tab styles with orange gradient */
    .tab-active {
      background: linear-gradient(145deg, #f12711, #f5af19) !important;
      color: white !important;
      font-weight: 600;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
      box-shadow:
        inset 2px 2px 5px rgba(0, 0, 0, 0.2),
        inset -2px -2px 5px rgba(255, 255, 255, 0.1),
        3px 3px 8px rgba(241, 39, 17, 0.3);
      transform: translateY(2px);
      border: none !important;
      animation: select 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* Active tab hover effect */
    [id^="tab-"]:hover.tab-active {
      transform: translateY(1px);
    }

    /* Shine effect for solution tab when not active */
    .tab-solution-shine:not(.tab-active)::before {
      content: '';
      position: absolute;
      top: -1px;
      left: -1px;
      right: -1px;
      bottom: -1px;
      background: linear-gradient(45deg, #f12711, #f5af19, #f12711, #f5af19);
      background-size: 400% 400%;
      border-radius: inherit;
      z-index: -1;
      animation: shimmer 3s ease-in-out infinite;
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
      background: #f5af19;
      box-shadow: 
        0 0 6px #f5af19,
        10px -10px 0 #f5af19,
        -10px -10px 0 #f5af19;
      top: -10px;
      left: 50%;
      transform: translateX(-50%);
      animation: multi-particles-top 0.8s ease-out forwards;
    }

    .tab-active::after {
      background: #f12711;
      box-shadow: 
        0 0 8px #f12711,
        10px 10px 0 #f12711,
        -10px 10px 0 #f12711;
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
      color: #f36e15 !important;
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
        rgba(241, 39, 17, 0.4),
        rgba(245, 175, 25, 0.4),
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
      background: linear-gradient(45deg, #f12711, #f5af19);
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

  // Auto-cycling tabs functionality
  React.useEffect(() => {
    const tabs = ['tab-problems', 'tab-setup', 'tab-solution'];
    let currentIndex = 0;
    let autoInterval;
    let isHovered = false;
    let isTabsSectionVisible = false; // Start as false, will be set correctly on first scroll check
    
    function switchToTab(tabId) {
      // Remove active class from all tabs and reset styles
      document.querySelectorAll('[id^="tab-"]').forEach(tab => {
        tab.classList.remove('tab-active');
        if (tab.id === 'tab-solution') {
          tab.className = 'px-6 py-3 text-sm font-semibold text-[#6B7280] rounded-lg hover:bg-gray-50 transition-all duration-200 tab-solution-shine';
        } else {
          tab.className = 'px-6 py-3 text-sm font-semibold text-[#6B7280] bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200';
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
    
    function startAutoSwitch() {
      if (autoInterval) clearTimeout(autoInterval);
      
      function scheduleNext() {
        if (autoInterval) clearTimeout(autoInterval);
        
        const currentTab = tabs[currentIndex];
        const delay = currentTab === 'tab-solution' ? 8000 : 4000; // 8s for solution, 4s for others
        
        autoInterval = setTimeout(() => {
          if (!isHovered && isTabsSectionVisible) {
            currentIndex = (currentIndex + 1) % tabs.length;
            switchToTab(tabs[currentIndex]);
            scheduleNext();
          } else {
            // If still hovered or not visible, check again in 500ms
            autoInterval = setTimeout(scheduleNext, 500);
          }
        }, delay);
      }
      
      scheduleNext();
    }
    
    function stopAutoSwitch() {
      if (autoInterval) {
        clearTimeout(autoInterval);
        autoInterval = null;
      }
    }
    
    // Initialize first tab as active
    switchToTab(tabs[0]); // Ensure first tab is properly initialized
    
    // Check initial visibility of Understanding the Challenge section
    const checkInitialVisibility = () => {
      const challengeSection = Array.from(document.querySelectorAll('h2')).find(h2 => 
        h2.textContent.includes('Understanding the Challenge')
      );
      
      if (challengeSection) {
        const rect = challengeSection.getBoundingClientRect();
        const viewportBuffer = window.innerWidth <= 768 ? 100 : 50;
        isTabsSectionVisible = rect.top < (window.innerHeight + viewportBuffer) && rect.bottom > -viewportBuffer;
      }
    };
    
    // Check initial visibility and start auto-switching after 2 seconds if visible
    setTimeout(() => {
      checkInitialVisibility();
      if (isTabsSectionVisible) {
        startAutoSwitch();
      }
    }, 2000);
    
    // Add hover and click listeners to all tabs and content areas
    const addListeners = () => {
      // Tab button listeners
      document.querySelectorAll('[id^="tab-"]').forEach((tab, index) => {
        tab.addEventListener('mouseenter', () => {
          isHovered = true;
          stopAutoSwitch();
        });
        
        tab.addEventListener('mouseleave', () => {
          isHovered = false;
          // Add a small delay to prevent rapid restart when moving between elements
          setTimeout(() => {
            if (!isHovered && isTabsSectionVisible) {
              startAutoSwitch();
            }
          }, 100);
        });
        
        tab.addEventListener('click', () => {
          currentIndex = index;
          stopAutoSwitch();
          setTimeout(startAutoSwitch, 1000); // Restart after 1 second
        });
      });
      
      // Tab content listeners
      document.querySelectorAll('[id^="content-"]').forEach((content) => {
        content.addEventListener('mouseenter', () => {
          isHovered = true;
          stopAutoSwitch();
        });
        
        content.addEventListener('mouseleave', () => {
          isHovered = false;
          // Add a small delay to prevent rapid restart when moving between elements
          setTimeout(() => {
            if (!isHovered && isTabsSectionVisible) {
              startAutoSwitch();
            }
          }, 100);
        });
      });
    };
    
    // Add listeners immediately and also after a short delay to ensure elements exist
    addListeners();
    setTimeout(addListeners, 100);
    
    // Add scroll listener to detect when tabs section is visible
    // Throttle for better mobile performance
    let scrollTimeout;
    const handleTabsScroll = () => {
      // Clear previous timeout
      if (scrollTimeout) clearTimeout(scrollTimeout);
      
      // Use requestAnimationFrame for smooth performance on mobile
      scrollTimeout = setTimeout(() => {
        // Target the "Understanding the Challenge" section specifically
        const challengeSection = Array.from(document.querySelectorAll('h2')).find(h2 => 
          h2.textContent.includes('Understanding the Challenge')
        );
        
        if (challengeSection) {
          const rect = challengeSection.getBoundingClientRect();
          const wasVisible = isTabsSectionVisible;
          // Use larger buffer for mobile viewport detection
          const viewportBuffer = window.innerWidth <= 768 ? 100 : 50;
          isTabsSectionVisible = rect.top < (window.innerHeight + viewportBuffer) && rect.bottom > -viewportBuffer;
          
          // If section became visible and we're not hovered, restart auto-switch
          if (!wasVisible && isTabsSectionVisible && !isHovered) {
            startAutoSwitch();
          }
          // If section became invisible, stop auto-switch
          else if (wasVisible && !isTabsSectionVisible) {
            stopAutoSwitch();
          }
        }
      }, 16); // ~60fps throttling
    };
    
    // Use passive listener for better mobile scroll performance
    window.addEventListener('scroll', handleTabsScroll, { passive: true });
    
    // Cleanup function
    return () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      stopAutoSwitch();
      window.removeEventListener('scroll', handleTabsScroll);
    };
  }, []);

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
            <a href="#" className="-m-1.5 p-1.5 placeholder-link">
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
            <a href="#" className="text-sm font-semibold leading-6 text-[#1F2937] placeholder-link">Log in <span aria-hidden="true">→</span></a>
          </div>
        </nav>
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5 placeholder-link">
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
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-[#1F2937] hover:bg-gray-50 placeholder-link"
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
            <div className="hero-announcement relative rounded-full px-3 py-1 text-sm leading-6 text-[#6B7280]">
              <div className="hero-announcement-content">
                Professional Claude Code setup, no complexity. <a href="#" className="font-semibold text-[#D97706] placeholder-link"><span aria-hidden="true" className="absolute inset-0"></span>Learn more <span aria-hidden="true">→</span></a>
              </div>
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

      {/* Tab-based Problem & Solution Section */}
      <section className="relative isolate bg-white py-24 sm:py-32">
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
          {/* Tab Navigation */}
          <div className="mx-auto max-w-4xl lg:text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-[#F59E0B]">Understanding the Challenge</h2>
            <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-[#1F2937] sm:text-5xl lg:text-balance">
              Why <ShineText>No Code Claude</ShineText> exists
            </p>
          </div>
          
          <div className="mx-auto max-w-6xl">
            {/* Tab Buttons */}
            <div className="flex flex-col sm:flex-row justify-center mb-12 gap-2">
              <button 
                id="tab-problems"
                className="px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-[#F59E0B] to-[#EAB308] rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 tab-active"
                onClick={() => {
                  // Remove active class from all tabs and reset styles
                  document.querySelectorAll('[id^="tab-"]').forEach(tab => {
                    tab.classList.remove('tab-active');
                    if (tab.id === 'tab-solution') {
                      tab.className = 'px-6 py-3 text-sm font-semibold text-[#6B7280] rounded-lg hover:bg-gray-50 transition-all duration-200 tab-solution-shine';
                    } else {
                      tab.className = 'px-6 py-3 text-sm font-semibold text-[#6B7280] bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200';
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
                Problems with Alternatives
              </button>
              <button 
                id="tab-setup"
                className="px-6 py-3 text-sm font-semibold text-[#6B7280] bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200"
                onClick={() => {
                  // Remove active class from all tabs and reset styles
                  document.querySelectorAll('[id^="tab-"]').forEach(tab => {
                    tab.classList.remove('tab-active');
                    if (tab.id === 'tab-solution') {
                      tab.className = 'px-6 py-3 text-sm font-semibold text-[#6B7280] rounded-lg hover:bg-gray-50 transition-all duration-200 tab-solution-shine';
                    } else {
                      tab.className = 'px-6 py-3 text-sm font-semibold text-[#6B7280] bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200';
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
                Setup Challenges
              </button>
              <button 
                id="tab-solution"
                className="px-6 py-3 text-sm font-semibold text-[#6B7280] bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200 tab-solution-shine"
                onClick={() => {
                  // Remove active class from all tabs and reset styles
                  document.querySelectorAll('[id^="tab-"]').forEach(tab => {
                    tab.classList.remove('tab-active');
                    if (tab.id === 'tab-solution') {
                      tab.className = 'px-6 py-3 text-sm font-semibold text-[#6B7280] rounded-lg hover:bg-gray-50 transition-all duration-200 tab-solution-shine';
                    } else {
                      tab.className = 'px-6 py-3 text-sm font-semibold text-[#6B7280] bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200';
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
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-xl p-8 sm:p-12">
                  <div className="mx-auto max-w-4xl text-center mb-12">
                    <h3 className="text-3xl font-semibold text-[#1F2937] mb-4">
                      Claude Code is powerful — but most tools can't handle it.
                    </h3>
                    <p className="text-lg text-[#6B7280] max-w-3xl mx-auto">
                      Claude Code is capable of building real, production-level apps with minimal human input. But unlocking that power takes serious setup: expert-level config files, server orchestration, and testing infrastructure.
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
                  </div>
                </div>
              </div>

              {/* Setup Tab Content */}
              <div id="content-setup" className="tab-content hidden">
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-xl p-8 sm:p-12">
                  <div className="mx-auto max-w-4xl text-center mb-12">
                    <h3 className="text-3xl font-semibold text-[#1F2937] mb-4">
                      Claude Code is the real deal — when it's set up right.
                    </h3>
                    <p className="text-lg text-[#6B7280] max-w-3xl mx-auto">
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
                  </div>
                </div>
              </div>

              {/* Solution Tab Content */}
              <div id="content-solution" className="tab-content hidden">
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-xl p-8 sm:p-12">
                  <div className="mx-auto max-w-4xl text-center mb-12">
                    <h3 className="text-3xl font-semibold text-[#1F2937] mb-4">
                      Our Approach
                    </h3>
                    <p className="text-lg text-[#6B7280] max-w-3xl mx-auto">
                      Get Claude Code's full power, properly configured
                    </p>
                  </div>
                  <div className="grid gap-4 lg:grid-cols-3 lg:grid-rows-2">
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
              </div>
            </div>
          </div>
        </div>
      </section>

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
                    className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full shadow-lg group-hover:shadow-xl"
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
                    <span className="text-2xl font-bold text-white">1</span>
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
                    className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full shadow-lg group-hover:shadow-xl"
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
                    <span className="text-2xl font-bold text-white">2</span>
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
                    className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full shadow-lg group-hover:shadow-xl"
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
                    <span className="text-2xl font-bold text-white">3</span>
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
            <div className="w-full max-w-none rounded-xl shadow-xl overflow-hidden">
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
              <a href="#" className="flex items-center placeholder-link">
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
                    <a href="#" className="hover:underline placeholder-link">Documentation</a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline placeholder-link">Help Center</a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold text-[#1F2937] uppercase">Legal</h2>
                <ul className="text-[#6B7280] font-medium">
                  <li className="mb-4">
                    <a href="#" className="hover:underline placeholder-link">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline placeholder-link">Terms & Conditions</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <ShineLine className="sm:mx-auto lg:my-8" />
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-[#6B7280] sm:text-center">© 2025 <a href="#" className="hover:underline placeholder-link">No Code Claude</a>. All Rights Reserved.</span>
            <div className="flex mt-4 sm:justify-center sm:mt-0">
              <a href="#" className="text-[#6B7280] hover:text-[#1F2937] placeholder-link">
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 17">
                  <path fillRule="evenodd" d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z" clipRule="evenodd"/>
                </svg>
                <span className="sr-only">Twitter page</span>
              </a>
              <a href="#" className="text-[#6B7280] hover:text-[#1F2937] ms-5 placeholder-link">
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clipRule="evenodd"/>
                </svg>
                <span className="sr-only">GitHub account</span>
              </a>
              <a href="#" className="text-[#6B7280] hover:text-[#1F2937] ms-5 placeholder-link">
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
