import React from 'react'

import { render, screen, waitFor } from '@testing-library/react'

import { Payments } from './Payments'

import { useGetSubscriptionsQuery } from '@/shared/api/services/subscriptions/subscriptions.api'
import { payments } from '@/shared/ui/table/Table.stories'

jest.mock('@/shared/api/services/subscriptions/subscriptions.api', () => ({
  ...jest.requireActual('@/shared/api/services/subscriptions/subscriptions.api'),
  useGetSubscriptionsQuery: jest.fn(),
}))

describe('Payments', () => {
  it('renders the component with data', async () => {
    useGetSubscriptionsQuery.mockReturnValue({
      data: payments,
      isLoading: false,
      isError: false,
    })

    render(<Payments />)

    await waitFor(() => {
      expect(screen.getByTestId('table')).toBeInTheDocument()
    })
  })
})
