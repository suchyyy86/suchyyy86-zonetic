import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Language } from '../types';
import { CONTENT } from '../constants';
import { motion } from 'framer-motion';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiAmazon,
  SiTailwindcss,
  SiFigma,
  SiMeta,
  SiPostgresql,
  SiDocker,
  SiOpenai
} from 'react-icons/si';

interface TechStackProps {
  lang: Language;
}

// Map text names from constants to icons
const ICON_MAP: Record<string, React.ElementType> = {
  'React': SiReact,
  'Next.js': SiNextdotjs,
  'TypeScript': SiTypescript,
  'Node.js': SiNodedotjs,
  'AWS': SiAmazon,
  'Tailwind': SiTailwindcss,
  'Figma': SiFigma,
  'Meta Business Suite': SiMeta,
  'PostgreSQL': SiPostgresql,
  'Docker': SiDocker
};

// Define network connections (who connects to whom)
const CONNECTIONS = [
  ['React', 'Next.js'],
  ['React', 'TypeScript'],
  ['React', 'Tailwind'],
  ['Next.js', 'Node.js'],
  ['Next.js', 'Tailwind'],
  ['Next.js', 'TypeScript'], // New: TS is core to Next.js
  ['Next.js', 'AWS'],        // New: Deployment target
  ['TypeScript', 'Node.js'],
  ['Node.js', 'PostgreSQL'],
  ['Node.js', 'Docker'],
  ['Node.js', 'AWS'],
  ['PostgreSQL', 'Docker'],
  ['AWS', 'Docker'],
  ['Figma', 'React'],
  ['Figma', 'Tailwind'],
  ['Figma', 'Meta Business Suite'], // New: Design -> Marketing
  ['Meta Business Suite', 'React']  // Integrations
];

// Orchestrated positions for "Constellation" look
const FIXED_POSITIONS: Record<string, { x: number, y: number }> = {
  'React': { x: 0.5, y: 0.45 },
  'Next.js': { x: 0.38, y: 0.35 },
  'TypeScript': { x: 0.62, y: 0.355 }, // slightly offset
  'Tailwind': { x: 0.5, y: 0.25 },
  'Node.js': { x: 0.5, y: 0.65 },
  'AWS': { x: 0.70, y: 0.70 },
  'PostgreSQL': { x: 0.35, y: 0.75 },
  'Docker': { x: 0.55, y: 0.82 },
  'Figma': { x: 0.25, y: 0.44 }, // slightly offset
  'Meta Business Suite': { x: 0.75, y: 0.46 } // slightly offset
};

// Mobile positions - spread out for narrow portrait layout
const MOBILE_POSITIONS: Record<string, { x: number, y: number }> = {
  'React': { x: 0.5, y: 0.33 },
  'Next.js': { x: 0.22, y: 0.22 },
  'TypeScript': { x: 0.78, y: 0.22 },
  'Tailwind': { x: 0.5, y: 0.11 },
  'Node.js': { x: 0.5, y: 0.55 },
  'AWS': { x: 0.80, y: 0.66 },
  'PostgreSQL': { x: 0.20, y: 0.66 },
  'Docker': { x: 0.5, y: 0.78 },
  'Figma': { x: 0.13, y: 0.44 },
  'Meta Business Suite': { x: 0.87, y: 0.45 } // slightly offset
};

interface Node {
  id: string;
  x: number;
  y: number;
  icon: React.ElementType;
}

const Technologies: React.FC<TechStackProps> = ({ lang }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Use refs for mouse position to avoid constant re-renders
  const mousePosRef = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef<number | null>(null);
  const nodesLayerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Initialize nodes
  useEffect(() => {
    const techList = CONTENT.techStack.technologies;
    const newNodes = techList.map((tech) => ({
      id: tech,
      x: 0.5,
      y: 0.5,
      icon: ICON_MAP[tech] || SiReact
    }));
    setNodes(newNodes);
  }, []);

  // Update dimensions
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Distribute nodes based on screen size
  useEffect(() => {
    if (dimensions.width === 0) return;

    const positions = isMobile ? MOBILE_POSITIONS : FIXED_POSITIONS;

    setNodes(prev => prev.map(node => ({
      ...node,
      x: positions[node.id]?.x ?? Math.random() * 0.8 + 0.1,
      y: positions[node.id]?.y ?? Math.random() * 0.8 + 0.1
    })));

  }, [dimensions.width, isMobile]);

  // Smooth parallax via direct DOM manipulation (no re-renders)
  const updateParallax = useCallback(() => {
    const mx = mousePosRef.current.x;
    const my = mousePosRef.current.y;

    // Update node positions via CSS custom properties
    if (nodesLayerRef.current) {
      const nodeElements = nodesLayerRef.current.querySelectorAll<HTMLElement>('[data-parallax-node]');
      nodeElements.forEach((el) => {
        el.style.transform = `translate(calc(-50% + ${mx * 20}px), calc(-50% + ${my * 20}px))`;
      });
    }

    // Update SVG lines via transform on the group
    if (svgRef.current) {
      const lineGroup = svgRef.current.querySelector<SVGGElement>('#lines-group');
      if (lineGroup) {
        const offsetX = mx * dimensions.width * 0.03;
        const offsetY = my * dimensions.height * 0.03;
        lineGroup.setAttribute('transform', `translate(${offsetX}, ${offsetY})`);
      }
    }

    animFrameRef.current = null;
  }, [dimensions]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current || isMobile) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    // Lerp for extra smoothness
    mousePosRef.current.x += (x - mousePosRef.current.x) * 0.3;
    mousePosRef.current.y += (y - mousePosRef.current.y) * 0.3;

    if (!animFrameRef.current) {
      animFrameRef.current = requestAnimationFrame(updateParallax);
    }
  }, [isMobile, updateParallax]);

  // Cleanup animation frame on unmount
  useEffect(() => {
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  // Handle node selection (mobile tap or desktop hover)
  const handleNodeInteraction = useCallback((nodeId: string) => {
    if (isMobile) {
      // Toggle on mobile
      setHoveredNode(prev => prev === nodeId ? null : nodeId);
    } else {
      setHoveredNode(nodeId);
    }
  }, [isMobile]);

  const handleNodeLeave = useCallback(() => {
    if (!isMobile) {
      setHoveredNode(null);
    }
  }, [isMobile]);

  // Clear selection when tapping background on mobile
  const handleBackgroundTap = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isMobile) return;
    // Only clear if we tapped the container itself, not a node
    if (e.target === e.currentTarget || (e.target as HTMLElement).closest('[data-parallax-node]') === null) {
      setHoveredNode(null);
    }
  }, [isMobile]);

  return (
    <section
      className="relative py-20 md:py-32 bg-slate-950 overflow-hidden min-h-[600px] md:min-h-[900px] flex flex-col items-center justify-center perspective-[1000px]"
      onMouseMove={handleMouseMove}
    >
      {/* --- Dynamic Background Layer --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Deep Space Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black" />

        {/* Grid Floor Effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(20,184,166,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)] opacity-40 transform perspective-500 rotate-x-10 scale-150" />

        {/* Floating Particles/Stars */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute rounded-full bg-white"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              opacity: Math.random() * 0.5 + 0.2,
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{
              y: [null, Math.random() * -20 + "%"],
              opacity: [null, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              width: Math.random() * 2 + 1 + "px",
              height: Math.random() * 2 + 1 + "px",
            }}
          />
        ))}

        {/* Ambient Color Orbs */}
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, 30, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ x: [0, -50, 0], y: [0, -30, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px]"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col items-center">

        {/* Header */}
        <div className="text-center mb-10 md:mb-16 relative z-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400"
          >
            {CONTENT.techStack.headline[lang]}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8"
          >
            {CONTENT.techStack.subheadline[lang]}
          </motion.p>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            className="h-1 bg-gradient-to-r from-transparent via-teal-500 to-transparent mx-auto rounded-full"
          />
        </div>

        {/* Connectivity Graph Container */}
        <div
          ref={containerRef}
          className="relative w-full max-w-5xl aspect-[1/2] sm:aspect-square md:aspect-[16/9]"
          onClick={handleBackgroundTap}
        >
          {/* SVG Connections Layer */}
          <svg ref={svgRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
            <defs>
              <linearGradient id="line-gradient-base" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(20, 184, 166, 0.3)" />
                <stop offset="50%" stopColor="rgba(20, 184, 166, 0.6)" />
                <stop offset="100%" stopColor="rgba(20, 184, 166, 0.3)" />
              </linearGradient>
              <linearGradient id="line-gradient-active" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(20, 184, 166, 0.5)" />
                <stop offset="50%" stopColor="rgba(20, 184, 166, 1)" />
                <stop offset="100%" stopColor="rgba(20, 184, 166, 0.5)" />
              </linearGradient>
            </defs>
            <g
              id="lines-group"
              style={{ transition: 'transform 0.15s ease-out' }}
            >
              {CONNECTIONS.map(([idA, idB], i) => {
                const nodeA = nodes.find(n => n.id === idA);
                const nodeB = nodes.find(n => n.id === idB);

                if (!nodeA || !nodeB) return null;

                const x1 = nodeA.x * 100 + '%';
                const y1 = nodeA.y * 100 + '%';
                const x2 = nodeB.x * 100 + '%';
                const y2 = nodeB.y * 100 + '%';

                const isConnectedToHover = hoveredNode && (hoveredNode === idA || hoveredNode === idB);
                const isDimmed = hoveredNode && !isConnectedToHover;

                return (
                  <g key={`${idA}-${idB}`}>
                    {/* Base Line — always visible, solid */}
                    <line
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke={isConnectedToHover ? "url(#line-gradient-active)" : "url(#line-gradient-base)"}
                      strokeWidth={isConnectedToHover ? 3 : 2}
                      opacity={isDimmed ? 0.1 : (isConnectedToHover ? 1 : 0.6)}
                      style={{
                        transition: 'opacity 0.4s ease, stroke-width 0.4s ease',
                        filter: isConnectedToHover ? 'drop-shadow(0 0 4px rgba(20, 184, 166, 0.4))' : 'none'
                      }}
                    />
                    {/* Data Packet Animation (on hover or ambient) */}
                    {(isConnectedToHover || (!hoveredNode && i % 2 === 0)) && dimensions.width > 0 && (
                      <circle r="2" fill="#14b8a6" opacity={isConnectedToHover ? 0.9 : 0.4}>
                        <animateMotion
                          dur={`${2 + (i % 3)}s`}
                          repeatCount="indefinite"
                          path={`M${nodeA.x * dimensions.width},${nodeA.y * dimensions.height} L${nodeB.x * dimensions.width},${nodeB.y * dimensions.height}`}
                        />
                      </circle>
                    )}
                  </g>
                );
              })}
            </g>
          </svg>

          {/* Nodes Layer */}
          <div
            ref={nodesLayerRef}
            className="absolute inset-0 z-10 pointer-events-none"
          >
            {nodes.map((node, i) => {
              const isHovered = hoveredNode === node.id;
              const isConnected = hoveredNode && CONNECTIONS.some(c =>
                (c[0] === hoveredNode && c[1] === node.id) ||
                (c[1] === hoveredNode && c[0] === node.id)
              );
              const isDimmed = hoveredNode && !isHovered && !isConnected;

              // Stable floating animation parameters (seeded by index, not random per render)
              const floatDuration = 4 + (i * 0.7) % 4;
              const floatDelay = (i * 0.3) % 2;

              return (
                <div
                  key={node.id}
                  data-parallax-node
                  className="absolute pointer-events-auto"
                  style={{
                    left: `${node.x * 100}%`,
                    top: `${node.y * 100}%`,
                    transform: 'translate(-50%, -50%)',
                    transition: 'transform 0.15s ease-out',
                    willChange: 'transform',
                  }}
                >
                  {/* Floating Bobbing Animation Wrapper */}
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                      duration: floatDuration,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: floatDelay
                    }}
                  >
                    <div
                      className="relative group flex flex-col items-center justify-center cursor-pointer"
                      onMouseEnter={() => !isMobile && handleNodeInteraction(node.id)}
                      onMouseLeave={() => !isMobile && handleNodeLeave()}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isMobile) handleNodeInteraction(node.id);
                      }}
                    >
                      {/* Glow Behind */}
                      <div className={`
                        absolute inset-0 rounded-full bg-teal-500/20 blur-xl transition-all duration-500
                        ${isHovered ? 'opacity-100 scale-150' : 'opacity-0 scale-50'}
                      `} />

                      {/* Icon Circle */}
                      <motion.div
                        className={`
                          relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center
                          backdrop-blur-md border transition-all duration-500
                          ${isHovered || isConnected
                            ? 'bg-slate-800/80 border-teal-500/50 shadow-[0_0_30px_rgba(20,184,166,0.3)]'
                            : 'bg-slate-900/40 border-slate-700/30 hover:border-teal-500/30'}
                          ${isDimmed ? 'opacity-20 grayscale' : 'opacity-100'}
                        `}
                        whileHover={!isMobile ? { scale: 1.1, rotate: 5 } : undefined}
                        whileTap={{ scale: 0.95 }}
                      >
                        <node.icon className={`
                          w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 transition-all duration-500
                          ${isHovered || isConnected ? 'text-teal-400 drop-shadow-[0_0_10px_rgba(20,184,166,0.5)]' : 'text-slate-400 group-hover:text-slate-200'}
                        `} />

                        {/* Corner Accents */}
                        <div className={`absolute top-0 left-0 w-2 h-2 border-t border-l border-teal-500/50 rounded-tl-lg transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
                        <div className={`absolute bottom-0 right-0 w-2 h-2 border-b border-r border-teal-500/50 rounded-br-lg transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
                      </motion.div>

                      {/* Label - shown on tap (mobile) or hover (desktop) */}
                      <div className={`
                        absolute top-[110%] whitespace-nowrap px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg
                        bg-slate-900/90 border border-slate-700/50 backdrop-blur-sm
                        text-[10px] sm:text-xs md:text-sm font-medium text-slate-200 shadow-xl
                        transform transition-all duration-300 z-30
                        ${isHovered
                          ? 'opacity-100 translate-y-0 scale-100'
                          : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'
                        }
                      `}>
                        {node.id}
                        {/* Little triangle arrow */}
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 border-t border-l border-slate-700/50 transform rotate-45" />
                      </div>

                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technologies;