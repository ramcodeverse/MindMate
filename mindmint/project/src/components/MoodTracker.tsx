import React, { useState } from 'react';
import { Calendar, Save, Smile } from 'lucide-react';
import { useData } from '../context/DataContext';

const moodOptions = [
  { mood: 'Excellent', emoji: '😄', color: 'bg-green-500', description: 'Feeling amazing!' },
  { mood: 'Good', emoji: '😊', color: 'bg-blue-500', description: 'Pretty good day' },
  { mood: 'Okay', emoji: '😐', color: 'bg-yellow-500', description: 'Just okay' },
  { mood: 'Not Great', emoji: '😕', color: 'bg-orange-500', description: 'Having a tough time' },
  { mood: 'Terrible', emoji: '😢', color: 'bg-red-500', description: 'Really struggling' }
];

const MoodTracker: React.FC = () => {
  const { moodEntries, addMoodEntry } = useData();
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [savedToday, setSavedToday] = useState(false);
  const [showMoodMessage, setShowMoodMessage] = useState(false);

  const today = new Date().toDateString();
  const todayEntry = moodEntries.find(entry => 
    new Date(entry.date).toDateString() === today
  );

  const getMoodMessage = (mood: string) => {
    const messages = {
      'Excellent': {
        title: "You're absolutely glowing! ✨",
        message: "What an amazing day you're having! Your positive energy is contagious and you're truly thriving. Keep riding this wave of joy!",
        color: "from-green-400 to-emerald-600",
        textColor: "text-green-800",
        bgColor: "bg-green-50",
        borderColor: "border-green-200"
      },
      'Good': {
        title: "Great going! You're doing wonderful! 🌟",
        message: "You're in a really good space right now. This positive momentum is something to celebrate and build upon. You've got this!",
        color: "from-blue-400 to-blue-600",
        textColor: "text-blue-800",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200"
      },
      'Okay': {
        title: "Tomorrow is yours to shape! 🌅",
        message: "Today might feel neutral, but that's perfectly okay. Every day is a fresh start, and tomorrow holds endless possibilities for you to create something beautiful.",
        color: "from-yellow-400 to-orange-500",
        textColor: "text-yellow-800",
        bgColor: "bg-yellow-50",
        borderColor: "border-yellow-200"
      },
      'Not Great': {
        title: "This too shall pass 🌈",
        message: "\"The darkest nights produce the brightest stars.\" You're stronger than you know, and this difficult moment is temporary. Be gentle with yourself.",
        color: "from-orange-400 to-red-500",
        textColor: "text-orange-800",
        bgColor: "bg-orange-50",
        borderColor: "border-orange-200"
      },
      'Terrible': {
        title: "You are not alone in this storm ⛅",
        message: "\"Rock bottom became the solid foundation on which I rebuilt my life.\" - J.K. Rowling. Your pain is valid, and seeking help is a sign of strength, not weakness.",
        color: "from-red-400 to-pink-500",
        textColor: "text-red-800",
        bgColor: "bg-red-50",
        borderColor: "border-red-200"
      }
    };
    return messages[mood as keyof typeof messages];
  };
  const handleSave = () => {
    if (!selectedMood) return;

    addMoodEntry({
      mood: selectedMood,
      note,
      date: new Date().toISOString()
    });

    setSavedToday(true);
    setShowMoodMessage(true);
    setTimeout(() => setSavedToday(false), 2000);
    setTimeout(() => setShowMoodMessage(false), 8000);
  };

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    setShowMoodMessage(true);
    setTimeout(() => setShowMoodMessage(false), 6000);
  };
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mb-4">
          <Smile className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">How are you feeling?</h1>
        <p className="text-gray-600">
          Take a moment to check in with your emotional state
        </p>
      </div>

      {/* Mood Response Message */}
      {selectedMood && showMoodMessage && (
        <div className={`${getMoodMessage(selectedMood).bgColor} rounded-xl p-6 border-2 ${getMoodMessage(selectedMood).borderColor} transform transition-all duration-500 animate-pulse`}>
          <div className="text-center">
            <h3 className={`text-xl font-bold ${getMoodMessage(selectedMood).textColor} mb-3`}>
              {getMoodMessage(selectedMood).title}
            </h3>
            <p className={`${getMoodMessage(selectedMood).textColor} leading-relaxed text-lg`}>
              {getMoodMessage(selectedMood).message}
            </p>
          </div>
        </div>
      )}
      {/* Today's Status */}
      {todayEntry && (
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">
              {moodOptions.find(m => m.mood === todayEntry.mood)?.emoji}
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Already tracked today!</h3>
              <p className="text-gray-600">Mood: {todayEntry.mood}</p>
              {todayEntry.note && <p className="text-sm text-gray-500 mt-1">"{todayEntry.note}"</p>}
            </div>
          </div>
        </div>
      )}

      {/* Mood Selector */}
      <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Select Your Mood</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {moodOptions.map((option) => (
            <button
              key={option.mood}
              onClick={() => handleMoodSelect(option.mood)}
              className={`
                p-6 rounded-xl border-2 transition-all duration-200 hover:scale-105
                ${selectedMood === option.mood
                  ? 'border-blue-500 bg-blue-50 shadow-lg'
                  : 'border-gray-200 hover:border-gray-300'
                }
              `}
            >
              <div className="text-4xl mb-3">{option.emoji}</div>
              <h3 className="font-semibold text-gray-800">{option.mood}</h3>
              <p className="text-sm text-gray-600 mt-1">{option.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Note Section */}
      {selectedMood && (
        <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Add a Note (Optional)</h2>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="What's contributing to your mood today? Any thoughts or reflections..."
            className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
          
          <div className="flex items-center justify-between mt-6">
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
              disabled={savedToday}
              className={`
                flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors
                ${savedToday
                  ? 'bg-green-500 text-white'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
                }
              `}
            >
              <Save className="w-5 h-5" />
              <span>{savedToday ? 'Saved!' : 'Save Entry'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Recent Mood History */}
      {moodEntries.length > 0 && (
        <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Mood History</h2>
          <div className="space-y-4">
            {moodEntries.slice(-5).reverse().map((entry, index) => {
              const moodOption = moodOptions.find(m => m.mood === entry.mood);
              return (
                <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl">{moodOption?.emoji}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-800">{entry.mood}</span>
                      <span className="text-sm text-gray-500">
                        {new Date(entry.date).toLocaleDateString()}
                      </span>
                    </div>
                    {entry.note && (
                      <p className="text-sm text-gray-600 mt-1">"{entry.note}"</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodTracker;