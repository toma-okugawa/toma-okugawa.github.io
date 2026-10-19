---
title: SD-Retinex
summary: シグモイド関数の導関数を設計原理にした、学習不要で CPU でも速く動く低照度画像強調手法。論文・コード・評価結果を公開しています。
year: 2026
role: 単著（研究・実装）
stack: [Python, NumPy, OpenCV]
status: active
category: research
links:
  repo: https://github.com/toma-okugawa/sd-retinex
  paper: https://doi.org/10.5281/zenodo.20945211
featured: true
order: 1
---

SD-Retinex は、学習を必要としない決定的な Retinex 手法です。モデルの重みやデータセットへの当てはめはなく、NumPy と OpenCV だけで CPU 上で動きます。

## しくみ

- シグモイド関数の導関数 `σ'` にもとづく安定したカーネルで、照明を分離型フィルタで推定します。
- 有界なトーンマップで暗部を持ち上げ、出力を [0, 1] の範囲に収めます。
- 先行手法 [XCR](/projects/xcr/) のカーネルは `σ'` を虚軸上でサンプリングしたものに等しく、ロジスティック関数の極によって不安定になります。SD-Retinex は、これを実軸上のカーネルと有界なトーンマップに置き換えました。

## 結果

LOL eval15（15 組の画像）での平均値です。

| 手法 | PSNR ↑ | SSIM ↑ | ΔE₀₀ ↓ | ms/枚 ↓ |
| --- | ---: | ---: | ---: | ---: |
| 入力（無処理） | 7.77 | 0.195 | 37.08 | 0.03 |
| SSR | 8.99 | 0.527 | 31.88 | 151.01 |
| MSR | 8.91 | 0.525 | 32.09 | 604.31 |
| XCR | 9.83 | 0.403 | 30.91 | 24.36 |
| **SD-Retinex** | **16.47** | 0.487 | **15.90** | **18.41** |

学習不要の手法の中では、PSNR と ΔE₀₀ が最も良く、処理時間も最短でした。SSIM は SSR と MSR のほうが高く、ペア画像で学習した深層モデル（URetinex-Net、Retinexformer）には及びません。処理時間は同じ表の中での比較です。

## 公開しているもの

- 論文: [doi:10.5281/zenodo.20945211](https://doi.org/10.5281/zenodo.20945211)（Zenodo, 2026）
- コードとデータ: [GitHub](https://github.com/toma-okugawa/sd-retinex)・[doi:10.5281/zenodo.20945119](https://doi.org/10.5281/zenodo.20945119)
- ライセンス: コードは MIT、図と評価データは CC BY 4.0

SD-Retinex は [Beacon](/projects/beacon/) の中核の技術です。
