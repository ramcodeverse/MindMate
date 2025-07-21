import React from 'react';
import { BarChart3, TrendingUp, Calendar, Target } from 'lucide-react';
import { useData } from '../context/DataContext';

const Analytics: React.FC = () => {
  const { moodEntries, habits } = useData();

  // Calculate mood distribution
  const moodCounts = moodEntries.reduce((acc, entry) => {
    acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const moodData = [
    { mood: 'Excellent', count: moodCounts['Excellent'] || 0, color: 'bg-green-500', emoji: '😄' },
    { mood: 'Good', count: moodCounts['Good'] || 0, color: 'bg-blue-500', emoji: '😊' },
    { mood: 'Okay', count: moodCounts['Okay'] || 0, color: 'bg-yellow-500', emoji: '😐' },
    { mood: 'Not Great', count: moodCounts['Not Great'] || 0, color: 'bg-orange-500', emoji: '😕' },
    { mood: 'Terrible', count: moodCounts['Terrible'] || 0, color: 'bg-red-500', emoji: '😢' }
  ];

  const maxMoodCount = Math.max(...moodData.map(d => d.count), 1);

  // Calculate habit completion rates
  const habitStats = habits.map(habit => ({
    name: habit.name,
    category: habit.category,
    streak: habit.streak,
    completed: habit.completed
  }));

  // Calculate weekly mood trend
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date.toDateString();
  });

  const weeklyMoodData = last7Days.map(dateStr => {
    const entry = moodEntries.find(e => new Date(e.date).toDateString() === dateStr);
    const moodValue = entry ? getMoodValue(entry.mood) : null;
    return {
      date: new Date(dateStr).toLocaleDateString('en-US', { weekday: 'short' }),
      value: moodValue
    };
  });

  const insights = generateInsights(moodEntries, habits);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mb-4">
          <BarChart3 className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Analytics</h1>
        <p className="text-gray-600">
          Insights and patterns from your mood and habit tracking
        </p>
      </div>

      {/* Key Insights */}
      <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <TrendingUp className="w-6 h-6 mr-2 text-blue-500" />
          Key Insights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {insights.map((insight, index) => (
            <div key={index} className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
              <p className="text-gray-800">{insight}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Mood Distribution */}
        <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Mood Distribution</h2>
          
          {moodEntries.length === 0 ? (
            <div className="text-center py-8">
              <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No mood data available yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {moodData.map((item) => (
                <div key={item.mood} className="flex items-center space-x-4">
                  <span className="text-2xl">{item.emoji}</span>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700">{item.mood}</span>
                      <span className="text-sm text-gray-600">{item.count}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`${item.color} h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${(item.count / maxMoodCount) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Weekly Mood Trend */}
        <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6">7-Day Mood Trend</h2>
          
          {moodEntries.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No mood data available yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {weeklyMoodData.map((day, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 w-12">{day.date}</span>
                  <div className="flex-1 mx-4">
                    {day.value ? (
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-3 rounded-full"
                          style={{ width: `${(day.value / 5) * 100}%` }}
                        ></div>
                      </div>
                    ) : (
                      <div className="w-full bg-gray-100 rounded-full h-3 border-2 border-dashed border-gray-300"></div>
                    )}
                  </div>
                  <span className="text-sm text-gray-600 w-16 text-right">
                    {day.value ? `${day.value}/5` : 'No data'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Habit Performance */}
      <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <Target className="w-6 h-6 mr-2 text-green-500" />
          Habit Performance
        </h2>
        
        {habits.length === 0 ? (
          <div className="text-center py-8">
            <Target className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No habits tracked yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {habitStats.map((habit, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-2">{habit.name}</h3>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{habit.category}</span>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      habit.completed ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {habit.completed ? 'Complete' : 'Pending'}
                    </span>
                    <span className="text-orange-600">🔥 {habit.streak}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Helper functions
function getMoodValue(mood: string): number {
  const moodValues: Record<string, number> = {
    'Terrible': 1,
    'Not Great': 2,
    'Okay': 3,
    'Good': 4,
    'Excellent': 5
  };
  return moodValues[mood] || 3;
}

function generateInsights(moodEntries: any[], habits: any[]): string[] {
  const insights: string[] = [];
  
  if (moodEntries.length > 0) {
    const avgMood = moodEntries.reduce((sum, entry) => sum + getMoodValue(entry.mood), 0) / moodEntries.length;
    if (avgMood >= 4) {
      insights.push("🌟 You're maintaining a positive mood overall! Keep up the great work.");
    } else if (avgMood <= 2) {
      insights.push("💙 Your mood has been challenging lately. Consider reaching out for support.");
    } else {
      insights.push("📊 Your mood varies throughout tracking. Look for patterns in your journal entries.");
    }
  }

  if (habits.length > 0) {
    const completedHabits = habits.filter(h => h.completed).length;
    const completionRate = completedHabits / habits.length;
    
    if (completionRate >= 0.8) {
      insights.push("🎯 Excellent habit consistency! You're building strong routines.");
    } else if (completionRate >= 0.5) {
      insights.push("⚡ Good progress on habits. Focus on the ones you miss most often.");
    } else {
      insights.push("🎗️ Habit building takes time. Start with just 1-2 habits and build momentum.");
    }
  }

  if (insights.length === 0) {
    insights.push("📈 Keep tracking to see personalized insights about your wellbeing patterns!");
  }

  return insights;
}

export default Analytics;