'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import Image from 'next/image';

interface MediaItem {
  type: 'image' | 'video';
  src: string;
  title: string;
  description?: string;
  poster?: string;
}

interface MediaCarouselProps {
  items: MediaItem[];
  autoPlay?: boolean;
  interval?: number;
  showThumbnails?: boolean;
  aspectRatio?: 'video' | 'square' | 'wide';
}

export function MediaCarousel({
  items,
  autoPlay = true,
  interval = 6000,
  showThumbnails = true,
  aspectRatio = 'video',
}: MediaCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  const currentItem = items[currentIndex];

  // Auto-advance for images, videos control their own timing
  useEffect(() => {
    if (!isPlaying) return;
    if (currentItem.type === 'video') return; // Videos handle their own advancement

    setProgress(0);
    const startTime = Date.now();
    
    progressInterval.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / interval) * 100, 100);
      setProgress(newProgress);
      
      if (newProgress >= 100) {
        goToNext();
      }
    }, 50);

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [currentIndex, isPlaying, interval, currentItem.type]);

  const goToNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % items.length);
    setProgress(0);
  }, [items.length]);

  const goToPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    setProgress(0);
  }, [items.length]);

  const goToIndex = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setProgress(0);
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x > threshold) {
      goToPrev();
    } else if (info.offset.x < -threshold) {
      goToNext();
    }
  };

  const handleVideoEnd = () => {
    goToNext();
  };

  // Video progress tracking
  useEffect(() => {
    const video = videoRef.current;
    if (!video || currentItem.type !== 'video') return;

    const updateProgress = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    video.addEventListener('timeupdate', updateProgress);
    return () => video.removeEventListener('timeupdate', updateProgress);
  }, [currentIndex, currentItem.type]);

  const aspectRatioClasses = {
    video: 'aspect-video',
    square: 'aspect-square',
    wide: 'aspect-[21/9]',
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    }),
  };

  return (
    <div className="relative w-full">
      {/* Main Carousel */}
      <div 
        className={`relative ${aspectRatioClasses[aspectRatio]} overflow-hidden rounded-2xl`}
        style={{ backgroundColor: '#0D0D0D' }}
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
          >
            {currentItem.type === 'video' ? (
              <video
                ref={videoRef}
                src={currentItem.src}
                poster={currentItem.poster}
                autoPlay
                muted
                playsInline
                onEnded={handleVideoEnd}
                className="h-full w-full object-cover"
                style={{
                  filter: 'contrast(1.1) saturate(1.15) brightness(1.05)',
                }}
              />
            ) : (
              <Image
                src={currentItem.src}
                alt={currentItem.title}
                fill
                className="object-cover"
                priority={currentIndex === 0}
              />
            )}

            {/* Gradient Overlay */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(to top, 
                  rgba(13, 13, 13, 0.9) 0%, 
                  rgba(13, 13, 13, 0.3) 30%,
                  transparent 60%
                )`,
              }}
            />

            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {currentItem.type === 'video' && (
                  <span 
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-3"
                    style={{ 
                      backgroundColor: 'rgba(201, 169, 98, 0.2)',
                      color: '#C9A962',
                    }}
                  >
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    Video
                  </span>
                )}
                <h3 
                  className="text-2xl md:text-3xl font-light mb-2"
                  style={{ color: '#F5F5F0' }}
                >
                  {currentItem.title}
                </h3>
                {currentItem.description && (
                  <p 
                    className="text-sm md:text-base max-w-xl"
                    style={{ color: 'rgba(245, 245, 240, 0.7)' }}
                  >
                    {currentItem.description}
                  </p>
                )}
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all opacity-0 hover:opacity-100 group-hover:opacity-100 focus:opacity-100"
          style={{ 
            backgroundColor: 'rgba(13, 13, 13, 0.8)',
            border: '1px solid rgba(201, 169, 98, 0.3)',
          }}
          aria-label="Previous"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A962" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all opacity-0 hover:opacity-100 group-hover:opacity-100 focus:opacity-100"
          style={{ 
            backgroundColor: 'rgba(13, 13, 13, 0.8)',
            border: '1px solid rgba(201, 169, 98, 0.3)',
          }}
          aria-label="Next"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A962" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        {/* Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/10">
          <motion.div
            className="h-full"
            style={{ backgroundColor: '#C9A962' }}
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* Play/Pause Toggle */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all"
          style={{ 
            backgroundColor: 'rgba(13, 13, 13, 0.8)',
            border: '1px solid rgba(201, 169, 98, 0.3)',
          }}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#C9A962">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#C9A962">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          )}
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => goToIndex(index)}
            className="relative w-3 h-3 rounded-full transition-all"
            style={{
              backgroundColor: index === currentIndex 
                ? '#C9A962' 
                : 'rgba(245, 245, 240, 0.2)',
              transform: index === currentIndex ? 'scale(1.2)' : 'scale(1)',
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Thumbnails */}
      {showThumbnails && (
        <div className="mt-6 grid grid-cols-3 md:grid-cols-6 gap-3">
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => goToIndex(index)}
              className={`relative aspect-video rounded-lg overflow-hidden transition-all ${
                index === currentIndex ? 'ring-2 ring-offset-2 ring-offset-black opacity-100' : 'opacity-60 hover:opacity-100'
              }`}
              style={{
                '--tw-ring-color': index === currentIndex ? '#C9A962' : 'transparent',
              } as React.CSSProperties}
            >
              {item.type === 'video' ? (
                <>
                  <video
                    src={item.src}
                    muted
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                      <polygon points="5,3 19,12 5,21" />
                    </svg>
                  </div>
                </>
              ) : (
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default MediaCarousel;
