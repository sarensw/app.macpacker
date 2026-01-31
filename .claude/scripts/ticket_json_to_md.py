#!/usr/bin/env python3
import json
import os
import sys
from typing import Any


IN_JSON = ".claude/state/raw-ticket.json"
OUT_MD = ".claude/state/raw-ticket.md"


def get(obj: Any, path: str, default=None):
    """
    Safe dotted-path getter.
    Example: get(data, "issue.fields.summary")
    """
    cur = obj
    for part in path.split("."):
        if cur is None:
            return default
        if isinstance(cur, dict):
            cur = cur.get(part)
        else:
            return default
    return cur if cur is not None else default


def md_escape(s: str) -> str:
    # Keep it minimal; Jira renderedFields.description is already HTML.
    return s


def main() -> int:
    in_path = sys.argv[1] if len(sys.argv) > 1 else IN_JSON
    out_path = sys.argv[2] if len(sys.argv) > 2 else OUT_MD

    if not os.path.exists(in_path):
        print(f"Input file not found: {in_path}", file=sys.stderr)
        return 1

    with open(in_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    # Handle "idle" marker from fetcher
    if data.get("status") == "idle":
        os.makedirs(os.path.dirname(out_path) or ".", exist_ok=True)
        with open(out_path, "w", encoding="utf-8") as out:
            out.write("# No ticket available\n\n")
            out.write(f"JQL: {data.get('jql','')}\n")
        print(f"No ticket available. Wrote: {out_path}")
        return 0

    ticket_key = data.get("issue_key", "")
    summary = get(data, "issue.fields.summary", "")
    description = get(data, "issue.renderedFields.description", "")
    labels = get(data, "issue.fields.labels", [])
    priority = get(data, "issue.fields.priority.name", "")
    linked_issues = get(data, "issue.fields.issuelinks", [])
    comments = get(data, "issue.renderedFields.comment.comments", [])

    # Comments: array -> body per element, separated by ---
    comment_bodies = []
    if isinstance(comments, list):
        for c in comments:
            if isinstance(c, dict):
                body = c.get("body", "")
                if body is None:
                    body = ""
                comment_bodies.append(str(body))

    md_lines = []
    md_lines.append(f"- **ticket_key**: {ticket_key}")
    md_lines.append(f"- **summary**: {md_escape(str(summary))}")
    md_lines.append(f"- **description**: {md_escape(str(description))}")
    md_lines.append(f"- **labels**: {json.dumps(labels, ensure_ascii=False)}")
    md_lines.append(f"- **priority**: {md_escape(str(priority))}")

    # linked_issues: keep as JSON (often large/nested)
    md_lines.append(f"- **linked_issues**: {json.dumps(linked_issues, ensure_ascii=False)}")

    # comments section
    md_lines.append("- **comments**:")
    if comment_bodies:
        for i, body in enumerate(comment_bodies):
            md_lines.append(f"comment {i+1}:")
            md_lines.append(md_escape(body))
            if i != len(comment_bodies) - 1:
                md_lines.append("\n---")
    else:
        md_lines.append("")
        md_lines.append("(none)")

    os.makedirs(os.path.dirname(out_path) or ".", exist_ok=True)
    with open(out_path, "w", encoding="utf-8") as out:
        out.write("\n".join(md_lines).rstrip() + "\n")

    print(f"Wrote: {out_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
