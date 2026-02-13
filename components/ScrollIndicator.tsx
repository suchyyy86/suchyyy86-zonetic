import React, { useEffect, useRef } from 'react';

const ScrollIndicator: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const arrowPathRef = useRef<SVGPathElement>(null);
    const glowPathRef = useRef<SVGPathElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        const arrowPath = arrowPathRef.current;
        const glowPath = glowPathRef.current;

        if (!container || !arrowPath || !glowPath) return;

        const pathLength = arrowPath.getTotalLength();

        // Initialize both paths hidden
        arrowPath.style.strokeDasharray = `${pathLength}`;
        arrowPath.style.strokeDashoffset = `${pathLength}`;
        glowPath.style.strokeDasharray = `${pathLength}`;
        glowPath.style.strokeDashoffset = `${pathLength}`;

        // Use IntersectionObserver to detect when arrow is well into viewport
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Animate both paths together
                        setTimeout(() => {
                            if (arrowPath && glowPath) {
                                const transition = 'stroke-dashoffset 0.9s cubic-bezier(0.33, 1, 0.68, 1)';
                                arrowPath.style.transition = transition;
                                glowPath.style.transition = transition;
                                arrowPath.style.strokeDashoffset = '0';
                                glowPath.style.strokeDashoffset = '0';
                            }
                        }, 800);
                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.5 }
        );

        observer.observe(container);

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={containerRef} className="w-full h-[22rem] sm:h-[26rem] relative mt-24 opacity-90 pointer-events-none">
            <svg
                className="w-full h-full overflow-visible"
                viewBox="0 0 300 260"
                preserveAspectRatio="none"
            >
                <defs>
                    <filter id="arrowGlow" x="-100%" y="-100%" width="300%" height="300%">
                        <feGaussianBlur stdDeviation="8" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Ghost trace */}
                <path
                    d="M 40,50 C 50,90 70,130 110,160 C 150,190 190,210 230,210 L 210,195 L 230,210 L 210,225"
                    fill="none"
                    stroke="#14b8a6"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="opacity-10"
                />

                {/* Glow layer - synced with main arrow animation */}
                <path
                    ref={glowPathRef}
                    d="M 40,50 C 50,90 70,130 110,160 C 150,190 190,210 230,210 L 210,195 L 230,210 L 210,225"
                    fill="none"
                    stroke="#14b8a6"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="opacity-60"
                    style={{
                        filter: 'blur(8px)'
                    }}
                />

                {/* Main animated arrow */}
                <path
                    ref={arrowPathRef}
                    d="M 40,50 C 50,90 70,130 110,160 C 150,190 190,210 230,210 L 210,195 L 230,210 L 210,225"
                    fill="none"
                    stroke="#14b8a6"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#arrowGlow)"
                />
            </svg>
        </div>
    );
};

export default ScrollIndicator;
