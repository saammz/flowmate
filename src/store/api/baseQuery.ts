import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { auth } from '../../config/firebase'

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  prepareHeaders: async (headers) => {
    const user = auth.currentUser
    if (user) {
      try {
        const token = await user.getIdToken()
        headers.set('authorization', `Bearer ${token}`)
      } catch (error) {
        console.error('Error getting Firebase token:', error)
      }
    }
    return headers
  },
})

export default baseQuery