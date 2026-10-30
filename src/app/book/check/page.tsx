import { pageMeta } from '@/lib/meta';
import { BOOK_META, BookView } from '../BookView';

// The same page with the website check already chosen. Its canonical address is /book, so search
// engines see one booking page.
export const metadata = pageMeta(BOOK_META);

export default function BookCheckPage() {
  return <BookView initialTopic="check" />;
}
