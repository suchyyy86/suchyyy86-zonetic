import React, { useEffect, useRef, useState } from 'react';
import { Language } from '../types';
import { CONTENT } from '../constants';
import Button from './Button';

import { Zap, TrendingUp, Smartphone, ArrowRight } from 'lucide-react';

interface BenefitsProps {
  lang: Language;
}

const Benefits: React.FC<BenefitsProps> = ({ lang }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const beamRef = useRef<HTMLDivElement>(null);
  const itemContainerRef = useRef<(HTMLDivElement | null)[]>([]);
  const nodeCircleRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Cache for precise node center positions relative to the track top
  const nodePositionsRef = useRef<number[]>([]);
  const maxTrackHeightRef = useRef<number>(0);

  // 1. Precise Layout Calculation
  useEffect(() => {
    const calculateLayout = () => {
      if (!trackRef.current || nodeCircleRefs.current.length === 0) return;

      const trackRect = trackRef.current.getBoundingClientRect();
      const trackTop = trackRect.top; // The absolute visual start of the line

      const positions: number[] = [];

      nodeCircleRefs.current.forEach((node) => {
        if (node) {
          const nodeRect = node.getBoundingClientRect();
          // Calculate the exact center Y of the node
          const nodeCenterY = nodeRect.top + (nodeRect.height / 2);

          // Distance from Track Top to Node Center
          // This allows for sub-pixel precision
          const relativePos = nodeCenterY - trackTop;
          positions.push(relativePos);
        }
      });

      nodePositionsRef.current = positions;

      if (positions.length > 0) {
        // Track visual height ends EXACTLY at the center of the last node
        const lastPos = positions[positions.length - 1];
        maxTrackHeightRef.current = lastPos;
        trackRef.current.style.height = `${lastPos}px`;
      }
    };

    // Initial calc
    calculateLayout();

    // Use ResizeObserver for robust detection of any layout shift
    const resizeObserver = new ResizeObserver(() => {
      calculateLayout();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Also listen to window resize as a fallback
    window.addEventListener('resize', calculateLayout);

    // Slight delay to allow fonts/images to settle
    const timer = setTimeout(calculateLayout, 500);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', calculateLayout);
      clearTimeout(timer);
    };
  }, []);

  // 2. The Physics Loop (Pixel-perfect synchronization)
  useEffect(() => {
    let rAFId: number;

    const update = () => {
      if (!containerRef.current || !beamRef.current || !trackRef.current) return;

      const trackRect = trackRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      // Trigger at center (50%)
      const viewCenter = windowHeight * 0.5;

      // Calculate how far the trigger point is relative to the Track Top.
      const scrollPixels = viewCenter - trackRect.top;

      const maxH = maxTrackHeightRef.current;

      // Clamp beam height
      const beamHeight = Math.max(0, Math.min(scrollPixels, maxH));

      // A. Update Beam Visuals
      // We set the height directly. Because the track and beam share the same "top",
      // this height projects the beam exactly that many pixels down.
      beamRef.current.style.height = `${beamHeight}px`;

      // B. Check collisions using exact coordinates
      const positions = nodePositionsRef.current;

      itemContainerRef.current.forEach((item, index) => {
        if (!item) return;

        const nodeCenter = positions[index];
        const nextNodeCenter = positions[index + 1] || 999999;

        // Precision Logic:
        // We use a tiny epsilon (0.5px) to prevent flickering on exact boundary
        const isPassed = beamHeight >= (nodeCenter - 0.5);

        let isCurrent = false;
        if (index === positions.length - 1) {
          // Last item: Active if passed
          isCurrent = isPassed;
        } else {
          // Middle items: Active if passed this one but not reached next one
          isCurrent = isPassed && beamHeight < (nextNodeCenter - 0.5);
        }

        // Apply State
        const currentState = item.getAttribute('data-state');
        let newState = 'inactive';

        if (isCurrent) newState = 'active';
        else if (isPassed) newState = 'passed';

        if (currentState !== newState) {
          item.setAttribute('data-state', newState);
        }

        // C. Parallax / Scale Effects
        const dist = Math.abs(beamHeight - nodeCenter);
        const isMobile = window.innerWidth < 768;
        const activationRange = isMobile ? 250 : 400; // Tighter range on mobile

        if (dist < activationRange) {
          const card = item.querySelector('.benefit-card') as HTMLElement;
          if (card) {
            let targetScale = 0.95;
            let targetOpacity = 0.3;
            let targetBlur = 4;

            if (isCurrent) {
              targetScale = 1;
              targetOpacity = 1;
              targetBlur = 0;
            } else if (isPassed) {
              targetScale = 0.98;
              targetOpacity = 0.6;
              targetBlur = 0;
            } else {
              // Approaching
              const enterFactor = Math.max(0, 1 - (dist / (activationRange * 0.8)));
              targetOpacity = 0.3 + (enterFactor * 0.7);
              targetScale = 0.95 + (enterFactor * 0.05);
              targetBlur = 4 - (enterFactor * 4);
            }

            card.style.transform = `scale(${targetScale})`;
            card.style.opacity = `${targetOpacity}`;
            card.style.filter = `blur(${targetBlur}px)`;
          }
        }
      });

      rAFId = requestAnimationFrame(update);
    };

    rAFId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rAFId);
  }, []);

  const icons = [
    <Zap className="w-6 h-6" />,
    <TrendingUp className="w-6 h-6" />,
    <Smartphone className="w-6 h-6" />
  ];

  return (
    <section id="why-us" className="py-24 md:py-32 bg-slate-950 relative overflow-hidden">
      {/* Ambient Background Glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">

          {/* Left Column - Sticky Header */}
          <div className="lg:sticky lg:top-40 lg:h-fit self-start mb-12 lg:mb-0 z-10">
            <div className="relative">
              <div className="absolute -inset-4 bg-teal-500/10 blur-3xl opacity-20 rounded-full" />

              <h2 className="relative text-4xl sm:text-5xl md:text-6xl font-black text-white mb-8 leading-tight tracking-tight drop-shadow-lg">
                {CONTENT.benefits.headline[lang]}
              </h2>

              <p className="relative text-lg md:text-xl text-slate-300 max-w-lg leading-relaxed mb-10 border-l-4 border-teal-500 pl-6 py-1">
                {lang === 'CZ'
                  ? 'Digitální svět se mění každým dnem. My zajistíme, aby váš byznys nejen stíhal tempo, ale udával směr. Technologie v našich rukou nejsou jen nástrojem, ale vaší konkurenční výhodou.'
                  : 'The digital world changes every day. We ensure your business not only keeps up but leads the way. In our hands, technology is not just a tool, but your competitive advantage.'}
              </p>

              <div className="pl-1">
                <Button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  variant="primary"
                  className="group px-8 py-4 text-lg"
                >
                  <span className="flex items-center gap-3">
                    {lang === 'CZ' ? 'Projednat projekt' : 'Discuss Project'}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </div>
            </div>


          </div>

          {/* Right Column - Premium Timeline Experience */}
          <div ref={containerRef} className="relative pb-12 lg:pb-24 min-h-[800px]">

            {/* --- THE LINE SYSTEM --- */}
            <div
              ref={trackRef}
              className="absolute left-[24px] md:left-[48px] -translate-x-1/2 top-0 w-[2px] block transition-[left] duration-300"
            >
              {/* 1. Base Track (Dark Grey) */}
              <div className="absolute inset-0 bg-slate-800/50 rounded-full" />

              {/* 2. Active Beam (Glowing Teal) */}
              <div
                ref={beamRef}
                className="absolute top-0 w-full bg-gradient-to-b from-teal-500 via-teal-400 to-teal-500 rounded-full shadow-[0_0_10px_rgba(20,184,166,0.3)] md:shadow-[0_0_20px_rgba(20,184,166,0.5)] will-change-[height]"
                style={{ height: '0px' }}
              >
                {/* The Laser Head Tip */}
                {/* iOS Fix: Use shadow instead of blur on mobile to prevent clipping "box" artifacts */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full
                                w-[2px] h-[15px] bg-white shadow-[0_0_5px_rgba(255,255,255,0.8)]
                                md:w-[4px] md:h-[30px] md:blur-[4px] md:shadow-none"
                />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full
                                w-4 h-4 bg-teal-300 shadow-[0_0_15px_rgba(20,184,166,0.6)]
                                md:w-8 md:h-8 md:blur-md md:shadow-none"
                />
                <div className="hidden md:block absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-teal-400/30 blur-xl rounded-full translate-y-1/2" />
              </div>
            </div>

            {/* Items Container */}
            <div className="space-y-24 md:space-y-32 relative z-10 pt-24 md:pt-40">
              {CONTENT.benefits.items.map((item, index) => {
                return (
                  <div
                    key={index}
                    ref={(el) => itemContainerRef.current[index] = el}
                    data-state="inactive"
                    // Padding matches the axis offset + spacing
                    className="relative pl-[72px] md:pl-[120px] group benefit-item transition-[padding] duration-300"
                  >
                    {/* --- THE NODE (THE STOP) --- */}
                    <div className="flex absolute left-[24px] md:left-[48px] top-0 -translate-x-1/2 z-20 items-center justify-center transition-[left] duration-300">

                      {/* 1. Pulse Rings (Active State) */}
                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-teal-500/20 transition-all duration-700 ease-out 
                                        opacity-0 scale-0 group-data-[state=active]:opacity-100 group-data-[state=active]:scale-[2.5] w-[30px] h-[30px] md:group-data-[state=active]:w-[40px] md:group-data-[state=active]:h-[40px]"
                      />
                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-500/5 transition-all duration-500 ease-out delay-75
                                        opacity-0 scale-0 group-data-[state=active]:opacity-100 group-data-[state=active]:scale-[1.8] w-[30px] h-[30px] md:group-data-[state=active]:w-[40px] md:group-data-[state=active]:h-[40px]"
                      />

                      {/* 2. The Main Node Circle - WE REF THIS FOR CALCULATIONS */}
                      <div
                        ref={(el) => nodeCircleRefs.current[index] = el}
                        className="
                            relative flex items-center justify-center rounded-full
                            transition-all duration-500 cubic-bezier(0.19, 1, 0.22, 1)
                            bg-slate-950 border-2 z-30
                            
                            w-3 h-3 md:w-4 md:h-4 border-slate-700 bg-slate-900 
                            
                            group-data-[state=passed]:w-4 group-data-[state=passed]:h-4 md:group-data-[state=passed]:w-6 md:group-data-[state=passed]:h-6 
                            group-data-[state=passed]:border-teal-500/50 group-data-[state=passed]:bg-teal-900/20 group-data-[state=passed]:text-teal-500/50
                            
                            group-data-[state=active]:w-10 group-data-[state=active]:h-10 md:group-data-[state=active]:w-14 md:group-data-[state=active]:h-14 
                            group-data-[state=active]:border-teal-500 group-data-[state=active]:text-teal-400 group-data-[state=active]:shadow-[0_0_30px_rgba(20,184,166,0.4)] group-data-[state=active]:scale-110
                        ">
                        {/* Inner content of the node */}
                        <span className="
                                font-bold text-sm md:text-lg transition-all duration-300 delay-100
                                opacity-0 scale-0 absolute
                                group-data-[state=active]:opacity-100 group-data-[state=active]:scale-100
                                group-data-[state=passed]:opacity-100 group-data-[state=passed]:scale-75 group-data-[state=passed]:text-xs
                            ">
                          {index + 1}
                        </span>
                      </div>
                    </div>

                    {/* --- CONNECTOR LINE --- */}
                    <div className="active-connector absolute top-[20px] left-[48px] md:left-[72px] h-[2px] bg-gradient-to-r from-teal-500/0 via-teal-500 to-teal-500/0 
                                    w-0 group-data-[state=active]:w-[24px] md:group-data-[state=active]:w-[48px] transition-all duration-500 ease-out opacity-0 group-data-[state=active]:opacity-100" />

                    {/* --- CONTENT CARD --- */}
                    <div className="benefit-card will-change-transform origin-left relative">

                      {/* Watermark Number */}
                      <div className="absolute -top-12 -right-4 text-[120px] font-bold text-slate-800/10 pointer-events-none select-none z-0
                                      transition-all duration-700 ease-out translate-y-8 opacity-0 group-data-[state=active]:translate-y-0 group-data-[state=active]:opacity-100">
                        0{index + 1}
                      </div>

                      <div className="
                        p-6 md:p-8 rounded-3xl border transition-all duration-500 relative overflow-hidden z-10
                        bg-slate-900/40 backdrop-blur-sm border-slate-800/50 
                        group-data-[state=active]:bg-slate-900/80 group-data-[state=active]:border-teal-500/30 group-data-[state=active]:shadow-[0_20px_60px_-10px_rgba(20,184,166,0.1)]
                        hover:border-teal-500/20
                      ">
                        {/* Active Card Glow Gradient (Spotlight) */}
                        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-teal-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none opacity-0 transition-opacity duration-500 group-data-[state=active]:opacity-100" />
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-teal-500 to-transparent opacity-0 transition-opacity duration-500 group-data-[state=active]:opacity-100" />

                        <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-8 relative z-10">
                          {/* Icon Container with Glow */}
                          <div className="relative">
                            <div className="absolute inset-0 bg-teal-500/20 blur-xl rounded-full opacity-0 group-data-[state=active]:opacity-100 transition-opacity duration-500" />
                            <div className="
                                 relative flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center transition-all duration-500
                                 bg-slate-800/80 border border-slate-700 text-slate-500
                                 group-data-[state=active]:bg-gradient-to-br group-data-[state=active]:from-teal-500 group-data-[state=active]:to-teal-600 group-data-[state=active]:border-teal-400 group-data-[state=active]:text-white group-data-[state=active]:shadow-lg group-data-[state=active]:shadow-teal-500/20
                               ">
                              {/* Clone icon with larger size */}
                              {React.cloneElement(icons[index] as React.ReactElement, { className: "w-7 h-7 md:w-8 md:h-8" })}
                            </div>
                          </div>

                          <div className="pt-2">
                            <h3 className="text-xl md:text-3xl font-bold mb-3 md:mb-4 transition-colors duration-300 text-slate-300 group-data-[state=active]:text-white">
                              {item.title[lang]}
                            </h3>
                            <p className="text-slate-400 leading-relaxed text-base md:text-lg">
                              {item.description[lang]}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </section >
  );
};

export default Benefits;