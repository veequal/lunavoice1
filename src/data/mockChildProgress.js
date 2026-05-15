export const childProgress = {
  stars: 12,
  nextRewardAt: 15,
  level: 4,
  streakDays: 5,
}

export const childBadges = [
  { id: 'b1', label: 'Bright Start', earned: true },
  { id: 'b2', label: 'Sound Scout', earned: true },
  { id: 'b3', label: 'Word Wizard', earned: true },
  { id: 'b4', label: 'Super Speaker', earned: false },
]

export const speechExercises = [
  {
    id: 'ex1',
    title: 'Tongue Twister',
    subtitle: 'Slow → fast',
    instruction: 'Say “Silly snakes slide slowly” three times. Start super slow, then speed up!',
    color: 'from-violet-500/30 to-fuchsia-500/20',
  },
  {
    id: 'ex2',
    title: 'Word Ladder',
    subtitle: 'One sound change',
    instruction: 'Start at “sun”, change one sound each step: sun → fun → fin → win.',
    color: 'from-cyan-500/25 to-sky-500/15',
  },
  {
    id: 'ex3',
    title: 'Picture Naming',
    subtitle: 'S-blends',
    instruction: 'Name 5 things you see that start with SP or ST (like “spoon”, “star”).',
    color: 'from-amber-500/25 to-orange-500/15',
  },
  {
    id: 'ex4',
    title: 'Echo Game',
    subtitle: 'Copy the clinician',
    instruction: 'Listen to the silly sentence, then say it the same way — loud, then quiet.',
    color: 'from-emerald-500/25 to-teal-500/15',
  },
]

export const encouragementCards = [
  { id: 'c1', text: 'You’re doing amazing — tiny tries make big changes!', mood: 'celebrate' },
  { id: 'c2', text: 'Great focus! Your sounds are getting clearer each day.', mood: 'calm' },
  { id: 'c3', text: 'High five! Ready for one more super strong try?', mood: 'energy' },
]
