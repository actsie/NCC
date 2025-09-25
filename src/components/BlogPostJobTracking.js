import React, { useState } from 'react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import Header from './Header';
import Footer from './Footer';
import BlogButton from '../BlogButton';
import EarlyAccessModal from './EarlyAccessModal';
import { getBlogPostBySlug } from '../data/blogPosts';

const BlogPostJobTracking = () => {
  const [isEarlyAccessModalOpen, setIsEarlyAccessModalOpen] = useState(false);
  const post = getBlogPostBySlug('how-job-seekers-track-applications');

  React.useEffect(() => {
    document.title = post?.metaTitle || 'How Job Seekers Actually Track Their Applications';
    
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
            <p className="text-xl leading-8 text-gray-700 dark:text-gray-300">
              We dove into a <a 
                href="https://www.reddit.com/r/jobsearchhacks/comments/1n6coo5/how_do_you_keep_track_of_all_your_job_applications/" 
                className="text-[#7866CC] hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Reddit thread
              </a> asking "How do you keep track of all your job applications?" and analyzed 90+ real replies to understand how people actually manage their job search organization.
            </p>
            
            <p className="mt-6">
              Here's what we found — and what it reveals about the gap between generic tools and what job seekers actually need.
            </p>
          </div>

          <div className="mt-16 max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Why This Matters</h2>
            <p className="mt-6">
              Job searching is overwhelming. You're applying to dozens, sometimes hundreds of positions. Each one has a different process, timeline, and set of people involved. Without a system, applications slip through cracks, follow-ups get forgotten, and opportunities get lost.
            </p>
            
            <p className="mt-6">
              But what systems do people actually use? Not the polished solutions you see in productivity blogs — the real, practiced approaches that job seekers have developed through necessity.
            </p>

            <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">The 5 Main Methods (From Most to Least Common)</h2>

            <h3 className="mt-8 text-xl font-semibold text-gray-900 dark:text-white">1. Spreadsheets (Excel/Google Sheets) — The Clear Winner</h3>
            <p className="mt-4">
              About 60% of responses mentioned spreadsheets. People love the flexibility and control:
            </p>
            
            <blockquote className="mt-6 border-l-4 border-[#7866CC] pl-6 italic text-gray-600 dark:text-gray-400">
              "Google sheet with company name, position, date applied, application status, interview dates, salary range, notes"
            </blockquote>
            
            <blockquote className="mt-4 border-l-4 border-[#7866CC] pl-6 italic text-gray-600 dark:text-gray-400">
              "Excel spreadsheet with tabs for different job types and a main tracker with color coding for different statuses"
            </blockquote>

            <p className="mt-6">
              <strong>👉 Takeaway:</strong> Spreadsheets work because they're infinitely customizable. But they require manual maintenance and don't handle the emotional side of job searching.
            </p>

            <h3 className="mt-12 text-xl font-semibold text-gray-900 dark:text-white">2. Folder & File Naming Systems</h3>
            <p className="mt-4">
              Many people organize by creating folder structures for resumes, cover letters, and job descriptions:
            </p>
            
            <blockquote className="mt-6 border-l-4 border-[#7866CC] pl-6 italic text-gray-600 dark:text-gray-400">
              "I have a folder for each company with subfolders for application materials, correspondence, and research"
            </blockquote>
            
            <blockquote className="mt-4 border-l-4 border-[#7866CC] pl-6 italic text-gray-600 dark:text-gray-400">
              "Rename my resume with Company_Position_Date format so I can track what version I sent where"
            </blockquote>

            <p className="mt-6">
              <strong>👉 Takeaway:</strong> File organization is crucial but often breaks down as the job search scales. People end up with dozens of slightly different resume versions and lose track.
            </p>

            <h3 className="mt-12 text-xl font-semibold text-gray-900 dark:text-white">3. Specialized Tools (Teal, Airtable, Notion)</h3>
            <p className="mt-4">
              Some people use purpose-built tools or adapt general productivity platforms:
            </p>
            
            <blockquote className="mt-6 border-l-4 border-[#7866CC] pl-6 italic text-gray-600 dark:text-gray-400">
              "Teal has been great for this - tracks applications, has a Chrome extension, and helps with resume tailoring"
            </blockquote>
            
            <blockquote className="mt-4 border-l-4 border-[#7866CC] pl-6 italic text-gray-600 dark:text-gray-400">
              "Notion database with different views for status, deadline tracking, and interview prep"
            </blockquote>

            <p className="mt-6">
              <strong>👉 Takeaway:</strong> These work well for organized people but have learning curves. Many require subscription fees that job seekers want to avoid.
            </p>

            <h3 className="mt-12 text-xl font-semibold text-gray-900 dark:text-white">4. Low-Tech / Analog Systems</h3>
            <p className="mt-4">
              Notes apps, physical notebooks, and simple lists still have devoted users:
            </p>
            
            <blockquote className="mt-6 border-l-4 border-[#7866CC] pl-6 italic text-gray-600 dark:text-gray-400">
              "Old school notebook. Write everything down by hand. Something about it helps me remember better."
            </blockquote>
            
            <blockquote className="mt-4 border-l-4 border-[#7866CC] pl-6 italic text-gray-600 dark:text-gray-400">
              "Apple Notes with one long running list. Not pretty but it works and syncs everywhere."
            </blockquote>

            <p className="mt-6">
              <strong>👉 Takeaway:</strong> Simple systems reduce cognitive overhead when you're already stressed about finding work. But they don't scale well.
            </p>

            <h3 className="mt-12 text-xl font-semibold text-gray-900 dark:text-white">5. Minimal or No Tracking</h3>
            <p className="mt-4">
              Surprisingly common — people who rely on email threads and memory:
            </p>
            
            <blockquote className="mt-6 border-l-4 border-[#7866CC] pl-6 italic text-gray-600 dark:text-gray-400">
              "Honestly just use my email. Search for company name when I need to remember what happened."
            </blockquote>
            
            <blockquote className="mt-4 border-l-4 border-[#7866CC] pl-6 italic text-gray-600 dark:text-gray-400">
              "I know I should track better but every system I try feels like more work than the actual applications"
            </blockquote>

            <p className="mt-6">
              <strong>👉 Takeaway:</strong> This approach fails at scale, but reveals how much friction people experience with tracking systems.
            </p>

            <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">The Most Interesting Nuances</h2>

            <h3 className="mt-8 text-xl font-semibold text-gray-900 dark:text-white">Resume Version Management</h3>
            <p className="mt-4">
              Multiple people mentioned the challenge of tracking which resume version went where:
            </p>
            
            <blockquote className="mt-6 border-l-4 border-[#7866CC] pl-6 italic text-gray-600 dark:text-gray-400">
              "My biggest problem is I tailor my resume slightly for each job and then can't remember what I sent them when they call for an interview"
            </blockquote>

            <h3 className="mt-8 text-xl font-semibold text-gray-900 dark:text-white">Emotional Fatigue</h3>
            <p className="mt-4">
              Several replies highlighted how draining the process becomes:
            </p>
            
            <blockquote className="mt-6 border-l-4 border-[#7866CC] pl-6 italic text-gray-600 dark:text-gray-400">
              "Started with a detailed spreadsheet but gave up updating it after 50+ applications. Too depressing to see all the rejections in one place."
            </blockquote>

            <h3 className="mt-8 text-xl font-semibold text-gray-900 dark:text-white">Lost Job Descriptions</h3>
            <p className="mt-4">
              Many people mentioned losing track of the original job posting:
            </p>
            
            <blockquote className="mt-6 border-l-4 border-[#7866CC] pl-6 italic text-gray-600 dark:text-gray-400">
              "Company emails me about next steps but I can't remember what the role was even about because the posting is gone"
            </blockquote>

            <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">By Popularity (Based on Upvotes)</h2>
            <p className="mt-6">
              The most upvoted responses were practical, no-nonsense approaches:
            </p>
            
            <ol className="mt-6 list-decimal list-inside space-y-2">
              <li>Simple Google Sheets with core columns (47 upvotes)</li>
              <li>Notion database with multiple views (31 upvotes)</li>
              <li>"Just use email search" (28 upvotes)</li>
              <li>Airtable with automation (22 upvotes)</li>
              <li>Physical notebook approach (19 upvotes)</li>
            </ol>

            <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Key Insights</h2>
            
            <div className="mt-6 space-y-4">
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white">Universal Pain Points:</h4>
                <ul className="mt-2 list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
                  <li>Tracking which resume version was sent where</li>
                  <li>Remembering job details when companies follow up weeks later</li>
                  <li>Managing follow-up timing without being pushy</li>
                  <li>Maintaining motivation through rejections</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white">What People Actually Want:</h4>
                <ul className="mt-2 list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
                  <li>Something that works offline/locally (privacy concerns)</li>
                  <li>Quick setup without learning curve</li>
                  <li>Automatic capture of job details before postings disappear</li>
                  <li>Smart reminders that don't feel overwhelming</li>
                </ul>
              </div>
            </div>

            <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">The Opportunity</h2>
            <p className="mt-6">
              Most solutions are either too simple (basic spreadsheets) or too complex (enterprise CRMs adapted for job seekers). There's a clear gap for something that:
            </p>
            
            <ul className="mt-6 list-disc list-inside space-y-2">
              <li>Captures the essential information without overwhelming setup</li>
              <li>Works locally so your data stays private</li>
              <li>Handles the emotional side of job searching (progress tracking, motivation)</li>
              <li>Automatically saves job details before they disappear</li>
              <li>Provides gentle follow-up reminders based on typical hiring timelines</li>
            </ul>

            <p className="mt-8">
              We built a local-first job application tracker with Pawgrammer—no accounts, no subscriptions, and your data stays on your device. Add jobs by pasting a link or description, attach your resume (and keep versions), and review everything in a single, unified flow. A clean dashboard shows every application and status without spreadsheet sprawl.
            </p>
            
            <p className="mt-6">
              Here's how it was built, plus a demo you can click around: <a 
                href="https://jobapplication.pawgrammer.com/" 
                className="text-[#7866CC] hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://jobapplication.pawgrammer.com/
              </a>
            </p>
            
            <div className="mt-8">
              <p className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
                Watch the walkthrough video:
              </p>
              
              {/* Embedded YouTube */}
              <div className="video-container">
                <iframe 
                  width="560" 
                  height="315" 
                  src="https://www.youtube.com/embed/pGNIEEcD3f8?rel=0" 
                  title="Job Application Tracker Demo" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full rounded-xl shadow-lg"
                />
              </div>
              
              <style jsx>{`
                .video-container {
                  position: relative;
                  padding-bottom: 56.25%; /* 16:9 aspect ratio */
                  height: 0;
                  margin: 1rem 0;
                }
              `}</style>
            </div>
            
            <div className="mt-8 flex justify-end">
              <BlogButton
                navigateToChat={false}
                onClick={() => setIsEarlyAccessModalOpen(true)}
              >
                Build your own
              </BlogButton>
            </div>

            <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Conclusion</h2>
            <p className="mt-6">
              The Reddit thread revealed that job seekers are incredibly resourceful — they've created systems that work for them using whatever tools are available. But most are making do with imperfect solutions because nothing quite fits their needs.
            </p>
            
            <p className="mt-6">
              The most successful approaches balance structure with flexibility, capture essential information without becoming burdensome, and acknowledge that job searching is as much an emotional challenge as a logistical one.
            </p>

            <p className="mt-8 text-sm text-gray-500 dark:text-gray-400">
              <em>
                Research based on <a 
                  href="https://www.reddit.com/r/jobsearchhacks/comments/1n6coo5/how_do_you_keep_track_of_all_your_job_applications/" 
                  className="text-[#7866CC] hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  this Reddit discussion
                </a> with 90+ replies from job seekers sharing their real tracking methods.
              </em>
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
                  How Job Seekers Actually Track Their Applications
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

export default BlogPostJobTracking;