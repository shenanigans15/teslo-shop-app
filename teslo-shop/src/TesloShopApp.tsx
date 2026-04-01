import { RouterProvider } from 'react-router'
import { appRouter } from './app.router'
import type { PropsWithChildren } from 'react'

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'sonner'

import { checkAuthAction } from './auth/actions/check-auth.action'

const queryClient = new QueryClient()

const CheckAuthProvider = ({ children }: PropsWithChildren) => {
  const { isLoading } = useQuery({
    queryKey: ['auth'],
    queryFn: checkAuthAction,
    retry: false,
  })

  if (isLoading) return <h1>Loading...</h1>

  return children
}

export const TesloShopApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />

      {/* Custom Provider */}
      <CheckAuthProvider>
        <RouterProvider router={appRouter} />
      </CheckAuthProvider>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
