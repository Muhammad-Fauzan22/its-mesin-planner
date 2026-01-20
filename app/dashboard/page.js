'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { redirect } from 'next/navigation'

export default function DashboardPage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      redirect('/')
    }
    setUser(user)
    setLoading(false)
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return redirect('/')
}