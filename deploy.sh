#!/usr/bin/env bash
# Reference deploy script. In a real environment this would talk to your
# infra (k8s, ECS, Fly.io, etc.). For the demo it simulates a deploy with
# a tagged commit and prints the resulting URL on the final line.
#
# Usage: ./deploy.sh staging | production | rollback
set -euo pipefail

ENV="${1:-staging}"
SHA="$(git rev-parse --verify HEAD 2>/dev/null || true)"
if [ -z "$SHA" ]; then
  SHA="unknown-sha-0000000000000000000000000000000000"
fi

case "$ENV" in
  staging)
    echo "[deploy] building artefact from $SHA..."
    sleep 1
    echo "[deploy] uploading to staging..."
    sleep 1
    URL="${STAGING_URL:-https://staging.example.com}"
    echo "[deploy] staging deploy complete."
    echo "[deploy] commit: $SHA"
    echo "$URL"
    ;;

  production)
    echo "[deploy] building artefact from $SHA..."
    sleep 1
    echo "[deploy] running production deploy..."
    sleep 1
    URL="${PROD_URL:-https://example.com}"
    echo "[deploy] production deploy complete."
    echo "[deploy] commit: $SHA"
    echo "$URL"
    ;;

  rollback)
    echo "[deploy] rolling back to previous release..."
    sleep 1
    echo "[deploy] rollback complete."
    ;;

  *)
    echo "Usage: $0 staging|production|rollback" >&2
    exit 2
    ;;
esac
