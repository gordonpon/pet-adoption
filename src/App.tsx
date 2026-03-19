import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, PawPrint, Phone, Mail, MapPin, Cat, Dog } from 'lucide-react';
import { petsData } from './data';
import { PetCard } from './components/PetCard';
import { Pet, Species } from './types';

type FilterType = 'All' | Species | 'Favorites';

export default function App() {
  const [filter, setFilter] = useState<FilterType>('All');
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (petId: string) => {
    setFavorites((prev) =>
      prev.includes(petId) ? prev.filter((id) => id !== petId) : [...prev, petId]
    );
  };

  const filteredPets = petsData.filter((pet) => {
    if (filter === 'Favorites') return favorites.includes(pet.id);
    if (filter === 'All') return true;
    return pet.species === filter;
  });

  const handleAdoptClick = (pet: Pet) => {
    setSelectedPet(pet);
    // In a real app, this might open a modal or navigate to a form
    alert(`感謝您對 ${pet.name} 感興趣！請填寫認養表單或聯絡我們。`);
  };

  return (
    <div className="min-h-screen bg-[#FFFBF7] font-sans text-gray-800 selection:bg-orange-200">
      {/* Header / Hero Section */}
      <header className="bg-gradient-to-b from-orange-100 to-[#FFFBF7] pt-16 pb-12 px-6 relative overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-64 h-64 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute top-[-10%] right-[-5%] w-64 h-64 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="inline-flex items-center justify-center p-4 bg-white rounded-full shadow-md mb-6"
          >
            <PawPrint className="w-10 h-10 text-orange-500" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-orange-950 mb-4 tracking-tight"
          >
            給牠們一個溫暖的家
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-orange-800/80 max-w-2xl mx-auto font-medium"
          >
            遇見你命中注定的毛小孩。每一隻在這裡等待的動物，都準備好給你滿滿的愛。
          </motion.p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Filter Bar */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {(['All', 'Dog', 'Cat', 'Favorites'] as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`relative px-6 py-3 rounded-full font-bold text-sm md:text-base transition-colors flex items-center gap-2 ${
                filter === f
                  ? 'text-white'
                  : 'bg-white text-orange-800 hover:bg-orange-50 shadow-sm'
              }`}
            >
              {filter === f && (
                <motion.div
                  layoutId="active-filter"
                  className="absolute inset-0 bg-orange-500 rounded-full -z-10 shadow-md"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              {f === 'All' && <PawPrint className="w-4 h-4" />}
              {f === 'Dog' && <Dog className="w-4 h-4" />}
              {f === 'Cat' && <Cat className="w-4 h-4" />}
              {f === 'Favorites' && <Heart className="w-4 h-4" />}
              {f === 'All' ? '全部毛孩' : f === 'Dog' ? '狗狗' : f === 'Cat' ? '貓咪' : '我的收藏'}
            </button>
          ))}
        </div>

        {/* Pet Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredPets.map((pet) => (
              <PetCard 
                key={pet.id} 
                pet={pet} 
                isFavorite={favorites.includes(pet.id)}
                onToggleFavorite={toggleFavorite}
                onAdoptClick={handleAdoptClick} 
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredPets.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <PawPrint className="w-16 h-16 mx-auto mb-4 opacity-20" />
            <p className="text-lg">目前沒有符合條件的毛孩喔！</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-orange-950 text-orange-100 py-16 mt-20">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <PawPrint className="w-8 h-8 text-orange-400" />
              <span className="text-2xl font-bold text-white">Paws & Hearts</span>
            </div>
            <p className="text-orange-200/80 leading-relaxed">
              我們致力於為每一隻流浪動物找到溫暖的家。認養不棄養，讓愛延續。
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-bold text-white mb-6">聯絡我們</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-orange-400" />
                <span>(02) 2345-6789</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-orange-400" />
                <span>adopt@pawsandhearts.tw</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange-400 shrink-0 mt-1" />
                <span>台北市幸福區溫暖路 100 號<br/>(請先預約參觀)</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold text-white mb-6">開放時間</h4>
            <ul className="space-y-2 text-orange-200/80">
              <li className="flex justify-between">
                <span>週一至週五</span>
                <span>10:00 - 19:00</span>
              </li>
              <li className="flex justify-between">
                <span>週六至週日</span>
                <span>11:00 - 20:00</span>
              </li>
              <li className="flex justify-between text-orange-400 mt-2">
                <span>週三</span>
                <span>公休</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-6 mt-12 pt-8 border-t border-orange-900/50 text-center text-sm text-orange-300/60">
          &copy; {new Date().getFullYear()} Paws & Hearts Adoption. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
