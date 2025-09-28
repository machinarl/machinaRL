'use client';

import { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  ascii?: boolean;
  className?: string;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  ascii = true,
  className = '',
  ...props
}: ButtonProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600';
      case 'secondary':
        return 'bg-gray-600 hover:bg-gray-700 text-white border-gray-600';
      case 'success':
        return 'bg-green-600 hover:bg-green-700 text-white border-green-600';
      case 'warning':
        return 'bg-yellow-600 hover:bg-yellow-700 text-white border-yellow-600';
      case 'error':
        return 'bg-red-600 hover:bg-red-700 text-white border-red-600';
      case 'info':
        return 'bg-cyan-600 hover:bg-cyan-700 text-white border-cyan-600';
      default:
        return 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-1 text-sm';
      case 'md':
        return 'px-4 py-2 text-base';
      case 'lg':
        return 'px-6 py-3 text-lg';
      default:
        return 'px-4 py-2 text-base';
    }
  };

  const getAsciiStyles = () => {
    if (!ascii) return '';
    return 'font-mono border-2 border-current shadow-lg hover:shadow-xl transition-all duration-200';
  };

  return (
    <button
      className={`
        ${getVariantStyles()}
        ${getSizeStyles()}
        ${getAsciiStyles()}
        ${className}
        disabled:opacity-50 disabled:cursor-not-allowed
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        transition-colors duration-200
      `}
      {...props}
    >
      {ascii ? `[ ${children} ]` : children}
    </button>
  );
}
