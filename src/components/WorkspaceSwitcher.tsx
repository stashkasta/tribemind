import React, { useState } from 'react';
import { Plus, ChevronDown, Users, Settings, Search, Building2, Briefcase, Rocket, PenSquare } from 'lucide-react';
import type { Workspace } from '../types';

const sampleWorkspaces: Workspace[] = [
  {
    id: '1',
    name: 'Marketing Team',
    description: 'Main marketing workspace',
    icon: Building2,
    created_at: '2024-01-01',
    updated_at: '2024-03-15',
    members: 8,
    color: 'emerald'
  },
  {
    id: '2',
    name: 'Product Launch',
    description: 'Q2 product launch campaign',
    icon: Rocket,
    created_at: '2024-02-15',
    updated_at: '2024-03-14',
    members: 5,
    color: 'amber'
  },
  {
    id: '3',
    name: 'Blog Content',
    description: 'Technical blog articles',
    icon: PenSquare,
    created_at: '2024-03-01',
    updated_at: '2024-03-15',
    members: 3,
    color: 'sky'
  }
];

export default function WorkspaceSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState(sampleWorkspaces[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredWorkspaces = sampleWorkspaces.filter(workspace =>
    workspace.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    workspace.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative">
      {/* Current Workspace Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors"
      >
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-lg bg-${selectedWorkspace.color}-100 flex items-center justify-center`}>
            {React.createElement(selectedWorkspace.icon, { 
              className: `w-5 h-5 text-${selectedWorkspace.color}-600` 
            })}
          </div>
          <div className="text-left">
            <p className="font-medium text-gray-900">{selectedWorkspace.name}</p>
            <p className="text-sm text-gray-500">{selectedWorkspace.members} members</p>
          </div>
        </div>
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>

      {/* Workspace List Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-4">
            {/* Search Input */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search workspaces..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Workspace List */}
            <div className="space-y-1 max-h-[280px] overflow-y-auto">
              {filteredWorkspaces.map((workspace) => (
                <button
                  key={workspace.id}
                  onClick={() => {
                    setSelectedWorkspace(workspace);
                    setIsOpen(false);
                  }}
                  className={`
                    w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors
                    ${selectedWorkspace.id === workspace.id 
                      ? `bg-${workspace.color}-50 text-${workspace.color}-600` 
                      : 'hover:bg-gray-50'
                    }
                  `}
                >
                  <div className={`w-10 h-10 rounded-lg bg-${workspace.color}-100 flex items-center justify-center`}>
                    {React.createElement(workspace.icon, { 
                      className: `w-5 h-5 text-${workspace.color}-600` 
                    })}
                  </div>
                  <div>
                    <p className="font-medium">{workspace.name}</p>
                    <p className="text-sm text-gray-500">{workspace.description}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Workspace Actions */}
            <div className="border-t border-gray-200 mt-4 pt-4 space-y-1">
              <button className="w-full flex items-center space-x-2 p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                <Plus className="w-5 h-5" />
                <span>Create Workspace</span>
              </button>
              <button className="w-full flex items-center space-x-2 p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                <Users className="w-5 h-5" />
                <span>Manage Members</span>
              </button>
              <button className="w-full flex items-center space-x-2 p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                <Settings className="w-5 h-5" />
                <span>Workspace Settings</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}