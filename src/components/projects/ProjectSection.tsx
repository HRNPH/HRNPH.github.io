import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink, X, ChevronRight } from "lucide-react";
import { ParallaxWrapper } from "../providers/ParalaxWrapper";

type Project = {
  title: string;
  description: string;
  full_description?: string;
  tags: string[];
  image: string;
  logo: string;
  link?: string;
};

const ProjectCard = ({ project }: { project: Project }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className="relative h-96 rounded-lg overflow-hidden cursor-pointer group font-mitrSans"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Card Background with Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-800/70 to-gray-900" />

          {/* Project Image/Logo */}
          <div className="absolute inset-0">
            <img
              src={project.image || "/api/placeholder/600/400"}
              alt={project.title}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
          </div>

          {/* Content Overlay */}
          <div className="absolute inset-0 p-6 flex flex-col justify-end transform transition-transform duration-500">
            {/* Logo */}
            <div className="w-12 h-12 rounded-full bg-background/10 backdrop-blur mb-4 p-2">
              <img
                src={project.logo || "/api/placeholder/48/48"}
                alt="logo"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Title & Description */}
            <h3 className="text-2xl font-bold text-background mb-2 transform group-hover:translate-x-2 transition-transform duration-500">
              {project.title}
            </h3>
            <p className="text-blue-300 mb-4 line-clamp-2 transform group-hover:translate-x-2 transition-transform duration-500 delay-75">
              {project.description}
            </p>

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-2 transform group-hover:translate-x-2 transition-transform duration-500 delay-100">
              {project.tags?.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full text-sm bg-blue-900/40 backdrop-blur text-blue-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* View More Button */}
            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-10 h-10 rounded-full bg-blue-900/40 backdrop-blur flex items-center justify-center animate-tilt">
                <ChevronRight className="w-5 h-5 text-blue-300" />
              </div>
            </div>
          </div>
        </div>
      </DialogTrigger>

      {/* Project Details Modal */}
      <DialogContent className="sm:max-w-[700px] bg-gray-900/95 backdrop-blur border-gray-800 font-mitrSans text-background">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-background flex items-center gap-4">
            <img
              src={project.logo || "/api/placeholder/48/48"}
              alt="logo"
              className="w-12 h-12 rounded-full"
            />
            {project.title}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <div className="aspect-video w-full rounded-lg overflow-hidden mb-6">
            <img
              src={project.image || "/api/placeholder/600/400"}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-4">
            <p className="text-background leading-relaxed">
              {project.full_description || project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags?.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full text-sm bg-blue-900/40 text-blue-300"
                >
                  {tag}
                </span>
              ))}
            </div>
            {project.link && (
              <Button
                className="mt-4 bg-gradient-to-r from-blue-600 to-purple-500 hover:from-blue-500 hover:to-purple-400 text-background"
                onClick={() => window.open(project.link, "_blank")}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Visit Project
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const ProjectSection = ({
  title,
  projects,
}: {
  title: string;
  projects: Project[];
}) => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <ParallaxWrapper speed={10}>
          <h2 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 font-mitrSans">
            {title}
          </h2>
        </ParallaxWrapper>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-18">
          {projects.map((project, index) => (
            <ParallaxWrapper key={index} speed={5 + (index % 3) * 2}>
              <ProjectCard project={project} />
            </ParallaxWrapper>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
