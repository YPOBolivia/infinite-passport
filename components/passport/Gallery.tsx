import Image from 'next/image';
import { Camera } from 'lucide-react';

interface GalleryProps {
  photos: string[];
}

export default function Gallery({ photos }: GalleryProps) {
  if (photos.length === 0) {
    return (
      <div className="flex aspect-[3/1] flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-navy-900/15 text-navy-900/30 dark:border-ivory-100/15 dark:text-ivory-100/25">
        <Camera size={20} />
        <p className="text-xs">Photos from your experiences will appear here</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
      {photos.map((src, i) => (
        <div key={i} className="relative aspect-square overflow-hidden rounded-xl bg-navy-900/5 dark:bg-ivory-100/5">
          <Image src={src} alt="" fill sizes="200px" className="object-cover transition-transform duration-500 hover:scale-105" />
        </div>
      ))}
    </div>
  );
}
