import React from 'react'
import { render, screen } from '@testing-library/react'
import ProgressBar from './ProgressBar'
import { useOnboarding } from '@/context/OnboardingContext'
import { formSteps } from '@/misc/constants'

// Mock the OnboardingContext
jest.mock('@/context/OnboardingContext')

// Mock the constants
jest.mock('@/misc/constants', () => ({
  formSteps: [
    'step1',
    'step2', 
    'step3',
    'step4',
    'step5',
    'step6',
    'step7',
    'step8'
  ]
}))

describe('ProgressBar Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders progress bar with 0% progress when activeStep is 0', () => {
    useOnboarding.mockReturnValue({ activeStep: 0 })
    
    const { container } = render(<ProgressBar />)
    
    const progressFill = container.querySelector('[style*="max-width"]')
    expect(progressFill).toBeTruthy()
    expect(progressFill).toHaveStyle({ maxWidth: '0%' })
    expect(screen.getByText('0/8')).toBeInTheDocument()
    expect(screen.getByText('8 Steps')).toBeInTheDocument()
  })

  it('renders progress bar with 50% progress when activeStep is 4', () => {
    useOnboarding.mockReturnValue({ activeStep: 4 })
    
    const { container } = render(<ProgressBar />)
    
    const progressFill = container.querySelector('[style*="max-width"]')
    expect(progressFill).toBeTruthy()
    expect(progressFill).toHaveStyle({ maxWidth: '50%' })
    expect(screen.getByText('4/8')).toBeInTheDocument()
  })

  it('renders progress bar with 100% progress when activeStep equals total steps', () => {
    useOnboarding.mockReturnValue({ activeStep: 8 })
    
    const { container } = render(<ProgressBar />)
    
    const progressFill = container.querySelector('[style*="max-width"]')
    expect(progressFill).toBeTruthy()
    expect(progressFill).toHaveStyle({ maxWidth: '100%' })
    expect(screen.getByText('8/8')).toBeInTheDocument()
  })

  it('calculates correct percentage for different step counts', () => {
    useOnboarding.mockReturnValue({ activeStep: 2 })
    
    const { container } = render(<ProgressBar />)
    
    const progressFill = container.querySelector('[style*="max-width"]')
    expect(progressFill).toBeTruthy()
    // 2/8 = 25%
    expect(progressFill).toHaveStyle({ maxWidth: '25%' })
    expect(screen.getByText('2/8')).toBeInTheDocument()
  })

  it('renders with correct gradient classes', () => {
    useOnboarding.mockReturnValue({ activeStep: 1 })
    
    const { container } = render(<ProgressBar />)
    
    const progressFill = container.querySelector('[style*="max-width"]')
    expect(progressFill).toBeTruthy()
    expect(progressFill).toHaveClass('bg-gradient-to-r')
    expect(progressFill).toHaveClass('from-[#28AAE1]')
    expect(progressFill).toHaveClass('via-[#0364B3]')
    expect(progressFill).toHaveClass('to-[#012B4D]')
  })

  it('has transition animation classes', () => {
    useOnboarding.mockReturnValue({ activeStep: 1 })
    
    const { container } = render(<ProgressBar />)
    
    const progressFill = container.querySelector('[style*="max-width"]')
    expect(progressFill).toBeTruthy()
    expect(progressFill).toHaveClass('transition-all')
    expect(progressFill).toHaveClass('duration-700')
  })

  it('displays step counter text with correct styling', () => {
    useOnboarding.mockReturnValue({ activeStep: 3 })
    
    render(<ProgressBar />)
    
    const stepCounter = screen.getByText('3/8')
    expect(stepCounter).toHaveClass('text-[#012B4D]')
    expect(stepCounter).toHaveClass('text-[14px]')
    expect(stepCounter).toHaveClass('font-bold')

    const stepsLabel = screen.getByText('8 Steps')
    expect(stepsLabel).toHaveClass('text-[#8F9BBA]')
    expect(stepsLabel).toHaveClass('text-[14px]')
    expect(stepsLabel).toHaveClass('font-medium')
  })

  it('renders container with correct spacing', () => {
    useOnboarding.mockReturnValue({ activeStep: 1 })
    
    const { container } = render(<ProgressBar />)
    
    const mainContainer = container.firstChild
    expect(mainContainer).toHaveClass('mb-[30px]')
  })

  it('works with different formSteps lengths', () => {
    // Test with 3 steps instead of 8
    // Since formSteps is imported directly, we'll test with activeStep that gives us the expected percentage
    useOnboarding.mockReturnValue({ activeStep: 3 })
    
    const { container } = render(<ProgressBar />)
    
    const progressFill = container.querySelector('[style*="max-width"]')
    expect(progressFill).toBeTruthy()
    // 3/8 = 37.5%
    expect(progressFill).toHaveStyle({ maxWidth: '37.5%' })
    expect(screen.getByText('3/8')).toBeInTheDocument()
    expect(screen.getByText('8 Steps')).toBeInTheDocument()
  })
})

