const apiPrefix = '/api'

const account = {
  signup: '/signup'
} as const

export const routes = {
  buildApiPath: (route: string): string => {
    return apiPrefix + route
  },
  account
} as const
