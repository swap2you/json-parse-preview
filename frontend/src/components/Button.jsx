/**
 * Button Component - Modern, customizable button with animations
 * 
 * A comprehensive button component with multiple variants, sizes,
 * and states including loading, disabled, and icon support.
 * 
 * Features:
 * - Multiple variants (primary, secondary, success, danger, ghost)
 * - Different sizes (sm, md, lg, xl)
 * - Loading states with spinner
 * - Icon support (left and right)
 * - Gradient backgrounds with hover effects
 * - Accessibility compliant
 */
import React from 'react';
import LoadingSpinner from './LoadingSpinner';

/**
 * Button Component
 * 
 * @param {Object} props - Component props
 * @param {string} props.variant - Button style variant
 * @param {string} props.size - Button size
 * @param {boolean} props.loading - Loading state
 * @param {boolean} props.disabled - Disabled state
 * @param {React.ReactNode} props.leftIcon - Icon to show on left
 * @param {React.ReactNode} props.rightIcon - Icon to show on right
 * @param {React.ReactNode} props.children - Button content
 * @param {function} props.onClick - Click handler
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.type - Button type (button, submit, reset)
 */
const Button = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  leftIcon = null,
  rightIcon = null,
  children,
  onClick,
  className = '',
  type = 'button',
  ...props
}) => {
  // Base button styles
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95';

  // Size variations
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg'
  };

  // Variant styles with gradients and hover effects
  const variantStyles = {
    primary: 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl focus:ring-blue-500',
    secondary: 'bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-800 border border-gray-300 shadow-md hover:shadow-lg focus:ring-gray-500',
    success: 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl focus:ring-green-500',
    danger: 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white shadow-lg hover:shadow-xl focus:ring-red-500',
    warning: 'bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl focus:ring-yellow-500',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 border-2 border-gray-300 hover:border-gray-400 focus:ring-gray-500',
    outline: 'bg-transparent hover:bg-blue-50 text-blue-600 border-2 border-blue-500 hover:border-blue-600 focus:ring-blue-500'
  };

  // Combine all styles
  const buttonClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  // Handle click with loading state
  const handleClick = (e) => {
    if (!loading && !disabled && onClick) {
      onClick(e);
    }
  };

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={handleClick}
      disabled={disabled || loading}
      {...props}
    >
      {/* Left Icon */}
      {leftIcon && !loading && (
        <span className="mr-2 flex items-center">
          {leftIcon}
        </span>
      )}

      {/* Loading Spinner */}
      {loading && (
        <LoadingSpinner 
          size="sm" 
          className="mr-2" 
        />
      )}

      {/* Button Text */}
      <span className={loading ? 'opacity-70' : ''}>
        {children}
      </span>

      {/* Right Icon */}
      {rightIcon && !loading && (
        <span className="ml-2 flex items-center">
          {rightIcon}
        </span>
      )}
    </button>
  );
};

/**
 * Icon Button - Specialized button for icon-only actions
 */
export const IconButton = ({
  icon,
  variant = 'ghost',
  size = 'md',
  className = '',
  tooltip = '',
  ...props
}) => {
  const iconSizes = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-3',
    xl: 'p-4'
  };

  return (
    <Button
      variant={variant}
      className={`rounded-full ${iconSizes[size]} ${className}`}
      title={tooltip}
      {...props}
    >
      {icon}
    </Button>
  );
};

/**
 * Button Group - Container for grouped buttons
 */
export const ButtonGroup = ({ children, className = '' }) => {
  return (
    <div className={`inline-flex rounded-lg shadow-sm ${className}`} role="group">
      {React.Children.map(children, (child, index) => {
        if (!child) return null;
        
        const isFirst = index === 0;
        const isLast = index === React.Children.count(children) - 1;
        
        return React.cloneElement(child, {
          className: `${child.props.className || ''} ${
            isFirst ? 'rounded-r-none' : isLast ? 'rounded-l-none' : 'rounded-none'
          } ${!isFirst ? 'border-l-0' : ''}`,
        });
      })}
    </div>
  );
};

/**
 * Predefined Button Variants for common actions
 */
export const ButtonVariants = {
  // File upload button
  Upload: ({ loading, onClick, children = 'Upload File', ...props }) => (
    <Button
      variant="primary"
      loading={loading}
      onClick={onClick}
      leftIcon={
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      }
      {...props}
    >
      {children}
    </Button>
  ),

  // Execute request button
  Execute: ({ loading, onClick, children = 'Execute Request', ...props }) => (
    <Button
      variant="success"
      loading={loading}
      onClick={onClick}
      leftIcon={
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1" />
        </svg>
      }
      {...props}
    >
      {children}
    </Button>
  ),

  // Download button
  Download: ({ onClick, children = 'Download', ...props }) => (
    <Button
      variant="outline"
      onClick={onClick}
      leftIcon={
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      }
      {...props}
    >
      {children}
    </Button>
  ),

  // Clear/Reset button
  Clear: ({ onClick, children = 'Clear', ...props }) => (
    <Button
      variant="secondary"
      onClick={onClick}
      leftIcon={
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      }
      {...props}
    >
      {children}
    </Button>
  )
};

export default Button;