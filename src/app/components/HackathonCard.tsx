'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  motion,
  AnimatePresence,
} from 'framer-motion';

// ---------- PORTAL SETUP ----------
import ReactDOM from 'react-dom';

function useIsMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
}

interface PortalProps {
  children: React.ReactNode;
}

function Portal({ children }: PortalProps) {
  const isMounted = useIsMounted();
  if (!isMounted) return null;
  return ReactDOM.createPortal(children, document.body);
}
// -----------------------------------

interface Hackathon {
  name: string;
  projectTitle: string;
  description: string;
  image?: string;
  tech?: string[];
}

interface HackathonCardProps {
  hackathon: Hackathon;
  isDarkMode: boolean;
}

const HackathonCard: React.FC<HackathonCardProps> = ({ hackathon, isDarkMode }) => {
  return (
    <div className="w-full p-8">
      {/* Just render the TiltCard directly. No grid or place-content-center. */}
      <TiltCard hackathon={hackathon} isDarkMode={isDarkMode} />
    </div>
  );
};

interface TiltCardProps {
  hackathon: Hackathon;
  isDarkMode: boolean;
}

const TiltCard: React.FC<TiltCardProps> = ({ hackathon, isDarkMode }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close the card if user clicks outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
        setIsFlipped(false);
      }
    };
    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded]);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
    setIsFlipped(!isFlipped);
  };

  // ---------- COLLAPSED CARD (relative) ----------
  const collapsedCard = (
    <motion.div
      ref={cardRef}
      key="collapsed"
      onClick={handleClick}
      layout
      style={{
        position: 'relative',
        width: isMobile ? '16rem' : '18rem',
        height: isMobile ? '11rem' : '13rem',
        cursor: 'pointer',
        zIndex: 1,
      }}
      transition={{
        layout: { duration: 0.4 },
        width: { duration: 0.4 },
        height: { duration: 0.4 },
      }}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.4 }}
        style={{ transformStyle: 'preserve-3d' }}
        className="w-full h-full"
      >
        <CardFront hackathon={hackathon} isDarkMode={isDarkMode} isFlipped={isFlipped} isHovered={false} />
        <CardBack
          hackathon={hackathon}
          isDarkMode={isDarkMode}
          isFlipped={isFlipped}
          isHovered={false}
          isExpanded={false}
        />
      </motion.div>
    </motion.div>
  );

  // ---------- EXPANDED CARD (fixed + portal) ----------
  const expandedCard = (
    <Portal>
      <motion.div
        ref={cardRef}
        key="expanded"
        onClick={handleClick}
        layout
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '40rem',
          height: '500px',
          zIndex: 999,
          cursor: 'pointer',
        }}
        transition={{
          layout: { duration: 0.1 },
          width: { duration: 0.1 },
          height: { duration: 0.1 },
        }}
      >
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.4 }}
          style={{ transformStyle: 'preserve-3d' }}
          className="w-full h-full"
        >
          <CardFront hackathon={hackathon} isDarkMode={isDarkMode} isFlipped={isFlipped} isHovered={false} />
          <CardBack
            hackathon={hackathon}
            isDarkMode={isDarkMode}
            isFlipped={isFlipped}
            isHovered={false}
            isExpanded={true}
          />
        </motion.div>
      </motion.div>

      {/* Dim the background while expanded */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/20"
        style={{ zIndex: 998 }}
      />
    </Portal>
  );

  return (
    <div className="relative w-full">
      {/* Only show one version of the card at a time */}
      <AnimatePresence mode="wait">
        {isExpanded ? expandedCard : collapsedCard}
      </AnimatePresence>
    </div>
  );
};

interface CardProps {
  hackathon: Hackathon;
  isDarkMode: boolean;
  isFlipped: boolean;
  isHovered: boolean;
  isExpanded?: boolean;
}

const CardFront: React.FC<Omit<CardProps, 'sheenGradient' | 'x' | 'y'>> = ({
  hackathon,
  isDarkMode,
}) => {
  return (
    <motion.div
      style={{
        backfaceVisibility: 'hidden',
        position: 'absolute',
        width: '100%',
        height: '100%',
      }}
      className="z-10 rounded-xl overflow-hidden border border-white border-opacity-20"
    >
      <div
        className={`absolute inset-0 ${
          isDarkMode ? 'bg-[#fecfd2]' : 'bg-[#e7b7b7]'
        }`}
      />
      <div className="z-10 absolute inset-4 flex flex-col items-center justify-center">
        <h2
          className={`text-lg mb-2 text-center font-newsreader ${
            !isDarkMode ? 'text-[#773035]' : 'text-[#FFDCDF]'
          }`}
        >
          {hackathon.name}
        </h2>
        <p
          className={`text-sm font-newsreader ${
            !isDarkMode ? 'text-[#773035]' : 'text-[#FFDCDF]'
          }`}
        >
          {hackathon.projectTitle}
        </p>
      </div>
    </motion.div>
  );
};

const CardBack: React.FC<Omit<CardProps, 'sheenGradient' | 'x' | 'y'>> = ({
  hackathon,
  isDarkMode,
  isExpanded,
}) => {
  return (
    <motion.div
      style={{
        backfaceVisibility: 'hidden',
        transform: 'rotateY(180deg)',
        position: 'absolute',
        width: '100%',
        height: '100%',
      }}
      className={`z-20 ${
        isDarkMode ? 'bg-[#fecfd2]' : 'bg-[#e7b7b7]'
      } border border-white border-opacity-20 rounded-xl overflow-hidden`}
    >
      <div className="absolute inset-0 flex flex-col justify-start p-8">
        <h2
          className={`text-2xl mb-4 font-newsreader ${
            !isDarkMode ? 'text-[#773035]' : 'text-[#FFDCDF]'
          }`}
        >
          {hackathon.name}
        </h2>
        {hackathon.image && (
          <div className="relative h-[200px] w-full">
            <Image
              src={hackathon.image}
              alt="Project image"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        )}
        <p
          className={`font-newsreader ${
            !isDarkMode ? 'text-[#773035]' : 'text-[#FFDCDF]'
          } ${isExpanded ? 'text-lg' : 'text-sm'} mb-4 mt-4`}
        >
          {hackathon.description}
        </p>
        {hackathon.tech && (
          <p className={`font-newsreader  ${isDarkMode ? 'text-[#773035]' : 'text-[#773035]'}`}>

          <span className=" text-[#c02e7e]">Tech Stack:</span> {hackathon.tech.join(', ')}
        </p>
        )}
        
      </div>
    </motion.div>
  );
};

export default HackathonCard;