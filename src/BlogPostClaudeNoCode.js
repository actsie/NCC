import React from 'react';
import { motion } from 'framer-motion';
import { CheckIcon, ArrowRightIcon, CalendarIcon, UserIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import Header from './components/Header';
import Footer from './components/Footer';

const BlogPostClaudeNoCode = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <Header />

      {/* Blog Post Content */}
      <main className="relative isolate px-6 pt-32 lg:px-8">
        <div className="mx-auto max-w-3xl">
          {/* Blog Header */}
          <header className="mb-16">
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
              <div className="flex items-center space-x-1">
                <CalendarIcon className="h-4 w-4" />
                <time dateTime="2025-01-15">January 15, 2025</time>
              </div>
              <div className="flex items-center space-x-1">
                <UserIcon className="h-4 w-4" />
                <span>Pawgrammer Team</span>
              </div>
            </div>
            
            <motion.h1 
              className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Build Automation That Fits Your Brain — No Code, Powered by Claude
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Tired of rigid tools that don't match how you think? Learn how to build Claude-powered automations using plain language. No code, no templates, just describe what you need.
            </motion.p>
          </header>

          {/* Article Content */}
          <article className="prose prose-lg dark:prose-invert max-w-none">
            
            {/* Opening Section */}
            <section className="mb-16">
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                Your brain works differently than existing apps assume. You need automation that fits your process — not someone else's template.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                Claude makes custom solutions possible — and with <a href="/" className="text-[#7866CC] hover:underline font-medium">Pawgrammer</a>, you can build exactly what you need in 30 minutes, without learning complex tools.
              </p>
            </section>

            {/* Step 1 */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Step 1: Identify What Generic Apps Miss
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Look for these automation gaps in your current workflow:
              </p>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-8">
                <ul className="space-y-4">
                  {[
                    'Tasks you do manually because apps "don\'t quite work"',
                    'Processes where you constantly adjust the tool\'s output',
                    'Workflows that rely on you "remembering" steps software forgets',
                    'Systems that work for others but feel wrong for you'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckIcon className="h-5 w-5 text-[#7866CC] flex-shrink-0 mt-1" />
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="p-4 bg-[#F3F4F6] dark:bg-gray-800 rounded-lg border-l-4 border-[#7866CC] mb-8">
                <p className="text-gray-700 dark:text-gray-300 font-medium">
                  👉 Your frustration with existing tools is the perfect starting point.
                </p>
              </div>
            </section>

            {/* Step 2 */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Step 2: Build Your Custom Solution with Natural Language
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                <a href="/" className="text-[#7866CC] hover:underline font-medium">Pawgrammer</a> works differently than other builders. Instead of forcing you into rigid templates, you simply describe what you need:
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Traditional No-Code:</h3>
                  <ul className="space-y-2">
                    {[
                      'Connect multiple apps',
                      'Build complex logic flows',
                      'Force your process into rigid templates'
                    ].map((item, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <div className="h-2 w-2 bg-red-400 rounded-full flex-shrink-0"></div>
                        <span className="text-gray-600 dark:text-gray-400 line-through">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">With Pawgrammer:</h3>
                  <div className="flex items-center space-x-3">
                    <CheckIcon className="h-5 w-5 text-[#7866CC] flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">Describe what you need in plain language</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg border border-gray-200 dark:border-gray-700 mb-8">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4 text-lg">Real Example:</h4>
                <blockquote className="text-gray-700 dark:text-gray-300 italic text-xl leading-relaxed mb-4 border-l-4 border-[#7866CC] pl-4">
                  "I need to track freelance invoices with photos, auto-reminders that match my schedule, and notes about payment history."
                </blockquote>
                <p className="text-[#7866CC] font-semibold text-lg">
                  You describe it. Pawgrammer builds it.
                </p>
              </div>
            </section>

            {/* Step 3 */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Step 3: Test With Your Real Workflow
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Your Claude-powered tool adapts to you, not the other way around:
              </p>
              
              <div className="bg-gradient-to-br from-[#7866CC]/10 to-[#BEAEE2]/10 p-8 rounded-lg mb-8">
                <ul className="space-y-4">
                  {[
                    'Follows your preferred organization method',
                    'Matches your timing and reminders',
                    'Includes the specific data you care about',
                    'Thinks about the problem the way you do'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckIcon className="h-5 w-5 text-[#7866CC] flex-shrink-0 mt-1" />
                      <span className="text-gray-700 dark:text-gray-300 text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                  No adapting to software logic. The tool adapts to yours.
                </p>
              </div>
            </section>

            {/* Step 4 */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Step 4: Refine Until It's Perfect
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">The Refinement Process:</h3>
                  <ul className="space-y-4">
                    {[
                      'Use it with real data',
                      'Tweak the logic',
                      'Adjust the interface',
                      'Keep refining until it fits perfectly'
                    ].map((item, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <div className="h-3 w-3 bg-[#7866CC] rounded-full flex-shrink-0"></div>
                        <span className="text-gray-700 dark:text-gray-300 text-lg">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex items-center justify-center">
                  <div className="text-center p-6 bg-gradient-to-br from-[#7866CC]/10 to-[#BEAEE2]/10 rounded-lg">
                    <p className="text-xl font-semibold text-gray-900 dark:text-white leading-relaxed">
                      It's your automation — built around how you think, not how apps expect you to.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Why It Works Better */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
                Why This Approach Works Better Than Generic Apps
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-12">
                {[
                  'Powered by Claude\'s natural language understanding',
                  'No steep learning curve',
                  'No monthly fees for bloated features you don\'t use',
                  'Built in 30 minutes — not 30 days of setup'
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="flex items-start space-x-3 p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm"
                  >
                    <CheckIcon className="h-5 w-5 text-[#7866CC] flex-shrink-0 mt-1" />
                    <span className="text-gray-700 dark:text-gray-300 text-lg">{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="text-center p-8 bg-gradient-to-r from-[#7866CC]/5 via-[#BEAEE2]/5 to-[#7866CC]/5 rounded-lg">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  Generic apps assume everyone thinks the same. 
                  <br />
                  <a href="/" className="text-[#7866CC] hover:underline">Pawgrammer</a> builds around how you think.
                </p>
              </div>
            </section>

            {/* Why Claude Section */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Why Claude Is Perfect for Personal Automation
              </h2>
              
              <div className="space-y-6 mb-8">
                {[
                  {
                    title: 'Understands natural language instructions',
                    description: 'No need to learn complex syntax or logic builder interfaces'
                  },
                  {
                    title: 'Handles custom logic with fewer edge-case failures',
                    description: 'Claude can reason through nuanced situations that break traditional automation'
                  },
                  {
                    title: 'Follows nuanced steps and routines',
                    description: 'Captures the subtle decision-making process that makes your workflow unique'
                  },
                  {
                    title: 'Works reliably for both personal and business use',
                    description: 'Scales from simple personal tasks to complex business processes'
                  }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="p-6 bg-gradient-to-r from-[#7866CC]/5 to-transparent rounded-lg border-l-4 border-[#7866CC]"
                  >
                    <h3 className="font-semibold text-gray-900 dark:text-white text-xl mb-2">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-lg">{item.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Call to Action */}
            <section className="mb-16 text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Ready to Build Automation That Actually Fits Your Brain?
              </h2>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg mb-8">
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                  We're in beta — and building alongside users who think differently than mainstream apps expect.
                </p>
                
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    <a href="/" className="text-[#7866CC] hover:underline">Pawgrammer</a> is perfect for:
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto text-left">
                    {[
                      'Freelancers with unique tracking needs',
                      'Small business owners with custom workflows',
                      'Creators and thinkers who "don\'t fit the template"',
                      'Anyone frustrated by "almost right" tools'
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckIcon className="h-5 w-5 text-[#7866CC] flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <a
                    href="/"
                    className="inline-flex items-center rounded-md bg-[#7866CC] px-8 py-4 text-lg font-semibold text-white shadow-sm hover:bg-[#6B5B95] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7866CC] transition-colors duration-200"
                  >
                    Get Started with Pawgrammer
                    <ArrowRightIcon className="ml-2 h-5 w-5" />
                  </a>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Join the waitlist and be among the first to build automation that thinks like you do.
                  </p>
                </div>
              </div>
            </section>

            {/* Related Links */}
            <section className="border-t border-gray-200 dark:border-gray-700 pt-8 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Learn More:</h3>
              <div className="flex flex-wrap gap-4">
                <a href="/" className="text-[#7866CC] hover:underline font-medium">
                  Home
                </a>
                <a href="/#features" className="text-[#7866CC] hover:underline font-medium">
                  See All Features
                </a>
                <a href="/#how-it-works" className="text-[#7866CC] hover:underline font-medium">
                  How Pawgrammer Works
                </a>
              </div>
            </section>

            {/* Breadcrumb Navigation */}
            <nav className="mb-8" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <li>
                  <a href="/" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <ChevronRightIcon className="h-4 w-4 text-gray-400" />
                </li>
                <li>
                  <a href="/blog" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <ChevronRightIcon className="h-4 w-4 text-gray-400" />
                </li>
                <li className="text-gray-700 dark:text-gray-300 font-medium">
                  Build Automation That Fits Your Brain
                </li>
              </ol>
            </nav>

          </article>
        </div>
      </main>

      {/* Footer */}
      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
};

export default BlogPostClaudeNoCode;