'use client';

import React from 'react';
import { PROJECTS } from '@/constants/data';
import { TextReveal } from '@/components/animations/TextReveal';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { MagneticButton } from '@/components/animations/MagneticButton';
import { TextRoll } from '@/components/animations/TextRoll';

export const Projects: React.FC = () => {
  return (
    <section id="projects" data-theme-bg="#F5F3EE" className="relative bg-[#F5F3EE] py-28 sm:py-36 px-6 md:px-12 lg:px-20 text-[#0A0A0A] transition-colors duration-200">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="flex flex-col space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#6B7280]">
              <span className="w-2 h-2 rounded-full bg-[#C5F52A]" />
              <span>FEATURED SHOWCASE</span>
            </div>
            <TextReveal
              as="h2"
              className="font-section-heading text-3xl sm:text-5xl md:text-6xl font-bold text-[#0A0A0A] tracking-tight leading-tight max-w-3xl"
            >
              Crafted For Digital Dominance & Market Authority.
            </TextReveal>
          </div>

          <a href="#contact" className="shrink-0">
            <MagneticButton variant="primary" size="md">
              <TextRoll center>Request Portfolio</TextRoll>
              <ArrowUpRight className="w-4 h-4 ml-1" />
            </MagneticButton>
          </a>
        </div>

        {/* Project Cards */}
        <div className="space-y-16 sm:space-y-20">
          {PROJECTS.map((project, idx) => (
            <div
              key={project.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center p-6 sm:p-10 rounded-3xl bg-white border border-[#0A0A0A]/[0.08] hover:border-[#C5F52A] transition-all duration-300 group shadow-xs hover:shadow-md`}
              data-cursor="View"
            >
              {/* Visual Column (7 Cols) */}
              <div className={`lg:col-span-7 ${idx % 2 === 1 ? 'lg:order-2' : 'lg:order-1'}`}>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative w-full aspect-[16/10] rounded-2xl bg-[#F5F3EE] border border-[#0A0A0A]/[0.08] overflow-hidden group-hover:scale-[1.01] transition-transform duration-300 shadow-md cursor-pointer"
                  data-cursor="Visit"
                >
                  {/* Top Bar */}
                  <div className="h-8 bg-[#F5F3EE] border-b border-[#0A0A0A]/[0.06] px-4 flex items-center justify-between z-10 relative">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                    </div>
                    <span className="font-mono text-[10px] text-[#6B7280] truncate max-w-[200px]">{project.client}</span>
                    <span className="font-mono text-[10px] text-[#0A0A0A] font-bold">{project.year}</span>
                  </div>

                  {/* Image Display Container */}
                  <div className="relative w-full h-[calc(100%-2rem)] overflow-hidden group">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Category Pill Tag */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-3 py-1 rounded-full bg-[#0A0A0A] backdrop-blur-md text-[#C5F52A] font-mono text-xs font-semibold shadow-md">
                        {project.category}
                      </span>
                    </div>

                    {/* Bottom Impact Overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-[#0A0A0A]/90 via-[#0A0A0A]/40 to-transparent flex items-center justify-between">
                      <span className="font-mono text-xs text-[#C5F52A] font-semibold drop-shadow">
                        {project.impact}
                      </span>
                      <ExternalLink className="w-4 h-4 text-white group-hover:text-[#C5F52A] transition-colors" />
                    </div>
                  </div>
                </a>
              </div>

              {/* Info Column (5 Cols) */}
              <div className={`lg:col-span-5 space-y-6 ${idx % 2 === 1 ? 'lg:order-1' : 'lg:order-2'}`}>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[#6B7280] tracking-widest uppercase font-semibold">
                    0{idx + 1} / CASE STUDY
                  </span>
                  <span className="w-8 h-[1px] bg-[#0A0A0A]/20" />
                </div>

                <h3 className="font-section-heading text-3xl md:text-4xl font-bold text-[#0A0A0A] transition-colors duration-300">
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    {project.title}
                  </a>
                </h3>

                <p className="font-body-ui text-base text-[#6B7280] font-light leading-relaxed">
                  {project.description}
                </p>

                <div className="p-4 rounded-xl bg-[#F5F3EE] border border-[#0A0A0A]/[0.06] space-y-1">
                  <span className="text-[10px] font-mono uppercase text-[#6B7280] tracking-wider block font-semibold">
                    PROJECT IMPACT
                  </span>
                  <span className="font-body-ui text-sm font-bold text-[#0A0A0A]">
                    {project.impact}
                  </span>
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-[#F5F3EE] border border-[#0A0A0A]/[0.06] text-xs font-mono text-[#6B7280]">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-4">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-bold font-body-ui text-[#0A0A0A] hover:text-[#0A0A0A] transition-colors duration-300"
                  >
                    <TextRoll center>Visit Live Platform</TextRoll>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
