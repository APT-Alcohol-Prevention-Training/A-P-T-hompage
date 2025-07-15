import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import RadioField from './RadioField'

describe('RadioField Component', () => {
  const mockOptions = [
    { label: 'Option 1', value: 'opt1' },
    { label: 'Option 2', value: 'opt2' },
    { label: 'Option 3', value: 'opt3' }
  ]

  it('renders all options', () => {
    render(<RadioField options={mockOptions} />)
    
    expect(screen.getByText('Option 1')).toBeInTheDocument()
    expect(screen.getByText('Option 2')).toBeInTheDocument()
    expect(screen.getByText('Option 3')).toBeInTheDocument()
  })

  it('renders without options gracefully', () => {
    const { container } = render(<RadioField />)
    
    expect(container.querySelector('.space-y-4')).toBeEmptyDOMElement()
  })

  it('highlights selected option', () => {
    render(<RadioField options={mockOptions} selectedValue="opt2" />)
    
    const option2Label = screen.getByText('Option 2').parentElement
    expect(option2Label).toHaveClass('border-[#0364B3]')
    expect(option2Label).toHaveClass('border-[3px]')
    expect(option2Label).toHaveClass('bg-brown-50')
    expect(option2Label).toHaveClass('scale-98')
  })

  it('calls onChange when option is clicked', () => {
    const handleChange = jest.fn()
    render(<RadioField options={mockOptions} onChange={handleChange} />)
    
    const option1 = screen.getByText('Option 1').parentElement
    fireEvent.click(option1)
    
    expect(handleChange).toHaveBeenCalledWith('opt1')
  })

  it('handles array selectedValue', () => {
    render(<RadioField options={mockOptions} selectedValue={['opt1', 'opt3']} />)
    
    const option1Label = screen.getByText('Option 1').parentElement
    const option3Label = screen.getByText('Option 3').parentElement
    
    expect(option1Label).toHaveClass('border-[#0364B3]')
    expect(option3Label).toHaveClass('border-[#0364B3]')
  })

  it('applies hover styles', () => {
    render(<RadioField options={mockOptions} />)
    
    const option1Label = screen.getByText('Option 1').parentElement
    expect(option1Label).toHaveClass('hover:border-primary')
  })

  it('has correct base styling', () => {
    render(<RadioField options={mockOptions} />)
    
    const option1Label = screen.getByText('Option 1').parentElement
    expect(option1Label).toHaveClass('flex')
    expect(option1Label).toHaveClass('items-center')
    expect(option1Label).toHaveClass('capitalize')
    expect(option1Label).toHaveClass('w-full')
    expect(option1Label).toHaveClass('min-h-[75px]')
    expect(option1Label).toHaveClass('p-4')
    expect(option1Label).toHaveClass('border-[2px]')
    expect(option1Label).toHaveClass('rounded-[12px]')
    expect(option1Label).toHaveClass('transition-all')
    expect(option1Label).toHaveClass('cursor-pointer')
    expect(option1Label).toHaveClass('duration-200')
  })

  it('renders option labels with correct styling', () => {
    render(<RadioField options={mockOptions} />)
    
    const optionText = screen.getByText('Option 1')
    expect(optionText).toHaveClass('text-gray-600')
  })

  it('handles multiple clicks correctly', () => {
    const handleChange = jest.fn()
    render(<RadioField options={mockOptions} onChange={handleChange} />)
    
    fireEvent.click(screen.getByText('Option 1').parentElement)
    fireEvent.click(screen.getByText('Option 2').parentElement)
    fireEvent.click(screen.getByText('Option 3').parentElement)
    
    expect(handleChange).toHaveBeenCalledTimes(3)
    expect(handleChange).toHaveBeenNthCalledWith(1, 'opt1')
    expect(handleChange).toHaveBeenNthCalledWith(2, 'opt2')
    expect(handleChange).toHaveBeenNthCalledWith(3, 'opt3')
  })

  it('renders with proper spacing container', () => {
    const { container } = render(<RadioField options={mockOptions} />)
    
    const spacingContainer = container.querySelector('.space-y-4')
    expect(spacingContainer).toBeInTheDocument()
  })

  it('works with single selected value', () => {
    const { rerender } = render(<RadioField options={mockOptions} selectedValue="opt1" />)
    
    let option1Label = screen.getByText('Option 1').parentElement
    expect(option1Label).toHaveClass('border-[#0364B3]')
    
    rerender(<RadioField options={mockOptions} selectedValue="opt2" />)
    
    option1Label = screen.getByText('Option 1').parentElement
    const option2Label = screen.getByText('Option 2').parentElement
    
    expect(option1Label).not.toHaveClass('border-[#0364B3]')
    expect(option2Label).toHaveClass('border-[#0364B3]')
  })

  it('handles undefined onChange gracefully', () => {
    render(<RadioField options={mockOptions} />)
    
    // Should not throw error when clicking without onChange
    const option1 = screen.getByText('Option 1').parentElement
    expect(() => fireEvent.click(option1)).not.toThrow()
  })
})