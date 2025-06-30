import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type ThemeMode = 'light' | 'dark'
export type Language = 'es' | 'en'

export interface NotificationState {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
  duration?: number
}

export interface UIState {
  theme: ThemeMode
  language: Language
  sidebarOpen: boolean
  loading: boolean
  notifications: NotificationState[]
  pageTitle: string
}

const initialState: UIState = {
  theme: 'light',
  language: 'es',
  sidebarOpen: true,
  loading: false,
  notifications: [],
  pageTitle: 'LTI ATS',
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.theme = action.payload
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
    },
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setPageTitle: (state, action: PayloadAction<string>) => {
      state.pageTitle = action.payload
    },
    addNotification: (state, action: PayloadAction<Omit<NotificationState, 'id'>>) => {
      const notification: NotificationState = {
        ...action.payload,
        id: Date.now().toString(),
      }
      state.notifications.push(notification)
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload
      )
    },
    clearNotifications: (state) => {
      state.notifications = []
    },
  },
})

export const {
  setTheme,
  toggleTheme,
  setLanguage,
  setSidebarOpen,
  toggleSidebar,
  setLoading,
  setPageTitle,
  addNotification,
  removeNotification,
  clearNotifications,
} = uiSlice.actions

export default uiSlice.reducer 