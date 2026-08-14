// Page transitions are CSS, not framer-motion. A motion component writes its
// initial styles into the server HTML, so wrapping every page in one left the
// whole document invisible until hydration and then slid it upward, fighting
// the hero's own reveal. This fades opacity only: it paints with the document,
// moves no layout, and leaves the entrance choreography to the page itself.
export default function Template({ children }: { children: React.ReactNode }) {
    return <div className="page-enter">{children}</div>;
}
