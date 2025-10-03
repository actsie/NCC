// Blog post data - single source of truth for all blog content
export const blogPosts = [
  {
    id: 4,
    slug: 'why-great-marketers-build',
    title: 'Prototypes speak louder than decks.',
    description: 'Every marketer has felt this moment: You\'ve got the spark. The campaign idea is clear. But then comes the drag: waiting for engineering time. Today\'s best marketers don\'t wait — they build.',
    date: 'Oct 3, 2025',
    datetime: '2025-10-03',
    category: { title: 'Marketing', href: '#' },
    imageUrl: '/mktrs.png',
    author: {
      name: 'Pawgrammer Team',
      role: 'Product Team',
      href: '#',
      imageUrl: '/pawgrammer.png',
    },
    // Meta data for SEO
    metaTitle: 'Why great marketers don\'t wait — they build.',
    metaDescription: 'Today\'s best marketers aren\'t just storytellers — they\'re builders. Learn how no-code tools like Pawgrammer empower marketers to prototype campaigns, build interactive experiences, and get ideas greenlit faster.',
    keywords: 'marketing prototypes, no-code marketing tools, campaign tools, interactive marketing, marketer empowerment, no-code prototyping',
    readingTime: '4 min',
    tags: ['marketing', 'no-code', 'prototyping', 'campaign tools'],
  },
  {
    id: 3,
    slug: 'how-travelers-really-pack',
    title: 'How travelers really pack (and what they leave behind)',
    description: 'From pre-packed kits to "just buy it later," here\'s how people really pack. We analyzed real traveler insights to uncover the systems that work.',
    date: 'Sep 23, 2025',
    datetime: '2025-09-23',
    category: { title: 'Travel', href: '#' },
    imageUrl: '/packing-list-generator.png',
    author: {
      name: 'Pawgrammer Team',
      role: 'Product Team',
      href: '#',
      imageUrl: '/pawgrammer.png',
    },
    // Meta data for SEO
    metaTitle: 'How travelers really pack (and what they leave behind) - Travel Packing Systems That Work',
    metaDescription: 'From pre-packed kits to "just buy it later," discover how experienced travelers really pack. Learn the master list system, essential-only mindset, and actionable packing tips that reduce stress.',
    // SEO keywords for travel packing
    keywords: 'travel packing, packing list, travel tips, overpacking, travel essentials, packing system, travel organization',
    readingTime: '5 min',
    tags: ['overpacking', 'packing list', 'essential travel pack'],
  },
  {
    id: 2,
    slug: 'how-job-seekers-track-applications',
    title: 'How Job Seekers Actually Track Their Applications (Based on 90+ Real Replies)',
    description: 'How do job seekers really track applications, resumes, and follow-ups? We analyzed 90+ real replies from Reddit to uncover the most common systems, pain points, and opportunities for something better.',
    date: 'Sep 12, 2025',
    datetime: '2025-09-12',
    category: { title: 'Research', href: '#' },
    imageUrl: '/job-app-tracker-blog.png',
    author: {
      name: 'Pawgrammer Team',
      role: 'Product Team',
      href: '#',
      imageUrl: '/pawgrammer.png',
    },
    // Meta data for SEO
    metaTitle: 'How Job Seekers Actually Track Their Applications (Based on 90+ Real Replies)',
    metaDescription: 'How do job seekers really track applications, resumes, and follow-ups? We analyzed 90+ real replies from Reddit to uncover the most common systems, pain points, and opportunities for something better.',
  },
  {
    id: 1,
    slug: 'build-custom-ai-workflows-without-code',
    title: 'How to Build Custom Workflow Tools Using AI (Without Code)',
    description: 'Learn how to build custom workflow tools that solve your unique problems using AI. From feedback processing to social media discovery - create tools that work exactly how you think.',
    date: 'Aug 27, 2025',
    datetime: '2025-08-27',
    category: { title: 'AI Tools', href: '#' },
    imageUrl: '/no-code-claude-professional-setup.png',
    author: {
      name: 'Pawgrammer Team',
      role: 'Product Team',
      href: '#',
      imageUrl: '/pawgrammer.png',
    },
    // Meta data for SEO
    metaTitle: 'How to Build Custom Workflow Tools Using AI (Without Code)',
    metaDescription: 'Your workflow is unique. Generic apps force you into their templates. AI-powered tools like Claude can understand natural language descriptions and create solutions that match your specific process — here\'s how it works in practice.',
  },
];

// Helper function to get blog post by slug
export const getBlogPostBySlug = (slug) => {
  return blogPosts.find(post => post.slug === slug);
};

// Helper function to get all blog posts
export const getAllBlogPosts = () => {
  return blogPosts;
};