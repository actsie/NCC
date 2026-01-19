import React, { useState } from 'react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import Header from './Header';
import Footer from './Footer';
import EarlyAccessModal from './EarlyAccessModal';
import { getBlogPostBySlug } from '../data/blogPosts';

const BlogPostNoCodeWebsite = () => {
  const [isEarlyAccessModalOpen, setIsEarlyAccessModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const post = getBlogPostBySlug('build-your-first-no-code-website');

  React.useEffect(() => {
    document.title = post?.metaTitle || 'Build Your First No-Code Website (Together) - A Friendly Beginner\'s Guide';

    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', post?.metaDescription || '');
    } else {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      metaDescription.content = post?.metaDescription || '';
      document.head.appendChild(metaDescription);
    }

    return () => {
      document.title = 'Pawgrammer';
    };
  }, [post]);

  // Handle hash scroll navigation for direct links
  React.useEffect(() => {
    const scrollToHash = (hash) => {
      if (hash) {
        // Run after DOM is painted
        setTimeout(() => {
          const id = hash.replace("#", "");
          const element = document.getElementById(id);
          if (element) {
            // Account for header height
            const headerOffset = 100;
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

  // Scroll spy effect for TOC
  React.useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'step-1', 'step-2', 'step-3', 'step-4', 'step-5',
        'step-6', 'step-7', 'step-8', 'step-9', 'whats-next'
      ];

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 300) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const tocItems = [
    { id: 'step-1', label: 'Step 1: Get Access' },
    { id: 'step-2', label: 'Step 2: Download & Open' },
    { id: 'step-3', label: 'Step 3: Run Setup Wizard' },
    { id: 'step-4', label: 'Step 4: Claude Code Setup' },
    { id: 'step-5', label: 'Step 5: Enter Your Prompt' },
    { id: 'step-6', label: 'Step 6: Setup Questions' },
    { id: 'step-7', label: 'Step 7: Review Your Spec' },
    { id: 'step-8', label: 'Step 8: Build Your Site' },
    { id: 'step-9', label: 'Step 9: Deploy' },
    { id: 'whats-next', label: 'What\'s Next?' }
  ];

  if (!post) {
    return <div>Blog post not found</div>;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      <main className="relative isolate px-6 pt-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex gap-8">
            {/* Main Content */}
            <div className="flex-1 max-w-3xl text-base leading-7 text-gray-700 dark:text-gray-300">
          <p className="text-base font-semibold leading-7 text-[#7866CC]">{post.category.title}</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            {post.title}
          </h1>
          <div className="mt-6 flex items-center gap-x-4 text-xs">
            <time dateTime={post.datetime} className="text-gray-500 dark:text-gray-400">
              {post.date}
            </time>
            <a
              href={post.author.href}
              className="relative z-10 rounded-full bg-gray-50 dark:bg-gray-800 px-3 py-1.5 font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {post.author.name}
            </a>
          </div>

          <div className="mt-10 max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">👋 Hey, I see you.</h2>

            <p className="mt-6">You've got something to share.</p>
            <p className="mt-4">An idea. A skill. A service.</p>
            <p className="mt-4">Maybe a portfolio that's been sitting half-finished in a Google Doc for months.</p>

            <p className="mt-6">You know it's time to get it online—but every time you open a tutorial, it's like:</p>

            <blockquote className="mt-6 border-l-4 border-[#7866CC] pl-4 italic text-gray-600 dark:text-gray-400">
              "Install Node. Run the CLI. Add this plugin. Connect this thing to that thing—wait, where did my footer go???"
            </blockquote>

            <p className="mt-6">It's too much. Too fast. Too confusing.</p>
            <p className="mt-4">And half the tutorials out there either skip steps or assume you already know the basics.</p>

            <p className="mt-6 font-medium text-gray-900 dark:text-white">
              So here's the deal:<br />
              We're building your website. Together. From start to finish.
            </p>

            <p className="mt-6">No code experience? Doesn't matter. Tech makes you anxious? You're in the right place.</p>

            <p className="mt-4">This is a full walkthrough, not a tips-and-tricks video. I'll show you everything—what tools I'm using, why I'm using them, what buttons to press, and what to do when something breaks (because it probably will—and that's okay).</p>

            <p className="mt-6">You don't need to be "technical."<br />
            You don't need to have it all figured out.<br />
            You just need to start.<br />
            And I'm right here with you.</p>
          </div>

          <div className="mt-16 max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Why building your own site matters</h2>

            <p className="mt-6">You don't need permission to show up online.</p>
            <p className="mt-4">You don't need to wait for a developer.</p>
            <p className="mt-4">You don't need to keep telling yourself, "I'll do it once I figure it all out."</p>

            <p className="mt-6 font-medium text-gray-900 dark:text-white">Building your own site gives you freedom:</p>
            <ul className="mt-6 space-y-2 list-disc list-inside">
              <li>Freedom from waiting on someone else to update your content</li>
              <li>Freedom to test ideas, promote your work, or launch something new—whenever you want</li>
              <li>Freedom to present your brand exactly how you want it to be seen</li>
            </ul>

            <p className="mt-6">Your site is your <strong>digital handshake</strong>. It's often the first impression someone gets of you, your services, or your ideas. So let's make it yours—authentic, clear, and functional.</p>

            <p className="mt-6 italic">This is one of the best ways to start learning the building blocks of tech.</p>

            <ul className="mt-6 space-y-2 list-disc list-inside">
              <li>You'll start picking up how components work</li>
              <li>How pages are structured</li>
              <li>How to tweak and test and deploy</li>
            </ul>

            <p className="mt-6">You won't become a full-stack dev overnight—but you'll walk away more confident, more capable, and more in control.</p>

            <p className="mt-4">If you've ever thought, "I wish I understood how this stuff works…" —this is your on-ramp.</p>

            <p className="mt-6 font-medium text-gray-900 dark:text-white">Let's go.</p>
          </div>

          <div className="mt-16 max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">✨ Why this blog (and tutorial) is different</h2>

            <p className="mt-6">You've probably seen the quick-tip reels. The high-speed time lapses. The "just drag and drop!" content that skips over 90% of the process.</p>

            <p className="mt-4">Yeah… that's <strong>not</strong> what this is.</p>

            <p className="mt-6">This isn't a highlights reel. It's a full walkthrough—real steps, real time, real learning.</p>

            <ul className="mt-6 space-y-2 list-disc list-inside">
              <li>You'll see everything from the first click to the final publish</li>
              <li>I'll show you where I get stuck and how I fix it</li>
              <li>We'll use free (or super affordable) tools—no surprise paywalls</li>
              <li>Everything is explained in plain English</li>
            </ul>

            <p className="mt-6">No jargon. No ego. No skipping steps.</p>

            <p className="mt-6 font-medium text-gray-900 dark:text-white">You're not just watching me build this. You're building it with me.</p>

            <p className="mt-4">You'll have your own version of this site by the end—real, live, and proudly yours.</p>

            <p className="mt-6">Let's ditch the gatekeeping and actually build together.</p>
          </div>

          <div className="mt-16 max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">No-code doesn't mean no-learning — and that's a good thing</h2>

            <p className="mt-6">No-code isn't magic. But it is doable.</p>

            <p className="mt-4">No-code tools give you the building blocks—but <strong>you're still the one doing the building</strong>.</p>

            <p className="mt-6">Think of it like LEGO. The pieces fit together. But the creativity? The layout? That's all you.</p>

            <p className="mt-4">If you've used Canva, set up a Linktree, or customized your Instagram bio—you've already done this, just in a different format.</p>

            <p className="mt-6 font-medium text-gray-900 dark:text-white">Now, we're going to build something way more powerful.</p>

            <ul className="mt-6 space-y-2 list-disc list-inside">
              <li>A real site, with your name on it</li>
              <li>Mobile-friendly, desktop-ready</li>
              <li>Yours to update any time, however you want</li>
            </ul>

            <p className="mt-6">The more you build, the more you learn. You'll get comfortable making changes, solving problems, and tweaking design.</p>

            <p className="mt-4">Before you know it, you'll go from:<br />
            "I have no idea what I'm doing" → "Wait—I can totally do this."</p>

            <p className="mt-6 font-medium text-gray-900 dark:text-white">Let's demystify this stuff, one step at a time.</p>
          </div>

          <div className="mt-16 max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Tools we'll be using (and why)</h2>

            <p className="mt-6">You don't need to know how to code.<br />
            But I'll show you how to build like someone who could.</p>

            <p className="mt-6 font-medium text-gray-900 dark:text-white">We'll use <em>Pawgrammer</em>—a no-code app builder that generates production-ready code from a simple prompt.</p>

            <p className="mt-4">The result? A real website powered by a modern stack:</p>

            <h3 className="mt-10 text-xl font-bold tracking-tight text-gray-900 dark:text-white">The Stack</h3>
            <ul className="mt-6 space-y-2 list-disc list-inside">
              <li><strong>Next.js 14 (App Router)</strong> – Fast, responsive structure</li>
              <li><strong>TypeScript</strong> – Predictable, safe code</li>
              <li><strong>Tailwind CSS</strong> – Utility-first design made easy</li>
              <li><strong>ESLint & Prettier</strong> – For clean, auto-formatted code</li>
            </ul>

            <h3 className="mt-10 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Scripts Included</h3>
            <ul className="mt-6 space-y-2 list-disc list-inside">
              <li><code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">dev</code>, <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">build</code>, <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">start</code>, <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">lint</code>, <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">format</code> — ready to go</li>
              <li>Runs locally, editable content, and deployable in minutes</li>
            </ul>

            <h3 className="mt-10 text-xl font-bold tracking-tight text-gray-900 dark:text-white">And the Extras</h3>
            <ul className="mt-6 space-y-2 list-disc list-inside">
              <li><strong>MIT license</strong> — yours to keep and remix</li>
              <li><strong>README</strong> — includes setup and customization steps</li>
              <li><strong>GitHub push + Vercel deploy</strong> — yes, you'll launch your own site (both free)</li>
            </ul>

            <p className="mt-6">Even if you've never opened a terminal or GitHub before—don't worry. We walk through everything, step by step.</p>

            <p className="mt-6 font-medium text-gray-900 dark:text-white">This is real-deal tech made accessible.<br />
            And that's the power of no-code done right.</p>
          </div>

          <div className="mt-16 max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">What you'll have by the end</h2>

            <p className="mt-6">This isn't just a copy-paste moment. You'll walk away with:</p>

            <h3 className="mt-10 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Tangible results:</h3>
            <ul className="mt-6 space-y-2 list-disc list-inside">
              <li>A live website, built by you</li>
              <li>Your own space to share, sell, or showcase</li>
              <li>Modern, mobile-ready design</li>
            </ul>

            <h3 className="mt-10 text-xl font-bold tracking-tight text-gray-900 dark:text-white">And real skills:</h3>
            <ul className="mt-6 space-y-2 list-disc list-inside">
              <li>Confidence to update, tweak, and improve your site</li>
              <li>A working knowledge of how modern sites are built</li>
              <li>The ability to do it again—for yourself, a client, or a friend</li>
            </ul>

            <p className="mt-6 font-medium text-gray-900 dark:text-white">You don't have to become a developer.<br />
            But you can become a builder.</p>

            <p className="mt-4">And that's the best place to start.</p>
          </div>

          <div className="mt-16 max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Mini FAQ (a.k.a. Let's squash those doubts)</h2>

            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">"I'm not techy."</h3>
              <p className="mt-2">
                Cool, neither was I. You just need curiosity and a little time.
              </p>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">"I don't know what I want on the site."</h3>
              <p className="mt-2">
                We'll figure it out together with some flexible templates.
              </p>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">"What if I mess it up?"</h3>
              <p className="mt-2">
                That's part of it. I'll show you how to fix it—it's all learning.
              </p>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">"Is this going to take forever?"</h3>
              <p className="mt-2">
                Think of it as a weekend project. Focused, fun, and done.
              </p>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">"What if I've never deployed anything?"</h3>
              <p className="mt-2">
                You will now 😉 With step-by-step help and tools that make it painless.
              </p>
            </div>
          </div>

          <div className="mt-16 max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">🎉 Ready? Let's build your site.</h2>

            <p className="mt-6">Let's stop waiting for the "right time."<br />
            This <em>is</em> the right time.</p>

            <p className="mt-6">Open a tab. Grab a drink.<br />
            And let's build your site together—step by step, zero fluff, full support.</p>
          </div>

          {/* Tutorial Content */}
          <div className="mt-16 max-w-2xl border-t border-gray-200 dark:border-gray-700 pt-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Let's Build Your Site (Start to Finish)</h2>

            <p className="mt-6">In this tutorial, you'll build your own personal website—from scratch, in under a day (or 2)—using <strong>Pawgrammer</strong>, our no-code builder.</p>

            <p className="mt-4">You'll end up with a clean, modern site powered by a real tech stack (Next.js, Tailwind, TypeScript), even if you've never written a line of code before.</p>

            <p className="mt-4 font-medium text-gray-900 dark:text-white">This guide is fully beginner-friendly.</p>

            <p className="mt-2">We'll walk through every step together—from generating your site to going live with it on the internet.</p>

            <div className="mt-8 p-6 bg-[#EBE5FD] dark:bg-gray-800 rounded-lg border border-[#7866CC]/20">
              <p className="font-semibold text-gray-900 dark:text-white">Want to get started now?</p>
              <p className="mt-2 text-gray-700 dark:text-gray-300">Join our <a href="https://discord.gg/RFuCgdTxXx" target="_blank" rel="noopener noreferrer" className="text-[#7866CC] hover:underline">Discord</a> for free beta access to Pawgrammer.</p>
              <p className="mt-2 text-gray-700 dark:text-gray-300">We're currently in beta and already seeing amazing results from early users. If something breaks or you have ideas, the Discord is where we hang out and help each other build.</p>
            </div>

            <p className="mt-8 text-lg font-medium text-gray-900 dark:text-white">Let's get your site live.</p>

            <p className="mt-4 text-gray-600 dark:text-gray-400">👇 Jump into Step 1: Generate your site with Pawgrammer →</p>
          </div>

          {/* Mac Users Section */}
          <div className="mt-16 max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Mac user? You're in.</h2>

            <p className="mt-6">Pawgrammer is currently available for <strong>macOS only</strong> during our beta.</p>

            <p className="mt-4">If you're on a Mac, congrats—you've got early access to build your own production-ready website using Pawgrammer.</p>

            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <p className="text-gray-700 dark:text-gray-300">Windows & Linux friends: We see you! Cross-platform support might be supported soon. Join the <a href="https://discord.gg/RFuCgdTxXx" target="_blank" rel="noopener noreferrer" className="text-[#7866CC] hover:underline">Discord</a> to get notified when it drops.</p>
            </div>
          </div>

          {/* Step 1 */}
          <div id="step-1" className="mt-16 max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Step 1: Get Access to Pawgrammer</h2>

            <p className="mt-6">Pawgrammer is currently in private beta—but you're in! 🎉</p>

            <p className="mt-4">To get started, join our <a href="https://discord.gg/RFuCgdTxXx" target="_blank" rel="noopener noreferrer" className="text-[#7866CC] hover:underline">Discord</a> and let us know you're on a mac and we'll give you access to download the app. Once you're in, we'll onboard you inside a private help channel where you can:</p>

            <ul className="mt-6 space-y-2 list-disc list-inside">
              <li>Ask any questions (yes, even "dumb" ones—there's no such thing)</li>
              <li>Get help with setup, step by step</li>
              <li>See what other people are building</li>
            </ul>

            <div className="mt-6 p-4 bg-[#EBE5FD] dark:bg-gray-800 rounded-lg border border-[#7866CC]/20">
              <p className="font-semibold text-gray-900 dark:text-white">Friendly reminder:</p>
              <p className="mt-2 text-gray-700 dark:text-gray-300">You don't have to figure this out alone. We'll be right there in Discord with you.</p>
            </div>
          </div>

          {/* Step 2 */}
          <div id="step-2" className="mt-16 max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Step 2: Download & Open Pawgrammer</h2>

            <p className="mt-6">Once we give you access, you'll get a <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">.dmg</code> file—just like any other Mac app.</p>

            <ol className="mt-6 space-y-3 list-decimal list-inside">
              <li>Double-click the <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">.dmg</code> file</li>
              <li>Drag <strong>Pawgrammer</strong> into your <strong>Applications</strong> folder</li>
              <li>Open the app!</li>
            </ol>

            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <p className="font-semibold text-gray-900 dark:text-white">Fun fact:</p>
              <p className="mt-2 text-gray-700 dark:text-gray-300">Pawgrammer uses the power of <strong>Claude Code</strong> to build your site.</p>
              <p className="mt-2 text-gray-700 dark:text-gray-300">Claude is a smart, agentic coding tool built by the team at <strong>Anthropic</strong>, designed to understand and work with codebases directly from the terminal. You can even look it up if you're curious—it's amazing tech!</p>
            </div>
          </div>

          {/* Step 3 */}
          <div id="step-3" className="mt-16 max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Step 3: Run the Setup Wizard</h2>

            <p className="mt-6">When you first open Pawgrammer, an installation wizard will guide you through installing everything needed to build and run your projects.</p>

            <p className="mt-4">Here's what it installs and why:</p>

            <h3 className="mt-10 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Required (Core setup)</h3>
            <ul className="mt-6 space-y-2 list-disc list-inside">
              <li><strong>Xcode CLI Tools</strong> → Core macOS dev tools (needed by most frameworks)</li>
              <li><strong>NVM (Node Version Manager)</strong> → Lets you switch between Node versions easily</li>
              <li><strong>Node.js</strong> → The engine behind most modern JavaScript apps (including your site)</li>
              <li><strong>Claude Code</strong> → The AI agent powering Pawgrammer's build process</li>
            </ul>

            <h3 className="mt-10 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Optional (Advanced features)</h3>
            <ul className="mt-6 space-y-2 list-disc list-inside">
              <li><strong>MCP Servers</strong> → Adds browser automation and power tools for Claude</li>
            </ul>

            <p className="mt-6">Don't worry—we'll be in Discord to help if anything's unclear.</p>

            <div className="mt-6 p-4 bg-[#EBE5FD] dark:bg-gray-800 rounded-lg border border-[#7866CC]/20">
              <p className="text-gray-700 dark:text-gray-300">
                Need more details? Check out our <a
                  href="/docs#wizard-overview"
                  className="text-[#7866CC] hover:underline font-medium"
                >
                  Installation Wizard docs
                </a> for a complete walkthrough.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div id="step-4" className="mt-16 max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Step 4: Claude Code Setup</h2>

            <p className="mt-6">Pawgrammer uses <strong>Claude Code</strong> to power your builds behind the scenes. It's an AI developer tool that helps automate the setup and generation of your site.</p>

            <p className="mt-4">To complete this step, a quick one-time authentication is required.</p>

            <h3 className="mt-10 text-xl font-bold tracking-tight text-gray-900 dark:text-white">What to do:</h3>
            <ul className="mt-6 space-y-2 list-disc list-inside">
              <li>If you're at this step, head over to our <a href="https://discord.gg/RFuCgdTxXx" target="_blank" rel="noopener noreferrer" className="text-[#7866CC] hover:underline">Discord</a> and let us know.</li>
              <li>We'll guide you through the Claude Code setup from there.</li>
              <li>Once it's connected, you'll be good to go—no need to repeat the process later.</li>
            </ul>

            <p className="mt-6 text-gray-600 dark:text-gray-400">💬 We're online and ready to help. Don't hesitate to ping us if you're unsure or need support.</p>
          </div>

          {/* Step 5 */}
          <div id="step-5" className="mt-16 max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Step 5: Enter Your Site Prompt</h2>

            <p className="mt-6 font-medium text-gray-900 dark:text-white">Now the fun part begins.</p>

            <p className="mt-4">When you open Pawgrammer, you'll be prompted to enter a project prompt—this is your description of what you want to build.</p>

            <p className="mt-4">Don't worry if it's not perfect. We'll guide you with examples and tips so you can describe your site clearly and simply.</p>

            <p className="mt-6">For example:</p>

            <div className="mt-6 relative group">
              <button
                onClick={(e) => {
                  const text = e.currentTarget.nextElementSibling.querySelector('pre').textContent;
                  navigator.clipboard.writeText(text);
                  const btn = e.currentTarget;
                  const originalText = btn.textContent;
                  btn.textContent = 'Copied!';
                  setTimeout(() => { btn.textContent = originalText; }, 2000);
                }}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-1.5 bg-[#7866CC] hover:bg-[#6B5BB3] text-white text-xs font-medium rounded-md z-10"
              >
                Copy
              </button>
              <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 overflow-x-auto">
                <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
{`Create a production-ready marketing portfolio as a full repo.

Stack
- Next.js 14 App Router, TypeScript, Tailwind, ESLint, Prettier
- Scripts: dev, build, start, lint, format
- MIT license + README with local run, edit content, GitHub push, Vercel deploy

Design
- Minimal, responsive, rounded-2xl cards, soft shadows, Inter
- Brand colors: 50 #F8F6FE, 100 #EBE5FD, 200 #D7CBFC, 300 #C3B1FA, 400 #AF97F8, 500 #7866CC, 600 #5E50A0, 700 #362B6B, 800 #191046, 900 #1B0A38
- Light mode default, dark toggle optional

Pages (App Router)
- / home: hero, 2 CTAs (Book a call, View work), social proof, services, featured case studies, testimonials, FAQ, final CTA
- /services: list services, outcomes, 3 tiers pricing
- /work: grid of case studies, /work/[slug] detail
- /about: bio, principles, tools, logos
- /contact: form (name, email, goals, budget, timeline) via Formspree placeholder

Components
- Header sticky, Footer, Button variants, CaseStudyCard, TestimonialCard, SectionHeading, CTA
- next/image with alt, focus styles, aria

Content
- /content/site.json copy
- /content/services.json
- /content/testimonials.json
- /content/case-studies/*.md with frontmatter (title, summary, role, services, stack, results, cover, gallery[])

SEO
- metadata in app/layout.tsx, og and twitter tags
- public/ favicon, og-image.png, social icons
- robots.txt, sitemap.xml

Quality
- Keyboard nav, Lighthouse friendly, defined image sizes
- Example 3 case studies with KPI placeholders, 3 testimonials

Defaults
- Brand name placeholder, tagline "Marketing that ships results you can measure"
- CTAs link to Calendly placeholder

Output
- Full repo tree and all files in full`}
                </pre>
              </div>
            </div>

            <p className="mt-6">Once entered, you'll move on to a few quick setup questions.</p>
          </div>

          {/* Step 6 */}
          <div id="step-6" className="mt-16 max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Step 6: Quick Setup Questions</h2>

            <p className="mt-6">To help generate a site that actually fits you, Pawgrammer will ask a few short setup questions.</p>

            <p className="mt-4">This part takes just a couple of minutes—and it's super straightforward.</p>

            <p className="mt-6">You'll answer a mix of:</p>

            <ul className="mt-6 space-y-3 list-disc list-inside">
              <li>
                <strong>Short answer questions, like:</strong><br />
                <span className="text-gray-600 dark:text-gray-400 ml-6">"Who is this marketing portfolio for, and what is its primary goal?"</span><br />
                <span className="text-gray-600 dark:text-gray-400 ml-6">(This helps personalize the content and design structure.)</span>
              </li>
              <li>
                <strong>Multiple choice and checkboxes, like:</strong><br />
                <span className="text-gray-600 dark:text-gray-400 ml-6">"Which example assets should be included in your site?"</span><br />
                <span className="text-gray-600 dark:text-gray-400 ml-6">You'll be able to choose from sample case studies, placeholder testimonials, service tiers, and more.</span>
              </li>
            </ul>

            <p className="mt-6 text-gray-600 dark:text-gray-400">💡 Don't overthink it. Just answer honestly and we'll tailor the build to match.</p>

            <p className="mt-4">You'll still be able to edit everything later—this just gives Claude and Pawgrammer the context they need to generate your site the right way.</p>

            <p className="mt-6">Once that's done, you'll move on to the full spec preview and see exactly what's about to be built.</p>
          </div>

          {/* Step 7 */}
          <div id="step-7" className="mt-16 max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Step 7: Review Your Full Spec</h2>

            <p className="mt-6">Once you've answered those questions, Pawgrammer will generate a full project spec.</p>

            <p className="mt-4">This includes:</p>

            <ul className="mt-6 space-y-2 list-disc list-inside">
              <li>Page structure</li>
              <li>Components to be built</li>
              <li>Tools used</li>
              <li>Design style</li>
              <li>Content structure</li>
            </ul>

            <p className="mt-6">You'll see everything that's going to be built—laid out clearly.</p>

            <p className="mt-4">You can even download this spec as a <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">.docx</code> file to review, share, or edit before starting the build.</p>

            <p className="mt-6">Want to make small changes to the structure or features? You can edit the spec before moving forward.</p>
          </div>

          {/* Step 8 */}
          <div id="step-8" className="mt-16 max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Step 8: Task Breakdown & Site Build</h2>

            <p className="mt-6 font-medium text-gray-900 dark:text-white">Here's where Pawgrammer really goes to work.</p>

            <p className="mt-4">Behind the scenes, Pawgrammer uses Claude Code to break your project into smaller build tasks—making it easier to test and fix along the way.</p>

            <p className="mt-6">You'll walk through each task one by one:</p>

            <ul className="mt-6 space-y-2 list-disc list-inside">
              <li>Review what's about to be built</li>
              <li>Click <strong>Run</strong> on each task</li>
              <li>Wait for it to complete</li>
              <li>Test the output in the browser or terminal</li>
              <li>Continue to the next task</li>
            </ul>

            <h3 className="mt-10 text-xl font-bold tracking-tight text-gray-900 dark:text-white">What you'll see</h3>
            <ul className="mt-6 space-y-2 list-disc list-inside">
              <li>Claude's output in the terminal</li>
              <li>Progress updates as each task runs</li>
              <li>Browser windows opening for visual checks</li>
            </ul>

            <p className="mt-6 font-medium text-gray-900 dark:text-white">You won't have to write a single line of code. You'll watch your site get built in real time.</p>

            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <p className="font-semibold text-gray-900 dark:text-white">Pro tip:</p>
              <p className="mt-2 text-gray-700 dark:text-gray-300">It's best to close extra browser tabs and heavy apps during this step. It helps the build run smoothly.</p>
            </div>

            <h3 className="mt-10 text-xl font-bold tracking-tight text-gray-900 dark:text-white">If something goes wrong</h3>
            <p className="mt-6">If a task fails (maybe a package didn't install right, or something timed out), don't panic.</p>

            <p className="mt-4">Here's what you do:</p>

            <ol className="mt-6 space-y-3 list-decimal list-inside">
              <li>Go back to the <strong>Task List</strong></li>
              <li>Click <strong>Retry</strong> on the failed task</li>
              <li>Watch it rerun and verify results</li>
            </ol>

            <p className="mt-6">Most of the time, this fixes it. If it doesn't, hop into Discord and let us know—we'll help you troubleshoot.</p>

            <h3 className="mt-10 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Open or Edit Anytime</h3>
            <p className="mt-6">You can always open your project again later. Just go to the Projects view, select your project, click <strong>Start Server</strong>, then <strong>Open</strong> to preview and make changes anytime.</p>

            <h3 className="mt-10 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Want to make a change mid-build?</h3>
            <p className="mt-6">Use <strong>Chat with AI</strong> to request changes. Just talk to Claude directly, like:</p>

            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <p className="text-gray-700 dark:text-gray-300">"Make the hero text bigger" or "Change the button color to #FCFCFC."</p>
            </div>

            <p className="mt-6">Claude will edit the code, rerun the tests, and show you the updated result.</p>

            <p className="mt-6 font-medium text-gray-900 dark:text-white">Once all tasks are completed and everything checks out—your site is ready to use locally.</p>

            <p className="mt-4">You'll be ready for the final step: pushing your site live.</p>
          </div>

          {/* Step 9 */}
          <div id="step-9" className="mt-16 max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Step 9: Push to GitHub & Deploy to Vercel</h2>

            <p className="mt-6 font-medium text-gray-900 dark:text-white">Now it's time to put your project online—for real.</p>

            <p className="mt-4">This is the moment when your website stops being "just on your computer" and becomes something <em>anyone</em> can visit on the internet.</p>

            <p className="mt-6">Let's break it down.</p>

            <h3 className="mt-10 text-xl font-bold tracking-tight text-gray-900 dark:text-white">1. Push to GitHub</h3>
            <p className="mt-6">Before we can deploy your site to the internet, we need to store the code somewhere safe and shareable.</p>

            <p className="mt-4">That's where <strong>GitHub</strong> comes in.</p>

            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <p className="font-semibold text-gray-900 dark:text-white">What is GitHub?</p>
              <p className="mt-2 text-gray-700 dark:text-gray-300">Think of it like Google Drive—but for code. It's where developers store their projects so they can access them from anywhere, share them with others, and keep everything backed up.</p>
            </div>

            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <p className="font-semibold text-gray-900 dark:text-white">What is a repo?</p>
              <p className="mt-2 text-gray-700 dark:text-gray-300">Short for "repository." It's basically your project folder—online. When you push to GitHub, you're uploading your project to your own personal repo.</p>
            </div>

            <h4 className="mt-8 text-lg font-semibold text-gray-900 dark:text-white">Create a GitHub Account and Repo</h4>
            <p className="mt-6">Here's what you'll do:</p>

            <ol className="mt-6 space-y-3 list-decimal list-inside">
              <li>Go to <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-[#7866CC] hover:underline">github.com</a> and sign up (it's free)</li>
              <li>Click the <strong>+</strong> icon in the top-right corner</li>
              <li>Select <strong>New repository</strong></li>
              <li>Give it a name, like <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">my-first-site</code> or <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">portfolio</code></li>
              <li><strong>Important:</strong> Leave <strong>"Initialize this repository with a README"</strong> <em>unchecked</em> (you already have files—you don't want it to create new ones)</li>
              <li>Click <strong>Create repository</strong></li>
              <li>Copy your repo URL—it'll look something like this:<br />
                <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">https://github.com/yourusername/my-first-site</code>
              </li>
            </ol>

            <h4 className="mt-8 text-lg font-semibold text-gray-900 dark:text-white">Push with Chat with AI</h4>
            <p className="mt-6">Once your GitHub repo is set up, head back to <strong>Pawgrammer</strong>.</p>

            <p className="mt-4">Open <strong>Chat with AI</strong> and simply type:</p>

            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 overflow-x-auto">
              <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-words">Hi, can you please push this project to https://github.com/yourusername/my-first-site?</pre>
            </div>

            <p className="mt-6">(Replace <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">yourusername</code> and <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">my-first-site</code> with your actual GitHub username and repo name.)</p>

            <p className="mt-6">Claude will handle the rest. It'll push your project to GitHub automatically—no manual Git commands needed.</p>

            <h4 className="mt-8 text-lg font-semibold text-gray-900 dark:text-white">Pushing to GitHub (with Authentication)</h4>

            <p className="mt-6">Once you've created your GitHub repo and told Claude where to push your project, it'll handle everything else:</p>

            <ul className="mt-6 space-y-2 list-disc list-inside">
              <li>Initialize Git</li>
              <li>Commit your code</li>
              <li>Push it to your repo</li>
            </ul>

            <p className="mt-6">But the first time you do this, you may be asked to authenticate GitHub in your terminal.</p>

            <p className="mt-4 font-medium text-gray-900 dark:text-white">Don't worry—this is normal and only needs to be done once.</p>

            <p className="mt-6">Here's what usually happens:</p>

            <ol className="mt-6 space-y-3 list-decimal list-inside">
              <li>Claude will open a GitHub authentication URL in your browser.</li>
              <li>You'll be asked to log in and authorize GitHub access.</li>
              <li>GitHub will give you a token or code.</li>
              <li>Copy that code and paste it back into the terminal when prompted.</li>
            </ol>

            <p className="mt-6">Once that's done, Claude will finish pushing your project for you.</p>

            <p className="mt-6 font-medium text-gray-900 dark:text-white">Your code is now safely backed up in GitHub—and ready to deploy to Vercel.</p>

            <h3 className="mt-10 text-xl font-bold tracking-tight text-gray-900 dark:text-white">2. Deploy to Vercel</h3>
            <p className="mt-6">Now that your code is on GitHub, it's time to make it <em>live</em>.</p>

            <p className="mt-4">We'll use <strong>Vercel</strong>—a super fast, free hosting platform that's perfect for websites like yours.</p>

            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <p className="font-semibold text-gray-900 dark:text-white">What is Vercel?</p>
              <p className="mt-2 text-gray-700 dark:text-gray-300">Vercel is a free hosting platform for websites. It automatically rebuilds and redeploys your site each time you update your GitHub repo—so you never have to manually "re-upload" your site. Make an edit → push to GitHub → Vercel updates automatically. It's that simple.</p>
            </div>

            <p className="mt-6">Here's how to deploy:</p>

            <ol className="mt-6 space-y-3 list-decimal list-inside">
              <li>Go to <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-[#7866CC] hover:underline">vercel.com</a></li>
              <li>Sign up with your <strong>GitHub account</strong> (this connects Vercel to your repos)</li>
              <li>Once you're in, click <strong>Add New Project</strong></li>
              <li>Select your repo (the one you just created)</li>
              <li>Vercel will auto-detect your setup (Next.js, Tailwind, etc.)</li>
              <li>Click <strong>Deploy</strong></li>
            </ol>

            <p className="mt-6">That's it.</p>

            <p className="mt-4">In about 60 seconds, your site will go live at a URL like:</p>

            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
              <pre className="text-sm text-gray-700 dark:text-gray-300">https://yourproject.vercel.app</pre>
            </div>

            <p className="mt-6">You can click that link and share it with anyone. Your site is officially online.</p>

            <h4 className="mt-8 text-lg font-semibold text-gray-900 dark:text-white">Want a custom domain?</h4>
            <p className="mt-6">The <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">.vercel.app</code> link works great, but if you want something like <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">yourname.com</code>, you can set that up too.</p>

            <p className="mt-4">Here's how:</p>

            <ul className="mt-6 space-y-2 list-disc list-inside">
              <li>In your Vercel dashboard, click your project</li>
              <li>Go to <strong>Settings</strong> → <strong>Domains</strong></li>
              <li>Add your domain (if you already own one) or purchase one directly through Vercel</li>
            </ul>

            <p className="mt-6">Vercel will walk you through connecting it. It usually takes 5-10 minutes.</p>

            <p className="mt-6 font-medium text-gray-900 dark:text-white">Your site is now live, deployed, and ready to share with the world.</p>
          </div>

          {/* What's Next Section */}
          <div id="whats-next" className="mt-16 max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">What's Next? (Post-Launch Checklist)</h2>

            <p className="mt-6">Congrats—your site is live!</p>

            <p className="mt-4">But now the fun part begins: making it <em>yours</em>.</p>

            <p className="mt-6">Here's what most people do next:</p>

            <h3 className="mt-10 text-xl font-bold tracking-tight text-gray-900 dark:text-white">1. Update your content</h3>
            <p className="mt-6">If you used placeholder text or stock images, now's the time to replace them with your real info.</p>

            <p className="mt-4">Use <strong>Chat with AI</strong> in Pawgrammer to make updates easily. For example:</p>

            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <p className="text-gray-700 dark:text-gray-300">"Can you update the About page to say [your bio] instead of the placeholder text?"</p>
            </div>

            <p className="mt-6">Claude will make the changes, save the file, and you can push the update to GitHub → and Vercel will auto-deploy it.</p>

            <h3 className="mt-10 text-xl font-bold tracking-tight text-gray-900 dark:text-white">2. Customize the design</h3>
            <p className="mt-6">Want to change the colors, fonts, or layout? Just ask.</p>

            <p className="mt-4">Example prompt:</p>

            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <p className="text-gray-700 dark:text-gray-300">"Can you make the hero section background a light beige and center the CTA button?"</p>
            </div>

            <p className="mt-6">Or:</p>

            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <p className="text-gray-700 dark:text-gray-300">"Change the primary brand color to #FF6B6B and update all buttons to match."</p>
            </div>

            <p className="mt-6">You don't have to know CSS. Just describe what you want—Claude will handle it.</p>

            <h3 className="mt-10 text-xl font-bold tracking-tight text-gray-900 dark:text-white">3. Add new pages or features</h3>
            <p className="mt-6">Maybe you want to add a blog, a contact form, or a pricing page.</p>

            <p className="mt-4">All you have to do is ask Chat with AI:</p>

            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <p className="text-gray-700 dark:text-gray-300">"Can you add a blog page with a list of posts and individual post pages?"</p>
            </div>

            <p className="mt-6">Claude will generate the structure, add routing, and set it up so it's fully functional.</p>

            <h3 className="mt-10 text-xl font-bold tracking-tight text-gray-900 dark:text-white">4. Set up a custom domain</h3>
            <p className="mt-6">If you skipped this earlier and want your site at <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">yourname.com</code> instead of <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">yourproject.vercel.app</code>, you can connect a custom domain anytime.</p>

            <p className="mt-4">Just head to your Vercel dashboard → <strong>Domains</strong> and follow the prompts.</p>

            <h3 className="mt-10 text-xl font-bold tracking-tight text-gray-900 dark:text-white">5. Get feedback or help</h3>
            <p className="mt-6">Built something cool? Share it!</p>

            <ul className="mt-6 space-y-2 list-disc list-inside">
              <li>Drop your link in the <a href="https://discord.gg/RFuCgdTxXx" target="_blank" rel="noopener noreferrer" className="text-[#7866CC] hover:underline">Pawgrammer Discord</a></li>
              <li>Ask for feedback, feature ideas, or troubleshooting help</li>
              <li>See what others are building and get inspired</li>
            </ul>

            <p className="mt-6">We love seeing what you make.</p>

            <h3 className="mt-10 text-xl font-bold tracking-tight text-gray-900 dark:text-white">6. Keep building</h3>
            <p className="mt-6">You just built your first site. That's huge.</p>

            <p className="mt-4">But here's the thing: the more you build, the better you get.</p>

            <p className="mt-6">Try building another site—maybe:</p>

            <ul className="mt-6 space-y-2 list-disc list-inside">
              <li>A portfolio for a friend</li>
              <li>A landing page for a side project</li>
              <li>A lightweight web app or tool you've been thinking about</li>
              <li>A simple client project (yes, you can do that now)</li>
            </ul>

            <p className="mt-6">Just click <strong>+ New Project</strong> in Pawgrammer, type your prompt, and go.</p>

            <p className="mt-6 font-medium text-gray-900 dark:text-white">You've already done the hard part—getting started.</p>

            <p className="mt-4">Everything from here is just practice, iteration, and leveling up.</p>
          </div>

          {/* Breadcrumb Navigation */}
          <nav className="mt-12 mb-8" aria-label="Breadcrumb">
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
                {post.title}
              </li>
            </ol>
          </nav>
            </div>

            {/* Table of Contents - Sticky Sidebar */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                  Tutorial Steps
                </h3>
                <nav>
                  <ul className="space-y-2">
                    {tocItems.map((item) => (
                      <li key={item.id}>
                        <button
                          onClick={() => scrollToSection(item.id)}
                          className={`text-left w-full text-sm py-1.5 px-2 rounded transition-colors ${
                            activeSection === item.id
                              ? 'bg-[#7866CC] text-white font-medium'
                              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                        >
                          {item.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
      <EarlyAccessModal
        isOpen={isEarlyAccessModalOpen}
        onClose={() => setIsEarlyAccessModalOpen(false)}
      />
    </div>
  );
};

export default BlogPostNoCodeWebsite;
