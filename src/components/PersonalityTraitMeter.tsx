import React from 'react';
import { Info } from 'lucide-react';
import type { OceanScore } from '../types';

interface PersonalityTraitMeterProps {
  trait: string;
  description: string;
  value: OceanScore;
  onChange: (value: number) => void;
  color: string;
  icon: React.ElementType;
}

export default function PersonalityTraitMeter({
  trait,
  description,
  value,
  onChange,
  color,
  icon: Icon
}: PersonalityTraitMeterProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-2">
          <Icon className={`w-5 h-5 ${color}`} />
          <label className="block text-sm font-medium text-gray-700">
            {trait}
          </label>
        </div>
        <button
          type="button"
          className="group relative"
        >
          <Info className="w-4 h-4 text-gray-400" />
          <div className="absolute right-0 w-64 p-2 mt-2 text-sm text-gray-600 bg-white rounded-lg shadow-lg border border-gray-100 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 z-10">
            {description}
          </div>
        </button>
      </div>
      
      <div className="space-y-2">
        <input
          type="range"
          min="0"
          max="100"
          value={value.score}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className={`w-full h-2 rounded-lg appearance-none cursor-pointer
            bg-gray-200 
            [&::-webkit-slider-thumb]:appearance-none 
            [&::-webkit-slider-thumb]:h-4 
            [&::-webkit-slider-thumb]:w-4 
            [&::-webkit-slider-thumb]:rounded-full 
            [&::-webkit-slider-thumb]:${color} 
            [&::-webkit-slider-thumb]:cursor-pointer
          `}
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>Low</span>
          <span>High</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="font-medium text-gray-700">
          Score: {value.score}%
        </div>
        <div className="text-gray-500">
          Confidence: {value.confidence}%
        </div>
      </div>
    </div>
  );
}