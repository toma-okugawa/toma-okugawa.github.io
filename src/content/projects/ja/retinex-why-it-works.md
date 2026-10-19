---
title: XCR と SD-Retinex はなぜ成り立つのか
summary: 自分の低照度画像強調手法 XCR と SD-Retinex が「本来ならうまくいかないはずの方法」で成り立つ理由を、10 の観点から導出と再現可能な実験で確かめたレビューサイトです。
year: 2026
role: 単著（分析・実験・サイト）
stack: [Python, NumPy, OpenCV, TypeScript, Astro]
status: completed
category: research
links:
  repo: https://github.com/toma-okugawa/retinex-why-it-works
  site: https://toma-okugawa.github.io/retinex-why-it-works/
order: 5
---

[XCR](/projects/xcr/) と [SD-Retinex](/projects/sd-retinex/) は、よく見ると「本来ならうまくいかないはずの方法」で画像を明るくしています。XCR は中心をいちばん軽く扱い、極をもつカーネルで照明を推定し、SD-Retinex は幅 3.6 画素しかない「照明」をガンマ補正後の値から 60 % だけ割ります。それでもなぜ成り立つのかを、カーネルの数学・Retinex 理論・トーンマッピング・ノイズ・色・数値精度・計算コスト・先行研究・失敗例・新規性の 10 の観点から調べました。

## 分かったこと

- XCR は、暗い画像では実質的にカーネルを使っていません。ゲインが 1.5 倍で頭打ちになるため、出力は 1 本のトーンカーブ `min(1.5c, 1)^0.8` とほぼ一致します。
- SD-Retinex の明るさは、ほぼすべてが Naka–Rushton 型のトーンカーブから来ています。カーネルとノイズゲートを外しても、点数はほとんど変わりません。
- XCR のカーネルの主峰は、π の有理近似（3、19/6、22/7、333/106、355/113）に合わせて跳びます。数学的には面白い性質ですが、画質の理由ではありません。

## 公開しているもの

- サイト（日本語・英語）：[toma-okugawa.github.io/retinex-why-it-works](https://toma-okugawa.github.io/retinex-why-it-works/)。カーネルとトーンカーブの対話図、ブラウザで動く実験室つき
- コード：[GitHub](https://github.com/toma-okugawa/retinex-why-it-works)。すべての図と数値を 1 つのコマンドで作り直せます（CPU のみ、合成画像のみ）
- ライセンス：コードは MIT、文章と図は CC BY 4.0
