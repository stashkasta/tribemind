import React, { useState } from 'react';
import { 
  Users, 
  Brain, 
  Heart, 
  Clock, 
  Calendar, 
  MapPin, 
  Briefcase, 
  GraduationCap,
  Lightbulb,
  CheckSquare,
  Users as UsersIcon,
  Cloud,
  DollarSign,
  User,
  Plus,
  Globe
} from 'lucide-react';
import type { Persona, OceanProfile, AffinityCategory, AffinityScore } from '../types';
import PersonalityTraitMeter from '../components/PersonalityTraitMeter';
import AffinityCard, { categoryConfig } from '../components/AffinityCard';
import AvatarUpload from '../components/AvatarUpload';
import NewPersonaCard from '../components/NewPersonaCard';
import MediaAffinitiesTab from '../components/MediaAffinitiesTab';

const initialOceanProfile: OceanProfile = {
  openness: { score: 50, confidence: 80 },
  conscientiousness: { score: 50, confidence: 80 },
  extraversion: { score: 50, confidence: 80 },
  agreeableness: { score: 50, confidence: 80 },
  neuroticism: { score: 50, confidence: 80 },
};

const initialAffinities: AffinityScore[] = [
  { category: 'financial', score: 50, interests: [] },
  { category: 'health', score: 50, interests: [] },
  { category: 'living', score: 50, interests: [] },
  { category: 'fitness', score: 50, interests: [] },
  { category: 'fashion', score: 50, interests: [] },
  { category: 'beauty', score: 50, interests: [] },
  { category: 'food', score: 50, interests: [] },
  { category: 'travel', score: 50, interests: [] },
  { category: 'career', score: 50, interests: [] },
  { category: 'music', score: 50, interests: [] },
  { category: 'movies', score: 50, interests: [] },
  { category: 'art', score: 50, interests: [] },
  { category: 'cars', score: 50, interests: [] }
];

const initialMediaAffinities = {
  socialMedia: [
    { platform: 'instagram', engagement: 'low', active: false },
    { platform: 'linkedin', engagement: 'low', active: false },
    { platform: 'youtube', engagement: 'low', active: false },
    { platform: 'twitter', engagement: 'low', active: false },
    { platform: 'facebook', engagement: 'low', active: false },
    { platform: 'snapchat', engagement: 'low', active: false },
    { platform: 'tiktok', engagement: 'low', active: false }
  ],
  webPresence: [
    { type: 'news', sites: [], frequency: 'monthly' },
    { type: 'blogs', sites: [], frequency: 'monthly' },
    { type: 'forums', sites: [], frequency: 'monthly' },
    { type: 'marketplaces', sites: [], frequency: 'monthly' },
    { type: 'professional', sites: [], frequency: 'monthly' },
    { type: 'entertainment', sites: [], frequency: 'monthly' }
  ],
  offlinePresence: [
    { type: 'events', locations: [], frequency: 'rarely' },
    { type: 'coworking', locations: [], frequency: 'rarely' },
    { type: 'cafes', locations: [], frequency: 'rarely' },
    { type: 'fitness', locations: [], frequency: 'rarely' },
    { type: 'retail', locations: [], frequency: 'rarely' }
  ]
};

const initialPersona: Persona = {
  id: '',
  name: '',
  avatar: undefined,
  demographics: {
    age: '',
    location: '',
    industry: '',
    role: '',
    education: '',
    salary_range: '',
  },
  psychographics: {
    ocean: initialOceanProfile,
    interests: [],
    goals: [],
    painPoints: [],
    values: [],
    content_preferences: [],
  },
  voice_profile: {
    tone: 'professional',
    style: '',
    vocabulary_level: 'intermediate',
    writing_style: [],
  },
  brand_guidelines: {
    colors: [],
    fonts: [],
    visual_style: [],
  },
  affinities: initialAffinities,
  mediaAffinities: initialMediaAffinities
};

const steps = [
  { id: 'basics', name: 'Basic Info', icon: User },
  { id: 'demographics', name: 'Demographics', icon: Users },
  { id: 'psychographics', name: 'Psychographics', icon: Brain },
  { id: 'media', name: 'Media', icon: Globe },
  { id: 'affinities', name: 'Affinities', icon: Heart },
];

const oceanTraits = [
  {
    key: 'openness',
    label: 'Openness',
    description: 'Reflects creativity, curiosity, and openness to new experiences. High scores indicate interest in innovation and novel ideas.',
    color: 'text-emerald-500',
    icon: Lightbulb,
  },
  {
    key: 'conscientiousness',
    label: 'Conscientiousness',
    description: 'Measures organization, responsibility, and goal-orientation. High scores suggest structured and methodical behavior.',
    color: 'text-blue-500',
    icon: CheckSquare,
  },
  {
    key: 'extraversion',
    label: 'Extraversion',
    description: 'Assesses sociability, energy levels, and assertiveness. High scores indicate strong social engagement and outgoing nature.',
    color: 'text-yellow-500',
    icon: UsersIcon,
  },
  {
    key: 'agreeableness',
    label: 'Agreeableness',
    description: 'Indicates compassion, cooperation, and social harmony. High scores suggest collaborative and supportive tendencies.',
    color: 'text-red-500',
    icon: Heart,
  },
  {
    key: 'neuroticism',
    label: 'Neuroticism',
    description: 'Evaluates emotional sensitivity and stress response. High scores may indicate stronger emotional reactions to content.',
    color: 'text-purple-500',
    icon: Cloud,
  },
];

// Sample personas for demonstration
const samplePersonas: Persona[] = [
  {
    id: '1',
    name: 'Tech Professional',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    demographics: {
      age: '25-34',
      location: 'Urban Areas',
      industry: 'Technology',
      role: 'Software Developer',
      education: "Bachelor's in Computer Science",
      salary_range: '$80,000 - $120,000',
    },
    psychographics: {
      ocean: initialOceanProfile,
      interests: ['Programming', 'Tech Gadgets', 'AI'],
      goals: ['Career Growth', 'Skill Development'],
      painPoints: ['Time Management', 'Work-Life Balance'],
      values: ['Innovation', 'Continuous Learning'],
      content_preferences: ['Technical Blogs', 'Video Tutorials'],
    },
    voice_profile: {
      tone: 'professional',
      style: 'technical',
      vocabulary_level: 'advanced',
      writing_style: ['Clear', 'Detailed'],
    },
    brand_guidelines: {
      colors: ['#000000', '#ffffff'],
      fonts: ['Roboto', 'Arial'],
      visual_style: ['Modern', 'Minimalist'],
    },
    affinities: initialAffinities,
    mediaAffinities: initialMediaAffinities,
  },
  {
    id: '2',
    name: 'Creative Designer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    demographics: {
      age: '22-30',
      location: 'Metropolitan',
      industry: 'Design',
      role: 'UI/UX Designer',
      education: "Bachelor's in Design",
      salary_range: '$60,000 - $90,000',
    },
    psychographics: {
      ocean: initialOceanProfile,
      interests: ['Design Trends', 'Art', 'Photography'],
      goals: ['Portfolio Growth', 'Creative Freedom'],
      painPoints: ['Client Communication', 'Project Deadlines'],
      values: ['Creativity', 'Aesthetics'],
      content_preferences: ['Visual Stories', 'Case Studies'],
    },
    voice_profile: {
      tone: 'creative',
      style: 'artistic',
      vocabulary_level: 'intermediate',
      writing_style: ['Visual', 'Expressive'],
    },
    brand_guidelines: {
      colors: ['#ff4d4d', '#333333'],
      fonts: ['Helvetica', 'Futura'],
      visual_style: ['Bold', 'Artistic'],
    },
    affinities: initialAffinities,
    mediaAffinities: initialMediaAffinities,
  },
];

function PersonaBuilder() {
  const [isCreating, setIsCreating] = useState(false);
  const [currentStep, setCurrentStep] = useState('basics');
  const [persona, setPersona] = useState<Persona>(initialPersona);
  const [personas, setPersonas] = useState<Persona[]>(samplePersonas);

  const updatePersona = (field: string, value: any) => {
    setPersona((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateOceanTrait = (trait: keyof OceanProfile, score: number) => {
    setPersona((prev) => ({
      ...prev,
      psychographics: {
        ...prev.psychographics,
        ocean: {
          ...prev.psychographics.ocean,
          [trait]: {
            ...prev.psychographics.ocean[trait],
            score,
          },
        },
      },
    }));
  };

  const updateAffinity = (category: AffinityCategory, updates: Partial<AffinityScore>) => {
    setPersona((prev) => ({
      ...prev,
      affinities: prev.affinities.map((affinity) =>
        affinity.category === category
          ? { ...affinity, ...updates }
          : affinity
      ),
    }));
  };

  if (!isCreating) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Personas</h1>
          <p className="mt-2 text-sm text-gray-500">
            Create and manage your audience personas to power your content strategy
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <NewPersonaCard onClick={() => setIsCreating(true)} />
          {personas.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
            >
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 flex items-center justify-center overflow-hidden">
                    {p.avatar ? (
                      <img 
                        src={p.avatar} 
                        alt={p.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{p.name}</h3>
                    <p className="text-sm text-gray-500">
                      {p.demographics.role} • {p.demographics.age}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Demographics</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{p.demographics.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Briefcase className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{p.demographics.industry}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Key Interests</h4>
                    <div className="flex flex-wrap gap-2">
                      {p.psychographics.interests.map((interest, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-primary-50 text-primary-600 text-sm rounded-full"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <button
                    onClick={() => {/* Handle edit */}}
                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors duration-200"
                  >
                    Edit Persona
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <div className="relative mb-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 mix-blend-multiply">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
            alt="Team collaboration"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative px-8 py-12">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold text-white mb-4">Create New Persona</h1>
            <p className="text-primary-100 text-lg">
              Build detailed audience personas to power your content strategy. Define demographics,
              psychographics, and interests to create highly targeted content.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Progress Steps */}
          <nav className="hidden sm:block mb-8">
            <ol className="flex items-center space-x-8">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = currentStep === step.id;
                const isCompleted = steps.indexOf({ id: currentStep, name: '', icon: User }) > steps.indexOf(step);

                return (
                  <li key={step.id} className={`flex-1 ${index !== steps.length - 1 ? 'relative' : ''}`}>
                    <div className="flex items-center">
                      <button
                        onClick={() => setCurrentStep(step.id)}
                        className={`flex items-center space-x-3 ${
                          isActive ? 'text-primary-600' : isCompleted ? 'text-gray-500' : 'text-gray-300'
                        }`}
                      >
                        <span className={`
                          flex items-center justify-center w-10 h-10 rounded-full border-2 
                          ${isActive 
                            ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/50 dark:text-primary-400' 
                            : isCompleted 
                              ? 'border-gray-500 bg-gray-50'
                              : 'border-gray-200'
                          }
                        `}>
                          <Icon className="w-5 h-5" />
                        </span>
                        <span className="font-medium">{step.name}</span>
                      </button>
                      {index < steps.length - 1 && (
                        <div className={`absolute top-5 left-full w-full h-0.5 ${
                          isCompleted ? 'bg-gray-200' : 'bg-transparent'
                        }`} />
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          </nav>

          {/* Form Content */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="p-8">
              {currentStep === 'basics' && (
                <div className="space-y-6">
                  <AvatarUpload
                    avatar={persona.avatar}
                    onChange={(avatar) => updatePersona('avatar', avatar)}
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Persona Name
                    </label>
                    <input
                      type="text"
                      value={persona.name}
                      onChange={(e) => updatePersona('name', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="e.g. Tech-Savvy Professional"
                    />
                  </div>
                </div>
              )}

              {currentStep === 'demographics' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span>Age Range</span>
                        </div>
                      </label>
                      <input
                        type="text"
                        value={persona.demographics.age}
                        onChange={(e) =>
                          updatePersona('demographics', {
                            ...persona.demographics,
                            age: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        placeholder="e.g. 25-34"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <div className="flex items-center space-x-2">
                          <DollarSign className="w-4 h-4 text-gray-400" />
                          <span>Salary Range</span>
                        </div>
                      </label>
                      <input
                        type="text"
                        value={persona.demographics.salary_range}
                        onChange={(e) =>
                          updatePersona('demographics', {
                            ...persona.demographics,
                            salary_range: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        placeholder="e.g. $75,000 - $100,000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span>Location</span>
                        </div>
                      </label>
                      <input
                        type="text"
                        value={persona.demographics.location}
                        onChange={(e) =>
                          updatePersona('demographics', {
                            ...persona.demographics,
                            location: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        placeholder="e.g. Urban Areas, US West Coast"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <div className="flex items-center space-x-2">
                          <Briefcase className="w-4 h-4 text-gray-400" />
                          <span>Industry</span>
                        </div>
                      </label>
                      <input
                        type="text"
                        value={persona.demographics.industry}
                        onChange={(e) =>
                          updatePersona('demographics', {
                            ...persona.demographics,
                            industry: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        placeholder="e.g. Technology"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span>Role</span>
                        </div>
                      </label>
                      <input
                        type="text"
                        value={persona.demographics.role}
                        onChange={(e) =>
                          updatePersona('demographics', {
                            ...persona.demographics,
                            role: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        placeholder="e.g. Product Manager"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <div className="flex items-center space-x-2">
                          <GraduationCap className="w-4 h-4 text-gray-400" />
                          <span>Education</span>
                        </div>
                      </label>
                      <input
                        type="text"
                        value={persona.demographics.education}
                        onChange={(e) =>
                          updatePersona('demographics', {
                            ...persona.demographics,
                            education: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        placeholder="e.g. Bachelor's in Computer Science"
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 'psychographics' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">Personality Profile</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                      Define the personality traits of your target audience using the OCEAN model.
                      These insights will help tailor content tone and style.
                    </p>
                    
                    <div className="grid grid-cols-1 gap-8">
                      {oceanTraits.map((trait) => (
                        <PersonalityTraitMeter
                          key={trait.key}
                          trait={trait.label}
                          description={trait.description}
                          value={persona.psychographics.ocean[trait.key as keyof OceanProfile]}
                          onChange={(value) => updateOceanTrait(trait.key as keyof OceanProfile, value)}
                          color={trait.color}
                          icon={trait.icon}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Additional Insights</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Key Interests
                        </label>
                        <textarea
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                          rows={3}
                          placeholder="List main interests and hobbies..."
                          value={persona.psychographics.interests.join(', ')}
                          onChange={(e) =>
                            updatePersona('psychographics', {
                              ...persona.psychographics,
                              interests: e.target.value.split(',').map((s) => s.trim()),
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Goals & Aspirations
                        </label>
                        <textarea
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                          rows={3}
                          placeholder="What are their primary goals?"
                          value={persona.psychographics.goals.join(', ')}
                          onChange={(e) =>
                            updatePersona('psychographics', {
                              ...persona.psychographics,
                              goals: e.target.value.split(',').map((s) => s.trim()),
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 'media' && (
                <MediaAffinitiesTab
                  mediaAffinities={persona.mediaAffinities}
                  onChange={(mediaAffinities) => updatePersona('mediaAffinities', mediaAffinities)}
                />
              )}

              {currentStep === 'affinities' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">Lifestyle Affinities</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                      Define your persona's interests and engagement levels across different lifestyle categories.
                      This helps in creating more targeted and relevant content.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {persona.affinities.map((affinity) => (
                        <AffinityCard
                          key={affinity.category}
                          category={affinity.category}
                          score={affinity.score}
                          interests={affinity.interests}
                          onScoreChange={(score) => updateAffinity(affinity.category, { score })}
                          onInterestsChange={(interests) => updateAffinity(affinity.category, { interests })}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Persona Preview
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 pb-4 border-b border-gray-100 dark:border-gray-700">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 flex items-center justify-center overflow-hidden">
                      {persona.avatar ? (
                        <img 
                          src={persona.avatar} 
                          alt="Avatar" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        {persona.name || 'Unnamed Persona'}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Draft</p>
                    </div>
                  </div>

                  {/* Demographics Preview */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Demographics</h4>
                    <div className="space-y-2">
                      {persona.demographics.salary_range && (
                        <div className="flex items-center space-x-2 text-sm">
                          <DollarSign className="w-4 h-4 text-gray-400" />
                          <span className="dark:text-gray-300">{persona.demographics.salary_range}</span>
                        </div>
                      )}
                      {persona.demographics.age && (
                        <div className="flex items-center space-x-2 text-sm">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="dark:text-gray-300">{persona.demographics.age}</span>
                        </div>
                      )}
                      {persona.demographics.location && (
                        <div className="flex items-center space-x-2 text-sm">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="dark:text-gray-300">{persona.demographics.location}</span>
                        </div>
                      )}
                      {persona.demographics.industry && (
                        <div className="flex items-center space-x-2 text-sm">
                          <Briefcase className="w-4 h-4 text-gray-400" />
                          <span className="dark:text-gray-300">{persona.demographics.industry}</span>
                        </div>
                      )}
                      {persona.demographics.role && (
                        <div className="flex items-center space-x-2 text-sm">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="dark:text-gray-300">{persona.demographics.role}</span>
                        </div>
                      )}
                      {persona.demographics.education && (
                        <div className="flex items-center space-x-2 text-sm">
                          <GraduationCap className="w-4 h-4 text-gray-400" />
                          <span className="dark:text-gray-300">{persona.demographics.education}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* OCEAN Profile Preview */}
                  {currentStep === 'psychographics' && (
                    <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Personality Profile</h4>
                      <div className="space-y-2">
                        {oceanTraits.map((trait) => {
                          const Icon = trait.icon;
                          const score = persona.psychographics.ocean[trait.key as keyof OceanProfile].score;
                          return (
                            <div key={trait.key} className="flex items-center space-x-2">
                              <Icon className={`w-4 h-4 ${trait.color}`} />
                              <div className="flex-1">
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-gray-600 dark:text-gray-300">{trait.label}</span>
                                  <span className="font-medium text-gray-900 dark:text-gray-100">{score}%</span>
                                </div>
                                <div className="mt-1 h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full rounded-full bg-current ${trait.color}`}
                                    style={{ width: `${score}%` }}
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Affinities Preview */}
                  {currentStep === 'affinities' && (
                    <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Top Affinities</h4>
                      <div className="space-y-2">
                        {persona.affinities
                          .sort((a, b) => b.score - a.score)
                          .slice(0, 3)
                          .map((affinity) => {
                            const config = categoryConfig[affinity.category];
                            const Icon = config.icon;
                            return (
                              <div key={affinity.category} className="flex items-center space-x-2">
                                <Icon className={`w-4 h-4 text-${config.color}-500`} />
                                <div className="flex-1">
                                  <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600 dark:text-gray-300">{config.label}</span>
                                    <span className="font-medium text-gray-900 dark:text-gray-100">{affinity.score}%</span>
                                  </div>
                                  <div className="mt-1 h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                    <div
                                      className={`h-full rounded-full bg-${config.color}-500`}
                                      style={{ width: `${affinity.score}%` }}
                                    />
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setIsCreating(false)}
                className="flex-1 px-4 py-3 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200">
                Save Persona
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonaBuilder;