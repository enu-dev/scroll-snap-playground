# scroll-snap Playground

CSS の `scroll-snap-*` プロパティ群を、**実際にスクロールしながら挙動を確かめられる**プレイグラウンド。横スクロール（カルーセル風）・縦スクロール（フルスクリーン風）両対応。

依存ライブラリゼロ。ブラウザでHTMLを開くだけで動きます。

## デモ

GitHub Pages で公開: `https://[your-username].github.io/scroll-snap-playground/`

## 使い方

1. プレビューエリア上部で「横スクロール / 縦スクロール」を切替
2. コントロールパネルで各プロパティを切替・調整：
   - `scroll-snap-type`（none / x mandatory / x proximity / y mandatory / y proximity / both mandatory）
   - `scroll-snap-align`（none / start / center / end）
   - `scroll-snap-stop`（normal / always）
   - `scroll-padding`（0〜80px）
   - `scroll-margin`（0〜80px）
   - 子要素数（3〜10個）
3. プレビューエリアを実際にスクロールして挙動を確認
4. 生成された CSS をコピー

## プリセット

| プリセット | 用途 | 設定 |
|----------|------|------|
| カルーセル | 横並びの画像/カード閲覧 | horizontal + x mandatory + center |
| フルスクリーン | 1画面ずつ見せるLP | vertical + y mandatory + start + always |
| フォトギャラリー | 緩やかな横スクロールギャラリー | horizontal + x proximity + start |

## scroll-snap-* 早見表

| プロパティ | 役割 |
|----------|------|
| scroll-snap-type | スナップ方向と強さ（mandatory=必ずスナップ / proximity=近いとスナップ） |
| scroll-snap-align | スナップ位置（start / center / end） |
| scroll-snap-stop | 一気にスクロールしても飛び越え禁止か（always）/ 通常通り（normal） |
| scroll-padding | コンテナ内側のスナップ基準ライン |
| scroll-margin | 各子要素のスナップ位置オフセット |

## 技術構成

- HTML / CSS / JavaScript（バニラ）
- 外部ライブラリ・CDN なし

## ブラウザ対応

Chrome / Safari / Firefox / Edge 全対応

## ファイル構成

```
scroll-snap-playground/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── README.md
└── LICENSE
```

## ライセンス

MIT
