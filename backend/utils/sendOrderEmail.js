import emailjs from "@emailjs/nodejs";

export const sendOrderEmail = async ({
    toEmail,
    customerName,
    orderNumber,
    orderDate,
    totalPrice,
    shippingFee,
    address,
    city,
    state,
    country,
    phone,
    items
}) => {
    const formattedDate = new Intl.DateTimeFormat("en-PK", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    }).format(new Date(orderDate));

    const subtotal = totalPrice - shippingFee;

   const orderItemsHtml = (items || [])
  .map((item) => {
    const image = item.product?.image || "";
    const name = item.product?.name || "Product";
    const description = item.product?.description || "";
    const quantity = item.quantity || 0;
    const price = item.product?.price || 0;
    const lineTotal = price * quantity;

    return `
      <tr>
        <td style="padding:16px 0;border-bottom:1px solid #efe3dc;">
          
          <table style="border-collapse:collapse;">
            <tr>
              
              <!-- IMAGE -->
              <td style="padding-right:14px;vertical-align:top;">
                <img 
                  src="${image}" 
                  alt="${name}" 
                  style="width:70px;height:70px;border-radius:10px;border:1px solid #eadfdb;object-fit:cover;"
                />
              </td>

              <!-- TEXT -->
              <td style="vertical-align:top;">
                <div style="font-size:15px;font-weight:600;color:#6A0610;">
                  ${name}
                </div>
                <div style="font-size:13px;color:#8b6258;margin-top:6px;line-height:1.6;">
                  ${description}
                </div>
              </td>

            </tr>
          </table>

        </td>

        <td style="text-align:center;border-bottom:1px solid #efe3dc;">
          ${quantity}
        </td>

        <td style="text-align:right;border-bottom:1px solid #efe3dc;font-weight:600;">
          Rs ${lineTotal}
        </td>
      </tr>
    `;
  })
  .join("");

    const shippingAddressHtml = `
        <p style="margin:0 0 6px;font-size:15px;font-weight:600;color:#6A0610;">${customerName}</p>
        <p style="margin:0 0 6px;font-size:14px;line-height:1.7;color:#8b6258;">${address}</p>
        <p style="margin:0 0 6px;font-size:14px;line-height:1.7;color:#8b6258;">${city}, ${state}, ${country}</p>
        <p style="margin:0;font-size:14px;line-height:1.7;color:#8b6258;">Phone: ${phone}</p>
    `;

    const templateParams = {
        to_email: toEmail,
        customer_name: customerName,
        order_number: orderNumber,
        order_date: formattedDate,
        subtotal: subtotal,
        shipping_fee: shippingFee,
        total_price: totalPrice,
        order_items_html: orderItemsHtml,
        shipping_address_html: shippingAddressHtml
    };

    return await emailjs.send(
        process.env.EMAILJS_SERVICE_ID,
        process.env.EMAILJS_TEMPLATE_ID,
        templateParams,
        {
            publicKey: process.env.EMAILJS_PUBLIC_KEY,
            privateKey: process.env.EMAILJS_PRIVATE_KEY
        }
    );
};
