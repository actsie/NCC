# Blog CMS Documentation

This project uses a simple file-based CMS for blog content to ensure consistency across the blog index and individual post pages.

## ⚠️ IMPORTANT: Single Source of Truth

All blog post metadata (title, date, author, etc.) is stored in **ONE PLACE ONLY**:

```
src/data/blogPosts.js
```

**DO NOT** edit blog post metadata in individual component files. Always update the CMS data file.

## File Structure

```
src/
├── data/
│   └── blogPosts.js          ← EDIT THIS for blog metadata
├── BlogIndex.js              ← Uses CMS data automatically 
└── BlogPostClaudeNoCode.js   ← Uses CMS data automatically
```

## How to Add a New Blog Post

### 1. Add Post Data

Edit `src/data/blogPosts.js` and add a new post object:

```javascript
export const blogPosts = [
  {
    id: 2, // Increment the ID
    slug: 'your-new-post-slug',
    title: 'Your New Post Title',
    description: 'Brief description for the blog index page...',
    date: 'Sep 15, 2025',
    datetime: '2025-09-15',
    category: { title: 'Category Name', href: '#' },
    imageUrl: '/your-post-image.png',
    author: {
      name: 'Author Name',
      role: 'Role',
      href: '#',
      imageUrl: '/author-image.png',
    },
    metaTitle: 'SEO Title for the browser tab',
    metaDescription: 'Meta description for search engines and social sharing...',
  },
  // ... existing posts
];
```

### 2. Create the Blog Post Component

Create a new component file like `src/BlogPostYourSlug.js`:

```javascript
import React from 'react';
import { getBlogPostBySlug } from './data/blogPosts';
import Header from './components/Header';
import Footer from './components/Footer';

const BlogPostYourSlug = () => {
  const post = getBlogPostBySlug('your-new-post-slug');
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      
      <main className="relative isolate px-6 pt-32 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <header className="mb-12">
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
              <time dateTime={post.datetime}>{post.date}</time>
              <span>{post.author.name}</span>
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
              {post.title}
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              {post.metaDescription}
            </p>
          </header>

          {/* Your blog post content here */}
          
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPostYourSlug;
```

### 3. Add Route to App.js

Add the route condition in `src/App.js`:

```javascript
// Add import
import BlogPostYourSlug from './BlogPostYourSlug';

// Add route condition
if (currentPath === '/blog/your-new-post-slug') {
  return <BlogPostYourSlug />;
}
```

## How to Update Existing Blog Posts

### Updating Metadata (title, date, author, etc.)

**✅ CORRECT:** Edit `src/data/blogPosts.js`

```javascript
{
  id: 1,
  slug: 'build-custom-ai-workflows-without-code',
  title: 'Updated Title Here', // ← Change here
  date: 'Aug 28, 2025',       // ← Change here
  // ... other fields
}
```

**❌ WRONG:** Editing individual component files
- Don't edit dates in `BlogIndex.js`
- Don't edit titles in `BlogPostClaudeNoCode.js`
- Changes will be overwritten and create inconsistencies

### Updating Blog Content

Blog post content (the actual article text) should be edited in the individual blog post component files like `BlogPostClaudeNoCode.js`.

Only the metadata comes from the CMS data.

## Current Blog Posts

| Slug | Title | Component File |
|------|-------|---------------|
| `build-custom-ai-workflows-without-code` | How to Build Custom Workflow Tools Using AI (Without Code) | `BlogPostClaudeNoCode.js` |

## Helper Functions Available

```javascript
import { getAllBlogPosts, getBlogPostBySlug } from './data/blogPosts';

// Get all posts for the blog index
const posts = getAllBlogPosts();

// Get specific post by slug
const post = getBlogPostBySlug('build-custom-ai-workflows-without-code');
```

## URL Structure

Blog URLs are automatically generated as:
```
/blog/{slug}
```

Where `{slug}` comes from the `slug` field in `blogPosts.js`.

## SEO Fields

Each blog post should include:

- `title` - Used in blog index and post header
- `metaTitle` - Used for browser tab/SEO
- `metaDescription` - Used for search engines and post intro
- `description` - Used in blog index preview
- `datetime` - Used for structured data
- `date` - Human-readable date display

## Troubleshooting

### Dates Don't Match
- Check that both `date` and `datetime` are updated in `blogPosts.js`
- Clear browser cache if changes don't appear

### Post Not Showing
- Verify the slug matches exactly between `blogPosts.js` and your route in `App.js`
- Check that the component is imported correctly in `App.js`

### 404 Error
- Ensure the route condition is added to `App.js`
- Verify the slug in the URL matches the slug in `blogPosts.js`

## Best Practices

1. **Always update dates in both formats:**
   - `date: 'Aug 28, 2025'` (display format)
   - `datetime: '2025-08-28'` (ISO format)

2. **Use descriptive slugs:**
   - Good: `build-custom-ai-workflows-without-code`
   - Bad: `post1` or `new-post`

3. **Keep descriptions concise:**
   - Blog index description: 1-2 sentences
   - Meta description: Under 160 characters for SEO

4. **Test after changes:**
   - Check both `/blog` index page and individual post page
   - Verify dates and titles match

---

**Remember: Always edit `src/data/blogPosts.js` for metadata changes!** 🚨