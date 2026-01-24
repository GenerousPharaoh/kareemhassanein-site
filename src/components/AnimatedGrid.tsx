'use client';

import { motion } from 'framer-motion';

export default function AnimatedGrid() {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-[0.03]">
            <motion.div
                className="absolute inset-[-50%] w-[200%] h-[200%]"
                style={{
                    backgroundImage: `
            linear-gradient(to right, #888 1px, transparent 1px),
            linear-gradient(to bottom, #888 1px, transparent 1px)
          `,
                    backgroundSize: '100px 100px',
                }}
                initial={{ x: 0, y: 0 }}
                animate={{
                    x: [-20, -100],
                    y: [-20, -100]
                }}
                transition={{
                    repeat: Infinity,
                    duration: 40,
                    ease: "linear"
                }}
            />
            {/* Radial fade mask to keep it subtle */}
            <div className="absolute inset-0 bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_70%)]" />
        </div>
    );
}
