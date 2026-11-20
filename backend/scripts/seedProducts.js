// Replaces all products with the Noelune demo catalogue.
// Photos are free Unsplash images, uploaded to Cloudinary by URL.
// Run from the backend folder: node scripts/seedProducts.js
import dotenv from "dotenv";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import connectCloudinary from "../config/cloudinary.js";
import Product from "../models/Product.js";
import Category from "../models/Category.js";

dotenv.config();

const unsplash = (id) => `https://images.unsplash.com/photo-${id}?w=1000&h=1000&fit=crop&q=80&fm=jpg`;

const products = [
  // Lips
  { sku: "NL-LIP-001", category: "Lips", name: "Velvet Nude Liquid Lipstick", price: 1350, quantity: 36, photo: "1601548667635-a5c7f92a897a",
    description: "A rosy-nude liquid lipstick that dries to a soft velvet matte. Lightweight, transfer-resistant and comfortable all day." },
  { sku: "NL-LIP-002", category: "Lips", name: "Overnight Lip Mask", price: 1050, quantity: 50, photo: "1599305090598-fe179d501227",
    description: "A nourishing overnight balm with shea butter and berry extract. Wake up to soft, smooth and plump-looking lips." },
  { sku: "NL-LIP-003", category: "Lips", name: "Desert Rose Lipstick Set", price: 2950, quantity: 20, photo: "1773372238349-41899694df31",
    description: "Three dusty-rose shades with a creamy, comfortable finish. Wear them alone or layer for your perfect pink." },
  { sku: "NL-LIP-004", category: "Lips", name: "Nude to Red Lip Quartet", price: 3400, quantity: 18, photo: "1631214499500-2e34edcaccfe",
    description: "Four rich shades from soft caramel nude to classic red. Velvety colour that glides on in one swipe." },
  { sku: "NL-LIP-005", category: "Lips", name: "Cherry Matte Lipstick", price: 1250, quantity: 32, photo: "1613925958326-12f97a484fb5",
    description: "A deep cherry red with a smooth, long-wearing matte finish. Bold colour that won't feather or fade." },
  { sku: "NL-LIP-006", category: "Lips", name: "Pearl Glow Lip Balm", price: 850, quantity: 55, photo: "1663177213219-1aa295572917",
    description: "A silky balm stick with a soft pearl glow. Hydrates, smooths and preps lips for colour." },
  { sku: "NL-LIP-007", category: "Lips", name: "Sunset Lip & Cheek Trio", price: 2200, quantity: 22, photo: "1716287384717-972e03bf4179",
    description: "A red lip colour, peach cream blush and champagne glow in one set. Mix and match for a fresh, flushed look." },

  // Face
  { sku: "NL-FACE-001", category: "Face", name: "Skin Tint Foundation", price: 2450, quantity: 34, photo: "1711563386439-75ce269ac998",
    description: "A lightweight, buildable foundation with a natural dewy finish. Evens skin tone while letting your skin breathe." },
  { sku: "NL-FACE-002", category: "Face", name: "Peach Flush Blush", price: 1350, quantity: 28, photo: "1590156424570-698d124ec7dd",
    description: "A four-shade peach blush quad for a soft, healthy flush. Mix and blend the shades for a custom glow." },
  { sku: "NL-FACE-003", category: "Face", name: "Honey Glow Moisturizer", price: 1750, quantity: 36, photo: "1631438420064-8f1b2b52b2e6",
    description: "A rich daily moisturizer with honey and niacinamide. Softens, plumps and gives skin a healthy glow." },
  { sku: "NL-FACE-004", category: "Face", name: "Champagne Glow Highlighter", price: 1650, quantity: 30, photo: "1690214392602-796cff6b4e8a",
    description: "A finely milled pressed highlighter in a soft champagne shade. Catches the light for a lit-from-within glow." },
  { sku: "NL-FACE-005", category: "Face", name: "Rose Gold Loose Shimmer", price: 1400, quantity: 26, photo: "1503236823255-94609f598e71",
    description: "A loose rose-gold shimmer powder for cheekbones and eyes. Builds from a soft sheen to a bold glow." },
  { sku: "NL-FACE-006", category: "Face", name: "Crushed Petal Blush", price: 1350, quantity: 30, photo: "1626448637278-8414490c5e3f",
    description: "A silky powder blush in soft rose and berry tones. Blends easily for a natural, just-pinched flush." },
  { sku: "NL-FACE-007", category: "Face", name: "Gold Radiance Serum", price: 2650, quantity: 22, photo: "1781346325200-61cef7b29d76",
    description: "A lightweight brightening serum with vitamin C and niacinamide. Leaves skin smooth, even and glowing." },
  { sku: "NL-FACE-008", category: "Face", name: "Botanical Face Oil", price: 2200, quantity: 25, photo: "1781344116880-029945a42b75",
    description: "A nourishing blend of rosehip, jojoba and squalane. Absorbs quickly and leaves skin soft and dewy." },
  { sku: "NL-FACE-009", category: "Face", name: "Hydra Drops Hyaluronic Serum", price: 2100, quantity: 34, photo: "1710410815589-dd83514104d0",
    description: "A water-light serum with hyaluronic acid. Floods skin with moisture for a plump, fresh look." },
  { sku: "NL-FACE-010", category: "Face", name: "Cloud Whip Night Cream", price: 2350, quantity: 20, photo: "1634224149057-6ff405f07876",
    description: "A whipped overnight cream with peptides and ceramides. Melts into skin and repairs while you sleep." },
  { sku: "NL-FACE-011", category: "Face", name: "Pink Pearl Day Cream", price: 1950, quantity: 30, photo: "1609097164502-59a1f0f9a66f",
    description: "A light, pearly day cream that hydrates and softens. Gives skin a fresh, radiant finish under makeup." },
  { sku: "NL-FACE-012", category: "Face", name: "Pink Clay Face Mask", price: 1550, quantity: 32, photo: "1649005203762-8bbd673468dc",
    description: "A gentle pink clay mask that clears pores and calms skin. Rinse off to reveal a smooth, soft glow." },
  { sku: "NL-FACE-013", category: "Face", name: "Rose Cleansing Bar", price: 750, quantity: 60, photo: "1589060040782-234fa4ee0b61",
    description: "A creamy cleansing bar with rose and glycerin. Washes away makeup and dirt without drying the skin." },
  { sku: "NL-FACE-014", category: "Face", name: "Mini Cream Travel Duo", price: 1450, quantity: 38, photo: "1622618991227-412b19e4fef9",
    description: "Two travel-size jars of our day and night creams. Perfect for your handbag, gym bag or weekend trips." },
  { sku: "NL-FACE-015", category: "Face", name: "Rose Quartz Roller Duo", price: 2400, quantity: 18, photo: "1626897844977-5d2139c222b6",
    description: "A rose quartz face roller and a vibrating roller. Depuffs, relaxes and helps skincare sink in." },
  { sku: "NL-FACE-016", category: "Face", name: "Fluffy Powder Brush", price: 1250, quantity: 35, photo: "1620804464794-d0410e95fbe5",
    description: "An extra-soft domed brush for setting powder, bronzer and blush. Blends evenly with a light hand." },
  { sku: "NL-FACE-017", category: "Face", name: "Silk Finish Pressed Powder", price: 1650, quantity: 30, photo: "1737014892220-4123c7e020a1",
    description: "A silky pressed powder with a velvet puff and mirror. Sets makeup and softens shine for a smooth, airbrushed look." },
  { sku: "NL-FACE-018", category: "Face", name: "Rose Water Toning Essence", price: 1850, quantity: 28, photo: "1676839574523-54ad8dbaf5b7",
    description: "A light, hydrating essence with rose water and hyaluronic acid. Refreshes, balances and preps skin for serum." },
  { sku: "NL-FACE-019", category: "Face", name: "Gentle Cream Cleanser", price: 1450, quantity: 40, photo: "1707539159841-40a0db23ddc6",
    description: "A soft, creamy cleanser that removes makeup and dirt without stripping. Leaves skin calm, clean and comfortable." },

  // Eyes
  { sku: "NL-EYE-001", category: "Eyes", name: "Rose Quad Eyeshadow", price: 1650, quantity: 30, photo: "1625093525885-282384697917",
    description: "Four rosy shades in one compact palette. Perfect for soft everyday looks or a warm evening eye." },
  { sku: "NL-EYE-002", category: "Eyes", name: "Pro Eye Brush Set", price: 3200, quantity: 18, photo: "1678695692040-e9a39502c357",
    description: "A complete set of soft synthetic brushes for blending, shading and precise detail work." },
  { sku: "NL-EYE-003", category: "Eyes", name: "Nude Shimmer Eyeshadow Quint", price: 1850, quantity: 26, photo: "1625094640367-05f84293fe42",
    description: "Five shimmering nudes from champagne to rose bronze. Comes with a double-ended applicator." },
  { sku: "NL-EYE-004", category: "Eyes", name: "Bronze Sunset Palette", price: 2950, quantity: 20, photo: "1594903696739-2551e8c2d0f1",
    description: "Warm browns, coppers and rosy mattes in one big palette. Easy to blend for soft or smoky looks." },
  { sku: "NL-EYE-005", category: "Eyes", name: "Shimmer Jewel Palette", price: 2800, quantity: 22, photo: "1533562530973-424ab36f1448",
    description: "Glittering metallic shades from rose gold to pistachio. High shine that stays put all night." },
  { sku: "NL-EYE-006", category: "Eyes", name: "Volume Lash Mascara", price: 1250, quantity: 44, photo: "1758738880203-8968fb4eda82",
    description: "A jet-black mascara that lifts, lengthens and adds volume. Smudge-proof and easy to remove." },
  { sku: "NL-EYE-007", category: "Eyes", name: "Colour Play Mascara Set", price: 2400, quantity: 20, photo: "1560725613-4b52e67fc67b",
    description: "Four fun mascaras in violet, black, copper and red. Add a pop of colour to your lashes." },
  { sku: "NL-EYE-008", category: "Eyes", name: "Natural Wispy Lashes", price: 950, quantity: 50, photo: "1581389042184-bfc74c8af48e",
    description: "Lightweight, reusable wispy lashes for a soft, fluttery look. Comfortable enough to wear all day." },
  { sku: "NL-EYE-009", category: "Eyes", name: "Dramatic Volume Lashes", price: 1100, quantity: 40, photo: "1630655491563-fe6ea47d06f5",
    description: "Full, fluffy lashes for a bold evening look. Reusable up to 15 times with proper care." },
  { sku: "NL-EYE-010", category: "Eyes", name: "Essential Eye Brush Set", price: 1650, quantity: 30, photo: "1687716432639-72ba531c2c5c",
    description: "Four must-have eye brushes for blending, packing colour, smudging and lining." },
  { sku: "NL-EYE-011", category: "Eyes", name: "Brow Shaping Kit", price: 1950, quantity: 24, photo: "1620531940052-d0d9aff03c32",
    description: "Everything for neat, natural brows: tinted brow powder, a spoolie brush, precision tweezers and mini scissors." },
];

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  connectCloudinary();

  const categories = {};
  for (const name of ["Lips", "Face", "Eyes"]) {
    categories[name] = (await Category.findOne({ name })) || (await Category.create({ name }));
  }

  const docs = [];
  for (const p of products) {
    const upload = await cloudinary.uploader.upload(unsplash(p.photo), {
      folder: "products/noelune",
      public_id: p.sku.toLowerCase(),
      overwrite: true,
    });
    docs.push({
      sku: p.sku,
      name: p.name,
      price: p.price,
      quantity: p.quantity,
      description: p.description,
      category: categories[p.category]._id,
      image: upload.secure_url,
    });
    console.log(`Uploaded ${p.name}`);
  }

  const { deletedCount } = await Product.deleteMany({});
  await Product.insertMany(docs);
  console.log(`Removed ${deletedCount} old products, added ${docs.length} new ones.`);

  await mongoose.disconnect();
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
