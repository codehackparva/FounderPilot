"use client";
import Link from 'next/link';
import {BIZ} from '@/lib/data';
import Icon from '@/components/Icon';

const STATS = [
  { value: '6×', label: 'Faster replies' },
  { value: '3', label: 'Languages' },
  { value: '100%', label: 'Human-approved' },
];

const CARDS = [
  { icon: <Icon k="chat" size={20}/>, title: 'Support Chat', meta: 'Customer replied in Hindi', color: '#1a6b4a' },
  { icon: <Icon k="content" size={20}/>, title: 'Content Studio', meta: 'Caption draft ready for review', color: '#c28818' },
  { icon: <Icon k="insights" size={20}/>, title: 'Insights', meta: 'Revenue up 12% this month', color: '#4d7c8a' },
];

const F=[['chat','Support Chat','Answers customers in English, Hindi and Gujarati. Refunds and complaints go to you.'],['content','Content Studio','Draft captions, ads and blog intros, edit them, send them for approval.'],['insights','Insights','Sales trend, next-month forecast and where the ad budget should go.'],['scheduler','Scheduler','The week of posts at a glance. Approved drafts land here.'],['inventory','Inventory','Days of stock left for each product, and when to reorder.'],['knowledge','Business Data','The FAQs, products and orders everything runs on. Add your own and ask again.']];

export default function Home(){ return <>
  {/* ── Hero ─────────────────────────────────────────── */}
  <section className="hero-split">
    {/* Left — editorial text */}
    <div className="hero-left">
      <div className="eyebrow">AI workspace for small teams</div>
      <h1>Do the work<br/>of 15 with a<br/>team of 5.</h1>
      <p className="sub">Customer replies, social posts, sales numbers and stock levels — all in one place. Nothing sensitive goes out without a human sign-off.</p>
      <div className="hero-cta">
        <Link className="btn" href="/chat">Try support chat →</Link>
        <Link className="btn g" href="/insights">See the numbers</Link>
      </div>
      {/* Stats row */}
      <div className="hero-stats">
        {STATS.map(s=>(
          <div key={s.label} className="hero-stat">
            <strong>{s.value}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Right — orbital cards around FP logo */}
    <div className="hero-right" aria-hidden="true">
      <div className="orbit-scene">
        {/* Dashed orbit ring */}
        <div className="orbit-ring"/>

        {/* Centre: FP logo badge */}
        <div className="orbit-center">
          <div className="fp-badge">
            <span className="fp-word">Founder</span>
            <span className="fp-word accent">Pilot</span>
          </div>
          <div className="orbit-center-glow"/>
        </div>

        {/* One .orbit-arm per card; arm spins, card counter-spins to stay upright */}
        {CARDS.map((c,i)=>(
          <div key={c.title} className="orbit-arm" style={{'--i':i, '--hc':c.color}}>
            <div className="hero-card" style={{'--hc':c.color}}>
              <div className="hc-icon">{c.icon}</div>
              <div>
                <div className="hc-title">{c.title}</div>
                <div className="hc-meta">{c.meta}</div>
              </div>
              <div className="hc-dot"/>
            </div>
          </div>
        ))}

        <div className="blob b1"/>
        <div className="blob b2"/>
      </div>
    </div>
  </section>


  <p className="mute" style={{marginTop:4,marginBottom:40}}>
    Demo: {BIZ.name}, {BIZ.city} — {BIZ.faqs.length} FAQs · {BIZ.products.length} products · {BIZ.orders.length} orders
  </p>

  {/* ── Features Bento Grid ─────────────────────────────────── */}
  <section className="features-section">
    <div className="section-head">
      <h2 className="section-title">Everything a small business needs.</h2>
      <p className="mute">Six powerful modules, all running on your real business data.</p>
    </div>

    <div className="bento-grid">
      {F.map(([k,n,d],i)=>(
        <Link key={k} className={`bento-card bento-${k}`} href={'/'+k}>
          <div className="bento-icon">
            <Icon k={k==='knowledge'?'data':k} size={24} />
          </div>
          <div className="bento-content">
            <h3>{n}</h3>
            <p>{d}</p>
          </div>
          <div className="bento-arrow">→</div>
        </Link>
      ))}
    </div>
  </section>

  {/* ── Value Props ─────────────────────────────────────────── */}
  <section className="values-section">
    <div className="value-card">
      <div className="vc-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
      </div>
      <h3>AI drafts</h3>
      <p className="mute">Content, replies and insights are produced in seconds.</p>
    </div>
    <div className="value-card">
      <div className="vc-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
      </div>
      <h3>A person approves</h3>
      <p className="mute">Nothing goes live, and no sensitive reply is sent, without a human.</p>
    </div>
    <div className="value-card">
      <div className="vc-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
      </div>
      <h3>You stay in charge</h3>
      <p className="mute">Review queues catch mistakes before customers do.</p>
    </div>
  </section>
</>}

