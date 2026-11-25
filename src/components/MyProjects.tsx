import React, { useState, useMemo, useEffect } from "react";
import { 
  ChevronRight
} from "lucide-react";
import { m, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { getOptimizedImageUrl, getOptimizedSrcSet } from "../utils/image";
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
  results?: string[];
  tech?: string[];
  featured?: boolean;
  firstTagColor?: string;
  shortDescription?: string;
}

export default function MyProjects() {
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
        shortDescription: p.shortDescription || ""
      };
    }) as Project[];
  }, []);

  // Filtered featured projects for homepage
  const mainProjects = useMemo(() => {
    const featuredList = projects.filter(p => p.featured);
    if (featuredList.length > 0) {
      return featuredList;
    }
    return projects.slice(0, 4); // fallback if none are explicitly tagged
  }, [projects]);

  return (
    <section 
      id="my-projects-section" 
      className="bg-[#171717] text-white px-[18px] md:px-[32px] py-16 md:py-24 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-radial-at-t from-[#202020] via-transparent to-transparent opacity-40 pointer-events-none" />

      {/* Section Header */}
      <div className="max-w-7xl mx-auto flex flex-row items-center justify-between mb-10 md:mb-14 relative z-10" id="projects-section-header">
        <m.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl md:text-[46px] font-bold tracking-tight font-sans text-white flex items-center gap-3"
          id="projects-title-h2"
        >
          <span>Мои проекты</span>
        </m.h2>

        <m.button 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          onClick={() => { navigate("/projects"); }}
          className="group text-white/70 hover:text-white text-sm sm:text-base font-medium tracking-wide flex items-center gap-1.5 transition-colors cursor-pointer bg-[#292929] hover:bg-[#333333] px-4 py-2 rounded-full border-none"
          id="view-all-projects-btn"
          type="button"
        >
          <span className="hidden sm:inline">Смотреть все</span>
          <span className="inline sm:hidden">Все</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </m.button>
      </div>

      {/* Projects Grid for Homepage (First 4 Projects) */}
      <div 
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 relative z-10" 
        id="projects-home-grid"
      >
        {mainProjects.map((project, idx) => (
          <m.div 
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="group/card bg-[#292929] hover:bg-[#333] hover:scale-[1.01] rounded-[24px] p-4 flex flex-col justify-between transition-all duration-300 overflow-hidden cursor-pointer"
            onClick={() => { navigate(`/project/${project.id}`); }}
            id={`project-card-${project.id}`}
          >
            {/* Image Wrap */}
            <div className="relative aspect-[16/11] rounded-[18px] overflow-hidden mb-5 bg-[#222]" id={`img-wrap-${project.id}`}>
              <img 
                src={getOptimizedImageUrl(project.image, 800)} 
                srcSet={getOptimizedSrcSet(project.image, [480, 800, 1200])}
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 600px"
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
                loading={idx === 0 ? "eager" : "lazy"}
                {...(idx === 0 ? { fetchPriority: "high" } : {})}
              />
            </div>

            {/* Bottom Content Row */}
            <div className="px-1" id={`content-wrap-${project.id}`}>
              {/* Tags Horizontal Scroll */}
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
      </div>    </section>
  );
}
