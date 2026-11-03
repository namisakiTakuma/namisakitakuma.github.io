import { readFileSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { EmailLink } from "@/components/email-link";
import { SimpleMarkdown } from "@/components/simple-markdown";
import { appsContactEmail, findApp } from "@/data/apps";

// ちょこメモのプライバシーポリシー。Chrome ウェブストアと Google の OAuth の設定に、この URL を登録する。
// 文の正本は隣の policy.md。直すときは policy.md を直す（{{contact}} が問い合わせ先のメールアドレスになる）
const app = findApp("chocomemo");
const policy = readFileSync(
  path.join(process.cwd(), "app/apps/chocomemo/privacy/policy.md"),
  "utf8",
);

export const metadata: Metadata = {
  title: `${app.name} プライバシーポリシー`,
  description: `${app.name}のプライバシーポリシー`,
};

export default function ChocomemoPrivacyPage() {
  return (
    <article className="space-y-5">
      <Link
        href={`/apps/${app.slug}`}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900"
      >
        <ArrowLeft className="h-4 w-4" />
        {app.name}
      </Link>
      <SimpleMarkdown
        source={policy}
        slots={{
          contact: (
            <EmailLink
              {...appsContactEmail}
              className="text-chocomemo-ink underline underline-offset-4 hover:text-neutral-900"
            />
          ),
        }}
      />
    </article>
  );
}
