export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
  lastLogin: string;
  isActive: boolean;
}

export interface MoodEntry {
  mood: string;
  note: string;
  date: string;
  userId: string;
}

export interface JournalEntry {
  title: string;
  content: string;
  date: string;
  userId: string;
}

export interface Habit {
  id: string;
  name: string;
  category: string;
  completed: boolean;
  streak: number;
  lastCompleted: string | null;
  userId: string;
}