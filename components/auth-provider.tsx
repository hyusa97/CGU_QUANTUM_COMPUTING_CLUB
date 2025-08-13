"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { type User, type AuthState, mockAuth } from "@/lib/auth"

const AuthContext = createContext<
  AuthState & {
    signIn: (email: string, password: string) => Promise<void>
    signOut: () => Promise<void>
  }
>({
  user: null,
  loading: true,
  error: null,
  signIn: async () => {},
  signOut: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Check for existing user on mount
    const currentUser = mockAuth.getCurrentUser()
    setUser(currentUser)
    setLoading(false)
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true)
      setError(null)
      const user = await mockAuth.signInWithEmailAndPassword(email, password)
      setUser(user)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed")
      throw err
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setLoading(true)
      await mockAuth.signOut()
      setUser(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Logout failed")
    } finally {
      setLoading(false)
    }
  }

  return <AuthContext.Provider value={{ user, loading, error, signIn, signOut }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
