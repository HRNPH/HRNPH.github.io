"use client";
import Typewriter from "typewriter-effect";

export const TypeWritingBio = () => {
  return (
    <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 text-2xl h-16 sm:h-full">
      <Typewriter
        options={{
          strings: [
            "Hirunkul Phimsiri",
            "AI Software Engineer, Cariva Thailand",
          ],
          autoStart: true,
          loop: true,
          deleteSpeed: 50,
          delay: 25,
          cursor: "|",
          cursorClassName: "text-background animate-pulse",
        }}
      />
    </h1>
  );
};
