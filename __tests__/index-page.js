import React from 'react'
import { render, cleanup } from '@testing-library/react'
import Index from '../pages/index'

afterEach(cleanup);

test('renders finding falcone', () => {
  const { getByText } = render(<Index />)
  const findingFalcone = getByText(
    /Finding Falcone!/
  )
  expect(findingFalcone).toBeInTheDocument()
})

test('renders footer', () => {
  const { getByText } = render(<Index />)
  const footer = getByText(
    /Coding Problem - www\.geektrust\.in\/finding-falcone/
  )
  expect(footer).toBeInTheDocument()
})