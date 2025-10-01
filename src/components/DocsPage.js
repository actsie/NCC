import React, { useEffect, useMemo, useState } from 'react';
import {
  BookOpenIcon,
  DocumentTextIcon,
  PlayIcon,
  CloudArrowUpIcon,
  ArrowDownTrayIcon,
  FolderOpenIcon,
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
  CalendarDaysIcon,
  ClockIcon,
  SparklesIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  CommandLineIcon,
  ExclamationCircleIcon,
  BugAntIcon
} from '@heroicons/react/24/outline';
import { ChevronRightIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import Header from './Header';
import Footer from './Footer';
import ReportBugModal from './ReportBugModal';

const HEADER_OFFSET = 88;

const DocsPage = () => {
  const [selectedPage, setSelectedPage] = useState('getting-started');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    guide: true
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [activeHeading, setActiveHeading] = useState('');
  const [bugModalOpen, setBugModalOpen] = useState(false);

  // Close sidebar when selecting a page on mobile
  const handlePageSelect = (pageId) => {
    setSelectedPage(pageId);
    setSidebarOpen(false);
    setActiveHeading('');
  };

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  // Sidebar navigation structure
  const navigation = useMemo(() => ([
    {
      id: 'getting-started',
      name: 'Getting Started',
      icon: BookOpenIcon,
      type: 'page'
    },
    {
      id: 'guide',
      name: 'Guide',
      icon: DocumentTextIcon,
      type: 'section',
      children: [
        { id: 'installation-wizard', name: 'Installation Wizard', icon: PlayIcon, type: 'page' },
        { id: 'build-project', name: 'Build your project', icon: CloudArrowUpIcon, type: 'page' },
        { id: 'open-project-manually', name: 'Open Project Manually', icon: CommandLineIcon, type: 'page' },
        { id: 'import-project', name: 'Import a project', icon: FolderOpenIcon, type: 'page' },
        { id: 'export-project', name: 'Export a project', icon: ArrowDownTrayIcon, type: 'page' }
      ]
    },
    {
      id: 'report-bug',
      name: 'Report a bug',
      icon: BugAntIcon,
      type: 'action'
    }
  ]), []);

  // Placeholder content for each page
  const pageContent = useMemo(() => ({
    'getting-started': {
      title: 'Getting Started',
      description: 'Everything you need before creating your first build in Pawgrammer.',
      lastUpdated: 'September 28, 2025',
      readingTime: '2 min read',
      toc: [
        { id: 'welcome', title: 'Welcome' },
        { id: 'quickstart-video', title: 'Watch the quickstart' },
        { id: 'docs-status', title: 'You\'re early!' }
      ],
      content: (
        <div className="nextra-content space-y-12">
          <section id="welcome" className="nextra-section">
            <div className="nextra-callout nextra-callout-highlight">
              <div className="nextra-callout-icon">
                <SparklesIcon className="h-5 w-5" />
              </div>
              <div>
                <h2 className="nextra-heading-2 mb-2">Welcome aboard</h2>
                <p className="nextra-paragraph">
                  Pawgrammer turns plain-language prompts into working web apps. These docs show you how to get started, build, and improve — all from your Mac, no coding required.
                </p>
              </div>
            </div>
            <p className="nextra-paragraph">
              You're early!
            </p>
            <p className="nextra-paragraph">
              We're still expanding our documentation, but the quickstart below walks you through your first build step by step.
            </p>
          </section>

          <section id="quickstart-video" className="nextra-section">
            <h2 className="nextra-heading-2">Watch the quickstart</h2>
            <p className="nextra-paragraph">
              Prefer to see it in action? This short video walks you through going from prompt to working project.
            </p>
            <div className="relative w-full overflow-hidden rounded-2xl border border-gray-200 bg-black shadow-xl dark:border-gray-700">
              <div className="relative pt-[56.25%]">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src="https://www.youtube.com/embed/ueEz9-pG1O4?rel=0&modestbranding=1&vq=hd1080"
                  title="Pawgrammer quickstart demo"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
            <div className="mt-6">
              <button
                type="button"
                onClick={() => handlePageSelect('build-project')}
                className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold shadow-sm transition docs-cta-button"
              >
                Dive into the full build guide
                <ArrowRightIcon className="h-4 w-4" />
              </button>
            </div>
          </section>

          <section id="docs-status" className="nextra-section">
            <p className="nextra-paragraph">
              In the meantime, explore the build guide for an end-to-end walkthrough, or jump into the app to see the stepper experience firsthand.
            </p>
          </section>
        </div>
      )
    },
    'installation-wizard': {
      title: 'Installation Wizard',
      description: 'Get Pawgrammer running locally with a guided setup tailored to your workflow.',
      lastUpdated: 'September 28, 2025',
      readingTime: '4 min read',
      toc: [
        { id: 'wizard-overview', title: 'Pawgrammer Installation Wizard' },
        { id: 'wizard-video', title: 'See the wizard in action' },
        { id: 'what-we-install', title: 'What We’ll Install' },
        { id: 'authentication', title: 'Authentication' },
        { id: 'what-to-expect', title: 'What to Expect' }
      ],
      content: (
        <div className="nextra-content space-y-12">
          <section id="wizard-overview" className="nextra-section">
            <h2 className="nextra-heading-2">Pawgrammer Installation Wizard</h2>
            <p className="nextra-paragraph">
              When you open Pawgrammer for the first time, the app will automatically check your system for required tools.
            </p>
            <p className="nextra-paragraph">
              If something is missing, the wizard installs it for you—no manual setup needed.
            </p>
          </section>

          <section id="wizard-video" className="nextra-section">
            <h2 className="nextra-heading-2">See the wizard in action</h2>
            <p className="nextra-paragraph">
              Watch the walkthrough below to preview each setup step before you run it locally.
            </p>
            <div className="relative w-full overflow-hidden rounded-2xl border border-gray-200 bg-black shadow-xl dark:border-gray-700">
              <div className="relative pt-[56.25%]">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src="https://www.youtube.com/embed/HSJvNJkBw7Q?rel=0&modestbranding=1&vq=hd1080"
                  title="Pawgrammer installation wizard demo"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          </section>

          <section id="what-we-install" className="nextra-section">
            <h2 className="nextra-heading-2">What We’ll Install</h2>
            <p className="nextra-paragraph">
              We'll scan your Mac and set up any missing components.
            </p>
            <div className="mt-4 mb-6 relative max-w-2xl overflow-hidden rounded-2xl border border-gray-200 shadow-xl dark:border-gray-700">
              <img
                src="/Docs/installation.png"
                alt="MCP Servers installation interface"
                className="w-full h-auto"
              />
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Required (needed for Pawgrammer to run)</h3>
                <ul className="nextra-list">
                  <li><span className="font-semibold">Xcode CLI Tools</span> → development tools for building on macOS</li>
                  <li><span className="font-semibold">Node Version Manager (NVM)</span> → manages multiple Node.js versions</li>
                  <li><span className="font-semibold">Node.js</span> → JavaScript runtime powering your builds</li>
                  <li><span className="font-semibold">Claude Code</span> → AI assistant that generates and executes tasks</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Optional (adds advanced features)</h3>
                <ul className="nextra-list">
                  <li><span className="font-semibold">MCP Servers</span> → browser automation + extra capabilities for Claude</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="authentication" className="nextra-section">
            <h2 className="nextra-heading-2">Authentication</h2>
            <div className="mb-6 relative max-w-2xl overflow-hidden rounded-2xl border border-gray-200 shadow-xl dark:border-gray-700">
              <img
                src="/Docs/auth.png"
                alt="Pawgrammer authentication completion screen"
                className="w-full h-auto"
              />
            </div>
            <p className="nextra-paragraph">
              After installation, you'll authenticate Claude Code:
            </p>
            <ul className="nextra-list space-y-6">
              <li>Click <span className="font-semibold">Open Terminal</span> in the wizard.</li>
              <li>
                <div className="mb-3">Copy and paste the provided command, then press Enter.</div>
                <div className="relative max-w-2xl overflow-hidden rounded-2xl border border-gray-200 shadow-xl dark:border-gray-700">
                  <img
                    src="/Docs/terminal.png"
                    alt="Terminal command for Claude Code authentication"
                    className="w-full h-auto"
                  />
                </div>
              </li>
              <li>
                <div className="mb-3">A browser window will open—log in with your Anthropic account and approve access.</div>
                <div className="relative max-w-2xl overflow-hidden rounded-2xl border border-gray-200 shadow-xl dark:border-gray-700">
                  <img
                    src="/Docs/claude-auth.png"
                    alt="Claude Code browser authentication screen"
                    className="w-full h-auto"
                  />
                </div>
              </li>
              <li>Return to Pawgrammer and click <span className="font-semibold">I'm done with authentication</span> to finish.</li>
            </ul>
          </section>

          <section id="what-to-expect" className="nextra-section">
            <h2 className="nextra-heading-2">What to Expect</h2>
            <ul className="nextra-list">
              <li>Setup runs only once (on first launch).</li>
              <li>Already installed components will be skipped.</li>
              <li>Setup may take a few minutes depending on your system.</li>
              <li>
                <div className="mb-3">You can re-run the wizard anytime via <span className="font-semibold">Settings → Setup</span>.</div>
                <div className="relative max-w-2xl overflow-hidden rounded-2xl border border-gray-200 shadow-xl dark:border-gray-700">
                  <img
                    src="/Docs/setup.png"
                    alt="Pawgrammer Settings menu showing Setup option"
                    className="w-full h-auto"
                  />
                </div>
              </li>
            </ul>
            <div className="nextra-callout nextra-callout-highlight mt-6">
              <div className="nextra-callout-icon">✅</div>
              <div>
                <h3 className="text-lg font-semibold text-indigo-900 dark:text-indigo-200">Ready to build</h3>
                <p className="nextra-paragraph !mb-0">
                  Once done, your environment is ready—you can start building apps locally on your Mac right away.
                </p>
              </div>
            </div>
          </section>
        </div>
      )
    },
    'build-project': {
      title: 'Build your project',
      description: 'From prompt to polished app—see how Pawgrammer guides every iteration.',
      lastUpdated: 'September 28, 2025',
      readingTime: '6 min read',
      toc: [
        { id: 'quickstart', title: 'Quickstart overview' },
        { id: 'demo-video', title: 'See it in action' },
        { id: 'step-1', title: '1. Type your prompt' },
        { id: 'step-2', title: '2. Answer quick questions' },
        { id: 'step-3', title: '3. Save your project' },
        { id: 'step-4', title: '4. Execute tasks' },
        { id: 'step-5', title: '5. Run & improve your app' }
      ],
      content: (
        <div className="nextra-content space-y-12">
          <section id="quickstart" className="nextra-section">
            <h2 className="nextra-heading-2">Pawgrammer quickstart</h2>
            <p className="nextra-paragraph">
              Welcome! Here's how to go from idea → working app in Pawgrammer.
            </p>
          </section>

          <section id="demo-video" className="nextra-section">
            <h2 className="nextra-heading-2">See it in action</h2>
            <p className="nextra-paragraph">
              Watch the guided workflow below to get a feel for the build flow before diving into the steps.
            </p>
            <div className="relative w-full overflow-hidden rounded-2xl border border-gray-200 bg-black shadow-xl dark:border-gray-700">
              <div className="relative pt-[56.25%]">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src="https://www.youtube.com/embed/ueEz9-pG1O4?rel=0&modestbranding=1&vq=hd1080"
                  title="Pawgrammer build demo"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          </section>

          <section id="step-1" className="nextra-section nextra-steps">
            <div className="nextra-step">
              <span className="nextra-step-circle">1</span>
              <div className="nextra-step-content">
                <h2 className="nextra-heading-2">
                  Type your prompt
                </h2>
                <p className="nextra-paragraph">
                  Start with a simple description of what you want to build.
                </p>
                <div className="nextra-code-block">
                  <div className="nextra-code-block-header">Example</div>
                  <div className="nextra-code-block-content">
                    "Create a budget tracker that logs income and expenses, with quick-add buttons."
                  </div>
                </div>
                <div className="mt-4 mb-6 relative max-w-2xl overflow-hidden rounded-2xl border border-gray-200 shadow-xl dark:border-gray-700">
                  <img
                    src="/Docs/startproject.png"
                    alt="Starting a new project in Pawgrammer"
                    className="w-full h-auto"
                  />
                </div>
                <p className="nextra-paragraph">
                  Pawgrammer will generate a few clarifying questions to tailor your build.
                </p>
              </div>
            </div>
          </section>

          <section id="step-2" className="nextra-section nextra-steps">
            <div className="nextra-step">
              <span className="nextra-step-circle">2</span>
              <div className="nextra-step-content">
                <h2 className="nextra-heading-2">
                  Answer quick questions
                </h2>
                <p className="nextra-paragraph">
                  You'll see multiple-choice or checkbox questions.
                </p>
                <div className="mt-4 mb-6 relative max-w-2xl overflow-hidden rounded-2xl border border-gray-200 shadow-xl dark:border-gray-700">
                  <img
                    src="/Docs/quickquestions.png"
                    alt="Multiple-choice questions in Pawgrammer project setup"
                    className="w-full h-auto"
                  />
                </div>
                <p className="nextra-paragraph">
                  These help refine your app's features (e.g., do you want reminders, categories, or just essentials?).
                </p>
                <p className="nextra-paragraph">
                  When finished, Pawgrammer generates your build spec.
                </p>
                <div className="mt-4 mb-6 relative max-w-2xl overflow-hidden rounded-2xl border border-gray-200 shadow-xl dark:border-gray-700">
                  <img
                    src="/Docs/spec.png"
                    alt="Generated build specification in Pawgrammer"
                    className="w-full h-auto"
                  />
                </div>
                <p className="nextra-paragraph">
                  You can save it as-is or tweak before moving forward.
                </p>
              </div>
            </div>
          </section>

          <section id="step-3" className="nextra-section nextra-steps">
            <div className="nextra-step">
              <span className="nextra-step-circle">3</span>
              <div className="nextra-step-content">
                <h2 className="nextra-heading-2">
                  Save your project
                </h2>
                <p className="nextra-paragraph">
                  Choose a folder on your Mac.
                </p>
                <div className="mt-4 mb-6 relative max-w-2xl overflow-hidden rounded-2xl border border-gray-200 shadow-xl dark:border-gray-700">
                  <img
                    src="/Docs/saveproject.png"
                    alt="Choosing a folder to save project in Pawgrammer"
                    className="w-full h-auto"
                  />
                </div>
                <p className="nextra-paragraph">
                  All files and builds run locally → your data stays with you.
                </p>
              </div>
            </div>
          </section>

          <section id="step-4" className="nextra-section nextra-steps">
            <div className="nextra-step">
              <span className="nextra-step-circle">4</span>
              <div className="nextra-step-content">
                <h2 className="nextra-heading-2">
                  Execute tasks
                </h2>
                <p className="nextra-paragraph">
                  Pawgrammer breaks your build into clear tasks.
                </p>
                <div className="mt-4 mb-6 relative max-w-2xl overflow-hidden rounded-2xl border border-gray-200 shadow-xl dark:border-gray-700">
                  <img
                    src="/Docs/executetasks.png"
                    alt="Task execution interface in Pawgrammer"
                    className="w-full h-auto"
                  />
                </div>
                <p className="nextra-paragraph">
                  Click Execute to run each one.
                </p>
                <p className="nextra-paragraph">
                  As Pawgrammer completes each task, a browser window will open so you can see your app live. The web address may look something like http://localhost:3000/ (sometimes 3001, 5173, etc.). That's just Pawgrammer starting a test window to make sure your app was built correctly. If you want to check it again later, the simplest way is to click Start Server on the Task Completed screen — your app will reopen in the browser.
                </p>
                <div className="mt-4 mb-6 relative max-w-2xl overflow-hidden rounded-2xl border border-gray-200 shadow-xl dark:border-gray-700">
                  <img
                    src="/Docs/startserver.png"
                    alt="Start Server button on Task Completed screen"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </section>

          <section id="step-5" className="nextra-section nextra-steps">
            <div className="nextra-step">
              <span className="nextra-step-circle">5</span>
              <div className="nextra-step-content">
                <h2 className="nextra-heading-2">
                  Run & improve your app
                </h2>
                <p className="nextra-paragraph">
                  Once all tasks finish, click Start Server to begin testing your app. This will launch it in your browser at an address like http://localhost:3000/ (sometimes 3001, 5173, etc.).
                </p>
                <p className="nextra-paragraph">
                  Use the built-in Chat with AI to request changes:
                </p>
                <div className="nextra-code-block">
                  <div className="nextra-code-block-header">Example</div>
                  <div className="nextra-code-block-content">
                    "Can we add a light/dark mode toggle"
                  </div>
                </div>
                <div className="mt-4 mb-6 relative max-w-2xl overflow-hidden rounded-2xl border border-gray-200 shadow-xl dark:border-gray-700">
                  <img
                    src="/Docs/chatwithAI.png"
                    alt="Chat with AI interface for making project changes"
                    className="w-full h-auto"
                  />
                </div>
                <p className="nextra-paragraph">
                  Keep iterating until it feels right.
                </p>
              </div>
            </div>
          </section>
        </div>
      )
    },
    'open-project-manually': {
      title: 'Open Project Manually',
      description: 'How to manually start your project when the preview window doesn\'t open automatically.',
      lastUpdated: 'September 30, 2025',
      readingTime: '3 min read',
      toc: [
        { id: 'step-1', title: '1. Open Terminal and navigate' },
        { id: 'step-2', title: '2. Run the development command' },
        { id: 'step-3', title: '3. Open in browser' }
      ],
      content: (
        <div className="nextra-content space-y-12">
          <div className="nextra-paragraph">
            If the server doesn't start after clicking Start Server, here's how to open your project manually using Terminal:
          </div>

          <section id="step-1" className="nextra-section nextra-steps">
            <div className="nextra-step">
              <span className="nextra-step-circle">1</span>
              <div className="nextra-step-content">
                <h2 className="nextra-heading-2">
                  Open Terminal and navigate
                </h2>
                <p className="nextra-paragraph">
                  Open Terminal (press <kbd className="px-1.5 py-0.5 text-xs font-mono bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded">cmd + space</kbd>, type "Terminal", then hit Enter).
                </p>
                <p className="nextra-paragraph">
                  Type <code className="px-1.5 py-0.5 text-sm font-mono bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded">cd</code> (just the letters cd and a space), then drag your project folder into the Terminal window. Press Enter.
                </p>
                <div className="mt-4 mb-6 relative max-w-2xl overflow-hidden rounded-2xl border border-gray-200 shadow-xl dark:border-gray-700">
                  <img
                    src="/Docs/cd-project.png"
                    alt="Using cd command to navigate to project folder"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </section>

          <section id="step-2" className="nextra-section nextra-steps">
            <div className="nextra-step">
              <span className="nextra-step-circle">2</span>
              <div className="nextra-step-content">
                <h2 className="nextra-heading-2">
                  Run the development command
                </h2>
                <p className="nextra-paragraph">
                  In Terminal, type the command shown under Server Management. For example, it may be:
                </p>
                <div className="my-4 p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Example command:</div>
                  <div className="relative group">
                    <code className="block text-sm font-mono text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-900 px-3 py-2 pr-12 rounded border">npm run dev</code>
                    <button
                      onClick={() => navigator.clipboard.writeText('npm run dev')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                      title="Copy command"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="mt-4 mb-6 relative max-w-2xl overflow-hidden rounded-2xl border border-gray-200 shadow-xl dark:border-gray-700">
                  <img
                    src="/Docs/npmrundev.png"
                    alt="Running npm run dev command in terminal"
                    className="w-full h-auto"
                  />
                </div>
                <p className="nextra-paragraph">
                  Then press Enter.
                </p>
              </div>
            </div>
          </section>

          <section id="step-3" className="nextra-section nextra-steps">
            <div className="nextra-step">
              <span className="nextra-step-circle">3</span>
              <div className="nextra-step-content">
                <h2 className="nextra-heading-2">
                  Open in browser
                </h2>
                <p className="nextra-paragraph">
                  After a moment, you'll see a web address like http://localhost:3000/ (sometimes it may be 3001, 5173, etc.).
                </p>
                <div className="mt-4 mb-6 relative max-w-2xl overflow-hidden rounded-2xl border border-gray-200 shadow-xl dark:border-gray-700">
                  <img
                    src="/Docs/localhost.png"
                    alt="Terminal showing localhost URL"
                    className="w-full h-auto"
                  />
                </div>
                <p className="nextra-paragraph">
                  Right-click that link and choose Open Link, and your app will appear in the browser.
                </p>
                <div className="mt-4 mb-6 relative max-w-2xl overflow-hidden rounded-2xl border border-gray-200 shadow-xl dark:border-gray-700">
                  <img
                    src="/Docs/openlink.png"
                    alt="Right-clicking localhost link to open in browser"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      )
    },
    'import-project': {
      title: 'Import a project',
      description: 'Bring existing assets into Pawgrammer without breaking your local workflow.',
      lastUpdated: 'September 28, 2025',
      readingTime: '4 min read',
      toc: [
        { id: 'import-overview', title: 'Importing a Project in Pawgrammer' },
        { id: 'import-video', title: 'See an import demo' },
        { id: 'import-steps', title: 'Steps' },
        { id: 'import-notes', title: 'Notes' }
      ],
      content: (
        <div className="nextra-content space-y-12">
          <section id="import-overview" className="nextra-section">
            <h2 className="nextra-heading-2">Importing a Project in Pawgrammer</h2>
            <p className="nextra-paragraph">
              You can bring projects into Pawgrammer from two sources:
            </p>
            <ul className="nextra-list">
              <li>A <code>.json</code> project file you previously exported</li>
              <li>A template folder you downloaded</li>
            </ul>
          </section>

          <section id="import-video" className="nextra-section">
            <h2 className="nextra-heading-2">See an import demo</h2>
            <p className="nextra-paragraph">
              Watch an end-to-end import so you know exactly what to expect when you bring a project back into Pawgrammer.
            </p>
            <div className="relative w-full overflow-hidden rounded-2xl border border-gray-200 bg-black shadow-xl dark:border-gray-700">
              <div className="relative pt-[56.25%]">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src="https://www.youtube.com/embed/y9so2KdtOWw?rel=0&modestbranding=1&vq=hd1080"
                  title="Pawgrammer import demo"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          </section>

          <section id="import-steps" className="nextra-section">
            <h2 className="nextra-heading-2">Steps</h2>
            <ol className="nextra-list list-decimal">
              <li>Open Pawgrammer.</li>
              <li>Go to the <span className="font-semibold">Projects</span> tab.</li>
              <li>
                Click <span className="font-semibold">Import</span>.
                <div className="mt-4 mb-6 relative max-w-2xl overflow-hidden rounded-2xl border border-gray-200 shadow-xl dark:border-gray-700">
                  <img
                    src="/Docs/import.png"
                    alt="Import button in Pawgrammer Projects tab"
                    className="w-full h-auto"
                  />
                </div>
              </li>
              <li>
                Choose either:
                <ul className="ml-6 list-disc">
                  <li>A <code>.json</code> file from a Pawgrammer export.</li>
                  <li>A template folder (downloaded from our library or shared by others).</li>
                </ul>
              </li>
            </ol>
            <p className="nextra-paragraph">
              Pawgrammer will load the project and add it to your list.
            </p>
          </section>

          <section id="import-notes" className="nextra-section">
            <h2 className="nextra-heading-2">Notes</h2>
            <ul className="nextra-list">
              <li>Imported projects keep their original structure, tasks, and files.</li>
              <li>You can immediately continue building, editing, or testing.</li>
            </ul>
          </section>
        </div>
      )
    },
    'export-project': {
      title: 'Export a project',
      description: 'Ship your automation or app anywhere—local preview, TestFlight, or production.',
      lastUpdated: 'September 28, 2025',
      readingTime: '3 min read',
      toc: [
        { id: 'export-overview', title: 'Exporting a Project in Pawgrammer' },
        { id: 'export-video', title: 'See an export demo' },
        { id: 'export-steps', title: 'Steps' },
        { id: 'export-output', title: 'What You Get' },
        { id: 'export-notes', title: 'Notes' }
      ],
      content: (
        <div className="nextra-content space-y-12">
          <section id="export-overview" className="nextra-section">
            <h2 className="nextra-heading-2">Exporting a Project in Pawgrammer</h2>
            <p className="nextra-paragraph">
              You can export any project to share, back it up, or re-import it later.
            </p>
          </section>

          <section id="export-video" className="nextra-section">
            <h2 className="nextra-heading-2">See an export demo</h2>
            <p className="nextra-paragraph">
              Watch the export flow in action so you know what to expect when saving your work.
            </p>
            <div className="relative w-full overflow-hidden rounded-2xl border border-gray-200 bg-black shadow-xl dark:border-gray-700">
              <div className="relative pt-[56.25%]">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src="https://www.youtube.com/embed/l5PGTjuxAMw?rel=0&modestbranding=1&vq=hd1080"
                  title="Pawgrammer export demo"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          </section>

          <section id="export-steps" className="nextra-section">
            <h2 className="nextra-heading-2">Steps</h2>
            <ol className="nextra-list list-decimal">
              <li>Open Pawgrammer.</li>
              <li>Go to the <span className="font-semibold">Projects</span> tab.</li>
              <li>Hover over the project you want to export.</li>
              <li>
                Click the kebab menu (<span className="font-semibold">⋮</span>) in the top-right corner of the project card.
                <div className="mt-4 mb-6 relative max-w-2xl overflow-hidden rounded-2xl border border-gray-200 shadow-xl dark:border-gray-700">
                  <img
                    src="/Docs/export.png"
                    alt="Kebab menu on project card showing export option"
                    className="w-full h-auto"
                  />
                </div>
              </li>
              <li>
                Select <span className="font-semibold">Export</span>.
                <div className="mt-4 mb-6 relative max-w-2xl overflow-hidden rounded-2xl border border-gray-200 shadow-xl dark:border-gray-700">
                  <img
                    src="/Docs/exportmenu.png"
                    alt="Export menu selection in Pawgrammer"
                    className="w-full h-auto"
                  />
                </div>
              </li>
              <li>Choose where to save the file.</li>
            </ol>
          </section>

          <section id="export-output" className="nextra-section">
            <h2 className="nextra-heading-2">What You Get</h2>
            <p className="nextra-paragraph">
              A <code>.json</code> project file containing your app’s structure and tasks.
            </p>
          </section>

          <section id="export-notes" className="nextra-section">
            <h2 className="nextra-heading-2">Notes</h2>
            <ul className="nextra-list">
              <li>Exported projects can be imported back into Pawgrammer anytime.</li>
              <li>Keep your <code>.json</code> file safe — it's your full project spec.</li>
            </ul>
          </section>
        </div>
      )
    }
  }), []);

  const currentPage = pageContent[selectedPage];

  const searchQuery = searchTerm.trim().toLowerCase();

  const filteredNavigation = useMemo(() => {
    return navigation
      .map((item) => {
        if (item.type === 'page') {
          const page = pageContent[item.id];
          const matches = !searchQuery ||
            item.name.toLowerCase().includes(searchQuery) ||
            page?.description?.toLowerCase().includes(searchQuery);
          return matches ? item : null;
        }

        if (item.type === 'action') {
          const matches = !searchQuery || item.name.toLowerCase().includes(searchQuery);
          return matches ? item : null;
        }

        const sectionMatches = !searchQuery || item.name.toLowerCase().includes(searchQuery);

        const matchedChildren = item.children?.filter((child) => {
          const page = pageContent[child.id];
          return !searchQuery ||
            child.name.toLowerCase().includes(searchQuery) ||
            page?.description?.toLowerCase().includes(searchQuery);
        });

        if (sectionMatches) {
          return {
            ...item,
            children: item.children
          };
        }

        if (matchedChildren && matchedChildren.length > 0) {
          return {
            ...item,
            children: matchedChildren
          };
        }

        return null;
      })
      .filter((item) => item && (item.type === 'page' || item.type === 'action' || (item.children && item.children.length > 0)));
  }, [navigation, searchQuery, pageContent]);

  const flatPages = useMemo(() => {
    return navigation.reduce((acc, item) => {
      if (item.type === 'page') {
        acc.push(item);
      }
      if (item.children) {
        acc.push(...item.children.filter((child) => child.type === 'page'));
      }
      return acc;
    }, []);
  }, [navigation]);

  const currentIndex = flatPages.findIndex((item) => item.id === selectedPage);
  const previousPage = currentIndex > 0 ? flatPages[currentIndex - 1] : null;
  const nextPage = currentIndex >= 0 && currentIndex < flatPages.length - 1
    ? flatPages[currentIndex + 1]
    : null;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedPage]);

  useEffect(() => {
    if (!currentPage?.toc || currentPage.toc.length === 0) {
      setActiveHeading('');
      return undefined;
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY + HEADER_OFFSET + 16;
      let currentId = currentPage.toc[0]?.id || '';

      for (let index = 0; index < currentPage.toc.length; index += 1) {
        const { id } = currentPage.toc[index];
        const element = document.getElementById(id);
        if (!element) {
          continue;
        }

        if (element.offsetTop <= scrollPosition) {
          currentId = id;
        }
      }

      setActiveHeading(currentId);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Nextra-style CSS */}
      <style jsx>{`
        :global(:root) {
          --docs-50: #F8F6FE;
          --docs-100: #EBE5FD;
          --docs-200: #D7CBFC;
          --docs-300: #C3B1FA;
          --docs-400: #AF97F8;
          --docs-500: #7866CC;
          --docs-600: #5E50A0;
          --docs-700: #362B6B;
          --docs-800: #191046;
          --docs-900: #1B0A38;
        }

        .nextra-content {
          line-height: 1.8;
        }

        .nextra-heading-1 {
          font-size: 2.25rem;
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 2rem;
          color: var(--docs-900);
        }

        :global(.dark) .nextra-heading-1 {
          color: var(--docs-50);
        }

        .nextra-heading-2 {
          font-size: 1.875rem;
          font-weight: 700;
          line-height: 1.3;
          margin-top: 3rem;
          margin-bottom: 1rem;
          color: var(--docs-800);
        }

        :global(.dark) .nextra-heading-2 {
          color: var(--docs-100);
        }

        .nextra-paragraph {
          margin-bottom: 1.5rem;
          color: var(--docs-700);
          font-size: 1rem;
          line-height: 1.75;
        }

        :global(.dark) .nextra-paragraph {
          color: var(--docs-50);
        }

        .nextra-steps {
          position: relative;
          padding-left: 2rem;
          padding-right: 1.5rem;
          margin-bottom: 3rem;
        }

        .nextra-steps::before {
          content: '';
          position: absolute;
          left: 1rem;
          top: 2rem;
          bottom: -3rem;
          width: 2px;
          background: #7866CC;
        }

        :global(.dark) .nextra-steps::before {
          background: #C3B1FA;
        }

        .nextra-steps:last-child::before {
          bottom: 0;
        }

        .nextra-step {
          display: flex;
          align-items: flex-start;
          gap: 1.5rem;
          position: relative;
          margin-left: -2rem;
          margin-bottom: 3rem;
        }

        .nextra-step-content {
          flex: 1;
        }

        .nextra-step-content h2 {
          margin-top: 0;
          margin-bottom: 0.5rem;
        }

        .nextra-step-content p {
          margin-top: 0;
        }

        .nextra-step-circle {
          background: #7866CC;
          color: white;
          border-radius: 50%;
          width: 2rem;
          height: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.875rem;
          flex-shrink: 0;
          position: relative;
          z-index: 1;
          border: 3px solid white;
          margin-top: 0.25rem;
        }

        :global(.dark) .nextra-step-circle {
          background: #C3B1FA;
          border-color: var(--docs-900);
        }

        .nextra-code-block {
          background: var(--docs-50);
          border: 1px solid var(--docs-200);
          border-radius: 0.5rem;
          margin: 1.5rem 0;
          overflow: hidden;
        }

        :global(.dark) .nextra-code-block {
          background: var(--docs-800);
          border-color: var(--docs-700);
        }

        .nextra-code-block-header {
          background: var(--docs-100);
          border-bottom: 1px solid var(--docs-200);
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--docs-600);
        }

        :global(.dark) .nextra-code-block-header {
          background: var(--docs-800);
          border-color: var(--docs-700);
          color: var(--docs-200);
        }

        .nextra-code-block-content {
          padding: 1rem;
          font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
          font-size: 0.875rem;
          color: var(--docs-800);
          font-style: italic;
        }

        :global(.dark) .nextra-code-block-content {
          color: var(--docs-100);
        }

        .nextra-callout {
          border-radius: 0.5rem;
          padding: 1rem;
          margin: 1.5rem 0;
          display: flex;
          gap: 0.75rem;
        }

        .nextra-callout-info {
          background: var(--docs-50);
          border: 1px solid var(--docs-200);
        }

        :global(.dark) .nextra-callout-info {
          background: var(--docs-800);
          border-color: var(--docs-700);
        }

        .nextra-callout-default {
          background: var(--docs-50);
          border: 1px solid var(--docs-200);
        }

        :global(.dark) .nextra-callout-default {
          background: var(--docs-800);
          border-color: var(--docs-700);
        }

        .nextra-callout-emoji {
          font-size: 1.25rem;
          flex-shrink: 0;
        }

        .nextra-callout-title {
          font-weight: 600;
          color: var(--docs-600);
          margin-bottom: 0.25rem;
        }

        :global(.dark) .nextra-callout-title {
          color: var(--docs-300);
        }

        .nextra-callout-body {
          color: var(--docs-700);
          line-height: 1.6;
        }

        :global(.dark) .nextra-callout-body {
          color: var(--docs-200);
        }

        .nextra-callout-default .nextra-callout-body {
          color: var(--docs-700);
        }

        :global(.dark) .nextra-callout-default .nextra-callout-body {
          color: var(--docs-200);
        }

        .nextra-callout-highlight {
          background: linear-gradient(135deg, rgba(120, 102, 204, 0.12), rgba(175, 151, 248, 0.15));
          border: 1px solid rgba(120, 102, 204, 0.35);
          color: var(--docs-700);
        }

        :global(.dark) .nextra-callout-highlight {
          background: linear-gradient(135deg, rgba(94, 80, 160, 0.22), rgba(54, 43, 107, 0.24));
          border-color: rgba(175, 151, 248, 0.4);
          color: var(--docs-100);
        }

        .nextra-callout-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.25rem;
          height: 2.25rem;
          border-radius: 9999px;
          background: var(--docs-100);
          color: var(--docs-600);
        }

        :global(.dark) .nextra-callout-icon {
          background: rgba(120, 102, 204, 0.25);
          color: var(--docs-100);
        }

        .nextra-section {
          scroll-margin-top: 7rem;
        }

        .nextra-list {
          margin-top: 1rem;
          list-style: disc;
          padding-left: 1.5rem;
          color: var(--docs-700);
        }

        .nextra-list.list-decimal {
          list-style: decimal;
        }

        :global(.dark) .nextra-list {
          color: var(--docs-200);
        }

        .toc-link {
          display: block;
          padding: 0.35rem 0.5rem;
          border-radius: 0.5rem;
          color: var(--docs-600);
          font-size: 0.875rem;
          text-decoration: none;
          transition: background-color 0.2s ease, color 0.2s ease;
        }

        :global(.dark) .toc-link {
          color: var(--docs-200);
        }

        .toc-link:hover {
          background-color: rgba(120, 102, 204, 0.15);
          color: var(--docs-700);
        }

        :global(.dark) .toc-link:hover {
          background-color: rgba(94, 80, 160, 0.35);
          color: var(--docs-50);
        }

        .toc-link.active {
          background-color: rgba(120, 102, 204, 0.2);
          color: var(--docs-700);
          font-weight: 600;
        }

        :global(.dark) .toc-link.active {
          background-color: rgba(94, 80, 160, 0.45);
          color: var(--docs-50);
        }

        .docs-meta {
          color: var(--docs-600);
        }

        .docs-meta span,
        .docs-meta svg {
          color: inherit;
        }

        :global(.dark) .docs-meta {
          color: var(--docs-300);
        }

        .docs-description {
          color: var(--docs-700);
        }

        :global(.dark) .docs-description {
          color: var(--docs-100);
        }

        .docs-title {
          color: var(--docs-900);
        }

        :global(.dark) .docs-title {
          color: var(--docs-50);
        }

        .docs-sidebar-link {
          color: var(--docs-600);
        }

        .docs-sidebar-link svg {
          color: inherit;
        }

        :global(.dark) .docs-sidebar-link {
          color: var(--docs-50);
        }

        .docs-sidebar-link:hover {
          background-color: rgba(120, 102, 204, 0.12);
          color: var(--docs-700);
        }

        :global(.dark) .docs-sidebar-link:hover {
          background-color: rgba(94, 80, 160, 0.45);
          color: var(--docs-50);
        }

        .docs-sidebar-link-active {
          background-color: rgba(120, 102, 204, 0.2) !important;
          color: var(--docs-700) !important;
        }

        :global(.dark) .docs-sidebar-link-active {
          background-color: rgba(94, 80, 160, 0.45) !important;
          color: var(--docs-50) !important;
        }

        .docs-sidebar-section {
          color: var(--docs-600);
        }

        .docs-sidebar-section svg {
          color: inherit;
        }

        .docs-sidebar-section:hover {
          background-color: rgba(120, 102, 204, 0.12);
          color: var(--docs-700);
        }

        :global(.dark) .docs-sidebar-section {
          color: var(--docs-50);
        }

        :global(.dark) .docs-sidebar-section:hover {
          background-color: rgba(94, 80, 160, 0.45);
          color: var(--docs-50);
        }

        .docs-sidebar-section-active {
          color: var(--docs-700) !important;
        }

        :global(.dark) .docs-sidebar-section-active {
          color: var(--docs-50) !important;
        }

        .docs-toc {
          border-left: 1px solid var(--docs-200);
          background: transparent;
        }

        :global(.dark) .docs-toc {
          border-color: rgba(120, 102, 204, 0.35);
          background: var(--docs-900);
          border-radius: 0.75rem;
          padding: 1rem;
          border: 1px solid rgba(120, 102, 204, 0.35);
        }

        .docs-toc-title {
          color: var(--docs-600);
        }

        :global(.dark) .docs-toc-title {
          color: var(--docs-300);
        }

        .docs-divider {
          border-color: var(--docs-200);
        }

        :global(.dark) .docs-divider {
          border-color: rgba(120, 102, 204, 0.35);
        }

        .docs-sidebar {
          background: #ffffff;
          border-right: 1px solid var(--docs-200);
        }

        :global(.dark) .docs-sidebar {
          background: var(--docs-900);
          border-color: rgba(120, 102, 204, 0.35);
        }

        .docs-sidebar-title {
          color: var(--docs-800);
        }

        :global(.dark) .docs-sidebar-title {
          color: var(--docs-50);
        }

        .docs-sidebar-subtitle {
          color: var(--docs-600);
        }

        :global(.dark) .docs-sidebar-subtitle {
          color: var(--docs-300);
        }

        .docs-sidebar-toggle {
          background: var(--docs-50);
          border: 1px solid var(--docs-200);
          color: var(--docs-700);
        }

        .docs-sidebar-toggle:hover {
          border-color: var(--docs-400);
          color: var(--docs-800);
        }

        :global(.dark) .docs-sidebar-toggle {
          background: var(--docs-800);
          border-color: rgba(120, 102, 204, 0.35);
          color: var(--docs-200);
        }

        :global(.dark) .docs-sidebar-toggle:hover {
          border-color: rgba(175, 151, 248, 0.55);
          color: var(--docs-50);
        }

        .docs-search-icon {
          color: var(--docs-500);
        }

        :global(.dark) .docs-search-icon {
          color: var(--docs-300);
        }

        .docs-search-input {
          border: 1px solid var(--docs-200);
          background: var(--docs-50);
          color: var(--docs-700);
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .docs-search-input::placeholder {
          color: var(--docs-400);
        }

        .docs-search-input:focus {
          outline: none;
          border-color: var(--docs-400);
          box-shadow: 0 0 0 2px rgba(120, 102, 204, 0.15);
        }

        :global(.dark) .docs-search-input {
          border-color: rgba(120, 102, 204, 0.35);
          background: var(--docs-800);
          color: var(--docs-100);
        }

        :global(.dark) .docs-search-input::placeholder {
          color: var(--docs-300);
        }

        :global(.dark) .docs-search-input:focus {
          border-color: rgba(175, 151, 248, 0.55);
          box-shadow: 0 0 0 2px rgba(120, 102, 204, 0.25);
        }

        .docs-empty {
          border: 1px dashed var(--docs-200);
          color: var(--docs-600);
          background: var(--docs-50);
        }

        :global(.dark) .docs-empty {
          border-color: rgba(120, 102, 204, 0.35);
          color: var(--docs-200);
          background: var(--docs-800);
        }

        .docs-badge {
          background: var(--docs-50) !important;
          color: var(--docs-600) !important;
        }

        :global(.dark) .docs-badge {
          background: rgba(120, 102, 204, 0.18) !important;
          color: var(--docs-100) !important;
        }

        .docs-cta-button {
          border: 1px solid var(--docs-200) !important;
          background: var(--docs-50) !important;
          color: var(--docs-600) !important;
        }

        .docs-cta-button:hover {
          border-color: var(--docs-400) !important;
          color: var(--docs-700) !important;
        }

        :global(.dark) .docs-cta-button {
          border-color: rgba(120, 102, 204, 0.35) !important;
          background: var(--docs-800) !important;
          color: var(--docs-100) !important;
        }

        :global(.dark) .docs-cta-button:hover {
          border-color: rgba(175, 151, 248, 0.55) !important;
          color: var(--docs-50) !important;
        }

        .docs-nav-card {
          border: 1px solid var(--docs-200) !important;
          background: #fff !important;
          color: var(--docs-700) !important;
        }

        .docs-nav-card:hover {
          border-color: var(--docs-400) !important;
          color: var(--docs-600) !important;
        }

        .docs-nav-card span:first-child {
          color: var(--docs-600) !important;
        }

        .docs-nav-card span:last-child {
          color: var(--docs-800) !important;
        }

        :global(.dark) .docs-nav-card {
          border-color: rgba(120, 102, 204, 0.35) !important;
          background: var(--docs-800) !important;
          color: var(--docs-50) !important;
        }

        :global(.dark) .docs-nav-card span:first-child,
        :global(.dark) .docs-nav-card span:last-child {
          color: inherit !important;
        }

        :global(.dark) .docs-nav-card:hover {
          border-color: rgba(175, 151, 248, 0.55) !important;
        }
      `}</style>

      <Header />

      <div className="flex pt-24 lg:pt-28">
        {/* Mobile sidebar toggle */}
        <div className="lg:hidden fixed top-20 left-4 z-40">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:border-gray-400 dark:hover:border-gray-500"
          >
            {sidebarOpen ? (
              <XMarkIcon className="h-5 w-5" />
            ) : (
              <Bars3Icon className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Sidebar - Three-layer architecture */}
        {/* Outer: Column + Mobile Drawer */}
        <div className={`
          fixed inset-y-0 left-0 z-30 w-64
          transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:transform-none lg:static lg:self-start
          transition-transform duration-300 ease-in-out
          border-r border-gray-200 dark:border-gray-700
          bg-white dark:bg-gray-900
        `}>
          {/* Middle: Sticky Wrapper (Desktop Only) */}
          <div className="lg:sticky lg:top-28">
            {/* Inner: Scroller */}
            <div className="pt-20 lg:pt-6 lg:max-h-[calc(100dvh-7rem)] lg:overflow-y-auto px-4 py-6">
            <div className="mb-8">
              <h1 className="text-lg font-bold text-gray-800 dark:text-white">
                Documentation
              </h1>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                Browse guides or search for a topic.
              </p>
            </div>

            <div className="relative mb-6">
              <MagnifyingGlassIcon className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300" />
              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="w-full rounded-md py-2 pl-9 pr-3 text-sm border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Search docs"
                type="search"
                aria-label="Search documentation"
              />
            </div>

            <nav className="space-y-1">
              {filteredNavigation.map((item) => {
                const isSectionActive = item.type === 'section' && item.children?.some((child) => child.id === selectedPage);
                const shouldShowChildren = (searchQuery ? true : expandedSections[item.id]) && item.children && item.children.length > 0;

                return (
                  <div key={item.id} className={item.type === 'action' ? 'mt-4 pt-4 border-t border-gray-200 dark:border-gray-700' : ''}>
                    {item.type === 'page' ? (
                      <button
                        onClick={() => handlePageSelect(item.id)}
                        className={`w-full text-left flex items-center px-2 py-2 rounded text-sm font-medium transition ${
                          selectedPage === item.id
                            ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-100'
                        }`}
                      >
                        <item.icon className="h-4 w-4 mr-2 flex-shrink-0" />
                        {item.name}
                      </button>
                    ) : item.type === 'action' ? (
                      <button
                        onClick={() => setBugModalOpen(true)}
                        className="w-full text-left flex items-center px-2 py-2 rounded text-sm font-medium transition text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-100"
                      >
                        <item.icon className="h-4 w-4 mr-2 flex-shrink-0" />
                        {item.name}
                      </button>
                    ) : (
                      <div>
                        <button
                          onClick={() => toggleSection(item.id)}
                          className={`w-full text-left flex items-center justify-between px-2 py-2 rounded text-sm font-medium transition ${
                            isSectionActive
                              ? 'text-purple-700 dark:text-purple-300'
                              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-100'
                          }`}
                        >
                          <div className="flex items-center">
                            <item.icon className="h-4 w-4 mr-2 flex-shrink-0" />
                            {item.name}
                          </div>
                          {shouldShowChildren ? (
                            <ChevronDownIcon className="h-3 w-3" />
                          ) : (
                            <ChevronRightIcon className="h-3 w-3" />
                          )}
                        </button>

                        {shouldShowChildren && (
                          <div className="ml-6 mt-1 mb-4 space-y-1">
                            {item.children.map((child) => (
                              <button
                                key={child.id}
                                onClick={() => handlePageSelect(child.id)}
                                className={`w-full text-left flex items-center px-2 py-2 rounded text-sm transition ${
                                  selectedPage === child.id
                                    ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-100'
                                }`}
                              >
                                <child.icon className="h-3 w-3 mr-2 flex-shrink-0" />
                                {child.name}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}

              {searchQuery && filteredNavigation.length === 0 && (
                <div className="rounded-lg border border-dashed border-gray-200 dark:border-gray-600 p-4 text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">
                  No matches yet. Try a different keyword.
                </div>
              )}
            </nav>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <main className="mx-auto max-w-6xl px-6 py-10 lg:px-12 lg:py-14 text-gray-900 dark:text-gray-100">
            <article className="flex flex-col gap-12 xl:flex-row">
              <div className="flex-1 xl:pr-12">
                <div className="docs-meta flex flex-wrap items-center gap-y-2 gap-x-4 text-sm">
                  <span className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-semibold docs-badge">
                    Docs
                  </span>
                  <div className="flex items-center gap-1">
                    <CalendarDaysIcon className="h-4 w-4" />
                    <span>{currentPage.lastUpdated}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ClockIcon className="h-4 w-4" />
                    <span>{currentPage.readingTime}</span>
                  </div>
                </div>

                <header className="mt-6 mb-8">
                  <h1 className="docs-title text-3xl font-bold tracking-tight sm:text-4xl">
                    {currentPage.title}
                  </h1>
                  {currentPage.description && (
                    <p className="mt-3 max-w-3xl text-lg docs-description">
                      {currentPage.description}
                    </p>
                  )}
                </header>

                {currentPage.content}

                <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-6 grid gap-4 lg:grid-cols-2">
                      {previousPage ? (
                        <button
                          onClick={() => handlePageSelect(previousPage.id)}
                          className="flex w-full flex-col rounded-xl px-4 py-3 text-left text-sm shadow-sm transition border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-100 hover:border-gray-400 dark:hover:border-gray-500"
                        >
                      <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-gray-600 dark:text-gray-300">
                        <ArrowLeftIcon className="h-4 w-4" />
                        Previous
                      </span>
                      <span className="mt-1 text-base font-semibold text-gray-800 dark:text-white">
                        {previousPage.name}
                      </span>
                    </button>
                  ) : (
                    <div className="hidden lg:block" />
                  )}

                      {nextPage && (
                        <button
                          onClick={() => handlePageSelect(nextPage.id)}
                          className="flex w-full flex-col rounded-xl px-4 py-3 text-left text-sm shadow-sm transition border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-100 hover:border-gray-400 dark:hover:border-gray-500"
                        >
                      <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-gray-600 dark:text-gray-300">
                        Next
                        <ArrowRightIcon className="h-4 w-4" />
                      </span>
                      <span className="mt-1 text-base font-semibold text-gray-800 dark:text-white">
                        {nextPage.name}
                      </span>
                    </button>
                  )}
                </div>
              </div>

              {/* Table of contents */}
              {currentPage.toc && currentPage.toc.length > 0 && (
                <aside className="hidden xl:block w-72 flex-shrink-0">
                  <div className="sticky top-28 pl-6 pb-10 dark:pl-0">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300">
                      On this page
                    </p>
                    <div className="mt-4 space-y-1">
                      {currentPage.toc.map((item) => (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          className={`block px-2 py-1 rounded text-sm transition ${
                            activeHeading === item.id
                              ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-medium'
                              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-200'
                          }`}
                        >
                          {item.title}
                        </a>
                      ))}
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <button
                        onClick={() => setBugModalOpen(true)}
                        className="flex items-center gap-2 w-full px-2 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition"
                      >
                        <ExclamationCircleIcon className="h-4 w-4" />
                        Report a bug
                      </button>
                    </div>
                  </div>
                </aside>
              )}
            </article>
          </main>
        </div>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 z-20 bg-black bg-opacity-50"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>

      <Footer />

      {/* Report Bug Modal */}
      <ReportBugModal
        isOpen={bugModalOpen}
        onClose={() => setBugModalOpen(false)}
        prefillData={{
          pageUrl: `${window.location.origin}${window.location.pathname}#${selectedPage}`,
        }}
      />
    </div>
  );
};

export default DocsPage;
