import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react'; // Icon library (agar nahi hai to simple text/emoji use karein)

const BannerSlider = () => {
  // Sample Images (Aap apne images ke URL yahan daalein)
  const slides = [
    {
      id: 1,
      image: "/banner/banner-11.jpg", 
      title: "Submarine Ocean View"
    },
    {
      id: 2,
      image: "/banner/banner-2.jpg", // Replace with your actual image path
      title: "Deep Blue Sea"
    },
    {
      id: 3,
      image: "/banner/banner-3.jpg", // Replace with your actual image path
      title: "Coral Reef"
    },
    {
      id: 4,
      image: "/banner/banner-4.png", // Replace with your actual image path
      title: "Sunset Over the Ocean"
    },
    {
      id: 5,
      image: "/banner/banner-5.jpg", // Replace with your actual image path
      title: "Underwater Caves "
    },
    {
      id: 6,
      image: "/banner/banner-6.jpg", // Replace with your actual image path
      title: "Underwater Caves "
    },
    {
      id: 7,
      image: "/banner/banner-7.jpg", // Replace with your actual image path
      title: "Underwater Caves "
    },
    {
      id: 8,
      image: "/banner/banner-8.jpg", // Replace with your actual image path
      title: "Underwater Caves "
    },
    {
      id: 9,
      image: "/banner/banner-9.jpg", // Replace with your actual image path
      title: "Underwater Caves "
    },
    {
      id: 10,
      image: "/banner/banner-10.jpg", // Replace with your actual image path
      title: "Underwater Caves "
    },
    {
      id: 11,
      image: "/banner/banner-11.jpg", // Replace with your actual image path
      title: "Underwater Caves "
    },
    {
      id: 12,
      image: "/banner/banner-12.jpg", // Replace with your actual image path
      title: "Underwater Caves "
    },
    {
      id: 13,
      image: "/banner/banner-13.jpg", // Replace with your actual image path
      title: "Underwater Caves "
    },
    {
      id: 14,
      image: "/banner/banner-14.jpg", // Replace with your actual image path
      title: "Underwater Caves "
    },
      
    
    {
      id: 15,
      image: "/banner/banner-15.jpg", // Replace with your actual image path
      title: "Underwater Caves "
    },

  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true); // Default auto-play on

  // Next Slide Logic
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  }, [slides.length]);

  // Prev Slide Logic
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  // Auto Scroll Effect
  useEffect(() => {
    let sliderInterval = null;
    if (isPlaying) {
      sliderInterval = setInterval(() => {
        nextSlide();
      }, 3000); // 3 second ka interval
    }
    return () => {
      if (sliderInterval) clearInterval(sliderInterval);
    };
  }, [isPlaying, nextSlide]);

  return (
    <div className="relative w-full h-[800px] overflow-hidden group">
      
      {/* 1. Slides Container */}
      <div 
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="relative min-w-full h-full">
            <img 
              src={slide.image} 
              alt={slide.title} 
              className="w-full h-full bg-cover"
            />
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
        ))}
      </div>

      {/* 2. Left Arrow Button */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-3 rounded-md transition-all z-10"
      >
        <ChevronLeft size={30} />
      </button>

      {/* 3. Right Arrow Button */}
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-3 rounded-md transition-all z-10"
      >
        <ChevronRight size={30} />
      </button>

      {/* 4. Bottom Controls (Dots + Play/Pause) */}
      <div className="absolute bottom-5 left-0 right-0 flex justify-center items-center gap-4 z-10">
        
        {/* Dots Indicator */}
        <div className="flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === index ? "w-6 bg-yellow-400" : "w-2 bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* 5. Play/Pause Button (Bottom Right Corner) */}
      <button 
        onClick={() => setIsPlaying(!isPlaying)}
        className="absolute bottom-4 right-4 bg-gray-800/80 hover:bg-gray-900 text-white p-2 rounded-md z-10 transition-colors"
        title={isPlaying ? "Pause Auto-Scroll" : "Play Auto-Scroll"}
      >
        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
      </button>

    </div>
  );
};

export default BannerSlider;