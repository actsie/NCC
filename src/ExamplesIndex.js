import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { PlayIcon } from '@heroicons/react/24/solid';
import {
  ChatBubbleLeftRightIcon,
  MagnifyingGlassIcon,
  DocumentTextIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import Header from './components/Header';
import Footer from './components/Footer';
import AnimatedButton from './AnimatedButton';

const examples = [
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

const ExamplesIndex = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
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
          
          {/* Examples Grid - Centered and Larger */}
          <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-16 sm:mt-20 lg:grid-cols-2 lg:gap-20">
            {examples.map((example, index) => (
              <motion.article 
                key={example.id} 
                className="group cursor-pointer p-6 rounded-3xl transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => {
                  // For now, just prevent default - will add routing later
                  console.log(`Clicked ${example.title}`);
                }}
              >
                {/* Video Container - Larger */}
                <div className="relative aspect-video w-full mb-6 overflow-hidden rounded-2xl bg-gray-800">
                  <img 
                    src={example.thumbnailUrl} 
                    alt={example.title}
                    className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Frosted Glass Overlay for Placeholder Effect */}
                  <div className="absolute inset-0 bg-white/20 dark:bg-gray-900/30 backdrop-blur-sm"></div>
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 dark:bg-gray-800/90 rounded-full p-4 backdrop-blur-md">
                      <PlayIcon className="h-8 w-8 text-[#7866CC]" />
                    </div>
                  </div>
                  {/* Coming Soon Badge */}
                  <div className="absolute top-4 right-4 bg-[#7866CC] text-white px-3 py-1.5 rounded-full text-sm font-medium shadow-lg backdrop-blur-sm">
                    Coming Soon ✨
                  </div>
                </div>

                {/* Example Content */}
                <div className="text-center">
                  {/* Category */}
                  <div className="mb-4">
                    <span className="inline-flex items-center gap-x-2 rounded-full bg-gray-50 dark:bg-gray-800 px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
                      <example.icon className="h-4 w-4" />
                      {example.category}
                    </span>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-2xl font-semibold leading-7 text-gray-900 dark:text-white group-hover:text-[#7866CC] transition-colors duration-200">
                    {example.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                    {example.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white">
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
                <AnimatedButton>
                  Get early access
                </AnimatedButton>
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

      {/* Footer */}
      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
};

export default ExamplesIndex;