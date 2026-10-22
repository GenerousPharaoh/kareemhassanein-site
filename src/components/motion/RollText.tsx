import s from './RollText.module.css';

/**
 * Text whose letters roll up one after another when its link is hovered or focused: each letter
 * carries a copy of itself below (a text shadow) and slides up to show it. CSS only. Words stay
 * whole when the line wraps. Screen readers get the plain text once.
 */
export function RollText({ text, className }: { text: string; className?: string }) {
  let n = 0;
  return (
    <span className={`${s.roll} ${className ?? ''}`}>
      <span className="sr-only">{text}</span>
      <span className={s.words} aria-hidden="true">
        {text.split(' ').map((word, w) => (
          <span key={w} className={s.word}>
            {[...word].map((ch) => (
              <span key={n} className={s.ch} style={{ ['--i' as string]: n++ }}>
                {ch}
              </span>
            ))}
          </span>
        ))}
      </span>
    </span>
  );
}
