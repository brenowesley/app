import React from 'react';
import { motion } from 'framer-motion';
import { Category } from '../../types';

const categories: Category[] = [
  { id: 'salgadas', name: 'Salgadas', emoji: '🥙' },
  { id: 'vegetarianas', name: 'Vegetarianas', emoji: '🥗' },
  { id: 'doces', name: 'Doces', emoji: '🍰' },
  { id: 'mini-pizzas', name: 'Mini-Pizzas', emoji: '🍕' },
  { id: 'familia', name: 'Pizzas Família', emoji: '🍕' },
  { id: 'quibes', name: 'Quibes & Pastéis', emoji: '🥟' },
  { id: 'bebidas', name: 'Bebidas', emoji: '🥤' },
];

interface CategoryNavProps {
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export default function CategoryNav({ activeCategory, onCategoryChange }: CategoryNavProps) {
  const scrollToCategory = (categoryId: string) => {
    onCategoryChange(categoryId);
    const element = document.getElementById(`category-${categoryId}`);
    if (element) {
      const offset = 180;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="sticky top-[73px] z-40 bg-white/95 backdrop-blur-sm border-b border-red-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => scrollToCategory(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap font-medium transition-all
                ${activeCategory === category.id
                  ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg'
                  : 'bg-red-50 text-gray-700 hover:bg-red-100'
                }
              `}
            >
              <span className="text-lg">{category.emoji}</span>
              <span className="text-sm">{category.name}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}