import React from "react";
import { Code } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export type Skill = {
  category: string;
  items: string[];
};

interface SkillsSectionProps {
  category: string;
  items: string[];
  className?: string;
}

export const SkillCard = ({
  category,
  items,
  className,
}: SkillsSectionProps) => (
  <div
    className={`transform transition-transform hover:scale-105 ${className}`}
  >
    <Card className="border-gray-700 bg-gray-800/50 backdrop-blur transition-colors hover:border-blue-500">
      <CardHeader>
        <CardTitle className="text-blue-300">{category}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-center text-gray-300">
              <Code className="mr-2 h-4 min-h-4 w-4 min-w-4 text-blue-400" />
              {item}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  </div>
);
