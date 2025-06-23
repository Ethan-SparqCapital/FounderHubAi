'use client'; 

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'Dashboard', icon: '🏠', route: '/dashboard' },
  { name: 'Pitch Deck Builder', icon: '📊', route: '/pitch-deck' },
  { name: 'Market Research', icon: '🔍', route: '/market-research' },
  { name: 'Investor CRM', icon: '👥', route: '/investor-crm' },
  { name: 'Legal Docs', icon: '📄', route: '/legal-docs' },
  { name: 'Financial Modeling', icon: '💹', route: '/financial-modeling' },
  { name: 'AI Co-Pilot', icon: '🤖', route: '/ai-co-pilot' },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-64 bg-white border-r min-h-screen flex flex-col">
      <div className="h-20 flex items-center px-6 border-b">
        <Link href="/home" legacyBehavior>
          <a className="font-bold text-xl text-blue-700 hover:underline">FounderHQ.ai</a>
        </Link>
      </div>
      <nav className="flex-1 py-6 px-2 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.route;
          return (
            <Link href={item.route} key={item.name} legacyBehavior>
              <a
                className={`flex items-center px-4 py-2 rounded-lg cursor-pointer mb-1 text-gray-700 hover:bg-blue-50 transition-colors ${isActive ? 'bg-blue-50 text-blue-700 font-semibold' : ''}`}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                {item.name}
              </a>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
} 