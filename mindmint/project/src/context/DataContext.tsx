import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { MoodEntry, JournalEntry, Habit } from '../types';
import { useAuth } from './AuthContext';

interface DataContextType {
  moodEntries: MoodEntry[];
  journalEntries: JournalEntry[];
  habits: Habit[];
  addMoodEntry: (entry: MoodEntry) => void;
  addJournalEntry: (entry: JournalEntry) => void;
  addHabit: (habit: Habit) => void;
  toggleHabit: (id: string) => void;
  deleteHabit: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

// Sample data for demonstration
const sampleMoodEntries: MoodEntry[] = [
  { mood: 'Good', note: 'Had a productive day at work', date: new Date(Date.now() - 86400000).toISOString(), userId: 'user1' },
  { mood: 'Excellent', note: 'Went for a nice walk in the park', date: new Date(Date.now() - 172800000).toISOString(), userId: 'user1' },
  { mood: 'Okay', note: 'Feeling a bit tired today', date: new Date(Date.now() - 259200000).toISOString(), userId: 'user1' }
];

const sampleJournalEntries: JournalEntry[] = [
  {
    title: 'Reflecting on Growth',
    content: "Today I realized how much I've grown over the past few months. The challenges I faced seemed overwhelming at first, but looking back, they were opportunities for me to develop resilience and learn more about myself. I'm grateful for the support system I have and the progress I've made in my mental health journey.",
    date: new Date(Date.now() - 86400000).toISOString(),
    userId: 'user1'
  },
  {
    title: 'Mindfulness Practice',
    content: "Started my morning with 10 minutes of meditation. It's amazing how this simple practice can set the tone for the entire day. I felt more centered and calm, even when unexpected challenges came up at work. I want to make this a consistent habit.",
    date: new Date(Date.now() - 259200000).toISOString(),
    userId: 'user1'
  }
];

const sampleHabits: Habit[] = [
  { id: '1', name: 'Drink 8 glasses of water', category: 'Health', completed: true, streak: 5, lastCompleted: new Date().toISOString(), userId: 'user1' },
  { id: '2', name: '10 minutes meditation', category: 'Mindfulness', completed: false, streak: 3, lastCompleted: null, userId: 'user1' },
  { id: '3', name: 'Write in journal', category: 'Mindfulness', completed: true, streak: 7, lastCompleted: new Date().toISOString(), userId: 'user1' },
  { id: '4', name: 'Exercise for 30 minutes', category: 'Health', completed: false, streak: 2, lastCompleted: null, userId: 'user1' },
  { id: '5', name: 'Read for 20 minutes', category: 'Learning', completed: true, streak: 4, lastCompleted: new Date().toISOString(), userId: 'user1' }
];

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [habits, setHabits] = useState<Habit[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    if (!user) return;

    const storedMoods = localStorage.getItem('mindmate_mood_entries');
    const storedJournals = localStorage.getItem('mindmate_journal_entries');
    const storedHabits = localStorage.getItem('mindmate_habits');

    try {
      if (storedMoods) {
        const allMoods = JSON.parse(storedMoods);
        setMoodEntries(allMoods.filter((entry: MoodEntry) => entry.userId === user.id));
      } else {
        setMoodEntries(user.id === 'user1' ? sampleMoodEntries : []);
      }

      if (storedJournals) {
        const allJournals = JSON.parse(storedJournals);
        setJournalEntries(allJournals.filter((entry: JournalEntry) => entry.userId === user.id));
      } else {
        setJournalEntries(user.id === 'user1' ? sampleJournalEntries : []);
      }

      if (storedHabits) {
        const allHabits = JSON.parse(storedHabits);
        setHabits(allHabits.filter((habit: Habit) => habit.userId === user.id));
      } else {
        setHabits(user.id === 'user1' ? sampleHabits : []);
      }
    } catch (error) {
      console.error('Error loading stored data:', error);
      setMoodEntries(user.id === 'user1' ? sampleMoodEntries : []);
      setJournalEntries(user.id === 'user1' ? sampleJournalEntries : []);
      setHabits(user.id === 'user1' ? sampleHabits : []);
    }
  }, [user]);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (!user) return;
    
    if (moodEntries.length > 0) {
      // Get all mood entries from storage and update only current user's data
      const storedMoods = localStorage.getItem('mindmate_mood_entries');
      let allMoods: MoodEntry[] = [];
      
      if (storedMoods) {
        allMoods = JSON.parse(storedMoods);
        // Remove current user's entries and add updated ones
        allMoods = allMoods.filter(entry => entry.userId !== user.id);
      }
      
      allMoods.push(...moodEntries);
      localStorage.setItem('mindmate_mood_entries', JSON.stringify(allMoods));
    }
  }, [moodEntries, user]);

  useEffect(() => {
    if (!user) return;
    
    if (journalEntries.length > 0) {
      const storedJournals = localStorage.getItem('mindmate_journal_entries');
      let allJournals: JournalEntry[] = [];
      
      if (storedJournals) {
        allJournals = JSON.parse(storedJournals);
        allJournals = allJournals.filter(entry => entry.userId !== user.id);
      }
      
      allJournals.push(...journalEntries);
      localStorage.setItem('mindmate_journal_entries', JSON.stringify(allJournals));
    }
  }, [journalEntries, user]);

  useEffect(() => {
    if (!user) return;
    
    if (habits.length > 0) {
      const storedHabits = localStorage.getItem('mindmate_habits');
      let allHabits: Habit[] = [];
      
      if (storedHabits) {
        allHabits = JSON.parse(storedHabits);
        allHabits = allHabits.filter(habit => habit.userId !== user.id);
      }
      
      allHabits.push(...habits);
      localStorage.setItem('mindmate_habits', JSON.stringify(allHabits));
    }
  }, [habits, user]);

  const addMoodEntry = (entry: MoodEntry) => {
    if (!user) return;
    const entryWithUser = { ...entry, userId: user.id };
    setMoodEntries(prev => [...prev, entryWithUser]);
  };

  const addJournalEntry = (entry: JournalEntry) => {
    if (!user) return;
    const entryWithUser = { ...entry, userId: user.id };
    setJournalEntries(prev => [...prev, entryWithUser]);
  };

  const addHabit = (habit: Habit) => {
    if (!user) return;
    const habitWithUser = { ...habit, userId: user.id };
    setHabits(prev => [...prev, habitWithUser]);
  };

  const toggleHabit = (id: string) => {
    setHabits(prev => prev.map(habit => {
      if (habit.id === id) {
        const newCompleted = !habit.completed;
        return {
          ...habit,
          completed: newCompleted,
          streak: newCompleted ? habit.streak + 1 : Math.max(0, habit.streak - 1),
          lastCompleted: newCompleted ? new Date().toISOString() : habit.lastCompleted
        };
      }
      return habit;
    }));
  };

  const deleteHabit = (id: string) => {
    setHabits(prev => prev.filter(habit => habit.id !== id));
  };

  const value = {
    moodEntries,
    journalEntries,
    habits,
    addMoodEntry,
    addJournalEntry,
    addHabit,
    toggleHabit,
    deleteHabit
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};