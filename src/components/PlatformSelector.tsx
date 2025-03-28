import React from 'react';
import { 
  Instagram, 
  Linkedin, 
  Video, 
  Mail, 
  Globe, 
  MessageCircle,
  Youtube,
  Music,
  PlusCircle,
  Check
} from 'lucide-react';

interface Platform {
  id: string;
  name: string;
  type: 'social' | 'newsletter' | 'blog' | 'community' | 'video' | 'custom';
  icon: React.ElementType;
  connected?: boolean;
  accountName?: string;
}

const platforms: Platform[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    type: 'social',
    icon: Instagram,
    connected: true,
    accountName: '@tribemind'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    type: 'social',
    icon: Linkedin,
    connected: true,
    accountName: 'TribeMind Official'
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    type: 'social',
    icon: Video,
    connected: false
  },
  {
    id: 'substack',
    name: 'Substack',
    type: 'newsletter',
    icon: Mail,
    connected: true,
    accountName: 'TribeMind Weekly'
  },
  {
    id: 'mailchimp',
    name: 'Mailchimp',
    type: 'newsletter',
    icon: Mail,
    connected: false
  },
  {
    id: 'wordpress',
    name: 'WordPress',
    type: 'blog',
    icon: Globe,
    connected: true,
    accountName: 'blog.tribemind.com'
  },
  {
    id: 'medium',
    name: 'Medium',
    type: 'blog',
    icon: Globe,
    connected: false
  },
  {
    id: 'discord',
    name: 'Discord',
    type: 'community',
    icon: MessageCircle,
    connected: true,
    accountName: 'TribeMind Community'
  },
  {
    id: 'youtube',
    name: 'YouTube',
    type: 'video',
    icon: Youtube,
    connected: false
  },
  {
    id: 'spotify',
    name: 'Spotify',
    type: 'video',
    icon: Music,
    connected: false
  }
];

interface PlatformSelectorProps {
  selectedPlatforms: string[];
  onPlatformToggle: (platformId: string) => void;
  onConnectNew: () => void;
}

export default function PlatformSelector({ 
  selectedPlatforms, 
  onPlatformToggle,
  onConnectNew 
}: PlatformSelectorProps) {
  const platformsByType = platforms.reduce((acc, platform) => {
    if (!acc[platform.type]) {
      acc[platform.type] = [];
    }
    acc[platform.type].push(platform);
    return acc;
  }, {} as Record<string, Platform[]>);

  const typeLabels = {
    social: 'Social Media',
    newsletter: 'Newsletters',
    blog: 'Blogs & CMS',
    community: 'Community Platforms',
    video: 'Video & Audio',
    custom: 'Custom Channels'
  };

  if (platforms.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No platforms connected</h3>
        <p className="text-gray-500 mb-4">Connect a platform to publish your content.</p>
        <button
          onClick={onConnectNew}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Connect Platform
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {Object.entries(platformsByType).map(([type, typePlatforms]) => (
        <div key={type}>
          <h3 className="text-lg font-medium text-gray-900 mb-3">
            {typeLabels[type as keyof typeof typeLabels]}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {typePlatforms.map((platform) => {
              const isSelected = selectedPlatforms.includes(platform.id);
              const Icon = platform.icon;
              
              return (
                <button
                  key={platform.id}
                  onClick={() => platform.connected && onPlatformToggle(platform.id)}
                  className={`
                    relative flex items-center p-4 rounded-lg border-2 transition-all
                    ${platform.connected 
                      ? isSelected
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-200'
                      : 'border-gray-200 opacity-50 cursor-not-allowed'
                    }
                  `}
                >
                  <div className="flex items-center flex-1">
                    <div className={`
                      w-10 h-10 rounded-lg flex items-center justify-center
                      ${platform.connected ? 'bg-gray-100' : 'bg-gray-50'}
                    `}>
                      <Icon className={`
                        w-5 h-5
                        ${platform.connected ? 'text-gray-700' : 'text-gray-400'}
                      `} />
                    </div>
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-gray-900">
                        {platform.name}
                      </h4>
                      {platform.connected ? (
                        <p className="text-xs text-gray-500">{platform.accountName}</p>
                      ) : (
                        <p className="text-xs text-gray-400">Not connected</p>
                      )}
                    </div>
                  </div>
                  {platform.connected && (
                    <div className={`
                      w-5 h-5 rounded-full border-2
                      ${isSelected 
                        ? 'border-primary-500 bg-primary-500 text-white'
                        : 'border-gray-300'
                      }
                    `}>
                      {isSelected && <Check className="w-4 h-4" />}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <button
        onClick={onConnectNew}
        className="mt-4 w-full flex items-center justify-center px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-primary-500 hover:text-primary-600 transition-colors"
      >
        <PlusCircle className="w-5 h-5 mr-2" />
        Connect New Platform
      </button>
    </div>
  );
}