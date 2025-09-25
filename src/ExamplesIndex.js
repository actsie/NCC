import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { PlayIcon } from '@heroicons/react/24/solid';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import {
  ChatBubbleLeftRightIcon,
  MagnifyingGlassIcon,
  DocumentTextIcon,
  ChartBarIcon,
  ClipboardDocumentListIcon,
} from '@heroicons/react/24/outline';
import Header from './components/Header';
import Footer from './components/Footer';
import EnhancedButton from './EnhancedButton';
import FeaturedTool from './components/FeaturedTool';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const examples = [
  {
    id: 0,
    title: 'Job Application Tracker',
    description: 'Track applications, interviews, and follow-ups in one place — private and local (web demo is just for preview)',
    slug: 'job-application-tracker',
    category: 'Productivity',
    icon: ClipboardDocumentListIcon,
    videoId: 'pGNIEEcD3f8', // Actual video ID
    thumbnailUrl: 'https://i.ytimg.com/vi/pGNIEEcD3f8/maxresdefault.jpg',
  },
  {
    id: 1,
    title: 'Feedback Processor',
    description: 'Cut through the noise. Instantly surface what matters, what\'s blocked, and who needs to decide.',
    slug: 'feedback-processor',
    category: 'Automation',
    icon: ChatBubbleLeftRightIcon,
    videoUrl: '/placeholder-video-1.mp4', // Placeholder for now
    thumbnailUrl: '/no-code-claude-professional-setup.png',
  },
  {
    id: 2,
    title: 'X Discovery Bot',
    description: 'Find and engage with relevant conversations on X/Twitter',
    slug: 'x-discovery-bot',
    category: 'Social Media',
    icon: MagnifyingGlassIcon,
    videoUrl: '/placeholder-video-2.mp4', // Placeholder for now
    thumbnailUrl: '/betterUI.png',
  },
  {
    id: 3,
    title: 'Negative Visualization Journal',
    description: 'Daily prompts for stoic reflection and gratitude practice',
    slug: 'negative-visualization',
    category: 'Productivity',
    icon: DocumentTextIcon,
    videoUrl: '/placeholder-video-3.mp4', // Placeholder for now
    thumbnailUrl: '/ncc-same-ai-better-ui.png',
  },
  {
    id: 4,
    title: 'Goal Tracker',
    description: 'Smart progress tracking with automated check-ins',
    slug: 'goal-tracker',
    category: 'Analytics',
    icon: ChartBarIcon,
    videoUrl: '/placeholder-video-4.mp4', // Placeholder for now
    thumbnailUrl: '/no-code-claude-professional-setup.png',
  },
];

const ExamplesIndex = ({ navigateToChatInterface }) => {
  // State to track the active slide and swiper instance
  const [activeSlide, setActiveSlide] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState(null);
  const [selectedFromDropdown, setSelectedFromDropdown] = useState(false);
  const activeExample = examples[activeSlide];

  // Function to handle slide clicks
  const handleSlideClick = (index) => {
    if (swiperInstance && index !== activeSlide) {
      swiperInstance.slideToLoop(index);
      setSelectedFromDropdown(false); // Clear dropdown selection when user manually navigates
    }
  };

  // Function to handle video play button clicks
  const handleVideoClick = (example, event) => {
    event.stopPropagation(); // Prevent slide click
    if (example.videoId) {
      setCurrentVideoId(example.videoId);
      setVideoModalOpen(true);
    }
  };

  // Handle URL parameters to focus specific tool
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const toolParam = urlParams.get('tool');

    if (toolParam) {
      // Find the example with matching slug
      const targetExample = examples.find(example => example.slug === toolParam);
      if (targetExample) {
        setActiveSlide(targetExample.id);
        setSelectedFromDropdown(true);
        // If swiper is ready, slide to the target
        if (swiperInstance) {
          swiperInstance.slideToLoop(targetExample.id);
        }

        // Scroll to the tool details section after a brief delay
        setTimeout(() => {
          const toolDetailsSection = document.getElementById('tool-details');
          if (toolDetailsSection) {
            const yOffset = -80; // Account for header height
            const y = toolDetailsSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        }, 500);

        // Clear the URL parameter after processing to clean up URL
        setTimeout(() => {
          const newUrl = window.location.pathname;
          window.history.replaceState({}, document.title, newUrl);
        }, 1000);
      }
    }
  }, [swiperInstance]);

  // Also handle when swiper instance changes
  useEffect(() => {
    if (swiperInstance) {
      const urlParams = new URLSearchParams(window.location.search);
      const toolParam = urlParams.get('tool');

      if (toolParam) {
        const targetExample = examples.find(example => example.slug === toolParam);
        if (targetExample) {
          swiperInstance.slideToLoop(targetExample.id);

          // Scroll to the tool details section
          setTimeout(() => {
            const toolDetailsSection = document.getElementById('tool-details');
            if (toolDetailsSection) {
              const yOffset = -80; // Account for header height
              const y = toolDetailsSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
              window.scrollTo({ top: y, behavior: 'smooth' });
            }
          }, 500);
        }
      }
    }
  }, [swiperInstance]);

  // Schema markup for SEO
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Job Application Tracker",
    "applicationCategory": "ProductivityApplication",
    "operatingSystem": "Web",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "url": "https://jobapplication.pawgrammer.com/",
    "screenshot": "https://i.ytimg.com/vi/pGNIEEcD3f8/maxresdefault.jpg"
  };

  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": "Job Application Tracker Demo",
    "description": "Overview and quick demo of the Job Application Tracker tool.",
    "thumbnailUrl": ["https://i.ytimg.com/vi/pGNIEEcD3f8/maxresdefault.jpg"],
    "contentUrl": "https://www.youtube.com/watch?v=pGNIEEcD3f8",
    "embedUrl": "https://www.youtube-nocookie.com/embed/pGNIEEcD3f8"
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Shine Border Demo Button Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .shine-demo-button {
            position: relative;
            display: inline-flex;
            align-items: center;
            padding: 10px 16px;
            border-radius: 12px;
            background: linear-gradient(135deg, #ffffff, #f9fafb);
            color: #1f2937;
            text-decoration: none;
            font-weight: 500;
            font-size: 0.875rem;
            overflow: hidden;
            transition: all 0.2s ease;
            border: 1px solid rgba(120, 102, 204, 0.3);
          }

          .shine-demo-button:hover {
            transform: translateY(-1px);
            box-shadow: 0 10px 25px rgba(120, 102, 204, 0.1);
          }

          .shine-border-mask {
            position: absolute;
            inset: 0;
            border-radius: inherit;
            padding: 1.5px;
            mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
            -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
            mask-composite: exclude;
            -webkit-mask-composite: xor;
            pointer-events: none;
          }

          .shine-border-glow {
            background: conic-gradient(
              from 0deg,
              transparent 0%,
              rgba(120, 102, 204, 0.4) 8%,
              rgba(175, 151, 248, 0.3) 12%,
              transparent 18%
            );
            position: absolute;
            inset: -150px;
            animation: rotateShine 4s linear infinite;
          }

          @keyframes rotateShine {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }

          .shine-demo-button:hover .shine-border-glow {
            animation-play-state: paused;
          }

          .dark .shine-demo-button {
            background: linear-gradient(135deg, #1f2937, #374151);
            color: #ffffff;
            border-color: rgba(190, 174, 226, 0.3);
          }

          .dark .shine-demo-button:hover {
            box-shadow: 0 10px 25px rgba(120, 102, 204, 0.2);
          }

          .dark .shine-border-glow {
            background: conic-gradient(
              from 0deg,
              transparent 0%,
              rgba(190, 174, 226, 0.7) 10%,
              rgba(175, 151, 248, 0.5) 15%,
              transparent 20%
            );
          }

          @media (prefers-reduced-motion: reduce) {
            .shine-border-glow {
              animation: none;
            }
          }

          .shine-demo-button:focus {
            outline: 2px solid rgba(120, 102, 204, 0.5);
            outline-offset: 2px;
          }
        `
      }} />
      {/* Schema markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
      />

      {/* Custom Swiper Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .tools-carousel .swiper-slide {
            height: auto;
            transition: transform 0.3s ease;
          }

          .tools-carousel .swiper-slide-active {
            transform: scale(1.05);
          }

          .tools-carousel .swiper-slide:not(.swiper-slide-active) {
            opacity: 0.7;
          }

          .tools-carousel .swiper-slide-active {
            opacity: 1;
          }

          @media (max-width: 1024px) {
            .tools-carousel .swiper-slide-active {
              transform: scale(1.02);
            }
          }

          @media (max-width: 640px) {
            .tools-carousel .swiper-slide-active {
              transform: scale(1);
            }

            .tools-carousel .swiper-slide:not(.swiper-slide-active) {
              opacity: 1;
            }
          }

          /* Custom navigation button styles */
          .swiper-button-prev-custom:hover,
          .swiper-button-next-custom:hover {
            transform: translateY(-50%) scale(1.1);
          }

          /* Ensure buttons don't interfere with slides */
          .swiper-button-prev-custom,
          .swiper-button-next-custom {
            pointer-events: auto;
          }

          /* Accessibility: Respect reduced motion preference */
          @media (prefers-reduced-motion: reduce) {
            .tools-carousel .swiper-slide {
              transition: none;
            }
            .tools-carousel .swiper-slide-active {
              transform: none;
            }
          }
        `
      }} />
      {/* Header */}
      <Header />

      {/* Examples Content */}
      <div className="py-32 sm:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav className="mx-auto max-w-4xl mb-8 text-center" aria-label="Breadcrumb">
            <ol className="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <li>
                <a href="/" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <ChevronRightIcon className="h-4 w-4 text-gray-400 dark:text-gray-500" />
              </li>
              <li className="text-gray-700 dark:text-gray-300 font-medium">
                Examples
              </li>
            </ol>
          </nav>

          {/* Examples Header - Centered */}
          <div className="mx-auto max-w-4xl text-center">
            <motion.h1 
              className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Custom Tools in Action
            </motion.h1>
            <motion.p 
              className="mt-2 text-lg text-gray-600 dark:text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Real solutions built for how people actually work.
            </motion.p>
          </div>
          
          {/* Featured Tool Section */}
          <div className="mt-16 sm:mt-20">
            <FeaturedTool
              title="Job Application Tracker"
              oneLiner="Track applications, interviews, and follow-ups in one place — private and local (web demo is just for preview)"
              videoId="pGNIEEcD3f8"
              demoUrl="https://jobapplication.pawgrammer.com/"
              badge="NEW"
            />
          </div>

          {/* Tools Carousel Section */}
          <section aria-labelledby="tools-carousel" className="mt-16 sm:mt-20">
            <div className="mx-auto max-w-4xl text-center mb-12">
              <h2 id="tools-carousel" className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                More Tools in Development
              </h2>
              <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
                Interactive tools being built for real workflows
              </p>
            </div>

            {/* Swiper Container with External Navigation */}
            <div className="mx-auto max-w-7xl relative px-16 xl:px-20">
              {/* Custom Navigation Buttons - Positioned Outside */}
              <button className="swiper-button-prev-custom absolute -left-4 xl:-left-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 p-3 hidden xl:flex shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] items-center justify-center border border-gray-300 dark:border-gray-600 rounded-lg group hover:bg-gray-900 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out">
                <svg className="text-gray-900 dark:text-gray-300 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M12.5002 14.9999L7.50005 9.99973L12.5032 4.99658" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button className="swiper-button-next-custom absolute -right-4 xl:-right-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 p-3 hidden xl:flex shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] items-center justify-center border border-gray-300 dark:border-gray-600 rounded-lg group hover:bg-gray-900 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out">
                <svg className="text-gray-900 dark:text-gray-300 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7.50301 4.99637L12.5032 9.99657L7.50006 14.9997" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {/* Swiper Container */}
              <div className="max-w-6xl mx-auto">
                <Swiper
                  modules={[Navigation]}
                  spaceBetween={20}
                  slidesPerView={3}
                  centeredSlides={true}
                  loop={true}
                  onSwiper={setSwiperInstance}
                  onSlideChange={(swiper) => {
                    // Get the real index (accounting for loop)
                    const realIndex = swiper.realIndex;
                    setActiveSlide(realIndex);
                    setSelectedFromDropdown(false); // Clear dropdown selection when slide changes
                  }}
                  navigation={{
                    nextEl: '.swiper-button-next-custom',
                    prevEl: '.swiper-button-prev-custom',
                  }}
                  breakpoints={{
                    320: {
                      slidesPerView: 1,
                      spaceBetween: 15
                    },
                    640: {
                      slidesPerView: 2,
                      spaceBetween: 15
                    },
                    1024: {
                      slidesPerView: 3,
                      spaceBetween: 20
                    }
                  }}
                  className="tools-carousel"
                >
                  {examples.map((example, index) => (
                    <SwiperSlide key={example.id}>
                      <motion.div
                        className="group cursor-pointer p-6 rounded-3xl transition-all duration-300"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        onClick={() => handleSlideClick(example.id)}
                      >
                        {/* Video Container */}
                        <div className="relative aspect-video w-full mb-6 overflow-hidden rounded-2xl bg-gray-800">
                          <img
                            src={example.thumbnailUrl}
                            alt={example.title}
                            className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                          />
                          {/* Frosted Glass Overlay for Placeholder Effect - Only for Coming Soon tools */}
                          {example.id !== 0 && (
                            <div className="absolute inset-0 bg-white/20 dark:bg-gray-900/30 backdrop-blur-sm"></div>
                          )}

                          {/* Play Button Overlay */}
                          <div
                            className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            onClick={(e) => handleVideoClick(example, e)}
                          >
                            <div className="bg-white/90 dark:bg-gray-800/90 rounded-full p-4 backdrop-blur-md">
                              <PlayIcon className="h-8 w-8 text-[#7866CC]" />
                            </div>
                          </div>

                          {/* Coming Soon Badge - Only for placeholder tools */}
                          {example.id !== 0 && (
                            <div className="absolute top-4 right-4 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-full text-sm font-medium shadow-lg backdrop-blur-sm">
                              Coming Soon ✨
                            </div>
                          )}

                          {/* NEW Badge for Job Application Tracker */}
                          {example.id === 0 && (
                            <div className="absolute top-4 right-4 bg-[#7866CC] text-white px-3 py-1.5 rounded-full text-sm font-medium shadow-lg">
                              NEW ✨
                            </div>
                          )}
                        </div>

                        {/* Tool Content */}
                        <div className="text-center">
                          {/* Category */}
                          <div className="mb-4">
                            <span className="inline-flex items-center gap-x-2 rounded-full bg-gray-50 dark:bg-gray-800 px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
                              {React.createElement(example.icon, { className: "h-4 w-4" })}
                              {example.category}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="text-xl font-semibold leading-7 text-gray-900 dark:text-white group-hover:text-[#7866CC] transition-colors duration-200">
                            {example.title}
                          </h3>

                          {/* Description */}
                          <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-400 max-w-sm mx-auto">
                            {example.description}
                          </p>
                        </div>
                      </motion.div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </section>

          {/* Dynamic Tool Dashboard Section */}
          <section aria-labelledby="tool-details" className="mt-16 sm:mt-20">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  {/* Hero Section */}
                  <div className={`relative overflow-hidden rounded-3xl bg-gray-100/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-white/10 shadow-lg dark:shadow-xl px-8 py-12 sm:px-12 sm:py-16 transition-all duration-500 ${
                    selectedFromDropdown
                      ? 'ring-2 ring-[#7866CC]/30 shadow-2xl shadow-[#7866CC]/10'
                      : ''
                  }`}>
                    {/* Liquid Glass Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 dark:from-white/5 dark:to-white/10"></div>

                    {/* Dropdown Selection Indicator */}
                    {selectedFromDropdown && (
                      <div className="absolute top-4 right-4 flex items-center gap-2 bg-[#7866CC]/10 dark:bg-[#7866CC]/20 backdrop-blur-sm border border-[#7866CC]/30 rounded-full px-3 py-1.5 animate-in fade-in duration-300">
                        <div className="w-2 h-2 bg-[#7866CC] rounded-full animate-pulse"></div>
                        <span className="text-xs font-medium text-[#7866CC] dark:text-[#BEAEE2]">From menu</span>
                      </div>
                    )}

                    <div className="relative">
                      {activeExample.id === 0 ? (
                        /* Job Application Tracker - Two Column Layout */
                        <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
                          {/* Left Content */}
                          <div className="lg:w-2/3">
                            {/* Category Badge */}
                            <div className="mb-4">
                              <span className="inline-flex items-center gap-x-2 rounded-full bg-[#7866CC] px-4 py-2 text-sm font-medium text-white">
                                {React.createElement(activeExample.icon, { className: "h-5 w-5" })}
                                {activeExample.category}
                              </span>
                            </div>

                            {/* Title & Description */}
                            <h2 id="tool-details" className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-4">
                              {activeExample.title}
                            </h2>
                            <p className="text-xl text-gray-700 dark:text-gray-200 mb-4 leading-relaxed">
                              Your personal job search command center
                            </p>
                            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                              A job tracker that turns scattered resumes, lost postings, and missed follow-ups into one clear system. Everything you need to track applications, manage resumes, and stay on top of deadlines in one place.
                            </p>
                          </div>

                          {/* Right Video Thumbnail */}
                          <div className="lg:w-1/3">
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => {
                                setCurrentVideoId(activeExample.videoId);
                                setVideoModalOpen(true);
                              }}
                              className="group relative block w-full overflow-hidden rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#7866CC]/20"
                              aria-label="Play Job Application Tracker demo video"
                            >
                              <div className="aspect-video bg-gray-900 rounded-2xl overflow-hidden">
                                <img
                                  src={`https://i.ytimg.com/vi/${activeExample.videoId}/maxresdefault.jpg`}
                                  alt="Job Application Tracker demo video thumbnail"
                                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                  loading="lazy"
                                />
                              </div>
                              {/* Glass Morphism Overlay */}
                              <div className="absolute inset-0 bg-white/10 dark:bg-gray-900/20 backdrop-blur-md border border-white/20 dark:border-white/10 group-hover:bg-white/5 dark:group-hover:bg-gray-900/10 transition-all duration-300 rounded-2xl"></div>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="rounded-full bg-white/20 dark:bg-gray-800/30 backdrop-blur-lg border border-white/30 dark:border-white/20 p-4 shadow-2xl group-hover:bg-white/30 dark:group-hover:bg-gray-800/40 group-hover:scale-110 transition-all duration-300">
                                  <PlayIcon className="h-8 w-8 text-[#7866CC] drop-shadow-lg" />
                                </div>
                              </div>
                            </motion.button>
                          </div>
                        </div>
                      ) : (
                        /* Other Tools - Single Column Layout */
                        <div>
                          {/* Category Badge */}
                          <div className="mb-4">
                            <span className="inline-flex items-center gap-x-2 rounded-full bg-[#7866CC] px-4 py-2 text-sm font-medium text-white">
                              {React.createElement(activeExample.icon, { className: "h-5 w-5" })}
                              {activeExample.category}
                            </span>
                          </div>

                          {/* Title & Description */}
                          <h2 id="tool-details" className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-4">
                            {activeExample.title}
                          </h2>
                          <p className="text-xl text-gray-700 dark:text-gray-200 max-w-3xl leading-relaxed">
                            {activeExample.description}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Main Content Grid - Material Tailwind Style */}
                  <div className="mt-12 space-y-8">
                    {activeExample.id === 0 ? (
                      <>
                        {/* First Row - Mixed Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                          {/* Track Applications - Single Column */}
                          <div className="col-span-1 bg-gray-100/50 dark:bg-gray-800/50 rounded-2xl overflow-hidden">
                            <div className="p-8 text-center">
                              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                Track Applications
                              </h4>
                              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-xs mx-auto">
                                Smart pipeline with deduplication and follow-up reminders
                              </p>
                              <img
                                src="/examples/job-app-tracker/track-applications.png"
                                alt="Application Tracker"
                                className="w-full h-[280px] object-cover object-left translate-y-8 rounded-lg dark:border dark:border-gray-600"
                              />
                            </div>
                          </div>

                          {/* Resume Management - Double Column */}
                          <div className="col-span-2 bg-gray-100/50 dark:bg-gray-800/50 rounded-2xl overflow-hidden">
                            <div className="p-8 text-center">
                              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                Resume Version Control
                              </h4>
                              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-sm mx-auto">
                                Full history, auto-naming, and version control for every resume sent
                              </p>
                              <img
                                src="/examples/job-app-tracker/resume-management.png"
                                alt="Resume Management"
                                className="w-full h-[280px] object-cover object-left translate-y-8 rounded-lg dark:border dark:border-gray-600"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Second Row - Reversed Mixed Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                          {/* Data Privacy - Double Column */}
                          <div className="col-span-2 bg-gray-100/50 dark:bg-gray-800/50 rounded-2xl overflow-hidden">
                            <div className="p-8 text-center">
                              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                Privacy-First Design
                              </h4>
                              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-sm mx-auto">
                                Local-first storage, CSV export, no vendor lock-in or data harvesting
                              </p>
                              <img
                                src="/examples/job-app-tracker/privacy-features.png"
                                alt="Privacy Features"
                                className="w-full h-[260px] object-cover object-top translate-y-4 rounded-lg dark:border dark:border-gray-600"
                              />
                            </div>
                          </div>

                          {/* Build Story Card - Single Column */}
                          <div className="col-span-1 bg-gray-100/50 dark:bg-gray-800/50 rounded-2xl overflow-hidden">
                            <div className="p-8 text-center h-full flex flex-col">
                              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                The full build story
                              </h4>
                              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-xs mx-auto text-sm">
                                Born from 90+ Reddit replies about job tracking pain points
                              </p>

                              {/* Single Image */}
                              <div className="flex-1 flex items-center justify-center">
                                <img
                                  src="/examples/job-app-tracker/job-app-tracker.png"
                                  alt="Job App Tracker Build Story"
                                  className="w-full h-auto max-h-[200px] object-cover object-center rounded-lg"
                                />
                              </div>

                              {/* Bottom Content */}
                              <div className="mt-6 space-y-3">
                                <p className="text-xs font-bold text-gray-900 dark:text-white">
                                  ~20 hours built
                                </p>
                                <a
                                  href="/blog/how-job-seekers-track-applications"
                                  className="inline-flex items-center text-xs text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 transition-colors"
                                >
                                  Read the full build story
                                  <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Call to Action - Full Width */}
                        <div className="bg-gray-100/50 dark:bg-gray-800/50 rounded-2xl p-12 text-center">
                          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Ready to try it out?</h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg max-w-2xl mx-auto">
                            Explore the demo and start building your own tracker now.
                          </p>

                          {/* Feature Update Section - Two Cards Layout */}
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 max-w-4xl mx-auto">
                            {/* Left Card - Feature Info */}
                            <div className="bg-white dark:bg-gray-900/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                              <div className="flex items-center justify-center lg:justify-start mb-4">
                                <span className="text-white text-xs font-semibold px-3 py-1 rounded-full" style={{background: 'linear-gradient(to right, #7866CC, #9B7EF7, #AF97F8)'}}>
                                  Feature Update
                                </span>
                              </div>
                              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center lg:text-left">Calendar Integration</h4>
                              <p className="text-gray-600 dark:text-gray-400 mb-6 text-center lg:text-left">
                                Add follow-up reminders directly to your calendar:
                              </p>
                              <div className="space-y-3 text-center lg:text-left">
                                <div className="text-gray-700 dark:text-gray-300">
                                  <span>✨ Export to Calendar (.ics)</span>
                                </div>
                                <div className="text-gray-700 dark:text-gray-300">
                                  <span>✨ Add to Google Calendar</span>
                                </div>
                              </div>
                            </div>

                            {/* Right Card - GIF Demo */}
                            <div className="bg-white dark:bg-gray-900/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                              <div className="text-center">
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">AI-assisted improvements:</p>
                                <a
                                  href="/addcalfeature.gif"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-block cursor-pointer hover:opacity-80 transition-opacity duration-200 hover:scale-105 transform transition-transform"
                                >
                                  <img
                                    src="/addcalfeature.gif"
                                    alt="Calendar integration demo - click to view larger"
                                    className="rounded-lg shadow-lg w-full h-auto mx-auto"
                                  />
                                </a>
                              </div>
                            </div>
                          </div>

                          <a
                            href="https://jobapplication.pawgrammer.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shine-demo-button"
                          >
                            <div className="shine-border-mask">
                              <div className="shine-border-glow"></div>
                            </div>
                            <span className="relative z-10">Launch Demo</span>
                          </a>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-12">
                        <div className="text-gray-400 mb-4">
                          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-400 mb-2">Coming Soon</h3>
                        <p className="text-gray-500">This tool is currently in development</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </section>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
            <svg
              viewBox="0 0 1024 1024"
              aria-hidden="true"
              className="absolute top-1/2 right-0 -z-10 size-256 -translate-y-1/2 translate-x-1/2 mask-[radial-gradient(closest-side,white,transparent)] blur-3xl"
            >
              <circle r={512} cx={512} cy={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
              <defs>
                <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                  <stop stopColor="#7866CC" />
                  <stop offset={1} stopColor="#AF97F8" />
                </radialGradient>
              </defs>
            </svg>
            <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
              <h2 className="text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">
                Join the Beta -<br />Build Your Custom Tool
              </h2>
              <p className="mt-6 text-lg/8 text-pretty text-gray-300">
                For when existing apps almost work, but not quite.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                <EnhancedButton
                  navigateToChat={true}
                  navigateToChatInterface={() => {
                    // Navigate to home page and trigger chat interface
                    sessionStorage.setItem('triggerChatInterface', 'true');
                    window.location.href = '/';
                  }}
                >
                  Get early access
                </EnhancedButton>
                <a href="/#features" className="text-sm/6 font-semibold text-white hover:text-gray-100">
                  Learn more <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
            <div className="relative mt-16 h-80 lg:mt-8">
              {/* Bottom layer */}
              <img
                alt="Expert infrastructure setup"
                src="/no-code-claude-professional-setup.png"
                width={1824}
                height={1080}
                className="absolute top-0 left-0 w-80 max-w-none rounded-md bg-white/5 ring-1 ring-white/10 z-10"
              />
              {/* Middle layer */}
              <img
                alt="Better UI interface"
                src="/ncc-same-ai-better-ui.png"
                width={1824}
                height={1080}
                className="absolute top-4 left-44 w-80 max-w-none rounded-md bg-white/5 ring-1 ring-white/10 z-20"
              />
              {/* Top layer */}
              <img
                alt="Project outcome"
                src="/project_outcome.png"
                width={1824}
                height={1080}
                className="absolute top-8 left-24 w-80 max-w-none rounded-md bg-white/5 ring-1 ring-white/10 z-30"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {videoModalOpen && currentVideoId && (
          <Dialog open={videoModalOpen} onClose={() => setVideoModalOpen(false)} className="relative z-50">
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              aria-hidden="true"
            />
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4">
                <DialogPanel
                  as={motion.div}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="w-full max-w-5xl overflow-hidden rounded-2xl bg-white dark:bg-gray-900 shadow-2xl ring-1 ring-black/10 dark:ring-white/10"
                >
                  <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 p-4">
                    <DialogTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                      {activeExample?.title} — Demo Video
                    </DialogTitle>
                    <button
                      className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#7866CC] transition-colors duration-200"
                      onClick={() => setVideoModalOpen(false)}
                      aria-label="Close video modal"
                    >
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>
                  <div className="aspect-video">
                    <iframe
                      title={`${activeExample?.title} demo video`}
                      src={`https://www.youtube-nocookie.com/embed/${currentVideoId}?autoplay=1&modestbranding=1&rel=0`}
                      allow="autoplay; encrypted-media; picture-in-picture; web-share"
                      allowFullScreen
                      className="h-full w-full"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </DialogPanel>
              </div>
            </div>
          </Dialog>
        )}
      </AnimatePresence>

      {/* Footer */}
      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
};

export default ExamplesIndex;