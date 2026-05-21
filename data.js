/* ========================================
   Daily Motion Graphics Picks — Data
   ----------------------------------------
   このファイルは毎朝9時のスケジュールタスクが自動更新します。
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
  // ===== 2026-05-22 =====
  {
    id: "2026-05-22-jp-01",
    date: "2026-05-22",
    region: "jp",
    title: "ヨルシカ「あぶく」OFFICIAL VIDEO",
    creator: "ヨルシカ / 擬態するメタ（しまぐちニケ + Bivi）",
    platform: "YouTube",
    videoUrl: "https://www.youtube.com/watch?v=OHAjc-ayhus",
    creatorUrl: "https://yorushika.com/",
    articleUrl: "https://kai-you.net/article/95295",
    publishedDate: "2026-04-22",
    genre: ["MV", "アニメーション"],
    techniques: ["実写合成", "2Dアニメーション"],
    thumbnail: "https://img.youtube.com/vi/OHAjc-ayhus/mqdefault.jpg",
    notes: "TVアニメ『LIAR GAME』OPテーマ。実写と2Dアニメを融合させた「擬態するメタ」が担当。主人公が密室で何度も殺されながら脱出を目指す無限ループ構造に視聴者自身が巻き込まれるメタ的仕掛けが秀逸。公開直後から800万再生超、世界のYouTubeランキングに続々チャートイン。"
  },
  {
    id: "2026-05-22-jp-02",
    date: "2026-05-22",
    region: "jp",
    title: "米津玄師「IRIS OUT」Official Music Video",
    creator: "米津玄師 / 劇場版チェンソーマン レゼ篇",
    platform: "YouTube",
    videoUrl: "https://www.youtube.com/watch?v=LmZD-TU96q4",
    creatorUrl: "https://www.youtube.com/channel/UCUCeZaZeJbEYAAzvMgrKOPQ",
    articleUrl: "",
    publishedDate: "2025-09-15",
    genre: ["MV", "アニメーション"],
    techniques: ["セルアニメ", "2Dアニメーション"],
    thumbnail: "https://img.youtube.com/vi/LmZD-TU96q4/mqdefault.jpg",
    notes: "劇場版『チェンソーマン レゼ篇』主題歌。Spotify Japan史上最多ストリーム初日記録を更新し、2026年5月現在もBillboard JAPAN Hot Animation 1位をキープするロングラン。劇場映像とアニメーションの緩急あるカット割りと楽曲の疾走感が完璧に噛み合う。"
  },
  {
    id: "2026-05-22-jp-03",
    date: "2026-05-22",
    region: "jp",
    title: "ヨルシカ「へび」OFFICIAL VIDEO",
    creator: "ヨルシカ / 佐藤美代",
    platform: "YouTube",
    videoUrl: "https://www.youtube.com/watch?v=sf0QFJTvOLM",
    creatorUrl: "https://yorushika.com/",
    articleUrl: "https://realsound.jp/2025/02/post-1938409.html",
    publishedDate: "2025-01-17",
    genre: ["MV", "アニメーション"],
    techniques: ["ストップモーション", "2Dアニメーション"],
    thumbnail: "https://img.youtube.com/vi/sf0QFJTvOLM/mqdefault.jpg",
    notes: "TVアニメ『チ。―地球の運動について―』新エンディングテーマ。アニメーター佐藤美代が手がけたサンドアニメーション＋ペインティング・オン・グラスによる繊細な映像。記憶と風景が砂の粒子とともに溶け合うような独自の質感が唯一無二で、国内アニメMV屈指の完成度。"
  },
  {
    id: "2026-05-22-jp-04",
    date: "2026-05-22",
    region: "jp",
    title: "ずっと真夜中でいいのに。「クズリ念」MV",
    creator: "ずっと真夜中でいいのに。 / Waboku",
    platform: "YouTube",
    videoUrl: "https://www.youtube.com/watch?v=ut889MZ9yNo",
    creatorUrl: "https://www.youtube.com/@ZUTOMAYO",
    articleUrl: "https://www.billboard-japan.com/d_news/detail/142886",
    publishedDate: "2024-10-23",
    genre: ["MV", "アニメーション"],
    techniques: ["セルアニメ", "2Dアニメーション"],
    thumbnail: "https://img.youtube.com/vi/ut889MZ9yNo/mqdefault.jpg",
    notes: "約4年ぶりにアニメーターWabokuが復帰した話題作。Satomi Tena・minoMi・uiu・uraraら複数アニメーターが参加し、ダイナミックなキャラクターモーションと強烈な色彩設計が炸裂。ずとまよ×Wabokuのコンビは国内アニメーションMVシーン屈指のクオリティを誇る。"
  },
  {
    id: "2026-05-22-jp-05",
    date: "2026-05-22",
    region: "jp",
    title: "YOASOBI「New me」Official Music Video",
    creator: "YOASOBI / Havtza / pH Studio",
    platform: "YouTube",
    videoUrl: "https://www.youtube.com/watch?v=HRlW6yZo6Kc",
    creatorUrl: "https://www.youtube.com/@YOASOBI_staff",
    articleUrl: "https://www.anitrendz.com/news/2024/11/30/yoasobi-releases-new-me-anime-music-video",
    publishedDate: "2024-11-30",
    genre: ["MV", "アニメーション"],
    techniques: ["2Dアニメーション", "Vector"],
    thumbnail: "https://img.youtube.com/vi/HRlW6yZo6Kc/mqdefault.jpg",
    notes: "Recruit CMソング発のアニメMV。監督Havtzaがコンセプト・キャラクターデザイン・演出を一手に担いpH Studioが制作。鮮やかなカラーパレットとキネティックな2Dアニメーションの流れが国際的にも高い評価を獲得し、YOASOBIのグローバル進出を象徴する一作。"
  },
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
];
