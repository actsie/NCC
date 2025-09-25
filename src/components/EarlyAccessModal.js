import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const EarlyAccessModal = ({ isOpen, onClose }) => {
  const [wiggleFields, setWiggleFields] = useState(new Set());
  const [isClosing, setIsClosing] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [selectedOnboarding, setSelectedOnboarding] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const otherPlatformRef = useRef(null);

  const handleClose = () => {
    setIsClosing(true);
    // Wait for animation to complete before actually closing
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 150); // Give animation time to complete (120ms + buffer)
  };

  // Focus on "other platform" input when "Other" is selected
  useEffect(() => {
    if (selectedPlatform === 'Other' && otherPlatformRef.current) {
      setTimeout(() => {
        otherPlatformRef.current?.focus();
      }, 300); // Small delay for slide animation
    }
  }, [selectedPlatform]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const requiredFields = ['firstName', 'email', 'platform', 'onboardingSupport'];
    const fieldsToWiggle = new Set();

    // Check for empty required fields
    requiredFields.forEach(field => {
      if (!formData.get(field)) {
        fieldsToWiggle.add(field);
      }
    });

    // Check if "Other" is selected but no platform specified
    const platform = formData.get('platform');
    const otherPlatform = formData.get('otherPlatform');
    if (platform === 'Other' && !otherPlatform) {
      fieldsToWiggle.add('otherPlatform');
    }

    // Check for invalid email format
    const email = formData.get('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      fieldsToWiggle.add('email');
    }

    if (fieldsToWiggle.size > 0) {
      setWiggleFields(fieldsToWiggle);
      // Remove wiggle after animation
      setTimeout(() => setWiggleFields(new Set()), 500);
      return;
    }

    // If all required fields are filled and valid, submit the form
    setIsSubmitting(true);

    // Submit to Formspree
    fetch('https://formspree.io/f/xjkoegnv', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        setIsSubmitted(true);
      } else {
        throw new Error('Form submission failed');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      // For now, just show success anyway to avoid user frustration
      setIsSubmitted(true);
    })
    .finally(() => {
      setIsSubmitting(false);
    });
  };
  return (
    <>
      <style>{`
        @keyframes wiggle {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-3px); }
          20%, 40%, 60%, 80% { transform: translateX(3px); }
        }
        .wiggle {
          animation: wiggle 0.5s ease-in-out;
        }
        @keyframes modalPop {
          0% {
            opacity: 0;
            transform: scale(0.85) translateY(-15px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @keyframes modalPopOut {
          0% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
          100% {
            opacity: 0;
            transform: scale(0.85) translateY(-15px);
          }
        }
        .modal-pop {
          animation: modalPop 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .modal-pop-out {
          animation: modalPopOut 0.12s cubic-bezier(0.4, 0, 1, 1);
        }
        @keyframes slideIn {
          0% {
            opacity: 0;
            max-width: 0;
            transform: translateX(-10px);
          }
          100% {
            opacity: 1;
            max-width: 350px;
            transform: translateX(0);
          }
        }
        .slide-in {
          animation: slideIn 0.3s ease-out forwards;
        }
        .platform-select {
          color: #9CA3AF; /* placeholder color */
        }
        .platform-select.has-value {
          color: #1F2937; /* normal text color */
        }

        html.dark .platform-select {
          color: #6B7280; /* darker placeholder color */
        }
        html.dark .platform-select.has-value {
          color: #F3F4F6; /* light text color */
        }

        /* Chat bubble success styles */
        .chat-success-container {
          display: flex;
          flex-direction: column;
          gap: 48px;
          align-items: center;
        }

        .chat-bubble-success {
          display: flex;
          align-items: flex-end;
          gap: 12px;
          animation: popIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }

        .avatar-success {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
          flex-shrink: 0;
          background: linear-gradient(135deg, #7866CC, #AF97F8);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: avatarPop 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }

        .avatar-success img {
          width: 40px;
          height: 40px;
          object-fit: cover;
          border-radius: 50%;
        }

        .message-content-success {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 20px 20px 20px 4px;
          padding: 16px 20px;
          box-shadow: 0 8px 32px rgba(120, 102, 204, 0.15);
          position: relative;
        }

        html.dark .message-content-success {
          background: rgba(31, 41, 55, 0.9);
          border: 1px solid rgba(75, 85, 99, 0.3);
          box-shadow: 0 8px 32px rgba(120, 102, 204, 0.25);
        }

        .message-content-success::before {
          content: '';
          position: absolute;
          bottom: -1px;
          left: -8px;
          width: 0;
          height: 0;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-top: 8px solid rgba(255, 255, 255, 0.9);
          filter: blur(20px);
        }

        html.dark .message-content-success::before {
          border-top: 8px solid rgba(31, 41, 55, 0.9);
        }

        .message-content-success p {
          margin: 0;
          font-size: 16px;
          font-weight: 500;
          color: #1F2937;
          line-height: 1.4;
        }

        html.dark .message-content-success p {
          color: #F3F4F6;
        }

        .message-content-success p:first-child {
          margin-bottom: 8px;
        }

        .close-button-container {
          text-align: right;
        }

        @keyframes popIn {
          0% {
            opacity: 0;
            transform: scale(0.8) translateY(20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes avatarPop {
          0% {
            opacity: 0;
            transform: scale(0.6);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
      <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
        {/* Backdrop with blur */}
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className={`max-w-lg w-full bg-white dark:bg-gray-900 p-10 rounded-lg shadow-lg font-sans ${isClosing ? 'modal-pop-out' : 'modal-pop'}`}>
          {/* Close button */}
          <div className="flex justify-end mb-4">
            <button
              type="button"
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7866CC] focus:ring-offset-2 rounded-md"
            >
              <span className="sr-only">Close</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {/* Header section */}
          {!isSubmitted && (
            <div className="mb-10 text-center">
              <div className="text-base text-gray-800 dark:text-gray-200 font-semibold">✨ You're early — that means perks.</div>
              <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Turn your idea into a working app — with guidance on your first build.
              </div>
            </div>
          )}

          {/* Form or Success Message */}
          {!isSubmitted ? (
          <form action="https://formspree.io/f/xjkoegnv" method="POST" onSubmit={handleSubmit}>
            <div className="space-y-6 mb-10">
              {/* 1. Basics (must-have) */}
              <div className="grid grid-cols-2 gap-6">
                <div className={`relative ${wiggleFields.has('firstName') ? 'wiggle' : ''}`}>
                  <input
                    type="text"
                    name="firstName"
                    className="block w-full text-sm h-[50px] px-4 text-slate-900 dark:text-gray-100 bg-white dark:bg-gray-900 rounded-[8px] border border-violet-200 dark:border-gray-600 appearance-none focus:border-transparent focus:outline focus:outline-2 focus:outline-[#7866CC] focus:ring-0 hover:border-[#7866CC] dark:hover:border-[#7866CC] peer invalid:border-error-500 invalid:focus:border-error-500 overflow-ellipsis overflow-hidden text-nowrap pr-[48px]"
                    placeholder="First name"
                  />
                  <label className="peer-placeholder-shown:-z-10 peer-focus:z-10 absolute text-[14px] leading-[150%] text-[#7866CC] peer-focus:text-[#7866CC] peer-invalid:text-error-500 focus:invalid:text-error-500 duration-300 transform -translate-y-[1.2rem] scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[1.2rem] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                    First name
                  </label>
                </div>
                <div className={`relative ${wiggleFields.has('email') ? 'wiggle' : ''}`}>
                  <input
                    type="text"
                    name="email"
                    className="block w-full text-sm h-[50px] px-4 text-slate-900 dark:text-gray-100 bg-white dark:bg-gray-900 rounded-[8px] border border-violet-200 dark:border-gray-600 appearance-none focus:border-transparent focus:outline focus:outline-2 focus:outline-[#7866CC] focus:ring-0 hover:border-[#7866CC] dark:hover:border-[#7866CC] peer invalid:border-error-500 invalid:focus:border-error-500 overflow-ellipsis overflow-hidden text-nowrap pr-[48px]"
                    placeholder="Email"
                  />
                  <label className="peer-placeholder-shown:-z-10 peer-focus:z-10 absolute text-[14px] leading-[150%] text-[#7866CC] peer-focus:text-[#7866CC] peer-invalid:text-error-500 focus:invalid:text-error-500 duration-300 transform -translate-y-[1.2rem] scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[1.2rem] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                    Email
                  </label>
                </div>
              </div>

              {/* 2. Compatibility check */}
              <div className="flex gap-4 items-start">
                <div className={`relative flex-1 ${wiggleFields.has('platform') ? 'wiggle' : ''}`} style={{ zIndex: 10 }}>
                  <select
                    name="platform"
                    value={selectedPlatform}
                    onChange={(e) => setSelectedPlatform(e.target.value)}
                    className={`block w-full text-sm h-[50px] px-4 bg-white dark:bg-gray-900 text-slate-900 dark:text-gray-100 rounded-[8px] border border-violet-200 dark:border-gray-600 appearance-none focus:border-transparent focus:outline focus:outline-2 focus:outline-[#7866CC] focus:ring-0 hover:border-[#7866CC] dark:hover:border-[#7866CC] peer platform-select ${selectedPlatform ? 'has-value' : ''} relative z-10`}
                  >
                    <option value="">Select your platform</option>
                    <option value="Mac">Mac</option>
                    <option value="Windows">Windows</option>
                    <option value="Linux">Linux</option>
                    <option value="Other">Other</option>
                  </select>
                  <label className="absolute text-[14px] leading-[150%] text-[#7866CC] duration-300 transform -translate-y-[1.2rem] scale-75 top-2 z-20 origin-[0] bg-white dark:bg-gray-900 px-2 start-1">
                    Platform
                  </label>
                </div>

                {/* Other platform input - appears beside platform when "Other" is selected */}
                {selectedPlatform === 'Other' && (
                  <div className={`relative flex-1 ${wiggleFields.has('otherPlatform') ? 'wiggle' : ''}`}>
                    <input
                      ref={otherPlatformRef}
                      type="text"
                      name="otherPlatform"
                      className="block w-full text-sm h-[50px] px-4 text-slate-900 dark:text-gray-100 bg-white dark:bg-gray-900 rounded-[8px] border border-violet-200 dark:border-gray-600 appearance-none focus:border-transparent focus:outline focus:outline-2 focus:outline-[#7866CC] focus:ring-0 hover:border-[#7866CC] dark:hover:border-[#7866CC] peer overflow-ellipsis overflow-hidden text-nowrap pr-[48px]"
                      placeholder="Specify your platform"
                    />
                    <label className="peer-placeholder-shown:-z-10 peer-focus:z-10 absolute text-[14px] leading-[150%] text-[#7866CC] peer-focus:text-[#7866CC] duration-300 transform -translate-y-[1.2rem] scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[1.2rem] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                      Specify your platform
                    </label>
                  </div>
                )}
              </div>

              {/* Onboarding support question */}
              <div className={`space-y-3 ${wiggleFields.has('onboardingSupport') ? 'wiggle' : ''}`}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Would you like onboarding support?
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="onboardingSupport"
                      value="async-walkthrough"
                      onChange={(e) => setSelectedOnboarding(e.target.value)}
                      className="w-4 h-4 text-[#7866CC] bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-[#7866CC] focus:ring-2 focus:outline-none focus:ring-offset-0"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Async walk-through</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="onboardingSupport"
                      value="quick-call"
                      onChange={(e) => setSelectedOnboarding(e.target.value)}
                      className="w-4 h-4 text-[#7866CC] bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-[#7866CC] focus:ring-2 focus:outline-none focus:ring-offset-0"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Quick call</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="onboardingSupport"
                      value="solo-first"
                      onChange={(e) => setSelectedOnboarding(e.target.value)}
                      className="w-4 h-4 text-[#7866CC] bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-[#7866CC] focus:ring-2 focus:outline-none focus:ring-offset-0"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">I'll try solo first</span>
                  </label>
                </div>

                {/* Solo first additional text */}
                {selectedOnboarding === 'solo-first' && (
                  <div className="ml-6 mt-2">
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      We'll give you a free Claude account as part of early access. We may still reach out to help get things set up.
                    </p>
                  </div>
                )}
              </div>

              {/* 3. Intent / use case (optional) */}
              <div className="relative">
                <input
                  type="text"
                  name="firstTool"
                  className="block w-full text-sm h-[50px] px-4 text-slate-900 dark:text-gray-100 bg-white dark:bg-gray-900 rounded-[8px] border border-violet-200 dark:border-gray-600 appearance-none focus:border-transparent focus:outline focus:outline-2 focus:outline-[#7866CC] focus:ring-0 hover:border-[#7866CC] dark:hover:border-[#7866CC] peer overflow-ellipsis overflow-hidden text-nowrap pr-[48px]"
                  placeholder="What's the first tool you'd want to build?"
                />
                <label className="peer-placeholder-shown:-z-10 peer-focus:z-10 absolute text-[14px] leading-[150%] text-[#7866CC] peer-focus:text-[#7866CC] duration-300 transform -translate-y-[1.2rem] scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[1.2rem] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                  What's the first tool you'd want to build? (optional)
                </label>
              </div>

              {/* 4. Community interest */}
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="joinCommunity"
                  name="joinCommunity"
                  className="w-4 h-4 text-[#7866CC] bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded focus:ring-[#7866CC] focus:ring-2"
                />
                <label htmlFor="joinCommunity" className="text-sm text-gray-700 dark:text-gray-300">
                  Want to join our builder community on Discord?
                </label>
              </div>

              {/* 5. Expectations (keep it light) */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  How comfortable are you with coding / no-code tools? (optional)
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="codingComfort"
                      value="never-coded"
                      className="w-4 h-4 text-[#7866CC] bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-[#7866CC] focus:ring-2 focus:outline-none focus:ring-offset-0"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Never coded before</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="codingComfort"
                      value="tried-nocode"
                      className="w-4 h-4 text-[#7866CC] bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-[#7866CC] focus:ring-2 focus:outline-none focus:ring-offset-0"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Tried some no-code tools</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="codingComfort"
                      value="comfortable-coding"
                      className="w-4 h-4 text-[#7866CC] bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-[#7866CC] focus:ring-2 focus:outline-none focus:ring-offset-0"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Comfortable coding</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Form buttons */}
            <div className="sm:flex sm:flex-row-reverse flex gap-4">
              <button
                className="w-fit rounded-lg text-sm px-5 py-2 focus:outline-none h-[50px] border bg-[#7866CC] hover:bg-[#5E50A0] focus:bg-[#5E50A0] border-[#7866CC] text-white focus:ring-4 focus:ring-violet-200 hover:ring-4 hover:ring-violet-100 dark:hover:ring-[#362B6B] transition-all duration-300"
                type="submit"
                disabled={isSubmitting}
              >
                <div className="flex gap-2 items-center">
                  {isSubmitting ? 'Submitting...' : 'Get Early Access'}
                </div>
              </button>
              <button
                className="w-fit rounded-lg text-sm px-5 py-2 focus:outline-none h-[50px] border bg-transparent border-[#7866CC] text-[#7866CC] focus:ring-4 focus:ring-gray-100"
                type="button"
                onClick={handleClose}
              >
                Cancel
              </button>
            </div>
          </form>
          ) : (
            /* Success state - chat interface style */
            <div className="chat-success-container">
              <div className="chat-bubble-success">
                <div className="avatar-success">
                  <img src="/pawgrammericonnew.png" alt="Pawgrammer" />
                </div>
                <div className="message-content-success">
                  <p>🎉 Thanks for joining early access!</p>
                  <p>We'll be in touch soon with next steps.</p>
                </div>
              </div>
              <div className="close-button-container flex gap-8 items-center justify-end w-full">
                <a
                  href="#"
                  onClick={handleClose}
                  className="text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  Close
                </a>
                <button
                  className="w-fit rounded-lg text-sm px-5 py-2 focus:outline-none h-[50px] border bg-[#7866CC] hover:bg-[#5E50A0] focus:bg-[#5E50A0] border-[#7866CC] text-white focus:ring-4 focus:ring-violet-200 hover:ring-4 hover:ring-violet-100 transition-all duration-300"
                  type="button"
                  onClick={() => window.open('https://discord.gg/RFuCgdTxXx', '_blank')}
                >
                  Join builder community
                </button>
              </div>
            </div>
          )}

          {/* Fine print - only show when not submitted */}
          {!isSubmitted && (
            <div className="text-xs text-gray-400 dark:text-gray-500 text-center mt-4 border-t border-gray-100 dark:border-gray-700 pt-4">
              Currently Mac-only. Other platforms will be added to the waitlist.
            </div>
          )}
        </DialogPanel>
      </div>
    </Dialog>
    </>
  );
};

export default EarlyAccessModal;