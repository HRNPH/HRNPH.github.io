"use client";
import Image from "next/image";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink, ChevronRight } from "lucide-react";
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
  // const [isHovered, setIsHovered] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="group relative h-96 cursor-pointer overflow-hidden rounded-lg font-mitrSans">
          {/* Card Background with Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-800/70 to-gray-900" />

          {/* Project Image/Logo */}
          <div className="absolute inset-0">
            <Image
              src={project.image || "/api/placeholder/600/400"}
              alt={project.title}
              className="h-full w-full transform object-cover transition-transform duration-700 group-hover:scale-110"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
            />
          </div>

          {/* Content Overlay */}
          <div className="absolute inset-0 flex transform flex-col justify-end p-6 transition-transform duration-500">
            {/* Title & Description */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent p-4 shadow-lg">
              <h3 className="mb-2 transform text-2xl font-bold text-background shadow-2xl transition-transform duration-500 group-hover:translate-x-2">
                {project.title}
              </h3>
              <p className="mb-4 line-clamp-2 transform text-blue-300 transition-transform delay-75 duration-500 group-hover:translate-x-2">
                {project.description}
              </p>

              {/* Tech Tags */}
              <div className="flex transform flex-wrap gap-2 transition-transform delay-100 duration-500 group-hover:translate-x-2">
                {project.tags?.map((tag, idx) => (
                  <span
                    key={idx}
                    className="rounded-full bg-blue-900/40 px-3 py-1 text-sm text-blue-300 backdrop-blur"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* View More Button */}
            <div className="absolute right-6 top-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="flex h-10 w-10 animate-tilt items-center justify-center rounded-full bg-blue-900/40 backdrop-blur">
                <ChevronRight className="h-5 w-5 text-blue-300" />
              </div>
            </div>
          </div>
        </div>
      </DialogTrigger>

      {/* Project Details Modal */}
      <DialogContent className="max-h-screen overflow-y-auto border-gray-800 bg-gray-900/95 font-mitrSans text-background backdrop-blur sm:h-5/6 sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-4 text-2xl font-bold text-background">
            <Image
              src={project.logo || "/api/placeholder/48/48"}
              alt="logo"
              className="h-12 w-12 rounded-full"
              width={48}
              height={48}
            />
            {project.title}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <div className="aspect-video mx-auto mb-6 w-full max-w-screen-md overflow-hidden rounded-lg">
            <Image
              src={project.image || "/api/placeholder/600/400"}
              alt={project.title}
              className="h-full w-full object-contain"
              layout="fill"
              objectFit="contain"
              objectPosition="center"
            />
          </div>
          <div className="space-y-4">
            <p className="leading-relaxed text-background">
              {project.full_description || project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags?.map((tag, idx) => (
                <span
                  key={idx}
                  className="rounded-full bg-blue-900/40 px-3 py-1 text-sm text-blue-300"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex justify-end">
              {project.link && (
                <Button
                  className="mt-4 border-0 bg-gradient-to-r from-blue-600 to-purple-500 text-background hover:from-blue-500 hover:to-purple-400"
                  onClick={() => window.open(project.link, "_blank")}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Visit Project
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const ProjectSection = ({ projects }: { projects: Project[] }) => {
  return (
    <section id="projects" className="relative overflow-hidden py-20">
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <ParallaxWrapper speed={10}>
          <h2 className="mb-12 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-center font-mitrSans text-4xl font-bold text-transparent">
            Projects
          </h2>
        </ParallaxWrapper>

        {/* Projects Masonry Grid */}
        <ParallaxWrapper speed={5}>
          <div className="columns-1 gap-6 md:columns-2 lg:columns-3">
            {projects.map((project, index) => (
              <div key={index} className="mb-6 break-inside-avoid">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </ParallaxWrapper>
      </div>
    </section>
  );
};

export default ProjectSection;
