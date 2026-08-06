'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X, MapPin, Calendar } from 'lucide-react';
import { StampDefinition, StampInstance } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import StampIcon from './StampIcon';
import Stamp from './Stamp';

interface StampModalProps {
  definition: StampDefinition | null;
  instance?: StampInstance;
  onClose: () => void;
}

export default function StampModal({ definition, instance, onClose }: StampModalProps) {
  return (
    <AnimatePresence>
      {definition && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center bg-navy-950/60 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: 'spring', damping: 26, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="paper-texture relative w-full max-w-md rounded-t-3xl border border-navy-900/10 bg-ivory-50 p-8 shadow-passport dark:border-ivory-100/10 dark:bg-navy-800 sm:rounded-3xl"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full text-navy-900/50 hover:bg-navy-900/5 dark:text-ivory-100/50 dark:hover:bg-ivory-100/5"
            >
              <X size={16} />
            </button>

            <div className="flex flex-col items-center text-center">
              <Stamp definition={definition} earned={!!instance} size="lg" />

              <h2 className="mt-5 font-display text-2xl italic text-navy-900 dark:text-ivory-50">
                {definition.secret && !instance ? 'A hidden stamp' : definition.name}
              </h2>

              <p className="eyebrow mt-2">{definition.category}</p>

              <p className="mt-4 max-w-xs text-sm leading-relaxed text-navy-900/70 dark:text-ivory-100/70">
                {definition.secret && !instance
                  ? 'This stamp reveals its story only once earned. Keep exploring the journey.'
                  : definition.description}
              </p>

              {instance && (
                <div className="mt-6 w-full divider-gold" />
              )}

              {instance && (
                <div className="mt-6 grid w-full grid-cols-2 gap-4 text-left">
                  <div className="flex items-center gap-2 text-sm text-navy-900/70 dark:text-ivory-100/70">
                    <Calendar size={14} className="text-gold-500" />
                    {formatDate(instance.awardedAt)}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-navy-900/70 dark:text-ivory-100/70">
                    <MapPin size={14} className="text-gold-500" />
                    {instance.city}, {instance.country}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
