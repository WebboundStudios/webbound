'use client';

import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import { PROJECTS } from '@/constants/data';
import { ProjectItem } from '@/types';
import { ArrowUpRight } from 'lucide-react';
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
  const [activeSlides, setActiveSlides] = useState<Record<string, number>>({});
  const [hoveredProjects, setHoveredProjects] = useState<Record<string, boolean>>({});

  const sectionRef = useRef<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState<boolean>(false);
  const cardImageParentRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const imageDivRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const heroImageContainerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const detailScrollRef = useRef<HTMLDivElement | null>(null);
  
  const flipStateRef = useRef<Flip.FlipState | null>(null);
  const actionRef = useRef<'open' | 'close' | null>(null);

  // Track if projects section is in viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: '100px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Auto-advance slideshow only when section is visible and card is not hovered
  useEffect(() => {
    if (!isInView) return;

    const timer = setInterval(() => {
      setActiveSlides((prev) => {
        const updated = { ...prev };
        PROJECTS.forEach((p) => {
          if (!hoveredProjects[p.id]) {
            const imgs = p.images && p.images.length > 0 ? p.images : [p.image];
            const curr = updated[p.id] || 0;
            updated[p.id] = (curr + 1) % imgs.length;
          }
        });
        return updated;
      });
    }, 2200);

    return () => clearInterval(timer);
  }, [isInView, hoveredProjects]);

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
            ease: 'expo.inOut',
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
            ease: 'expo.inOut',
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
      ref={sectionRef}
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
              <div className="flex items-center gap-3">
                <span className="inline-block w-2 h-2 rounded-full bg-[#C5F52A] animate-pulse" />
                <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/70">
                  Selected work
                </span>
              </div>
              <h2 className="font-section-heading text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-[-0.035em] leading-[1.05] max-w-xl">
                Design in the real world <span className="inline-block text-[#C5F52A] font-light">↗</span>
              </h2>
              <p className="font-body-ui text-base sm:text-lg text-[#9CA3AF] font-light leading-relaxed max-w-lg">
                Brand, digital engineering, and headless CMS platforms handled by one team — built so the work scales up as your business does, instead of being rebuilt.
              </p>
            </div>

            <a href="#contact" className="shrink-0 pt-2">
              <MagneticButton variant="primary" size="md">
                <TextRoll center>Request Portfolio</TextRoll>
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </MagneticButton>
            </a>
          </div>

          {/* Project Cards - Asymmetric Editorial Flow */}
          <div className="space-y-28 md:space-y-36">
            {PROJECTS.map((project, idx) => {
              const isEven = idx % 2 === 0;
              const projectImages = project.images && project.images.length > 0 ? project.images : [project.image];
              const currentSlide = activeSlides[project.id] || 0;

              return (
                <div
                  key={project.id}
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center`}
                >
                  {/* Visual Card Column (7 Cols) */}
                  <div className={`lg:col-span-7 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div
                      onClick={() => handleOpenProject(project)}
                      onMouseEnter={() => setHoveredProjects((prev) => ({ ...prev, [project.id]: true }))}
                      onMouseLeave={() => setHoveredProjects((prev) => ({ ...prev, [project.id]: false }))}
                      className="relative w-full group cursor-pointer select-none"
                      data-cursor="View"
                    >
                      {/* Top Shelf: Houses the crest on left and pill tags in the cutout notch on right */}
                      <div className="flex items-end justify-between w-full h-[44px] relative z-10">
                        {/* Left Crest of the Card */}
                        <div className="h-full w-[48%] sm:w-[54%] md:w-[58%] bg-[#151515] rounded-tl-[24px] sm:rounded-tl-[28px] border-t border-l border-white/10 relative flex items-center px-4 sm:px-5">
                          <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#C5F52A]">
                            0{idx + 1} &bull; STUDIO CASE
                          </span>

                          {/* Seamless S-Curve Connector: Curves down from crest to shelf with continuous 1px border and flush fill */}
                          <svg
                            className="absolute -right-[31px] top-0 w-[32px] h-[44px] pointer-events-none z-20"
                            viewBox="0 0 32 44"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            {/* Opaque background fill to seal the corner flawlessly */}
                            <path
                              d="M -1 0 C 8 0, 16 10, 16 22 C 16 34, 24 44, 32 44 V 45 H -1 Z"
                              fill="#151515"
                            />
                            {/* 1px smooth border stroke following the S-curve */}
                            <path
                              d="M 0 0.5 C 8 0.5, 16 10, 16 22 C 16 34, 24 43.5, 32 43.5"
                              stroke="rgba(255, 255, 255, 0.1)"
                              strokeWidth="1"
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>

                        {/* Top-Right Cutout Notch Shelf: Pill tags sit directly in this recessed area */}
                        <div className="h-full flex items-center justify-end gap-2 pb-1.5 pr-1">
                          {project.tags.slice(0, 2).map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-3 sm:px-3.5 py-1 rounded-full bg-[#1A1A1A] hover:bg-[#222222] border border-white/15 text-white/90 font-mono text-[10px] sm:text-[11px] font-medium tracking-wide shadow-sm transition-colors"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Main Card Body with Inverted Notch Silhouette */}
                      <div className="relative w-full -mt-px aspect-[16/10.5] sm:aspect-[16/9.5] rounded-bl-[24px] sm:rounded-bl-[28px] rounded-br-[24px] sm:rounded-br-[28px] rounded-tr-[24px] sm:rounded-tr-[28px] bg-[#151515] border border-white/10 overflow-hidden shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-white/20 group-hover:shadow-[0_25px_60px_rgba(0,0,0,0.7)]">
                        {/* Physical DOM Image Parent for GSAP Flip */}
                        <div
                          ref={(el) => {
                            cardImageParentRefs.current[project.id] = el;
                          }}
                          className="relative w-full h-full p-2.5 sm:p-3"
                        >
                          <div
                            ref={(el) => {
                              imageDivRefs.current[project.id] = el;
                            }}
                            className="project-img w-full h-full relative overflow-hidden rounded-[18px] sm:rounded-[22px] bg-[#0A0A0A] border border-white/5"
                          >
                            {/* Slideshow Image Stack */}
                            {projectImages.map((imgSrc, imgIdx) => (
                              <img
                                key={imgIdx}
                                src={imgSrc}
                                alt={`${project.title} - Showcase view ${imgIdx + 1}`}
                                className={`absolute inset-0 w-full h-full object-cover object-center select-none transform transition-all duration-400 ease-out ${
                                  imgIdx === currentSlide
                                    ? 'opacity-100 scale-100 z-10 group-hover:scale-105'
                                    : 'opacity-0 scale-105 z-0 pointer-events-none'
                                }`}
                              />
                            ))}

                            {/* Crisp Vignette Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none z-20" />

                            {/* Floating "View Project" Pill on Hover */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
                              <div className="px-5 py-2.5 rounded-full bg-white text-[#0A0A0A] font-body-ui text-xs sm:text-sm font-bold tracking-tight shadow-2xl flex items-center gap-2 transform group-hover:scale-100 scale-90 transition-transform duration-300">
                                <span>View Case Study</span>
                                <ArrowUpRight className="w-4 h-4 text-[#0A0A0A]" />
                              </div>
                            </div>

                            {/* Bottom-Right Interactive Pagination Indicator Notch / Dashes */}
                            <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-30 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/10 shadow-lg">
                              {projectImages.map((_, dotIdx) => (
                                <button
                                  key={dotIdx}
                                  type="button"
                                  aria-label={`Go to slide ${dotIdx + 1}`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveSlides((prev) => ({ ...prev, [project.id]: dotIdx }));
                                  }}
                                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                                    dotIdx === currentSlide
                                      ? 'w-6 sm:w-7 bg-[#C5F52A]'
                                      : 'w-2.5 sm:w-3 bg-white/30 hover:bg-white/70'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Editorial Narrative Column (5 Cols) */}
                  <div
                    className={`lg:col-span-5 space-y-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-[#C5F52A] tracking-[0.2em] uppercase font-bold">
                        0{idx + 1}
                      </span>
                      <span className="h-px w-8 bg-[#C5F52A]/40" />
                      <span className="font-mono text-xs text-white/40 uppercase tracking-[0.2em]">
                        {project.category}
                      </span>
                    </div>

                    <h4
                      onClick={() => handleOpenProject(project)}
                      className="font-section-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-white hover:text-[#C5F52A] tracking-[-0.02em] leading-tight transition-colors duration-300 cursor-pointer"
                    >
                      {project.title}
                    </h4>

                    <p className="font-body-ui text-sm sm:text-base text-[#9CA3AF] font-light leading-relaxed">
                      {project.longDescription || project.description}
                    </p>

                    {/* Impact / Deliverable Callout */}
                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#C5F52A] mt-1.5 shrink-0" />
                      <div className="space-y-0.5">
                        <p className="font-mono text-[11px] uppercase tracking-wider text-white/40">Studio Impact</p>
                        <p className="font-body-ui text-xs sm:text-sm font-semibold text-white">
                          {project.impact}
                        </p>
                      </div>
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {project.tags.map((t, tagIdx) => (
                        <span
                          key={tagIdx}
                          className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 font-mono text-[10px] text-white/60"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Expand CTA Link */}
                    <div className="pt-2">
                      <button
                        onClick={() => handleOpenProject(project)}
                        className="group/expand inline-flex items-center gap-2 text-sm font-semibold font-body-ui text-[#C5F52A] hover:underline cursor-pointer"
                      >
                        <TextRoll center>Expand Presentation</TextRoll>
                        <ArrowUpRight className="w-4 h-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/expand:translate-x-1 group-hover/expand:-translate-y-1" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
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