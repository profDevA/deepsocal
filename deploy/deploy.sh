#!/usr/bin/env bash
# Deploy the latest deepsocal-v2 to the EC2 server (deepsocal-web).
# Installed on the server as ~/deploy.sh. Run it from your machine with:
#   ssh -i ~/.ssh/deepsocal-ec2.pem ubuntu@3.143.107.20 ./deploy.sh
#
# Builds the new release in ~/deepsocal-next while the live app keeps serving
# from ~/deepsocal, then swaps the directories and restarts pm2 (a couple of
# seconds of downtime instead of a 2–3 minute build in the live directory).
# The previous release is kept in ~/deepsocal-prev:
#   ./deploy.sh --rollback
set -euo pipefail
export NVM_DIR="$HOME/.nvm"; . "$NVM_DIR/nvm.sh"
export NODE_OPTIONS=--max-old-space-size=3072 NEXT_TELEMETRY_DISABLED=1

APP="$HOME/deepsocal"; NEXT="$HOME/deepsocal-next"; PREV="$HOME/deepsocal-prev"
REPO="https://github.com/profDevA/deepsocal.git"; BRANCH="deepsocal-v2"

wait_ready() {
  for _ in $(seq 1 30); do curl -sf -o /dev/null http://127.0.0.1:3000/ && return 0; sleep 1; done
  echo "app did not answer on :3000 within 30s"; return 1
}

if [ "${1:-}" = "--rollback" ]; then
  [ -d "$PREV" ] || { echo "no previous release at $PREV"; exit 1; }
  pm2 stop deepsocal >/dev/null
  rm -rf "$NEXT"; mv "$APP" "$NEXT"; mv "$PREV" "$APP"
  pm2 restart deepsocal >/dev/null && pm2 save >/dev/null
  wait_ready
  echo "== rolled back to $(git -C "$APP" log -1 --format='%h %s')"
  exit 0
fi

rm -rf "$NEXT"
git clone -q --depth 1 -b "$BRANCH" "$REPO" "$NEXT"
cp "$APP/.env.production.local" "$NEXT/"
cd "$NEXT"
echo "== building $(git log -1 --format='%h %s')"
npm ci --no-audit --no-fund
npm run build

pm2 stop deepsocal >/dev/null
rm -rf "$PREV"; mv "$APP" "$PREV"; mv "$NEXT" "$APP"
pm2 restart deepsocal >/dev/null && pm2 save >/dev/null
wait_ready
echo "== live: $(git -C "$APP" log -1 --format='%h %s') ($(date -u +'%F %T') UTC)"
