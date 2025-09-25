import React from 'react';

const EarlyAccessButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 text-sm font-semibold text-white rounded-lg bg-[#7866CC] hover:bg-[#5E50A0] transition-colors"
    >
      Get early access
    </button>
  );
};

export default EarlyAccessButton;