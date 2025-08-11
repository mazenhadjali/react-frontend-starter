import React, { forwardRef } from 'react';

const Input = forwardRef(({ 
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  onFocus,
  disabled = false,
  required = false,
  error,
  helperText,
  size = 'medium',
  variant = 'default',
  className = '',
  id,
  name,
  ...props 
}, ref) => {
  const baseClasses = 'w-full rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1';
  
  const sizeClasses = {
    small: 'px-3 py-2 text-sm',
    medium: 'px-4 py-2.5 text-base',
    large: 'px-5 py-3 text-lg'
  };
  
  const variantClasses = {
    default: error 
      ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
      : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
    filled: error
      ? 'bg-red-50 border-red-300 focus:border-red-500 focus:ring-red-500'
      : 'bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:bg-white',
    outlined: error
      ? 'bg-transparent border-2 border-red-300 focus:border-red-500 focus:ring-red-500'
      : 'bg-transparent border-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500'
  };
  
  const inputClasses = `
    ${baseClasses}
    ${sizeClasses[size] || sizeClasses.medium}
    ${variantClasses[variant] || variantClasses.default}
    ${disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  const inputId = id || name || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={inputId}
          className={`block text-sm font-medium mb-2 ${
            error ? 'text-red-700' : 'text-gray-700'
          }`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <input
        ref={ref}
        type={type}
        id={inputId}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={inputClasses}
        {...props}
      />
      
      {error && (
        <p className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
      
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">
          {helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
