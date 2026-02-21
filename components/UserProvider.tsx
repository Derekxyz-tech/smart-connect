'use client'

import { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react'

interface UserData {
  id: string
  nom: string
  prenom?: string
  email?: string
  role: 'admin' | 'prof' | 'eleve'
  code_login: string
  classe?: string | null
}

interface UserContextType {
  user: UserData | null
  loading: boolean
  refresh: () => Promise<void>
}

const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
  refresh: async () => {},
})

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const fetched = useRef(false)

  const fetchUser = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/me')
      const data = await res.json()
      setUser(data.user || null)
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!fetched.current) {
      fetched.current = true
      fetchUser()
    }
  }, [fetchUser])

  return (
    <UserContext.Provider value={{ user, loading, refresh: fetchUser }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}
