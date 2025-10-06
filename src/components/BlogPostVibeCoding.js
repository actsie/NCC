import React, { useState } from 'react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import Header from './Header';
import Footer from './Footer';
import BlogButton from '../BlogButton';
import EarlyAccessModal from './EarlyAccessModal';
import { getBlogPostBySlug } from '../data/blogPosts';

const BlogPostVibeCoding = () => {
  const [isEarlyAccessModalOpen, setIsEarlyAccessModalOpen] = useState(false);
  const post = getBlogPostBySlug('vibe-coding-breakpoints');

  React.useEffect(() => {
    document.title = post?.metaTitle || 'Vibe Coding Breakpoints: Why Projects Stall — and How to Build Smarter';

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

  if (!post) {
    return <div>Blog post not found</div>;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      <main className="relative isolate px-6 pt-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700 dark:text-gray-300">
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
            <p className="text-lg leading-8 text-gray-700 dark:text-gray-300">
              For a while, vibe coding feels like pure magic.
            </p>
            <p className="mt-4">
              You type. It builds. You think. It ships. You dream. It demos.
            </p>
            <p className="mt-4">
              But eventually, the flow starts to break down. Progress slows. Dependencies multiply. And what once felt like creative freedom turns into a maze of hard-to-maintain logic and unclear connections.
            </p>
            <p className="mt-6 font-medium text-gray-900 dark:text-white">
              So what happens between the excitement of getting it working — and the frustration of it breaking down?
            </p>
            <p className="mt-4">
              Let's break down the critical vibe coding breakpoints — the common pitfalls that trip up even experienced builders — and how to avoid them with smarter strategies.
            </p>
          </div>

          <div className="mt-16 max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">What Is Vibe Coding?</h2>
            <p className="mt-6">
              Vibe coding is the act of building software through intuition, automation, and AI assistance — often without writing traditional code.
            </p>
            <p className="mt-4">
              It's where no-code tools, AI-powered builders, and natural-language prompts intersect — letting creators turn ideas into tangible prototypes faster than ever before.
            </p>

            <h3 className="mt-10 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Why Vibe Coding Feels Like Magic</h3>
            <p className="mt-6">
              The early stages of vibe coding are intoxicating:
            </p>
            <ul className="mt-6 space-y-2 list-disc list-inside">
              <li>Generate UI layouts from plain English.</li>
              <li>Connect databases in seconds.</li>
              <li>Let AI agents complete workflows.</li>
              <li>Deploy with a single click.</li>
            </ul>
            <p className="mt-6">
              It's rapid, empowering, and energizing — until the system outgrows the simplicity that made it work.
            </p>
          </div>

          <div className="mt-16 max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">The Breaking Points: When the Magic Fades</h2>
            <p className="mt-6">
              Let's break down the most common reasons vibe coding projects stall.
            </p>

            <h3 className="mt-10 text-xl font-bold tracking-tight text-gray-900 dark:text-white">1. Complexity & Maintenance Roadblocks</h3>
            <p className="mt-6">
              No-code is easy to start with, but harder to sustain as projects grow.
            </p>

            <h4 className="mt-8 text-lg font-semibold text-gray-900 dark:text-white">Tightly Coupled Logic</h4>
            <p className="mt-4">
              What starts simple often grows into a setup that's sensitive to change. Even small edits can have unintended ripple effects across your workflows.
            </p>

            <h4 className="mt-8 text-lg font-semibold text-gray-900 dark:text-white">Limited Flexibility Over Time</h4>
            <p className="mt-4">
              Early versions feel fast to build — but iterating or expanding often means reworking from the ground up.
            </p>

            <h4 className="mt-8 text-lg font-semibold text-gray-900 dark:text-white">Missing Critical Features</h4>
            <p className="mt-4">
              Authentication, billing, or custom integrations may be unsupported — or require patchy workarounds that introduce risk.
            </p>

            <h4 className="mt-8 text-lg font-semibold text-gray-900 dark:text-white">Shallow Functional Depth</h4>
            <p className="mt-4">
              No-code excels at prototypes, but falters when asked to support advanced business logic, complex API layers, or precise control.
            </p>

            <h3 className="mt-10 text-xl font-bold tracking-tight text-gray-900 dark:text-white">2. Unseen Costs & Financial Friction</h3>
            <p className="mt-6">
              It starts cheap — until it isn't.
            </p>

            <h4 className="mt-8 text-lg font-semibold text-gray-900 dark:text-white">Scaling Surprises</h4>
            <p className="mt-4">
              That $20/month plan can quietly balloon as usage increases — leaving teams suddenly facing $200+ tiers.
            </p>

            <h4 className="mt-8 text-lg font-semibold text-gray-900 dark:text-white">Token Sinkholes</h4>
            <p className="mt-4">
              AI-powered tools often use token-based pricing models, making cost unpredictable as requests scale.
            </p>

            <h4 className="mt-8 text-lg font-semibold text-gray-900 dark:text-white">The Guinea Pig Effect</h4>
            <p className="mt-4">
              Some builders realize too late they're testing unstable tools in production — effectively paying to debug early-stage products.
            </p>

            <h3 className="mt-10 text-xl font-bold tracking-tight text-gray-900 dark:text-white">3. Debugging, Visibility & Trust</h3>
            <p className="mt-6">
              This is where vibe coding often collapses — when things break and there's no clear way to fix them.
            </p>

            <h4 className="mt-8 text-lg font-semibold text-gray-900 dark:text-white">The Black Box Problem</h4>
            <p className="mt-4">
              When tools or AI agents handle the logic for you, it's not always clear how things work under the surface. For simple flows, that's fine — but as things get more layered, visibility drops, and fixing issues becomes harder without a clear mental model.
            </p>

            <h4 className="mt-8 text-lg font-semibold text-gray-900 dark:text-white">Critical Failures at Key Moments</h4>
            <p className="mt-4">
              Most builds don't crash dramatically — they just stop doing exactly what you expect. A missed trigger here, a renamed field there. Without full visibility, small issues can slip by until someone clicks the wrong button or sees unexpected output.
            </p>

            <h4 className="mt-8 text-lg font-semibold text-gray-900 dark:text-white">Lost in Translation</h4>
            <p className="mt-4">
              When AI handles too much of the build, it can be hard to understand what's actually happening behind the scenes. When things aren't clear, small updates take longer — and it's easy to second-guess what the system is doing.
            </p>

            <h3 className="mt-10 text-xl font-bold tracking-tight text-gray-900 dark:text-white">4. The Illusion of Effortlessness</h3>
            <p className="mt-6">
              Vibe coding flows well — until it doesn't. AI's limits become clearer as the project expands.
            </p>

            <h4 className="mt-8 text-lg font-semibold text-gray-900 dark:text-white">Context Collisions</h4>
            <p className="mt-4">
              Language models have memory constraints. Large projects can exceed that context, leading to inconsistencies.
            </p>

            <h4 className="mt-8 text-lg font-semibold text-gray-900 dark:text-white">Abstract Prompt Syndrome</h4>
            <p className="mt-4">
              Vague prompts lead to vague results. When inputs lack structure, outcomes become harder to predict or refine.
            </p>

            <h4 className="mt-8 text-lg font-semibold text-gray-900 dark:text-white">Project Management Fatigue</h4>
            <p className="mt-4">
              Managing AI tools becomes a coordination challenge — like working with an intern who's brilliant, but forgetful.
            </p>
          </div>

          <div className="mt-16 max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Avoiding the Drop-Off</h2>
            <p className="mt-6">
              So, how do you keep the momentum without letting your system become unmanageable?
            </p>

            <h3 className="mt-10 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Scaling Without Imploding</h3>
            <ul className="mt-6 space-y-2 list-disc list-inside">
              <li>Plan for growth from the start.</li>
              <li>Treat vibe coding as a starting point, not the entire journey.</li>
              <li>Combine lightweight tools like Pawgrammer with scalable architecture (e.g., Supabase, n8n, etc.) when needed.</li>
            </ul>

            <h3 className="mt-10 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Maintenance Without Mayhem</h3>
            <ul className="mt-6 space-y-2 list-disc list-inside">
              <li>Break large tasks into smaller prompts.</li>
              <li>Use clear, formatted inputs.</li>
              <li>Learn just enough of the underlying tech to stay in control.</li>
              <li>Use AI and no-code for lightweight, fast builds — not for systems that need long-term complexity (yet).</li>
            </ul>

            <h3 className="mt-10 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Controlling Costs</h3>
            <ul className="mt-6 space-y-2 list-disc list-inside">
              <li>Audit prompt design — shorter, more precise prompts = less waste.</li>
              <li>Prefer flat-rate or usage-transparent tools.</li>
              <li>Explore in beta, launch in production-grade environments.</li>
            </ul>
          </div>

          <div className="mt-16 max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">The 1-Hour Rule: A Builder's Golden Guideline</h2>
            <p className="mt-6">
              One builder summed it up perfectly on Reddit:
            </p>
            <p className="mt-4 italic text-gray-600 dark:text-gray-400">
              "If you can build it in an hour, vibe it. If it'll take more than two, structure it."
            </p>
            <p className="mt-6">
              This rule separates play from production.
            </p>
            <p className="mt-4">
              Vibe coding shines in fast ideation. But when permanence and reliability matter, systems need more intention.
            </p>
          </div>

          <div className="mt-16 max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">The Future of Vibe Coding</h2>
            <p className="mt-6">
              Vibe coding isn't a gimmick. It's how a new generation of builders moves from idea to execution.
            </p>
            <p className="mt-4">
              As AI gains memory and reliability — and as tools like Pawgrammer continue to evolve — the boundaries between prototyping and production will blur.
            </p>
            <p className="mt-4">
              Tomorrow's tools will bring structure and speed together. And tomorrow's builders will know how to balance both.
            </p>
          </div>

          <div className="mt-16 max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">FAQs</h2>

            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">What is vibe coding?</h3>
              <p className="mt-2">
                Using AI and no-code tools to build software without writing traditional code — relying on prompts, logic flows, and fast iteration.
              </p>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Why does vibe coding stop working?</h3>
              <p className="mt-2">
                It struggles under complexity — especially around debugging, scaling, and deep customization.
              </p>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Can vibe coding scale?</h3>
              <p className="mt-2">
                Yes, but not alone. You need architecture, fallback plans, and hybrid stacks.
              </p>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Is vibe coding replacing developers?</h3>
              <p className="mt-2">
                Not yet. It's augmenting them — making creative work faster and more accessible.
              </p>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">How can I control AI tool costs?</h3>
              <p className="mt-2">
                Track usage, use flat-rate tools, and simplify prompts to avoid waste.
              </p>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">What's the best stack for hybrid vibe coding?</h3>
              <p className="mt-2">
                Start with tools like Pawgrammer for fast builds. Pair with Supabase and n8n for scale.
              </p>
            </div>
          </div>

          <div className="mt-16 max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Conclusion</h2>
            <p className="mt-6">
              Vibe coding is a revolution in creative development — a bridge between ideas and interaction.
            </p>
            <p className="mt-4 font-medium text-gray-900 dark:text-white">
              But magic without structure is fleeting.
            </p>
            <p className="mt-4">
              Know where the breakpoints are. Build with intention. Use the tools that help you stay fast and focused.
            </p>
            <p className="mt-4">
              That's what we're building with Pawgrammer — a way for marketers and new builders to prototype smarter, share faster, and move ideas forward with clarity.
            </p>
            <p className="mt-6 font-medium text-gray-900 dark:text-white">
              The future of building is already here. Let's make sure it lasts.
            </p>
          </div>

          {/* CTA Section */}
          <div className="mt-16 border-t border-gray-200 dark:border-gray-700 pt-16">
            <div className="relative isolate overflow-hidden px-6 py-12 shadow-sm rounded-3xl sm:px-16" style={{ backgroundColor: '#EBE5FD' }}>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Ready to build smarter?
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-700">
                Pawgrammer helps you prototype faster and share your ideas with clarity. Join the waitlist to get early access.
              </p>
              <div className="mt-8 flex items-center gap-x-6">
                <BlogButton onClick={() => setIsEarlyAccessModalOpen(true)}>
                  Join the waitlist
                </BlogButton>
              </div>
            </div>
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
      </main>

      <Footer />
      <EarlyAccessModal
        isOpen={isEarlyAccessModalOpen}
        onClose={() => setIsEarlyAccessModalOpen(false)}
      />
    </div>
  );
};

export default BlogPostVibeCoding;
