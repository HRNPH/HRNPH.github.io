"use client";
import Typewriter from "typewriter-effect";

export const TypeWritingBio = () => {
  return (
    <h1 className="h-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-2xl text-transparent sm:h-full">
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
