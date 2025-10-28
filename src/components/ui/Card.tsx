
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div
      className={`bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg p-4 sm:p-6 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
