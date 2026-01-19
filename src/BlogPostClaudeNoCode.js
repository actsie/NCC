import React, { useState } from 'react';
import { CheckIcon, CalendarIcon, UserIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import Header from './components/Header';
import Footer from './components/Footer';
import BlogButton from './BlogButton';
import { getBlogPostBySlug } from './data/blogPosts';
import EarlyAccessModal from './components/EarlyAccessModal';

const BlogPostClaudeNoCode = () => {
  const [isEarlyAccessModalOpen, setIsEarlyAccessModalOpen] = useState(false);
  const post = getBlogPostBySlug('build-custom-ai-workflows-without-code');
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <Header />

      {/* Blog Post Content */}
      <main className="relative isolate px-6 pt-32 lg:px-8">
        <div className="mx-auto max-w-2xl">
          {/* Blog Header */}
          <header className="mb-12">
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
              <div className="flex items-center space-x-1">
                <CalendarIcon className="h-4 w-4" />
                <time dateTime={post.datetime}>{post.date}</time>
              </div>
              <div className="flex items-center space-x-1">
                <UserIcon className="h-4 w-4" />
                <span>{post.author.name}</span>
              </div>
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
              {post.title}
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              {post.metaDescription}
            </p>
          </header>

          {/* Article Content */}
          <article className="prose prose-lg dark:prose-invert max-w-none space-y-6">
            
            {/* Step 1 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                Step 1 — Document Your Actual Workflow
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Start with one specific problem:
              </p>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-8">
                <ul className="space-y-4">
                  <li className="text-gray-700 dark:text-gray-300">A task you do manually because existing apps "don't quite work"</li>
                  <li className="text-gray-700 dark:text-gray-300">A process where you constantly adjust the tool's output</li>
                  <li className="text-gray-700 dark:text-gray-300">Something that requires you to "remember" extra steps</li>
                </ul>
              </div>
              
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border-l-4 border-[#7866CC] mb-8">
                <p className="text-gray-700 dark:text-gray-300 font-medium">
                  👉 Be specific about your exact process — not what you think it should be.
                </p>
              </div>
            </section>

            {/* Step 2 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                Step 2 — Describe It in Natural Language
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Unlike traditional automation tools that require connecting apps and setting triggers, AI tools work with plain descriptions.
              </p>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Example:</h3>
                <blockquote className="text-gray-700 dark:text-gray-300 italic text-lg leading-relaxed mb-4 border-l-4 border-[#7866CC] pl-4">
                  "I need to track freelance invoices by taking photos, setting custom reminder dates based on payment terms, and logging notes about client payment patterns."
                </blockquote>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  <strong>Not:</strong>
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Generic invoice tracking with standard 30-day reminders.
                </p>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border-l-4 border-[#7866CC] mb-8">
                <p className="text-gray-700 dark:text-gray-300 font-medium">
                  The clearer your real-world problem, the better the tool works.
                </p>
              </div>
            </section>

            {/* Step 3 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                Step 3 — Expect Iteration
              </h2>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Realistic timeline:</h3>
                <ul className="space-y-3">
                  <li className="text-gray-700 dark:text-gray-300"><strong>Initial working prototype:</strong> 30–60 minutes</li>
                  <li className="text-gray-700 dark:text-gray-300"><strong>Refinement to match your exact needs:</strong> varies by complexity</li>
                  <li className="text-gray-700 dark:text-gray-300"><strong>Some back-and-forth to clarify requirements</strong></li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">What works well:</h3>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>• Personal productivity workflows</li>
                    <li>• Small business process automation</li>
                    <li>• Custom tracking and reminder systems</li>
                  </ul>
                </div>
                
                <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">What doesn't:</h3>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>• Complex enterprise integrations</li>
                    <li>• Vague requirements ("make me more organized")</li>
                    <li>• Replacing tools that already work well</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Step 4 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                Step 4 — Test With Real Data
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Use your custom tool in real-world conditions:
              </p>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-8">
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <CheckIcon className="h-5 w-5 text-[#7866CC] flex-shrink-0 mt-1" />
                    <span className="text-gray-700 dark:text-gray-300">Input real information, not test data</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckIcon className="h-5 w-5 text-[#7866CC] flex-shrink-0 mt-1" />
                    <span className="text-gray-700 dark:text-gray-300">Pay attention to what feels off or missing</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckIcon className="h-5 w-5 text-[#7866CC] flex-shrink-0 mt-1" />
                    <span className="text-gray-700 dark:text-gray-300">Expect to adjust the logic 2–3 times</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border-l-4 border-[#7866CC] mb-8">
                <p className="text-gray-700 dark:text-gray-300 font-medium">
                  Most meaningful solutions come into focus after actual usage, not just setup.
                </p>
              </div>
            </section>

            {/* Why This Approach Works Better */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                Why This Approach Works Better for Some Use Cases
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Traditional no-code tools (Zapier, Make, etc.):</h3>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-center space-x-2"><CheckIcon className="h-4 w-4 text-green-600" /><span>Best for connecting existing apps</span></li>
                    <li className="flex items-center space-x-2"><CheckIcon className="h-4 w-4 text-green-600" /><span>Reliable for standard business processes</span></li>
                    <li className="flex items-center space-x-2"><span className="text-red-500">✘</span><span>Not ideal for unique, personal workflows</span></li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">AI-powered custom tools (like Claude + Pawgrammer):</h3>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-center space-x-2"><CheckIcon className="h-4 w-4 text-green-600" /><span>Great for processes that don't fit templates</span></li>
                    <li className="flex items-center space-x-2"><CheckIcon className="h-4 w-4 text-green-600" /><span>Uses natural language input, not visual flows</span></li>
                    <li className="flex items-center space-x-2"><CheckIcon className="h-4 w-4 text-green-600" /><span>Ideal for small teams or personal tools</span></li>
                  </ul>
                </div>
              </div>
            </section>

            {/* When AI Tools Make Sense */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                When AI Tools Make Sense
              </h2>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-8">
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <CheckIcon className="h-5 w-5 text-[#7866CC] flex-shrink-0 mt-1" />
                    <span className="text-gray-700 dark:text-gray-300">Your process doesn't match existing app templates</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckIcon className="h-5 w-5 text-[#7866CC] flex-shrink-0 mt-1" />
                    <span className="text-gray-700 dark:text-gray-300">You need something specific that doesn't exist</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckIcon className="h-5 w-5 text-[#7866CC] flex-shrink-0 mt-1" />
                    <span className="text-gray-700 dark:text-gray-300">You can clearly describe what you want in your own words</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Limitations */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                Limitations to Consider
              </h2>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-8">
                <ul className="space-y-4">
                  <li className="text-gray-700 dark:text-gray-300">• You need to communicate your process clearly</li>
                  <li className="text-gray-700 dark:text-gray-300">• Some technical iteration may be needed</li>
                  <li className="text-gray-700 dark:text-gray-300">• Best for workflow automation — not full custom apps</li>
                  <li className="text-gray-700 dark:text-gray-300">• AI processing typically involves ongoing costs</li>
                  <li className="text-gray-700 dark:text-gray-300">• May not integrate with every app or service you use</li>
                </ul>
              </div>
            </section>

            {/* Try Building Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                Try Building Your Custom Tool
              </h2>
              
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                We're currently testing this approach with users who have workflows that don't fit standard apps.
              </p>

              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Good candidates:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <CheckIcon className="h-5 w-5 text-[#7866CC] flex-shrink-0 mt-1" />
                    <span className="text-gray-700 dark:text-gray-300">Freelancers with unique client management needs</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckIcon className="h-5 w-5 text-[#7866CC] flex-shrink-0 mt-1" />
                    <span className="text-gray-700 dark:text-gray-300">Small business owners with custom processes</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckIcon className="h-5 w-5 text-[#7866CC] flex-shrink-0 mt-1" />
                    <span className="text-gray-700 dark:text-gray-300">Anyone frustrated by "almost right" productivity tools</span>
                  </li>
                </ul>
              </div>

              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Ready to see what your workflow could look like — when the tool actually fits you?
              </p>
            </section>
          </article>

          {/* CTA Section */}
          <div className="bg-white dark:bg-gray-900 mt-20">
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
                    <BlogButton
                      navigateToChat={false}
                      onClick={() => setIsEarlyAccessModalOpen(true)}
                    >
                      Get early access
                    </BlogButton>
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

          <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-8 mb-8">
            Beta access available. Expect some iteration to get your tool exactly right.
          </p>


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
                How to Build Custom Workflow Tools Using AI
              </li>
            </ol>
          </nav>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Early Access Modal */}
      <EarlyAccessModal
        isOpen={isEarlyAccessModalOpen}
        onClose={() => setIsEarlyAccessModalOpen(false)}
      />
    </div>
  );
};

export default BlogPostClaudeNoCode;