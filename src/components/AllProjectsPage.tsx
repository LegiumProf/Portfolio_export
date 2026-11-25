import React, { useMemo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowLeft from "lucide-react/dist/esm/icons/arrow-left";
import { m } from "motion/react";
import { getOptimizedImageUrl } from "../utils/image";
import CtaFooter from "./CtaFooter";
import EngineTechFooter from "./EngineTechFooter";
import projectsData from "../data/project_pages.json";

interface Project {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  tags: string[];
  year: string;
  client: string;
  category: string;
  description: string;
  longDescription: string;
  featured?: boolean;
  firstTagColor?: string;
  shortDescription?: string;
  pageBackgroundColor?: string;
}

export default function AllProjectsPage({ onBack }: { onBack: () => void }) {
  const navigate = useNavigate();
  // Load from dynamic template JSON
  const projects = useMemo(() => {
    return Object.entries(projectsData).map(([key, p]: [string, any]) => {
      const isFeatured = p.featured === true || p.tags?.some((t: string) => {
        const lower = t.toLowerCase();
        return lower === "featured" || lower === "pinned" || lower === "home" || lower === "главная";
      });
      return {
        id: key,
        title: p.title,
        subtitle: p.subtitle || `${p.industry} // ${p.workType}`,
        image: p.heroImage,
        tags: p.tags || [],
        year: p.year || "2026",
        client: p.client || p.title,
        category: p.category || p.industry,
        description: p.clientDescription,
        longDescription: p.taskDescription,
        featured: isFeatured,
        firstTagColor: p.firstTagColor,
        shortDescription: p.shortDescription || "",
        pageBackgroundColor: p.pageBackgroundColor || "#000000"
      };
    }) as Project[];
  }, []);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="min-h-screen bg-[#171717] text-white flex flex-col font-sans" id="all-projects-page-container">
      {/* Premium Header/Navigation Bar */}
      <header className="sticky top-0 z-50 bg-[#171717]/90 backdrop-blur-md border-b border-white/[0.05] py-4 px-[18px] md:px-[32px] flex items-center justify-between">
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 bg-[#292929] hover:bg-[#333333] active:scale-95 text-white/90 hover:text-white px-4 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer border-none"
          id="all-projects-back-btn"
          type="button"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>На главную</span>
        </button>

        <a className="brand !text-[14px] xs:!text-[17px] md:!text-[22px] cursor-pointer" href="#" aria-label="Vadim Semenov" id="all-projects-brand" onClick={(e) => { e.preventDefault(); onBack(); }}>
          Vadim Semenov
        </a>

        {/* Placeholder to balance layout */}
        <div className="w-24 hidden md:block" />
      </header>

      {/* Hero Banner Intro */}
      <section className="relative px-[18px] md:px-[32px] pt-16 pb-12 max-w-7xl mx-auto w-full" id="all-projects-intro-sec">
        <div className="absolute inset-0 bg-radial-at-t from-blue-900/10 via-transparent to-transparent opacity-50 pointer-events-none" />
        
        <div className="flex flex-col gap-3 relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-[56px] font-extrabold tracking-tight leading-none text-white my-0">
            Все проекты
          </h1>
          <p className="text-white/50 text-sm sm:text-base max-w-xl leading-relaxed mt-2">
            Галерея коммерческих кейсов, концепций и дизайн-решений для бизнеса. Интерфейсы, SMM-контент, 3D-анимации и брендинг.
          </p>
        </div>
      </section>

      {/* Main Grid View */}
      <section className="px-[18px] md:px-[32px] pb-24 max-w-7xl mx-auto w-full flex-grow relative z-10" id="all-projects-grid-sec">
        <div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8" 
          id="projects-dynamic-grid"
        >
          {projects.map((project, idx) => (
            <m.div 
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
              className="group/card bg-[#292929] hover:bg-[#333] hover:scale-[1.01] rounded-[24px] p-4 flex flex-col justify-between transition-all duration-300 overflow-hidden cursor-pointer shadow-lg"
              onClick={() => { navigate(`/project/${project.id}`); }}
              id={`all-projects-card-${project.id}`}
            >
              {/* Image Wrap */}
              <div className="relative aspect-[16/11] rounded-[18px] overflow-hidden mb-5 bg-[#222]" id={`img-wrap-${project.id}`}>
                <img 
                  src={getOptimizedImageUrl(project.image, 800)} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                  loading={idx < 2 ? "eager" : "lazy"}
                  {...(idx < 2 ? { fetchPriority: "high" } : {})}
                />
              </div>

              {/* Bottom Content Row */}
              <div className="px-1" id={`content-wrap-${project.id}`}>
                {/* Tags container */}
                <div className="flex flex-wrap gap-2 mb-3.5" id={`tags-container-${project.id}`}>
                  {project.tags.filter(t => {
                    const lower = t.toLowerCase();
                    return lower !== "featured" && lower !== "pinned" && lower !== "home" && lower !== "главная";
                  }).map((tag, tIdx) => {
                    const isFirst = tIdx === 0;
                    const customColor = isFirst && project.firstTagColor;
                    return (
                      <span 
                        key={tag} 
                        className={customColor ? "text-white font-sans text-[12px] p-3 rounded-[16px] border-none uppercase tracking-wider font-semibold" : "bg-white/[0.05] text-white/80 font-sans text-[12px] p-3 rounded-[16px] border-none uppercase tracking-wider font-semibold"}
                        style={customColor ? { backgroundColor: customColor } : undefined}
                      >
                        {tag}
                      </span>
                    );
                  })}
                </div>

                {/* Title and Action Button Row */}
                <div className="flex flex-col gap-1.5" id={`text-row-${project.id}`}>
                  <h3 className="text-white text-base sm:text-lg md:text-[20px] font-semibold leading-snug transition-colors line-clamp-1" id={`title-txt-${project.id}`}>
                    {project.title}
                  </h3>
                  {project.shortDescription && (
                    <p className="text-white/50 text-xs sm:text-xs md:text-sm line-clamp-2 leading-relaxed" id={`desc-txt-${project.id}`}>
                      {project.shortDescription}
                    </p>
                  )}
                </div>
              </div>
            </m.div>
          ))}
        </div>
      </section>

      {/* Decorative full length section end elements */}
      <CtaFooter />
      <EngineTechFooter />
    </div>
  );
}
