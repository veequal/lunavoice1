import {
  Bell,
  CalendarPlus,
  ClipboardList,
  FileLock2,
  Gamepad2,
  Heart,
  LayoutDashboard,
  Mic2,
  Trophy,
  TrendingUp,
  Users,
} from 'lucide-react'

export const doctorNavItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'patients', label: 'Patients', icon: Users },
  { id: 'sessions', label: 'Sessions', icon: ClipboardList },
  { id: 'records', label: 'Records', icon: FileLock2 },
  { id: 'notifications', label: 'Notifications', icon: Bell },
]

export const childNavItems = [
  { id: 'overview', label: 'Practice', icon: Mic2 },
  { id: 'games', label: 'Games', icon: Gamepad2 },
]

export const parentNavItems = [
  { id: 'overview', label: 'Home', icon: LayoutDashboard },
  { id: 'book-appointment', label: 'Book Appointment', icon: CalendarPlus },
  { id: 'favorite-doctors', label: 'Favorite Doctors', icon: Heart },
  { id: 'patients', label: 'Progress', icon: TrendingUp },
  { id: 'sessions', label: 'History', icon: ClipboardList },
  { id: 'records', label: 'Rewards', icon: Trophy },
  { id: 'notifications', label: 'Updates', icon: Bell },
]
