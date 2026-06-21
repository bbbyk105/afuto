# 画像の差し替えについて

このサイトは画像が無くても CSS / SVG だけで成立するよう設計しています。
写真を使う場合は、以下のファイル名で `public/images/` に配置すると差し替えやすくなります。

| ファイル名 | 用途 |
|-----------|------|
| `hero-office.jpg` | Hero 背景 / オフィス全景 |
| `network.jpg` | サーバールーム・LAN 配線 |
| `facility.jpg` | 設備・施工現場 |
| `construction.jpg` | 建物外観・建設現場 |
| `office-device.jpg` | 複合機・ビジネスフォン |
| `security.jpg` | セキュリティ・バックアップ |

`next/image` で読み込み、`width`/`height`（または `fill` + `aspect-ratio`）を指定して
CLS が出ないようにしてください。
