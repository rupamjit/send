import { LucideIcon } from "lucide-react";
import React from "react";

interface CardProps {
  icon: LucideIcon;
  title: string;
  text: string;
}

const Card = ({ icon: Icon, title, text }: CardProps) => {
  return (
    <div className="group relative p-6 border border-amber-200/50 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50/80 cursor-pointer hover:scale-105 hover:shadow-2xl hover:shadow-amber-200/20 transition-all duration-500 ease-out rounded-2xl overflow-hidden backdrop-blur-sm">
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-300/20 via-orange-200/10 to-yellow-200/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>

      <div className="relative flex flex-col space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full shadow-lg group-hover:shadow-amber-300/40 transition-all duration-300">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-amber-800 transition-colors duration-200">
            {title}
          </h3>
        </div>

        <p className="text-gray-600 font-light leading-relaxed group-hover:text-gray-700 transition-colors duration-200">
          {text}
        </p>
      </div>
    </div>
  );
};

export default Card;
