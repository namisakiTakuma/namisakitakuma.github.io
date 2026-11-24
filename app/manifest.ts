import type { MetadataRoute } from "next";

// ホーム画面に置いたときのアイコン（Android など）。タブのアイコン（app/favicon.ico、猫の頭だけ）とは絵が違うので、
// 192px の絵は <link rel="icon"> には出さず、ここにだけ書く。rel="icon" に並べると、ブラウザによってはタブにもこれを縮めて使う
// output: 'export' では、静的に作ると書かないと書き出せない
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Takuma | Portfolio",
    short_name: "Takuma",
    start_url: "/",
    display: "browser",
    icons: [{ src: "/icon-192.png", sizes: "192x192", type: "image/png" }],
  };
}
