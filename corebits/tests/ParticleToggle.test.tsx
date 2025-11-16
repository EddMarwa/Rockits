import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { describe, it, beforeEach, expect } from 'vitest'
// use a relative import to avoid path-alias resolution issues in the test runner/editor
import ParticleToggle from '../src/components/ParticleToggle'

describe('ParticleToggle', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('shows "Particles On" by default when no preference is stored', async () => {
    render(<ParticleToggle />)
    // initial render shows default; effect may update after mount
    expect(screen.getByText(/Particles On/i)).toBeInTheDocument()
  })

  it('reads persisted disabled state from localStorage', async () => {
    localStorage.setItem('particles_disabled', '1')
    render(<ParticleToggle />)
    await waitFor(() => expect(screen.getByText(/Particles Off/i)).toBeInTheDocument())
  })

  it('toggles state and writes to localStorage on click', async () => {
    render(<ParticleToggle />)
    const btn = screen.getByRole('button')
    expect(btn).toBeInTheDocument()
    // initially enabled
    expect(screen.getByText(/Particles On/i)).toBeInTheDocument()

    fireEvent.click(btn)
    await waitFor(() => expect(screen.getByText(/Particles Off/i)).toBeInTheDocument())
    expect(localStorage.getItem('particles_disabled')).toBe('1')

    // click again to re-enable
    fireEvent.click(btn)
    await waitFor(() => expect(screen.getByText(/Particles On/i)).toBeInTheDocument())
    expect(localStorage.getItem('particles_disabled')).toBe('0')
  })
})
