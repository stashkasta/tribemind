import React, { useCallback, useState } from 'react';
import { Upload, Library, Palette } from 'lucide-react';
import MediaLibraryModal from './MediaLibraryModal';

interface MediaUploadProps {
  onFileSelect: (files: FileList) => void;
  onLibraryOpen: () => void;
  onPluginsOpen: () => void;
}

export default function MediaUpload({ onFileSelect, onLibraryOpen, onPluginsOpen }: MediaUploadProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'media' | 'creative' | 'ai'>('media');

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      onFileSelect(files);
    }
  }, [onFileSelect]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileSelect(files);
    }
  }, [onFileSelect]);

  const handleLibraryClick = () => {
    setActiveTab('media');
    setIsModalOpen(true);
  };

  const handlePluginsClick = () => {
    setActiveTab('creative');
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div 
        className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 transition-colors duration-200 hover:border-primary-500 dark:hover:border-primary-400"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center text-center">
          <Upload className="w-12 h-12 text-gray-400 dark:text-gray-500 mb-4" />
          <p className="text-base text-gray-600 dark:text-gray-300 mb-2">
            Click to upload or drag and drop
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Support for images, videos, and audio files
          </p>
          <label className="cursor-pointer">
            <input
              type="file"
              className="hidden"
              accept="image/*,video/*,audio/*"
              onChange={handleFileInput}
              multiple
            />
            <span className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200">
              Browse Files
            </span>
          </label>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={handleLibraryClick}
          className="flex items-center justify-center space-x-2 px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
        >
          <Library className="w-5 h-5" />
          <span>Media Library</span>
        </button>
        <button
          onClick={handlePluginsClick}
          className="flex items-center justify-center space-x-2 px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
        >
          <Palette className="w-5 h-5" />
          <span>Plugins</span>
        </button>
      </div>

      {/* Media Library Modal */}
      <MediaLibraryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </div>
  );
}