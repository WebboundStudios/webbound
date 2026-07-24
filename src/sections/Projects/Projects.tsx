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

  const imageRefs = useRef<Record<string, HTMLImageElement | null>>({});
  const heroImageContainerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const detailScrollRef = useRef<HTMLDivElement | null>(null);
  
  const flipStateRef = useRef<any>(null);
  const activeProjectIdRef = useRef<string | null>(null);
  const actionRef = useRef<'open' | 'close' | null>(null);

  // Step 1 & 2: Initiate Open Project Transition
  const handleOpenProject = (project: ProjectItem) => {
    if (loaderStatus !== 'idle') return;

    activeProjectIdRef.current = project.id;
    actionRef.current = 'open';

    // Step 1: Capture initial image state using GSAP Flip
    const imgEl = imageRefs.current[project.id];
    if (imgEl) {
      flipStateRef.current = Flip.getState(imgEl, {
        props: 'borderRadius,transform,objectFit',
      });
    }

    // Step 2: Pause Lenis smooth scroll & trigger Staircase Loader
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('webbound:scroll-lock', { detail: { open: true } }));
    }

    setSelectedProject(project);
    setLoaderStatus('entering');
  };

  // Initiate Close Project Transition
  const handleCloseProject = () => {
    if (loaderStatus !== 'idle' || !selectedProject) return;

    actionRef.current = 'close';

    // Reset detail scroll container to top before capturing state
    if (detailScrollRef.current) {
      detailScrollRef.current.scrollTo({ top: 0, behavior: 'instant' });
    }

    // Capture image state in detail hero position
    const imgEl = imageRefs.current[selectedProject.id];
    if (imgEl) {
      flipStateRef.current = Flip.getState(imgEl, {
        props: 'borderRadius,transform,objectFit',
      });
    }

    setLoaderStatus('entering');
  };

  // Step 3 & 4: Triggered when Staircase Loader fully covers the screen
  const handleStaircaseEnterComplete = () => {
    if (actionRef.current === 'open' && selectedProject) {
      // Step 3: Show Project Detail View layout overlay while covered
      setIsDetailVisible(true);

      // Step 4: Perform GSAP Flip animation on same image element
      requestAnimationFrame(() => {
        const imgEl = imageRefs.current[selectedProject.id];
        if (imgEl && flipStateRef.current) {
          Flip.from(flipStateRef.current, {
            duration: 0.85,
            ease: 'power3.inOut',
            absolute: true,
            onComplete: () => {
              // Step 6: Reveal staggered detail content
              if (contentRef.current) {
                const animItems = contentRef.current.querySelectorAll('.detail-anim-item');
                gsap.fromTo(
                  animItems,
                  { opacity: 0, y: 40 },
                  {
                    opacity: 1,
                    y: 0,
                    stagger: 0.08,
                    duration: 0.65,
                    ease: 'power3.out',
                  }
                );
              }
            },
          });
        }

        // Step 5: Remove/Exit Staircase Loader to reveal expanded detail view
        setLoaderStatus('exiting');
      });
    } else if (actionRef.current === 'close') {
      const closingId = selectedProject?.id;

      // Switch back to Grid view layout while covered
      setIsDetailVisible(false);
      setSelectedProject(null);

      requestAnimationFrame(() => {
        if (closingId) {
          const imgEl = imageRefs.current[closingId];
          if (imgEl && flipStateRef.current) {
            Flip.from(flipStateRef.current, {
              duration: 0.8,
              ease: 'power3.inOut',
              absolute: true,
            });
          }
        }

        // Resume Lenis smooth scroll on main page
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

  // Helper renderer for single featured image element
  const renderProjectImage = (project: ProjectItem) => (
    <img
      key={project.id}
      ref={(el) => {
        imageRefs.current[project.id] = el;
      }}
      data-flip-id={project.id}
      src={project.image}
      alt={project.title}
      className="w-full h-full object-cover object-top select-none"
    />
  );

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
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
                data-cursor="View"
              >
                {/* Visual Column (7 Cols) */}
                <div className={`lg:col-span-7 ${idx % 2 === 1 ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div
                    onClick={() => handleOpenProject(project)}
                    className="block relative w-full aspect-[16/10] rounded-2xl bg-[#0A0A0A] border border-white/[0.08] overflow-hidden shadow-2xl cursor-pointer group"
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
                    <div className="relative w-full h-[calc(100%-2rem)] overflow-hidden">
                      {/* Shared single image (rendered here when not in detail view) */}
                      {!isDetailVisible || selectedProject?.id !== project.id
                        ? renderProjectImage(project)
                        : null}

                      {/* Top category badge */}
                      <div className="absolute top-3 left-3 z-10">
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
          imageElement={renderProjectImage(selectedProject)}
        />
      )}
    </section>
  );
};
