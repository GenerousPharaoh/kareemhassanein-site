import { pageMeta } from '@/lib/meta';
import { BOOK_META, BookView } from './BookView';

export const metadata = pageMeta(BOOK_META);

// Static: the call is chosen. The website check has its own static address, /book/check.
export default function BookPage() {
  return <BookView initialTopic="call" />;
}
