// Modern Color Palette using Tailwind CSS classes
export const colors = {
  // Primary colors (Blue)
  primary: {
    50: 'bg-primary-50 text-primary-50 border-primary-50',
    100: 'bg-primary-100 text-primary-100 border-primary-100',
    200: 'bg-primary-200 text-primary-200 border-primary-200',
    300: 'bg-primary-300 text-primary-300 border-primary-300',
    400: 'bg-primary-400 text-primary-400 border-primary-400',
    500: 'bg-primary-500 text-primary-500 border-primary-500', // Main
    600: 'bg-primary-600 text-primary-600 border-primary-600',
    700: 'bg-primary-700 text-primary-700 border-primary-700',
    800: 'bg-primary-800 text-primary-800 border-primary-800',
    900: 'bg-primary-900 text-primary-900 border-primary-900',
  },

  // Secondary colors (Gray/Slate)
  secondary: {
    50: 'bg-secondary-50 text-secondary-50 border-secondary-50',
    100: 'bg-secondary-100 text-secondary-100 border-secondary-100',
    200: 'bg-secondary-200 text-secondary-200 border-secondary-200',
    300: 'bg-secondary-300 text-secondary-300 border-secondary-300',
    400: 'bg-secondary-400 text-secondary-400 border-secondary-400',
    500: 'bg-secondary-500 text-secondary-500 border-secondary-500', // Main
    600: 'bg-secondary-600 text-secondary-600 border-secondary-600',
    700: 'bg-secondary-700 text-secondary-700 border-secondary-700',
    800: 'bg-secondary-800 text-secondary-800 border-secondary-800',
    900: 'bg-secondary-900 text-secondary-900 border-secondary-900',
  },

  // Accent colors (Green)
  accent: {
    50: 'bg-accent-50 text-accent-50 border-accent-50',
    100: 'bg-accent-100 text-accent-100 border-accent-100',
    200: 'bg-accent-200 text-accent-200 border-accent-200',
    300: 'bg-accent-300 text-accent-300 border-accent-300',
    400: 'bg-accent-400 text-accent-400 border-accent-400',
    500: 'bg-accent-500 text-accent-500 border-accent-500', // Main
    600: 'bg-accent-600 text-accent-600 border-accent-600',
    700: 'bg-accent-700 text-accent-700 border-accent-700',
    800: 'bg-accent-800 text-accent-800 border-accent-800',
    900: 'bg-accent-900 text-accent-900 border-accent-900',
  },

  // Status colors
  success: {
    50: 'bg-success-50 text-success-50 border-success-50',
    500: 'bg-success-500 text-success-500 border-success-500',
    600: 'bg-success-600 text-success-600 border-success-600',
    700: 'bg-success-700 text-success-700 border-success-700',
  },

  warning: {
    50: 'bg-warning-50 text-warning-50 border-warning-50',
    500: 'bg-warning-500 text-warning-500 border-warning-500',
    600: 'bg-warning-600 text-warning-600 border-warning-600',
    700: 'bg-warning-700 text-warning-700 border-warning-700',
  },

  error: {
    50: 'bg-error-50 text-error-50 border-error-50',
    500: 'bg-error-500 text-error-500 border-error-500',
    600: 'bg-error-600 text-error-600 border-error-600',
    700: 'bg-error-700 text-error-700 border-error-700',
  },

  info: {
    50: 'bg-info-50 text-info-50 border-info-50',
    500: 'bg-info-500 text-info-500 border-info-500',
    600: 'bg-info-600 text-info-600 border-info-600',
    700: 'bg-info-700 text-info-700 border-info-700',
  },
};

// Helper function to get Tailwind color classes
export const getColorClasses = (colorPath, type = 'bg') => {
  const keys = colorPath.split('.');
  let color = colors;

  for (const key of keys) {
    color = color[key];
    if (!color) return null;
  }

  // Extract the specific class type from the color string
  const classes = color.split(' ');
  const targetClass = classes.find(cls => cls.startsWith(type + '-'));
  return targetClass;
};

// Predefined combinations for common use cases
export const colorCombinations = {
  primaryButton: 'bg-primary-600 hover:bg-primary-700 text-white',
  secondaryButton: 'bg-secondary-200 hover:bg-secondary-300 text-secondary-800',
  accentButton: 'bg-accent-600 hover:bg-accent-700 text-white',
  successButton: 'bg-success-600 hover:bg-success-700 text-white',
  warningButton: 'bg-warning-500 hover:bg-warning-600 text-white',
  errorButton: 'bg-error-600 hover:bg-error-700 text-white',
  
  primaryCard: 'bg-white border border-primary-200 shadow-soft',
  secondaryCard: 'bg-secondary-50 border border-secondary-200',
  
  primaryText: 'text-primary-600',
  secondaryText: 'text-secondary-600',
  accentText: 'text-accent-600',
  
  primaryBorder: 'border-primary-300',
  secondaryBorder: 'border-secondary-300',
  accentBorder: 'border-accent-300',
};

export default colors;
