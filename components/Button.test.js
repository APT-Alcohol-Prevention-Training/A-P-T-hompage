import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Button from './Button'

describe('Button Component', () => {
  it('renders with children text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('renders with default primary variant', () => {
    render(<Button>Primary Button</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('bg-gradient-to-r')
    expect(button).toHaveClass('from-[#28AAE1]')
    expect(button).toHaveClass('text-white')
  })

  it('renders with secondary variant', () => {
    render(<Button variant="secondary">Secondary Button</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('bg-white')
    expect(button).toHaveClass('text-black')
    expect(button).toHaveClass('border')
  })

  it('shows loading spinner when loading prop is true', () => {
    render(<Button loading>Loading</Button>)
    const spinner = screen.getByRole('button').querySelector('svg')
    expect(spinner).toBeInTheDocument()
    expect(spinner).toHaveClass('animate-spin')
  })

  it('is disabled when loading', () => {
    render(<Button loading>Loading Button</Button>)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled Button</Button>)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })

  it('applies custom className', () => {
    render(<Button className="custom-class">Custom Button</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('custom-class')
  })

  it('handles click events', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('does not trigger click when disabled', () => {
    const handleClick = jest.fn()
    render(<Button disabled onClick={handleClick}>Disabled</Button>)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('does not trigger click when loading', () => {
    const handleClick = jest.fn()
    render(<Button loading onClick={handleClick}>Loading</Button>)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('renders with correct type attribute', () => {
    render(<Button type="submit">Submit Button</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('type', 'submit')
  })

  it('defaults to type="button"', () => {
    render(<Button>Default Type</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('type', 'button')
  })

  it('passes through additional props', () => {
    render(<Button data-testid="custom-button" aria-label="Custom">Props Button</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('data-testid', 'custom-button')
    expect(button).toHaveAttribute('aria-label', 'Custom')
  })

  it('applies hover and transition classes', () => {
    render(<Button>Hover Button</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('hover:shadow-md')
    expect(button).toHaveClass('hover:scale-105')
    expect(button).toHaveClass('transition')
  })

  it('has fixed height and full width', () => {
    render(<Button>Sized Button</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('w-full')
    expect(button).toHaveClass('h-[48px]')
  })
})