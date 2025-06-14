import { ChatMessage } from '../components/chat/types'

// Demo data for immediate testing
export const demoMessages: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'Alicia Chen',
    message:
      'Battery pack yield dropped to 89% yesterday. We need to investigate the thermal management issues in Line 3. @Miguel can you check the cooling system specs?',
    timestamp: '2025-06-03T09:15:00Z'
  },
  {
    id: 'msg-2',
    sender: 'Miguel Torres',
    message:
      'On it! I noticed some temperature spikes during the 2pm shift. Will run diagnostics and get back to you by EOD.',
    timestamp: '2025-06-03T09:18:00Z',
    threadId: 'msg-1'
  },
  {
    id: 'msg-3',
    sender: 'Samantha Lee',
    message:
      'Heads up team - supplier for lithium cathodes is delayed 2 days. This affects our Q2 targets. Need to discuss contingency plans.',
    timestamp: '2025-06-03T10:30:00Z'
  },
  {
    id: 'msg-4',
    sender: 'Rachel Adams',
    message:
      '@Samantha do we have backup suppliers? Final assembly is blocked without those components.',
    timestamp: '2025-06-03T10:45:00Z',
    threadId: 'msg-3'
  },
  {
    id: 'msg-5',
    sender: 'Shiv Doshi',
    message:
      'QA found 3 failed units this morning - all related to wiring harness installation. @Rachel can we review the assembly process?',
    timestamp: '2025-06-03T11:20:00Z'
  },
  {
    id: 'msg-6',
    sender: 'Rachel Adams',
    message:
      "Definitely. I'll audit the station and retrain if needed. Can you send me the failure reports?",
    timestamp: '2025-06-03T11:25:00Z',
    threadId: 'msg-5'
  },
  {
    id: 'msg-7',
    sender: 'Miguel Torres',
    message:
      'Update: Found the cooling pump was running at 75% capacity. Maintenance is replacing it now. Should be back online by 3pm.',
    timestamp: '2025-06-03T14:00:00Z',
    threadId: 'msg-1'
  },
  {
    id: 'msg-8',
    sender: 'Alicia Chen',
    message:
      "Great work Miguel! Let's monitor temps closely tomorrow. I'll be in early to check the first batch.",
    timestamp: '2025-06-03T14:15:00Z',
    threadId: 'msg-1'
  }
]
