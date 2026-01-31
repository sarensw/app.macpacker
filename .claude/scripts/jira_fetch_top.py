#!/usr/bin/env python3
import json
import os
from datetime import datetime, timezone

import requests
from dotenv import load_dotenv


def require_env(name: str) -> str:
    val = os.getenv(name)
    if not val:
        raise SystemExit(f"Missing required env var: {name}")
    return val


def jira_post(session: requests.Session, url: str, body: dict):
    r = session.post(url, json=body, timeout=30)
    if r.status_code >= 400:
        try:
            detail = r.json()
        except Exception:
            detail = r.text
        raise SystemExit(
            f"Jira request failed\n"
            f"Status: {r.status_code}\n"
            f"URL: {url}\n"
            f"Response: {detail}"
        )
    return r.json()


def jira_get(session: requests.Session, url: str, params=None):
    r = session.get(url, params=params, timeout=30)
    if r.status_code >= 400:
        try:
            detail = r.json()
        except Exception:
            detail = r.text
        raise SystemExit(
            f"Jira request failed\n"
            f"Status: {r.status_code}\n"
            f"URL: {r.url}\n"
            f"Response: {detail}"
        )
    return r.json()


def main() -> int:
    load_dotenv()

    host = require_env("JIRA_HOST").rstrip("/")
    email = require_env("JIRA_EMAIL")
    token = require_env("JIRA_API_TOKEN")

    out_file = ".claude/state/raw-ticket.json"
    os.makedirs(os.path.dirname(out_file), exist_ok=True)

    # 🔒 Single source of truth: Jira filter
    jql = "filter = Fetch_Next order by rank asc"

    session = requests.Session()
    session.auth = (email, token)
    session.headers.update(
        {"Accept": "application/json", "Content-Type": "application/json"}
    )

    # 1) Search (top-ranked issue only)
    search_url = f"{host}/rest/api/3/search/jql"
    search_body = {
        "jql": jql,
        "maxResults": 1,
        "fields": ["*all"],
    }

    search = jira_post(session, search_url, search_body)
    issues = search.get("issues", [])

    if not issues:
        payload = {
            "status": "idle",
            "jql": jql,
            "checked_at": datetime.now(timezone.utc).isoformat(),
        }
        with open(out_file, "w", encoding="utf-8") as f:
            json.dump(payload, f, indent=2)
        print("No tickets found (idle).")
        return 0

    key = issues[0]["key"]

    # 2) Fetch full issue
    issue_url = f"{host}/rest/api/3/issue/{key}"
    issue = jira_get(
        session,
        issue_url,
        params={"fields": "*all", "expand": "renderedFields,changelog"},
    )

    payload = {
        "fetched_at": datetime.now(timezone.utc).isoformat(),
        "jql": jql,
        "issue_key": key,
        "jira_url": f"{host}/browse/{key}",
        "issue": issue,
    }

    with open(out_file, "w", encoding="utf-8") as f:
        json.dump(payload, f, indent=2)

    print(f"Fetched: {key}")
    print(f"Wrote: {out_file}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
