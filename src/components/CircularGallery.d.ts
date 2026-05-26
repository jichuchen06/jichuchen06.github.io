declare module '@/components/CircularGallery' {
  import * as React from 'react';

  export interface CircularGalleryItem {
    image: string;
    text: string;
  }

  export interface CircularGalleryProps {
    items?: CircularGalleryItem[];
    bend?: number;
    textColor?: string;
    borderRadius?: number;
    scrollEase?: number;
  }

  const CircularGallery: React.ComponentType<CircularGalleryProps>;
  export default CircularGallery;
}
