import React from "react";

const MarqueeBanner: React.FC = () => {
  return (
<section className="w-full bg-gradient-to-r from-[#2f7cf8] to-[#8350f9] text-white overflow-hidden shadow-md">

      <div className="relative flex overflow-hidden">
        {/* Track 1 */}
        <div className="animate-marquee flex items-center space-x-12 py-2 text-base font-medium">
          <span>🔥 Genuine software licenses at <strong>90% OFF</strong> – grab it now!</span>
          <span>🎉 Limited time offer – <strong>Hurry, stocks running out!</strong></span>
          <span>⭐ Trusted by 10,000+ users – Don’t miss your chance!..</span>
          <span className="inline-block w-1"></span>
        </div>

        {/* Track 2 (duplicate for seamless loop) */}
        <div className="animate-marquee flex items-center space-x-12 py-2 text-base font-medium" aria-hidden="true">
          <span>🔥 Genuine software licenses at <strong>90% OFF</strong> – grab it now!</span>
          <span>🎉 Limited time offer – <strong>Hurry, stocks running out!</strong></span>
          <span>⭐ Trusted by 10,000+ users – Don’t miss your chance!</span>
         
        </div>
      </div>

      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-100%); }
          }
          .animate-marquee {
            flex-shrink: 0;
            min-inline-size: 100%;
            animation: marquee 25s linear infinite;
          }
          .relative:hover .animate-marquee {
            animation-play-state: paused;
          }
        `}
      </style>
    </section>
  );
};

export default MarqueeBanner;
