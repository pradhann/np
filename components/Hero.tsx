'use client';

import { motion } from 'framer-motion';
import { ReactElement, useContext, useRef } from 'react';
import { HiOutlineArrowNarrowDown } from 'react-icons/hi';
import { ScrollContext } from './Providers/ScrollProvider';
import MainLayout from './layouts/MainLayout';

export default function Hero(): ReactElement {
  const ref = useRef<HTMLHeadingElement>(null);
  const { scrollY } = useContext(ScrollContext);

  let progress = 0;
  const { current: elContainer } = ref;

  if (elContainer) {
    progress = Math.min(1, scrollY / elContainer.clientHeight);
  }

  return (
    <MainLayout>
    <div className="min-h-screen flex flex-col items-center justify-start pt-0">
      <div className="container mx-auto max-w-5xl flex flex-col lg:flex-row items-center justify-between gap-10 py-10 px-4 lg:px-0">
        <div className="flex-1 space-y-6 text-center lg:text-left">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100">I am</h2>
          <h3 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100">
            Nripesh Pradhan
          </h3>
          <p className="text-xl lg:text-2xl text-gray-700 dark:text-gray-300">
            Passionate developer and tech enthusiast. Driven by innovation and problem-solving.
          </p>
        </div>
        <div className="flex-1 flex justify-center lg:justify-end">
          <img
            alt="Nripesh Pradhan"
            className="w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full object-cover"
            src="static/images/profile_pic.png"
            style={{ aspectRatio: '1 / 1' }}
          />
        </div>
      </div>

      <motion.div
        animate={{ transform: `translateY(${progress * 10}vh)` }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <div
          role="presentation"
          className="flex cursor-pointer flex-col items-center justify-center"
          onClick={() => {
            const intro = document.querySelector('#intro');
            intro?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <HiOutlineArrowNarrowDown size={24} />
        </div>
      </motion.div>
    </div>
    </MainLayout>
  );
}
