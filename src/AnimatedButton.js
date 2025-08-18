import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const AnimatedButton = ({ children, onClick, onSignup, isShareMode, showSuccess: externalShowSuccess, isExpanding, forceBounce, ...props }) => {
  const [isInputMode, setIsInputMode] = useState(false);
  const [email, setEmail] = useState('');
  const [isError, setIsError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isContracting, setIsContracting] = useState(false);
  const [shouldBounce, setShouldBounce] = useState(false);

  // Trigger bounce when switching to share mode
  useEffect(() => {
    if (isShareMode) {
      setShouldBounce(true);
      // Stop bouncing after animation completes (2 bounces = ~1.2s)
      setTimeout(() => setShouldBounce(false), 1200);
    }
  }, [isShareMode]);

  const handleButtonClick = () => {
    if (isShareMode) {
      // Handle share functionality
      if (navigator.share) {
        navigator.share({
          title: 'No Code Claude - Early Access',
          text: 'Get Claude Code access with professional-grade infrastructure that even experienced developers struggle to set up!',
          url: window.location.href,
        }).catch((err) => {
          // If share fails, fallback to clipboard
          navigator.clipboard.writeText(window.location.href);
          // Could add a toast notification here instead of alert
        });
      } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(window.location.href);
        // Show brief feedback - could be replaced with toast
        const button = document.activeElement;
        const originalText = button.textContent;
        button.textContent = 'Link copied!';
        setTimeout(() => {
          button.textContent = originalText;
        }, 2000);
      }
    } else {
      setIsInputMode(true);
    }
    if (onClick) onClick();
  };

  const sanitizeEmail = (email) => {
    // Remove invalid Unicode surrogate pairs and normalize the string
    return email
      .replace(/[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/g, '')
      .normalize('NFC')
      .trim();
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    const sanitizedEmail = sanitizeEmail(email);
    if (sanitizedEmail && validateEmail(sanitizedEmail)) {
      try {
        // Submit to Formspree
        const response = await fetch('https://formspree.io/f/xjkoegnv', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: sanitizedEmail }),
        });

        if (response.ok) {
          console.log('Email submitted successfully:', email);
          setEmail('');
          setIsError(false);
          
          // Start contraction animation
          setIsContracting(true);
          
          // After contraction completes, show success state
          setTimeout(() => {
            setIsInputMode(false);
            setIsContracting(false);
            // Only set internal success state if no external state management is provided
            if (typeof externalShowSuccess === 'undefined') {
              setShowSuccess(true);
            }
            // Notify parent component about signup
            if (onSignup) onSignup();
          }, 300); // Match the CSS transition duration
        } else {
          throw new Error('Failed to submit');
        }
      } catch (error) {
        console.error('Error submitting email:', error);
        // Show error state - reuse existing shake animation
        setIsError(true);
        setTimeout(() => setIsError(false), 600);
      }
    } else {
      // Shake for both empty email and invalid email, but don't close input
      setIsError(true);
      setTimeout(() => setIsError(false), 600); // Remove error state after animation
    }
  };

  const handleSparkleButtonClick = (e) => {
    e.preventDefault(); // Prevent any default behavior
    e.stopPropagation(); // Stop event bubbling
    
    const sanitizedEmail = sanitizeEmail(email);
    if (sanitizedEmail && validateEmail(sanitizedEmail)) {
      handleEmailSubmit({ preventDefault: () => {} });
    } else {
      // Shake for both empty email and invalid email, but don't close input
      setIsError(true);
      setTimeout(() => setIsError(false), 600); // Remove error state after animation
    }
  };

  const handleInputBlur = () => {
    // Always reset to button mode when clicking outside, regardless of content
    setIsInputMode(false);
    setIsError(false);
    setEmail(''); // Clear any partial input
  };

  // Success state with heart
  if (showSuccess || externalShowSuccess) {
    return (
      <StyledWrapper>
        <button type="button" className="button success" disabled>
          <div className="points_wrapper">
            <i className="point" />
            <i className="point" />
            <i className="point" />
            <i className="point" />
            <i className="point" />
            <i className="point" />
            <i className="point" />
            <i className="point" />
            <i className="point" />
            <i className="point" />
          </div>
          <span className="inner">
            <svg className="icon heart" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5">
              <path d="m12 21.35-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            You're all set!
          </span>
        </button>
      </StyledWrapper>
    );
  }

  if (isInputMode) {
    return (
      <StyledWrapper>
        <form onSubmit={handleEmailSubmit} className="email-form" noValidate>
          <div className={`input-container ${isError ? 'error' : ''} ${isContracting ? 'contracting' : ''}`}>
            <input
              type="email"
              className={`email-input ${isError ? 'shake' : ''}`}
              placeholder="Enter your email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={handleInputBlur}
              autoFocus
              noValidate
            />
            <button 
              type="button" 
              className="icon-button" 
              onClick={handleSparkleButtonClick}
              onMouseDown={(e) => e.preventDefault()} // Prevent blur when clicking button
            >
              <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5">
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                <path d="M5 3v4" />
                <path d="M19 17v4" />
                <path d="M3 5h4" />
                <path d="M17 19h4" />
              </svg>
            </button>
          </div>
        </form>
      </StyledWrapper>
    );
  }

  return (
    <StyledWrapper>
      <button type="button" className={`button ${isShareMode ? 'share-mode' : ''} ${isExpanding ? 'expanding' : ''} ${shouldBounce || forceBounce ? 'bounce' : ''}`} onClick={handleButtonClick} {...props}>
        <div className="points_wrapper">
          <i className="point" />
          <i className="point" />
          <i className="point" />
          <i className="point" />
          <i className="point" />
          <i className="point" />
          <i className="point" />
          <i className="point" />
          <i className="point" />
          <i className="point" />
        </div>
        <span className="inner">
          {isShareMode ? (
            <svg className="icon heart" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5">
              <path d="m12 21.35-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          ) : (
            <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5">
              <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
              <path d="M5 3v4" />
              <path d="M19 17v4" />
              <path d="M3 5h4" />
              <path d="M17 19h4" />
            </svg>
          )}
          {children}
        </span>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .button {
    border: none;
    color: #fff;
    background-image: linear-gradient(30deg, #7866CC, #AF97F8);
    border-radius: 20px;
    background-size: 100% auto;
    font-family: inherit;
    font-size: 17px;
    padding: 0.6em 1.5em;
    cursor: pointer;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    transition: all 0.25s ease;
    outline: none;
    white-space: nowrap;
    width: auto;
  }

  /* Success state has specific width */
  .button.success {
    width: 180px; /* Width for "You're all set!" with heart icon */
    transition: width 0.3s ease-in-out;
  }

  /* Expanding animation for text change - like email input expansion */
  .button.expanding {
    width: 220px !important; /* Target width for "Share with friends" */
    transition: width 0.3s ease-in-out;
  }

  .button.expanding .inner {
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
  }
  
  .button:hover {
    background-position: right center;
    background-size: 200% auto;
    animation: pulse512 1.5s infinite;
  }
  
  .button:active {
    transform: scale(0.95);
  }

  /* Bounce animation for share mode */
  .button.bounce {
    animation: bounce 0.6s ease-in-out 2;
  }

  @keyframes bounce {
    0%, 20%, 53%, 80%, 100% {
      transform: translateY(0);
    }
    40%, 43% {
      transform: translateY(-12px);
    }
    70% {
      transform: translateY(-6px);
    }
    90% {
      transform: translateY(-2px);
    }
  }

  /* Success state styling */
  .button.success {
    background-image: linear-gradient(30deg, #5E50A0, #C3B1FA);
    cursor: default;
  }

  /* Share mode styling */
  .button.share-mode {
    background-image: linear-gradient(30deg, #5E50A0, #C3B1FA);
    cursor: pointer;
  }

  .button.share-mode .heart {
    fill: transparent;
    animation: dasharray 1s linear forwards, filled 0.1s linear forwards 0.95s, heartbeat 1.5s ease-in-out infinite 1.1s;
  }

  .button.share-mode .heart path {
    fill: transparent;
    animation: filled 0.1s linear forwards 0.95s;
  }

  .button.success .heart {
    fill: transparent;
    animation: dasharray 1s linear forwards, filled 0.1s linear forwards 0.95s, heartbeat 1.5s ease-in-out infinite 1.1s;
  }

  .button.success .heart path {
    fill: transparent;
    animation: filled 0.1s linear forwards 0.95s;
  }

  @keyframes heartbeat {
    0%, 100% { 
      transform: scale(1); 
    }
    50% { 
      transform: scale(1.1); 
    }
  }

  @keyframes pulse512 {
    0% {
      box-shadow: 0 0 0 0 rgba(120, 102, 204, 0.4);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(175, 151, 248, 0), 0 0 20px rgba(120, 102, 204, 0.2);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(175, 151, 248, 0), 0 0 0 rgba(120, 102, 204, 0);
    }
  }

  .points_wrapper {
    overflow: hidden;
    width: 100%;
    height: 100%;
    pointer-events: none;
    position: absolute;
    z-index: 1;
  }

  .points_wrapper .point {
    bottom: -10px;
    position: absolute;
    animation: floating-points infinite ease-in-out;
    pointer-events: none;
    width: 2px;
    height: 2px;
    background-color: #fff;
    border-radius: 9999px;
  }
  @keyframes floating-points {
    0% {
      transform: translateY(0);
    }
    85% {
      opacity: 0;
    }
    100% {
      transform: translateY(-55px);
      opacity: 0;
    }
  }
  .points_wrapper .point:nth-child(1) {
    left: 10%;
    opacity: 1;
    animation-duration: 2.35s;
    animation-delay: 0.2s;
  }
  .points_wrapper .point:nth-child(2) {
    left: 30%;
    opacity: 0.7;
    animation-duration: 2.5s;
    animation-delay: 0.5s;
  }
  .points_wrapper .point:nth-child(3) {
    left: 25%;
    opacity: 0.8;
    animation-duration: 2.2s;
    animation-delay: 0.1s;
  }
  .points_wrapper .point:nth-child(4) {
    left: 44%;
    opacity: 0.6;
    animation-duration: 2.05s;
  }
  .points_wrapper .point:nth-child(5) {
    left: 50%;
    opacity: 1;
    animation-duration: 1.9s;
  }
  .points_wrapper .point:nth-child(6) {
    left: 75%;
    opacity: 0.5;
    animation-duration: 1.5s;
    animation-delay: 1.5s;
  }
  .points_wrapper .point:nth-child(7) {
    left: 88%;
    opacity: 0.9;
    animation-duration: 2.2s;
    animation-delay: 0.2s;
  }
  .points_wrapper .point:nth-child(8) {
    left: 58%;
    opacity: 0.8;
    animation-duration: 2.25s;
    animation-delay: 0.2s;
  }
  .points_wrapper .point:nth-child(9) {
    left: 98%;
    opacity: 0.6;
    animation-duration: 2.6s;
    animation-delay: 0.1s;
  }
  .points_wrapper .point:nth-child(10) {
    left: 65%;
    opacity: 1;
    animation-duration: 2.5s;
    animation-delay: 0.2s;
  }

  .inner {
    z-index: 2;
    gap: 6px;
    position: relative;
    width: 100%;
    color: white;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 500;
    line-height: 1.5;
    transition: color 0.2s ease-in-out;
  }

  .inner svg.icon {
    width: 18px;
    height: 18px;
    transition: fill 0.1s linear;
  }

  .button:focus svg.icon {
    fill: white;
  }
  .button:hover svg.icon {
    fill: transparent;
    animation: dasharray 1s linear forwards, filled 0.1s linear forwards 0.95s;
  }

  .button:hover svg.icon path {
    fill: transparent;
    animation: filled 0.1s linear forwards 0.95s;
  }
  @keyframes dasharray {
    from {
      stroke-dasharray: 0 0 0 0;
    }
    to {
      stroke-dasharray: 68 68 0 0;
    }
  }
  @keyframes filled {
    to {
      fill: white;
    }
  }

  /* Email input form styles */
  .email-form {
    display: inline-block;
  }

  .input-container {
    position: relative;
    max-width: 48px;
    transition: max-width 0.3s ease-in-out;
    display: flex;
    align-items: center;
    background: linear-gradient(30deg, #7866CC, #AF97F8);
    border-radius: 20px;
    padding: 2px; /* Border thickness */
  }

  .input-container:focus-within {
    max-width: 300px;
  }

  /* Contracting animation - contract to success button width */
  .input-container.contracting {
    max-width: 160px !important; /* Approximate width for "You're all set!" with heart icon */
    transition: max-width 0.3s ease-in-out;
  }

  .input-container.contracting .email-input {
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
  }

  /* Pulsing effect for entire container when icon is hovered */
  .input-container:hover:not(.contracting) {
    animation: pulse512 1.5s infinite;
  }

  .email-input {
    width: 100%;
    border: none;
    outline: none;
    border-radius: 18px; /* Slightly smaller to show gradient border */
    padding: 10px 48px 10px 16px;
    font-size: 16px;
    background: white;
    color: #333;
    transition: all 0.3s ease-in-out;
  }

  .email-input::placeholder {
    color: rgba(51, 51, 51, 0.6);
    transition: opacity 0.3s ease-in-out;
  }

  .email-input:focus::placeholder {
    opacity: 1;
    color: rgba(51, 51, 51, 0.8);
  }

  /* Character shake animation for invalid email */
  .email-input.shake {
    animation: textShake 0.6s ease-in-out;
  }

  @keyframes textShake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
    20%, 40%, 60%, 80% { transform: translateX(2px); }
  }

  .icon-button {
    position: absolute;
    top: 50%;
    right: 6px;
    transform: translateY(-50%);
    background: linear-gradient(30deg, #7866CC, #AF97F8);
    border: none;
    cursor: pointer;
    padding: 6px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.25s ease;
    min-width: 36px;
    min-height: 36px;
  }

  .icon-button .icon {
    width: 18px;
    height: 18px;
    color: white;
    transition: fill 0.1s linear;
  }

  .icon-button:hover .icon {
    fill: transparent;
    animation: dasharray 1s linear forwards, filled 0.1s linear forwards 0.95s;
  }

  .icon-button:hover .icon path {
    fill: transparent;
    animation: filled 0.1s linear forwards 0.95s;
  }

  @keyframes quake {
    0%, 100% { 
      transform: translateY(-50%) rotate(-3deg); 
    }
    50% { 
      transform: translateY(-50%) rotate(3deg); 
    }
  }

  .icon-button:hover {
    animation: quake 0.3s ease-in-out infinite;
  }
`;

export default AnimatedButton;