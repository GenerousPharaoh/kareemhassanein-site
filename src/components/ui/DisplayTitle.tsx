import { Children, cloneElement, isValidElement, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import styles from './DisplayTitle.module.css';

type Props = ComponentPropsWithoutRef<'h1'> & { as?: 'h1' | 'h2' };

/** Server-rendered word masks preserve natural wrapping, markup and the accessible heading. */
export function DisplayTitle({ as: Tag = 'h1', children, className, ...props }: Props) {
  let word = 0;
  const wrap = (nodes: ReactNode): ReactNode => Children.map(nodes, (node) => {
    if (typeof node === 'string' || typeof node === 'number') {
      return String(node).split(/(\s+)/).map((part, index) => /\S/.test(part) ? (
        <span key={index} className={styles.word}>
          <span className={styles.ink} style={{ ['--word' as string]: word++ }}>{part}</span>
        </span>
      ) : part);
    }
    if (isValidElement<{ children?: ReactNode }>(node) && node.props.children) return cloneElement(node, {}, wrap(node.props.children));
    return node;
  });

  return <Tag {...props} className={className} data-display>{wrap(children)}</Tag>;
}
