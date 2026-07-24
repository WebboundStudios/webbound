'use client';

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import { PROJECTS } from '@/constants/data';
import { ProjectItem } from '@/types';
import { TextReveal } from '@/components/animations/TextReveal';
import { ArrowUpRight, Eye } from 'lucide-react';
import { MagneticButton } from '@/components/animations/MagneticButton';
import { TextRoll } from '@/components/animations/TextRoll';
import { StaircaseLoader } from '@/components/animations/StaircaseLoader';
import { ProjectDetail } from '@/components/projects/ProjectDetail';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(Flip);
}

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isDetailVisible, setIsDetailVisible] = useState<boolean>(false);
  const [loaderStatus, setLoaderStatus] = useState<'idle' | 'entering' | 'exiting'>('idle');

  const cardImageParentRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const imageDivRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const heroImageContainerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const detailScrollRef = useRef<HTMLDivElement | null>(null);
  
  const flipStateRef = useRef<any>(null);
  const actionRef = useRef<'open' | 'close' | null>(null);

  // Initiate Open Project Transition
  const handleOpenProject = (project: ProjectItem) => {
    if (isDetailVisible || loaderStatus !== 'idle') return;

    actionRef.current = 'open';
    const imgDiv = imageDivRefs.current[project.id];
    if (!imgDiv) return;

    // Step 1: Capture initial image state using GSAP Flip
    flipStateRef.current = Flip.getState(imgDiv, {
      props: 'borderRadius,transform,objectFit',
    });

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('webbound:scroll-lock', { detail: { open: true } }));
    }

    setSelectedProject(project);
    setIsDetailVisible(true);
    setLoaderStatus('entering');
  };

  // Initiate Close Project Transition
  const handleCloseProject = () => {
    if (loaderStatus !== 'idle' || !selectedProject) return;

    actionRef.current = 'close';
    const closingId = selectedProject.id;
    const imgDiv = imageDivRefs.current[closingId];

    if (detailScrollRef.current) {
      detailScrollRef.current.scrollTo({ top: 0, behavior: 'instant' });
    }

    if (imgDiv) {
      flipStateRef.current = Flip.getState(imgDiv, {
        props: 'borderRadius,transform,objectFit',
      });
    }

    if (contentRef.current) {
      const animItems = contentRef.current.querySelectorAll('.detail-anim-item');
      gsap.to(animItems, {
        autoAlpha: 0,
        y: 40,
        stagger: 0.03,
        duration: 0.3,
        ease: 'power2.in',
      });
    }

    setLoaderStatus('entering');
  };

  // Triggered when Staircase Loader fully covers the screen
  const handleStaircaseEnterComplete = () => {
    if (actionRef.current === 'open' && selectedProject) {
      requestAnimationFrame(() => {
        const imgDiv = imageDivRefs.current[selectedProject.id];
        const heroTarget = heroImageContainerRef.current;

        if (heroTarget && imgDiv && flipStateRef.current) {
          // Re-parent DOM element into detail hero container while covered
          heroTarget.appendChild(imgDiv);

          // Perform Flip morphing transition as panels retract
          Flip.from(flipStateRef.current, {
            duration: 1.0,
            ease: 'power3.inOut',
            absolute: true,
            scale: true,
            onComplete: () => {
              // Reveal detail text items with expo.out after panels retract
              if (contentRef.current) {
                const animItems = contentRef.current.querySelectorAll('.detail-anim-item');
                gsap.fromTo(
                  animItems,
                  { autoAlpha: 0, y: 40 },
                  {
                    autoAlpha: 1,
                    y: 0,
                    stagger: 0.05,
                    duration: 1.2,
                    ease: 'expo.out',
                  }
                );
              }
            },
          });
        }

        setLoaderStatus('exiting');
      });
    } else if (actionRef.current === 'close' && selectedProject) {
      const closingId = selectedProject.id;
      const imgDiv = imageDivRefs.current[closingId];
      const originalParent = cardImageParentRefs.current[closingId];

      requestAnimationFrame(() => {
        if (imgDiv && originalParent && flipStateRef.current) {
          // Move DOM element back to card container while covered
          originalParent.appendChild(imgDiv);

          // Perform Flip morph back as panels retract
          Flip.from(flipStateRef.current, {
            duration: 1.0,
            ease: 'power3.inOut',
            absolute: true,
            scale: true,
          });
        }

        setIsDetailVisible(false);
        setSelectedProject(null);

        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('webbound:scroll-lock', { detail: { open: false } }));
        }

        setLoaderStatus('exiting');
      });
    }
  };

  const handleStaircaseExitComplete = () => {
    setLoaderStatus('idle');
    actionRef.current = null;
  };

  return (
    <section
      id="projects"
      data-theme-bg="#0A0A0A"
      className="relative bg-[#0A0A0A] text-white transition-colors duration-500 min-h-screen"
    >
      {/* Staircase Loader Transition Overlay */}
      <StaircaseLoader
        status={loaderStatus}
        onEnterComplete={handleStaircaseEnterComplete}
        onExitComplete={handleStaircaseExitComplete}
      />

      {/* View 1: Projects Grid View */}
      <div className="py-36 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto relative z-10 space-y-20">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <div className="flex flex-col space-y-3">
              <div className="flex items-center gap-4">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#C5F52A]/70">
                  Selected work
                </span>
              </div>
              <TextReveal
                as="h2"
                className="font-section-heading text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight max-w-3xl"
              >
                Crafted For Digital Dominance &amp; Market Authority.
              </TextReveal>
            </div>

            <a href="#contact" className="shrink-0">
              <MagneticButton variant="primary" size="md">
                <TextRoll center>Request Portfolio</TextRoll>
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </MagneticButton>
            </a>
          </div>

          {/* Project Cards Grid */}
          <div className="space-y-24">
            {PROJECTS.map((project, idx) => (
              <div
                key={project.id}
                onClick={() => handleOpenProject(project)}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center cursor-pointer group select-none"
                data-cursor="View"
              >
                {/* Visual Column (7 Cols) */}
                <div className={`lg:col-span-7 ${idx % 2 === 1 ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div
                    className="block relative w-full aspect-[16/10] rounded-2xl bg-[#0A0A0A] border border-white/[0.08] overflow-hidden shadow-2xl group"
                    data-cursor="View"
                  >
                    {/* Browser chrome bar */}
                    <div className="h-8 bg-[#141414] border-b border-white/[0.06] px-4 flex items-center justify-between z-10 relative">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                      </div>
                      <span className="font-mono text-[10px] text-[#9CA3AF] truncate max-w-[200px]">
                        {project.client}
                      </span>
                      <span className="font-mono text-[10px] text-[#C5F52A] font-semibold">
                        {project.year}
                      </span>
                    </div>

                    {/* Screenshot Container & Hover "View" Button */}
                    <div
                      ref={(el) => {
                        cardImageParentRefs.current[project.id] = el;
                      }}
                      className="relative w-full h-[calc(100%-2rem)] overflow-hidden"
                    >
                      {/* Physical DOM Image DIV element */}
                      <div
                        ref={(el) => {
                          imageDivRefs.current[project.id] = el;
                        }}
                        className="project-img w-full h-full relative overflow-hidden rounded-xl"
                      >
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover object-top select-none"
                        />
                      </div>

                      {/* Top category badge */}
                      <div className="absolute top-3 left-3 z-10 pointer-events-none">
                        <span className="px-3 py-1 rounded-full bg-[#0A0A0A]/85 backdrop-blur-md border border-white/10 text-[#C5F52A] font-mono text-xs font-semibold shadow-lg">
                          {project.category}
                        </span>
                      </div>

                      {/* Cinematic Hover "View" Button Overlay */}
                      <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#0A0A0A]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenProject(project);
                          }}
                          className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out px-6 py-3 rounded-full bg-[#C5F52A] text-[#0A0A0A] font-mono text-xs font-bold uppercase tracking-widest shadow-2xl inline-flex items-center gap-2 active:scale-95 cursor-pointer"
                        >
                          <Eye className="w-4 h-4" />
                          <span>View Case Study</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Info Column (5 Cols) */}
                <div
                  className={`lg:col-span-5 space-y-5 ${idx % 2 === 1 ? 'lg:order-1' : 'lg:order-2'}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-[#C5F52A] tracking-widest uppercase">
                      0{idx + 1}
                    </span>
                    <span className="h-px w-8 bg-[#C5F52A]/40" />
                    <span className="font-mono text-xs text-white/30 uppercase tracking-widest">
                      Case Study
                    </span>
                  </div>

                  <h3
                    onClick={() => handleOpenProject(project)}
                    className="font-section-heading text-3xl md:text-4xl font-bold text-white hover:text-[#C5F52A] transition-colors duration-300 cursor-pointer"
                  >
                    {project.title}
                  </h3>

                  <p className="font-body-ui text-base text-[#9CA3AF] font-light leading-relaxed">
                    {project.description}
                  </p>

                  {/* Impact callout */}
                  <div className="flex items-center gap-3">
                    <span className="h-px w-4 bg-[#C5F52A]/50" />
                    <span className="font-body-ui text-sm font-semibold text-[#C5F52A]">
                      {project.impact}
                    </span>
                  </div>

                  {/* Tech tags */}
                  <p className="text-xs font-mono text-white/30">
                    {project.tags.join('  ·  ')}
                  </p>

                  <div className="flex items-center gap-4 pt-2">
                    <button
                      onClick={() => handleOpenProject(project)}
                      className="inline-flex items-center gap-2 text-sm font-semibold font-body-ui text-[#C5F52A] hover:underline cursor-pointer"
                    >
                      <TextRoll center>Expand Presentation</TextRoll>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* View 2: Full-Viewport Project Detail View */}
      {isDetailVisible && selectedProject && (
        <ProjectDetail
          project={selectedProject}
          onClose={handleCloseProject}
          heroImageContainerRef={heroImageContainerRef}
          contentRef={contentRef}
          detailScrollRef={detailScrollRef}
        />
      )}
    </section>
  );
};
