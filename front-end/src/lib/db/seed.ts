import bcrypt from "bcryptjs";
import { connectToDatabase } from "./mongodb";
import { User } from "../models/User";
import { Product } from "../models/Product";
import { Category } from "../models/Category";
import { StoreSetting } from "../models/StoreSetting";
import { products, categories } from "@/app/data/products";

let isSeeding = false;

export async function seedDatabaseIfNeeded() {
  if (isSeeding) return;
  isSeeding = true;

  try {
    await connectToDatabase();

    // 1. Seed Super Admin & Staff Users
    const adminEmail = (
      process.env.DEFAULT_ADMIN_EMAIL || "admin@mehriamobiles.com"
    ).toLowerCase();
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (!existingAdmin) {
      const adminPassword =
        process.env.DEFAULT_ADMIN_PASSWORD || "Admin@123456";
      const hashedPassword = await bcrypt.hash(adminPassword, 10);

      await User.create({
        name: process.env.DEFAULT_ADMIN_NAME || "Mehria Admin",
        email: adminEmail,
        password: hashedPassword,
        role: "admin",
        isActive: true,
      });
      console.log(`[Seed] Created initial super admin: ${adminEmail}`);
    }

    // Seed test staff user
    const staffEmail = "staff@mehriamobiles.com";
    const existingStaff = await User.findOne({ email: staffEmail });
    if (!existingStaff) {
      const hashedStaffPassword = await bcrypt.hash("Staff@123456", 10);
      await User.create({
        name: "Mehria Staff",
        email: staffEmail,
        password: hashedStaffPassword,
        role: "staff",
        isActive: true,
      });
      console.log(`[Seed] Created initial staff member: ${staffEmail}`);
    }

    // 2. Seed Categories
    const categoryCount = await Category.countDocuments();
    if (categoryCount === 0) {
      const categoryDocs = categories.map((cat, idx) => ({
        id: cat.id,
        label: cat.label,
        description: `All ${cat.label} for mobile phones and devices.`,
        displayOrder: idx,
      }));
      await Category.insertMany(categoryDocs);
      console.log(`[Seed] Inserted ${categoryDocs.length} categories.`);
    }

    // 3. Seed Products
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      const productDocs = products.map((prod) => ({
        id: prod.id,
        name: prod.name,
        price: prod.price,
        oldPrice: prod.oldPrice,
        tag: prod.tag,
        tagColor: prod.tagColor || "#00C2D1",
        tagText: prod.tagText || "#3C3837",
        category: prod.category,
        rating: prod.rating,
        reviews: prod.reviews,
        img: prod.img,
        description: `Premium quality ${prod.name} with guaranteed reliability and warranty from Mehria Mobiles.`,
        inStock: prod.inStock,
        featured: prod.tag === "Popular" || prod.tag === "New",
      }));
      await Product.insertMany(productDocs);
      console.log(`[Seed] Inserted ${productDocs.length} products.`);
    }

    // 4. Seed Store Settings
    const settingCount = await StoreSetting.countDocuments();
    if (settingCount === 0) {
      await StoreSetting.create({});
      console.log("[Seed] Created default store settings.");
    }
  } catch (error) {
    console.error("[Seed] Seeding error:", error);
  } finally {
    isSeeding = false;
  }
}
