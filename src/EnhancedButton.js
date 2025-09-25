import React, { useState } from 'react';
import styled from 'styled-components';

const EnhancedButton = ({
  children,
  onClick,
  disabled = false,
  showSuccess = false,
  isSubmitting = false,
  navigateToChat = false,
  navigateToChatInterface = null,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (navigateToChat && navigateToChatInterface) {
      navigateToChatInterface();
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <StyledWrapper>
      <div
        className="btn-container"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="btn-drawer transition-top">
          {showSuccess ? "You're in!" : "First month"}
        </div>
        <div className="btn-drawer transition-bottom">
          {showSuccess ? "🎉" : "on us ✨"}
        </div>
        <button
          className={`btn ${isSubmitting ? 'submitting' : ''} ${showSuccess ? 'success' : ''}`}
          onClick={handleClick}
          disabled={disabled || isSubmitting || showSuccess}
          {...props}
        >
          <span className="btn-text">
            {isSubmitting ? 'Submitting...' : showSuccess ? "You're all set!" : children}
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
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
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
`;

export default EnhancedButton;