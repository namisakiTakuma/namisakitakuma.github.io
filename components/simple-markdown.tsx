import { Fragment, type ReactNode } from "react";

// プライバシーポリシーなどの Markdown を、文を変えずにそのままページにする（ビルドのときに組み立てる）。
// 使える書き方は、# と ## の見出し、段落、- の箇条書き（2文字下げた行は前の項目の続き）、[文字](URL)、`コード`、**太字**、
// それに {{名前}}。{{名前}} は slots で渡したもの（メールアドレスのリンクなど）に置き換える。
// 「制定日：…」のように、どの行も「名前：中身」の段落は、名前と中身の組の一覧にする。
// 段落の中の改行は、「。」で終わる行のあとだけ改行として残し、文の途中の改行は前の行とつなげる

type Block =
  | { kind: "h1" | "h2" | "p"; lines: string[] }
  | { kind: "ul"; items: string[][] };

function parse(source: string): Block[] {
  const blocks: Block[] = [];
  let current: Block | null = null;
  for (const raw of source.split("\n")) {
    const line = raw.trimEnd();
    if (line === "") {
      current = null;
    } else if (line.startsWith("## ")) {
      blocks.push({ kind: "h2", lines: [line.slice(3)] });
      current = null;
    } else if (line.startsWith("# ")) {
      blocks.push({ kind: "h1", lines: [line.slice(2)] });
      current = null;
    } else if (line.startsWith("- ")) {
      if (current?.kind !== "ul") {
        current = { kind: "ul", items: [] };
        blocks.push(current);
      }
      current.items.push([line.slice(2)]);
    } else if (current?.kind === "ul" && line.startsWith("  ")) {
      current.items[current.items.length - 1].push(line.trim());
    } else if (current?.kind === "p") {
      current.lines.push(line);
    } else {
      current = { kind: "p", lines: [line] };
      blocks.push(current);
    }
  }
  return blocks;
}

const INLINE = /\[([^\]]+)\]\(([^)\s]+)\)|`([^`]+)`|\*\*([^*]+)\*\*|\{\{(\w+)\}\}/g;

function inline(text: string, slots: Record<string, ReactNode>): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(INLINE)) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const key = m.index;
    if (m[1] !== undefined) {
      out.push(
        <a
          key={key}
          href={m[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 hover:text-neutral-900"
        >
          {m[1]}
        </a>,
      );
    } else if (m[3] !== undefined) {
      out.push(
        <code key={key} className="break-all rounded bg-neutral-100 px-1 py-0.5 font-mono text-[0.9em]">
          {m[3]}
        </code>,
      );
    } else if (m[4] !== undefined) {
      out.push(<strong key={key}>{m[4]}</strong>);
    } else {
      if (!(m[5] in slots)) throw new Error(`{{${m[5]}}} に入れるものがありません`);
      out.push(<Fragment key={key}>{slots[m[5]]}</Fragment>);
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

// 行をつなぐ。「。」で終わる行のあとは改行、英数字どうしの間は空白、それ以外（日本語の文の途中）はそのままつなぐ
function joinLines(lines: string[], slots: Record<string, ReactNode>): ReactNode[] {
  return lines.flatMap((line, i) => {
    const parts = inline(line, slots);
    if (i === 0) return parts;
    const prev = lines[i - 1];
    if (/[。！？]$/.test(prev)) return [<br key={`br${i}`} />, ...parts];
    if (/[A-Za-z0-9]$/.test(prev) && /^[A-Za-z0-9]/.test(line)) return [" ", ...parts];
    return parts;
  });
}

export function SimpleMarkdown({
  source,
  slots = {},
}: {
  source: string;
  slots?: Record<string, ReactNode>;
}) {
  return (
    <>
      {parse(source).map((block, i) => {
        switch (block.kind) {
          case "h1":
            return (
              <h1 key={i} className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl [word-break:auto-phrase]">
                {inline(block.lines[0], slots)}
              </h1>
            );
          case "h2":
            return (
              <h2 key={i} className="pt-4 text-lg font-semibold text-neutral-900">
                {inline(block.lines[0], slots)}
              </h2>
            );
          case "ul":
            return (
              <ul key={i} className="list-disc space-y-1.5 pl-5 text-[15px] leading-relaxed text-neutral-700">
                {block.items.map((item, j) => (
                  <li key={j}>{joinLines(item, slots)}</li>
                ))}
              </ul>
            );
          case "p": {
            const pairs = block.lines.map((line) => /^([^：。]{1,12})：(.+)$/.exec(line));
            if (pairs.every((pair) => pair !== null)) {
              return (
                <dl key={i} className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm text-neutral-600">
                  {pairs.map((pair, j) => (
                    <Fragment key={j}>
                      <dt>{pair![1]}：</dt>
                      <dd className="min-w-0 break-words">{inline(pair![2], slots)}</dd>
                    </Fragment>
                  ))}
                </dl>
              );
            }
            return (
              <p key={i} className="text-[15px] leading-relaxed text-neutral-700">
                {joinLines(block.lines, slots)}
              </p>
            );
          }
        }
      })}
    </>
  );
}
