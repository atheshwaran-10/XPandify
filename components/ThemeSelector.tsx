"use client"
import React, { useState } from 'react'
import { Check } from 'lucide-react';
interface ThemeSelectorProps {
  color: string;
  isSelected: boolean;
  onSelectColor: (color: string) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ color, isSelected, onSelectColor }) => {
  const handleColorClick = () => {
    onSelectColor(color);
  };

  return (
    <div
      className={`h-10 w-10 cursor-pointer border border-white border-solid border-4  rounded-full bg-${color+'-500'}`}
      onClick={handleColorClick}
    >
      {
        isSelected && (
          <div className='flex justify-center pt-1'>
            <Check/>
          </div>
          
        )
      }
    </div>
  );
};

export default ThemeSelector;
