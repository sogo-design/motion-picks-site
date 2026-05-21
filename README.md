# 🎬 Daily Motion Graphics Picks

毎朝9時に、国内外のセンスのいい映像・モーショングラフィックスを10作品自動キュレーションする社内向けアーカイブサイトです。

## 🌐 公開URL
https://sogo-design.github.io/motion-picks-site/

## 🛠 構成
- **静的サイト**: `index.html` / `style.css` / `app.js`
- **データ**: `data.js`（`window.picksData` 配列に毎日10件追記）
- **更新**: ローカルPCで Claude Code のスケジュールタスクが朝9時に実行 → 自動 git push → GitHub Pages 反映

## 🎯 ピックアップ方針
- CM・ブランドフィルム・プロモーション: 4〜5作品/日
- モーショングラフィクス・タイトル/OP・UI: 2〜3作品/日
- MV: 1〜2作品/日（抑制）
- 表現は 2D アニメ・3DCG・モーショングラフィクス中心、実写メインは抑制

## 🔍 機能
- 国内/海外フィルタ
- ジャンル・技術タグでの絞り込み
- 全文検索
- ★ お気に入りマーク（ブラウザに保存）
- 日付フィルタ

## 📂 ファイル構成
```
motion-picks-site/
├── index.html          # メインページ
├── style.css           # スタイル（ダークテーマ）
├── app.js              # フィルタ・検索ロジック
├── data.js             # ピックアップデータ（自動更新）
├── .gitignore
└── README.md
```
