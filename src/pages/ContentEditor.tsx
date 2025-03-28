import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import CharacterCount from '@tiptap/extension-character-count';
import Link from '@tiptap/extension-link';
import Highlight from '@tiptap/extension-highlight';
import WorkspaceSwitcher from '../components/WorkspaceSwitcher';
import MediaUpload from '../components/MediaUpload';
import PlatformSelector from '../components/PlatformSelector';
import EngagementChart from '../components/EngagementChart';
import {
  Bold,
  Italic,
  List,
  Heading1,
  Heading2,
  Link as LinkIcon,
  Image,
  Sparkles,
  Sliders,
  FileImage,
  Folder,
  RefreshCw,
  Video,
  Music,
  Scissors,
  Wand2,
  Share2,
  Clock,
  Calendar,
  BarChart2,
  Users,
  TrendingUp,
  Hash,
  AtSign,
  ExternalLink,
  Megaphone,
  Upload,
  PlusCircle,
  Globe,
} from 'lucide-react';
import type { ContentFormat } from '../types';

const formats: { id: ContentFormat; label: string; maxLength?: number; icon: React.ElementType }[] = [
  { id: 'article', label: 'Long-form Article', maxLength: 5000, icon: FileImage },
  { id: 'social', label: 'Social Copy', maxLength: 280, icon: Share2 },
  { id: 'static-graphic', label: 'Static Graphic', icon: Image },
  { id: 'motion-graphic', label: 'Motion Graphic', icon: Video },
  { id: 'video', label: 'Short Video', icon: Video },
  { id: 'audio', label: 'Audio/Podcast', icon: Music },
  { id: 'blog-to-video', label: 'Blog to Video', icon: Wand2 },
  { id: 'video-snippet', label: 'Video Snippet', icon: Scissors },
];

// Sample data for charts
const weekdayData = [
  { label: 'Mon', engagement: 75, previousEngagement: 70 },
  { label: 'Tue', engagement: 85, previousEngagement: 80 },
  { label: 'Wed', engagement: 90, previousEngagement: 85 },
  { label: 'Thu', engagement: 82, previousEngagement: 78 },
  { label: 'Fri', engagement: 78, previousEngagement: 75 },
  { label: 'Sat', engagement: 65, previousEngagement: 60 },
  { label: 'Sun', engagement: 60, previousEngagement: 55 },
];

const timeData = [
  { label: '6:00', engagement: 40, previousEngagement: 35 },
  { label: '9:00', engagement: 75, previousEngagement: 70 },
  { label: '12:00', engagement: 85, previousEngagement: 80 },
  { label: '15:00', engagement: 90, previousEngagement: 85 },
  { label: '18:00', engagement: 95, previousEngagement: 90 },
  { label: '21:00', engagement: 70, previousEngagement: 65 },
  { label: '0:00', engagement: 45, previousEngagement: 40 },
];

export default function ContentEditor() {
  const [selectedFormat, setSelectedFormat] = useState<ContentFormat>('article');
  const [activeTab, setActiveTab] = useState('planning');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [mentions, setMentions] = useState<string[]>([]);
  const [links, setLinks] = useState<string[]>([]);
  const [cta, setCta] = useState('');
  const [newTag, setNewTag] = useState('');
  const [newMention, setNewMention] = useState('');
  const [newLink, setNewLink] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({
        levels: [1, 2],
      }),
      CharacterCount.configure({
        limit: formats.find(f => f.id === selectedFormat)?.maxLength,
      }),
      Link.configure({
        openOnClick: false,
      }),
      Highlight,
    ],
    content: '',
  });

  const characterCount = editor?.storage.characterCount.characters() ?? 0;
  const maxLength = formats.find(f => f.id === selectedFormat)?.maxLength;

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
    }
  };

  const handleAddMention = () => {
    if (newMention && !mentions.includes(newMention)) {
      setMentions([...mentions, newMention]);
      setNewMention('');
    }
  };

  const handleAddLink = () => {
    if (newLink && !links.includes(newLink)) {
      setLinks([...links, newLink]);
      setNewLink('');
    }
  };

  const handleFileSelect = (files: FileList) => {
    // Handle file selection logic here
    console.log('Files selected:', files);
  };

  const handleLibraryOpen = () => {
    // Handle media library open logic here
    console.log('Opening media library');
  };

  const handlePluginsOpen = () => {
    // Handle plugins open logic here
    console.log('Opening plugins');
  };

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId)
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  const handleConnectPlatform = () => {
    // Handle connecting new platform
    console.log('Connecting new platform');
  };

  return (
    <div className="max-w-[1920px] mx-auto">
      <div className="grid grid-cols-12 gap-8">
        {/* Left Sidebar - Workspace Switcher */}
        <div className="col-span-2 border-r border-gray-200 h-screen p-4 sticky top-0">
          <WorkspaceSwitcher />
        </div>

        {/* Main Content */}
        <div className="col-span-10 py-8 px-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Content Workspace</h1>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
                Save Draft
              </button>
              <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
                Schedule
              </button>
            </div>
          </div>

          {/* Format Selector */}
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <div className="flex flex-wrap gap-2">
              {formats.map((format) => {
                const Icon = format.icon;
                return (
                  <button
                    key={format.id}
                    onClick={() => setSelectedFormat(format.id)}
                    className={`
                      flex items-center px-4 py-2 rounded-md text-sm font-medium
                      ${selectedFormat === format.id
                        ? 'bg-primary-100 text-primary-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }
                    `}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {format.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Tabs */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                {[
                  { id: 'planning', label: 'Planning', icon: BarChart2 },
                  { id: 'content', label: 'Content', icon: FileImage },
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`
                        flex items-center px-6 py-4 text-sm font-medium border-b-2 
                        ${activeTab === tab.id
                          ? 'border-primary-500 text-primary-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }
                      `}
                    >
                      <Icon className="w-5 h-5 mr-2" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'planning' && (
                <div className="space-y-8">
                  {/* Best Day to Post */}
                  <EngagementChart
                    data={weekdayData}
                    title="Best Day to Post"
                    description="Based on audience activity patterns"
                    recommendation="Recommended: Wednesday"
                    icon={Calendar}
                    showPreviousPeriod
                  />

                  {/* Best Time to Post */}
                  <EngagementChart
                    data={timeData}
                    title="Best Time to Post"
                    description="Based on historical engagement data"
                    recommendation="Peak engagement: 18:00"
                    icon={Clock}
                    showPreviousPeriod
                  />

                  {/* Schedule Button */}
                  <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                    <Calendar className="w-5 h-5" />
                    <span>Schedule for Best Time</span>
                  </button>
                </div>
              )}

              {activeTab === 'content' && (
                <div className="space-y-6">
                  {/* Title/Caption */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title / Caption
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter your title or caption..."
                    />
                  </div>

                  {/* Rich Text Editor */}
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="border-b border-gray-200 p-2">
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => editor?.chain().focus().toggleBold().run()}
                          className={`p-2 rounded hover:bg-gray-100 ${
                            editor?.isActive('bold') ? 'bg-gray-100' : ''
                          }`}
                        >
                          <Bold className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => editor?.chain().focus().toggleItalic().run()}
                          className={`p-2 rounded hover:bg-gray-100 ${
                            editor?.isActive('italic') ? 'bg-gray-100' : ''
                          }`}
                        >
                          <Italic className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => editor?.chain().focus().toggleBulletList().run()}
                          className={`p-2 rounded hover:bg-gray-100 ${
                            editor?.isActive('bulletList') ? 'bg-gray-100' : ''
                          }`}
                        >
                          <List className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
                          className={`p-2 rounded hover:bg-gray-100 ${
                            editor?.isActive('heading', { level: 1 }) ? 'bg-gray-100' : ''
                          }`}
                        >
                          <Heading1 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                          className={`p-2 rounded hover:bg-gray-100 ${
                            editor?.isActive('heading', { level: 2 }) ? 'bg-gray-100' : ''
                          }`}
                        >
                          <Heading2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => {
                            const url = window.prompt('Enter the URL');
                            if (url) {
                              editor
                                ?.chain()
                                .focus()
                                .extendMarkRange('link')
                                .setLink({ href: url })
                                .run();
                            }
                          }}
                          className={`p-2 rounded hover:bg-gray-100 ${
                            editor?.isActive('link') ? 'bg-gray-100' : ''
                          }`}
                        >
                          <LinkIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="p-4">
                      <EditorContent editor={editor} className="prose max-w-none min-h-[200px]" />
                      {maxLength && (
                        <div className="mt-2 text-sm text-gray-500">
                          {characterCount} / {maxLength} characters
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Media Upload */}
                  <MediaUpload
                    onFileSelect={handleFileSelect}
                    onLibraryOpen={handleLibraryOpen}
                    onPluginsOpen={handlePluginsOpen}
                  />

                  {/* Platforms to Publish To */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                      <Globe className="w-5 h-5 mr-2" />
                      Platforms to Publish To
                    </h3>
                    <PlatformSelector
                      selectedPlatforms={selectedPlatforms}
                      onPlatformToggle={handlePlatformToggle}
                      onConnectNew={handleConnectPlatform}
                    />
                  </div>

                  {/* Tags, Mentions, Links */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Tags */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <div className="flex items-center space-x-2">
                          <Hash className="w-4 h-4" />
                          <span>Tags</span>
                        </div>
                      </label>
                      <div className="space-y-2">
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="Add a tag..."
                          />
                          <button
                            onClick={handleAddTag}
                            className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                          >
                            <PlusCircle className="w-5 h-5" />
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {tags.map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Mentions */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <div className="flex items-center space-x-2">
                          <AtSign className="w-4 h-4" />
                          <span>Mentions</span>
                        </div>
                      </label>
                      <div className="space-y-2">
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            value={newMention}
                            onChange={(e) => setNewMention(e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="Add a mention..."
                          />
                          <button
                            onClick={handleAddMention}
                            className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                          >
                            <PlusCircle className="w-5 h-5" />
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {mentions.map((mention, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                            >
                              @{mention}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Links */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <div className="flex items-center space-x-2">
                          <ExternalLink className="w-4 h-4" />
                          <span>Links</span>
                        </div>
                      </label>
                      <div className="space-y-2">
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            value={newLink}
                            onChange={(e) => setNewLink(e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="Add a link..."
                          />
                          <button
                            onClick={handleAddLink}
                            className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                          >
                            <PlusCircle className="w-5 h-5" />
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {links.map((link, index) => (
                            <a
                              key={index}
                              href={link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2 py-1 bg-gray-100 text-primary-600 rounded-full text-sm hover:bg-gray-200"
                            >
                              {link}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Call to Action */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center space-x-2">
                        <Megaphone className="w-4 h-4" />
                        <span>Call to Action</span>
                      </div>
                    </label>
                    <input
                      type="text"
                      value={cta}
                      onChange={(e) => setCta(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter your call to action..."
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}