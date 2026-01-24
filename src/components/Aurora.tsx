'use client';

import { motion } from 'framer-motion';

export default function Aurora() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            <div className="absolute inset-0 bg-[#0d1117]" />

            {/* Aurora Orbs */}
            <motion.div
                animate={{
                    x: [0, 100, 0],
                    y: [0, -50, 0],
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] bg-violet-600/20 blur-[120px] rounded-full"
            />

            <motion.div
                animate={{
                    x: [0, -100, 0],
                    y: [0, 50, 0],
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 2 }}
                className="absolute bottom-[-10%] right-[-10%] w-[80vw] h-[80vw] bg-teal-500/20 blur-[140px] rounded-full"
            />

            <motion.div
                animate={{
                    x: [0, 50, 0],
                    y: [0, 100, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear", delay: 1 }}
                className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[50vw] h-[50vw] bg-indigo-500/10 blur-[100px] rounded-full"
            />
        </div>
    );
}
