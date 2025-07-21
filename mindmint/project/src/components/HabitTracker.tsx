import React, { useState } from 'react';
import { Plus, CheckSquare, Square, Target, Trash2, Edit3 } from 'lucide-react';
import { useData } from '../context/DataContext';

const HabitTracker: React.FC = () => {
  const { habits, addHabit, toggleHabit, deleteHabit } = useData();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newHabitName, setNewHabitName] = useState('');
  const [newHabitCategory, setNewHabitCategory] = useState('Health');

  const categories = ['Health', 'Productivity', 'Mindfulness', 'Social', 'Learning', 'Creative'];

  const handleAddHabit = () => {
    if (!newHabitName.trim()) return;

    addHabit({
      id: Date.now().toString(),
      name: newHabitName.trim(),
      category: newHabitCategory,
      completed: false,
      streak: 0,
      lastCompleted: null
    });

    setNewHabitName('');
    setShowAddForm(false);
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Health: 'bg-green-100 text-green-800 border-green-200',
      Productivity: 'bg-blue-100 text-blue-800 border-blue-200',
      Mindfulness: 'bg-purple-100 text-purple-800 border-purple-200',
      Social: 'bg-pink-100 text-pink-800 border-pink-200',
      Learning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      Creative: 'bg-orange-100 text-orange-800 border-orange-200'
    };
    return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const completedToday = habits.filter(h => h.completed).length;
  const completionRate = habits.length > 0 ? Math.round((completedToday / habits.length) * 100) : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full mb-4">
          <Target className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Habit Tracker</h1>
        <p className="text-gray-600">
          Build lasting habits that support your wellbeing
        </p>
      </div>

      {/* Progress Overview */}
      <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {completedToday}/{habits.length}
            </div>
            <p className="text-gray-600">Today's Progress</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {completionRate}%
            </div>
            <p className="text-gray-600">Completion Rate</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {Math.max(...habits.map(h => h.streak), 0)}
            </div>
            <p className="text-gray-600">Best Streak</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Daily Progress</span>
            <span>{completedToday} of {habits.length} habits</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Add Habit Button */}
      <div className="flex justify-center">
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Habit</span>
        </button>
      </div>

      {/* Add Habit Form */}
      {showAddForm && (
        <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Create New Habit</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Habit Name
              </label>
              <input
                type="text"
                value={newHabitName}
                onChange={(e) => setNewHabitName(e.target.value)}
                placeholder="e.g., Drink 8 glasses of water"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={newHabitCategory}
                onChange={(e) => setNewHabitCategory(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleAddHabit}
                disabled={!newHabitName.trim()}
                className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white py-3 rounded-lg font-medium transition-colors"
              >
                Create Habit
              </button>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setNewHabitName('');
                }}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Habits List */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Today's Habits</h2>
          
          {habits.length === 0 ? (
            <div className="text-center py-12">
              <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">No habits yet</h3>
              <p className="text-gray-500">Start building positive habits by creating your first one!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {habits.map((habit) => (
                <div
                  key={habit.id}
                  className={`
                    p-6 border-2 rounded-xl transition-all duration-200 hover:shadow-md
                    ${habit.completed 
                      ? 'border-green-200 bg-green-50' 
                      : 'border-gray-200 hover:border-gray-300'
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => toggleHabit(habit.id)}
                        className={`
                          w-8 h-8 rounded-lg border-2 flex items-center justify-center transition-colors
                          ${habit.completed
                            ? 'bg-green-500 border-green-500 text-white'
                            : 'border-gray-300 hover:border-green-500'
                          }
                        `}
                      >
                        {habit.completed ? (
                          <CheckSquare className="w-5 h-5" />
                        ) : (
                          <Square className="w-5 h-5" />
                        )}
                      </button>
                      
                      <div>
                        <h3 className={`
                          font-medium text-lg
                          ${habit.completed ? 'text-green-800 line-through' : 'text-gray-800'}
                        `}>
                          {habit.name}
                        </h3>
                        <div className="flex items-center space-x-3 mt-1">
                          <span className={`
                            px-2 py-1 text-xs font-medium border rounded-full
                            ${getCategoryColor(habit.category)}
                          `}>
                            {habit.category}
                          </span>
                          <span className="text-sm text-gray-600">
                            🔥 {habit.streak} day streak
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                        <Edit3 className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => deleteHabit(habit.id)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HabitTracker;