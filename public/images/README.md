# 画像の差し替えについて

このサイトは「写真スロット（`MediaFrame`）」方式です。写真が無い間はブランドカラーの
プレースホルダが表示され、写真を入れると自動で差し替わります。

## 差し替え方法

1. 下表のファイル名で画像を `public/images/` に置く
2. 該当コンポーネントの `src={undefined /* "/images/xxx.jpg" */}` を
   `src="/images/xxx.jpg"` に書き換える（各行にコメントで候補パスを記載済み）

`MediaFrame` が `next/image` の `fill` + `object-cover` で読み込み、navy のデュオトーンを
かぶせてブランドに馴染ませます（ストック写真っぽさが消えます）。CLS は `fill` + 親の
`aspect-ratio` で自動的に防がれます。

## スロット一覧

| ファイル名 | 使う場所 | 推奨カット |
|-----------|---------|-----------|
| `hero-office.jpg` | Hero | オフィス全景 / 働く現場（縦4:5） |
| `network.jpg` | Service 01・Intro | サーバールーム・LAN 配線 |
| `construction.jpg` | Service 02・FacilitySupport | 建物外観・建設/施工現場 |
| `office-device.jpg` | Service 03 | 複合機・ビジネスフォン・OA機器 |
| `trade.jpg` | Service 04 | 物流・コンテナ・倉庫 |
| `facility.jpg` | （予備）設備工事 | 設備・配管・点検 |
| `security.jpg` | （予備）セキュリティ | サーバー・バックアップ |

> 画像は実写真を推奨。AI生成写真は手・文字が崩れて逆効果になりやすい。
