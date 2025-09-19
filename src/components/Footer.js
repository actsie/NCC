import React from 'react';
import styled from 'styled-components';
import ShineText from './ShineText';

// Styled component for shining separator line
const ShineLine = styled.hr`
  height: 1px;
  border: none;
  background: linear-gradient(to right, #7866CC 0, #AF97F8 10%, #7866CC 20%);
  background-size: 300% 100%;
  background-position: -300% 0;
  animation: shine 36s infinite linear;
  margin: 1.5rem auto;

  @-moz-keyframes shine {
    0% {
      background-position: -300% 0;
    }
    100% {
      background-position: 300% 0;
    }
  }

  @-webkit-keyframes shine {
    0% {
      background-position: -300% 0;
    }
    100% {
      background-position: 300% 0;
    }
  }

  @keyframes shine {
    0% {
      background-position: -300% 0;
    }
    100% {
      background-position: 300% 0;
    }
  }
`;


const Footer = ({ id = "footer-section" }) => {
  // Detect current path for active state highlighting
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
  
  const isActive = (href) => {
    if (href === '/blog') {
      return currentPath === '/blog' || currentPath.startsWith('/blog/');
    }
    if (href.startsWith('/#')) {
      return typeof window !== 'undefined' && window.location.hash === href.substring(1);
    }
    return currentPath === href;
  };

  return (
    <footer id={id} className="bg-white dark:bg-gray-900">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="/" className="flex items-center">
              <img 
                src="/pawgrammer-logo-purple.svg" 
                alt="Pawgrammer" 
                className="h-8"
              />
            </a>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:gap-6 sm:grid-cols-2">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-[#1F2937] dark:text-white uppercase">Product</h2>
              <ul className="text-[#6B7280] dark:text-gray-300 font-medium">
                <li className="mb-4">
                  <a 
                    href="/#features" 
                    className={`hover:underline ${isActive('/#features') ? 'text-[#7866CC] font-semibold' : ''}`}
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a 
                    href="/#how-it-works" 
                    className={`hover:underline ${isActive('/#how-it-works') ? 'text-[#7866CC] font-semibold' : ''}`}
                  >
                    How it works
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-[#1F2937] dark:text-white uppercase">Resources</h2>
              <ul className="text-[#6B7280] dark:text-gray-300 font-medium">
                <li className="mb-4">
                  <a 
                    href="/blog" 
                    className={`hover:underline ${isActive('/blog') ? 'text-[#7866CC] font-semibold' : ''}`}
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a 
                    href="/examples" 
                    className={`hover:underline ${isActive('/examples') ? 'text-[#7866CC] font-semibold' : ''}`}
                  >
                    Examples
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <ShineLine className="sm:mx-auto lg:my-8" />
        <div className="mb-8 text-center">
          <p className="text-sm text-[#6B7280] dark:text-gray-300">
            <strong>Important:</strong> We are not affiliated with Claude Code or Anthropic. This service provides setup and configuration assistance.
          </p>
        </div>
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-[#6B7280] dark:text-gray-300 text-center sm:text-left">
            © 2025 <a href="/" className="hover:underline">Pawgrammer</a>. All Rights Reserved.
          </span>
          <div className="flex justify-center mt-6 sm:justify-center sm:mt-0 sm:ml-6">
            <a href="https://x.com/pawgrammercom" className="text-[#6B7280] dark:text-gray-300 hover:text-[#1F2937] dark:hover:text-white" target="_blank" rel="noopener noreferrer">
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              <span className="sr-only">X page</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;