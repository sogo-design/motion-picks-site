/* ========================================
   Daily Motion Graphics Picks — Data
   ----------------------------------------
   このファイルは毎朝10時のスケジュールタスクが自動更新します。
   手動でも編集可能（フォーマットを保つこと）。

   各エントリのスキーマ:
   {
     id: "YYYY-MM-DD-jp-01",       // ユニークID
     date: "YYYY-MM-DD",           // ピックアップ日
     region: "jp" | "global",       // 国内 / 海外
     title: "作品タイトル",
     creator: "制作者・スタジオ名",
     platform: "YouTube",          // YouTube / Vimeo / X / TikTok / Behance 等
     videoUrl: "https://...",      // 動画本体URL
     creatorUrl: "https://...",    // 制作者ページURL（任意）
     articleUrl: "",               // 関連記事URL（任意）
     publishedDate: "YYYY-MM-DD",  // 作品の公開日
     genre: ["MV", "モーショングラフィクス"],
     techniques: ["3DCG", "タイポグラフィ"],
     thumbnail: "https://...",     // サムネイルURL（YouTube: https://img.youtube.com/vi/{ID}/mqdefault.jpg）
     notes: "注目ポイント（2-3行）"
   }
   ======================================== */

window.picksData = [
  // ===== 2026-05-22 GRAPHIC (cleared - articles only, will be re-populated via Run now with Pinterest-style sources) =====
  // ===== 2026-05-22 MOTION =====
  // 注: JP MV5件は新ポリシー違反のため削除済み。Run nowで再収集予定。
  {
    id: "2026-05-22-global-01",
    date: "2026-05-22",
    region: "global",
    title: "Trails Will Blaze — BBC Winter Olympics 2026",
    creator: "NOMINT / BBC Creative",
    platform: "Vimeo",
    videoUrl: "https://vimeo.com/1158419326",
    creatorUrl: "https://vimeo.com/nomint",
    articleUrl: "https://stopmotionmagazine.com/bbc-trails-will-blaze-stop-motion-winter-olympics-2026/",
    publishedDate: "2026-02-13",
    genre: ["CM", "タイトル/OP"],
    techniques: ["ストップモーション", "実写合成"],
    thumbnail: "https://vumbnail.com/1158419326.jpg",
    notes: "ミラノ・コルティナ2026冬季五輪のBBCトレーラー。700体の3Dプリント選手フィギュアに実火を用いたストップモーション撮影で制作。イタリア・ドロミテの縮小模型を舞台にVerdiの「レクイエム」をBBC交響楽団がライブ録音。Motionographer採点8.62超えの2026年上半期最高傑作。"
  },
  {
    id: "2026-05-22-global-02",
    date: "2026-05-22",
    region: "global",
    title: "BMW Heart of Joy — Meet Okto the Octopus",
    creator: "Untold Studios / Jung von Matt",
    platform: "YouTube",
    videoUrl: "https://www.youtube.com/watch?v=t4tO5htFvpc",
    creatorUrl: "https://www.untoldstudios.com/",
    articleUrl: "https://www.stashmedia.tv/dancing-with-myself-okto-the-octopus-oscillates-for-bmw/",
    publishedDate: "2025-06-17",
    genre: ["CM", "3DCG"],
    techniques: ["3DCG", "実写合成"],
    thumbnail: "https://img.youtube.com/vi/t4tO5htFvpc/mqdefault.jpg",
    notes: "タコの分散神経系＝BMW次世代中央制御ユニットというアナロジーから生まれたCMキャラクター「Okto」。南アフリカ実写水中映像へのフルCG合成のクオリティが圧巻。2026 VES Awards Outstanding Visual Effects / Compositing 受賞、Webbyアワードベストアニメーション・モーショングラフィクス受賞。"
  },
  {
    id: "2026-05-22-global-03",
    date: "2026-05-22",
    region: "global",
    title: "Finch — Whatever It Takes to Get Through the Day",
    creator: "Kirsten Lepore / Mathematic",
    platform: "YouTube",
    videoUrl: "https://www.youtube.com/watch?v=Har-tUpSmmU",
    creatorUrl: "https://mathematic.tv/",
    articleUrl: "https://adage.com/creativity/creative-strategy-tactics/aa-finch-whatever-it-takes-to-get-through-the-day/",
    publishedDate: "2026-05-21",
    genre: ["CM", "アニメーション"],
    techniques: ["3DCG", "2Dアニメーション"],
    thumbnail: "https://img.youtube.com/vi/Har-tUpSmmU/mqdefault.jpg",
    notes: "セルフケアアプリFinchのファーストブランドキャンペーン（5/21公開・昨日リリース）。Oscar ノミネート＆Emmy 受賞監督Kirsten Lepore（Mathematic）が手がけた90秒アニメミュージカル。ケーキをむさぼる・怒りの雑巾がけ・剣で枕を叩き割るなど『何とかやり過ごす日々』の滑稽さを愛らしく描く。"
  },
  {
    id: "2026-05-22-global-04",
    date: "2026-05-22",
    region: "global",
    title: "Squarespace — Blueprint AI",
    creator: "ManvsMachine",
    platform: "Vimeo",
    videoUrl: "https://vimeo.com/1068776467",
    creatorUrl: "https://mvsm.com/",
    articleUrl: "https://lbbonline.com/news/squarespace-introduces-its-ai-website-builder-with-a-human-touch",
    publishedDate: "2025-03-25",
    genre: ["CM", "ブランディング"],
    techniques: ["モーフィング", "実写合成"],
    thumbnail: "https://vumbnail.com/1068776467.jpg",
    notes: "Squarespace AIウェブビルダー「Blueprint AI」のローンチCM。デザイナーのスケッチブック上のアイデアが実際に飛び出し、デジタルUIへ変換される様子を実写＋モーショングラフィクスで表現。ManvsMachineらしいエレガントなトランジションと精緻な質感設計が際立つブランドフィルム。"
  },
  {
    id: "2026-05-22-global-05",
    date: "2026-05-22",
    region: "global",
    title: "HAG — Official Trailer",
    creator: "Anna Ginsburg / Strange Beast / Passion Pictures",
    platform: "Vimeo",
    videoUrl: "https://vimeo.com/1113936655",
    creatorUrl: "https://www.strangebeast.tv/",
    articleUrl: "https://lbbonline.com/news/Passion-Pictures-and-Strange-Beast-Win-at-SXSW-2026",
    publishedDate: "2025-11-15",
    genre: ["アニメーション", "実験的"],
    techniques: ["2Dアニメーション", "モーフィング"],
    thumbnail: "https://vumbnail.com/1113936655.jpg",
    notes: "SXSW 2026アニメーション部門Special Jury Award受賞の短編。別れ・生物時計・家父長制の圧力をダークコメディで描いたBFI出資作品。Anna Ginsburgの独自キャラクターデザインと大胆な色使い、メタモルフォーゼ的アニメーションが強烈な印象を残す。現在国際フェスティバル巡回中。"
  },
  // ===== 2026-05-21 =====
  {
    id: "2026-05-21-jp-01",
    date: "2026-05-21",
    region: "jp",
    title: "AFEELA Prototype 2026 | Concept Movie",
    creator: "WOW inc. / Sony Honda Mobility",
    platform: "YouTube",
    videoUrl: "https://www.youtube.com/watch?v=tMkmiZS0brQ",
    creatorUrl: "https://www.w0w.co.jp/en/",
    articleUrl: "https://www.shm-afeela.com/en/news/2026-01-06/",
    publishedDate: "2026-01-06",
    genre: ["ブランディング", "3DCG"],
    techniques: ["3DCG", "実写合成"],
    thumbnail: "https://img.youtube.com/vi/tMkmiZS0brQ/mqdefault.jpg",
    notes: "ソニー・ホンダモビリティのEV『AFEELA』がCES 2026でワールドプレミアした際の公式コンセプトムービー。東京のビジュアルデザインスタジオWOW inc.が手がけた3DCGと動的UIアニメーションの融合映像で、車体フォルムとデジタルインターフェースが有機的に絡み合う。モビリティの未来を高い審美眼で提示した意欲的なブランドフィルム。"
  },
  {
    id: "2026-05-21-jp-02",
    date: "2026-05-21",
    region: "jp",
    title: "MULTRA Brand Film",
    creator: "MULTRA Inc.",
    platform: "Vimeo",
    videoUrl: "https://vimeo.com/1135619204",
    creatorUrl: "https://vimeo.com/multra",
    articleUrl: "https://www.stashmedia.tv/multra-studio-makes-stash-debut-with-new-brand-film/",
    publishedDate: "2025-10-01",
    genre: ["ブランディング", "モーショングラフィクス"],
    techniques: ["2Dアニメーション", "モーフィング"],
    thumbnail: "https://vumbnail.com/1135619204.jpg",
    notes: "東京のモーションデザインスタジオMULTRAによるSTASHデビュー自主制作ブランドフィルム。ジャズィーなリズムとともに多様なクリエイティブアイデアが連続・変容するマルチメディア表現。手描きキャラクターとグラフィックモーションがシームレスに融合し、スタジオのクリエイティブDNAを余すところなく体現する。"
  },
  {
    id: "2026-05-21-jp-03",
    date: "2026-05-21",
    region: "jp",
    title: "パワフルプロ野球2026-2027 オープニングムービー",
    creator: "KOO-KI x Konami Digital Entertainment",
    platform: "YouTube",
    videoUrl: "https://www.youtube.com/watch?v=wOjrANePk1c",
    creatorUrl: "https://koo-ki.co.jp/",
    articleUrl: "https://koo-ki.co.jp/works/detail/pawa-2026-2027",
    publishedDate: "2026-03-12",
    genre: ["タイトル/OP", "3DCG"],
    techniques: ["3DCG", "2Dアニメーション"],
    thumbnail: "https://img.youtube.com/vi/wOjrANePk1c/mqdefault.jpg",
    notes: "野球ゲームシリーズ30周年を飾るオープニングムービー。福岡の映像集団KOO-KIが歴代WBC名場面をリイマジネーションし、イチロー・大谷翔平ら伝説的選手が集結するダイナミックな3DCGシーンを展開。スポーツゲームOPの域を超えた映像クオリティは国内外のゲームファン・映像ファンから高い評価を受ける。"
  },
  {
    id: "2026-05-21-jp-04",
    date: "2026-05-21",
    region: "jp",
    title: "HIDARI（ひだり） - ストップモーション侍映画 パイロット版",
    creator: "Whatever Co. / dwarf studios / TECARAT（川村真司監督）",
    platform: "YouTube",
    videoUrl: "https://www.youtube.com/watch?v=DpefYPLH67A",
    creatorUrl: "https://whatever.co/work/hidari/",
    articleUrl: "https://variety.com/2026/film/global/keanu-reeves-voice-lead-stop-motion-samurai-film-hidari-1236751402/",
    publishedDate: "2023-03-27",
    genre: ["アニメーション"],
    techniques: ["ストップモーション"],
    thumbnail: "https://img.youtube.com/vi/DpefYPLH67A/mqdefault.jpg",
    notes: "全キャラクターを木から手彫りしフレームごとに動かすストップモーション時代劇の短編パイロット版。4.9M再生を突破し2026年5月カンヌAnnecy Showcaseへ選出。同月キアヌ・リーブスのリード声優起用が発表され再び世界から注目を集めた、日本の手仕事アニメーションの金字塔。"
  },
  {
    id: "2026-05-21-jp-05",
    date: "2026-05-21",
    region: "jp",
    title: "Ado「ビバリウム」Official Music Video",
    creator: "林響太朗 / ACROBAT FILM",
    platform: "YouTube",
    videoUrl: "https://www.youtube.com/watch?v=YvYii6dluM8",
    creatorUrl: "https://www.universal-music.co.jp/ado/",
    articleUrl: "https://natalie.mu/music/news/662104",
    publishedDate: "2026-02-28",
    genre: ["MV"],
    techniques: ["実写合成"],
    thumbnail: "https://img.youtube.com/vi/YvYii6dluM8/mqdefault.jpg",
    notes: "Ado初の完全実写MV。自身の半生をテーマにした楽曲に合わせ林響太朗監督が300カット超の迫力映像を構築した意欲作。水中撮影・逆光シルエット・ハイヒール疾走など多彩な手法を組み合わせ、Adoの感情の振れ幅を余すところなく映像化。日本音楽MVの新境地として各メディアが絶賛した2026年の注目作。"
  },
  {
    id: "2026-05-21-global-01",
    date: "2026-05-21",
    region: "global",
    title: "Coinbase — System Update",
    creator: "BUCK / Isle of Any",
    platform: "YouTube",
    videoUrl: "https://www.youtube.com/watch?v=SemnKhDNZVU",
    creatorUrl: "https://buck.co/work/coinbase-system-update",
    articleUrl: "https://www.stashmedia.tv/buck-cracks-the-code-for-coinbase/",
    publishedDate: "2025-05-07",
    genre: ["CM", "ブランディング"],
    techniques: ["2Dアニメーション", "タイポグラフィ"],
    thumbnail: "https://img.youtube.com/vi/SemnKhDNZVU/mqdefault.jpg",
    notes: "ASCIIアートと2Dアニメーションを融合させたCoinbaseのブランドアンセムフィルム。旧来の銀行システムの『ブルースクリーン・オブ・デス』から始まりCoinbase主導の新世界への再起動を描く。Houdini・C4D・Cavalry・After Effectsを駆使した技術的にも先鋭的な映像はNBAプレーオフ初放映で400万超視聴、D&ADアワードも受賞。"
  },
  {
    id: "2026-05-21-global-02",
    date: "2026-05-21",
    region: "global",
    title: "Affinity — Creative Freedom",
    creator: "ManvsMachine / Canva",
    platform: "YouTube",
    videoUrl: "https://www.youtube.com/watch?v=CzPzRxDoirM",
    creatorUrl: "https://mvsm.com/project/canva-affinity",
    articleUrl: "https://www.stashmedia.tv/zero-bucks-given-manvsmachine-keeps-it-kinetic-for-canva/",
    publishedDate: "2025-11-07",
    genre: ["CM", "ブランディング"],
    techniques: ["3DCG", "2Dアニメーション", "キネティックタイポ"],
    thumbnail: "https://img.youtube.com/vi/CzPzRxDoirM/mqdefault.jpg",
    notes: "Canvaが完全無料化したデザインツール『Affinity』ローンチを飾るブランドキャンペーン映像。ManvsMachineが3D・2Dモーション・キネティックタイポグラフィ・手描きイラストを縦横無尽に融合させ、クリエイターへの解放宣言を表現したパワフルなハイプフィルム。1週間で100万人登録突破を達成した歴史的プロダクトローンチの象徴的映像。"
  },
  {
    id: "2026-05-21-global-03",
    date: "2026-05-21",
    region: "global",
    title: "NBC Primetime in Milan — Winter Olympics 2026 Title Sequence",
    creator: "Imaginary Forces",
    platform: "Vimeo",
    videoUrl: "https://imaginaryforces.com/project/winter-olympic-games-milan-cortina-2026",
    creatorUrl: "https://imaginaryforces.com/",
    articleUrl: "https://www.nbcsports.com/pressbox/press-releases/nbc-sports-selected-imaginary-forces-to-create-cinematic-main-title-sequence-for-primetime-in-milan",
    publishedDate: "2026-02-06",
    genre: ["タイトル/OP"],
    techniques: ["3DCG", "実写合成"],
    thumbnail: "",
    notes: "ミラノ・コルティナ2026冬季五輪のNBC『Primetime in Milan』用メインタイトルシーケンス。ILM StageCraftのボリュメトリックスクリーンを用いた実写撮影と3DCGを融合させ、イタリアの冬景色の中でチームUSAの歴代名場面を描く。Imaginary Forcesが五輪タイトルの信頼を再び示した、ブロードキャストデザインの到達点。"
  },
  {
    id: "2026-05-21-global-04",
    date: "2026-05-21",
    region: "global",
    title: "Telstra — Outback to Orbit | Satellite Messaging Campaign",
    creator: "Passion Animation / Bear Meets Eagle On Fire",
    platform: "Vimeo",
    videoUrl: "https://www.creativereview.co.uk/telstra-satellite-messaging-stop-motion-campaign/",
    creatorUrl: "https://www.passion-animation.com/director/catherine-prowse/",
    articleUrl: "https://www.stashmedia.tv/heres-how-catherine-prowse-passion-animation-built-stop-motion-messaging-for-telstra/",
    publishedDate: "2026-04-15",
    genre: ["CM"],
    techniques: ["ストップモーション"],
    thumbnail: "",
    notes: "オーストラリアの通信会社Telstraのサテライトメッセージ機能を訴求した3部作ストップモーションCM。農場・砂漠・山岳のセットが物理的に回転しながら宇宙への接続を描く独創的なメカニズムが秀逸。Catherine Prowse（Passion Animation）が緻密な模型制作と撮影で実現した、2026年の傑作ストップモーションCMとして各メディアが絶賛。"
  },
  {
    id: "2026-05-21-global-05",
    date: "2026-05-21",
    region: "global",
    title: "OFFF Barcelona 2026 — Official Aftermovie",
    creator: "OFFF Festival",
    platform: "Vimeo",
    videoUrl: "https://vimeo.com/1189630992",
    creatorUrl: "https://www.offf.barcelona/",
    articleUrl: "https://motionographer.com/news/offf-2026-returns-for-26th-year-in-celebration-of-creativity-art-and-design/",
    publishedDate: "2026-04-30",
    genre: ["モーショングラフィクス", "タイトル/OP"],
    techniques: ["タイポグラフィ", "実写合成"],
    thumbnail: "https://vumbnail.com/1189630992.jpg",
    notes: "デザイン・アニメーション・映像の世界的祭典OFFF Barcelona 2026（第26回）のオフィシャルアフタームービー。76カ国・5,500名/日が集結した会期の全容を収録し、Laundry Studiosによるメインタイトルや多数のスピーカー登壇映像も収められる。モーションデザイン業界の最前線を一度に体感できる、フェスティバルの記念碑的アーカイブ映像。"
  },
];
