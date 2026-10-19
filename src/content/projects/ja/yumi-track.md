---
title: YUMI-TRACK
summary: 弓道の射形を Web カメラの映像から姿勢推定で採点する Web アプリ。Kyudo AI の原点になりました。
year: 2025
period: 2025-05 – 2025-07
role: 開発・筆頭著者
stack: [Python, Streamlit, MediaPipe, NumPy]
status: archived
category: web
order: 5
---

2025年5月から7月にかけて、Python だけでつくった Web アプリです。PC と Web カメラで射手を撮影し、MediaPipe の姿勢推定で「等距離」と「三重十文字（肩・腰・両足土踏まず）」の 4 指標を採点します。完成後は、弓削商船高専の弓道部員にも試してもらいました。

この研究を「リアルタイム姿勢推定による弓道フォーム評価手法の提案とWeb実装」として令和7年度 電気・電子・情報関係学会四国支部連合大会で発表し、[優秀発表賞](https://www.sjciee.org/%E5%84%AA%E7%A7%80%E7%99%BA%E8%A1%A8%E8%B3%9E-%E8%8B%B1%E8%AA%9E%E7%99%BA%E8%A1%A8%E5%A5%A8%E5%8A%B1%E8%B3%9E/%E4%BB%A4%E5%92%8C7%E5%B9%B4%E5%BA%A6%E5%8F%97%E8%B3%9E%E8%80%85/)を受賞しました（[論文・プレプリント](/publications/)）。

PC と Web カメラを据え置く必要があって道場に持ち込みにくい、的中を記録できない、といった課題を解くために、スマートフォンアプリとして作り直したのが [Kyudo AI](/projects/kyudo-ai/) です。
