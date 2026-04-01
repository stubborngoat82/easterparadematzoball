#!/usr/bin/env bash
set -euo pipefail

# Creates 24 Stripe products and 24 one-time prices, then sets each product's default_price.
# Usage:
#   stripe login
#   EVENT_NAME="EasterParadeMatzoBall" bash stripe_create_tshirts_fixed.sh
# Optional:
#   DRY_RUN=1 EVENT_NAME="EasterParadeMatzoBall" bash stripe_create_tshirts_fixed.sh

EVENT_NAME="EasterParadeMatzoBall"
DRY_RUN="${DRY_RUN:-0}"

colors=("White" "Spearmint" "Sky Blue" "Vintage Gold")
sizes=("Small" "Medium" "Large" "XL" "XXL" "XXXL")

slugify() {
  echo "$1" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9]+/_/g; s/^_+|_+$//g'
}

amount_for_size() {
  case "$1" in
    "XXL"|"XXXL") echo 3000 ;;
    *) echo 2500 ;;
  esac
}

run_or_print() {
  if [[ "$DRY_RUN" == "1" ]]; then
    printf '%q ' "$@"
    printf '\n'
  else
    "$@"
  fi
}

for color in "${colors[@]}"; do
  for size in "${sizes[@]}"; do
    amount="$(amount_for_size "$size")"
    color_slug="$(slugify "$color")"
    size_slug="$(slugify "$size")"

    product_id="event_tshirt_${color_slug}_${size_slug}"
    lookup_key="event_tshirt_${color_slug}_${size_slug}"
    name="${EVENT_NAME} T-Shirt - ${color} / ${size}"
    description="${EVENT_NAME} T-Shirt in ${color}, size ${size}"

    dollars=$((amount / 100))
    cents=$((amount % 100))
    printf 'Creating %s ($%d.%02d)\n' "$name" "$dollars" "$cents"

    if [[ "$DRY_RUN" == "1" ]]; then
      run_or_print stripe post /v1/products \
        -d id="$product_id" \
        -d name="$name" \
        -d description="$description" \
        -d "metadata[base_product]=event_tshirt" \
        -d "metadata[category]=apparel" \
        -d "metadata[color]=$color" \
        -d "metadata[size]=$size" \
        -d "metadata[event_name]=$EVENT_NAME"

      run_or_print stripe post /v1/prices \
        -d product="$product_id" \
        -d currency=usd \
        -d unit_amount="$amount" \
        -d lookup_key="$lookup_key"

      echo "stripe post /v1/products/$product_id -d default_price=<PRICE_ID_FROM_PREVIOUS_COMMAND>"
      echo
      continue
    fi

    stripe post /v1/products \
      -d id="$product_id" \
      -d name="$name" \
      -d description="$description" \
      -d "metadata[base_product]=event_tshirt" \
      -d "metadata[category]=apparel" \
      -d "metadata[color]=$color" \
      -d "metadata[size]=$size" \
      -d "metadata[event_name]=$EVENT_NAME" >/dev/null

    price_json="$(stripe post /v1/prices \
      -d product="$product_id" \
      -d currency=usd \
      -d unit_amount="$amount" \
      -d lookup_key="$lookup_key")"

    price_id="$(printf '%s' "$price_json" | python3 -c 'import sys, json; print(json.load(sys.stdin)["id"])')"

    stripe post "/v1/products/$product_id" -d default_price="$price_id" >/dev/null

    echo "  Product: $product_id"
    echo "  Price:   $price_id"
    echo
  done
done

echo "Done. Review products in your Stripe dashboard."