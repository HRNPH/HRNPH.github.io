import React from "react";

import { ReactNode } from "react";

const Background = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative min-h-screen bg-gray-900 text-gray-100">
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900 via-gray-900 to-purple-900 opacity-50" />
      <div className="relative">{children}</div>
    </div>
  );
};

export default Background;
