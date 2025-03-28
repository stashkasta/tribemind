import React, { useState } from 'react';
import { Sparkles, X, Send, Maximize2, Minimize2 } from 'lucide-react';

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');

  return (
    <div className={`
      fixed bottom-4 right-4 z-50 
      ${isOpen ? 'w-full sm:w-96 max-w-[calc(100vw-2rem)]' : 'w-auto'}
      transition-all duration-200 ease-in-out
    `}>
      {/* Main Chat Window */}
      {isOpen && !isMinimized && (
        <div className="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden max-h-[80vh] flex flex-col">
          {/* Header */}
          <div className="bg-primary-500 p-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-white" />
              <h3 className="text-white font-medium">AI Assistant</h3>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setIsMinimized(true)}
                className="text-white hover:text-gray-200"
              >
                <Minimize2 className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="flex items-start space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 bg-gray-50 rounded-lg p-3">
                <p className="text-sm text-gray-800">
                  Hi! I'm your AI assistant. I can help you with:
                </p>
                <ul className="mt-2 text-sm text-gray-700 list-disc list-inside space-y-1">
                  <li>Content generation</li>
                  <li>Persona optimization</li>
                  <li>Writing suggestions</li>
                  <li>Content analysis</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-100 p-4 flex-shrink-0">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button 
                className="p-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Minimized State */}
      {isOpen && isMinimized && (
        <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-primary-500" />
            <span className="font-medium text-gray-700">AI Assistant</span>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setIsMinimized(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <Maximize2 className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-primary-500 text-white p-4 rounded-full shadow-lg hover:bg-primary-600 transition-colors duration-200"
        >
          <Sparkles className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}