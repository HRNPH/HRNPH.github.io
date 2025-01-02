import { Button } from "@/components/ui/button";
import ProfileFrame from "./profile/ProfileFrame";
import { TypeWritingBio } from "./TypeWritingSection";

const HeroSection = ({ className }: { className?: string }) => {
  return (
    <section
      className={`relative flex min-h-screen w-full items-center overflow-hidden ${className}`}
    >
      <div className="absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 animate-pulse rounded-full bg-purple-500/20 blur-3xl delay-1000" />
      </div>

      {/* Container for overall layout */}
      <div className="container relative z-10 mx-auto flex flex-col items-center justify-between gap-12 px-6 lg:flex-row">
        {/* Left Text Content */}
        <div className="w-full space-y-6 text-center lg:w-1/2 lg:text-left">
          <h1 className="text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
            Hello, I&apos;m{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Guide
            </span>
            .
          </h1>
          <TypeWritingBio />
          <div>
            {/* Full bio for desktop */}
            <p className="hidden text-background sm:text-base lg:block">
              <span className="bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text font-medium text-transparent">
                Welcome to my personal website!
              </span>{" "}
              Hi, I’m Guide, an ML Engineer and Full-Stack Developer. My passion
              lies in creating systems that address real-world challenges
              through ML/DL. From developing AI tools like chatbots and RAG
              systems to deploying them in production, I focus on building
              complete, practical solutions. With experience in web development,
              cloud platforms, and CI/CD pipelines, I can find the right
              solutions for your problems and turn them into functional products
              and services.
            </p>
            {/* Concise bio for mobile */}
            <p className="block text-xl text-background lg:hidden">
              <span className="bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text font-medium text-transparent">
                Welcome to my personal website!
              </span>{" "}
              Hi, I’m Guide, an ML Engineer and Developer passionate about AI
              tools and creating systems that solve real-world challenges.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:space-x-4 lg:justify-start">
            <a href="/assistant" className="w-full sm:w-auto">
              <Button className="w-full bg-purple-500 px-6 py-3 text-lg text-white transition-colors duration-300 hover:bg-purple-600 sm:w-auto">
                Talk To My AI Secretary
              </Button>
            </a>
            {/* Outline A tag for SEO */}
            <a href="#contact" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full border-blue-400 px-6 py-3 text-lg text-blue-400 transition-colors duration-300 hover:bg-blue-500/10 hover:text-white sm:w-auto"
              >
                Contact Me?
              </Button>
            </a>
          </div>
        </div>

        {/* Right Photo Content */}
        <ProfileFrame className="flex w-full items-center justify-center lg:w-1/2" />
      </div>
    </section>
  );
};

export default HeroSection;
