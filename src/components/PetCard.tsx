import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Activity, User, PawPrint, Facebook, Twitter, Instagram, Share2 } from 'lucide-react';
import { Pet } from '../types';
import { PhotoCarousel } from './PhotoCarousel';

interface PetCardProps {
  key?: React.Key;
  pet: Pet;
  isFavorite: boolean;
  onToggleFavorite: (petId: string) => void;
  onAdoptClick: (pet: Pet) => void;
}

export function PetCard({ pet, isFavorite, onToggleFavorite, onAdoptClick }: PetCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleShare = (platform: string) => {
    alert(`準備分享 ${pet.name} 的資訊到 ${platform}！`);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-orange-100 flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <PhotoCarousel images={pet.images} altText={pet.name} />
        <button
          onClick={() => onToggleFavorite(pet.id)}
          className="absolute top-3 right-3 p-2.5 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full shadow-sm transition-all z-10 group"
          aria-label="Toggle favorite"
        >
          <Heart className={`w-5 h-5 transition-colors ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400 group-hover:text-red-500'}`} />
        </button>
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-bold text-orange-950 flex items-center gap-2">
              {pet.name}
              {pet.gender === 'Male' ? (
                <span className="text-blue-400 text-lg">♂</span>
              ) : (
                <span className="text-pink-400 text-lg">♀</span>
              )}
            </h3>
            <p className="text-orange-600 font-medium">{pet.breed}</p>
          </div>
          <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
            {pet.age}
          </div>
        </div>

        <div className="space-y-3 mb-6 flex-grow">
          <div className="flex items-start gap-2 text-gray-600 text-sm">
            <User className="w-4 h-4 mt-0.5 text-orange-400 shrink-0" />
            <p><span className="font-semibold text-gray-700">個性：</span>{pet.personality}</p>
          </div>
          <div className="flex items-start gap-2 text-gray-600 text-sm">
            <Activity className="w-4 h-4 mt-0.5 text-green-500 shrink-0" />
            <p><span className="font-semibold text-gray-700">健康狀況：</span>{pet.health}</p>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onAdoptClick(pet)}
          className="w-full py-3 px-4 bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 text-white rounded-2xl font-bold shadow-md flex items-center justify-center gap-2 transition-colors mb-5"
        >
          <PawPrint className={`w-5 h-5 ${isHovered ? 'animate-bounce' : ''} transition-all`} />
          我想認養 {pet.name}
        </motion.button>

        <div className="flex items-center justify-center gap-4 pt-4 border-t border-orange-100">
          <span className="text-xs text-gray-400 font-medium flex items-center gap-1 mr-2">
            <Share2 className="w-3 h-3" /> 分享
          </span>
          <button onClick={() => handleShare('Facebook')} className="text-gray-400 hover:text-blue-600 transition-colors" aria-label="Share on Facebook">
            <Facebook className="w-4 h-4" />
          </button>
          <button onClick={() => handleShare('Twitter')} className="text-gray-400 hover:text-sky-500 transition-colors" aria-label="Share on Twitter">
            <Twitter className="w-4 h-4" />
          </button>
          <button onClick={() => handleShare('Instagram')} className="text-gray-400 hover:text-pink-600 transition-colors" aria-label="Share on Instagram">
            <Instagram className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
