import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '../Modal';

describe('Modal', () => {
  const mockOnClose = vi.fn();
  const defaultProps = {
    isOpen: true,
    onClose: mockOnClose,
    children: <div>Modal Content</div>,
  };

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  it('renders nothing when isOpen is false', () => {
    const { container } = render(<Modal {...defaultProps} isOpen={false} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders modal content when isOpen is true', () => {
    render(<Modal {...defaultProps} />);
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('calls onClose when clicking the close button', () => {
    render(<Modal {...defaultProps} />);
    const closeButton = screen.getByLabelText('Close modal');
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when clicking the backdrop', () => {
    render(<Modal {...defaultProps} />);
    const backdrop = screen.getByRole('presentation');
    fireEvent.click(backdrop);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when clicking the modal content', () => {
    render(<Modal {...defaultProps} />);
    const modalContent = screen.getByText('Modal Content').closest('div');
    fireEvent.click(modalContent!);
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('calls onClose when pressing Escape key', () => {
    render(<Modal {...defaultProps} />);
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('applies custom className when provided', () => {
    const customClass = 'custom-class';
    render(<Modal {...defaultProps} className={customClass} />);
    const modalContent = screen.getByText('Modal Content').parentElement;
    expect(modalContent).toHaveClass(customClass);
  });

  it('has proper accessibility attributes', () => {
    render(<Modal {...defaultProps} />);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
  });
});
