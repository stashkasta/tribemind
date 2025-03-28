import React from 'react';
import { Plus } from 'lucide-react';

interface NewPersonaCardProps {
  onClick: () => void;
}

export default function NewPersonaCard({ onClick }: NewPersonaCardProps) {
  return (
    <button
      onClick={onClick}
      className="h-full min-h-[200px] w-full bg-gray-50 dark:bg-gray-800/50 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl hover:border-primary-500 dark:hover:border-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-200"
    >
      <div className="flex flex-col items-center justify-center h-full p-6">
        <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center mb-3">
          <Plus className="w-6 h-6 text-primary-600 dark:text-primary-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          Create New Persona
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-1">
          Build a detailed profile of your target audience
        </p>
      </div>
    </button>
  );
}