import React from 'react';
import { 
  Instagram, 
  Linkedin, 
  Youtube, 
  Twitter, 
  Facebook, 
  MessageCircle,
  Globe,
  Users,
  Building2,
  Coffee,
  Dumbbell,
  Store,
  BookOpen,
  Radio,
  Newspaper,
  MessageSquare,
  ShoppingBag,
  BarChart
} from 'lucide-react';
import type { MediaAffinities, SocialMediaPresence, WebPresence, OfflinePresence } from '../types';

interface MediaAffinitiesTabProps {
  mediaAffinities: MediaAffinities;
  onChange: (mediaAffinities: MediaAffinities) => void;
}

const socialPlatforms = [
  { id: 'instagram', name: 'Instagram', icon: Instagram },
  { id: 'linkedin', name: 'LinkedIn', icon: Linkedin },
  { id: 'youtube', name: 'YouTube', icon: Youtube },
  { id: 'twitter', name: 'Twitter/X', icon: Twitter },
  { id: 'facebook', name: 'Facebook', icon: Facebook },
  { id: 'snapchat', name: 'Snapchat', icon: MessageCircle },
  { id: 'tiktok', name: 'TikTok', icon: MessageSquare }
];

const webTypes = [
  { id: 'news', name: 'News Sites', icon: Newspaper },
  { id: 'blogs', name: 'Blogs', icon: BookOpen },
  { id: 'forums', name: 'Forums', icon: MessageSquare },
  { id: 'marketplaces', name: 'Marketplaces', icon: ShoppingBag },
  { id: 'professional', name: 'Professional', icon: BarChart },
  { id: 'entertainment', name: 'Entertainment', icon: Radio }
];

const offlineTypes = [
  { id: 'events', name: 'Events & Conferences', icon: Users },
  { id: 'coworking', name: 'Co-working Spaces', icon: Building2 },
  { id: 'cafes', name: 'Cafes', icon: Coffee },
  { id: 'fitness', name: 'Fitness Studios', icon: Dumbbell },
  { id: 'retail', name: 'Retail Stores', icon: Store }
];

export default function MediaAffinitiesTab({ mediaAffinities, onChange }: MediaAffinitiesTabProps) {
  const handleSocialMediaChange = (platform: string, field: keyof SocialMediaPresence, value: any) => {
    const updatedSocialMedia = mediaAffinities.socialMedia.map(p => 
      p.platform === platform ? { ...p, [field]: value } : p
    );
    onChange({ ...mediaAffinities, socialMedia: updatedSocialMedia });
  };

  const handleWebPresenceChange = (type: string, field: keyof WebPresence, value: any) => {
    const updatedWebPresence = mediaAffinities.webPresence.map(p =>
      p.type === type ? { ...p, [field]: value } : p
    );
    onChange({ ...mediaAffinities, webPresence: updatedWebPresence });
  };

  const handleOfflinePresenceChange = (type: string, field: keyof OfflinePresence, value: any) => {
    const updatedOfflinePresence = mediaAffinities.offlinePresence.map(p =>
      p.type === type ? { ...p, [field]: value } : p
    );
    onChange({ ...mediaAffinities, offlinePresence: updatedOfflinePresence });
  };

  return (
    <div className="space-y-8">
      {/* Social Media Presence */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Social Media Presence</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {socialPlatforms.map(platform => {
            const presence = mediaAffinities.socialMedia.find(p => p.platform === platform.id);
            const Icon = platform.icon;
            
            return (
              <div 
                key={platform.id}
                className="bg-white rounded-lg border border-gray-200 p-4 hover:border-primary-500 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Icon className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-900">{platform.name}</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={presence?.active || false}
                      onChange={(e) => handleSocialMediaChange(platform.id, 'active', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Engagement Level
                    </label>
                    <select
                      value={presence?.engagement || 'low'}
                      onChange={(e) => handleSocialMediaChange(platform.id, 'engagement', e.target.value)}
                      disabled={!presence?.active}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100 disabled:text-gray-500"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Web Presence */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Web Presence</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {webTypes.map(type => {
            const presence = mediaAffinities.webPresence.find(p => p.type === type.id);
            const Icon = type.icon;

            return (
              <div 
                key={type.id}
                className="bg-white rounded-lg border border-gray-200 p-4 hover:border-primary-500 transition-colors"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <Icon className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-900">{type.name}</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Frequency
                    </label>
                    <select
                      value={presence?.frequency || 'monthly'}
                      onChange={(e) => handleWebPresenceChange(type.id, 'frequency', e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Specific Sites
                    </label>
                    <textarea
                      value={presence?.sites.join(', ') || ''}
                      onChange={(e) => handleWebPresenceChange(
                        type.id,
                        'sites',
                        e.target.value.split(',').map(s => s.trim())
                      )}
                      placeholder="Enter specific sites..."
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      rows={2}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Offline Presence */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Offline Presence</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {offlineTypes.map(type => {
            const presence = mediaAffinities.offlinePresence.find(p => p.type === type.id);
            const Icon = type.icon;

            return (
              <div 
                key={type.id}
                className="bg-white rounded-lg border border-gray-200 p-4 hover:border-primary-500 transition-colors"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <Icon className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-900">{type.name}</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Frequency
                    </label>
                    <select
                      value={presence?.frequency || 'rarely'}
                      onChange={(e) => handleOfflinePresenceChange(type.id, 'frequency', e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="rarely">Rarely</option>
                      <option value="sometimes">Sometimes</option>
                      <option value="often">Often</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Specific Locations
                    </label>
                    <textarea
                      value={presence?.locations.join(', ') || ''}
                      onChange={(e) => handleOfflinePresenceChange(
                        type.id,
                        'locations',
                        e.target.value.split(',').map(s => s.trim())
                      )}
                      placeholder="Enter specific locations..."
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      rows={2}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}