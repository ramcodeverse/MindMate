import React, { useState } from 'react';
import { BookOpen, Save, Calendar, Search } from 'lucide-react';
import { useData } from '../context/DataContext';

const Journal: React.FC = () => {
  const { journalEntries, addJournalEntry } = useData();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [savedToday, setSavedToday] = useState(false);

  const handleSave = () => {
    if (!content.trim()) return;

    addJournalEntry({
      title: title || `Entry - ${new Date().toLocaleDateString()}`,
      content: content.trim(),
      date: new Date().toISOString()
    });

    setTitle('');
    setContent('');
    setSavedToday(true);
    setTimeout(() => setSavedToday(false), 2000);
  };

  const filteredEntries = journalEntries.filter(entry =>
    entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const prompts = [
    "What am I grateful for today?",
    "What challenged me today and how did I handle it?",
    "What emotions am I experiencing right now?",
    "What would I tell my younger self?",
    "What are three things that made me smile today?",
    "How do I want to feel tomorrow?",
    "What's one thing I learned about myself recently?",
    "What boundaries do I need to set or maintain?"
  ];

  const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full mb-4">
          <BookOpen className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Personal Journal</h1>
        <p className="text-gray-600">
          A safe space for your thoughts, feelings, and reflections
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Writing Area */}
        <div className="space-y-6">
          {/* Journal Prompt */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
            <h3 className="font-semibold text-gray-800 mb-2">💭 Today's Reflection Prompt</h3>
            <p className="text-gray-700 italic">"{randomPrompt}"</p>
          </div>

          {/* Writing Form */}
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Entry Title (Optional)
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="What's on your mind today?"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Thoughts
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Start writing your thoughts here... Let your mind flow freely."
                  className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-500">
                    {content.length} characters
                  </span>
                  <span className="text-sm text-gray-500">
                    {Math.ceil(content.length / 5) || 0} words
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span>{new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                
                <button
                  onClick={handleSave}
                  disabled={!content.trim() || savedToday}
                  className={`
                    flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors
                    ${!content.trim()
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : savedToday
                      ? 'bg-green-500 text-white'
                      : 'bg-purple-500 hover:bg-purple-600 text-white'
                    }
                  `}
                >
                  <Save className="w-5 h-5" />
                  <span>{savedToday ? 'Saved!' : 'Save Entry'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Entries History */}
        <div className="space-y-6">
          {/* Search */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search your journal entries..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Entries List */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 max-h-96 overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Your Entries</h2>
              
              {filteredEntries.length === 0 ? (
                <div className="text-center py-8">
                  <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">
                    {searchTerm ? 'No entries found matching your search.' : 'No journal entries yet. Start writing your first entry!'}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredEntries.slice().reverse().map((entry, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-medium text-gray-800 truncate">
                          {entry.title}
                        </h3>
                        <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
                          {new Date(entry.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm line-clamp-3">
                        {entry.content.substring(0, 150)}
                        {entry.content.length > 150 ? '...' : ''}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journal;