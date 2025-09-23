import React from 'react';
const TrustedByLogos = () => {
  const trustedLogos = [{
    name: "Supabase",
    url: "https://supabase.com",
    displayName: "Supabase"
  }, {
    name: "Google",
    url: "https://cloud.google.com",
    displayName: "Google"
  }, {
    name: "AWS",
    url: "https://aws.amazon.com",
    displayName: "AWS"
  }, {
    name: "20i",
    url: "https://www.20i.com",
    displayName: "20i"
  }, {
    name: "Lovable.ai",
    url: "https://lovable.dev",
    displayName: "Lovable.ai"
  }, {
    name: "Stripe",
    url: "https://stripe.com",
    displayName: "Stripe"
  }, {
    name: "WordPress",
    url: "https://wordpress.org",
    displayName: "WordPress"
  }, {
    name: "OpenAI",
    url: "https://openai.com",
    displayName: "OpenAI"
  }, {
    name: "Leonardo.ai",
    url: "https://leonardo.ai",
    displayName: "Leonardo.ai"
  }];
  return <section className="bg-navy pb-0 border-b border-white/10">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <p className="text-white/60 text-sm sm:text-base md:text-lg font-medium tracking-wide uppercase">
            Trusted Technology Partners
          </p>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-2 xs:gap-3 sm:gap-4 md:gap-6 lg:gap-8 px-2 sm:px-4">
          {trustedLogos.map((partner, index) => <a key={index} href={partner.url} target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition-all duration-300 transform hover:scale-105 flex-shrink-0 cursor-pointer" title={`Visit ${partner.name}`}>
              <div className="flex items-center justify-center h-6 xs:h-8 sm:h-10 md:h-12 w-12 xs:w-14 sm:w-18 md:w-24 bg-white/10 rounded-lg border border-white/20 hover:border-white/40 hover:bg-white/20 transition-colors duration-300">
                <span className="text-white font-semibold text-[10px] xs:text-xs sm:text-sm whitespace-nowrap px-1">{partner.displayName}</span>
              </div>
            </a>)}
        </div>
        
        <div className="text-center mt-8 sm:mt-12">
          <p className="text-white/50 text-xs sm:text-sm my-[18px]">
            Certified partners delivering enterprise-grade solutions
          </p>
        </div>
      </div>
    </section>;
};
export default TrustedByLogos;