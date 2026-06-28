import { useEffect, useRef } from 'react';

/**
 * Attaches an IntersectionObserver to the returned ref.
 * When the element enters viewport it gets the 'visible' class.
 */
export function useReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12, ...options }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

/**
 * Observes multiple children and staggers their reveal.
 * Pass the parent ref + childSelector.
 */
export function useStaggerReveal(childSelector = '[data-stagger]', baseDelay = 0) {
  const ref = useRef(null);

  useEffect(() => {
    const parent = ref.current;
    if (!parent) return;

    const children = parent.querySelectorAll(childSelector);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          children.forEach((child, i) => {
            child.style.transitionDelay = `${baseDelay + i * 0.1}s`;
            child.classList.add('visible');
          });
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.08 }
    );

    observer.observe(parent);
    return () => observer.disconnect();
  }, [childSelector, baseDelay]);

  return ref;
}

/** Counter animation hook */
export function useCounter(target, duration = 1800) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);

        const start = performance.now();
        const num = parseInt(String(target).replace(/\D/g, ''), 10);

        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
          el.textContent = Math.round(num * eased).toLocaleString();
          if (progress < 1) requestAnimationFrame(tick);
          else el.textContent = String(target).replace(/\d[\d,]*/, Math.round(num).toLocaleString());
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return ref;
}
