// No page-level transition. A wrapper that fades the whole document competes
// with each section's own entrance, which read as a flash on refresh, and a
// motion component here would also ship the page invisible until hydration.
export default function Template({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
