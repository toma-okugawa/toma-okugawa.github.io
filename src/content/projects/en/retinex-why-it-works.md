---
title: Why XCR and SD-Retinex work
summary: A review site that checks, from ten perspectives and with derivations and reproducible experiments, why my low-light enhancement methods XCR and SD-Retinex work although they look as if they should not.
year: 2026
role: Sole author (analysis, experiments and site)
stack: [Python, NumPy, OpenCV, TypeScript, Astro]
status: completed
category: research
links:
  repo: https://github.com/toma-okugawa/retinex-why-it-works
  site: https://toma-okugawa.github.io/retinex-why-it-works/en/
order: 5
---

Looked at closely, [XCR](/en/projects/xcr/) and [SD-Retinex](/en/projects/sd-retinex/) brighten images in a way that "should not normally work": XCR estimates illumination with a kernel that gives the centre the least weight and has poles, and SD-Retinex divides by 60 % of a 3.6-pixel "illumination" computed on gamma-encoded values. This review checks why they work anyway, from ten perspectives: kernel mathematics, Retinex theory, tone mapping, noise, colour, numerical precision, cost, prior art, failure modes and novelty.

## Findings

- On dark images XCR effectively does not use its kernel. Its gain is capped at 1.5, so the output nearly equals a single tone curve, `min(1.5c, 1)^0.8`.
- Nearly all of SD-Retinex's brightening comes from a Naka–Rushton-type tone curve. Removing its kernel and noise gate barely changes the scores.
- XCR's main lobe jumps following rational approximations of π (3, 19/6, 22/7, 333/106, 355/113): a mathematically delightful property, but not the reason for the image quality.

## What is published

- Site (Japanese and English): [toma-okugawa.github.io/retinex-why-it-works](https://toma-okugawa.github.io/retinex-why-it-works/en/), with interactive kernel and tone-curve figures and an in-browser lab
- Code: [GitHub](https://github.com/toma-okugawa/retinex-why-it-works). One command regenerates every figure and number (CPU only, synthetic images only)
- License: code under MIT; text and figures under CC BY 4.0
