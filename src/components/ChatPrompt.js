import React, { useState, useEffect, useRef } from 'react';

const ChatPrompt = ({
  idea,
  onIdeaChange,
  shouldWiggle,
  onWiggleEnd,
  email,
  onEmailChange,
  onEmailBlur,
  shouldSplitInputs,
  shouldWiggleEmail,
  onEmailWiggleEnd,
  emailInputRef,
  onSubmit,
  submitButton
}) => {
  const [currentPlaceholder, setCurrentPlaceholder] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [showAvatar, setShowAvatar] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const typewriterIntervalRef = useRef(null);
  const inputRef = useRef(null);

  // Maintain focus on idea input when transitioning to split mode
  useEffect(() => {
    if (shouldSplitInputs && isFocused) {
      // Re-focus the idea input after split transition
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50); // Small delay to allow DOM update
    }
  }, [shouldSplitInputs, isFocused]);

  // Continue typewriter when both inputs are empty
  useEffect(() => {
    if (!shouldSplitInputs) return; // Only applies to split mode

    const shouldShowTypewriter = idea.trim() === '' && email.trim() === '';
    if (shouldShowTypewriter && !isTyping && !isFocused) {
      setIsTyping(true);
    } else if (!shouldShowTypewriter && isTyping) {
      setIsTyping(false);
      setCurrentPlaceholder('');
    }
  }, [idea, email, shouldSplitInputs, isTyping, isFocused]);

  const placeholderPhrases = [
    'Create a budget tracker',
    'Create a job application tracker',
    'Create a goal tracker',
    'Create a packing list generator'
  ];

  const startTypewriter = () => {
    if (typewriterIntervalRef.current) {
      clearTimeout(typewriterIntervalRef.current);
    }

    let currentText = '';
    let isDeleting = false;
    let charIndex = 0;
    let currentPhraseIndex = placeholderIndex;
    let isActive = true;

    const animate = () => {
      if (!isActive) return;

      const currentPhrase = placeholderPhrases[currentPhraseIndex];

      if (!isDeleting) {
        // Typing
        currentText = currentPhrase.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentPhrase.length) {
          // Finished typing, pause then start deleting
          setCurrentPlaceholder(currentText);
          typewriterIntervalRef.current = setTimeout(() => {
            isDeleting = true;
            animate();
          }, 2000);
          return;
        }
      } else {
        // Deleting
        currentText = currentPhrase.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
          // Finished deleting, move to next phrase
          isDeleting = false;
          currentPhraseIndex = (currentPhraseIndex + 1) % placeholderPhrases.length;
          setPlaceholderIndex(currentPhraseIndex);
          setCurrentPlaceholder(currentText);
          typewriterIntervalRef.current = setTimeout(() => {
            animate();
          }, 500);
          return;
        }
      }

      setCurrentPlaceholder(currentText);
      typewriterIntervalRef.current = setTimeout(animate, isDeleting ? 12.5 : 50);
    };

    // Store cleanup function
    typewriterIntervalRef.cleanup = () => {
      isActive = false;
    };

    animate();
  };

  useEffect(() => {
    if (isTyping && !isFocused) {
      startTypewriter();
    }

    return () => {
      if (typewriterIntervalRef.current) {
        clearTimeout(typewriterIntervalRef.current);
      }
      if (typewriterIntervalRef.cleanup) {
        typewriterIntervalRef.cleanup();
      }
    };
  }, [isTyping, isFocused, placeholderIndex]);

  // Pop animation on component mount
  useEffect(() => {
    // Avatar pops in first
    const avatarTimer = setTimeout(() => {
      setShowAvatar(true);
    }, 200);

    // Chat bubble pops in after avatar
    const bubbleTimer = setTimeout(() => {
      setShowBubble(true);
    }, 400);

    return () => {
      clearTimeout(avatarTimer);
      clearTimeout(bubbleTimer);
    };
  }, []);


  const handleFocus = () => {
    setIsFocused(true);
    setIsTyping(false);
    setCurrentPlaceholder('');
  };


  const handleBlur = () => {
    setIsFocused(false);
    if (idea === '') {
      setIsTyping(true);
    }
  };

  return (
    <div className="mt-12 max-w-2xl mx-auto">
      {/* Chat Bubble */}
      <div className="flex items-end space-x-3 mb-6">
        <div className="flex-shrink-0">
          <img
            src="/pawgrammericonnew.png"
            alt="Pawgrammer"
            className={`h-10 w-10 rounded-full transition-all duration-300 ease-out ${
              showAvatar
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-75'
            }`}
          />
        </div>
        <div className="flex-1">
          <div
            className={`bg-white dark:bg-white rounded-2xl rounded-bl-sm px-4 py-3 max-w-xs transition-all duration-300 ease-out ${
              showBubble
                ? 'opacity-100 scale-100 translate-y-0'
                : 'opacity-0 scale-95 translate-y-2'
            }`}
            style={{boxShadow: '0 0 20px rgba(120, 102, 204, 0.1)'}}
          >
            <p className="text-sm font-medium text-gray-900 text-left">
              What personal tool do you want to build?
            </p>
          </div>
        </div>
      </div>

      {/* Typing indicator above input */}
      <div className="flex justify-end mt-8 mb-2">
        <div className="bg-purple-100 dark:bg-purple-900/30 rounded-2xl rounded-tr-sm px-3 py-2 shadow-sm shadow-purple-500/10">
          <div className="flex space-x-1">
            <div
              className="w-2 h-2 bg-purple-400 dark:bg-purple-300 rounded-full"
              style={{
                animation: 'typing-bounce 1.4s infinite'
              }}
            ></div>
            <div
              className="w-2 h-2 bg-purple-400 dark:bg-purple-300 rounded-full"
              style={{
                animation: 'typing-bounce 1.4s infinite 0.2s'
              }}
            ></div>
            <div
              className="w-2 h-2 bg-purple-400 dark:bg-purple-300 rounded-full"
              style={{
                animation: 'typing-bounce 1.4s infinite 0.4s'
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={(e) => { e.preventDefault(); onSubmit && onSubmit(); }} className="space-y-3">
        {!shouldSplitInputs ? (
          /* Single Input Mode */
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              name="idea"
              value={idea}
              onChange={(e) => {
                onIdeaChange(e.target.value);
              }}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder={isFocused ? '' : currentPlaceholder}
              className={`w-full px-4 py-3 text-sm border rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors ${
                shouldWiggle
                  ? 'animate-wiggle !border-red-400 dark:!border-red-400 focus:!border-red-400 focus:!ring-red-400'
                  : 'border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent'
              }`}
              aria-label="Describe the personal tool you want to build"
              aria-describedby="idea-help-text"
              aria-invalid={shouldWiggle}
              aria-required="true"
              onAnimationEnd={(e) => {
                if (e.animationName === 'wiggle' && onWiggleEnd) {
                  onWiggleEnd();
                }
              }}
            />
          </div>
        ) : (
          /* Split Input Mode */
          <div className="input-split-container">
            <div className="split-input-wrapper">
              <input
                ref={inputRef}
                type="text"
                name="idea"
                value={idea}
                onChange={(e) => {
                  onIdeaChange(e.target.value);
                }}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder={isFocused ? '' : (isTyping ? currentPlaceholder : 'What do you want to build?')}
                className={`split-input idea-input px-4 py-3 text-sm border rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors ${
                  shouldWiggle
                    ? 'animate-wiggle !border-red-400 dark:!border-red-400 focus:!border-red-400 focus:!ring-red-400'
                    : 'border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent'
                }`}
                aria-label="What do you want to build?"
                aria-describedby="idea-help-text"
                aria-invalid={shouldWiggle}
                aria-required="true"
                onAnimationEnd={(e) => {
                  if (e.animationName === 'wiggle' && onWiggleEnd) {
                    onWiggleEnd();
                  }
                }}
              />
            </div>
            <div className="split-input-wrapper">
              <input
                ref={emailInputRef}
                type="email"
                name="email"
                value={email}
                onChange={(e) => {
                  onEmailChange && onEmailChange(e.target.value);
                }}
                onBlur={onEmailBlur}
                placeholder="Enter email address"
                className={`split-input email-input px-4 py-3 text-sm border rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  shouldWiggleEmail ? 'animate-wiggle' : ''
                }`}
                aria-label="Enter email address"
                aria-describedby="email-help-text"
                aria-invalid={shouldWiggleEmail}
                aria-required="true"
                onAnimationEnd={(e) => {
                  if (e.animationName === 'wiggle' && onEmailWiggleEnd) {
                    onEmailWiggleEnd();
                  }
                }}
              />
            </div>
          </div>
        )}

        {/* Hidden help text for screen readers */}
        <div id="idea-help-text" className="sr-only">
          Enter your idea for a personal productivity tool. This field is required.
        </div>

        {shouldSplitInputs && (
          <div id="email-help-text" className="sr-only">
            Enter a valid email address to get early access notifications.
          </div>
        )}

        {/* Validation error announcements for screen readers */}
        {shouldWiggle && (
          <div role="alert" className="sr-only">
            Please enter your tool idea before continuing.
          </div>
        )}

        {shouldSplitInputs && shouldWiggleEmail && (
          <div role="alert" className="sr-only">
            Please enter a valid email address.
          </div>
        )}

        {/* Get Early Access Button */}
        <div className="flex justify-end">
          {submitButton}
        </div>
      </form>

      <style>
        {`
          .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
          }

          @keyframes typing-bounce {
            0%, 20% { opacity: 0.4; transform: translateY(0); }
            40% { opacity: 1; transform: translateY(-6px); }
            100% { opacity: 0.4; transform: translateY(0); }
          }

          @keyframes wiggle {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
            20%, 40%, 60%, 80% { transform: translateX(4px); }
          }

          .animate-wiggle {
            animation: wiggle 0.3s ease-in-out;
          }

          /* Ensure wiggle works in split layout */
          .split-input.animate-wiggle {
            animation: wiggle 0.3s ease-in-out;
          }

          /* Split Input Animations */
          .input-split-container {
            display: flex;
            gap: 12px;
            width: 100%;
            animation: splitExpand 0.3s ease-out;
          }

          @keyframes splitExpand {
            0% {
              width: 100%;
              gap: 0px;
            }
            100% {
              width: 100%;
              gap: 12px;
            }
          }

          .split-input-wrapper {
            flex: 1;
            position: relative;
          }

          .split-input {
            width: 100%;
            transition: all 0.3s ease-out;
          }

          .idea-input {
            animation: slideToLeft 0.3s ease-out;
          }

          .email-input {
            animation: slideFromRight 0.3s ease-out;
          }

          @keyframes slideToLeft {
            0% {
              transform: translateX(0);
              width: 200%;
            }
            100% {
              transform: translateX(0);
              width: 100%;
            }
          }

          @keyframes slideFromRight {
            0% {
              transform: translateX(100%);
              opacity: 0;
            }
            100% {
              transform: translateX(0);
              opacity: 1;
            }
          }

          /* Mobile responsive */
          @media (max-width: 640px) {
            .input-split-container {
              flex-direction: column;
              gap: 8px;
            }

            .split-input-wrapper {
              width: 100%;
            }

            @keyframes slideToLeft {
              0% {
                transform: translateY(0);
              }
              100% {
                transform: translateY(0);
              }
            }

            @keyframes slideFromRight {
              0% {
                transform: translateY(20px);
                opacity: 0;
              }
              100% {
                transform: translateY(0);
                opacity: 1;
              }
            }
          }
        `}
      </style>
    </div>
  );
};

export default ChatPrompt;