import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TextField from './TextField'

describe('TextField Component', () => {
  it('renders input with placeholder', () => {
    render(<TextField placeholder="Enter your name" />)
    
    const input = screen.getByPlaceholderText('Enter your name')
    expect(input).toBeInTheDocument()
  })

  it('renders with controlled value', () => {
    render(<TextField value="Test Value" onChange={() => {}} />)
    
    const input = screen.getByRole('textbox')
    expect(input).toHaveValue('Test Value')
  })

  it('calls onChange handler when typing', async () => {
    const handleChange = jest.fn()
    const user = userEvent.setup()
    render(<TextField value="" onChange={handleChange} />)
    
    const input = screen.getByRole('textbox')
    await user.type(input, 'Hello')
    
    expect(handleChange).toHaveBeenCalledTimes(5) // Once for each character
    // When typing character by character, the last call would be just 'o'
    // Check that all the expected calls were made
    expect(handleChange).toHaveBeenNthCalledWith(1, 'H')
    expect(handleChange).toHaveBeenNthCalledWith(2, 'e')
    expect(handleChange).toHaveBeenNthCalledWith(3, 'l')
    expect(handleChange).toHaveBeenNthCalledWith(4, 'l')
    expect(handleChange).toHaveBeenNthCalledWith(5, 'o')
  })

  it('handles onChange event correctly', () => {
    const handleChange = jest.fn()
    render(<TextField value="" onChange={handleChange} />)
    
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'New Value' } })
    
    expect(handleChange).toHaveBeenCalledWith('New Value')
  })

  it('has required attribute', () => {
    render(<TextField />)
    
    const input = screen.getByRole('textbox')
    expect(input).toBeRequired()
  })

  it('has correct styling classes', () => {
    render(<TextField />)
    
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('w-full')
    expect(input).toHaveClass('px-4')
    expect(input).toHaveClass('py-2')
    expect(input).toHaveClass('border')
    expect(input).toHaveClass('rounded-[12px]')
    expect(input).toHaveClass('mt-1')
    expect(input).toHaveClass('block')
    expect(input).toHaveClass('h-[55px]')
    expect(input).toHaveClass('focus:outline-none')
    expect(input).toHaveClass('focus:ring-2')
    expect(input).toHaveClass('focus:ring-primary')
  })

  it('has type="text" attribute', () => {
    render(<TextField />)
    
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('type', 'text')
  })

  it('handles empty value gracefully', () => {
    render(<TextField value="" onChange={() => {}} />)
    
    const input = screen.getByRole('textbox')
    expect(input).toHaveValue('')
  })

  it('handles undefined value gracefully', () => {
    render(<TextField onChange={() => {}} />)
    
    const input = screen.getByRole('textbox')
    expect(input).toHaveValue('')
  })

  it('works with different placeholder values', () => {
    const { rerender } = render(<TextField placeholder="First placeholder" />)
    
    let input = screen.getByPlaceholderText('First placeholder')
    expect(input).toBeInTheDocument()
    
    rerender(<TextField placeholder="Second placeholder" />)
    
    input = screen.getByPlaceholderText('Second placeholder')
    expect(input).toBeInTheDocument()
  })

  it('maintains focus when value changes', async () => {
    const ControlledTextField = () => {
      const [value, setValue] = React.useState('')
      return <TextField value={value} onChange={setValue} />
    }
    
    render(<ControlledTextField />)
    
    const input = screen.getByRole('textbox')
    input.focus()
    
    await userEvent.type(input, 'Test')
    
    expect(input).toHaveFocus()
    expect(input).toHaveValue('Test')
  })

  it('can be cleared by setting empty value', () => {
    const { rerender } = render(<TextField value="Some text" onChange={() => {}} />)
    
    let input = screen.getByRole('textbox')
    expect(input).toHaveValue('Some text')
    
    rerender(<TextField value="" onChange={() => {}} />)
    
    expect(input).toHaveValue('')
  })
})