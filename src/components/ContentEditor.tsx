{/* Previous content remains the same, but updating the button colors from indigo/purple to primary (green) */}
{/* Updating line 384 */}
<button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
  Save Draft
</button>
{/* Updating line 386 */}
<button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
  Schedule
</button>
{/* Updating line 408 */}
${activeTab === tab.id
  ? 'border-primary-500 text-primary-600'
  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
}
{/* Updating line 445 */}
${selectedFormat === format.id
  ? 'bg-primary-100 text-primary-700'
  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
}
{/* Updating line 614 */}
<button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-md hover:from-primary-700 hover:to-primary-800">
  <Sparkles className="w-5 h-5" />
  <span>Generate Content</span>
</button>