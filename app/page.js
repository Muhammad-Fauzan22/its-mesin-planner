'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { 
  BookOpen, Calendar, Target, CheckCircle, 
  BarChart3, Users, Clock, Award,
  LogIn, UserPlus, Home, Settings,
  ChevronRight, Download, Share2, Filter,
  Search, Plus, Edit, Trash2
} from 'lucide-react'
import toast from 'react-hot-toast'

export default function HomePage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [mataKuliah, setMataKuliah] = useState([])
  const [rencana, setRencana] = useState({})
  const [search, setSearch] = useState('')

  // Check login status
  useEffect(() => {
    checkUser()
    fetchMataKuliah()
  }, [])

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
    setLoading(false)
  }

  const fetchMataKuliah = async () => {
    const { data, error } = await supabase
      .from('mata_kuliah')
      .select('*')
      .order('semester', { ascending: true })
    
    if (!error) {
      setMataKuliah(data)
    }
  }

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    })
    if (error) toast.error('Login gagal')
  }

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    })
    if (error) toast.error('Registrasi gagal')
  }

  const filteredMK = mataKuliah.filter(mk => 
    mk.nama_mk.toLowerCase().includes(search.toLowerCase()) ||
    mk.kode_mk.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-its-red"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Header */}
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0 flex items-center">
                  <div className="h-8 w-8 bg-its-red rounded-lg"></div>
                  <span className="ml-2 text-xl font-bold text-gray-900">
                    ITS Mesin Planner
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleLogin}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-its-red hover:bg-red-700"
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Rencanakan Studi</span>
              <span className="block text-its-red">Teknik Mesin ITS</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Sistem otomatis untuk merencanakan, memantau, dan mengoptimalkan perjalanan akademik Anda di Departemen Teknik Mesin ITS
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <button
                  onClick={handleLogin}
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-its-red hover:bg-red-700 md:py-4 md:text-lg md:px-10"
                >
                  <LogIn className="mr-2 h-5 w-5" />
                  Mulai dengan Google
                </button>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <button
                  onClick={handleSignUp}
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-its-red bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                >
                  <UserPlus className="mr-2 h-5 w-5" />
                  Daftar dengan GitHub
                </button>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mt-16">
            <h2 className="text-3xl font-extrabold text-gray-900 text-center">
              Semua yang Anda Butuhkan
            </h2>
            <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: <BookOpen className="h-8 w-8" />,
                  title: 'Database RPS Lengkap',
                  desc: 'Semua mata kuliah teknik mesin ITS tersedia'
                },
                {
                  icon: <Calendar className="h-8 w-8" />,
                  title: 'Perencanaan Otomatis',
                  desc: 'Generate rencana studi berdasarkan target IPK'
                },
                {
                  icon: <Target className="h-8 w-8" />,
                  title: 'Tracking Real-time',
                  desc: 'Pantau progress kelulusan secara live'
                },
                {
                  icon: <BarChart3 className="h-8 w-8" />,
                  title: 'Analisis IPK',
                  desc: 'Simulasi dan prediksi IPK dengan berbagai skenario'
                }
              ].map((feature, idx) => (
                <div key={idx} className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="text-its-red mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-gray-500">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Dashboard for logged in users
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="flex">
        <div className="w-64 bg-white shadow-lg min-h-screen">
          <div className="p-6">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-its-red rounded-lg"></div>
              <span className="ml-3 text-xl font-bold">ITS Mesin Planner</span>
            </div>
            <div className="mt-8">
              {[
                { id: 'dashboard', icon: <Home />, label: 'Dashboard' },
                { id: 'plan', icon: <Calendar />, label: 'Rencana Studi' },
                { id: 'courses', icon: <BookOpen />, label: 'Mata Kuliah' },
                { id: 'transcript', icon: <Award />, label: 'Transkrip' },
                { id: 'progress', icon: <CheckCircle />, label: 'Progress' },
                { id: 'analytics', icon: <BarChart3 />, label: 'Analisis' },
                { id: 'settings', icon: <Settings />, label: 'Pengaturan' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center px-4 py-3 mt-2 rounded-lg ${activeTab === item.id ? 'bg-its-red text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                  {activeTab === item.id && (
                    <ChevronRight className="ml-auto h-4 w-4" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {activeTab === 'dashboard' && 'Dashboard'}
                {activeTab === 'plan' && 'Rencana Studi'}
                {activeTab === 'courses' && 'Mata Kuliah'}
                {activeTab === 'transcript' && 'Transkrip Nilai'}
                {activeTab === 'progress' && 'Progress Kelulusan'}
                {activeTab === 'analytics' && 'Analisis Akademik'}
                {activeTab === 'settings' && 'Pengaturan'}
              </h1>
              <p className="text-gray-600">
                Selamat datang, {user.email}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Download className="h-5 w-5" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Share2 className="h-5 w-5" />
              </button>
              <button
                onClick={() => supabase.auth.signOut()}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Content based on active tab */}
          {activeTab === 'dashboard' && (
            <DashboardContent user={user} />
          )}
          
          {activeTab === 'courses' && (
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Database Mata Kuliah</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Cari mata kuliah..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10 pr-4 py-2 border rounded-lg w-64"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMK.map((mk) => (
                  <div key={mk.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-sm font-medium text-its-red">
                          {mk.kode_mk}
                        </span>
                        <h3 className="font-semibold mt-1">{mk.nama_mk}</h3>
                      </div>
                      <span className="bg-its-blue text-white text-sm px-2 py-1 rounded">
                        {mk.sks} SKS
                      </span>
                    </div>
                    <div className="mt-3 flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-1" />
                      Semester {mk.semester}
                    </div>
                    {mk.prasyarat && (
                      <div className="mt-2 text-sm text-gray-600">
                        <span className="font-medium">Prasyarat:</span> {mk.prasyarat}
                      </div>
                    )}
                    <div className="mt-4 flex space-x-2">
                      <button className="text-sm text-its-red hover:underline">
                        Detail
                      </button>
                      <button className="text-sm text-its-blue hover:underline">
                        Tambah ke Rencana
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function DashboardContent({ user }) {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total SKS', value: '0/144', icon: <BookOpen />, color: 'bg-blue-500' },
          { title: 'IPK Saat Ini', value: '0.00', icon: <Award />, color: 'bg-green-500' },
          { title: 'Progress', value: '0%', icon: <Target />, color: 'bg-yellow-500' },
          { title: 'Deadline', value: '-', icon: <Clock />, color: 'bg-red-500' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <div className="text-white">
                  {stat.icon}
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-4">Aksi Cepat</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Buat Rencana Baru', icon: <Plus />, color: 'bg-its-red' },
            { label: 'Input Nilai', icon: <Edit />, color: 'bg-green-500' },
            { label: 'Cek Prasyarat', icon: <CheckCircle />, color: 'bg-blue-500' },
            { label: 'Export PDF', icon: <Download />, color: 'bg-purple-500' },
          ].map((action, idx) => (
            <button
              key={idx}
              className={`${action.color} text-white p-4 rounded-lg hover:opacity-90 transition-opacity`}
            >
              <div className="flex flex-col items-center">
                {action.icon}
                <span className="mt-2 font-medium">{action.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Semester Progress */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-4">Progress per Semester</h2>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((semester) => (
            <div key={semester} className="flex items-center">
              <span className="w-24">Semester {semester}</span>
              <div className="flex-1 bg-gray-200 rounded-full h-4 ml-4">
                <div 
                  className="bg-its-red rounded-full h-4" 
                  style={{ width: '0%' }}
                ></div>
              </div>
              <span className="ml-4 w-16 text-right">0%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}