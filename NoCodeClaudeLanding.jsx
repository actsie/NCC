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
                <div className="text-[#BEAEE2] text-2xl mb-4">⚡</div>
                <h4 className="font-semibold text-[#333333] dark:text-white mb-2">Full system control</h4>
                <p className="text-[#7A7A7A] dark:text-gray-300">Reads/writes files, installs tools, creates databases, runs apps locally</p>
              </div>
              <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm">
                <div className="text-[#BEAEE2] text-2xl mb-4">🏗️</div>
                <h4 className="font-semibold text-[#333333] dark:text-white mb-2">Built by Anthropic</h4>
                <p className="text-[#7A7A7A] dark:text-gray-300">Who makes Claude—not a third-party tool paying for API access</p>
              </div>
              <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm">
                <div className="text-[#BEAEE2] text-2xl mb-4">🚀</div>
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
                  <span className="text-[#FFB5B5] mr-3">⚠️</span>
                  Template-based builders like Lovable work for demos but need developer cleanup for real apps
                </li>
                <li className="flex items-start">
                  <span className="text-[#FFB5B5] mr-3">⚠️</span>
                  Limited infrastructure means you hit walls when requirements get complex
                </li>
                <li className="flex items-start">
                  <span className="text-[#FFB5B5] mr-3">⚠️</span>
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
                  <span className="text-[#333333] mr-3">❌</span>
                  Effective Claude.md configuration that most people never get right
                </li>
                <li className="flex items-start">
                  <span className="text-[#333333] mr-3">❌</span>
                  MCP servers, testing frameworks, debugging workflows
                </li>
                <li className="flex items-start">
                  <span className="text-[#333333] mr-3">❌</span>
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
                <span className="text-2xl">🛠️</span>
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
                <span className="text-2xl">👨‍💼</span>
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
                <span className="text-2xl">⚙️</span>
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
          <h2 className="text-3xl lg:text-4xl font-bold text-[#333333] dark:text-white mb-12 text-center">
            How It Works
          </h2>
          
          <div className="space-y-12">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
              <div className="bg-[#BEAEE2] dark:bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#333333] dark:text-white mb-3">
                  Describe your app to our Claude Code interface
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
            Real examples from our expert-configured Claude Code:
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
    </div>
  );
};

export default NoCodeClaudeLanding;