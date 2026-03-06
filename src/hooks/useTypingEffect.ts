import { useState, useEffect, useCallback } from 'react';

interface UseTypingOptions {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
}

export const useTypingEffect = ({
  words,
  typingSpeed = 80,
  deletingSpeed = 45,
  pauseTime = 1800,
}: UseTypingOptions) => {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const tick = useCallback(() => {
    const current = words[wordIndex % words.length];
    const updated = isDeleting
      ? current.substring(0, text.length - 1)
      : current.substring(0, text.length + 1);

    setText(updated);

    if (!isDeleting && updated === current) {
      setTimeout(() => setIsDeleting(true), pauseTime);
      return;
    }

    if (isDeleting && updated === '') {
      setIsDeleting(false);
      setWordIndex((i) => i + 1);
    }
  }, [text, wordIndex, isDeleting, words, pauseTime]);

  useEffect(() => {
    const speed = isDeleting ? deletingSpeed : typingSpeed;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting, typingSpeed, deletingSpeed]);

  return { text, isDeleting };
};
