---
title: SD-Retinex
summary: A training-free low-light enhancement method designed around the sigmoid derivative, fast on a CPU. The paper, code and evaluation results are public.
year: 2026
role: Sole author (research and code)
stack: [Python, NumPy, OpenCV]
status: active
category: research
links:
  repo: https://github.com/toma-okugawa/sd-retinex
  paper: https://doi.org/10.5281/zenodo.20945211
featured: true
order: 1
---

SD-Retinex is a training-free, deterministic Retinex method for low-light image enhancement. There are no model weights and no dataset fitting; it runs on a CPU with NumPy and OpenCV only.

## How it works

- A stable kernel built on the sigmoid derivative `σ'` estimates illumination with separable filtering.
- A bounded tone map lifts dark regions and keeps output values in [0, 1].
- The kernel of the earlier method [XCR](/en/projects/xcr/) equals `σ'` sampled on the imaginary axis, which makes it unstable at the poles of the logistic function. SD-Retinex replaces it with a real-axis kernel and a bounded tone map.

## Results

Means on LOL eval15 (15 paired images).

| Method | PSNR ↑ | SSIM ↑ | ΔE₀₀ ↓ | ms/img ↓ |
| --- | ---: | ---: | ---: | ---: |
| Input (identity) | 7.77 | 0.195 | 37.08 | 0.03 |
| SSR | 8.99 | 0.527 | 31.88 | 151.01 |
| MSR | 8.91 | 0.525 | 32.09 | 604.31 |
| XCR | 9.83 | 0.403 | 30.91 | 24.36 |
| **SD-Retinex** | **16.47** | 0.487 | **15.90** | **18.41** |

Among the training-free enhancers, SD-Retinex has the best PSNR and ΔE₀₀ and the lowest runtime. SSR and MSR score higher on SSIM, and the paired-trained deep models (URetinex-Net, Retinexformer) remain stronger. Timings are comparisons within this table.

## What is published

- Paper: [doi:10.5281/zenodo.20945211](https://doi.org/10.5281/zenodo.20945211) (Zenodo, 2026)
- Code and data: [GitHub](https://github.com/toma-okugawa/sd-retinex) · [doi:10.5281/zenodo.20945119](https://doi.org/10.5281/zenodo.20945119)
- License: code under MIT; figures and metric data under CC BY 4.0

SD-Retinex is the core technology of [Beacon](/en/projects/beacon/).
