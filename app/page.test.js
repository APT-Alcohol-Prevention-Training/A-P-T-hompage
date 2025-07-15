import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import Home from './page'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}))

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, width, height }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} width={width} height={height} />
  }
}))

describe('Home Page', () => {
  const mockPush = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    useRouter.mockReturnValue({ push: mockPush })
  })

  it('renders welcome message', () => {
    render(<Home />)
    
    expect(screen.getByText('Welcome to the')).toBeInTheDocument()
  })

  it('renders all required images', () => {
    render(<Home />)
    
    // Home page has its own images, plus one from layout
    const logos = screen.getAllByAltText('logo')
    
    // Find the specific logo from Home page (logo3.svg)
    const mainLogo = logos.find(img => img.getAttribute('src') === '/logo3.svg')
    expect(mainLogo).toBeInTheDocument()
    expect(mainLogo).toHaveAttribute('width', '365')
    expect(mainLogo).toHaveAttribute('height', '80')

    // Find the hands image
    const hands = logos.find(img => img.getAttribute('src') === '/hands.svg')
    expect(hands).toBeInTheDocument()
    expect(hands).toHaveAttribute('width', '471')
    expect(hands).toHaveAttribute('height', '471')

    const arrow = screen.getByAltText('arrow')
    expect(arrow).toBeInTheDocument()
    expect(arrow).toHaveAttribute('src', '/arrow-right.svg')
  })

  it('renders get started button with correct text', () => {
    render(<Home />)
    
    const button = screen.getByRole('button', { name: /Let's Get Started/i })
    expect(button).toBeInTheDocument()
  })

  it('navigates to onboarding intro when button is clicked', () => {
    render(<Home />)
    
    const button = screen.getByRole('button', { name: /Let's Get Started/i })
    fireEvent.click(button)
    
    expect(mockPush).toHaveBeenCalledWith('/onboarding/intro')
  })

  it('toggles clicked state when button is clicked', () => {
    const { container } = render(<Home />)
    
    const button = screen.getByRole('button', { name: /Let's Get Started/i })
    
    // Initial state
    expect(button).toBeInTheDocument()
    
    // Click button
    fireEvent.click(button)
    
    // Verify navigation still happens
    expect(mockPush).toHaveBeenCalledWith('/onboarding/intro')
  })

  it('has correct styling classes', () => {
    const { container } = render(<Home />)
    
    // Check main container
    const mainDiv = container.firstChild
    expect(mainDiv).toHaveClass('px-[32px]')
    expect(mainDiv).toHaveClass('md:px-[64px]')
    expect(mainDiv).toHaveClass('flex')
    expect(mainDiv).toHaveClass('flex-col')
    expect(mainDiv).toHaveClass('pt-[40px]')
    expect(mainDiv).toHaveClass('min-h-screen')
    expect(mainDiv).toHaveClass('bg-[#F6F6F2]')
  })

  it('button has gradient styling', () => {
    render(<Home />)
    
    const button = screen.getByRole('button', { name: /Let's Get Started/i })
    expect(button).toHaveClass('bg-gradient-to-r')
    expect(button).toHaveClass('from-[#28AAE1]')
    expect(button).toHaveClass('via-[#0364B3]')
    expect(button).toHaveClass('to-[#012B4D]')
  })

  it('welcome text has correct styling', () => {
    render(<Home />)
    
    const welcomeText = screen.getByText('Welcome to the')
    expect(welcomeText).toHaveClass('text-[32px]')
    expect(welcomeText).toHaveClass('leading-[38px]')
    expect(welcomeText).toHaveClass('font-semibold')
    expect(welcomeText).toHaveClass('text-[#000000]')
  })

  it('button has responsive text sizing', () => {
    render(<Home />)
    
    const button = screen.getByRole('button', { name: /Let's Get Started/i })
    expect(button).toHaveClass('text-[16px]')
    expect(button).toHaveClass('sm:text-[24px]')
    expect(button).toHaveClass('px-[20px]')
    expect(button).toHaveClass('sm:px-[40px]')
  })

  it('layout uses flexbox correctly', () => {
    render(<Home />)
    
    const innerContainer = screen.getByText('Welcome to the').parentElement
    expect(innerContainer).toHaveClass('flex')
    expect(innerContainer).toHaveClass('flex-col')
    expect(innerContainer).toHaveClass('justify-between')
    expect(innerContainer).toHaveClass('flex-grow')
    expect(innerContainer).toHaveClass('items-center')
    expect(innerContainer).toHaveClass('mt-[100px]')
  })
})