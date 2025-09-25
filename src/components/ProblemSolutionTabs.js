import { useState } from 'react';
import { motion } from 'framer-motion';
import ShineText from './ShineText';

const problemSolutionTabs = [
  {
    id: 'problems',
    label: 'Why Claude Code is better than other tools',
  },
  {
    id: 'setup',
    label: "Why it's hard to use Claude Code",
  },
  {
    id: 'solution',
    label: 'How We Solve This',
  },
];

const alternativesProblems = [
  {
    name: 'Claude Code is built by Anthropic, the frontier model provider.',
    description: 'Because Claude Code is built by Anthropic, the tokens you can use is a lot more generous than other tools.',
    icon: () => (
      <span className="animate-pulse text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#7866CC] via-[#AF97F8] to-[#7866CC] bg-clip-text text-transparent">*</span>
    ),
  },
  {
    name: 'Claude Code can control your whole computer.',
    description: 'Not only websites, but you can build literally anything from mobile apps, mac apps to just a simple script.',
    icon: () => (
      <span className="animate-pulse text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#7866CC] via-[#AF97F8] to-[#7866CC] bg-clip-text text-transparent">*</span>
    ),
  },
  {
    name: 'Extremely powerful tooling you can add infinitely.',
    description: 'With subagents and MCP, Claude Code makes your code much more robust with fewer problems.',
    icon: () => (
      <span className="animate-pulse text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#7866CC] via-[#AF97F8] to-[#7866CC] bg-clip-text text-transparent">*</span>
    ),
  },
];

const setupChallenges = [
  {
    name: 'Claude.md configuration',
    description: 'Crucial to making Claude behave like an agent — but tricky to get right without deep experience.',
    icon: () => (
      <span className="animate-pulse text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#7866CC] via-[#AF97F8] to-[#7866CC] bg-clip-text text-transparent">*</span>
    ),
  },
  {
    name: 'Complex infrastructure',
    description: 'Requires orchestration across MCP servers, custom testing frameworks, and reliable debugging workflows.',
    icon: () => (
      <span className="animate-pulse text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#7866CC] via-[#AF97F8] to-[#7866CC] bg-clip-text text-transparent">*</span>
    ),
  },
  {
    name: 'Not beginner-friendly',
    description: "It's not just about writing prompts — it's about building a system that responds like a teammate.",
    icon: () => (
      <span className="animate-pulse text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#7866CC] via-[#AF97F8] to-[#7866CC] bg-clip-text text-transparent">*</span>
    ),
  },
];

const ProblemSolutionTabs = () => {
  const [activeTab, setActiveTab] = useState('problems');

  return (
    <section className="relative isolate bg-white dark:bg-gray-900 py-24 sm:py-32">
      {/* Background gradient blob */}
      <div aria-hidden="true" className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div
          style={{
            clipPath:
              'polygon(50% 0%, 55% 25%, 75% 7%, 65% 32%, 100% 25%, 70% 45%, 93% 57%, 62% 62%, 75% 93%, 50% 68%, 25% 93%, 38% 62%, 7% 57%, 30% 45%, 0% 25%, 35% 32%, 25% 7%, 45% 25%)',
          }}
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#AF97F8] to-[#C3B1FA] dark:from-[#5E50A0] dark:to-[#362B6B] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Tab Navigation */}
        <div className="mx-auto max-w-4xl text-center mb-16">
          <h2 className="text-base font-semibold leading-7 text-[#7866CC] dark:text-purple-300">Understanding the Challenge</h2>
          <p
            className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-[#1F2937] dark:text-white sm:text-5xl lg:text-balance flex items-center justify-center flex-wrap"
            style={{ gap: '1.15rem' }}
          >
            Why
            <img
              src="/pawgrammer-logo-purple.svg"
              alt="Pawgrammer"
              className="h-16 sm:h-20 inline"
              style={{ transform: 'translateY(-0.25rem)' }}
            />
            <span style={{ transform: 'translateY(0rem)', marginLeft: '-0.55rem' }}>exists</span>
          </p>
        </div>

        <div className="mx-auto max-w-6xl">
          {/* Tab Buttons */}
          <div className="flex flex-col sm:flex-row justify-center mb-12 gap-2">
            {problemSolutionTabs.map(({ id, label }) => {
              const isActive = activeTab === id;
              return (
                <button
                  key={id}
                  id={`tab-${id}`}
                  type="button"
                  onClick={() => setActiveTab(id)}
                  className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-[#7866CC] dark:text-[#EBE5FD] border-b-2 border-[#7866CC] dark:border-[#EBE5FD] hover:text-[#7866CC] dark:hover:text-[#EBE5FD] tab-active'
                      : 'text-gray-600 dark:text-gray-400 hover:text-[#7866CC] dark:hover:text-[#EBE5FD]'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="relative">
            {/* Problems Tab Content */}
            <div
              id="content-problems"
              className={`tab-content ${activeTab === 'problems' ? '' : 'hidden'}`}
            >
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
                            scale: [1, 1.03, 1],
                          }}
                          transition={{
                            duration: 2.5 + index * 0.3,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: index * 0.6,
                          }}
                          whileHover={{
                            scale: 1.1,
                            y: -5,
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
            <div
              id="content-setup"
              className={`tab-content ${activeTab === 'setup' ? '' : 'hidden'}`}
            >
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
                              index === 0 ? -4 : index === 1 ? 0 : 4,
                            ],
                            scale: [1, 1.04, 1],
                          }}
                          transition={{
                            duration: 3.2 + index * 0.4,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: index * 0.7,
                          }}
                          whileHover={{
                            scale: 1.15,
                            y: -6,
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
            <div
              id="content-solution"
              className={`tab-content ${activeTab === 'solution' ? '' : 'hidden'}`}
            >
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
                              <span className="text-gray-500">#</span>{' '}
                              <span className="relative inline-block px-1 before:absolute before:-inset-0.5 before:block before:rounded before:bg-blue-100">
                                <span className="relative text-blue-700">Expert Infrastructure</span>
                              </span>
                            </p>
                            <p className="ml-3 font-mono text-xs font-normal tracking-wide text-gray-700">
                              <span className="text-gray-500">-</span>{' '}
                              <span className="relative inline-block px-1 before:absolute before:-inset-0.5 before:block before:rounded before:bg-blue-100">
                                <span className="relative text-blue-700">Claude.md configuration</span>
                              </span>{' '}
                              <span className="text-green-600">✓</span>
                            </p>
                            <p className="ml-3 font-mono text-xs font-normal leading-4 tracking-wide text-gray-700">
                              <span className="text-gray-500">-</span>{' '}
                              <span className="relative inline-block px-1 before:absolute before:-inset-0.5 before:block before:rounded before:bg-blue-100">
                                <span className="relative text-blue-700">MCP servers</span>
                              </span>{' '}
                              <span className="text-green-600">✓</span>
                            </p>
                            <p className="ml-3 font-mono text-xs font-normal leading-4 tracking-wide text-gray-700">
                              <span className="text-gray-500">-</span>{' '}
                              <span className="relative inline-block px-1 before:absolute before:-inset-0.5 before:block before:rounded before:bg-blue-100">
                                <span className="relative text-blue-700">Testing framework</span>
                              </span>{' '}
                              <span className="text-green-600">✓</span>
                            </p>
                            <p className="ml-3 font-mono text-xs font-normal leading-4 tracking-wide text-gray-700">
                              <span className="text-gray-500">-</span>{' '}
                              <span className="relative inline-block px-1 before:absolute before:-inset-0.5 before:block before:rounded before:bg-blue-100">
                                <span className="relative text-blue-700">Debugger</span>
                              </span>{' '}
                              <span className="text-green-600">✓</span>
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
  );
};

export default ProblemSolutionTabs;
