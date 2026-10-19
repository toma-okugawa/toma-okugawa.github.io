---
title: XCR (eXponential-Cos Retinex)
summary: A fast, structure-preserving Retinex method based on a complex exponential kernel, released as a preprint on Jxiv.
year: 2025
role: Sole author
status: completed
category: research
links:
  paper: https://doi.org/10.51094/jxiv.1961
order: 6
---

XCR is a fast, structure-preserving method for low-light image enhancement (Retinex) that estimates illumination with a kernel based on the complex exponential. The paper, “A High-Speed and Structure-Preserving Retinex Method Based on a Complex Exponential Kernel: XCR” (in Japanese), was released on Jxiv in November 2025.

I refined it through mentoring in LEADING EDGE Shikoku (part of METI's AKATSUKI Project) and presented it together with [FSSR](/en/projects/fssr/) at NUS (National University of Singapore) during the overseas programme in Singapore in November 2025.

A later paper showed that the XCR kernel equals the sigmoid derivative sampled on the imaginary axis, which makes it unstable at the poles of the logistic function. Its successor, [SD-Retinex](/en/projects/sd-retinex/), fixes this.
