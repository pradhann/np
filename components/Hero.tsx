'use client';

import { motion } from 'framer-motion';
import { ReactElement, useContext, useRef } from 'react';
import { HiOutlineArrowNarrowDown } from 'react-icons/hi';
import { ScrollContext } from './Providers/ScrollProvider';
import MainLayout from './layouts/MainLayout';
import Image from 'next/image';

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
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100">
              I am
            </h2>
            <h3 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100">
              Nripesh Pradhan
            </h3>
            <p className="text-xl lg:text-2xl text-gray-700 dark:text-gray-300">
              Passionate developer and tech enthusiast. Driven by innovation and problem-solving.
            </p>
          </div>
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full overflow-hidden">
              <Image
                alt="Nripesh Pradhan"
                src="/static/images/hero_pic.png" // Adjust the path; it should start with a slash
                width={384} // These values should ideally match the intrinsic size of your image
                height={384} // for optimal display, but they can be adjusted for your layout needs
                className="object-cover" // Tailwind CSS classes for object-fit, etc., can still be applied
                layout="responsive" // This ensures the image scales nicely to the parent div's size
              />
            </div>
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
