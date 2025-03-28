import React from 'react';

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "h-8 w-auto" }: LogoProps) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <img 
        src="https://images.unsplash.com/photo-1614036417651-efe5912149d8?q=80&w=200&h=200&auto=format&fit=crop"
        alt="TribeMind Logo"
        className="h-full rounded"
      />
      <span className="font-bold text-xl text-gray-900 dark:text-white">TribeMind</span>
    </div>
  );
}