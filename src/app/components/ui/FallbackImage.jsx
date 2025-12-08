"use client";

import Image from 'next/image';
import { useState, useCallback } from 'react';

export default function FallbackImage({ src, fallback = '/image1.jpg', alt = '', ...props }) {
  const [currentSrc, setCurrentSrc] = useState(src || fallback);

  const handleError = useCallback(() => {
    if (currentSrc !== fallback) setCurrentSrc(fallback);
  }, [currentSrc, fallback]);

  return (
    <Image
      {...props}
      src={currentSrc}
      alt={alt}
      onError={handleError}
    />
  );
}
