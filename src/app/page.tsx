// import { Card, CardHeader, CardBody } from "@shadcn/ui";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4">Hi, I'm Guide 👋</h1>
        <p className="text-gray-600 mb-8">
          I'm a passionate software engineer specializing in full-stack
          development, open-source contributions, and building scalable systems.
        </p>
        <div className="flex justify-center space-x-4">
          <a href="https://github.com/yourusername" target="_blank">
            <Github className="h-6 w-6 text-gray-600 hover:text-gray-900" />
          </a>
          <a href="https://linkedin.com/in/yourprofile" target="_blank">
            <Linkedin className="h-6 w-6 text-gray-600 hover:text-gray-900" />
          </a>
          <a href="mailto:youremail@example.com">
            <Mail className="h-6 w-6 text-gray-600 hover:text-gray-900" />
          </a>
        </div>
      </section>
    </div>
  );
}
