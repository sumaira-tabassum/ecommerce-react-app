import os
from datetime import datetime

import httpx

EMAILJS_SEND_URL = "https://api.emailjs.com/api/v1.0/email/send"


def _format_address(address) -> str:
    if hasattr(address, "model_dump"):
        address = address.model_dump()
    return f"""
  <p style="margin:0 0 6px;font-weight:600;color:#6A0610;">{address["name"]}</p>
  <p style="margin:0 0 6px;color:#8b6258;">{address["address"]}</p>
  <p style="margin:0 0 6px;color:#8b6258;">{address["city"]}, {address["state"]}, {address["country"]}</p>
  <p style="margin:0;color:#8b6258;">Phone: {address["phone"]}</p>
"""


def _build_order_items_html(items) -> str:
    rows = []
    for item in items or []:
        product = item.get("product") if isinstance(item, dict) else getattr(item, "product", None)
        if isinstance(product, dict):
            image = product.get("image", "")
            name = product.get("name", "Product")
            description = product.get("description", "")
            price = product.get("price", 0)
        else:
            image = getattr(product, "image", "") or ""
            name = getattr(product, "name", "Product") or "Product"
            description = getattr(product, "description", "") or ""
            price = getattr(product, "price", 0) or 0

        quantity = item.get("quantity", 0) if isinstance(item, dict) else item.quantity
        line_total = price * quantity

        rows.append(
            f"""
      <tr>
        <td style="padding:16px 0;border-bottom:1px solid #efe3dc;">
          <table style="border-collapse:collapse;">
            <tr>
              <td style="padding-right:14px;vertical-align:top;">
                <img
                  src="{image}"
                  alt="{name}"
                  style="width:70px;height:70px;border-radius:10px;border:1px solid #eadfdb;object-fit:cover;"
                />
              </td>
              <td style="vertical-align:top;">
                <div style="font-size:15px;font-weight:600;color:#6A0610;">
                  {name}
                </div>
                <div style="font-size:13px;color:#8b6258;margin-top:6px;line-height:1.6;">
                  {description}
                </div>
              </td>
            </tr>
          </table>
        </td>
        <td style="text-align:center;border-bottom:1px solid #efe3dc;">
          {quantity}
        </td>
        <td style="text-align:right;border-bottom:1px solid #efe3dc;font-weight:600;">
          Rs {line_total}
        </td>
      </tr>
    """
        )
    return "".join(rows)


async def send_order_email(
    *,
    to_email: str,
    customer_name: str,
    order_number: str,
    order_date,
    total_price: float,
    shipping_fee: float,
    billing,
    shipping,
    items,
):
    if hasattr(billing, "model_dump"):
        billing = billing.model_dump()
    if hasattr(shipping, "model_dump"):
        shipping = shipping.model_dump()

    if hasattr(order_date, "isoformat"):
        order_date = order_date.isoformat().replace("Z", "+00:00")
    formatted_date = datetime.fromisoformat(str(order_date)).strftime("%d %B %Y")

    subtotal = total_price - shipping_fee

    template_params = {
        "to_email": to_email,
        "customer_name": customer_name,
        "order_number": order_number,
        "order_date": formatted_date,
        "subtotal": subtotal,
        "shipping_fee": shipping_fee,
        "total_price": total_price,
        "order_items_html": _build_order_items_html(items),
        "shipping_address_html": _format_address(shipping),
        "billing_address_html": _format_address(billing),
    }

    payload = {
        "service_id": os.getenv("EMAILJS_SERVICE_ID"),
        "template_id": os.getenv("EMAILJS_TEMPLATE_ID"),
        "user_id": os.getenv("EMAILJS_PUBLIC_KEY"),
        "template_params": template_params,
        "accessToken": os.getenv("EMAILJS_PRIVATE_KEY"),
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(EMAILJS_SEND_URL, json=payload, timeout=30.0)
        response.raise_for_status()
        return response.json()
