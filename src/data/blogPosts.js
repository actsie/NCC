// Blog post data - single source of truth for all blog content
export const blogPosts = [
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