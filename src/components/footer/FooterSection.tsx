import React from "react";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

const FooterSection = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-6 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Personal Bio */}
          <div>
            <h3
              id="for-seo"
              className="text-blue-400 text-xl font-bold mb-4"
              about="hirunkul-phimsiri"
            >
              About Me
            </h3>
            <p className="text-gray-400">
              I’m Hirunkul Phimsiri, an AI/ML engineer and full-stack developer
              with expertise in creating scalable web, mobile, and AI solutions.
              Currently studying Computer Engineering at Chulalongkorn
              University
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-blue-400 text-xl font-bold mb-4">Navigate</h3>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="hover:text-blue-300">
                  About Me
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-blue-300">
                  Projects
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-blue-300">
                  Skills
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-blue-300">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-blue-400 text-xl font-bold mb-4">
              Connect with Me
            </h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com/hrnph"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="https://linkedin.com/in/hirunkul-phimsiri-1ab52b209"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href="mailto:hrnph@protonmail.com"
                className="text-blue-400 hover:text-blue-300"
              >
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-6">
          <p className="text-center text-gray-400">
            &copy; {new Date().getFullYear()} Hirunkul Phimsiri. Built with{" "}
            <span className="text-blue-400">Love</span> and{" "}
            <span className="text-purple-400">Some Black Magic</span>.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
