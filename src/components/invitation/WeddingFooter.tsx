"use client";

import React, { useState } from "react";
import { weddingConfig } from "@/data/wedding-data";
import { FloralDivider } from "../traditional/OrnamentalBorders";
import { KalashIcon } from "../traditional/KalashIcon";
import { ArrowUp, Share2, Copy, Check } from "lucide-react";

export const WeddingFooter: React.FC = () => {
  const { couple, weddingDateTime, shlokas, venue } = weddingConfig;
  const [copied, setCopied] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleShareWhatsApp = () => {
    const shareText = encodeURIComponent(
      `॥ శ్రీ గణేశాయ నమః ॥\n\nWe joyfully invite you and your family to celebrate the wedding ceremony of *${couple.groom.name} & ${couple.bride.name}*.\n\n🗓️ *Date:* ${weddingDateTime.dateFormatted}\n⏰ *Sumuhurtham:* ${weddingDateTime.muhurthamTime}\n📍 *Venue:* ${venue.name}, ${venue.city}\n\nView the Wedding Invitation & Details:\nhttps://ajay-weds-anupama.vercel.app`
    );
    window.open(`https://api.whatsapp.com/send?text=${shareText}`, "_blank");
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText("https://ajay-weds-anupama.vercel.app").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <footer className="relative bg-[#FFF8E9] text-[#4A0B1A] pt-16 pb-12 px-4 sm:px-6 border-t-2 border-[#C9A45C]/50 overflow-hidden text-center select-none">
      {/* Decorative center Kalash icon */}
      <div className="flex justify-center mb-4">
        <KalashIcon size={46} />
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Sacred Telugu Inscription */}
        <p className="font-telugu text-lg sm:text-xl font-bold text-[#8B1E2D] mb-1">
          {shlokas.teluguGanesha}
        </p>
        {shlokas.blessingTelugu?.trim() && (
          <p className="font-serif-royal text-sm text-[#9A7730] uppercase tracking-widest font-semibold mb-3">
            {shlokas.blessingTelugu}
          </p>
        )}

        {/* Thank You Note */}
        <p className="font-serif-elegant italic text-xl sm:text-2xl text-[#6D1429] my-4 leading-relaxed">
          &ldquo;Your presence, love, and sacred blessings mean the world to us as we begin this new chapter.&rdquo;
        </p>

        <p className="text-xs uppercase tracking-widest text-[#9A7730] font-semibold mt-6 mb-1">
          With Love and Gratitude,
        </p>

        {/* Couple Names */}
        <h3 className="font-serif-royal text-3xl sm:text-4xl font-extrabold text-[#6D1429] tracking-wide">
          {couple.groom.name} &amp; {couple.bride.name}
        </h3>

        {/* Date */}
        <p className="font-serif-royal text-sm text-[#8B1E2D] font-medium tracking-wider mt-2">
          {weddingDateTime.dateFormatted} • {weddingConfig.venue.city}
        </p>

        {/* Quick Action Share Row */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <button
            onClick={handleShareWhatsApp}
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-[#25D366] text-white text-xs font-serif-royal font-semibold hover:bg-[#1EBE5D] transition-colors shadow-md cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>Share on WhatsApp</span>
          </button>
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full border border-[#C9A45C] bg-[#FFFDF8] text-[#8B1E2D] text-xs font-serif-royal font-semibold hover:bg-[#F5EBD8] transition-colors shadow-sm cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-green-700" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? "Link Copied!" : "Copy Link"}</span>
          </button>
        </div>

        <FloralDivider theme="maroon" className="my-8" />

        {/* Back to Top Button */}
        <div className="flex justify-center">
          <button
            onClick={scrollToTop}
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full border border-[#C9A45C] bg-[#FFFDF8] text-xs font-serif-royal font-semibold text-[#8B1E2D] hover:bg-[#6D1429] hover:text-[#FFF8E9] hover:border-[#6D1429] transition-all duration-300 shadow-sm cursor-pointer group"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};
