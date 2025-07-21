import React from 'react';
import { 
  Heart, 
  BookOpen, 
  CheckSquare, 
  TrendingUp, 
  Calendar,
  Target,
  Clock,
  Award,
  Zap,
  Sun,
  Moon,
  Activity,
  Brain,
  Smile,
  Coffee,
  Droplets,
  Wind,
  Star,
  Users,
  MessageCircle,
  BarChart3
} from 'lucide-react';
import { useData } from '../context/DataContext';

const Dashboard: React.FC = () => {
  const { moodEntries, journalEntries, habits } = useData();

  const todaysMood = moodEntries[moodEntries.length - 1];
  const completedHabitsToday = habits.filter(habit => habit.completed).length;
  const moodStreak = calculateMoodStreak(moodEntries);
  const weeklyAverage = calculateWeeklyMoodAverage(moodEntries);
  const journalStreak = calculateJournalStreak(journalEntries);
  const totalWords = calculateTotalWords(journalEntries);
  const bestHabitStreak = Math.max(...habits.map(h => h.streak), 0);
  const weeklyHabitCompletion = calculateWeeklyHabitCompletion(habits);

  const mainStats = [
    {
      title: "Today's Mood",
      value: todaysMood ? getMoodEmoji(todaysMood.mood) : '😊',
      subtitle: todaysMood ? getMoodMessage(todaysMood.mood) : 'Track your mood',
      icon: Heart,
      color: 'text-pink-600',
      bg: 'bg-pink-50',
      border: 'border-pink-200'
    },
    {
      title: 'Habits Completed',
      value: `${completedHabitsToday}/${habits.length}`,
      subtitle: 'Today',
      icon: CheckSquare,
      color: 'text-green-600',
      bg: 'bg-green-50',
      border: 'border-green-200'
    },
    {
      title: 'Mood Streak',
      value: `${moodStreak} days`,
      subtitle: 'Keep it up!',
      icon: TrendingUp,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-200'
    },
    {
      title: 'Weekly Average',
      value: weeklyAverage.toFixed(1),
      subtitle: 'Out of 5',
      icon: Calendar,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      border: 'border-purple-200'
    }
  ];

  const detailedStats = [
    {
      title: 'Journal Streak',
      value: `${journalStreak} days`,
      subtitle: 'Writing consistently',
      icon: BookOpen,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50',
      border: 'border-indigo-200'
    },
    {
      title: 'Total Words',
      value: totalWords.toLocaleString(),
      subtitle: 'Written in journal',
      icon: MessageCircle,
      color: 'text-cyan-600',
      bg: 'bg-cyan-50',
      border: 'border-cyan-200'
    },
    {
      title: 'Best Habit Streak',
      value: `${bestHabitStreak} days`,
      subtitle: 'Personal record',
      icon: Award,
      color: 'text-yellow-600',
      bg: 'bg-yellow-50',
      border: 'border-yellow-200'
    },
    {
      title: 'Weekly Completion',
      value: `${weeklyHabitCompletion}%`,
      subtitle: 'Habit success rate',
      icon: Target,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200'
    },
    {
      title: 'Active Days',
      value: `${moodEntries.length} days`,
      subtitle: 'Total tracking',
      icon: Activity,
      color: 'text-orange-600',
      bg: 'bg-orange-50',
      border: 'border-orange-200'
    },
    {
      title: 'Mindful Minutes',
      value: `${calculateMindfulMinutes(habits)} min`,
      subtitle: 'This week',
      icon: Brain,
      color: 'text-violet-600',
      bg: 'bg-violet-50',
      border: 'border-violet-200'
    }
  ];

  const wellnessMetrics = [
    {
      title: 'Sleep Quality',
      value: '7.8/10',
      trend: '+0.5',
      icon: Moon,
      color: 'text-slate-600',
      bg: 'bg-slate-50'
    },
    {
      title: 'Energy Level',
      value: '8.2/10',
      trend: '+1.2',
      icon: Zap,
      color: 'text-amber-600',
      bg: 'bg-amber-50'
    },
    {
      title: 'Stress Level',
      value: '3.1/10',
      trend: '-0.8',
      icon: Wind,
      color: 'text-teal-600',
      bg: 'bg-teal-50'
    },
    {
      title: 'Hydration',
      value: '6/8 glasses',
      trend: 'On track',
      icon: Droplets,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    }
  ];

  const timeOfDayStats = [
    {
      time: 'Morning',
      mood: 'Energetic',
      icon: Sun,
      color: 'text-yellow-500',
      percentage: 85
    },
    {
      time: 'Afternoon',
      mood: 'Productive',
      icon: Coffee,
      color: 'text-orange-500',
      percentage: 72
    },
    {
      time: 'Evening',
      mood: 'Relaxed',
      icon: Moon,
      color: 'text-indigo-500',
      percentage: 68
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Good {getTimeOfDay()}! How are you feeling today?
        </h1>
        <p className="text-gray-600 text-lg">
          Take a moment to check in with yourself and track your wellbeing.
        </p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mainStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className={`bg-white rounded-xl p-6 shadow-lg border-2 ${stat.border} hover:shadow-xl transition-all duration-300 hover:scale-105`}>
              <div className={`inline-flex items-center justify-center w-14 h-14 ${stat.bg} rounded-xl mb-4 shadow-sm`}>
                <Icon className={`w-7 h-7 ${stat.color}`} />
              </div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                {stat.title}
              </h3>
              <p className="text-3xl font-bold text-gray-900 mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-gray-600">
                {stat.subtitle}
              </p>
            </div>
          );
        })}
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {detailedStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className={`bg-white rounded-xl p-6 shadow-lg border-2 ${stat.border} hover:shadow-xl transition-all duration-300`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`inline-flex items-center justify-center w-12 h-12 ${stat.bg} rounded-lg`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">
                {stat.title}
              </h3>
              <p className="text-sm text-gray-600">
                {stat.subtitle}
              </p>
            </div>
          );
        })}
      </div>

      {/* Wellness Metrics */}
      <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <Activity className="w-7 h-7 mr-3 text-blue-500" />
          Wellness Metrics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {wellnessMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div key={index} className={`${metric.bg} rounded-xl p-6 border border-gray-200`}>
                <div className="flex items-center justify-between mb-3">
                  <Icon className={`w-8 h-8 ${metric.color}`} />
                  <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                    metric.trend.startsWith('+') ? 'bg-green-100 text-green-700' :
                    metric.trend.startsWith('-') ? 'bg-red-100 text-red-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {metric.trend}
                  </span>
                </div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">{metric.title}</h3>
                <p className="text-xl font-bold text-gray-800">{metric.value}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Time of Day Analysis */}
      <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <Clock className="w-7 h-7 mr-3 text-purple-500" />
          Daily Energy Patterns
        </h2>
        <div className="space-y-6">
          {timeOfDayStats.map((period, index) => {
            const Icon = period.icon;
            return (
              <div key={index} className="flex items-center space-x-6">
                <div className="flex items-center space-x-4 w-48">
                  <Icon className={`w-6 h-6 ${period.color}`} />
                  <div>
                    <h3 className="font-semibold text-gray-800">{period.time}</h3>
                    <p className="text-sm text-gray-600">{period.mood}</p>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div 
                      className={`h-4 rounded-full bg-gradient-to-r ${
                        period.color.includes('yellow') ? 'from-yellow-400 to-yellow-600' :
                        period.color.includes('orange') ? 'from-orange-400 to-orange-600' :
                        'from-indigo-400 to-indigo-600'
                      }`}
                      style={{ width: `${period.percentage}%` }}
                    ></div>
                  </div>
                </div>
                <span className="text-lg font-bold text-gray-700 w-16 text-right">
                  {period.percentage}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <button className="p-6 border-2 border-dashed border-blue-300 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 group hover:scale-105">
            <Heart className="w-10 h-10 text-blue-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-gray-800 mb-2">Track Mood</h3>
            <p className="text-sm text-gray-600">Log how you're feeling right now</p>
          </button>
          
          <button className="p-6 border-2 border-dashed border-green-300 rounded-xl hover:border-green-400 hover:bg-green-50 transition-all duration-300 group hover:scale-105">
            <BookOpen className="w-10 h-10 text-green-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-gray-800 mb-2">Write Journal</h3>
            <p className="text-sm text-gray-600">Capture your thoughts and reflections</p>
          </button>
          
          <button className="p-6 border-2 border-dashed border-purple-300 rounded-xl hover:border-purple-400 hover:bg-purple-50 transition-all duration-300 group hover:scale-105">
            <CheckSquare className="w-10 h-10 text-purple-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-gray-800 mb-2">Check Habits</h3>
            <p className="text-sm text-gray-600">Mark off your daily habits</p>
          </button>

          <button className="p-6 border-2 border-dashed border-orange-300 rounded-xl hover:border-orange-400 hover:bg-orange-50 transition-all duration-300 group hover:scale-105">
            <BarChart3 className="w-10 h-10 text-orange-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-gray-800 mb-2">View Analytics</h3>
            <p className="text-sm text-gray-600">Explore your wellness patterns</p>
          </button>
        </div>
      </div>

      {/* Achievement Badges */}
      <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <Award className="w-7 h-7 mr-3 text-yellow-500" />
          Recent Achievements
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">7-Day Streak!</h3>
                <p className="text-sm text-gray-600">Consistent mood tracking</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Habit Master</h3>
                <p className="text-sm text-gray-600">100% completion rate</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Reflective Writer</h3>
                <p className="text-sm text-gray-600">1000+ words journaled</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Journal Entry */}
      {journalEntries.length > 0 && (
        <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <BookOpen className="w-7 h-7 mr-3 text-indigo-500" />
            Recent Reflection
          </h2>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
            <h3 className="font-semibold text-gray-800 mb-3">
              {journalEntries[journalEntries.length - 1].title}
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              {journalEntries[journalEntries.length - 1].content.substring(0, 300)}...
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {new Date(journalEntries[journalEntries.length - 1].date).toLocaleDateString()}
              </span>
              <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center">
                Read more →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Motivational Quote */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl p-8 shadow-lg text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Daily Inspiration</h2>
          <blockquote className="text-xl italic mb-4">
            {getRandomQuote()}
          </blockquote>
          <p className="text-purple-100">— {getQuoteAuthor()}</p>
        </div>
      </div>
    </div>
  );
};

// Helper functions
function getMoodEmoji(mood: string): string {
  const moodMap: Record<string, string> = {
    'Excellent': '😄',
    'Good': '😊',
    'Okay': '😐',
    'Not Great': '😕',
    'Terrible': '😢'
  };
  return moodMap[mood] || '😊';
}

function getMoodMessage(mood: string): string {
  const messages: Record<string, string> = {
    'Excellent': "You're absolutely glowing! ✨",
    'Good': "Great going! You're doing wonderful! 🌟",
    'Okay': "Tomorrow is yours to shape! 🌅",
    'Not Great': "This too shall pass 🌈",
    'Terrible': "You are not alone 💙"
  };
  return messages[mood] || "Keep going! 💪";
}
function getTimeOfDay(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'morning';
  if (hour < 17) return 'afternoon';
  return 'evening';
}

function calculateMoodStreak(entries: any[]): number {
  if (entries.length === 0) return 0;
  
  let streak = 0;
  const today = new Date();
  
  for (let i = entries.length - 1; i >= 0; i--) {
    const entryDate = new Date(entries[i].date);
    const daysDiff = Math.floor((today.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysDiff === streak) {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
}

function calculateJournalStreak(entries: any[]): number {
  if (entries.length === 0) return 0;
  
  let streak = 0;
  const today = new Date();
  
  for (let i = entries.length - 1; i >= 0; i--) {
    const entryDate = new Date(entries[i].date);
    const daysDiff = Math.floor((today.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysDiff === streak) {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
}

function calculateTotalWords(entries: any[]): number {
  return entries.reduce((total, entry) => {
    return total + entry.content.split(/\s+/).length;
  }, 0);
}

function calculateWeeklyMoodAverage(entries: any[]): number {
  if (entries.length === 0) return 0;
  
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  
  const recentEntries = entries.filter(entry => 
    new Date(entry.date) >= weekAgo
  );
  
  if (recentEntries.length === 0) return 0;
  
  const moodValues: Record<string, number> = {
    'Terrible': 1,
    'Not Great': 2,
    'Okay': 3,
    'Good': 4,
    'Excellent': 5
  };
  
  const sum = recentEntries.reduce((acc, entry) => 
    acc + (moodValues[entry.mood] || 3), 0
  );
  
  return sum / recentEntries.length;
}

function calculateWeeklyHabitCompletion(habits: any[]): number {
  if (habits.length === 0) return 0;
  
  const completedHabits = habits.filter(h => h.completed).length;
  return Math.round((completedHabits / habits.length) * 100);
}

function calculateMindfulMinutes(habits: any[]): number {
  const mindfulHabits = habits.filter(h => 
    h.category === 'Mindfulness' && h.completed
  );
  return mindfulHabits.length * 15; // Assume 15 minutes per mindful habit
}

function getRandomQuote(): string {
  const quotes = [
    "The greatest revolution of our generation is the discovery that human beings, by changing the inner attitudes of their minds, can change the outer aspects of their lives.",
    "You are never too old to set another goal or to dream a new dream.",
    "The only way to do great work is to love what you do.",
    "Believe you can and you're halfway there.",
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "The future belongs to those who believe in the beauty of their dreams.",
    "It is during our darkest moments that we must focus to see the light.",
    "Your mental health is a priority. Your happiness is essential. Your self-care is a necessity.",
    "Progress, not perfection, is the goal.",
    "You are stronger than you think and more capable than you imagine."
  ];
  return quotes[Math.floor(Math.random() * quotes.length)];
}

function getQuoteAuthor(): string {
  const authors = [
    "William James",
    "C.S. Lewis", 
    "Steve Jobs",
    "Theodore Roosevelt",
    "Winston Churchill",
    "Eleanor Roosevelt",
    "Aristotle",
    "Unknown",
    "Unknown",
    "Unknown"
  ];
  return authors[Math.floor(Math.random() * authors.length)];
}
export default Dashboard;