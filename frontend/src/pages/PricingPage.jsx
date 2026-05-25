import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      name: 'Free',
      tagline: 'Perfect for exploring the platform.',
      priceMonthly: 0,
      priceYearly: 0,
      features: [
        '1 video resume recording (60s max)',
        'Basic web teleprompter access',
        'Apply to up to 5 jobs per month',
        'Standard profile dashboard',
        'Basic AI candidate feedback summary'
      ],
      cta: 'Get Started Free',
      ctaLink: '/login',
      isPopular: false,
      color: 'border-border-input'
    },
    {
      name: 'Candidate Pro',
      tagline: 'For active seekers aiming to stand out.',
      priceMonthly: 12,
      priceYearly: 9,
      features: [
        'Unlimited video resume variations',
        'AI prompter script writer helper',
        'Unlimited job applications',
        'Priority AI matching score breakdowns',
        'Highlight profile in search results',
        'Download video resume file directly'
      ],
      cta: 'Upgrade to Pro',
      ctaLink: '/login',
      isPopular: true,
      color: 'border-primary shadow-[0_0_30px_rgba(108,92,231,0.15)] bg-gradient-to-b from-[#13131A] to-[#1E1E2E]'
    },
    {
      name: 'Enterprise Recruiter',
      tagline: 'Scale your team with video screening.',
      priceMonthly: 119,
      priceYearly: 95,
      features: [
        'Unlimited active job posts',
        'Full behavioral & soft-skill AI summaries',
        'Interactive drag & drop pipelines',
        'Download transcriptions & analytical reports',
        'Direct recruiter-candidate calendar sync',
        'Priority premium customer support'
      ],
      cta: 'Get Recruiter Access',
      ctaLink: '/login',
      isPopular: false,
      color: 'border-border-input'
    }
  ];

  return (
    <div className="bg-background text-text-primary font-body-md min-h-screen flex flex-col pt-24">
      <Navbar />

      <main className="flex-1 max-w-container-max mx-auto px-gutter py-20 w-full relative">
        {/* Decorative Grid BG / Lights */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl pointer-events-none"></div>

        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="font-display text-5xl font-extrabold tracking-tight mb-4 text-white">
            Simple, Transparent <span className="text-primary">Pricing</span>
          </h1>
          <p className="font-body-lg text-text-muted">
            Choose the plan that fits your career goals or recruitment scaling. Cancel or switch anytime.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center items-center gap-4 mb-16">
          <span className={`font-label-md transition-colors ${billingCycle === 'monthly' ? 'text-white' : 'text-text-muted'}`}>
            Monthly
          </span>
          <button
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
            className="w-14 h-8 bg-surface-container border border-border-input rounded-full p-1 transition-all duration-300 relative"
          >
            <div
              className={`w-6 h-6 rounded-full bg-primary transition-all duration-300 ${
                billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
          <div className="flex items-center gap-2">
            <span className={`font-label-md transition-colors ${billingCycle === 'yearly' ? 'text-white' : 'text-text-muted'}`}>
              Yearly
            </span>
            <span className="bg-secondary/15 text-secondary border border-secondary/20 px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase">
              Save 20%
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid lg:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto">
          {plans.map((plan, idx) => {
            const price = billingCycle === 'monthly' ? plan.priceMonthly : plan.priceYearly;
            return (
              <div
                key={idx}
                className={`border rounded-2xl p-8 flex flex-col justify-between relative hover:border-primary/50 transition-all duration-300 ${plan.color}`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-white font-label-md text-[10px] uppercase font-bold tracking-widest px-4 py-1 rounded-full border border-primary-fixed-dim/20 shadow-md">
                    Most Popular
                  </div>
                )}

                <div>
                  <h3 className="font-display text-headline-sm font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-text-muted text-sm mb-6">{plan.tagline}</p>

                  <div className="flex items-baseline gap-1 mb-8 border-b border-border-input pb-6">
                    <span className="font-display text-4xl font-extrabold text-white">$</span>
                    <span className="font-display text-6xl font-black text-white leading-none tracking-tight">
                      {price}
                    </span>
                    <span className="text-text-muted text-sm ml-1">/{billingCycle === 'monthly' ? 'mo' : 'mo, billed annually'}</span>
                  </div>

                  <ul className="space-y-4">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-secondary text-[20px] select-none mt-0.5">
                          check_circle
                        </span>
                        <span className="text-text-primary text-sm font-body-md leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4">
                  <a
                    href={plan.ctaLink}
                    className={`block w-full text-center py-3.5 rounded-xl font-label-md font-bold transition-all duration-200 ${
                      plan.isPopular
                        ? 'bg-primary text-white hover:opacity-90 hover:shadow-lg active:scale-95'
                        : 'bg-surface-container hover:bg-surface border border-border-input text-text-primary active:scale-95'
                    }`}
                  >
                    {plan.cta}
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* FAQs */}
        <div className="mt-32 max-w-3xl mx-auto border-t border-border-input pt-20">
          <h3 className="font-display text-3xl font-bold text-white text-center mb-12">
            Frequently Asked Questions
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <h4 className="font-headline-sm text-white font-bold">Can I cancel my subscription anytime?</h4>
              <p className="text-text-muted text-sm leading-relaxed">
                Yes. If you choose to cancel, your premium features will remain active until the end of your current billing period.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-headline-sm text-white font-bold">How does the 60-second video resume work?</h4>
              <p className="text-text-muted text-sm leading-relaxed">
                We provide a built-in teleprompter script builder. You choose the questions, customize your talking points, hit record, and we format and submit the link directly.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-headline-sm text-white font-bold">What metrics does the AI measure?</h4>
              <p className="text-text-muted text-sm leading-relaxed">
                Our models evaluate vocal confidence, pacing, structure, matching keywords of the job target, and key communication indicators.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-headline-sm text-white font-bold">Is there a contract?</h4>
              <p className="text-text-muted text-sm leading-relaxed">
                No contract. All monthly and yearly plans are self-serve, and you can close your account at any point with no hidden fees.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PricingPage;
