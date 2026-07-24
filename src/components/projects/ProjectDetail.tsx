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
  imageElement,
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
      className="fixed inset-0 z-[99980] w-full h-full bg-[#0A0A0A] text-white pt-24 pb-36 px-6 md:px-12 lg:px-20 overflow-y-auto select-none"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Top Control Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 rounded-full bg-[#C5F52A] text-[#0A0A0A] font-mono text-[11px] font-bold uppercase tracking-wider">
              {project.tier || 'CASE STUDY'}
            </span>
            <span className="font-mono text-xs text-white/40 uppercase tracking-widest hidden sm:inline-block">
              {project.year} — {project.client}
            </span>
          </div>

          <button
            onClick={onClose}
            data-cursor="Close"
            className="group inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/10 border border-white/15 text-white hover:bg-[#C5F52A] hover:text-[#0A0A0A] hover:border-[#C5F52A] transition-all duration-300 font-mono text-xs uppercase tracking-widest cursor-pointer shadow-lg active:scale-95"
          >
            <span>Close Presentation</span>
            <X className="w-4 h-4 transition-transform group-hover:rotate-90 duration-300" />
          </button>
        </div>

        {/* Hero Section Container for Single Featured Flip Image */}
        <div className="w-full relative rounded-2xl bg-[#0A0A0A] border border-white/[0.08] overflow-hidden shadow-2xl">
          {/* Browser Chrome Header */}
          <div className="h-9 bg-[#141414] border-b border-white/[0.06] px-4 flex items-center justify-between z-10 relative">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            </div>
            <span className="font-mono text-[10px] text-[#9CA3AF] truncate max-w-[280px]">
              {project.link ? project.link.replace('https://', '') : project.client}
            </span>
            <span className="font-mono text-[10px] text-[#C5F52A] font-semibold">100% Core Web Vitals</span>
          </div>

          {/* Hero Target Container — FLIP Image Lands Here */}
          <div
            ref={heroImageContainerRef}
            className="relative w-full aspect-[16/9] sm:aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-[#141414]"
          >
            {imageElement}
          </div>
        </div>

        {/* Staggered Detail Content Container */}
        <div ref={contentRef} className="space-y-16">
          {/* Header Title & Tagline */}
          <div className="space-y-6 max-w-4xl detail-anim-item">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-xs text-[#C5F52A] tracking-widest uppercase">
                {project.category}
              </span>
              <span className="h-px w-6 bg-[#C5F52A]/40" />
              <span className="font-mono text-xs text-white/40 uppercase tracking-widest">
                FLAGSHIP PRESENTATION
              </span>
            </div>

            <h1 className="font-section-heading text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-tight">
              {project.title}
            </h1>

            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#C5F52A]/10 border border-[#C5F52A]/25 text-[#C5F52A] font-mono text-xs font-semibold">
              <Sparkles className="w-4 h-4 text-[#C5F52A]" />
              <span>{project.impact}</span>
            </div>
          </div>

          {/* Grid Overview & Specifications */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-4">
            {/* Main Story Column */}
            <div className="lg:col-span-8 space-y-8 detail-anim-item">
              <h2 className="font-section-heading text-2xl font-bold text-white">
                Project Overview &amp; Execution
              </h2>
              <p className="font-body-ui text-lg sm:text-xl text-white/80 font-light leading-relaxed">
                {project.longDescription || project.description}
              </p>

              {project.link && (
                <div className="pt-4">
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    <MagneticButton variant="primary" size="lg">
                      <TextRoll center>Launch Live Platform</TextRoll>
                      <ArrowUpRight className="w-5 h-5 ml-1" />
                    </MagneticButton>
                  </a>
                </div>
              )}
            </div>

            {/* Sidebar Specifications Column */}
            <div className="lg:col-span-4 space-y-6 bg-[#141414] border border-white/10 p-8 rounded-2xl detail-anim-item">
              <h3 className="font-mono text-xs uppercase tracking-widest text-[#C5F52A]">
                Technical Specification
              </h3>

              <div className="space-y-4 text-sm font-body-ui divide-y divide-white/10">
                <div className="pt-2 flex justify-between items-center">
                  <span className="text-white/40">Client</span>
                  <span className="font-semibold text-white">{project.client}</span>
                </div>
                <div className="pt-3 flex justify-between items-center">
                  <span className="text-white/40">Delivery Tier</span>
                  <span className="font-semibold text-[#C5F52A] font-mono text-xs">{project.tier || 'Type 1'}</span>
                </div>
                <div className="pt-3 flex justify-between items-center">
                  <span className="text-white/40">Role</span>
                  <span className="font-semibold text-white">{project.role || 'Digital Engineering'}</span>
                </div>
                <div className="pt-3 flex justify-between items-center">
                  <span className="text-white/40">Release Year</span>
                  <span className="font-semibold text-white font-mono">{project.year}</span>
                </div>
              </div>

              {/* Technologies List */}
              <div className="pt-4 space-y-3">
                <span className="font-mono text-xs text-white/40 uppercase tracking-widest block">
                  Technologies Deployed
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/90"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Deep Dive Breakdown: Challenge & Solution */}
          {(project.challenge || project.solution) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
              {project.challenge && (
                <div className="bg-[#141414] border border-white/10 p-8 sm:p-10 rounded-2xl space-y-4 detail-anim-item">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-white/40" />
                    <h3 className="font-section-heading text-xl font-bold text-white">
                      The Challenge
                    </h3>
                  </div>
                  <p className="font-body-ui text-sm sm:text-base text-white/70 font-light leading-relaxed">
                    {project.challenge}
                  </p>
                </div>
              )}

              {project.solution && (
                <div className="bg-[#141414] border border-[#C5F52A]/30 p-8 sm:p-10 rounded-2xl space-y-4 relative overflow-hidden detail-anim-item">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5F52A]/5 rounded-full blur-2xl pointer-events-none" />
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#C5F52A]" />
                    <h3 className="font-section-heading text-xl font-bold text-[#C5F52A]">
                      The Architectural Solution
                    </h3>
                  </div>
                  <p className="font-body-ui text-sm sm:text-base text-white/80 font-light leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Bottom Action Footer */}
          <div className="pt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 detail-anim-item">
            <div className="flex items-center gap-4">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#C5F52A] hover:underline"
                >
                  <span>Visit {project.link.replace('https://', '')}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>

            <button
              onClick={onClose}
              className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-widest transition-colors cursor-pointer"
            >
              Back to All Projects
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
