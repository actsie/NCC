import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import Header from './components/Header';
import Footer from './components/Footer';

const posts = [
  {
    id: 1,
    title: 'Build Automation That Fits Your Brain — No Code, Powered by Claude',
    href: '/blog/build-ai-tool-with-claude-no-code',
    description: 'Tired of rigid tools that don\'t match how you think? Learn how to build Claude-powered automations using plain language. No code, no templates, just describe what you need.',
    date: 'Jan 15, 2025',
    datetime: '2025-01-15',
    category: { title: 'No-Code', href: '#' },
    imageUrl: '/no-code-claude-professional-setup.png',
    author: {
      name: 'Pawgrammer Team',
      role: 'Product Team',
      href: '#',
      imageUrl: '/pawgrammer.png',
    },
  },
  {
    id: 2,
    title: 'How to Choose the Right Automation Tool for Your Workflow',
    href: '#',
    description: 'Not all automation tools are created equal. Learn how to evaluate tools based on your unique thinking patterns and workflow preferences.',
    date: 'Jan 10, 2025',
    datetime: '2025-01-10',
    category: { title: 'Productivity', href: '#' },
    imageUrl: '/betterUI.png',
    author: {
      name: 'Pawgrammer Team',
      role: 'Product Team',
      href: '#',
      imageUrl: '/pawgrammer.png',
    },
  },
  {
    id: 3,
    title: 'Why Generic Apps Don\'t Work for Creative Minds',
    href: '#',
    description: 'Explore the psychology behind why mainstream productivity tools often feel wrong for creative professionals and independent thinkers.',
    date: 'Jan 5, 2025',
    datetime: '2025-01-05',
    category: { title: 'Psychology', href: '#' },
    imageUrl: '/ncc-same-ai-better-ui.png',
    author: {
      name: 'Pawgrammer Team',
      role: 'Product Team',
      href: '#',
      imageUrl: '/pawgrammer.png',
    },
  },
];

const BlogIndex = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <Header />

      {/* Blog Content */}
      <div className="py-32 sm:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav className="mx-auto max-w-7xl mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-gray-400">
              <li>
                <a href="/" className="hover:text-gray-300 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <ChevronRightIcon className="h-4 w-4 text-gray-500" />
              </li>
              <li className="text-gray-300 font-medium">
                Blog
              </li>
            </ol>
          </nav>

          {/* Blog Header */}
          <div className="mx-auto max-w-2xl lg:mx-0">
            <motion.h1 
              className="text-4xl font-semibold tracking-tight text-white sm:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              From the blog
            </motion.h1>
            <motion.p 
              className="mt-2 text-lg text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Learn how to build automation that thinks like you do.
            </motion.p>
          </div>
          
          {/* Blog Posts Grid */}
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-700 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {posts.map((post, index) => (
              <motion.article 
                key={post.id} 
                className="flex max-w-xl flex-col items-start justify-between"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Hero Image */}
                <div className="w-full mb-6">
                  <div className="aspect-[16/9] w-full rounded-2xl bg-gray-800 overflow-hidden">
                    <img 
                      src={post.imageUrl} 
                      alt={post.title}
                      className="h-full w-full object-cover object-center transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                </div>

                {/* Post Metadata */}
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={post.datetime} className="text-gray-400">
                    {post.date}
                  </time>
                  <a
                    href={post.category.href}
                    className="relative z-10 rounded-full bg-gray-800/60 px-3 py-1.5 font-medium text-gray-300 hover:bg-gray-800 transition-colors duration-200"
                  >
                    {post.category.title}
                  </a>
                </div>
                
                {/* Post Content */}
                <div className="group relative grow">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-white group-hover:text-gray-300 transition-colors duration-200">
                    <a href={post.href}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </a>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-400">
                    {post.description}
                  </p>
                </div>
                
                {/* Author */}
                <div className="relative mt-8 flex items-center gap-x-4">
                  <div className="h-10 w-10 rounded-full bg-gray-800 overflow-hidden">
                    <img 
                      alt={post.author.name} 
                      src={post.author.imageUrl} 
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-white">
                      <a href={post.author.href}>
                        <span className="absolute inset-0" />
                        {post.author.name}
                      </a>
                    </p>
                    <p className="text-gray-400">{post.author.role}</p>
                  </div>
                </div>
              </motion.article>
            ))}
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

export default BlogIndex;