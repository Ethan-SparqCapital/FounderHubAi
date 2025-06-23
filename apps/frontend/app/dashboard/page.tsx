'use client';
import React from 'react';
import Sidebar from '../pitch-deck/components/Sidebar';
import Link from 'next/link';

export default function DashboardPage() {
  // Mock data for demonstration
  const metrics = [
    { label: 'Annual Recurring Revenue', value: '$2.4M', sub: 'current total', trend: 'up' },
    { label: 'Monthly Recurring Revenue', value: '$200K', sub: 'current total', trend: 'up' },
    { label: 'Growth Rate', value: '18% MoM', sub: 'vs last month', trend: 'up' },
    { label: 'Total Customers', value: '127', sub: 'current total', trend: 'up' },
    { label: 'Churn Rate', value: '3.2%', sub: 'monthly rate', trend: 'down' },
    { label: 'Cash Runway', value: '14 months', sub: 'at current burn', trend: 'flat' },
    { label: 'Team Size', value: '12', sub: 'current total', trend: 'up' },
    { label: 'Funding Raised', value: '$2.5M', sub: 'current total', trend: 'up' },
  ];
  const progressCards = [
    {
      icon: '📄',
      title: 'Pitch Deck',
      stage: 'Review Stage',
      percent: 85,
      color: 'green',
      info: 'Your deck is 85% complete. Consider adding more specific market size data and competitive differentiation slides.',
      blockers: [
        'Need updated financial projections',
        'Waiting for customer testimonial video',
      ],
      link: '/pitch-deck',
    },
    {
      icon: '🔍',
      title: 'Market Research',
      stage: 'Analysis Phase',
      percent: 72,
      color: 'blue',
      info: 'Your TAM analysis is strong. Focus on SAM validation through customer interviews.',
      blockers: ['Waiting for Gartner report access'],
      link: '/market-research',
    },
    {
      icon: '👥',
      title: 'Investor Outreach',
      stage: 'Active Outreach',
      percent: 45,
      color: 'orange',
      info: 'Your response rate is 23% above average. Focus on tier-1 VCs with B2B SaaS portfolio.',
      blockers: ['Need warm introductions to 3 target VCs'],
      link: '/investor-crm',
    },
    {
      icon: '📄',
      title: 'Legal Setup',
      stage: 'Final Review',
      percent: 91,
      color: 'green',
      info: 'Legal foundation is solid. Prioritize IP audit before Series A close.',
      blockers: ['Pending D&O insurance quotes'],
      link: '/legal-docs',
    },
    {
      icon: '⚡',
      title: 'Product Development',
      stage: 'Sprint 12',
      percent: 68,
      color: 'blue',
      info: 'Development velocity is 15% above target. Consider feature freeze for fundraising focus.',
      blockers: ['API rate limiting issues', 'Need ML engineer hire'],
      link: '/product-development',
    },
    {
      icon: '👥',
      title: 'Team Building',
      stage: 'Active Hiring',
      percent: 40,
      color: 'orange',
      info: 'Focus on sales leadership hire to accelerate revenue growth before Series A.',
      blockers: ['Salary benchmarking incomplete', 'Need executive recruiter'],
      link: '/team-management',
    },
    {
      icon: '$',
      title: 'Financial Modeling',
      stage: 'Scenario Planning',
      percent: 78,
      color: 'blue',
      info: 'Your unit economics are strong. Model shows clear path to profitability by month 28.',
      blockers: ['Need updated CAC/LTV analysis'],
      link: '/financial-modeling',
    },
    {
      icon: '⭐',
      title: 'Customer Success',
      stage: 'Optimization',
      percent: 82,
      color: 'green',
      info: 'NPS of 67 is excellent. Focus on expansion revenue opportunities with existing customers.',
      blockers: ['Need customer health scoring system'],
      link: '/customer-success',
    },
  ];
  const aiRecommendations = [
    {
      title: 'Schedule Warm Introductions',
      desc: 'You have 3 target VCs without warm intros. Your network analysis shows 5 potential connectors.',
      impact: 'Impact: 25% increase in meeting success rate',
      action: '#',
    },
    {
      title: 'Automate Investor Updates',
      desc: 'Your investor update process takes 4 hours monthly. AI can reduce this to 30 minutes.',
      impact: 'Impact: Save 3.5 hours monthly',
      action: '#',
    },
    {
      title: 'Accelerate Enterprise Sales',
      desc: 'Your SMB success rate is 67%. Enterprise deals are 3x larger but only 23% success rate.',
      impact: 'Impact: 40% revenue increase potential',
      action: '#',
    },
    {
      title: 'Diversify Customer Concentration',
      desc: 'Top 3 customers represent 45% of ARR. Industry best practice is <30%.',
      impact: 'Impact: Reduce customer concentration risk',
      action: '#',
    },
  ];
  const quickActions = [
    { label: 'Update Pitch Deck', desc: 'Add latest customer metrics', icon: '📄', link: '/pitch-deck' },
    { label: 'Send Investor Update', desc: 'Monthly update to current investors', icon: '👥', link: '/investor-crm' },
    { label: 'Review Legal Checklist', desc: 'Check Series A preparation status', icon: '📄', link: '/legal-docs' },
    { label: 'Schedule Team 1:1s', desc: 'Quarterly check-ins with direct reports', icon: '👥', link: '/team-management' },
    { label: 'Analyze Competitor Moves', desc: 'Review latest market intelligence', icon: '🔍', link: '/market-research' },
  ];
  const recentDocs = [
    { title: 'Series A Pitch Deck v4.1', type: 'Presentation', time: '2 hours ago', status: 'Draft' },
    { title: 'Q2 2024 Board Deck', type: 'Presentation', time: '1 day ago', status: 'Final' },
    { title: 'Competitive Analysis Report', type: 'Document', time: '3 days ago', status: 'Review' },
    { title: 'Series A Term Sheet Template', type: 'Legal Document', time: '5 days ago', status: 'Template' },
    { title: 'Customer Interview Insights', type: 'Research', time: '1 week ago', status: 'Complete' },
    { title: 'Financial Model v2024.2', type: 'Spreadsheet', time: '1 week ago', status: 'Active' },
    { title: 'Product Roadmap Q3-Q4', type: 'Planning', time: '2 weeks ago', status: 'Approved' },
    { title: 'Investor CRM Database', type: 'Spreadsheet', time: '2 weeks ago', status: 'Active' },
  ];
  const teamActivity = [
    { name: 'Mike Rodriguez (CTO)', action: 'Completed API security audit', time: '6/4/2024, 9:45:00 AM' },
    { name: 'Lisa Wang (VP Product)', action: 'Published Q3 product roadmap', time: '6/4/2024, 7:20:00 AM' },
    { name: 'David Kim (Head of Sales)', action: 'Closed $45K ARR deal with TechCorp', time: '6/4/2024, 4:30:00 AM' },
    { name: 'AI Co-Pilot', action: 'Generated investor outreach templates', time: '6/4/2024, 2:15:00 AM' },
    { name: 'Jennifer Liu (Customer Success)', action: 'Reduced churn rate to 3.2% (target: <3%)', time: '6/3/2024, 10:00:00 AM' },
  ];
  const milestones = [
    { title: 'Benchmark Partner Meeting', type: 'Investor Meeting', percent: 85, date: '2024-06-12', critical: true },
    { title: 'Product Demo Day', type: 'Product Launch', percent: 60, date: '2024-06-18', critical: false },
    { title: 'Board Meeting Q2', type: 'Governance', percent: 40, date: '2024-06-25', critical: false },
    { title: 'Series A Target Close', type: 'Fundraising', percent: 45, date: '2024-08-15', critical: true },
  ];
  const notifications = [
    { type: 'warning', title: 'Pitch deck review due in 2 days', desc: 'Benchmark meeting preparation deadline approaching', time: '6/4/2024, 12:30:00 PM' },
    { type: 'success', title: 'Monthly revenue target exceeded', desc: 'June MRR reached $205K (target: $200K)', time: '6/4/2024, 11:00:00 AM' },
    { type: 'info', title: 'Investor response rate trending up', desc: '23% above industry average - consider expanding outreach', time: '6/4/2024, 8:30:00 AM' },
    { type: 'success', title: 'Engineering sprint completed early', desc: 'Sprint 12 finished 2 days ahead of schedule', time: '6/4/2024, 5:00:00 AM' },
  ];
  const workflow = [
    { title: 'Series A Preparation', percent: 68, next: 'Series A Fundraising in 3 months', steps: [
      { label: 'Idea Validation & Market Research', desc: 'Validate problem-solution fit and analyze market opportunity', weeks: '2-4 weeks', depends: '', link: '/market-research', status: 'done', icon: '🔍' },
      { label: 'MVP Development & Testing', desc: 'Build minimum viable product and gather user feedback', weeks: '3-6 months', depends: '', link: '/product-development', status: 'done', icon: '⚡' },
      { label: 'Core Team Assembly', desc: 'Recruit key team members and establish company culture', weeks: '2-3 months', depends: '', link: '/team-management', status: 'done', icon: '👥' },
      { label: 'Legal Structure & Compliance', desc: 'Establish legal entity, IP protection, and compliance framework', weeks: '3-4 weeks', depends: '1 step(s)', link: '/legal-docs', status: 'done', icon: '📄' },
      { label: 'Financial Planning & Modeling', desc: 'Create comprehensive financial projections and unit economics', weeks: '2-3 weeks', depends: '1 step(s)', link: '/financial-modeling', status: 'todo', icon: '$' },
      { label: 'Investor Pitch Deck Creation', desc: 'Develop compelling pitch deck for Series A fundraising', weeks: '3-4 weeks', depends: '2 step(s)', link: '/pitch-deck', status: 'todo', icon: '📄' },
      { label: 'Investor Research & Outreach', desc: 'Identify target investors and prepare outreach strategy', weeks: '4-6 weeks', depends: '1 step(s)', link: '/investor-crm', status: 'todo', icon: '👥' },
      { label: 'Series A Fundraising', desc: 'Execute fundraising process and close Series A round', weeks: '3-6 months', depends: '1 step(s)', link: '/fundraising', status: 'todo', icon: '💰' },
    ] },
  ];
  const nextActions = [
    'Complete financial model scenarios (Base/Bear/Bull cases)',
    'Finalize pitch deck slides 8-12 (traction and financials)',
    'Begin investor research and warm introduction mapping',
  ];

  // Helper for trend icons
  const trendIcon = (trend) => {
    if (trend === 'up') return <span className="text-green-500 ml-1">↑</span>;
    if (trend === 'down') return <span className="text-red-500 ml-1">↓</span>;
    return <span className="text-gray-400 ml-1">→</span>;
  };

  // Helper for progress color
  const progressColor = (color) => {
    if (color === 'green') return 'text-green-600 border-green-300';
    if (color === 'blue') return 'text-blue-600 border-blue-300';
    if (color === 'orange') return 'text-orange-500 border-orange-300';
    return 'text-gray-600 border-gray-300';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col p-6 md:p-10">
        {/* Welcome Banner */}
        <div className="bg-blue-50 rounded-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <div className="font-semibold text-lg text-blue-900 mb-1">Welcome back, Sarah Chen!</div>
            <div className="text-gray-500 text-sm flex items-center gap-2">
              <span>🕒</span> Updated Series A pitch deck 2 hours ago
            </div>
          </div>
          <div className="text-blue-700 font-semibold text-right mt-4 md:mt-0">
            Current Stage<br />
            <span className="text-lg">Series A Fundraising</span>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {metrics.map((m, i) => (
            <div key={i} className="bg-white rounded-lg shadow p-6 flex flex-col items-start">
              <div className="text-xs text-gray-500 mb-1">{m.label}</div>
              <div className="text-2xl font-bold text-blue-900 flex items-center">{m.value} {trendIcon(m.trend)}</div>
              <div className="text-xs text-gray-400 mt-1">{m.sub}</div>
            </div>
          ))}
        </div>

        {/* Progress Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {progressCards.map((card, i) => (
            <Link href={card.link} key={i} legacyBehavior>
              <a className="bg-white rounded-lg shadow p-6 flex flex-col hover:bg-blue-50 transition cursor-pointer">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{card.icon}</span>
                  <span className="font-semibold text-lg">{card.title}</span>
                  <span className={`ml-auto px-2 py-1 rounded text-xs ${card.color === 'green' ? 'bg-green-100 text-green-700' : card.color === 'blue' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'}`}>{card.stage}</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`font-bold text-2xl border-2 rounded-full px-3 py-1 ${progressColor(card.color)}`}>{card.percent}%</span>
                </div>
                <div className="bg-blue-50 text-blue-800 text-xs rounded p-2 mb-2">{card.info}</div>
                <div className="text-xs text-gray-500 mb-1 font-semibold">Current Blockers:</div>
                <ul className="text-xs text-red-500 list-disc pl-5">
                  {card.blockers.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
              </a>
            </Link>
          ))}
        </div>

        {/* AI Recommendations & Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2">
            <div className="font-bold text-lg mb-2">AI Recommendations</div>
            <div className="flex flex-col gap-3">
              {aiRecommendations.map((rec, i) => (
                <div key={i} className="bg-yellow-50 border-l-4 border-yellow-400 rounded p-4 flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="font-semibold text-yellow-700 mb-1">{rec.title}</div>
                    <div className="text-gray-700 text-sm mb-1">{rec.desc}</div>
                    <div className="text-xs text-gray-500">{rec.impact}</div>
                  </div>
                  <a href={rec.action} className="text-blue-600 font-semibold mt-2 md:mt-0 md:ml-4 hover:underline">Take Action &rarr;</a>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="font-bold text-lg mb-2">Quick Actions</div>
            <div className="flex flex-col gap-3">
              {quickActions.map((action, i) => (
                <Link href={action.link} key={i} legacyBehavior>
                  <a className="bg-white rounded-lg shadow p-3 flex items-center gap-3 hover:bg-blue-50 transition cursor-pointer">
                    <span className="text-xl">{action.icon}</span>
                    <span>
                      <span className="font-semibold block">{action.label}</span>
                      <span className="text-xs text-gray-500 block">{action.desc}</span>
                    </span>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Documents & Team Activity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <div className="font-bold text-lg mb-2 flex items-center gap-2"><span>📄</span> Recent Documents</div>
            <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-2">
              {recentDocs.map((doc, i) => (
                <div key={i} className="flex items-center justify-between border-b last:border-b-0 py-2">
                  <div>
                    <div className="font-semibold text-blue-700 flex items-center gap-2"><span>📄</span> {doc.title}</div>
                    <div className="text-xs text-gray-500">{doc.type} • {doc.time}</div>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs ${doc.status === 'Final' ? 'bg-green-100 text-green-700' : doc.status === 'Draft' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-700'}`}>{doc.status}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="font-bold text-lg mb-2 flex items-center gap-2"><span>👥</span> Team Activity</div>
            <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-2">
              {teamActivity.map((act, i) => (
                <div key={i} className="flex items-center gap-2 border-b last:border-b-0 py-2">
                  <span className="text-green-500">✔️</span>
                  <div>
                    <div className="font-semibold text-gray-700">{act.name} {act.action}</div>
                    <div className="text-xs text-gray-500">{act.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Milestones & Notifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <div className="font-bold text-lg mb-2 flex items-center gap-2"><span>📅</span> Upcoming Milestones</div>
            <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-2">
              {milestones.map((m, i) => (
                <div key={i} className="flex items-center justify-between border-b last:border-b-0 py-2">
                  <div>
                    <div className="font-semibold text-blue-700 flex items-center gap-2"><span>🎯</span> {m.title}</div>
                    <div className="text-xs text-gray-500">{m.type} • {m.percent}% complete</div>
                    <div className="text-xs text-gray-400">{m.date}</div>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs ${m.critical ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>{m.critical ? 'Critical' : 'High'}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="font-bold text-lg mb-2 flex items-center gap-2"><span>🔔</span> Notifications</div>
            <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-2">
              {notifications.map((n, i) => (
                <div key={i} className="flex items-center gap-2 border-b last:border-b-0 py-2">
                  <span className={
                    n.type === 'warning' ? 'text-yellow-500' :
                    n.type === 'success' ? 'text-green-500' :
                    n.type === 'info' ? 'text-blue-500' : 'text-gray-400'
                  }>
                    {n.type === 'warning' ? '⚠️' : n.type === 'success' ? '✅' : n.type === 'info' ? 'ℹ️' : '🔔'}
                  </span>
                  <div>
                    <div className="font-semibold text-gray-700">{n.title}</div>
                    <div className="text-xs text-gray-500">{n.desc}</div>
                    <div className="text-xs text-gray-400">{n.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Startup Journey Workflow */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="font-bold text-lg mb-2 flex items-center gap-2"><span>🟣</span> Startup Journey Workflow</div>
          {workflow.map((wf, i) => (
            <div key={i} className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <div className="font-semibold text-blue-900 text-lg">{wf.title}</div>
                <div className="text-blue-700 font-semibold">{wf.percent}% Complete</div>
              </div>
              <div className="text-xs text-gray-500 mb-2">Next milestone: {wf.next}</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${wf.percent}%` }}></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {wf.steps.map((step, j) => (
                  <div key={j} className={`rounded-lg p-4 border ${step.status === 'done' ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200'}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl">{step.icon}</span>
                      <span className="font-semibold">{step.label}</span>
                      <span className="ml-auto text-xs text-gray-500">{step.weeks}</span>
                    </div>
                    <div className="text-xs text-gray-600 mb-1">{step.desc}</div>
                    {step.depends && <div className="text-xs text-gray-400 mb-1">Depends on: {step.depends}</div>}
                    <Link href={step.link} legacyBehavior>
                      <a className="text-blue-600 text-xs font-semibold hover:underline">View details &rarr;</a>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Recommended Next Actions */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded p-6 mb-8">
          <div className="font-bold text-lg mb-2 flex items-center gap-2"><span>💡</span> Recommended Next Actions</div>
          <ul className="list-disc pl-6 text-gray-700">
            {nextActions.map((a, i) => <li key={i}>{a}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
} 