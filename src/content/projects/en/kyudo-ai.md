---
title: Kyudo AI
summary: A Flutter app that scores kyudo (Japanese archery) form with pose estimation that runs on the phone, and keeps hit records and club messages in one place.
year: 2026
role: Founder and PM
stack: [Flutter, Dart, ML Kit Pose Detection, SQLite (drift), Cloudflare Workers, D1]
status: active
category: app
links:
  site: https://kyudo-ai.com/
featured: true
order: 2
---

Kyudo AI is an Android app for kyudo club practice. It rebuilds [YUMI-TRACK](/en/projects/yumi-track/), the web app I wrote in Python in 2025, as a smartphone app with new features and a new interface.

## What it does

- Records a shot, runs pose estimation on the device, detects the full draw (*kai*) and scores the form
- Keeps hit records and charts the hit rate over time
- Answers practice questions (a rule-based responder on the device, with an optional online AI)
- Club messages: announcements, events and attendance, and questions to the coach

## Technology

- Built with Flutter and Dart. Pose estimation uses ML Kit Pose Detection (the same 33 landmarks as MediaPipe BlazePose), with inference on the device.
- Video and pose estimation are processed only on the device and are never sent out.
- The form score is the mean of four measures: equal distance and the three crosses (*sanjū-jūmonji*: shoulders, hips and feet).
- Records are stored in SQLite (drift) on the device. The server that syncs club messages is being built on Cloudflare Workers and D1.

## Awards

- October 2026 — 3rd place, Startup World Cup 2026 Kyushu Regional Youth Pitch Contest (team of two, with a younger Yuge student)
- September 2026 — Grand Prize, Lean Launchpad Nagoya 2026 (Kyudo AI, proposed by the three-person team “Beacon”; a place in the 2027 national round)
