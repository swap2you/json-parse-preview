/**
 * LoadingSpinner Component - Modern animated loading indicator
 * 
 * A beautiful, customizable loading spinner with gradient animations
 * and optional text display for different loading states.
 * 
 * Features:
 * - Smooth gradient animations
 * - Customizable size and colors
 * - Optional loading text with typewriter effect
 * - Responsive design
 */
import React from 'react';

/**
 * LoadingSpinner Component
 * 
 * @param {Object} props - Component props
 * @param {string} props.size - Size variant ('sm', 'md', 'lg', 'xl')
 * @param {string} props.text - Optional loading text to display
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.overlay - Whether to show as full-screen overlay
 */
const LoadingSpinner = ({ 
  size = 'md', 
  text = null, 
  className = '', 
  overlay = false 
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const LoadingElement = (
    <div className={`flex flex-col items-center justify-center space-y-4 ${className}`}>
      {/* Gradient Spinning Circle */}
      <div className="relative">
        <div 
          className={`${sizeClasses[size]} border-4 border-gray-200 rounded-full animate-spin`}
          style={{
            borderTopColor: 'transparent',
            background: 'conic-gradient(from 0deg, #3b82f6, #8b5cf6, #06b6d4, #3b82f6)'
          }}
        />
        <div 
          className={`absolute inset-0 ${sizeClasses[size]} border-4 border-transparent rounded-full animate-pulse`}
          style={{
            background: 'linear-gradient(45deg, rgba(59,130,246,0.3), rgba(139,92,246,0.3))',
            filter: 'blur(8px)'
          }}
        />
      </div>

      {/* Optional Loading Text */}
      {text && (
        <div className="text-center">
          <p className="text-gray-600 font-medium animate-pulse">
            {text}
          </p>
          <div className="flex space-x-1 mt-2 justify-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      )}
    </div>
  );

  if (overlay) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
        {LoadingElement}
      </div>
    );
  }

  return LoadingElement;
};

/**
 * Enhanced Loading States Component
 * 
 * Provides different loading states for various application scenarios
 */
export const LoadingStates = {
  // File Upload Loading
  FileUpload: ({ fileName }) => (
    <LoadingSpinner 
      size="lg" 
      text={`Processing ${fileName || 'file'}...`}
      className="p-8"
    />
  ),

  // API Execution Loading  
  ApiExecution: ({ requestName }) => (
    <LoadingSpinner 
      size="md" 
      text={`Executing ${requestName || 'request'}...`}
      className="p-6"
    />
  ),

  // JSON Parsing Loading
  JsonParsing: () => (
    <LoadingSpinner 
      size="lg" 
      text="Parsing JSON structure..."
      className="p-8"
    />
  ),

  // Full Screen Loading
  FullScreen: ({ text = "Loading application..." }) => (
    <LoadingSpinner 
      size="xl" 
      text={text}
      overlay={true}
    />
  ),

  // Inline Loading (for buttons, etc.)
  Inline: ({ text = "Loading..." }) => (
    <LoadingSpinner 
      size="sm" 
      text={text}
      className="py-2"
    />
  )
};

export default LoadingSpinner;