'use client';

import React from 'react';
import { ProjectItem } from '@/types';
import { ArrowUpRight, X, Sparkles, CheckCircle2, ShieldCheck, ExternalLink } from 'lucide-react';
import { MagneticButton } from '@/components/animations/MagneticButton';
import { TextRoll } from '@/components/animations/TextRoll';

export interface ProjectDetailProps {
  project: ProjectItem;
  onClose: () => void;
  heroImageContainerRef: React.RefObject<HTMLDivElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
  detailScrollRef?: React.RefObject<HTMLDivElement | null>;
  imageElement?: React.ReactNode;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({
  project,
  onClose,
  heroImageContainerRef,
  contentRef,
  detailScrollRef,
}) => {
  React.useEffect(() => {
    const el = detailScrollRef?.current;
    if (!el) return;

    document.body.style.overflow = 'hidden';

    const handleWheel = (e: WheelEvent) => {
      e.stopPropagation();
      el.scrollTop += e.deltaY;
    };

    el.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      document.body.style.overflow = '';
      el.removeEventListener('wheel', handleWheel);
    };
  }, [detailScrollRef]);

  return (
    <div
      ref={detailScrollRef}
      data-lenis-prevent="true"
      className="fixed inset-0 z-[99980] w-full h-full bg-[#0A0A0A] text-white p-6 sm:p-10 md:p-14 overflow-y-auto select-none flex flex-col justify-between"
    >
      <div className="max-w-7xl mx-auto w-full min-h-full flex flex-col justify-between my-auto py-6">
        {/* Main 2-Column Split Layout matching Reference Portfolio */}
        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch my-auto">
          {/* Left Column: Close Button, Title, Subheading, Live Link & Hero Image Box */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              {/* Close / Return to Home Button */}
              <div className="detail-anim-item" style={{ opacity: 0 }}>
                <button
                  onClick={onClose}
                  data-cursor="Close"
                  className="closeBtn group inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/10 border border-white/15 text-white hover:bg-[#C5F52A] hover:text-[#0A0A0A] hover:border-[#C5F52A] transition-all duration-300 font-mono text-xs uppercase tracking-widest cursor-pointer shadow-lg active:scale-95"
                >
                  <span>Return To Home</span>
                  <X className="w-4 h-4 transition-transform group-hover:rotate-90 duration-300" />
                </button>
              </div>

              {/* Title, Subheading & Year */}
              <div className="space-y-3 detail-anim-item" style={{ opacity: 0 }}>
                <h1 className="projecttitle font-section-heading text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-none">
                  {project.title}
                </h1>
                <div className="subheading flex items-center gap-4 pt-1">
                  <span className="projectyear font-mono text-lg text-[#C5F52A] font-semibold">
                    {project.year}
                  </span>
                  <span className="h-px w-6 bg-[#C5F52A]/40" />
                  <span className="projectshorttag font-mono text-xs sm:text-sm text-white/60 uppercase tracking-widest truncate">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Live Link Button */}
              {project.link && (
                <div className="livelink detail-anim-item" style={{ opacity: 0 }}>
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    <MagneticButton variant="primary" size="md">
                      <TextRoll center>Live Link</TextRoll>
                      <ArrowUpRight className="w-4 h-4 ml-1" />
                    </MagneticButton>
                  </a>
                </div>
              )}
            </div>

            {/* Left Hero Flip Target Container (.projectflip) */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="projectflip w-full aspect-[16/10] rounded-2xl bg-[#141414] border border-white/10 overflow-hidden shadow-2xl relative mt-4"
            >
              <div
                ref={heroImageContainerRef}
                className="w-full h-full relative overflow-hidden bg-[#141414]"
              />
            </div>
          </div>

          {/* Right Column: Description, Tech Stack & Highlights */}
          <div className="lg:col-span-7 flex flex-col justify-end space-y-10 pl-0 lg:pl-8 pt-6 lg:pt-0">
            <div className="right-part-wrapper space-y-8">
              {/* Description Section */}
              <div className="description space-y-3 detail-anim-item" style={{ opacity: 0 }}>
                <h2 className="font-mono text-xs uppercase tracking-widest text-[#C5F52A]">
                  Description
                </h2>
                <p className="font-body-ui text-base sm:text-lg text-white/80 font-light leading-relaxed">
                  {project.longDescription || project.description}
                </p>
              </div>

              {/* Tech Stack & Highlights Grid */}
              <div className="techstackandhighlights grid grid-cols-1 sm:grid-cols-12 gap-8 border-t border-white/10 pt-8">
                {/* Tech Stack Column (5 Cols) */}
                <div className="sm:col-span-5 space-y-3 detail-anim-item" style={{ opacity: 0 }}>
                  <h2 className="font-mono text-xs uppercase tracking-widest text-[#C5F52A]">
                    Tech Stack
                  </h2>
                  <div className="tech flex flex-col gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-xs sm:text-sm text-white/90 flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C5F52A]" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Highlights Column (7 Cols) */}
                <div className="sm:col-span-7 space-y-3 detail-anim-item" style={{ opacity: 0 }}>
                  <h2 className="font-mono text-xs uppercase tracking-widest text-[#C5F52A]">
                    Highlights
                  </h2>
                  <div className="tech flex flex-col gap-3">
                    <div className="flex items-start gap-2.5">
                      <Sparkles className="w-4 h-4 text-[#C5F52A] shrink-0 mt-0.5" />
                      <span className="font-body-ui text-xs sm:text-sm text-white/90">
                        {project.impact}
                      </span>
                    </div>
                    {project.challenge && (
                      <div className="flex items-start gap-2.5">
                        <ShieldCheck className="w-4 h-4 text-white/40 shrink-0 mt-0.5" />
                        <span className="font-body-ui text-xs sm:text-sm text-white/75 font-light">
                          {project.challenge}
                        </span>
                      </div>
                    )}
                    {project.solution && (
                      <div className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#C5F52A] shrink-0 mt-0.5" />
                        <span className="font-body-ui text-xs sm:text-sm text-white/85 font-light">
                          {project.solution}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
