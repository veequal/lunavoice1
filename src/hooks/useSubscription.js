import { useContext } from 'react'
import { SubscriptionContext } from '../context/subscriptionContext.js'

export function useSubscription() {
  return useContext(SubscriptionContext)
}
