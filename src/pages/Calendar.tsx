import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, parseISO, isSameDay } from 'date-fns';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  ChevronLeft,
  ChevronRight,
  Filter,
  Plus,
  Instagram,
  Linkedin,
  Youtube,
  Globe,
  Mail,
  MessageCircle,
  MoreVertical,
  Calendar as CalendarIcon,
  Clock,
  Edit3,
  Trash2,
  Eye,
  Music,
  FileText,
  Image,
  Video as VideoIcon,
  CalendarDays,
  AlertCircle,
  X
} from 'lucide-react';

interface ScheduledPost {
  id: string;
  title: string;
  platforms: string[];
  scheduledFor: string;
  status: 'scheduled' | 'draft' | 'failed';
  type: 'image' | 'video' | 'article' | 'link' | 'podcast';
  thumbnail?: string;
  description?: string;
}

const samplePosts: ScheduledPost[] = [
  {
    id: '1',
    title: 'New Product Launch Announcement',
    platforms: ['instagram', 'linkedin'],
    scheduledFor: '2025-03-20T10:00:00Z',
    status: 'scheduled',
    type: 'image',
    thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=200&q=80',
    description: 'Introducing our latest innovation in sustainable technology...'
  },
  {
    id: '2',
    title: 'Q1 Industry Report',
    platforms: ['linkedin', 'wordpress'],
    scheduledFor: '2025-03-21T14:30:00Z',
    status: 'draft',
    type: 'article',
    description: 'Comprehensive analysis of market trends and insights...'
  },
  {
    id: '3',
    title: 'Behind the Scenes Video',
    platforms: ['instagram', 'youtube'],
    scheduledFor: '2025-03-22T09:00:00Z',
    status: 'scheduled',
    type: 'video',
    thumbnail: 'https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=200&q=80',
    description: 'Take a peek into our creative process...'
  },
  {
    id: '4',
    title: 'Weekly Tech Podcast Episode',
    platforms: ['spotify', 'youtube'],
    scheduledFor: '2025-03-19T16:00:00Z',
    status: 'scheduled',
    type: 'podcast',
    thumbnail: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=200&q=80',
    description: 'Discussion on emerging tech trends with special guest...'
  },
  {
    id: '5',
    title: 'Customer Success Story',
    platforms: ['linkedin', 'wordpress'],
    scheduledFor: '2025-03-23T11:00:00Z',
    status: 'scheduled',
    type: 'article',
    thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=200&q=80',
    description: 'How Company X achieved 200% growth using our platform...'
  },
  {
    id: '6',
    title: 'Team Culture Photos',
    platforms: ['instagram', 'linkedin'],
    scheduledFor: '2025-03-24T13:00:00Z',
    status: 'scheduled',
    type: 'image',
    thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=200&q=80',
    description: 'Celebrating our diverse and inclusive workplace...'
  },
  {
    id: '7',
    title: 'Product Tutorial Series',
    platforms: ['youtube', 'wordpress'],
    scheduledFor: '2025-03-25T15:30:00Z',
    status: 'draft',
    type: 'video',
    thumbnail: 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=200&q=80',
    description: 'Step-by-step guide to advanced features...'
  },
  {
    id: '8',
    title: 'Monthly Newsletter',
    platforms: ['mailchimp'],
    scheduledFor: '2025-03-26T08:00:00Z',
    status: 'scheduled',
    type: 'article',
    description: 'March edition featuring latest updates and tips...'
  },
  {
    id: '9',
    title: 'Community Spotlight',
    platforms: ['discord', 'instagram'],
    scheduledFor: '2025-03-27T17:00:00Z',
    status: 'scheduled',
    type: 'image',
    thumbnail: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=200&q=80',
    description: 'Featuring amazing projects from our community...'
  },
  {
    id: '10',
    title: 'Live Q&A Session',
    platforms: ['youtube', 'linkedin'],
    scheduledFor: '2025-03-28T19:00:00Z',
    status: 'scheduled',
    type: 'video',
    description: 'Interactive session with our product team...'
  },
  {
    id: '11',
    title: 'Spring Product Collection',
    platforms: ['instagram', 'linkedin'],
    scheduledFor: '2025-03-05T12:00:00Z',
    status: 'scheduled',
    type: 'image',
    thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200&q=80',
    description: 'Introducing our spring collection of sustainable products...'
  },
  {
    id: '12',
    title: 'Tech Talk Series',
    platforms: ['youtube', 'linkedin'],
    scheduledFor: '2025-03-07T15:00:00Z',
    status: 'scheduled',
    type: 'video',
    thumbnail: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=200&q=80',
    description: 'Deep dive into emerging technologies with industry experts...'
  },
  {
    id: '13',
    title: 'User Experience Workshop',
    platforms: ['linkedin', 'discord'],
    scheduledFor: '2025-03-12T14:00:00Z',
    status: 'scheduled',
    type: 'article',
    description: 'Join our interactive workshop on improving user experience...'
  },
  {
    id: '14',
    title: 'Sustainability Report',
    platforms: ['wordpress', 'linkedin'],
    scheduledFor: '2025-03-15T09:00:00Z',
    status: 'draft',
    type: 'article',
    description: 'Our commitment to environmental sustainability...'
  },
  {
    id: '15',
    title: 'Customer Appreciation Day',
    platforms: ['instagram', 'discord'],
    scheduledFor: '2025-03-18T11:00:00Z',
    status: 'scheduled',
    type: 'image',
    thumbnail: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=200&q=80',
    description: 'Celebrating our amazing customers...'
  }
];

const platformIcons = {
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
  wordpress: Globe,
  mailchimp: Mail,
  discord: MessageCircle,
  spotify: Music
};

const typeIcons = {
  article: FileText,
  image: Image,
  video: VideoIcon,
  podcast: Music,
  link: Globe
};

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedView, setSelectedView] = useState<'month' | 'week' | 'day'>('month');
  const [selectedPost, setSelectedPost] = useState<ScheduledPost | null>(null);
  const [posts, setPosts] = useState<ScheduledPost[]>(samplePosts);
  const [isDragging, setIsDragging] = useState(false);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const handlePreviousMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const handleTodayClick = () => {
    setCurrentDate(new Date());
  };

  const getPostsForDate = (date: Date) => {
    return posts.filter(post => {
      const postDate = parseISO(post.scheduledFor);
      return isSameDay(postDate, date);
    });
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (result: any) => {
    setIsDragging(false);

    if (!result.destination) return;

    const { source, destination, draggableId } = result;
    const [sourceDate] = source.droppableId.split('-');
    const [destDate] = destination.droppableId.split('-');

    if (sourceDate === destDate) return;

    setPosts(prevPosts => {
      return prevPosts.map(post => {
        if (post.id === draggableId) {
          const currentDate = parseISO(post.scheduledFor);
          const newDate = new Date(destDate);
          newDate.setHours(currentDate.getHours());
          newDate.setMinutes(currentDate.getMinutes());

          return {
            ...post,
            scheduledFor: newDate.toISOString(),
          };
        }
        return post;
      });
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="max-w-[1920px] mx-auto p-6">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Content Calendar</h1>
            <div className="flex items-center space-x-4">
              {/* View Selector */}
              <div className="flex items-center bg-white rounded-lg border border-gray-200 p-1">
                {['month', 'week', 'day'].map((view) => (
                  <button
                    key={view}
                    onClick={() => setSelectedView(view as 'month' | 'week' | 'day')}
                    className={`
                      px-4 py-2 text-sm font-medium rounded-md
                      ${selectedView === view
                        ? 'bg-primary-500 text-white'
                        : 'text-gray-500 hover:text-gray-700'
                      }
                    `}
                  >
                    {view.charAt(0).toUpperCase() + view.slice(1)}
                  </button>
                ))}
              </div>

              {/* Today Button */}
              <button 
                onClick={handleTodayClick}
                className="flex items-center space-x-2 px-4 py-2 bg-white text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <CalendarDays className="w-5 h-5" />
                <span>Today</span>
              </button>

              {/* Filter Button */}
              <button className="p-2 text-gray-500 hover:text-gray-700 border border-gray-200 rounded-lg">
                <Filter className="w-5 h-5" />
              </button>

              {/* New Post Button */}
              <button className="flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600">
                <Plus className="w-5 h-5" />
                <span>New Post</span>
              </button>
            </div>
          </div>

          {/* Calendar Navigation */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex items-center space-x-4">
              <h2 className="text-xl font-semibold text-gray-900">
                {format(currentDate, 'MMMM yyyy')}
              </h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handlePreviousMonth}
                  className="p-2 text-gray-500 hover:text-gray-700 border border-gray-200 rounded-lg"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNextMonth}
                  className="p-2 text-gray-500 hover:text-gray-700 border border-gray-200 rounded-lg"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {/* Day Headers */}
          <div className="grid grid-cols-7 border-b border-gray-200">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div
                key={day}
                className="px-4 py-3 text-sm font-medium text-gray-500 text-center"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 h-[800px]">
            {daysInMonth.map((date) => {
              const isCurrentMonth = isSameMonth(date, currentDate);
              const isCurrentDay = isToday(date);
              const dayPosts = getPostsForDate(date);
              const dateStr = format(date, 'yyyy-MM-dd');

              return (
                <Droppable droppableId={`${dateStr}-posts`} key={dateStr}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`
                        min-h-[120px] p-2 border-b border-r border-gray-200 relative
                        ${!isCurrentMonth && 'bg-gray-50'}
                        ${isCurrentDay && 'ring-2 ring-primary-500 ring-inset'}
                        ${snapshot.isDraggingOver && 'bg-primary-50'}
                      `}
                    >
                      <div className={`
                        flex items-center justify-center w-8 h-8 rounded-full mb-2
                        ${isCurrentDay ? 'bg-primary-500 text-white' : 'text-gray-500'}
                      `}>
                        {format(date, 'd')}
                      </div>

                      {/* Posts for the day */}
                      <div className="space-y-2">
                        {dayPosts.map((post, index) => (
                          <Draggable
                            key={post.id}
                            draggableId={post.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`
                                  w-full bg-white rounded-lg border p-2 
                                  ${snapshot.isDragging ? 'border-primary-500 shadow-lg' : 'border-gray-200'}
                                  hover:border-primary-500 transition-colors
                                `}
                                onClick={() => !isDragging && setSelectedPost(post)}
                              >
                                <div className="flex items-start space-x-2">
                                  {/* Post Type Icon */}
                                  <div className={`
                                    w-8 h-8 rounded-lg flex items-center justify-center
                                    ${post.status === 'failed' ? 'bg-red-100' : 'bg-gray-100'}
                                  `}>
                                    {post.status === 'failed' ? (
                                      <AlertCircle className="w-4 h-4 text-red-600" />
                                    ) : (
                                      React.createElement(
                                        typeIcons[post.type as keyof typeof typeIcons],
                                        { className: 'w-4 h-4 text-gray-600' }
                                      )
                                    )}
                                  </div>

                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                      {post.title}
                                    </p>
                                    
                                    <div className="flex items-center space-x-2 mt-1">
                                      <div className="flex items-center space-x-1">
                                        <Clock className="w-3 h-3 text-gray-400" />
                                        <p className="text-xs text-gray-500">
                                          {format(parseISO(post.scheduledFor), 'h:mm a')}
                                        </p>
                                      </div>

                                      <span className={`
                                        text-xs px-2 py-0.5 rounded-full
                                        ${getStatusColor(post.status)}
                                      `}>
                                        {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                                      </span>
                                    </div>

                                    <div className="flex items-center space-x-1 mt-1">
                                      {post.platforms.map((platform) => {
                                        const Icon = platformIcons[platform as keyof typeof platformIcons];
                                        return Icon ? (
                                          <Icon key={platform} className="w-4 h-4 text-gray-400" />
                                        ) : null;
                                      })}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    </div>
                  )}
                </Droppable>
              );
            })}
          </div>
        </div>

        {/* Post Preview Modal */}
        {selectedPost && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4">
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {selectedPost.title}
                      </h3>
                      <span className={`
                        text-xs px-2 py-0.5 rounded-full
                        ${getStatusColor(selectedPost.status)}
                      `}>
                        {selectedPost.status.charAt(0).toUpperCase() + selectedPost.status.slice(1)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-1 text-gray-500">
                        <CalendarIcon className="w-4 h-4" />
                        <span className="text-sm">
                          {format(parseISO(selectedPost.scheduledFor), 'MMM d, yyyy')}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">
                          {format(parseISO(selectedPost.scheduledFor), 'h:mm a')}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {selectedPost.thumbnail && (
                  <div className="mb-6">
                    <img
                      src={selectedPost.thumbnail}
                      alt="Post preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                )}

                {selectedPost.description && (
                  <p className="text-gray-600 mb-6">
                    {selectedPost.description}
                  </p>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {selectedPost.platforms.map((platform) => {
                      const Icon = platformIcons[platform as keyof typeof platformIcons];
                      return Icon ? (
                        <div
                          key={platform}
                          className="flex items-center space-x-1 px-3 py-1 bg-gray-100 rounded-full text-gray-700"
                        >
                          <Icon className="w-4 h-4" />
                          <span className="text-sm capitalize">{platform}</span>
                        </div>
                      ) : null;
                    })}
                  </div>

                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-500 hover:text-gray-700 border border-gray-200 rounded-lg">
                      <Eye className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-gray-700 border border-gray-200 rounded-lg">
                      <Edit3 className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-red-500 hover:text-red-700 border border-gray-200 rounded-lg">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DragDropContext>
  );
}