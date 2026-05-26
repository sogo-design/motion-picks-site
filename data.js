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
  // ===== 2026-05-26 MOTION =====
  {
    id: "2026-05-26-jp-01",
    date: "2026-05-26",
    type: "video",
    region: "jp",
    title: "PAL CLOSET「パルクロ春一番 2026」Web CM",
    creator: "ong_",
    platform: "YouTube",
    videoUrl: "https://www.youtube.com/watch?v=4zGPUmajdrQ",
    creatorUrl: "https://ong-motion.jp/",
    articleUrl: "",
    publishedDate: "2026-03-01",
    genre: ["CM"],
    techniques: ["キネティックタイポ", "タイポグラフィ", "作字"],
    thumbnail: "https://img.youtube.com/vi/4zGPUmajdrQ/mqdefault.jpg",
    notes: "ong_が手がけたパルコのレディースブランド「PAL CLOSET」春CMシリーズ最新作。文字が踊るように動くキネティックタイポグラフィで季節感と高揚感を演出。日本語のリズムとデザインを最大限に引き出すong_流モーション設計は国内CMモーションの最前線。"
  },
  {
    id: "2026-05-26-jp-02",
    date: "2026-05-26",
    type: "video",
    region: "jp",
    title: "GUNZE「読めない、GUNZE。」書道篇 — 130周年記念 Web CM",
    creator: "KOO-KI（空気株式会社）",
    platform: "YouTube",
    videoUrl: "https://www.youtube.com/watch?v=NJPwkBNe9U8",
    creatorUrl: "https://koo-ki.co.jp/",
    articleUrl: "https://www.gunze.co.jp/corporate/news/2026/02/20260204001.html",
    publishedDate: "2026-02-04",
    genre: ["CM", "ブランディング"],
    techniques: ["作字", "日本語タイポ"],
    thumbnail: "https://img.youtube.com/vi/NJPwkBNe9U8/mqdefault.jpg",
    notes: "グンゼ創業130周年キャンペーン「読めない、GUNZE。」書道篇。一流書道家の達筆で「グンゼ」を書き上げると、その美しい筆記体が逆に一般人には読みにくいという逆説を軽妙に描く。企業名の認知度という課題をコンセプチュアルな作字演出で解決した秀逸なCM。KOO-KIの遊び心あるアイデアと映像技術が光る。"
  },
  {
    id: "2026-05-26-jp-03",
    date: "2026-05-26",
    type: "video",
    region: "jp",
    title: "GUNZE「読めない、GUNZE。」視力検査篇 — 130周年記念 Web CM",
    creator: "KOO-KI（空気株式会社）",
    platform: "YouTube",
    videoUrl: "https://www.youtube.com/watch?v=LYVMJH47z84",
    creatorUrl: "https://koo-ki.co.jp/",
    articleUrl: "https://www.gunze.co.jp/corporate/news/2026/02/20260204001.html",
    publishedDate: "2026-02-04",
    genre: ["CM", "ブランディング"],
    techniques: ["作字", "タイポグラフィ"],
    thumbnail: "https://img.youtube.com/vi/LYVMJH47z84/mqdefault.jpg",
    notes: "同キャンペーンの視力検査篇。眼科の視力検査表スタイルでGUNZEの文字を提示し「読めますか？」と問いかけるユーモラスな演出。書道篇とは正反対のアプローチで同テーマを別角度から攻める二本構成が巧妙。日本語タイポグラフィの認知的面白さを極めたキャンペーンCMの好例。"
  },
  {
    id: "2026-05-26-jp-04",
    date: "2026-05-26",
    type: "video",
    region: "jp",
    title: "にじさんじ「あるてぃめっとくりえいたーず」始動映像",
    creator: "ong_（モーションデザイン） / にじさんじ",
    platform: "YouTube",
    videoUrl: "https://www.youtube.com/watch?v=LzxHoNVbgz0",
    creatorUrl: "https://ong-motion.jp/",
    articleUrl: "",
    publishedDate: "2026-04-01",
    genre: ["ブランディング", "タイトル/OP"],
    techniques: ["キネティックタイポ", "モーショングラフィクス"],
    thumbnail: "https://img.youtube.com/vi/LzxHoNVbgz0/mqdefault.jpg",
    notes: "VTuberグループ「にじさんじ」の新クリエイティブ企画「あるてぃめっとくりえいたーず」始動映像。ong_がDirection・Design・Motion Designを担当したオープニング映像を含む。メンバー自身が動画企画・制作を担うというコンセプトに合わせ、軽快かつ遊び心あるモーション演出を採用。2026年4月1日に公開された話題作。"
  },
  {
    id: "2026-05-26-jp-05",
    date: "2026-05-26",
    type: "video",
    region: "jp",
    title: "サントリー 優しい麦茶「小島よしお リサイクルリサイタル」リリックモーション",
    creator: "ong_ / CHOCOLATE Inc. / GEEK PICTURES Inc.",
    platform: "YouTube",
    videoUrl: "https://www.youtube.com/watch?v=UWdYZWPkHVU",
    creatorUrl: "https://ong-motion.jp/",
    articleUrl: "https://eizo100.jp/video/89686",
    publishedDate: "2024-07-11",
    genre: ["リリックモーション", "CM"],
    techniques: ["リリックモーション", "キネティックタイポ", "作字"],
    thumbnail: "https://img.youtube.com/vi/UWdYZWPkHVU/mqdefault.jpg",
    notes: "小島よしおの代名詞ネタをリサイクルをテーマにリサイタル化したサントリー優しい麦茶のリリックモーション。ong_がポップかつリズミカルなキネティックタイポグラフィを設計し、いつも以上にクールな小島よしおを演出。日本語リリックモーションの手本として国内モーションデザインコミュニティで高く評価された一作。"
  },





  {
    id: "2026-05-26-jp-06",
    date: "2026-05-26",
    type: "video",
    region: "jp",
    title: "GUILTY GEAR -STRIVE- シーズンパス4 第3弾「ユニカ」キャラクタートレーラー",
    creator: "アークシステムワークス（Arc System Works）",
    platform: "YouTube",
    videoUrl: "https://www.youtube.com/watch?v=b4zvyc_dxXU",
    creatorUrl: "https://www.guiltygear.com/ggst/jp/",
    articleUrl: "",
    publishedDate: "2025-05-27",
    genre: ["3DCG", "タイトル/OP"],
    techniques: ["NPR", "セルシェード", "3DCG"],
    thumbnail: "https://img.youtube.com/vi/b4zvyc_dxXU/mqdefault.jpg",
    notes: "横浜のアークシステムワークスが誇るアニメルック3DCGの極致。旧来のGGXXシリーズから「アニメを超えるアニメCG」を追求してきた同社の技術が最新DLCキャラクター「ユニカ」で再び輝く。手描きラインの質感・セルシェードの陰影・流麗なアクションモーションが完璧に融合し、NPR/セルシェード3DCGの世界的模範事例として国内外のCGクリエイターから称賛を集め続ける。"
  },
  {
    id: "2026-05-26-jp-07",
    date: "2026-05-26",
    type: "video",
    region: "jp",
    title: "ドラゴンボール Sparking! ZERO ローンチトレーラー",
    creator: "Spike Chunsoft / バンダイナムコエンターテインメント",
    platform: "YouTube",
    videoUrl: "https://www.youtube.com/watch?v=pgdJm0t3Das",
    creatorUrl: "https://www.bandainamcoent.co.jp/",
    articleUrl: "",
    publishedDate: "2024-10-10",
    genre: ["3DCG", "CM"],
    techniques: ["NPR", "セルシェード", "3DCG"],
    thumbnail: "https://img.youtube.com/vi/pgdJm0t3Das/mqdefault.jpg",
    notes: "スパイク・チュンソフト開発・バンダイナムコ発売の対戦格闘ゲーム最新作のローンチトレーラー。PS5世代に刷新されたセルシェードNPR表現は劇場版ドラゴンボールの作画を超えるクオリティと評され世界を驚かせた。180キャラクター超の超絶アクションをNPR全開で詰め込んだ映像は、日本産セルシェードゲームグラフィックスが到達した一つの頂点を示す。"
  },
  {
    id: "2026-05-26-jp-08",
    date: "2026-05-26",
    type: "video",
    region: "jp",
    title: "ONE OK ROCK - C.U.R.I.O.S.I.T.Y. feat. Paledusk and CHICO CARLITO [Official Music Video]",
    creator: "ONE OK ROCK / maxilla（Masaki Watanabe監督）",
    platform: "YouTube",
    videoUrl: "https://www.youtube.com/watch?v=EPlFuHhE05g",
    creatorUrl: "https://maxilla.jp/",
    articleUrl: "",
    publishedDate: "2025-04-17",
    genre: ["MV"],
    techniques: ["実写合成", "タイポグラフィ"],
    thumbnail: "https://img.youtube.com/vi/EPlFuHhE05g/mqdefault.jpg",
    notes: "国内外で活躍するロックバンドONE OK ROCKが国内ラッパーPaledusk・CHICO CARLITOを迎えた新曲のMV。東京のクリエイティブスタジオmaxillaのMasaki Watanabe監督が全体のビジュアルデザインとモーション設計を担当。maxillaならではのスタイリッシュな映像言語が楽曲のアグレッシブなエネルギーと融合し、2025年春のJ-Rock MVとして高い注目を集めた。"
  },
  {
    id: "2026-05-26-jp-09",
    date: "2026-05-26",
    type: "video",
    region: "jp",
    title: "Lazarus - Opening Sequence feat. 「VORTEX」 by Kamasi Washington",
    creator: "MAPPA",
    platform: "YouTube",
    videoUrl: "https://www.youtube.com/watch?v=XBMrH1ZQs90",
    creatorUrl: "https://www.mappa.co.jp/",
    articleUrl: "https://www.crunchyroll.com/news/latest/2025/3/27/lazarus-opening-movie-anime-shinichiro-watanabe",
    publishedDate: "2025-03-27",
    genre: ["タイトル/OP", "アニメーション"],
    techniques: ["タイポグラフィ", "2Dアニメーション"],
    thumbnail: "https://img.youtube.com/vi/XBMrH1ZQs90/mqdefault.jpg",
    notes: "渡辺信一郎監督×MAPPAの新アニメ「Lazarus」のオープニング映像。カウボーイビバップを彷彿とさせるグランジ体タイポグラフィが宇宙を落下するキャラクターシルエットと共鳴する大胆な構成。Kamasi Washingtonによるジャズ主題歌「VORTEX」との相乗効果が圧巻で、タイポグラフィとモーションを主軸に置くアニメOPの新形式を示した作品として国内外のモーションデザイナーから高く評価された。"
  },
  {
    id: "2026-05-26-jp-10",
    date: "2026-05-26",
    type: "video",
    region: "jp",
    title: "SIRUP - KIRA KIRA (Official Music Video)",
    creator: "SIRUP",
    platform: "YouTube",
    videoUrl: "https://www.youtube.com/watch?v=_JLwkJGVeqk",
    creatorUrl: "https://sirup.online/",
    articleUrl: "https://www.billboard-japan.com/d_news/detail/153589/2",
    publishedDate: "2025-09-03",
    genre: ["MV"],
    techniques: ["実写合成"],
    thumbnail: "https://img.youtube.com/vi/_JLwkJGVeqk/mqdefault.jpg",
    notes: "サイバーパンクな世界を舞台にSIRUPが一人三役を演じる3rdアルバム「OWARI DIARY」のリードトラックMV。疾走するバイク・政治演説・未来CMキャラクターと瞬時に役を変えながら都市の夜の煌めきと逃避衝動を描く。maxillaがアルバムアートワーク全体のアートディレクションを担当したことで映像・ジャケット・物販が一貫した世界観を共有し、トータルコミュニケーション設計として完成度が高い。"
  },
  // ===== 2026-05-26 GRAPHIC JP =====
  {
    id: "2026-05-26-graphic-jp-01",
    date: "2026-05-26",
    type: "graphic",
    region: "jp",
    title: "作字(SAKUJI) — typography study",
    creator: "Kisuke Ohta",
    platform: "Behance",
    videoUrl: "https://www.behance.net/gallery/43665761/(SAKUJI)-typography-study",
    creatorUrl: "https://www.behance.net/kisuke",
    articleUrl: "",
    publishedDate: "2016-01-01",
    genre: ["タイポグラフィ"],
    techniques: ["作字", "日本語タイポ"],
    thumbnail: "https://i.pinimg.com/736x/f1/b2/1f/f1b21fbf1074ff5bd6c45ef182a4f9a7.jpg",
    notes: "東京のグラフィックデザイナー・Kisuke Ohtaによる作字スタイル研究の集大成。ゴシック・明朝・装飾的バリエーションまで漢字の骨格を解析・再構築し、無数の字体を展開する。書体設計と作字の境界を探る実験的アーカイブとして現在もPinterest上で国内外のデザイナーに広く参照され続けている定番作。"
  },
  {
    id: "2026-05-26-graphic-jp-02",
    date: "2026-05-26",
    type: "graphic",
    region: "jp",
    title: "KAGUWA — Japanese Black Tea Branding",
    creator: "Koyuki Inagaki",
    platform: "Behance",
    videoUrl: "https://www.behance.net/gallery/226119129/KAGUWA",
    creatorUrl: "https://www.behance.net/koyukiinagaki",
    articleUrl: "",
    publishedDate: "2025-05-17",
    genre: ["ブランディング", "パッケージ"],
    techniques: ["ミニマル", "日本語タイポ"],
    thumbnail: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/672445226119129.6828ead9d29f0.jpg",
    notes: "東京在住デザイナーが手がけた日本産純粋紅茶ブランド「KAGUWA」のブランディング。ひらがなの曲線を想起させるロゴタイプが和と洋の均衡を象徴し、必要最小限の装飾で茶葉本来の香りを視覚化。小ぶりな缶とタグの造形と相まって、モダンな日本らしさを体現したパッケージデザイン。"
  },
  {
    id: "2026-05-26-graphic-jp-03",
    date: "2026-05-26",
    type: "graphic",
    region: "jp",
    title: "SENSE ISLAND/LAND 2024 — コミュニケーションデザイン",
    creator: "Flowplateaux (木村浩康 + 藤井かおり) / Panoramatiks",
    platform: "Flowplateaux",
    videoUrl: "https://flowplateaux.com/en/work/sense-island-land-2024_communication-design/",
    creatorUrl: "https://flowplateaux.com/en/",
    articleUrl: "",
    publishedDate: "2025-11-05",
    genre: ["ポスター", "ブランディング", "サインデザイン"],
    techniques: ["タイポグラフィ重視", "ミニマル"],
    thumbnail: "https://flowplateaux.com/wp-content/uploads/2025/10/SSL_FPX-1200x625.png",
    notes: "横須賀の没入型アートフェスティバル「SENSE ISLAND/LAND 2024」のコミュニケーションデザイン。モールス信号のリズムを基軸に、メディアと視距離で変容する柔軟なビジュアルシステムを構築。DFA Design for Asia 2025 Gold Award・東京ADC Award 2025・Japan Typography Annual 2026 審査員賞を達成した国内トップスタジオ作。"
  },
  {
    id: "2026-05-26-graphic-jp-04",
    date: "2026-05-26",
    type: "graphic",
    region: "jp",
    title: "田部井美奈「光と図形と、その周辺」",
    creator: "田部井美奈 / Mina Tabei",
    platform: "Ginza Graphic Gallery",
    videoUrl: "https://www.dnpfcp.jp/gallery/ggg/jp/00000848",
    creatorUrl: "https://www.instagram.com/mina_tabei/",
    articleUrl: "",
    publishedDate: "2025-09-05",
    genre: ["ポスター"],
    techniques: ["幾何学", "モノクロ", "ハイコントラスト"],
    thumbnail: "https://www.adfwebmagazine.jp/wp-content/uploads/2025/08/adf-web-magazine-mina-tabei-ggg-1.jpg",
    notes: "ギンザ・グラフィック・ギャラリー第409回企画展。2018年以来追求してきた実験作「光と図形」の最新シリーズを空間ごと体験できる形で発表。光と影・三次元の偶然性を二次元の紙面に定着させた独自の幾何学表現で、第28回亀倉雄策賞・JAGDA Award 2026をW受賞。"
  },
  {
    id: "2026-05-26-graphic-jp-05",
    date: "2026-05-26",
    type: "graphic",
    region: "jp",
    title: "GRAPHIC TRIAL 2025 -FIND-",
    creator: "大貫卓也 / 関本明子 / 吉本英樹 / 妹尾琢史 × TOPPAN",
    platform: "TOPPAN",
    videoUrl: "https://www.toppan.com/ja/joho/gainfo/graphictrial/2025/",
    creatorUrl: "https://www.toppan.com/ja/joho/gainfo/graphictrial/2025/creator/",
    articleUrl: "",
    publishedDate: "2025-04-12",
    genre: ["ポスター"],
    techniques: ["タイポグラフィ重視", "ハイコントラスト"],
    thumbnail: "",
    notes: "TOPPANと国内トップクリエイター4名が協働するポスター展覧会「グラフィックトライアル」第19回。テーマ「FIND」のもと、大貫卓也がレンチキュラー大判印刷の空間体験、関本明子がインク重ね刷りの色彩の謎を探究。活版・スクリーン・インクジェットなど最先端技術とグラフィックデザインが融合した印刷表現の最前線。"
  },
  // ===== 2026-05-22 GRAPHIC (cleared - articles only, will be re-populated via Run now with Pinterest-style sources) =====
  // ===== 2026-05-22 MOTION =====
  {
    id: "2026-05-22-jp-01",
    date: "2026-05-22",
    type: "video",
    region: "jp",
    title: "Nintendo Switch 2 – Overview Trailer",
    creator: "Nintendo",
    platform: "YouTube",
    videoUrl: "https://www.youtube.com/watch?v=9flte56erE8",
    creatorUrl: "https://www.nintendo.co.jp/",
    articleUrl: "",
    publishedDate: "2025-01-16",
    genre: ["CM", "ブランディング"],
    techniques: ["3DCG", "2Dアニメーション"],
    thumbnail: "https://img.youtube.com/vi/9flte56erE8/mqdefault.jpg",
    notes: "任天堂が2025年1月16日にサプライズ公開したNintendo Switch 2の公式オーバービュートレーラー。実写とCGを組み合わせた洗練されたプロダクト映像で、Joy-Con 2の磁気アタッチメント・マウスモードなど新機能を直感的に伝える構成が見事。初日4800万再生を記録し、世界的ゲームハードローンチにおける映像コミュニケーション設計の模範例として高く評価された。"
  },
  {
    id: "2026-05-22-jp-02",
    date: "2026-05-22",
    type: "video",
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
    type: "video",
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
    type: "video",
    region: "jp",
    title: "初星学園「Wildest Flower」 — Character Animation Film",
    creator: "大橋隆之 / CALF（学園アイドルマスター）",
    platform: "YouTube",
    videoUrl: "https://www.youtube.com/watch?v=iiiLtE4w2pE",
    creatorUrl: "https://www.behance.net/ohashitakashi",
    articleUrl: "https://www.stashmedia.tv/takashi-ohashi-calf-plant-the-wildest-flower-for-hatsuboshi-gakuen-in-new-music-video/",
    publishedDate: "2026-03-19",
    genre: ["アニメーション"],
    techniques: ["セルアニメ", "2Dアニメーション"],
    thumbnail: "https://img.youtube.com/vi/iiiLtE4w2pE/mqdefault.jpg",
    notes: "学園アイドルマスターの花海咲季（元アスリート転向アイドル）をフィーチャーした楽曲のキャラクターアニメーション映像。CALF所属の大橋隆之監督が担当しSTASHメディアに特集された鮮烈な色彩設計とダイナミックな作画が圧巻。ゲームキャラクターの覚醒をフルアニメーションで描き、日本のキャラクターアニメーション制作の現在地を示す傑作。"
  },
  {
    id: "2026-05-22-jp-05",
    date: "2026-05-22",
    type: "video",
    region: "jp",
    title: "劇場版チェンソーマン レゼ篇 — Official Trailer",
    creator: "MAPPA",
    platform: "YouTube",
    videoUrl: "https://www.youtube.com/watch?v=tAzAhDNdehs",
    creatorUrl: "https://www.mappa.co.jp/",
    articleUrl: "https://www.crunchyroll.com/news/latest/2025/10/13/chainsaw-man-the-movie-reze-arc-unveils-explosive-new-trailer",
    publishedDate: "2025-07-04",
    genre: ["アニメーション"],
    techniques: ["セルアニメ", "2Dアニメーション"],
    thumbnail: "https://img.youtube.com/vi/tAzAhDNdehs/mqdefault.jpg",
    notes: "MAPPAが制作した劇場版チェンソーマン『レゼ篇』公式トレーラー（Anime Expo 2025解禁）。2025年9月19日日本公開・10月24日米国公開。爆弾娘レゼとデンジの激戦をMAPPA渾身のアクション作画で描き、劇場版アニメのトレーラーとして構成面でも完成度が高い。米津玄師主題歌との相乗効果もあり2025年の国産劇場版アニメを代表する一作。"
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





];
