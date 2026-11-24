"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { profileDataByLocale } from "@/data/profile";
import { uiTextByLocale } from "@/data/ui-text";
import { useLocale } from "@/lib/locale";

// ========== About セクション（ページを開いた時点で表示する） ==========
export function AboutSection() {
  const { locale } = useLocale();
  const t = uiTextByLocale[locale];
  const profileData = profileDataByLocale[locale];

  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 scroll-mt-24"
    >
      <div>
        <h2 className="text-xl font-bold text-neutral-900 mb-4 border-b border-neutral-200 pb-2 inline-block">
          {t.aboutTitle}
        </h2>
        <p className="text-neutral-600 leading-relaxed whitespace-pre-wrap">
          {profileData.about}
        </p>
      </div>

      <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div>
          <h3 className="text-sm font-semibold text-neutral-900 mb-2 uppercase tracking-wider">
            {t.interestsTitle}
          </h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {profileData.interests.map((kw) => (
              <Badge key={kw} variant="secondary">
                {kw}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-neutral-900 mb-2 uppercase tracking-wider">
            {t.skillsTitle}
          </h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {profileData.skills.map((kw) => (
              <Badge key={kw} variant="outline">
                {kw}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
