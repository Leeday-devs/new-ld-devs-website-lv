import React from 'react';

const TrustedByLogos = () => {
  // Sample trusted company logos - you can replace these with actual client logos
  const trustedLogos = [
    {
      name: "Supabase Partner",
      logo: (
        <div className="flex items-center justify-center h-12 w-24 bg-white/10 rounded-lg border border-white/20">
          <span className="text-white font-semibold text-sm">Supabase</span>
        </div>
      )
    },
    {
      name: "Google Partner",
      logo: (
        <div className="flex items-center justify-center h-12 w-24 bg-white/10 rounded-lg border border-white/20">
          <span className="text-white font-semibold text-sm">Google</span>
        </div>
      )
    },
    {
      name: "AWS Partner",
      logo: (
        <div className="flex items-center justify-center h-12 w-24 bg-white/10 rounded-lg border border-white/20">
          <span className="text-white font-semibold text-sm">AWS</span>
        </div>
      )
    },
    {
      name: "Lovable.ai Partner",
      logo: (
        <div className="flex items-center justify-center h-12 w-24 bg-white/10 rounded-lg border border-white/20">
          <span className="text-white font-semibold text-sm">Lovable.ai</span>
        </div>
      )
    },
    {
      name: "Stripe Partner",
      logo: (
        <div className="flex items-center justify-center h-12 w-24 bg-white/10 rounded-lg border border-white/20">
          <span className="text-white font-semibold text-sm">Stripe</span>
        </div>
      )
    },
    {
      name: "WordPress Expert",
      logo: (
        <div className="flex items-center justify-center h-12 w-24 bg-white/10 rounded-lg border border-white/20">
          <span className="text-white font-semibold text-sm">WordPress</span>
        </div>
      )
    },
    {
      name: "OpenAI Partner",
      logo: (
        <div className="flex items-center justify-center h-12 w-24 bg-white/10 rounded-lg border border-white/20">
          <span className="text-white font-semibold text-sm">OpenAI</span>
        </div>
      )
    }
  ];

  return (
    <section className="bg-navy py-16 border-b border-white/10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-white/60 text-lg font-medium tracking-wide uppercase">
            Trusted Technology Partners
          </p>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {trustedLogos.map((partner, index) => (
            <div
              key={index}
              className="opacity-70 hover:opacity-100 transition-opacity duration-300 transform hover:scale-105"
              title={partner.name}
            >
              {partner.logo}
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-white/50 text-sm">
            Certified partners delivering enterprise-grade solutions
          </p>
        </div>
      </div>
    </section>
  );
};

export default TrustedByLogos;