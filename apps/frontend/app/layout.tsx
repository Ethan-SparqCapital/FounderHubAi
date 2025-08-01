import './globals.css';
import React from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        {/* Main Content Only - Sidebar handled at page level */}
        <main>{children}</main>
      </body>
    </html>
  );
} 