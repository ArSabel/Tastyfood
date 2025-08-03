import React, { useState } from 'react';

interface SelectorEstrellasProps {
  calificacion: number;
  onChange: (calificacion: number) => void;
  readonly?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const SelectorEstrellas: React.FC<SelectorEstrellasProps> = ({
  calificacion,
  onChange,
  readonly = false,
  size = 'md'
}) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  const handleClick = (estrella: number) => {
    if (!readonly) {
      onChange(estrella);
    }
  };

  const getStarColor = (estrella: number) => {
    const displayRating = hoverRating !== null ? hoverRating : calificacion;
    return estrella <= displayRating ? 'text-yellow-500' : 'text-gray-300';
  };

  return (
    <div 
      className="flex space-x-1"
      onMouseLeave={() => !readonly && setHoverRating(null)}
    >
      {[1, 2, 3, 4, 5].map((estrella) => (
        <button
          key={estrella}
          type="button"
          onClick={() => handleClick(estrella)}
          onMouseEnter={() => !readonly && setHoverRating(estrella)}
          disabled={readonly}
          className={`
            ${sizeClasses[size]} 
            ${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'} 
            transition-transform duration-150
          `}
        >
          <svg
            className={`
              w-full h-full fill-current
              ${getStarColor(estrella)}
            `}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </button>
      ))}
    </div>
  );
};

export default SelectorEstrellas;