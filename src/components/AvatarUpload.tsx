import React, { useRef } from 'react';
import { Camera, User } from 'lucide-react';

interface AvatarUploadProps {
  avatar?: string;
  onChange: (avatar: string) => void;
}

export default function AvatarUpload({ avatar, onChange }: AvatarUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex items-center space-x-6">
      <div className="relative">
        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 flex items-center justify-center overflow-hidden">
          {avatar ? (
            <img 
              src={avatar} 
              alt="Avatar" 
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="w-12 h-12 text-white" />
          )}
        </div>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="absolute bottom-0 right-0 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <Camera className="w-4 h-4 text-gray-600 dark:text-gray-300" />
        </button>
      </div>
      <div>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
        >
          {avatar ? 'Change avatar' : 'Upload avatar'}
        </button>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          JPG, PNG or GIF. Max size 2MB.
        </p>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}