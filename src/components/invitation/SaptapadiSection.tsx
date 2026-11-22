"use client";

import React from "react";
import { motion } from "framer-motion";
import { FloralDivider, CornerOrnament } from "../traditional/OrnamentalBorders";

interface SaptapadiStep {
  step: number;
  vow: string;
}

const saptapadiSteps: SaptapadiStep[] = [
  {
    step: 1,
    vow: "We will acquire the energy to share the responsibilities of married life",
  },
  {
    step: 2,
    vow: "We will work for the prosperity of our family",
  },
  {
    step: 3,
    vow: "We will cherish each other in happiness and stand by each other in sorrow",
  },
  {
    step: 4,
    vow: "We will raise strong and virtuous children",
  },
  {
    step: 5,
    vow: "We will fill our hearts with strength to fulfil all the needs of our lives",
  },
  {
    step: 6,
    vow: "We will fill our hearts with joy, peace and spiritual values",
  },
  {
    step: 7,
    vow: "We will always remain lifelong partners and true friends",
  },
];

/**
 * Sacred Kumkum Footprint Icon representing the holy steps around Agni
 */
const KumkumFootprintIcon: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg
    width="24"
    height="32"
    viewBox="0 0 24 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 ${className}`}
    aria-hidden="true"
  >
    {/* 5 Sacred Toes */}
    <ellipse cx="6" cy="3.5" rx="1.5" ry="1.8" fill="#8B1E2D" />
    <ellipse cx="9.5" cy="2.2" rx="1.6" ry="2.0" fill="#8B1E2D" />
    <ellipse cx="13.2" cy="2.5" rx="1.6" ry="1.9" fill="#8B1E2D" />
    <ellipse cx="16.5" cy="3.6" rx="1.4" ry="1.7" fill="#8B1E2D" />
    <ellipse cx="19.2" cy="5.2" rx="1.2" ry="1.5" fill="#8B1E2D" />
    {/* Sacred Kumkum Paduka Sole */}
    <path
      d="M12 7.5C8 7.5 6 11 6 15C6 19.5 8 21.5 8.5 24.5C9 27.5 10 30.5 12 30.5C14 30.5 15 27.5 15.5 24.5C16 21.5 18 19.5 18 15C18 11 16 7.5 12 7.5Z"
      fill="#8B1E2D"
    />
  </svg>
);

export const SaptapadiSection: React.FC = () => {
  return (
    <section
      id="saptapadi"
      className="relative py-20 px-4 sm:px-6 bg-[#F5EBD8] text-[#4A0B1A] overflow-hidden"
    >
      {/* Decorative Section Background Ambiance */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <span className="font-telugu text-lg text-[#8B1E2D] font-bold block mb-1">
          సప్తపది — ఏడడుగుల బంధం
        </span>
        <h2 className="font-serif-royal text-3xl sm:text-4xl md:text-5xl font-bold text-[#6D1429] tracking-wide">
          Sacred Vows of Togetherness
        </h2>
        <p className="font-serif-elegant italic text-lg sm:text-xl text-[#8B1E2D] mt-2 max-w-xl mx-auto">
          Seven sacred steps around the holy fire, uniting two souls in eternal harmony, love, and devotion.
        </p>
        <FloralDivider theme="maroon" />
      </div>

      {/* Saptapadi Scroll Card - Exactly styled like the reference */}
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative bg-[#FFFDF8] rounded-2xl p-6 sm:p-10 border-2 border-[#C9A45C]/70 shadow-2xl overflow-hidden"
        >
          <CornerOrnament position="top-left" size={44} color="#8B1E2D" />
          <CornerOrnament position="top-right" size={44} color="#8B1E2D" />
          <CornerOrnament position="bottom-left" size={44} color="#8B1E2D" />
          <CornerOrnament position="bottom-right" size={44} color="#8B1E2D" />

          {/* Header */}
          <div className="text-center pt-2 pb-6 border-b border-[#C9A45C]/30">
            <h3 className="font-serif-elegant italic text-4xl sm:text-5xl text-[#6D1429] tracking-wide">
              Saptapadi
            </h3>
            <p className="font-serif-royal text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#9A7730] uppercase mt-2">
              The Seven Sacred Steps
            </p>
          </div>

          {/* Seven Steps List */}
          <div className="divide-y divide-dashed divide-[#C9A45C]/40 pt-2">
            {saptapadiSteps.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="py-4 sm:py-5 flex items-center space-x-4 sm:space-x-6 group"
              >
                {/* Red Kumkum Footstep Icon */}
                <div className="shrink-0 transition-transform duration-300 group-hover:scale-110">
                  <KumkumFootprintIcon />
                </div>

                {/* Vow Text in Elegant Italic Serif */}
                <p className="font-serif-elegant italic text-base sm:text-lg text-[#4A0B1A] leading-relaxed">
                  {item.vow}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Sacred Conclusion Blessing */}
          <div className="text-center mt-6 pt-4 border-t border-[#C9A45C]/30">
            <p className="font-telugu text-sm text-[#8B1E2D] font-medium">
              ॥ ధర్మేచ అర్థేచ కామేచ నాతిచరామి ॥
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
