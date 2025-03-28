export type AffinityCategory = 
  | 'financial'
  | 'health'
  | 'living'
  | 'fitness'
  | 'fashion'
  | 'beauty'
  | 'food'
  | 'travel'
  | 'career'
  | 'music'
  | 'movies'
  | 'art'
  | 'cars';

export interface AffinityScore {
  category: AffinityCategory;
  score: number;
  interests: string[];
}

export interface OceanScore {
  score: number;
  confidence: number;
}

export interface OceanProfile {
  openness: OceanScore;
  conscientiousness: OceanScore;
  extraversion: OceanScore;
  agreeableness: OceanScore;
  neuroticism: OceanScore;
}

export interface SocialMediaPresence {
  platform: string;
  engagement: 'low' | 'medium' | 'high';
  active: boolean;
}

export interface WebPresence {
  type: string;
  sites: string[];
  frequency: 'daily' | 'weekly' | 'monthly';
}

export interface OfflinePresence {
  type: string;
  locations: string[];
  frequency: 'rarely' | 'sometimes' | 'often';
}

export interface MediaAffinities {
  socialMedia: SocialMediaPresence[];
  webPresence: WebPresence[];
  offlinePresence: OfflinePresence[];
}

export interface Persona {
  id: string;
  name: string;
  avatar?: string;
  demographics: {
    age: string;
    location: string;
    industry: string;
    role: string;
    education: string;
    salary_range: string;
  };
  psychographics: {
    ocean: OceanProfile;
    interests: string[];
    goals: string[];
    painPoints: string[];
    values: string[];
    content_preferences: string[];
  };
  voice_profile: {
    tone: string;
    style: string;
    vocabulary_level: string;
    writing_style: string[];
  };
  brand_guidelines: {
    colors: string[];
    fonts: string[];
    visual_style: string[];
  };
  affinities: AffinityScore[];
  mediaAffinities: MediaAffinities;
}

export interface Workspace {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  created_at: string;
  updated_at: string;
  members: number;
  color: string;
}

export type ContentFormat = 'article' | 'social' | 'static-graphic' | 'motion-graphic' | 'video' | 'audio' | 'blog-to-video' | 'video-snippet';