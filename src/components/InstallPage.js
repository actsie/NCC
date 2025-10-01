import React from 'react';
import Header from './Header';
import Footer from './Footer';

const InstallPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 to-white dark:from-[#1a1625] dark:to-[#0f0a1a] transition-colors duration-300">
      <Header />

      <main className="flex-1 px-5 py-20 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-50 mb-4 transition-colors duration-300">
            Welcome to Pawgrammer Beta
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-16 transition-colors duration-300">
            Thank you for being one of our early testers! ✨
          </p>

          <div className="mb-16">
            <a
              href="https://github.com/actsie/NCC/releases/download/v1.1.0/Pawgrammer-1.1.0-arm64.dmg"
              download="Pawgrammer-1.1.0-arm64.dmg"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-400 hover:from-purple-700 hover:to-purple-500 text-white hover:text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 no-underline"
            >
              <img src="/apple-logo.png" alt="Apple" className="h-5 w-auto" />
              <span className="text-white">Download MAC version</span>
            </a>

            <p className="mt-3 text-sm text-gray-500 dark:text-gray-600 transition-colors duration-300">
              Version 1.1.0 (ARM64)
            </p>
          </div>

          <div className="flex justify-center mb-10">
            <div className="bg-white dark:bg-[#1f1625]/60 dark:border dark:border-purple-500/20 rounded-2xl p-8 shadow-md dark:shadow-black/30 text-left max-w-lg transition-all duration-300">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-4 transition-colors duration-300">
                Installation Steps
              </h3>
              <ol className="space-y-2 list-decimal list-inside text-gray-700 dark:text-gray-300 transition-colors duration-300">
                <li>Download the .dmg file above</li>
                <li>Open the downloaded file</li>
                <li>Drag Pawgrammer to Applications</li>
                <li>Launch from Applications folder</li>
              </ol>
            </div>
          </div>

          <p className="text-base text-gray-600 dark:text-gray-400 transition-colors duration-300">
            Need help? Check out the{' '}
            <a
              href="/docs"
              className="text-purple-600 dark:text-purple-400 font-semibold hover:underline transition-colors duration-300"
            >
              Documentation
            </a>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default InstallPage;
