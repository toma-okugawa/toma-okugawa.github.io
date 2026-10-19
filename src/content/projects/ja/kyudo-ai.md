---
title: Kyudo AI
summary: 弓道の射形をスマートフォンの中だけで姿勢推定して評価し、的中の記録や部の連絡もまとめる Flutter アプリ。
year: 2026
role: 創業者・PM
stack: [Flutter, Dart, ML Kit Pose Detection, SQLite (drift), Cloudflare Workers, D1]
status: active
category: app
# links: { site: https://kyudo-ai.com/ }  # kyudo-ai.com が表示できるようになったら戻す（2026-10-19 時点で DNS レコードがなく、つながらない）
featured: true
order: 2
---

Kyudo AI は、弓道部の練習のための Android アプリです。2025年に Python でつくった Web アプリ [YUMI-TRACK](/projects/yumi-track/) を、スマートフォンアプリとして機能も UI も作り直しました。

## できること

- 射を撮影し、端末の中で姿勢推定をして、会（かい）を検出し、射形を採点する
- 的中を記録し、的中率の推移をグラフで見る
- 練習の相談に答える AI 相談（端末の中のルールベースの応答。設定すればオンラインの AI も使える）
- 部の連絡（お知らせ・予定と出欠・指導者への相談）

## 技術

- Flutter と Dart で開発しています。姿勢推定には ML Kit Pose Detection（MediaPipe BlazePose と同じ 33 点）を使い、推論は端末の中で行います。
- 撮影した映像と姿勢推定の結果は、端末の中だけで処理し、外に送りません。
- 射形の得点は、「等距離」と「三重十文字（肩・腰・両足土踏まず）」の 4 指標の平均です。
- 記録は端末の中の SQLite（drift）に保存します。部の連絡を同期するサーバーは、Cloudflare Workers と D1 で開発しています。

## 受賞

- 2026年10月　スタートアップワールドカップ 2026 九州予選 ユースピッチコンテスト 第3位（弓削商船高専の後輩と2名のチーム）
- 2026年9月　リーンローンチパッド名古屋 2026 最優秀賞（チーム「Beacon」の3名で Kyudo AI を提案。2027年の全国大会への出場権を獲得）
