import React, { useState } from 'react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import Header from './Header';
import Footer from './Footer';
import BlogButton from '../BlogButton';
import EarlyAccessModal from './EarlyAccessModal';
import { getBlogPostBySlug } from '../data/blogPosts';

const BlogPostTravelPacking = () => {
  const [isEarlyAccessModalOpen, setIsEarlyAccessModalOpen] = useState(false);
  const post = getBlogPostBySlug('how-travelers-really-pack');

  React.useEffect(() => {
    // Set page title
    document.title = post?.metaTitle || 'How travelers really pack (and what they leave behind)';

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

    // Add keywords meta tag
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', post?.keywords || '');
    } else {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      metaKeywords.content = post?.keywords || '';
      document.head.appendChild(metaKeywords);
    }

    // Add Open Graph meta tags for social sharing
    const ogTags = [
      { property: 'og:title', content: post?.metaTitle || post?.title },
      { property: 'og:description', content: post?.metaDescription || post?.description },
      { property: 'og:type', content: 'article' },
      { property: 'og:url', content: window.location.href },
      { property: 'og:image', content: post?.imageUrl ? `${window.location.origin}${post.imageUrl}` : '' },
      { property: 'article:published_time', content: post?.datetime },
      { property: 'article:author', content: post?.author?.name },
      { property: 'article:tag', content: post?.tags?.join(', ') || '' }
    ];

    ogTags.forEach(tag => {
      let meta = document.querySelector(`meta[property="${tag.property}"]`);
      if (meta) {
        meta.setAttribute('content', tag.content);
      } else {
        meta = document.createElement('meta');
        meta.setAttribute('property', tag.property);
        meta.setAttribute('content', tag.content);
        document.head.appendChild(meta);
      }
    });

    // Add Twitter Card meta tags
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: post?.metaTitle || post?.title },
      { name: 'twitter:description', content: post?.metaDescription || post?.description },
      { name: 'twitter:image', content: post?.imageUrl ? `${window.location.origin}${post.imageUrl}` : '' }
    ];

    twitterTags.forEach(tag => {
      let meta = document.querySelector(`meta[name="${tag.name}"]`);
      if (meta) {
        meta.setAttribute('content', tag.content);
      } else {
        meta = document.createElement('meta');
        meta.setAttribute('name', tag.name);
        meta.setAttribute('content', tag.content);
        document.head.appendChild(meta);
      }
    });

    // Add structured data (JSON-LD) for rich snippets
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post?.title,
      "description": post?.description,
      "image": post?.imageUrl ? `${window.location.origin}${post.imageUrl}` : '',
      "author": {
        "@type": "Organization",
        "name": post?.author?.name,
        "url": window.location.origin
      },
      "publisher": {
        "@type": "Organization",
        "name": "Pawgrammer",
        "logo": {
          "@type": "ImageObject",
          "url": `${window.location.origin}/pawgrammer.png`
        }
      },
      "datePublished": post?.datetime,
      "dateModified": post?.datetime,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": window.location.href
      },
      "keywords": post?.keywords,
      "articleSection": post?.category?.title,
      "wordCount": "1200", // Approximate word count
      "timeRequired": `PT${post?.readingTime?.replace(' min', 'M') || '5M'}`
    };

    let script = document.querySelector('script[type="application/ld+json"]');
    if (script) {
      script.textContent = JSON.stringify(structuredData);
    } else {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }

    // Analytics tracking for blog views
    if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
      window.gtag('event', 'page_view', {
        page_title: post?.title,
        page_location: window.location.href,
        content_group1: 'Blog',
        content_group2: post?.category?.title,
        custom_parameter_1: post?.slug
      });
    }

    // Simple view tracking (you can replace with your analytics service)
    const trackBlogView = async () => {
      try {
        // Example analytics tracking - replace with your service
        console.log('Blog view tracked:', {
          slug: post?.slug,
          title: post?.title,
          timestamp: new Date().toISOString(),
          url: window.location.href,
          referrer: document.referrer
        });

        // You could send this to your analytics service:
        // await fetch('/api/track-view', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ slug: post?.slug, timestamp: new Date() })
        // });
      } catch (error) {
        console.error('Failed to track blog view:', error);
      }
    };

    trackBlogView();

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
            <p className="text-xl leading-8 text-gray-700 dark:text-gray-300">
              From pre-packed kits to "just buy it later," here's how people really pack. We analyzed dozens of traveler insights to uncover the systems that work.
            </p>

            <p className="mt-6">
              Everyone stresses about forgetting something, but most seasoned travelers aren't chasing perfect packing. They're building repeatable systems they trust.
            </p>

          </div>

          <div className="mt-16 max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Why it matters (for travelers)</h2>
            <ul className="mt-6 space-y-3">
              <li>• Packing stress steals energy from the trip.</li>
              <li>• Forgetting an item feels bigger than it is.</li>
              <li>• Overpacking vs. underpacking tracks more with preference than skill.</li>
            </ul>

            <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Master Lists Rule (with a Twist)</h2>
            <p className="mt-6">
              Dozens rely on a master list they copy and tweak for each trip. Some keep it in a notes app, others on paper, and many refine it after every journey. A single reusable list saves brainpower and reveals gaps before you zip the bag.
            </p>

            <div className="mt-8 bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">By the numbers</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Mentioned by 10+ travelers.</li>
                <li>• Common categories: clothes, toiletries, tech, documents, misc.</li>
                <li>• Some include "to do" tasks (water plants, set mail hold).</li>
              </ul>
            </div>

            <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Pre-Packed Kits = Less Last-Minute Stress</h2>
            <p className="mt-6">
              Toiletries, meds, chargers, adapters: many keep these in a dedicated pouch they rarely unpack. Examples included refilling toiletries right after returning, keeping meds in the backpack, and a standing "tech pouch." Treat it like a go-bag and the morning-of panic drops.
            </p>

            <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Essentials-Only Mindset</h2>
            <p className="mt-6">
              Several replies boiled it down to five: passport, cards, meds, phone, charger. Everything else is replaceable. Framing gear this way lowers anxiety; forgetting a toothbrush is annoying, not trip-ending.
            </p>

            <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Overpacking: Divisive, Not Wrong</h2>
            <p className="mt-6">
              Some travelers cut to carry-on only. Others happily pay for checked to reduce stress. Comfort beats competition.
            </p>

            <div className="mt-8 bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">By the numbers</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• One traveler packed 14.5 kg for four nights and used it all.</li>
                <li>• Others used a small backpack for the same length of trip.</li>
              </ul>
            </div>

            <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Post-Trip Notes Make You Smarter</h2>
            <p className="mt-6">
              People update their list after each trip: remove what went unused, add what was missed. Systems improve fast when you capture lessons while they're fresh.
            </p>

            <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">What to Do Next (Actionable Takeaways)</h2>
            <ol className="mt-6 space-y-3 list-decimal list-inside">
              <li>Start a master list in your notes app; duplicate per trip.</li>
              <li>Build a permanent go-bag for toiletries and chargers.</li>
              <li>Decide your essentials line (passport, meds, cards, phone, charger).</li>
              <li>Try one trip with 20% fewer clothes and see what you miss.</li>
              <li>After you return, update the list for next time.</li>
            </ol>

            <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">The Opportunity</h2>
            <p className="mt-6">
              Most packing tools are either too barebones (static checklists you copy-paste) or too bloated (apps that feel like project management software). There's room for something that:
            </p>

            <ul className="mt-6 space-y-3">
              <li>• Captures the essentials without endless setup</li>
              <li>• Works offline so your data stays private</li>
              <li>• Improves over time with post-trip notes</li>
              <li>• Handles categories flexibly (clothes, tech, toiletries, documents)</li>
              <li>• Lets you reset and reuse without starting from scratch</li>
            </ul>

            <p className="mt-6">
              That's why we built a packing list generator with Pawgrammer—local-first, no accounts, no subscriptions, and your data stays on your device. You can create a master list once, tweak it per trip, and keep a reusable, stress-free system.
            </p>

            <p className="mt-6">
              Here's a demo of what we built given the opportunities: <a
                href="https://packing-list-generator-zeta.vercel.app/"
                className="text-[#7866CC] hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://packing-list-generator-zeta.vercel.app/
              </a>
            </p>

            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Watch the walkthrough video:</h3>
              <div className="aspect-video w-full max-w-2xl">
                <iframe
                  className="w-full h-full rounded-lg"
                  src="https://www.youtube.com/embed/ql06ZfTCSLc"
                  title="Packing List Generator Walkthrough"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <BlogButton
                navigateToChat={false}
                onClick={() => setIsEarlyAccessModalOpen(true)}
              >
                Build your own
              </BlogButton>
            </div>

            <div className="mt-16 bg-[#7866CC]/10 dark:bg-[#7866CC]/20 rounded-lg p-8">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">TL;DR</h2>
              <p className="mt-4 text-gray-700 dark:text-gray-300">
                Packing works best as a system, not a guess. Master lists, pre-packed kits, and a short essentials list keep stress low. Overpack or underpack if you want—trust the process that fits you.
              </p>
            </div>

            <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Assumptions & Limits</h2>
            <ul className="mt-6 space-y-3 text-gray-700 dark:text-gray-300">
              <li>• Insights drawn from ~45 traveler replies.</li>
              <li>• Directional, not a statistical study.</li>
            </ul>

            <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Sources</h2>
            <p className="mt-6">
              <a
                href="https://www.reddit.com/r/femaletravels/comments/1n84y4l/how_do_you_make_sure_you_dont_overpack_or_forget/"
                className="text-[#7866CC] hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Reddit thread on overpacking, essentials, and lists
              </a>
            </p>

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
                  How travelers really pack (and what they leave behind)
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

export default BlogPostTravelPacking;