import React, { useState, useEffect, useRef } from 'react';
import {
  XMarkIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';

const ReportBugModal = ({ isOpen, onClose, prefillData = {} }) => {
  const [formData, setFormData] = useState({
    summary: '',
    location: 'Pawgrammer app',
    steps: '',
    errorOutput: '',
    email: '',
    website: '', // honeypot field
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState('idle'); // idle, success, error
  const [ticketId, setTicketId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [mailtoLink, setMailtoLink] = useState('');
  const [formLoadTime] = useState(Date.now());

  const modalRef = useRef(null);
  const firstInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Reset form when opening
      setFormData({
        summary: '',
        location: 'Pawgrammer app',
        steps: '',
        errorOutput: '',
        email: '',
        website: '',
      });
      setSubmitState('idle');
      setTicketId('');
      setErrorMessage('');
      setMailtoLink('');

      // Focus first input
      setTimeout(() => firstInputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Final validation
    if (formData.summary.trim().length < 5) {
      setErrorMessage('Summary must be at least 5 characters');
      return;
    }

    // Honeypot check
    if (formData.website) {
      return;
    }

    // Timing check
    if (Date.now() - formLoadTime < 2000) {
      setErrorMessage('Please slow down and review your submission');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      // Collect metadata
      const meta = {
        pageUrl: prefillData.pageUrl || window.location.href,
        ua: navigator.userAgent,
        viewport: `${window.innerWidth}x${window.innerHeight}`,
        formLoadTime,
      };

      const payload = {
        ...formData,
        ...meta,
      };

      const response = await fetch('/api/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.ok) {
        setTicketId(result.ticketId);
        setSubmitState('success');
      } else {
        setSubmitState('error');
        setErrorMessage(result.error || 'Failed to submit report');
        if (result.mailto) {
          setMailtoLink(result.mailto);
        }
      }
    } catch (error) {
      setSubmitState('error');
      setErrorMessage('Network error. Please try again or email us.');
      setMailtoLink(`mailto:stacy@pawgrammer.com?subject=Bug Report&body=${encodeURIComponent(`Summary: ${formData.summary}\n\nSteps: ${formData.steps || 'N/A'}\n\nError: ${formData.errorOutput || 'N/A'}`)}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const canSubmit = formData.summary.trim().length >= 5 && !isSubmitting;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <ExclamationCircleIcon className="h-6 w-6 text-red-500" />
            <h2 id="modal-title" className="text-xl font-bold text-gray-900 dark:text-white">
              Report a Bug
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            aria-label="Close modal"
          >
            <XMarkIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          {submitState === 'success' ? (
            // Success State
            <div className="text-center py-8">
              <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Thanks! Report submitted
              </h3>
              <div className="inline-flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg mb-4">
                <span className="text-lg font-mono font-bold text-purple-600 dark:text-purple-400">
                  {ticketId}
                </span>
                <button
                  onClick={() => copyToClipboard(ticketId)}
                  className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition"
                  title="Copy ticket ID"
                >
                  <DocumentDuplicateIcon className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                </button>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We'll review this soon. {formData.email && "Check your email for updates."}
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition"
              >
                Close
              </button>
            </div>
          ) : (
            // Form
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Message */}
              {submitState === 'error' && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <p className="text-red-800 dark:text-red-200 font-medium mb-2">
                    {errorMessage}
                  </p>
                  {mailtoLink && (
                    <a
                      href={mailtoLink}
                      className="text-red-700 dark:text-red-300 underline hover:no-underline"
                    >
                      Email us instead →
                    </a>
                  )}
                </div>
              )}

              {errorMessage && submitState === 'idle' && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
                  <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                    {errorMessage}
                  </p>
                </div>
              )}

              {/* Summary */}
              <div>
                <label htmlFor="summary" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  Summary <span className="text-red-500">*</span>
                </label>
                <input
                  ref={firstInputRef}
                  type="text"
                  id="summary"
                  name="summary"
                  value={formData.summary}
                  onChange={handleChange}
                  placeholder="What went wrong?"
                  required
                  maxLength={120}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {formData.summary.length}/120 characters (min 5)
                </p>
              </div>

              {/* Location */}
              <div>
                <label htmlFor="location" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  Where did this happen?
                </label>
                <select
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="Pawgrammer app">Pawgrammer app</option>
                  <option value="Website">Website</option>
                </select>
              </div>

              {/* Helper for app logs */}
              {formData.location === 'Pawgrammer app' && (
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <p className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    📋 How to get logs from Pawgrammer:
                  </p>
                  <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1 list-disc list-inside">
                    <li>Copy any visible error text into the "Paste error output" field below</li>
                    <li>Take a screenshot of the error window and attach it</li>
                    <li>(Future: If the app has "Export Logs", attach that file)</li>
                  </ul>
                </div>
              )}

              {/* Steps */}
              <div>
                <label htmlFor="steps" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  Steps to reproduce
                </label>
                <textarea
                  id="steps"
                  name="steps"
                  value={formData.steps}
                  onChange={handleChange}
                  placeholder="1. Open the app&#10;2. Click on...&#10;3. See error"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {/* Error Output */}
              <div>
                <label htmlFor="errorOutput" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  Paste error output
                </label>
                <div className="relative">
                  <textarea
                    id="errorOutput"
                    name="errorOutput"
                    value={formData.errorOutput}
                    onChange={handleChange}
                    placeholder="Error: Cannot read property 'x' of undefined&#10;  at Object.fn (...)&#10;  ..."
                    rows={6}
                    className="w-full px-4 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 font-mono text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  {formData.errorOutput && (
                    <button
                      type="button"
                      onClick={() => copyToClipboard(formData.errorOutput)}
                      className="absolute top-2 right-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition"
                      title="Copy error output"
                    >
                      <DocumentDuplicateIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    </button>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  Email for follow-up (optional)
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {/* Honeypot */}
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />

              {/* Privacy Note */}
              <div className="bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg p-3">
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  🔒 We only use this info to triage your report. No tracking beyond this submission.
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className={`flex-1 px-6 py-2 font-semibold rounded-lg transition ${
                    canSubmit
                      ? 'bg-purple-600 hover:bg-purple-700 text-white'
                      : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Report'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportBugModal;