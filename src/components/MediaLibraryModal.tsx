import React from 'react';
import { X, Search, ExternalLink } from 'lucide-react';

interface MediaSource {
  id: string;
  name: string;
  description: string;
  icon: string;
  url: string;
}

interface CreativeTool {
  id: string;
  name: string;
  description: string;
  icon: string;
  url: string;
}

interface AITool {
  id: string;
  name: string;
  description: string;
  icon: string;
  url: string;
}

const mediaSources: MediaSource[] = [
  {
    id: 'pexels',
    name: 'Pexels',
    description: 'Free stock photos and videos',
    icon: 'https://www.pexels.com/assets/static/images/meta/pexels-icon.png',
    url: 'https://www.pexels.com'
  },
  {
    id: 'unsplash',
    name: 'Unsplash',
    description: 'Beautiful free images & pictures',
    icon: 'https://unsplash.com/favicon-32x32.png',
    url: 'https://unsplash.com'
  },
  {
    id: 'giphy',
    name: 'GIPHY',
    description: 'Animated GIFs and stickers',
    icon: 'https://giphy.com/static/img/favicon.png',
    url: 'https://giphy.com'
  },
  {
    id: 'pixabay',
    name: 'Pixabay',
    description: 'Stunning free images & royalty free stock',
    icon: 'https://pixabay.com/favicon-32x32.png',
    url: 'https://pixabay.com'
  },
  {
    id: 'coverr',
    name: 'Coverr',
    description: 'Beautiful free stock video footage',
    icon: 'https://coverr.co/favicon-32x32.png',
    url: 'https://coverr.co'
  }
];

const creativeTools: CreativeTool[] = [
  {
    id: 'canva',
    name: 'Canva',
    description: 'Graphic design platform',
    icon: 'https://static.canva.com/static/images/favicon-32x32.png',
    url: 'https://www.canva.com'
  },
  {
    id: 'figma',
    name: 'Figma',
    description: 'Design and prototype tool',
    icon: 'https://static.figma.com/app/icon/1/favicon.png',
    url: 'https://www.figma.com'
  },
  {
    id: 'lottie',
    name: 'LottieFiles',
    description: 'Lightweight animations',
    icon: 'https://lottiefiles.com/favicon.ico',
    url: 'https://lottiefiles.com'
  },
  {
    id: 'noun-project',
    name: 'Noun Project',
    description: 'Icons and photos for everything',
    icon: 'https://thenounproject.com/favicon.ico',
    url: 'https://thenounproject.com'
  }
];

const aiTools: AITool[] = [
  {
    id: 'dalle',
    name: 'DALL·E',
    description: 'AI image generation',
    icon: 'https://openai.com/favicon.ico',
    url: 'https://openai.com/dall-e-2'
  },
  {
    id: 'runway',
    name: 'Runway ML',
    description: 'AI video editing and generation',
    icon: 'https://runway.com/favicon.ico',
    url: 'https://runway.com'
  },
  {
    id: 'kaiber',
    name: 'Kaiber',
    description: 'AI animation tool',
    icon: 'https://kaiber.ai/favicon.ico',
    url: 'https://kaiber.ai'
  },
  {
    id: 'soundraw',
    name: 'Soundraw',
    description: 'AI music generation',
    icon: 'https://soundraw.io/favicon.ico',
    url: 'https://soundraw.io'
  },
  {
    id: 'copy-ai',
    name: 'Copy.ai',
    description: 'AI writing assistant',
    icon: 'https://www.copy.ai/favicon.ico',
    url: 'https://www.copy.ai'
  }
];

interface MediaLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: 'media' | 'creative' | 'ai';
  onTabChange: (tab: 'media' | 'creative' | 'ai') => void;
}

export default function MediaLibraryModal({
  isOpen,
  onClose,
  activeTab,
  onTabChange
}: MediaLibraryModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

      <div className="fixed inset-y-0 right-0 flex max-w-full">
        <div className="w-screen max-w-md">
          <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
            {/* Header */}
            <div className="border-b border-gray-200">
              <div className="px-4 py-6 sm:px-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">Content Sources</h2>
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <div className="mt-4">
                  <div className="relative rounded-md shadow-sm">
                    <Search className="pointer-events-none absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Search content sources..."
                      className="block w-full rounded-md border-gray-300 pl-10 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="px-2">
                <nav className="-mb-px flex space-x-4">
                  {[
                    { id: 'media', name: 'Media Sources' },
                    { id: 'creative', name: 'Creative Tools' },
                    { id: 'ai', name: 'AI Tools' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => onTabChange(tab.id as 'media' | 'creative' | 'ai')}
                      className={`
                        whitespace-nowrap px-3 py-2.5 text-sm font-medium border-b-2
                        ${activeTab === tab.id
                          ? 'border-primary-500 text-primary-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }
                      `}
                    >
                      {tab.name}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                {activeTab === 'media' && (
                  <div className="grid grid-cols-1 gap-4">
                    {mediaSources.map((source) => (
                      <a
                        key={source.id}
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center p-4 rounded-lg border border-gray-200 hover:border-primary-500 transition-colors"
                      >
                        <img src={source.icon} alt={source.name} className="w-8 h-8" />
                        <div className="ml-4 flex-1">
                          <h3 className="text-sm font-medium text-gray-900">{source.name}</h3>
                          <p className="text-sm text-gray-500">{source.description}</p>
                        </div>
                        <ExternalLink className="w-5 h-5 text-gray-400" />
                      </a>
                    ))}
                  </div>
                )}

                {activeTab === 'creative' && (
                  <div className="grid grid-cols-1 gap-4">
                    {creativeTools.map((tool) => (
                      <a
                        key={tool.id}
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center p-4 rounded-lg border border-gray-200 hover:border-primary-500 transition-colors"
                      >
                        <img src={tool.icon} alt={tool.name} className="w-8 h-8" />
                        <div className="ml-4 flex-1">
                          <h3 className="text-sm font-medium text-gray-900">{tool.name}</h3>
                          <p className="text-sm text-gray-500">{tool.description}</p>
                        </div>
                        <ExternalLink className="w-5 h-5 text-gray-400" />
                      </a>
                    ))}
                  </div>
                )}

                {activeTab === 'ai' && (
                  <div className="grid grid-cols-1 gap-4">
                    {aiTools.map((tool) => (
                      <a
                        key={tool.id}
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center p-4 rounded-lg border border-gray-200 hover:border-primary-500 transition-colors"
                      >
                        <img src={tool.icon} alt={tool.name} className="w-8 h-8" />
                        <div className="ml-4 flex-1">
                          <h3 className="text-sm font-medium text-gray-900">{tool.name}</h3>
                          <p className="text-sm text-gray-500">{tool.description}</p>
                        </div>
                        <ExternalLink className="w-5 h-5 text-gray-400" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}