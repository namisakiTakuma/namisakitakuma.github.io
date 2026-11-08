export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  // 一覧のカードに出す、ひとことの説明
  summary: string;
  // 一覧のカードで目立たせる成果。==…== で囲むと蛍光ペンが引かれる
  highlight?: string;
  // 一覧のカードの上に出す画像（1200:630 にそろえて public/images/projects/ に置く）。ないときは薄いアイコンだけの枠になる
  image?: { src: string; alt: string };
  // 詳細ページの最初に出す短い動画（MP4）。自動では音なしで流れ、見た人が音を出せる。src は Cloudflare R2 の URL（サイト内の /videos/… でもよい）。
  // poster は読み込む前と動きを減らす設定のときに出す表紙で、public/images/projects/ に置く。width と height は動画の縦横で、縦長なら幅を狭めて出す。label は動画の中身の説明
  video?: { src: string; poster: string; width: number; height: number; label: string };
  tags: string[];
  // 始まり方。課題から始まったものは「背景課題」、人の声から始まったものは「きっかけ」という見出しになる
  originKind: "problem" | "trigger";
  // 詳細ページは、作ったものの面白さと技術を見せる。始まり → できること → 技術の見どころ → 担当 → 結果 の順に出す。
  // 始まりは1〜2文に縮める
  origin: string;
  // 使う人から見て、何ができるか・どう遊ぶか
  features: { label: string; text: string }[];
  // 技術の工夫。何をどう解いたか
  techPoints: { label: string; text: string }[];
  // 担当。チームで作ったものだけ書く
  role?: string;
  // 結果。一覧のカードの highlight だけでは伝わりきらないときに書く
  result?: string;
  url?: string;
  // 配っているプロダクトなら、data/apps.ts の slug。詳細ページに紹介ページ（/apps/<slug>/）へのリンクが出る
  app?: string;
  status?: "ongoing";
}

export type Locale = "ja" | "en";

export const projectsDataByLocale: Record<Locale, ProjectItem[]> = {
  ja: [
    {
      id: "picotouch",
      title: "アニマル ピコタッチ（NFCボードゲーム）",
      category: "新規事業 / 企画開発 / エンタメ",
      summary:
        "NFCカードをタッチして遊ぶ、家族向けのHit&Blow形式のボードゲーム。iOSアプリと連動する。",
      highlight: "==ボードゲームマーケット（幕張メッセ）で展示==、Amazonで販売中",
      image: {
        src: "/images/projects/picotouch.webp",
        alt: "アニマル ピコタッチのロゴと、動物が描かれたカード",
      },
      tags: ["Flutter", "GCP", "NFC", "iOS"],
      originKind: "problem",
      origin:
        "役員として経営に携わるシーみるに、取引先企業から、NFCカードの販売を広げたいという相談があった。NFC名刺などのビジネス向けが中心だったため、自分たちも作ってみたかったゲームとして、家族で遊べる形にすることにした。",
      features: [
        {
          label: "相棒を選ぶ",
          text: "アプリを起動して、6枚のプレイヤーカードから相棒を選んでタッチする。各プレイヤーには体力があり、その回数分だけ行動できる。難易度も選べる。",
        },
        {
          label: "数字を当てる",
          text: "1つの数字をみんなで当てて、最初に当てた人が勝ち。回答すると、数字も場所も合っている数の「Hit」と、数字は合っているが場所が違う数の「Blow」の、2つのヒントが出る。",
        },
        {
          label: "回答権は早い者勝ち",
          text: "回答権は、カードをスマホにタッチして取る。",
        },
        {
          label: "ヒントを見る",
          text: "アプリに出るQRコードを読み込むと、ほかのスマホからもヒントを見られる。",
        },
        {
          label: "イベント",
          text: "ゲームが進むと、まれにイベントが起きる。参加したいときは、カードをスキャンする。",
        },
      ],
      techPoints: [
        {
          label: "タッチする手ざわり",
          text: "NFCならではの、カードを手に取ってタッチする操作を軸に、短い時間でも盛り上がる画面と流れを設計した。",
        },
        {
          label: "アプリとWebで分ける",
          text: "ゲームはアプリで遊び、履歴はWebで見る形に分けた。ゲーム画面はFlutterで作り、バックエンドと履歴の管理はGCPに置いた。",
        },
      ],
      role:
        "ターゲットをファミリー層へ広げる方針を立て、NFCカードを使ったHit&Blow形式のボードゲームを企画した。アプリとWebの役割分担も設計した。",
      result:
        "2025年12月に==幕張メッセ開催のボードゲームマーケットで展示==し、海外来場者からファミリー層まで幅広く好評を得た。現在はAmazonで販売中。",
    },
    {
      id: "yes-or-no",
      title: "YES or NO（匿名YES/NOパーティーゲーム）",
      category: "Webサービス / リアルタイム通信 / エンタメ",
      summary:
        "その場で出し合った質問に、スマホから匿名でYES/NOを答えるパーティーゲーム。登録なしで遊べる。",
      highlight: "99人の一斉回答で==失敗した操作0件・集計の不一致0件==",
      image: { src: "/images/projects/yes-or-no.webp", alt: "YES or NO のロゴ" },
      video: {
        src: "https://portfolio-media.ta-namisaki.workers.dev/yes-or-no-promo-v1.mp4",
        poster: "/images/projects/yes-or-no-video.webp",
        width: 720,
        height: 1280,
        label: "YES or NO の紹介動画。スマホから匿名で質問を出し、みんなが匿名で答え、結果発表で盛り上がる",
      },
      tags: ["Next.js", "Cloudflare Workers", "Durable Objects", "WebSocket", "BigQuery"],
      originKind: "trigger",
      origin:
        "友人から、みんなで集まる場で遊べるゲームがほしいという声を聞いたのが始まり。人前では答えにくい質問でも本音が聞けて、事前準備のいる匿名アンケートと違い、その場で質問を出し合える、登録なしのゲームとして作った。",
      features: [
        {
          label: "参加する",
          text: "登録なしで、スマホからルームコードかQRコードで参加する。",
        },
        {
          label: "答える",
          text: "参加者が投稿した質問に、順番に匿名でYES/NOで答える。",
        },
        {
          label: "結果を見る",
          text: "誰が何と答えたかは分からず、集計した結果だけが画面に出る。",
        },
      ],
      techPoints: [
        {
          label: "99人の一斉回答でも壊れない",
          text: "最初のFirebaseの構成では、大人数が一斉に答えると書き込みが競合した。そこでCloudflare WorkersとDurable Objectsへ移り、ルームごとに処理を1本にまとめた。99人・10問の負荷試験では、一斉参加・一斉回答で==失敗した操作0件・集計の不一致0件==を確かめた。",
        },
        {
          label: "答えを読ませない",
          text: "質問と投票は利用者から読めないようにし、匿名化した集計結果だけを配る。不正な利用は、Turnstileとレート制限で防ぐ。",
        },
        {
          label: "裏に回しても戻る",
          text: "状態はWebSocketで配る。iPhoneのSafariやChromeでアプリを裏に回して戻しても、自動で最新の状態に戻ることを実機で確かめた。",
        },
        {
          label: "お題を良くする",
          text: "利用データはD1にためてBigQueryへ毎日送り、お題の改善に使っている。",
        },
      ],
      role:
        "株式会社シーみるのプロダクトとして、開発メンバーとともにサービスの方向性を検討した。バックエンドのCloudflare移行や本番切り替え、プライバシーポリシー改定などのプルリクエストをレビューし、リリース判断を担当した。",
      url: "https://yesno.cmiru.com",
    },
    {
      id: "machinaka-bingo",
      title: "街なかビンゴ（街歩きビンゴアプリ）",
      category: "モバイルアプリ / 企画開発 / 地域・おでかけ",
      summary:
        "街で見つけたものでマスを埋めていく、散歩やおでかけ向けのビンゴアプリ。",
      highlight: "==App StoreとGoogle Playで公開==",
      image: {
        src: "/images/projects/machinaka-bingo.webp",
        alt: "街なかビンゴのアプリ画面と、街並みのイラスト",
      },
      tags: ["Flutter", "Firebase", "iOS", "Android"],
      originKind: "trigger",
      origin:
        "友人たちが普段から遊んでいた、街で見つけたものでマスを埋めていく手作りのビンゴを、本人たちの声を受けてアプリにした。既存のビンゴアプリは抽選型が中心で、街歩きと組み合わせて遊べるものは少なかった。",
      features: [
        {
          label: "カードを作る",
          text: "好きな言葉を入れる、おすすめのテーマから選ぶ、単語群からランダムに作る、の3通りでカードを作れる。3×3〜5×5のサイズやFREEマスも選べる。",
        },
        {
          label: "見つけて埋める",
          text: "見つけたマスは写真付きで記録できる。完成したカードは画像として保存できる。",
        },
        {
          label: "友達に送る",
          text: "作ったカードを、リンクで友達に送れる。",
        },
      ],
      techPoints: [
        {
          label: "リンク1本で共有",
          text: "カードはFirestoreを使ったリンクで共有し、受け取った人はWeb版からも遊べるようにした。",
        },
        {
          label: "公開した後も育てる",
          text: "FlutterでiOSとAndroidのアプリを作った。Remote Configで更新を案内し、GA4では同意を得てから計測する。ランディングページはCloudflare Pagesで公開した。",
        },
      ],
      role:
        "株式会社シーみるのプロダクトとして、開発メンバーとともに企画・サービス設計に関わった。",
      url: "https://bingo.cmiru.com",
    },
    {
      id: "memo-sync",
      title: "ちょこメモ（Chrome拡張機能）",
      category: "個人開発 / ブラウザ拡張 / 生産性",
      summary:
        "すぐ書けて、複数のPCに同期できる、日本語のシンプルなメモのChrome拡張機能。",
      image: {
        src: "/images/projects/memo-sync.webp",
        alt: "ちょこメモのアイコンと、チェックリストと表を書いたメモの画面",
      },
      video: {
        src: "https://portfolio-media.ta-namisaki.workers.dev/chocomemo-promo-v1.mp4",
        poster: "/images/projects/memo-sync-video.webp",
        width: 1280,
        height: 720,
        label: "ちょこメモの紹介動画。メモを書き、番号のタブで切り替え、2台のPCで同期し、画像ごとAIに渡し、秘密を伏せてコピーする",
      },
      tags: ["JavaScript", "Chrome拡張機能", "Manifest V3", "CodeMirror", "Google Drive API"],
      originKind: "trigger",
      origin:
        "使っていたメモの拡張機能は、日本語での使いやすさや、複数のPCでの同期に物足りなさがあった。そこで、開いてすぐ書けて、どのPCでも同じメモが見られる道具を、自分で作ることにした。",
      // できることは、紹介ページ（app/apps/chocomemo/page.tsx）の文を写したもの。紹介ページを直したら、ここも合わせる
      features: [
        {
          label: "書く",
          text: "番号のタブでメモを切り替える。書いたそばから保存する。日時や、表示中のページのタイトルとURLをボタンで入れられる。右クリックで、選んだ文字をメモに送れる。サイドパネルでも開ける。",
        },
        {
          label: "Markdown",
          text: "書式を付けて表示に切り替えると、見出しや表が整った見た目のまま書ける。「#」や「**」の記号は、カーソルのある所だけに出る。チェックボックスは押すだけで入れ替わり、箇条書きはEnterで次の行にも続く。行の頭で「/」を打つと、表・見出し・チェックボックスなどを選んで入れられる。「書式付きでコピー」で、Slack・Googleドキュメント・Gmailに貼っても書式が残る。",
        },
        {
          label: "探す・置換",
          text: "すべてのメモから探して、置換できる。大文字と小文字、全角と半角、ひらがなとカタカナは区別しない。置換の直後は「元に戻す」で戻せる。",
        },
        {
          label: "画像",
          text: "貼り付けとドラッグで画像を足せる。四角・矢印・文字で印を付けられる。書いている場所に「[画像 1]」の印が入る。",
        },
        {
          label: "AIに渡す",
          text: "「コピー」で、文章と画像の保存場所をまとめてコピーする。Claude CodeなどのコーディングAIにそのまま貼れる。",
        },
        {
          label: "整理",
          text: "グループで絞り込める。メモのタブもグループも、ドラッグで並べ替えられる。削除したメモと画像は、ゴミ箱から30日間戻せる。テキストやZIPで書き出し・取り込みができる。",
        },
        {
          label: "守る",
          text: "パスワード・APIキー・個人情報らしい文字を見つけて知らせる。コピーの前に、見つけた文字を伏せられる。メモを隠して、画面に出さないこともできる。隠すのは画面だけで、暗号化はしない。",
        },
      ],
      techPoints: [
        {
          label: "同期でメモを消さない",
          text: "メモは番号ではなく固定のIDで扱い、メモごとに新しいほうを採用する。両方のPCで書き換わっていたときは、負けたほうをバックアップに取って知らせ、消えたことも印を残して伝える。同期の動きは、自動テストで確かめられるようにした。",
        },
        {
          label: "2つの同期方式",
          text: "同期は、Chromeの同期機能か、Googleドライブのアプリ専用の見えない場所から選べる。Chromeの同期機能は合計100KB、日本語でおよそ3万字までで、画像は貼れない。Googleドライブなら容量を気にせず、画像も貼れる。ドライブのほかのファイルは読まない。",
        },
        {
          label: "メモを外に出さない",
          text: "メモは利用者のPCとGoogleアカウントの中だけに置き、開発者のサーバー・利用状況の記録・広告のない形にした。パスワードやAPIキーらしい文字も、PCの中だけで見つける。外部のライブラリは編集欄のCodeMirrorだけにし、外のサーバーからスクリプトを読み込むこともない。",
        },
      ],
      url: "https://github.com/namisakiTakuma/memo-sync",
      app: "chocomemo",
      status: "ongoing",
    },
    {
      id: "my-travel",
      title: "My Travel Map（旅の絵日記サイト）",
      category: "個人開発 / Webサービス / 地図",
      summary:
        "行った場所を地図にピンで残し、旅ごとの絵日記として見せる、ねこと歩く旅の記録サイト。",
      highlight: "本番で公開し、==26の旅・156か所の足あとを記録==",
      image: {
        src: "/images/projects/my-travel.webp",
        alt: "My Travel Map の題字と、旅の写真と、絵本風の日本地図",
      },
      tags: ["Next.js", "Cloudflare Workers", "D1", "R2", "MapLibre"],
      originKind: "trigger",
      origin:
        "旅行や登山、食べ歩きで行った場所を、あとから振り返る場所がなかった。行った場所を地図で一目で見られて、眺めるだけでも楽しい自分用の記録を作ることにした。",
      features: [
        {
          label: "本のようにめくる",
          text: "表紙が本のようにめくれる。旅を開くと、ねこが道のりを歩いて足あとを残す。",
        },
        {
          label: "旅ごとの絵日記",
          text: "旅ごとの挿絵は旅のデータから組み立てるので、写真がない旅でも1ページになる。",
        },
        {
          label: "ふりかえる",
          text: "都道府県のスタンプ、年ごとのふりかえり、前の年の同じころの旅を出す「あの日の旅」で、行った旅を振り返れる。",
        },
      ],
      techPoints: [
        {
          label: "続けられる形に作り直す",
          text: "最初はJSONファイルを手で直す静的サイトにしたが、更新の手間が重いと続かないと分かり、DBと管理画面「旅の編集室」に作り直した。旅の追加、場所の検索、立ち寄り先の並べ替え、写真の追加を画面からできる。写真に撮影日や場所を入れる設計もやめ、続けられる最小の形にした。",
        },
        {
          label: "Cloudflareの上で動かす",
          text: "Next.jsをCloudflare Workersで動かし、データはDrizzleを通してD1に、写真はR2に置く。地図はMapLibreとOpenFreeMapで描き、色はパレットの定義から作った。",
        },
        {
          label: "写真から場所を漏らさない",
          text: "写真はブラウザで縮小し、位置情報の入ったEXIFを消してから送る。",
        },
      ],
      url: "https://my-travel.ta-namisaki.workers.dev",
      status: "ongoing",
    },
  ],
  en: [
    {
      id: "picotouch",
      title: "Animal PicoTouch (NFC Board Game)",
      category: "New Business / Product Planning / Entertainment",
      summary:
        "A family Hit&Blow-style board game played by tapping NFC cards, linked with an iOS app.",
      highlight:
        "==Showcased at Board Game Market (Makuhari Messe)==; now available on Amazon",
      image: {
        src: "/images/projects/picotouch.webp",
        alt: "The Animal PicoTouch logo and illustrated animal cards",
      },
      tags: ["Flutter", "GCP", "NFC", "iOS"],
      originKind: "problem",
      origin:
        "CMIRU, where I serve as an executive, was approached by a partner company that wanted to expand sales of its NFC cards. NFC cards were mostly used for business, such as NFC business cards, so we turned them into a game for families, something we had wanted to make ourselves.",
      features: [
        {
          label: "Pick a partner",
          text: "Launch the app, choose a partner from six player cards, and tap it. Each player has stamina, which sets how many moves they can make. You can also choose the difficulty.",
        },
        {
          label: "Guess the number",
          text: "Everyone tries to guess one number, and the first to get it wins. Each answer gives two hints: \"Hit\" is the count of right digits in the right place, and \"Blow\" is the count of right digits in the wrong place.",
        },
        {
          label: "First tap answers",
          text: "The right to answer goes to whoever taps their card on the phone first.",
        },
        {
          label: "See the hints",
          text: "Scan the QR code shown in the app to see the hints from another phone.",
        },
        {
          label: "Events",
          text: "As the game goes on, events occasionally happen. To join one, scan your card.",
        },
      ],
      techPoints: [
        {
          label: "The feel of a tap",
          text: "Designed the screens and flow around the tactile act of picking up a card and tapping it, which only NFC allows, so even short games get lively.",
        },
        {
          label: "App and web, each with its job",
          text: "The game is played in the app, and the history is viewed on the web. Gameplay was built with Flutter, and the backend and history management run on GCP.",
        },
      ],
      role:
        "Proposed a family-focused direction and planned a Hit&Blow-style board game using NFC cards. Also designed how the work is split between the app and the web.",
      result:
        "==Showcased at Board Game Market in Makuhari Messe== (Dec 2025), receiving strong traction from both international visitors and families. Now available on Amazon.",
    },
    {
      id: "yes-or-no",
      title: "YES or NO (Anonymous Yes/No Party Game)",
      category: "Web Service / Real-time Communication / Entertainment",
      summary:
        "A party game where everyone answers on-the-spot questions with an anonymous YES or NO from their phone, with no sign-up needed.",
      highlight:
        "==Zero failed operations and zero result mismatches== with 99 players answering at once",
      image: { src: "/images/projects/yes-or-no.webp", alt: "The YES or NO logo" },
      video: {
        src: "https://portfolio-media.ta-namisaki.workers.dev/yes-or-no-promo-v1.mp4",
        poster: "/images/projects/yes-or-no-video.webp",
        width: 720,
        height: 1280,
        label: "YES or NO promo video: asking a question anonymously from a phone, everyone answering anonymously, and the results reveal",
      },
      tags: ["Next.js", "Cloudflare Workers", "Durable Objects", "WebSocket", "BigQuery"],
      originKind: "trigger",
      origin:
        "It started when a friend told us they wanted a game to play when everyone gets together. We built a sign-up-free game that draws out honest answers to questions that are hard to answer in front of others and, unlike anonymous surveys that need advance setup, lets people ask questions on the spot.",
      features: [
        {
          label: "Join",
          text: "Join a room from your phone with a room code or QR code, with no sign-up.",
        },
        {
          label: "Answer",
          text: "Answer questions posted by participants in turn, with an anonymous YES or NO.",
        },
        {
          label: "See the results",
          text: "No one can tell who answered what; only the totals appear on screen.",
        },
      ],
      techPoints: [
        {
          label: "Holds up with 99 players at once",
          text: "In the first Firebase setup, writes collided when many players answered at once. So the backend moved to Cloudflare Workers and Durable Objects, processing each room in a single line. A load test with 99 players and 10 questions showed ==zero failed operations and zero result mismatches== for simultaneous joins and answers.",
        },
        {
          label: "Answers no one can read",
          text: "Questions and votes are never readable by clients; only anonymized totals are delivered. Abuse is prevented with Turnstile and rate limiting.",
        },
        {
          label: "Back in sync after the background",
          text: "State is pushed over WebSocket. Verified on real iPhones, in Safari and Chrome, that the app returns to the latest state automatically after coming back from the background.",
        },
        {
          label: "Better questions",
          text: "Usage data is buffered in D1 and sent to BigQuery daily to improve the questions.",
        },
      ],
      role:
        "As a CMIRU product, worked with the development team on the service direction. Reviewed pull requests for the backend migration to Cloudflare, the production cutover, and the privacy policy revision, and made release decisions.",
      url: "https://yesno.cmiru.com",
    },
    {
      id: "machinaka-bingo",
      title: "Machinaka Bingo (Town-Walking Bingo App)",
      category: "Mobile App / Product Planning / Local & Outings",
      summary:
        "A bingo app for walks and outings: fill in the squares with things you find around town.",
      highlight: "==Released on the App Store and Google Play==",
      image: {
        src: "/images/projects/machinaka-bingo.webp",
        alt: "The Machinaka Bingo app screen with an illustrated townscape",
      },
      tags: ["Flutter", "Firebase", "iOS", "Android"],
      originKind: "trigger",
      origin:
        "Some friends of ours already played a homemade bingo, filling in squares with things they found around town, and when they asked for an app, we built one. Most bingo apps are draw-based, and few are designed to be played while walking around town.",
      features: [
        {
          label: "Make a card",
          text: "Create a card in three ways: enter your own words, pick a recommended theme, or generate one at random from word sets. Choose a size from 3x3 to 5x5, with an optional FREE cell.",
        },
        {
          label: "Find and fill",
          text: "Record each square you find with a photo. Save the finished card as an image.",
        },
        {
          label: "Send to friends",
          text: "Send the card you made to friends with a link.",
        },
      ],
      techPoints: [
        {
          label: "Share with one link",
          text: "Cards are shared through links backed by Firestore, and recipients can also play on the web.",
        },
        {
          label: "Keeps growing after release",
          text: "Built the iOS and Android apps with Flutter. Update prompts come through Remote Config, GA4 tracking starts only after consent, and the landing page is published on Cloudflare Pages.",
        },
      ],
      role:
        "As a CMIRU product, took part in planning and service design together with the development team.",
      url: "https://bingo.cmiru.com",
    },
    {
      id: "memo-sync",
      title: "Choco Memo (Chrome Extension)",
      category: "Personal Project / Browser Extension / Productivity",
      summary:
        "A simple Japanese-friendly note-taking Chrome extension that opens instantly and syncs across PCs.",
      image: {
        src: "/images/projects/memo-sync.webp",
        alt: "The Choco Memo icon and a note with a checklist and a table",
      },
      video: {
        src: "https://portfolio-media.ta-namisaki.workers.dev/chocomemo-promo-v1.mp4",
        poster: "/images/projects/memo-sync-video.webp",
        width: 1280,
        height: 720,
        label: "Choco Memo promo video: writing a note, switching tabs, syncing between two PCs, passing a note with images to an AI, and masking secrets before copying",
      },
      tags: ["JavaScript", "Chrome Extension", "Manifest V3", "CodeMirror", "Google Drive API"],
      originKind: "trigger",
      origin:
        "The note extensions I used fell short on ease of use in Japanese and on syncing across several PCs. So I decided to build my own: one that is ready to write in the moment it opens and shows the same notes on every PC.",
      features: [
        {
          label: "Write",
          text: "Switch notes with numbered tabs. Notes are saved as you type. Buttons insert the date and time, or the title and URL of the page you are viewing. Right-click to send selected text to a note. It also opens in the side panel.",
        },
        {
          label: "Markdown",
          text: "Switch to the formatted view to write with headings and tables already laid out. Symbols such as \"#\" and \"**\" appear only where the cursor is. Checkboxes toggle with a click, and lists continue onto the next line when you press Enter. Type \"/\" at the start of a line to insert a table, heading, checkbox, and more. \"Copy with formatting\" keeps the formatting when you paste into Slack, Google Docs, or Gmail.",
        },
        {
          label: "Search & Replace",
          text: "Search and replace across all notes. It treats upper and lower case, full-width and half-width characters, and hiragana and katakana as the same. Right after a replace, \"Undo\" puts it back.",
        },
        {
          label: "Images",
          text: "Add images by pasting or dragging. Mark them up with boxes, arrows, and text. A marker for each image is inserted where you are writing.",
        },
        {
          label: "Hand Off to AI",
          text: "\"Copy\" copies the text together with where the images are saved, ready to paste into a coding AI such as Claude Code.",
        },
        {
          label: "Organize",
          text: "Filter notes by group. Reorder note tabs and groups by dragging. Deleted notes and images can be restored from the trash for 30 days. Export and import as text or ZIP.",
        },
        {
          label: "Protect",
          text: "Finds text that looks like a password, API key, or personal information and tells you. You can mask it before copying. You can also hide notes from the screen; hiding only affects the screen and is not encryption.",
        },
      ],
      techPoints: [
        {
          label: "Sync that never loses a note",
          text: "Notes are tracked by fixed IDs rather than tab numbers, and the newer version of each note wins. When a note changed on both PCs, the losing version is backed up and the user is told, and deletions are passed on as markers. The sync behavior is covered by automated tests.",
        },
        {
          label: "Two ways to sync",
          text: "Sync runs through either Chrome sync or a hidden app-only folder in Google Drive. Chrome sync holds 100KB in total, about 30,000 Japanese characters, and cannot carry images. Google Drive has room to spare and carries images too. It never reads any other files in the Drive.",
        },
        {
          label: "Notes stay with the user",
          text: "Notes stay only on the user's PC and in their Google account, with no developer server, usage tracking, or ads. Text that looks like a password or API key is also detected on the PC only. The only external library is CodeMirror for the editor, and no scripts are loaded from outside servers.",
        },
      ],
      url: "https://github.com/namisakiTakuma/memo-sync",
      app: "chocomemo",
      status: "ongoing",
    },
    {
      id: "my-travel",
      title: "My Travel Map (Travel Picture Diary)",
      category: "Personal Project / Web Service / Maps",
      summary:
        "A travel record site that pins the places I have been on a map and shows each trip as a picture diary, walked with a cat.",
      highlight: "Live in production, ==recording 26 trips and 156 places==",
      image: {
        src: "/images/projects/my-travel.webp",
        alt: "The My Travel Map title, a travel photo, and a picture-book map of Japan",
      },
      tags: ["Next.js", "Cloudflare Workers", "D1", "R2", "MapLibre"],
      originKind: "trigger",
      origin:
        "I had no place to look back on where I had been for trips, hikes, and food outings. I decided to make a record for myself that shows every place on a map at a glance and is fun just to browse.",
      features: [
        {
          label: "Turn the pages",
          text: "The cover turns like a book. Opening a trip sends a cat walking along the route, leaving footprints.",
        },
        {
          label: "A picture diary for each trip",
          text: "Each trip's illustration is assembled from its data, so even trips without photos make a full page.",
        },
        {
          label: "Look back",
          text: "Look back on past trips with prefecture stamps, a yearly look back, and \"On this day\", which brings up trips from around this time in past years.",
        },
      ],
      techPoints: [
        {
          label: "Rebuilt to keep it going",
          text: "I first built it as a static site edited by hand in a JSON file, but found that heavy updates do not last, so I rebuilt it with a database and an admin screen. Adding trips, searching for places, reordering stops, and adding photos all happen on screen. I also dropped per-photo dates and places to keep it at the smallest form I could keep up.",
        },
        {
          label: "Running on Cloudflare",
          text: "Next.js runs on Cloudflare Workers, with data in D1 through Drizzle and photos in R2. The map is drawn with MapLibre and OpenFreeMap, with colors generated from a palette definition.",
        },
        {
          label: "No location leaks from photos",
          text: "Photos are resized in the browser and stripped of location EXIF data before upload.",
        },
      ],
      url: "https://my-travel.ta-namisaki.workers.dev",
      status: "ongoing",
    },
  ],
};