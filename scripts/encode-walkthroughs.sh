#!/usr/bin/env bash
# Encodes raw Playwright recordings into web-ready walkthrough clips:
#   MP4 (H.264, Safari) + WebM (VP9) + a poster frame, into public/videos/work/.
# Requires ffmpeg. Poster timestamps avoid opening frames that are still loading.
set -euo pipefail

cd "$(dirname "$0")/.."
RAW=scripts/walkthroughs-raw
OUT=public/videos/work
mkdir -p "$OUT"

poster_ts() {
  case "$1" in
    wedding) echo 9 ;;   # past the hero morph, on the schedule
    *) echo 1.2 ;;
  esac
}

for raw in "$RAW"/*.webm; do
  name=$(basename "$raw" .webm)
  echo "Encoding $name..."
  ffmpeg -y -loglevel error -i "$raw" \
    -vf "scale=1280:-2,fps=30" -c:v libx264 -crf 24 -preset slow -pix_fmt yuv420p \
    -movflags +faststart -an "$OUT/$name.mp4"
  ffmpeg -y -loglevel error -i "$raw" \
    -vf "scale=1280:-2,fps=30" -c:v libvpx-vp9 -crf 38 -b:v 0 -row-mt 1 -an "$OUT/$name.webm"
  ffmpeg -y -loglevel error -ss "$(poster_ts "$name")" -i "$OUT/$name.mp4" \
    -frames:v 1 -q:v 75 "$OUT/$name-poster.webp"
done

ls -la "$OUT"
