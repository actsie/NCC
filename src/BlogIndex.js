import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import Header from './components/Header';
import Footer from './components/Footer';
import { getAllBlogPosts } from './data/blogPosts';

const allPosts = getAllBlogPosts().map(post => ({
  ...post,
  href: `/blog/${post.slug}`
}));

const tutorials = allPosts.filter(post => post.isTutorial);
const posts = allPosts.filter(post => !post.isTutorial);

const BlogIndex = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <Header />

      {/* Blog Content */}
      <div className="py-32 sm:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav className="mx-auto max-w-7xl mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <li>
                <a href="/" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <ChevronRightIcon className="h-4 w-4 text-gray-400 dark:text-gray-500" />
              </li>
              <li className="text-gray-700 dark:text-gray-300 font-medium">
                Blog
              </li>
            </ol>
          </nav>

          {/* Tutorials Section */}
          {tutorials.length > 0 && (
            <>
              <div className="mx-auto max-w-2xl lg:mx-0">
                <motion.h2
                  className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  Tutorials
                </motion.h2>
                <motion.p
                  className="mt-2 text-lg text-gray-600 dark:text-gray-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  Step-by-step guides to help you build better.
                </motion.p>
              </div>

              {/* Tutorials Grid */}
              <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {tutorials.map((post, index) => (
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
                          className="h-full w-full object-cover object-top transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                    </div>

                    {/* Post Metadata */}
                    <div className="flex items-center gap-x-4 text-xs">
                      <time dateTime={post.datetime} className="text-gray-500 dark:text-gray-400">
                        {post.date}
                      </time>
                      <a
                        href={post.category.href}
                        className="relative z-10 rounded-full bg-gray-50 dark:bg-gray-800/60 px-3 py-1.5 font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                      >
                        {post.category.title}
                      </a>
                    </div>

                    {/* Post Content */}
                    <div className="group relative grow">
                      <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-200">
                        <a href={post.href}>
                          <span className="absolute inset-0" />
                          {post.title}
                        </a>
                      </h3>
                      <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-400">
                        {post.description}
                      </p>
                    </div>

                    {/* Author */}
                    <div className="relative mt-8 flex items-center gap-x-4">
                      <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
                        <img
                          alt={post.author.name}
                          src={post.author.imageUrl}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="text-sm leading-6">
                        <p className="font-semibold text-gray-900 dark:text-white">
                          <a href={post.author.href}>
                            <span className="absolute inset-0" />
                            {post.author.name}
                          </a>
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">{post.author.role}</p>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </>
          )}

          {/* Blog Header */}
          <div className="mx-auto max-w-2xl lg:mx-0 mt-20">
            <motion.h2
              className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              From the blog
            </motion.h2>
            <motion.p
              className="mt-2 text-lg text-gray-600 dark:text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Learn how to build automation that thinks like you do.
            </motion.p>
          </div>

          {/* Blog Posts Grid */}
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
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
                      className="h-full w-full object-cover object-top transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                </div>

                {/* Post Metadata */}
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={post.datetime} className="text-gray-500 dark:text-gray-400">
                    {post.date}
                  </time>
                  <a
                    href={post.category.href}
                    className="relative z-10 rounded-full bg-gray-50 dark:bg-gray-800/60 px-3 py-1.5 font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                  >
                    {post.category.title}
                  </a>
                </div>
                
                {/* Post Content */}
                <div className="group relative grow">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-200">
                    <a href={post.href}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </a>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-400">
                    {post.description}
                  </p>
                </div>
                
                {/* Author */}
                <div className="relative mt-8 flex items-center gap-x-4">
                  <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
                    <img 
                      alt={post.author.name} 
                      src={post.author.imageUrl} 
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      <a href={post.author.href}>
                        <span className="absolute inset-0" />
                        {post.author.name}
                      </a>
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">{post.author.role}</p>
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