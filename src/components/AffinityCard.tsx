import React from 'react';
import type { AffinityCategory } from '../types';
import { 
  Wallet, 
  Heart, 
  Home, 
  Dumbbell, 
  Shirt, 
  Sparkles, 
  UtensilsCrossed, 
  Plane, 
  Briefcase,
  Music,
  Film,
  Palette,
  Car
} from 'lucide-react';

interface AffinityCardProps {
  category: AffinityCategory;
  score: number;
  interests: string[];
  onScoreChange: (score: number) => void;
  onInterestsChange: (interests: string[]) => void;
}

export const categoryConfig: Record<AffinityCategory, {
  label: string;
  icon: React.ElementType;
  color: string;
  placeholder: string;
}> = {
  financial: {
    label: 'Financial',
    icon: Wallet,
    color: 'emerald',
    placeholder: 'e.g., investing, budgeting, crypto...',
  },
  health: {
    label: 'Health',
    icon: Heart,
    color: 'red',
    placeholder: 'e.g., wellness, nutrition, mental health...',
  },
  living: {
    label: 'Living',
    icon: Home,
    color: 'blue',
    placeholder: 'e.g., home decor, sustainability...',
  },
  fitness: {
    label: 'Fitness',
    icon: Dumbbell,
    color: 'orange',
    placeholder: 'e.g., workouts, sports, yoga...',
  },
  fashion: {
    label: 'Fashion',
    icon: Shirt,
    color: 'purple',
    placeholder: 'e.g., streetwear, luxury, vintage...',
  },
  beauty: {
    label: 'Beauty',
    icon: Sparkles,
    color: 'pink',
    placeholder: 'e.g., skincare, makeup, haircare...',
  },
  food: {
    label: 'Food',
    icon: UtensilsCrossed,
    color: 'yellow',
    placeholder: 'e.g., cooking, dining, recipes...',
  },
  travel: {
    label: 'Travel',
    icon: Plane,
    color: 'cyan',
    placeholder: 'e.g., destinations, adventures...',
  },
  career: {
    label: 'Career',
    icon: Briefcase,
    color: 'slate',
    placeholder: 'e.g., professional development...',
  },
  music: {
    label: 'Music',
    icon: Music,
    color: 'indigo',
    placeholder: 'e.g., genres, artists, instruments...',
  },
  movies: {
    label: 'Movies',
    icon: Film,
    color: 'rose',
    placeholder: 'e.g., genres, directors, franchises...',
  },
  art: {
    label: 'Art',
    icon: Palette,
    color: 'violet',
    placeholder: 'e.g., painting, sculpture, digital art...',
  },
  cars: {
    label: 'Cars',
    icon: Car,
    color: 'amber',
    placeholder: 'e.g., brands, models, modifications...',
  }
};

export default function AffinityCard({
  category,
  score,
  interests,
  onScoreChange,
  onInterestsChange,
}: AffinityCardProps) {
  const config = categoryConfig[category];
  const Icon = config.icon;

  return (
    <div className={`
      bg-${config.color}-50 rounded-xl p-6 border border-${config.color}-100
      transition-all duration-200 hover:shadow-sm
    `}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`
            w-10 h-10 rounded-lg bg-${config.color}-100 
            flex items-center justify-center
          `}>
            <Icon className={`w-5 h-5 text-${config.color}-600`} />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{config.label}</h3>
            <p className="text-sm text-gray-500">Affinity Level: {score}%</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Interest Level
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={score}
            onChange={(e) => onScoreChange(parseInt(e.target.value))}
            className={`
              w-full h-2 rounded-lg appearance-none cursor-pointer
              bg-${config.color}-200
              [&::-webkit-slider-thumb]:appearance-none 
              [&::-webkit-slider-thumb]:h-4 
              [&::-webkit-slider-thumb]:w-4 
              [&::-webkit-slider-thumb]:rounded-full 
              [&::-webkit-slider-thumb]:bg-${config.color}-600 
              [&::-webkit-slider-thumb]:cursor-pointer
            `}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Low Interest</span>
            <span>High Interest</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Specific Interests
          </label>
          <textarea
            value={interests.join(', ')}
            onChange={(e) => onInterestsChange(e.target.value.split(',').map(s => s.trim()))}
            placeholder={config.placeholder}
            className={`
              w-full px-3 py-2 rounded-lg border border-${config.color}-200
              text-sm placeholder-gray-400
              focus:ring-2 focus:ring-${config.color}-500 focus:border-transparent
            `}
            rows={2}
          />
        </div>
      </div>
    </div>
  );
}