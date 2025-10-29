import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import styled from 'styled-components';

const ChatInterface = forwardRef((props, ref) => {
  const [idea, setIdea] = useState('');
  const [email, setEmail] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [shouldWiggle, setShouldWiggle] = useState(false);
  const [shouldWiggleEmail, setShouldWiggleEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentPlaceholder, setCurrentPlaceholder] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [hasPopped, setHasPopped] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const inputRef = useRef(null);
  const typewriterTimeoutRef = useRef(null);
  const containerRef = useRef(null);

  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    scrollToAndWiggle: () => {
      // Scroll to chat interface
      if (containerRef.current) {
        containerRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
      // Trigger wiggle after scroll, then focus and slide email
      setTimeout(() => {
        handleIdeaMissing();
        // After wiggle completes, focus and slide email
        setTimeout(() => {
          if (inputRef.current) {
            // Set focus which will trigger handleFocus and slide email
            inputRef.current.focus();
            // Ensure email slides in
            setShowEmailInput(true);
            // Set focused state to stop typewriter
            setIsFocused(true);
            setCurrentPlaceholder('');
          }
        }, 400); // Wait for wiggle to complete
      }, 500);
    }
  }));

  // Typewriter effect
  useEffect(() => {
    if (isFocused) return;

    const placeholders = [
      'Create a budget tracker',
      'Create a job application tracker',
      'Create a goal tracker',
      'Create a packing list generator'
    ];

    const currentText = placeholders[placeholderIndex];

    const typewriterTick = () => {
      if (isDeleting) {
        setCurrentPlaceholder(currentText.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else {
        setCurrentPlaceholder(currentText.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }
    };

    const typewriterSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
      // Finished typing, wait then start deleting
      typewriterTimeoutRef.current = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && charIndex === 0) {
      // Finished deleting, move to next placeholder
      setIsDeleting(false);
      setPlaceholderIndex((placeholderIndex + 1) % placeholders.length);
    } else {
      // Continue typing/deleting
      typewriterTimeoutRef.current = setTimeout(typewriterTick, typewriterSpeed);
    }

    return () => {
      if (typewriterTimeoutRef.current) {
        clearTimeout(typewriterTimeoutRef.current);
      }
    };
  }, [charIndex, isDeleting, placeholderIndex, isFocused]);

  // Trigger input pop animation on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasPopped(true);
      // After pop animation completes, set visible to true
      setTimeout(() => {
        setIsVisible(true);
      }, 500); // Duration of pop animation
    }, 900); // After avatar (0s) and chat bubble (0.4s)
    return () => clearTimeout(timer);
  }, []);

  const handleFocus = () => {
    setIsFocused(true);
    setCurrentPlaceholder('');
    // Slide in email input when idea input gets focus
    setShowEmailInput(true);
  };

  const handleBlur = () => {
    if (!idea.trim()) {
      setIsFocused(false);
      setCharIndex(0);
      setIsDeleting(false);
    }
  };

  const handleIdeaMissing = () => {
    setShouldWiggle(true);
    setTimeout(() => setShouldWiggle(false), 400);
  };

  const handleEmailMissing = () => {
    setShouldWiggleEmail(true);
    setTimeout(() => setShouldWiggleEmail(false), 400);
  };

  const handleIdeaClick = () => {
    setShowEmailInput(true);
    // Keep focus on idea input
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSubmit = async () => {
    if (!idea.trim()) {
      handleIdeaMissing();
      // After wiggle, focus and slide email like navigation buttons do
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          setShowEmailInput(true);
          setIsFocused(true);
          setCurrentPlaceholder('');
        }
      }, 400); // Wait for wiggle to complete
      return;
    }

    if (!email.trim()) {
      // Shake email input if idea is filled but email is missing
      handleEmailMissing();
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      handleEmailMissing();
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/xjkoegnv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          idea: idea,
          source: 'landing_chat',
          path: window.location.pathname,
          ts: new Date().toISOString()
        }),
      });

      if (response.ok) {
        // Send to Discord (don't await, run in background)
        fetch('/api/discord-notify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            idea: idea,
            source: 'landing_chat',
            path: window.location.pathname
          }),
        }).catch(err => console.log('Discord notification failed:', err));

        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          setIdea('');
          setEmail('');
          setShowEmailInput(false);
        }, 3000);
      }
    } catch (error) {
      console.error('Error submitting:', error);
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <StyledWrapper>
      <div className="chat-container" ref={containerRef}>
        {/* Pawgrammer bubble */}
        <div className="chat-bubble pawgrammer-bubble">
          <div className="avatar">
            <img src="/pawgrammericonnew.png" alt="Pawgrammer" />
          </div>
          <div className="message-content">
            <p>What personal tool do you want to build?</p>
          </div>
        </div>

        {/* Typing indicator */}
        <div className="typing-indicator">
          <div className="typing-dots" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        {/* User input area */}
        <div className="user-input-area">
          <div className="inputs-row">
            <div className="input-wrapper">
              <input
                ref={inputRef}
                type="text"
                name="idea"
                className={`idea-input ${shouldWiggle ? 'wiggle' : ''} ${isVisible ? 'visible' : ''} ${hasPopped && !isVisible ? 'popped' : ''}`}
                placeholder={isFocused ? 'Create a...' : currentPlaceholder}
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onClick={handleIdeaClick}
                required
              />
            </div>

            {/* Sliding email input */}
            <div className={`email-input-wrapper ${showEmailInput ? 'show' : ''}`}>
              <input
                type="email"
                name="email"
                className={`email-input ${shouldWiggleEmail ? 'wiggle' : ''}`}
                placeholder="Enter your email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Enhanced button */}
          <div className="button-container">
            <div className="btn-container">
              <div className="btn-drawer transition-top">
                {showSuccess ? "You're in!" : "First month"}
              </div>
              <div className="btn-drawer transition-bottom">
                {showSuccess ? "🎉" : "on us ✨"}
              </div>
              <button
                className={`btn ${isSubmitting ? 'submitting' : ''} ${showSuccess ? 'success' : ''}`}
                onClick={handleSubmit}
                disabled={isSubmitting || showSuccess}
              >
                <span className="btn-text">
                  {isSubmitting ? 'Submitting...' : showSuccess ? "You're all set!" : 'Build My First Tool'}
                </span>
              </button>
              <svg className="btn-corner" xmlns="http://www.w3.org/2000/svg" viewBox="-1 1 32 32">
                <path d="M32,32C14.355,32,0,17.645,0,0h.985c0,17.102,13.913,31.015,31.015,31.015v.985Z" />
              </svg>
              <svg className="btn-corner" xmlns="http://www.w3.org/2000/svg" viewBox="-1 1 32 32">
                <path d="M32,32C14.355,32,0,17.645,0,0h.985c0,17.102,13.913,31.015,31.015,31.015v.985Z" />
              </svg>
              <svg className="btn-corner" xmlns="http://www.w3.org/2000/svg" viewBox="-1 1 32 32">
                <path d="M32,32C14.355,32,0,17.645,0,0h.985c0,17.102,13.913,31.015,31.015,31.015v.985Z" />
              </svg>
              <svg className="btn-corner" xmlns="http://www.w3.org/2000/svg" viewBox="-1 1 32 32">
                <path d="M32,32C14.355,32,0,17.645,0,0h.985c0,17.102,13.913,31.015,31.015,31.015v.985Z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
});

const StyledWrapper = styled.div`
  .chat-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 24px 16px;
  }

  /* Pawgrammer bubble */
  .chat-bubble {
    display: flex;
    align-items: flex-end;
    gap: 12px;
    margin-bottom: 16px;
    animation: popIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.4s forwards;
    opacity: 0;
    transform: scale(0.8) translateY(20px);
  }

  .pawgrammer-bubble {
    .message-content {
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 20px 20px 20px 4px;
      padding: 16px 20px;
      box-shadow: 0 8px 32px rgba(120, 102, 204, 0.15);
      position: relative;
    }

    .message-content::before {
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

    p {
      margin: 0;
      font-size: 16px;
      font-weight: 500;
      color: #1F2937;
      line-height: 1.4;
    }
  }

  .avatar {
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
    opacity: 0;
    transform: scale(0.6);
  }

  .avatar img {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 50%;
  }

  /* Typing indicator */
  .typing-indicator {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
  }

  .typing-dots {
    background: rgba(120, 102, 204, 0.1);
    border-radius: 20px 20px 4px 20px;
    padding: 12px 16px;
    display: flex;
    gap: 4px;
    align-items: center;
  }

  .typing-dots span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #7866CC;
    animation: typing-bounce 1.4s infinite ease-in-out;
  }

  .typing-dots span:nth-child(1) {
    animation-delay: -0.32s;
  }

  .typing-dots span:nth-child(2) {
    animation-delay: -0.16s;
  }

  @keyframes typing-bounce {
    0%, 80%, 100% {
      transform: scale(0.8);
      opacity: 0.5;
    }
    40% {
      transform: scale(1);
      opacity: 1;
    }
  }

  /* User input area styling */
  .user-input-area {
    align-self: flex-end;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .inputs-row {
    display: flex;
    gap: 8px;
    align-items: center;
    width: 100%;
  }

  .input-wrapper {
    flex: 1;
    min-width: 160px;
  }

  .idea-input {
    width: 100%;
    padding: 12px 16px;
    background: white;
    border: 2px solid #E5E7EB;
    border-radius: 18px 18px 4px 18px;
    font-size: 16px;
    color: #1F2937;
    outline: none;
    transition: all 0.3s ease;
    cursor: pointer;
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }

  .idea-input.visible {
    opacity: 1;
    transform: scale(1) translateY(0);
  }

  .idea-input.popped {
    animation: inputPop 0.7s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
  }

  .idea-input:focus {
    border-color: #7866CC;
    box-shadow: 0 0 0 3px rgba(120, 102, 204, 0.1);
    cursor: text;
  }

  .idea-input::placeholder {
    color: #9CA3AF;
  }

  /* Email input sliding animation */
  .email-input-wrapper {
    width: 0;
    overflow: hidden;
    opacity: 0;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .email-input-wrapper.show {
    width: 180px;
    opacity: 1;
  }

  .email-input {
    width: 100%;
    padding: 12px 16px;
    background: white;
    border: 2px solid #E5E7EB;
    border-radius: 18px 18px 18px 4px;
    font-size: 16px;
    color: #1F2937;
    outline: none;
    transition: all 0.3s ease;
  }

  .email-input:focus {
    border-color: #7866CC;
    box-shadow: 0 0 0 3px rgba(120, 102, 204, 0.1);
  }

  .email-input::placeholder {
    color: #9CA3AF;
  }

  /* Wiggle animation for validation */
  .idea-input.wiggle,
  .email-input.wiggle {
    animation: wiggle 0.4s ease-in-out;
    border-color: #EF4444;
  }

  @keyframes wiggle {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
    20%, 40%, 60%, 80% { transform: translateX(4px); }
  }

  /* Enhanced button styling */
  .button-container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .btn-container {
    --btn-color: #7866CC;
    --corner-color: #7866CC30;
    --corner-dist: 24px;
    --corner-multiplier: 1.5;
    --timing-function: cubic-bezier(0, 0, 0, 2.5);
    --duration: 250ms;

    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .btn {
    position: relative;
    min-width: 120px;
    min-height: calc(var(--corner-dist) * 1.8);
    border-radius: 12px;
    border: none;
    padding: 0.2em 0.8em;

    background: linear-gradient(#fff2, #0001), var(--btn-color);
    box-shadow:
      1px 1px 2px -1px #fff inset,
      0 2px 1px #00000008,
      0 4px 2px #00000008,
      0 8px 4px #00000008,
      0 16px 8px #00000008,
      0 32px 16px #00000008;

    transition:
      transform var(--duration) var(--timing-function),
      filter var(--duration) var(--timing-function);

    cursor: pointer;
  }

  .btn:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }

  .btn-drawer {
    position: absolute;
    display: flex;
    justify-content: center;

    min-height: 28px;
    border-radius: 12px;
    border: none;
    padding: 0.2em 0.8em;
    font-size: 0.75em;
    font-weight: 600;
    font-family: inherit;
    color: #fff;

    background: linear-gradient(#fff2, #0001), #AF97F8;
    opacity: 0;

    transition:
      transform calc(0.5 * var(--duration)) ease,
      filter var(--duration) var(--timing-function),
      opacity calc(0.5 * var(--duration)) ease;
    filter: blur(2px);
  }

  .transition-top {
    top: 0;
    left: 0;
    border-radius: 12px 12px 0 0;
    align-items: start;
  }

  .transition-bottom {
    bottom: 0;
    right: 0;
    border-radius: 0 0 12px 12px;
    align-items: end;
  }

  .btn-text {
    display: inline-block;
    font-size: 1em;
    font-family: inherit;
    font-weight: 600;
    color: white;
    filter: drop-shadow(0 1px 0 #0006);

    transition:
      transform var(--duration) var(--timing-function),
      filter var(--duration) var(--timing-function),
      color var(--duration) var(--timing-function);
  }

  .btn-corner {
    position: absolute;
    width: 24px;
    fill: none;
    stroke: var(--corner-color);

    transition:
      transform var(--duration) var(--timing-function),
      filter var(--duration) var(--timing-function);
  }

  .btn-corner:nth-of-type(1) {
    top: 0;
    left: 0;
    transform: translate(
        calc(-1 * var(--corner-dist)),
        calc(-1 * var(--corner-dist))
      )
      rotate(90deg);
    stroke: transparent;
  }
  .btn-corner:nth-of-type(2) {
    top: 0;
    right: 0;
    transform: translate(var(--corner-dist), calc(-1 * var(--corner-dist)))
      rotate(180deg);
    stroke: transparent;
  }
  .btn-corner:nth-of-type(3) {
    bottom: 0;
    right: 0;
    transform: translate(var(--corner-dist), var(--corner-dist)) rotate(-90deg);
    stroke: transparent;
  }
  .btn-corner:nth-of-type(4) {
    bottom: 0;
    left: 0;
    transform: translate(calc(-1 * var(--corner-dist)), var(--corner-dist))
      rotate(0deg);
    stroke: transparent;
  }

  /* Button hover effects */
  .btn-container:has(.btn:hover:not(:disabled)),
  .btn-container:has(.btn:focus-visible) {
    .btn {
      transform: scale(1.05);
      filter: drop-shadow(0 16px 16px #7866CC20);
    }

    .transition-top {
      transform: translateY(-24px) rotateZ(4deg);
      filter: blur(0px);
      opacity: 1;
    }

    .transition-bottom {
      transform: translateY(24px) rotateZ(4deg);
      filter: blur(0px);
      opacity: 1;
    }

    .btn-text {
      filter: drop-shadow(0 1px 0 #0006) drop-shadow(0px 6px 2px #0003);
      transform: scale(1.05);
    }

    .btn-corner:first-of-type {
      stroke: transparent;
      transform: translate(
          calc(-1 * var(--corner-multiplier) * var(--corner-dist)),
          calc(-1 * var(--corner-multiplier) * var(--corner-dist))
        )
        rotate(90deg);
    }
    .btn-corner:nth-of-type(2) {
      stroke: transparent;
      transform: translate(
          calc(var(--corner-multiplier) * var(--corner-dist)),
          calc(-1 * var(--corner-multiplier) * var(--corner-dist))
        )
        rotate(180deg);
    }
    .btn-corner:nth-of-type(3) {
      stroke: transparent;
      transform: translate(
          calc(var(--corner-multiplier) * var(--corner-dist)),
          calc(var(--corner-multiplier) * var(--corner-dist))
        )
        rotate(-90deg);
    }
    .btn-corner:nth-of-type(4) {
      stroke: transparent;
      transform: translate(
          calc(-1 * var(--corner-multiplier) * var(--corner-dist)),
          calc(var(--corner-multiplier) * var(--corner-dist))
        )
        rotate(0deg);
    }
  }

  /* Success state */
  .btn.success {
    --btn-color: #4ecdc4;
  }

  .btn.success .transition-top {
    background: linear-gradient(#fff2, #0001), #44a08d;
  }

  .btn.success .transition-bottom {
    background: linear-gradient(#fff2, #0001), #44a08d;
  }



  /* Pop animations */
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

  @keyframes inputPop {
    0% {
      opacity: 0;
      transform: scale(0.95) translateY(10px);
    }
    100% {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  /* Responsive design */
  @media (max-width: 640px) {
    .chat-container {
      padding: 20px 12px;
    }
  }
`;

export default ChatInterface;