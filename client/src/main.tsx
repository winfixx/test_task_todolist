import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { RootStore } from './stores/RootStore.ts'
import { QueryClient, QueryClientProvider } from 'react-query'

export const Store = createContext<RootStore>({} as RootStore)

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})
 
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Store.Provider value={new RootStore()}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Store.Provider>
    </QueryClientProvider>
  </React.StrictMode>,
)
