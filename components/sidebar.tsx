"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink, Github, MapPin } from "lucide-react";
import { EmailContact } from "@/components/email-contact";
import { ProfileIcon } from "@/components/profile-icon";
import { contactEmail, profileDataByLocale } from "@/data/profile";
import { uiTextByLocale } from "@/data/ui-text";
import { LocaleSwitch } from "@/components/locale-switch";
import { localeHref, useLocale } from "@/lib/locale";
import { cn } from "@/lib/utils";

// ================= サイドバー (左カラム) =================
// introShowing: トップの幕が出ている間は true。アイコンは幕が上がってから動き出す
export function Sidebar({
  className,
  introShowing = false,
}: {
  className?: string;
  introShowing?: boolean;
}) {
  const { locale } = useLocale();
  const t = uiTextByLocale[locale];
  const profileData = profileDataByLocale[locale];

  return (
    <aside
      className={cn(
        "lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto px-6 py-12 lg:py-24 border-b lg:border-b-0 lg:border-r border-neutral-200 bg-zinc-50 z-10",
        className,
      )}
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-6"
      >
        <div>
          <ProfileIcon
            alt={profileData.iconAlt}
            hold={introShowing}
            className="mb-5 h-24 w-24"
          />
          <h1
            lang="ja"
            className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl"
          >
            並崎 功真
          </h1>
          <p className="mt-4 text-base text-neutral-600 leading-relaxed font-medium whitespace-pre-line [word-break:auto-phrase]">
            {t.profileHeadline}
          </p>
          <LocaleSwitch variant="sidebar" />
        </div>

        <div className="flex flex-col gap-2 text-sm text-neutral-500">
          <span className="flex items-center">
            <MapPin className="w-4 h-4 mr-2" /> Osaka, Japan
          </span>
          <a
            href="https://cmiru.com/member/namisakitakuma"
            target="_blank"
            rel="noreferrer"
            className="flex items-center hover:text-blue-600 transition-colors w-fit"
          >
            <ExternalLink className="w-4 h-4 mr-2" /> {t.cmiruProfile}
          </a>
          <a
            href="https://github.com/namisakiTakuma"
            target="_blank"
            rel="noreferrer"
            className="flex items-center hover:text-blue-600 transition-colors w-fit"
          >
            <Github className="w-4 h-4 mr-2" /> GitHub (@namisakiTakuma)
          </a>
          <EmailContact {...contactEmail} labels={t.email} />
        </div>

        {/* ナビゲーション（詳細ページからでも、トップの各項目へ移動する） */}
        <nav className="mt-8 flex flex-col gap-4">
          {t.nav.map((link) => (
            <Link
              key={link.name}
              href={localeHref(locale, link.href)}
              className="group flex items-center text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors w-fit"
            >
              <span className="w-8 h-px bg-neutral-300 mr-4 group-hover:w-12 group-hover:bg-neutral-900 transition-all duration-300"></span>
              {link.name}
            </Link>
          ))}
        </nav>
      </motion.div>
    </aside>
  );
}
