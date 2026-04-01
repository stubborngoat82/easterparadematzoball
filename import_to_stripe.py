#!/usr/bin/env python3
"""
Create Stripe products + default prices from a CSV.
Usage:
  export STRIPE_SECRET_KEY=sk_test_...
  python import_to_stripe.py stripe_tshirt_catalog.csv

Notes:
- This creates one Stripe Product per row and one default one-time Price on that product.
- It is intended for standard Stripe Product Catalog imports using the Products API.
- If a product_id already exists, the script skips that row and continues.
"""

import csv
import json
import os
import sys
import urllib.error
import urllib.parse
import urllib.request


API_BASE = "https://api.stripe.com/v1"


def post_form(path, form_data, secret_key):
    url = f"{API_BASE}{path}"
    data = urllib.parse.urlencode(form_data).encode("utf-8")
    request = urllib.request.Request(url, data=data, method="POST")
    auth = (secret_key + ":").encode("utf-8")
    import base64
    request.add_header("Authorization", "Basic " + base64.b64encode(auth).decode("ascii"))
    request.add_header("Content-Type", "application/x-www-form-urlencoded")
    try:
        with urllib.request.urlopen(request) as response:
            return response.getcode(), json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8", errors="replace")
        try:
            payload = json.loads(body)
        except Exception:
            payload = {"raw_error": body}
        return e.code, payload


def truthy(value):
    return str(value).strip().lower() in {"1", "true", "yes", "y"}


def build_form(row):
    form = {
        "id": row["product_id"].strip(),
        "name": row["name"].strip(),
        "active": "true" if truthy(row.get("active", "true")) else "false",
        "shippable": "true" if truthy(row.get("shippable", "true")) else "false",
        "unit_label": row.get("unit_label", "").strip(),
        "default_price_data[currency]": row["currency"].strip().lower(),
        "default_price_data[unit_amount]": str(int(row["unit_amount"])),
        "default_price_data[lookup_key]": row.get("lookup_key", "").strip(),
        "default_price_data[nickname]": row.get("price_nickname", "").strip(),
    }

    description = row.get("description", "").strip()
    if description:
        form["description"] = description

    tax_behavior = row.get("tax_behavior", "").strip()
    if tax_behavior:
        form["default_price_data[tax_behavior]"] = tax_behavior

    url = row.get("url", "").strip()
    if url:
        form["url"] = url

    image_url = row.get("image_url", "").strip()
    if image_url:
        form["images[0]"] = image_url

    metadata_map = {
        "base_product": row.get("base_product", "").strip(),
        "category": row.get("category", "").strip(),
        "color": row.get("color", "").strip(),
        "size": row.get("size", "").strip(),
        "event_name": row.get("event_name", "").strip(),
    }
    for key, value in metadata_map.items():
        if value:
            form[f"metadata[{key}]"] = value
            form[f"default_price_data[metadata][{key}]"] = value

    return {k: v for k, v in form.items() if v != ""}


def main():
    if len(sys.argv) > 1:
        csv_path = sys.argv[1]
    else:
        csv_path = "stripe_tshirt_catalog.csv"

    secret_key = os.environ.get("STRIPE_SECRET_KEY", "").strip()
    if not secret_key:
        print("ERROR: Set STRIPE_SECRET_KEY first.", file=sys.stderr)
        sys.exit(1)

    created = 0
    skipped = 0
    failed = 0

    with open(csv_path, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        required = {"product_id", "name", "currency", "unit_amount"}
        missing = required - set(reader.fieldnames or [])
        if missing:
            print(f"ERROR: Missing required columns: {', '.join(sorted(missing))}", file=sys.stderr)
            sys.exit(1)

        for line_no, row in enumerate(reader, start=2):
            form = build_form(row)
            status, payload = post_form("/products", form, secret_key)

            if 200 <= status < 300:
                created += 1
                print(f"CREATED line {line_no}: {payload['id']} default_price={payload.get('default_price')}")
                continue

            error = payload.get("error", {})
            code = error.get("code", "")
            message = error.get("message", payload)

            if code == "resource_already_exists":
                skipped += 1
                print(f"SKIPPED line {line_no}: {row['product_id']} already exists")
            else:
                failed += 1
                print(f"FAILED line {line_no}: {row.get('product_id','')} -> {message}")

    print("\nSummary")
    print(f"Created: {created}")
    print(f"Skipped existing: {skipped}")
    print(f"Failed: {failed}")


if __name__ == "__main__":
    main()
