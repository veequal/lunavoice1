export const GAME_WORDS = [
  { id: 'dog', word: 'DOG', emoji: '🐶', hint: 'A furry friend that barks' },
  { id: 'apple', word: 'APPLE', emoji: '🍎', hint: 'A crunchy red fruit' },
  { id: 'sun', word: 'SUN', emoji: '☀️', hint: 'Bright and warm in the sky' },
  { id: 'happy', word: 'HAPPY', emoji: '😊', hint: 'How you feel when you smile big' },
]

export const MOCK_FEEDBACK = {
  excellent: ['Excellent pronunciation!', 'Amazing clarity!', 'Super star sounds!'],
  good: ['Great job — almost perfect!', 'Nice work — keep it up!', 'So close to a perfect score!'],
  improve: ['Try saying the R sound more clearly.', 'Slow down a little and try again.', 'Open your mouth a bit wider for clearer sounds.'],
}

export const FEATURED_GAMES = [
  {
    id: 'repeat-after-me',
    slug: 'repeat-after-me',
    title: 'Repeat After Me',
    description: 'Listen, repeat, and improve your pronunciation with fun AI speech challenges.',
    difficulty: 'Easy',
    xpReward: 50,
    icon: '🎤',
    gradient: 'from-violet-500/30 via-fuchsia-500/20 to-amber-400/25',
    borderGlow: 'group-hover:shadow-[0_0_32px_rgba(168,85,247,0.35)]',
  },
]

export const TUTORIAL_STEPS = [
  { id: 1, title: 'See the word', description: 'A word or object appears on screen', icon: 'sparkles' },
  { id: 2, title: 'Tap the mic', description: 'Press the microphone button', icon: 'mic' },
  { id: 3, title: 'Say it aloud', description: 'Repeat the word clearly', icon: 'volume' },
  { id: 4, title: 'AI analyzes', description: 'LunaVoice AI analyzes pronunciation', icon: 'brain' },
  { id: 5, title: 'Earn rewards', description: 'Earn stars, XP, and achievements', icon: 'trophy' },
]

export const ACHIEVEMENTS = [
  { id: 'first-word', label: 'First Word', emoji: '🌟', xp: 25 },
  { id: 'streak-3', label: '3-Day Streak', emoji: '🔥', xp: 40 },
  { id: 'perfect-score', label: 'Perfect Score', emoji: '💎', xp: 75 },
]
