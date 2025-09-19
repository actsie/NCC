import React from 'react';

const NoCodeClaudeLanding = () => {
  return (
    <div className="min-h-screen bg-[#F9F9F9] dark:bg-gray-900">
      {/* Hero Section */}
      <section className="px-6 py-16 lg:py-24 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl lg:text-6xl font-bold text-[#333333] dark:text-white mb-6 leading-tight">
          Claude Code for non-developers
        </h1>
        <p className="text-xl lg:text-2xl text-[#7A7A7A] dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
          No Code Claude gives non-technical users access to Claude Code with professional-grade infrastructure that even experienced developers struggle to set up themselves.
        </p>
        <button className="bg-[#BEAEE2] hover:bg-[#F7DBF0] dark:bg-[#9F7AEA] dark:hover:bg-[#B794F6] text-[#333333] dark:text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-200 shadow-sm hover:shadow-md">
          Request early access
        </button>
        <p className="mt-6 text-xs text-[#7A7A7A] dark:text-gray-400 text-center">
          ✨ Build your personal app for free, no Claude account or API keys required. First month's on us (limited tester spots).
        </p>
      </section>

      {/* Why Claude Code Matters */}
      <section className="px-6 py-16 bg-[#CDF0EA] dark:bg-gray-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#333333] dark:text-white mb-12 text-center">
            Why Claude Code Matters
          </h2>
          
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-[#333333] dark:text-white mb-8">
              Real developers choose Claude Code because it's uniquely powerful
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm">
                <div className="text-[#BEAEE2] text-2xl mb-4">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
                  </svg>
                </div>
                <h4 className="font-semibold text-[#333333] dark:text-white mb-2">Full system control</h4>
                <p className="text-[#7A7A7A] dark:text-gray-300">Reads/writes files, installs tools, creates databases, runs apps locally</p>
              </div>
              <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm">
                <div className="text-[#BEAEE2] text-2xl mb-4">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.22,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.22,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"/>
                  </svg>
                </div>
                <h4 className="font-semibold text-[#333333] dark:text-white mb-2">Claude Code is built by Anthropic</h4>
                <p className="text-[#7A7A7A] dark:text-gray-300">Who makes Claude—not a third-party tool paying for API access</p>
              </div>
              <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm">
                <div className="text-[#BEAEE2] text-2xl mb-4">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10Z"/>
                  </svg>
                </div>
                <h4 className="font-semibold text-[#333333] dark:text-white mb-2">End-to-end capability</h4>
                <p className="text-[#7A7A7A] dark:text-gray-300">From idea to deployed app without developer intervention</p>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-[#333333] dark:text-white mb-8">
              Other tools reach their limits fast
            </h3>
            <div className="bg-[#FFE2B0] dark:bg-yellow-900 p-6 rounded-lg">
              <ul className="space-y-3 text-[#333333] dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-[#FFB5B5] mr-3">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,14H13V16H11V14M11,6H13V12H11V6Z"/>
                    </svg>
                  </span>
                  Template-based builders like Lovable work for demos but need developer cleanup for real apps
                </li>
                <li className="flex items-start">
                  <span className="text-[#FFB5B5] mr-3">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,14H13V16H11V14M11,6H13V12H11V6Z"/>
                    </svg>
                  </span>
                  Limited infrastructure means you hit walls when requirements get complex
                </li>
                <li className="flex items-start">
                  <span className="text-[#FFB5B5] mr-3">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,14H13V16H11V14M11,6H13V12H11V6Z"/>
                    </svg>
                  </span>
                  Built by companies that pay Anthropic for compressed Claude access—lower accuracy
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-[#333333] dark:text-white mb-8">
              But Claude Code requires expert-level setup
            </h3>
            <div className="bg-[#FFB5B5] dark:bg-red-900 p-6 rounded-lg">
              <ul className="space-y-3 text-[#333333] dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-[#333333] mr-3">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6Z"/>
                    </svg>
                  </span>
                  Effective Claude.md configuration that most people never get right
                </li>
                <li className="flex items-start">
                  <span className="text-[#333333] mr-3">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6Z"/>
                    </svg>
                  </span>
                  MCP servers, testing frameworks, debugging workflows
                </li>
                <li className="flex items-start">
                  <span className="text-[#333333] mr-3">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6Z"/>
                    </svg>
                  </span>
                  Even experienced developers struggle with proper setup
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How No Code Claude Solves This */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#333333] dark:text-white mb-12 text-center">
            How No Code Claude Solves This
          </h2>
          
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-[#CDEAC0] dark:bg-green-800 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.22,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.22,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#333333] dark:text-white mb-4">
                Get Claude Code's full power, properly configured
              </h3>
              <p className="text-[#7A7A7A] dark:text-gray-300 leading-relaxed">
                We've built the expert-level infrastructure (Claude.md, testing, debugging) that takes others weeks to figure out. Same AI that builds production-ready apps, wrapped in an interface you can use.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-[#CDEAC0] dark:bg-green-800 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#333333] dark:text-white mb-4">
                Built for non-technical users who want real apps
              </h3>
              <p className="text-[#7A7A7A] dark:text-gray-300 leading-relaxed">
                Yes, there's a learning curve—but you get apps that actually work long-term. Other tools work for demos. No Code Claude builds apps you can actually use.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-[#CDEAC0] dark:bg-green-800 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#333333] dark:text-white mb-4">
                Professional setup, ready to use
              </h3>
              <p className="text-[#7A7A7A] dark:text-gray-300 leading-relaxed">
                Skip the configuration complexity that stops most people. Get the infrastructure knowledge we've refined through trial and error. Start building with setup that even pros struggle to achieve.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-16 bg-[#F7DBF0] dark:bg-purple-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#333333] dark:text-white mb-8 text-center">
            How It Works
          </h2>
          
          <div className="space-y-12">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
              <div className="bg-[#BEAEE2] dark:bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#333333] dark:text-white mb-3">
                  Describe your app to our interface to Claude Code
                </h3>
                <div className="bg-[#CDF0EA] dark:bg-gray-700 p-4 rounded-lg italic text-[#333333] dark:text-gray-300">
                  "Build a budget tracker that splits roommate expenses, integrates with bank APIs, and sends weekly reports"
                </div>
              </div>
            </div>
            
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
              <div className="bg-[#BEAEE2] dark:bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#333333] dark:text-white mb-3">
                  Watch Claude Code build with our expert infrastructure
                </h3>
                <p className="text-[#7A7A7A] dark:text-gray-300">
                  Same powerful AI, supported by professional-grade configuration and testing
                </p>
              </div>
            </div>
            
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
              <div className="bg-[#BEAEE2] dark:bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#333333] dark:text-white mb-3">
                  Get production-ready apps, not prototypes
                </h3>
                <p className="text-[#7A7A7A] dark:text-gray-300">
                  Fully functional applications that scale with your business needs
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You Can Build */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#333333] dark:text-white mb-12 text-center">
            What You Can Build
          </h2>
          <p className="text-lg text-[#7A7A7A] dark:text-gray-300 mb-12 text-center">
            Real examples from our expert Claude Code configuration:
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm border border-[#E5E5E5] dark:border-gray-600">
              <h3 className="font-semibold text-[#333333] dark:text-white mb-2">Multi-tenant SaaS</h3>
              <p className="text-[#7A7A7A] dark:text-gray-300">With user authentication and billing</p>
            </div>
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm border border-[#E5E5E5] dark:border-gray-600">
              <h3 className="font-semibold text-[#333333] dark:text-white mb-2">E-commerce platform</h3>
              <p className="text-[#7A7A7A] dark:text-gray-300">With payment processing and inventory management</p>
            </div>
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm border border-[#E5E5E5] dark:border-gray-600">
              <h3 className="font-semibold text-[#333333] dark:text-white mb-2">Project management system</h3>
              <p className="text-[#7A7A7A] dark:text-gray-300">With team collaboration and reporting</p>
            </div>
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm border border-[#E5E5E5] dark:border-gray-600">
              <h3 className="font-semibold text-[#333333] dark:text-white mb-2">Custom CRM</h3>
              <p className="text-[#7A7A7A] dark:text-gray-300">With automated workflows and integrations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-6 py-16 bg-[#333333] dark:bg-gray-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            The Bottom Line
          </h2>
          <div className="space-y-6 text-lg lg:text-xl mb-12 max-w-3xl mx-auto">
            <p>
              Most people never unlock Claude Code's full potential because proper setup is incredibly complex. We've solved that problem.
            </p>
            <p>
              You get the same AI that professional developers trust, with infrastructure that even experienced engineers struggle to configure properly.
            </p>
          </div>
          <div>
            <p className="text-xl mb-6">Ready for Claude Code that's properly configured?</p>
            <button className="bg-[#BEAEE2] hover:bg-[#F7DBF0] dark:bg-[#9F7AEA] dark:hover:bg-[#B794F6] text-[#333333] dark:text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-200 shadow-sm hover:shadow-md">
              Request early access
            </button>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="px-6 py-8 bg-[#F9F9F9] dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-[#7A7A7A] dark:text-gray-400">
            <strong>Important:</strong> We are not affiliated with Claude Code or Anthropic. This service provides setup and configuration assistance.
          </p>
        </div>
      </section>
    </div>
  );
};

export default NoCodeClaudeLanding;