import React, { useState } from 'react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import Header from './Header';
import Footer from './Footer';
import BlogButton from '../BlogButton';
import EarlyAccessModal from './EarlyAccessModal';
import { getBlogPostBySlug } from '../data/blogPosts';

const BlogPostMarketers = () => {
  const [isEarlyAccessModalOpen, setIsEarlyAccessModalOpen] = useState(false);
  const post = getBlogPostBySlug('why-great-marketers-build');

  React.useEffect(() => {
    document.title = post?.metaTitle || 'Why great marketers don\'t wait — they build.';

    // Update meta description
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
      {/* Header */}
      <Header />

      {/* Blog Post Content */}
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
              Every marketer has felt this moment:
            </p>
            <p className="mt-4">
              You've got the spark. The campaign idea is clear. You know the "aha" moment you want your audience to feel.
            </p>
            <p className="mt-4">
              But then comes the drag:
            </p>
            <p className="mt-4">
              You need engineering time. A ticket goes in. You wait days — or weeks — just to get a basic prototype. Momentum dies. The idea gets watered down, or worse, shelved.
            </p>
            <p className="mt-6 font-medium text-gray-900 dark:text-white">
              This is a broken model. And you don't need to accept it.
            </p>
          </div>

          <div className="mt-16 max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Why Interactive Beats Static</h2>
            <p className="mt-6">
              Today's best marketers aren't just storytellers — they're builders.
            </p>
            <p className="mt-4">
              They don't pitch ideas in a slide deck.
            </p>
            <p className="mt-4">
              They show them in motion.
            </p>
            <p className="mt-6">
              Why? Because an interactive prototype does what words alone can't:
            </p>
            <p className="mt-4">
              It gives your team (or your client, or your boss) something to click, explore, feel.
            </p>
            <p className="mt-4">
              That experience creates buy-in. It gets ideas greenlit. Fast.
            </p>
            <p className="mt-6 font-medium text-gray-900 dark:text-white">
              The truth is, you don't need to wait on engineering to make that happen anymore.
            </p>
            <p className="mt-4">
              No-code tools have changed the game — if you know how to use them.
            </p>

            <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Empowerment Over Engineering</h2>
            <p className="mt-6">
              We built Pawgrammer for marketers who are ready to take that power into their own hands.
            </p>
            <p className="mt-6">
              It's a no-code tool that lets you quickly create:
            </p>

            <ul className="mt-6 space-y-3 text-gray-700 dark:text-gray-300">
              <li className="flex items-start">
                <span className="mr-3">✨</span>
                <span>Playful branded quizzes</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3">✨</span>
                <span>Clickable campaign tools</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3">✨</span>
                <span>Interactive microsites</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3">✨</span>
                <span>Real prototypes that feel like the final product</span>
              </li>
            </ul>

            <p className="mt-6">
              All without writing a single line of code.
            </p>

            <p className="mt-8">
              If you've ever said:
            </p>
            <blockquote className="mt-4 border-l-4 border-[#7866CC] pl-6 italic text-gray-600 dark:text-gray-400">
              "I just need to show the team what this could look like…"
            </blockquote>
            <p className="mt-4">
              then Pawgrammer was built for you.
            </p>

            <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Why This Matters</h2>
            <p className="mt-6">
              Being able to build your ideas isn't just about speed. It's about influence.
            </p>
            <p className="mt-4">
              It's about getting your vision across without compromise.
            </p>
            <p className="mt-6">
              Because when people see your idea in action, they stop nitpicking — and start getting excited.
            </p>
            <p className="mt-6">
              The next generation of marketers won't just write briefs.
            </p>
            <p className="mt-2">
              They'll launch concepts.
            </p>
            <p className="mt-2">
              Test in-market.
            </p>
            <p className="mt-2">
              Share links instead of PDFs.
            </p>
            <p className="mt-2">
              Prototype faster than competitors can schedule meetings.
            </p>

            <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">TL;DR: Stop Waiting. Start Showing.</h2>
            <p className="mt-6">
              Marketers don't need permission to build anymore.
            </p>
            <p className="mt-4">
              You've got the vision. Now you've got the tools.
            </p>
            <p className="mt-6">
              We're opening a few more beta spots next week.
            </p>
            <p className="mt-4">
              If you're ready to show more and wait less — we'd love to have you.
            </p>

            <div className="mt-8 flex justify-start">
              <BlogButton
                navigateToChat={false}
                onClick={() => setIsEarlyAccessModalOpen(true)}
              >
                Join Beta Waitlist
              </BlogButton>
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
                  Why great marketers don't wait — they build.
                </li>
              </ol>
            </nav>
          </div>
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

export default BlogPostMarketers;
