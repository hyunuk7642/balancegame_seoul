import { create } from 'zustand'

type ItemType = 'AI' | 'HUMAN'

type ChoiceEvent = {
  round_index: number
  chosen_side: 'left' | 'right'
  item_type: ItemType
  timestamp: number
}

type SessionState = {
  session_id: string
  round_index: number
  total_rounds: number
  choices: ChoiceEvent[]
  incrementRound: () => void
  addChoice: (choice: ChoiceEvent) => void
  setTotalRounds: (n: number) => void
  reset: () => void
}

function generateSessionId() {
  const random_part = Math.random().toString(36).slice(2, 10)
  const time_part = Date.now().toString(36)
  return `sess_${time_part}_${random_part}`
}

export const useSessionStore = create<SessionState>((set) => ({
  session_id: generateSessionId(),
  round_index: 0,
  total_rounds: 0,
  choices: [],
  incrementRound: () => set((s) => ({ round_index: s.round_index + 1 })),
  addChoice: (choice) => set((s) => ({ choices: [...s.choices, choice] })),
  setTotalRounds: (n) => set({ total_rounds: n }),
  reset: () => set({ session_id: generateSessionId(), round_index: 0, choices: [] }),
}))


