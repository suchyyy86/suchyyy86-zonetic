import React, { useEffect, useRef } from 'react';
import { Language } from '../types';
import { CONTENT } from '../constants';
import Button from './Button';
import { ArrowRight, ChevronDown } from 'lucide-react';

interface HeroProps {
  lang: Language;
}

const Hero: React.FC<HeroProps> = ({ lang }) => {
  const containerRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null); // For scroll scaling (affects everything)
  const contentRef = useRef<HTMLDivElement>(null); // For mouse parallax (affects text only)
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized mouse position (-1 to 1)
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const updateParallax = () => {
      // Smooth interpolation (Lerp) for mouse movement
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Calculate scroll progress (0 to 1) for the hero section
      const scrollProgress = Math.min(scrollY / windowHeight, 1);

      // Effects based on scroll
      const scaleValue = 1 - (scrollProgress * 0.15); // Recedes to 85% size
      const blurValue = scrollProgress * 10; // Blurs up to 10px
      const opacityValue = 1 - (scrollProgress * 0.3); // Fades slightly

      // Apply Global Hero Container transformations (The "Go Backwards" & "Blur" effect)
      if (containerRef.current) {
        containerRef.current.style.filter = `blur(${blurValue}px)`;
        containerRef.current.style.opacity = `${opacityValue}`;
      }

      // 1. Wrapper (Scroll Scale & Translate) - Affects BOTH Text and Buttons
      if (wrapperRef.current) {
        wrapperRef.current.style.transform = `
          scale(${scaleValue})
          translateY(${scrollY * -0.1}px)
        `;
      }

      // 2. Content Tilt (Mouse Parallax) - Affects ONLY Text
      if (contentRef.current) {
        contentRef.current.style.transform = `
          perspective(1000px)
          rotateX(${currentY * -4}deg)
          rotateY(${currentX * 4}deg)
        `;
      }

      // 3. Blob 1 (Teal) - Reduced movement from 120 to 60
      if (blob1Ref.current) {
        blob1Ref.current.style.transform = `
          translate3d(${currentX * -60}px, ${currentY * -60}px, 0)
          translateY(${scrollY * 0.2}px)
        `;
      }

      // 4. Blob 2 (Indigo) - Reduced movement from 180 to 90
      if (blob2Ref.current) {
        blob2Ref.current.style.transform = `
          translate3d(${currentX * 90}px, ${currentY * 90}px, 0)
          translateY(${scrollY * 0.1}px)
        `;
      }

      // 5. Grid - 3D Plane rotation + Scroll Scale - Reduced rotation from 20 to 10
      if (gridRef.current) {
        gridRef.current.style.transform = `
          perspective(1000px)
          scale(${2 * scaleValue}) 
          rotateX(${60 + currentY * 10}deg)
          rotateY(${currentX * 10}deg)
          translateY(${scrollY * 0.1}px)
        `;
      }

      animationFrameId = requestAnimationFrame(updateParallax);
    };

    window.addEventListener('mousemove', handleMouseMove);
    updateParallax();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-screen flex items-center justify-center overflow-hidden bg-slate-950 z-0"
    >
      {/* 3D Background Space */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">

        {/* Dynamic Grid Floor - Increased opacity from 0.07 to 0.15 */}
        <div
          ref={gridRef}
          className="absolute inset-[-100%] origin-center bg-[linear-gradient(rgba(20,184,166,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.15)_1px,transparent_1px)] bg-[size:60px_60px]"
          style={{ transform: 'perspective(1000px) rotateX(60deg) scale(2)' }}
        ></div>

        {/* Floating Light Blobs - Increased opacity from 60/50 to 80/70 */}
        <div
          ref={blob1Ref}
          className="absolute top-[10%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-teal-500/30 blur-[100px] mix-blend-screen opacity-80"
        ></div>

        <div
          ref={blob2Ref}
          className="absolute bottom-[10%] right-[20%] w-[35vw] h-[35vw] rounded-full bg-indigo-600/30 blur-[100px] mix-blend-screen opacity-70"
        ></div>

        {/* Vignette & Texture */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_100%)]"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay"></div>
      </div>

      {/* Main Content Layer */}
      <div
        ref={wrapperRef}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full transition-transform duration-75 ease-out will-change-transform"
      >
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">

          {/* Inner Text Wrapper for Mouse Parallax */}
          <div ref={contentRef} className="flex flex-col items-center w-full">


            {/* Headline */}
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-extrabold text-white tracking-tight leading-[1.1] mb-8 drop-shadow-2xl">
              {CONTENT.hero.headlineStart[lang]} <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-teal-200 to-teal-400 animate-gradient bg-[length:200%_auto] text-glow">
                {CONTENT.hero.headlineAccent[lang]}
              </span>{' '}
              {CONTENT.hero.headlineEnd[lang]}
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-slate-300/80 max-w-2xl leading-relaxed mb-10 drop-shadow-lg">
              {CONTENT.hero.subheadline[lang]}
            </p>
          </div>

          {/* CTA Group - STATIC (Outside contentRef but inside wrapperRef) */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="group relative overflow-hidden">
              <span className="relative z-10 flex items-center">
                {CONTENT.hero.cta[lang]}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Button>
            <Button variant="outline" onClick={() => {
              window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
            }} className="backdrop-blur-sm bg-slate-950/30 border-teal-500/50 hover:bg-teal-500/10">
              {CONTENT.hero.ctaSecondary[lang]}
            </Button>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-slate-500 animate-bounce cursor-pointer z-20"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <ChevronDown size={32} className="opacity-70 hover:opacity-100 transition-opacity" />
      </div>

      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 8s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;