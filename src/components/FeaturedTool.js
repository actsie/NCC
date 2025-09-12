import React, { useState, useCallback, useMemo } from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipboardDocumentListIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { PlayIcon } from '@heroicons/react/24/solid';

const FeaturedTool = ({
  title,
  oneLiner,
  videoId,
  demoUrl,
  badge = "NEW"
}) => {
  const [open, setOpen] = useState(false);

  const poster = useMemo(
    () => `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
    [videoId]
  );
  
  const embedSrc = useMemo(
    () => `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`,
    [videoId]
  );

  const track = useCallback((event, props = {}) => {
    // Analytics-agnostic tracking
    if (typeof window !== 'undefined') {
      window.gtag?.('event', event, props);
      window.posthog?.capture?.(event, props);
      window.analytics?.track?.(event, props);
    }
  }, []);

  return (
    <section aria-labelledby="featured-tool" className="mx-auto max-w-5xl mb-16">
      {/* Shine Border Demo Button Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .shine-demo-button {
            position: relative;
            display: inline-flex;
            align-items: center;
            padding: 10px 16px;
            border-radius: 12px;
            background: linear-gradient(135deg, #ffffff, #f9fafb);
            color: #1f2937;
            text-decoration: none;
            font-weight: 500;
            font-size: 0.875rem;
            overflow: hidden;
            transition: all 0.2s ease;
            border: 1px solid rgba(120, 102, 204, 0.3);
          }

          .shine-demo-button:hover {
            transform: translateY(-1px);
            box-shadow: 0 10px 25px rgba(120, 102, 204, 0.1);
          }

          .shine-border-mask {
            position: absolute;
            inset: 0;
            border-radius: inherit;
            padding: 1.5px;
            mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
            -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
            mask-composite: exclude;
            -webkit-mask-composite: xor;
            pointer-events: none;
          }

          .shine-border-glow {
            background: conic-gradient(
              from 0deg,
              transparent 0%,
              rgba(120, 102, 204, 0.4) 8%,
              rgba(175, 151, 248, 0.3) 12%,
              transparent 18%
            );
            position: absolute;
            inset: -150px;
            animation: rotateShine 4s linear infinite;
          }

          @keyframes rotateShine {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }

          /* Pause animation on hover for better UX */
          .shine-demo-button:hover .shine-border-glow {
            animation-play-state: paused;
          }

          /* Dark mode adjustments */
          .dark .shine-demo-button {
            background: linear-gradient(135deg, #1f2937, #374151);
            color: #ffffff;
            border-color: rgba(190, 174, 226, 0.3);
          }

          .dark .shine-demo-button:hover {
            box-shadow: 0 10px 25px rgba(120, 102, 204, 0.2);
          }

          .dark .shine-border-glow {
            background: conic-gradient(
              from 0deg,
              transparent 0%,
              rgba(190, 174, 226, 0.7) 10%,
              rgba(175, 151, 248, 0.5) 15%,
              transparent 20%
            );
          }

          /* Accessibility: Respect reduced motion preference */
          @media (prefers-reduced-motion: reduce) {
            .shine-border-glow {
              animation: none;
            }
          }

          /* Focus styles for accessibility */
          .shine-demo-button:focus {
            outline: 2px solid rgba(120, 102, 204, 0.5);
            outline-offset: 2px;
          }
        `
      }} />
      <div className="mb-6 flex items-center gap-3">
        <h2 id="featured-tool" className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
          Featured Tool
        </h2>
        <span className="rounded-full bg-[#7866CC] text-white px-3 py-1 text-sm font-medium">
          {badge} ✨
        </span>
      </div>

      <motion.article 
        className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-xl p-6 md:p-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col gap-8 md:flex-row md:items-start">
          {/* Left: Content + CTAs */}
          <div className="md:w-1/2 space-y-6">
            <div>
              <div className="mb-4">
                <span className="inline-flex items-center gap-x-2 rounded-full bg-gray-50 dark:bg-gray-700 px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <ClipboardDocumentListIcon className="h-4 w-4" />
                  Productivity
                </span>
              </div>
              <h3 className="text-3xl font-semibold text-gray-900 dark:text-white mb-3">
                {title}
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {oneLiner}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              {/* Primary CTA - Custom Shine Border Button */}
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open live demo in a new tab"
                onClick={() => track('examples.featured_demo_click')}
                className="shine-demo-button"
              >
                <div className="shine-border-mask">
                  <div className="shine-border-glow"></div>
                </div>
                <span className="relative z-10">Try the Demo</span>
              </a>
            </div>
          </div>

          {/* Right: Video Thumbnail */}
          <div className="md:w-1/2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setOpen(true);
                track('examples.video_open_from_thumb');
              }}
              className="group relative block w-full overflow-hidden rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#7866CC]/20"
              aria-label="Play demo video"
            >
              <div className="aspect-video bg-gray-900">
                <img
                  src={poster}
                  alt={`${title} demo video thumbnail`}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors duration-200">
                <div className="rounded-full bg-white/90 backdrop-blur-sm p-4 shadow-lg">
                  <PlayIcon className="h-8 w-8 text-[#7866CC]" />
                </div>
              </div>
            </motion.button>
          </div>
        </div>
      </motion.article>

      {/* Video Modal */}
      <AnimatePresence>
        {open && (
          <Dialog open={open} onClose={setOpen} className="relative z-50">
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              aria-hidden="true"
            />
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4">
                <DialogPanel
                  as={motion.div}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="w-full max-w-5xl overflow-hidden rounded-2xl bg-white dark:bg-gray-900 shadow-2xl ring-1 ring-black/10 dark:ring-white/10"
                >
                  <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 p-4">
                    <DialogTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                      {title} — Demo Video
                    </DialogTitle>
                    <button
                      className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#7866CC] transition-colors duration-200"
                      onClick={() => setOpen(false)}
                      aria-label="Close video modal"
                    >
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>
                  <div className="aspect-video">
                    <iframe
                      title={`${title} demo video`}
                      src={embedSrc}
                      allow="autoplay; encrypted-media; picture-in-picture; web-share"
                      allowFullScreen
                      className="h-full w-full"
                      referrerPolicy="no-referrer"
                      onLoad={() => track('examples.video_iframe_loaded')}
                    />
                  </div>
                </DialogPanel>
              </div>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </section>
  );
};

export default FeaturedTool;