import Typewriter from "typewriter-effect";
import { Button } from "@/components/ui/button";
import ProfileFrame from "./profile/ProfileFrame";
import { TypeWritingBio } from "./TypeWritingSection";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen w-full flex items-center overflow-hidden text-white">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Container for overall layout */}
      <div className="container relative mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 px-6 z-10">
        {/* Left Text Content */}
        <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
            Hello, I&apos;m{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Guide
            </span>
            .
          </h1>
          <TypeWritingBio />
          <p className="text-base text-gray-300">
            <span className="font-medium bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent">
              Welcome to my personal website!
            </span>{" "}
            Hi, I’m Guide, an ML Engineer and Full-Stack Developer. My passion
            lies in creating systems that address real-world challenges through
            ML/DL. From developing AI tools like chatbots and RAG systems to
            deploying them in production, I focus on building complete,
            practical solutions. With experience in web development, cloud
            platforms, and CI/CD pipelines, I can craft tailored solutions and
            turn them into functional products or services.
          </p>
          <p className="text-base text-gray-300">
            Beyond technical work, I’ve co-founded a startup and led projects
            that merge technology with business, giving me hands-on experience
            in transforming ideas into impactful products. Currently studying
            Computer Engineering at Chulalongkorn University, I actively
            contribute to open-source projects and enjoy collaborating to create
            meaningful technology.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:space-x-4 items-center justify-center lg:justify-start">
            <Button className="w-full sm:w-auto px-6 py-3 text-lg bg-purple-500 hover:bg-purple-600 text-white transition-colors duration-300">
              Talk With My Secretary
            </Button>
            <Button
              variant="outline"
              className="w-full sm:w-auto px-6 py-3 text-lg border-blue-400 text-blue-400 hover:bg-blue-500/10 transition-colors duration-300 hover:text-white"
            >
              Contact Me
            </Button>
          </div>
        </div>

        {/* Right Photo Content */}
        <ProfileFrame className="w-full lg:w-1/2 flex items-center justify-center" />
      </div>
    </section>
  );
};

export default HeroSection;
