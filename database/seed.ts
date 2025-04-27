// import {
//   sampleSpeeches,
//   sampleTopics,
//   samplePeople,
//   sampleTranslation,
// } from "@/seedData";
// import { speeches, topics, people, translations } from "@/database/schema";
// import { neon } from "@neondatabase/serverless";
// import { drizzle } from "drizzle-orm/neon-http";
// import { config } from "dotenv";
// import { eq } from "drizzle-orm";
//
// config({ path: ".env.local" });
//
// const sql = neon(process.env.DATABASE_URL!);
//
// export const db = drizzle({ client: sql });
//
// const seed = async () => {
//   console.log("Seeding database...");
//
//   try {
//     // for (const topic of sampleTopics) {
//     //   await db.insert(topics).values({ ...topic });
//     // }
//     // const topId = await db
//     //   .select({ topId: topics.id })
//     //   .from(topics)
//     //   .where(eq(topics.topicName, "Trí Tuệ Nhân Tạo"))
//     //   .limit(1)
//     //   .then((res) => res[0].topId);
//     //
//     // for (const speech of sampleSpeeches) {
//     //   await db.insert(speeches).values({ ...speech, topicId: [topId] });
//     // }
//     //
//     // for (const person of samplePeople) {
//     //   await db.insert(people).values({ ...person });
//     // }
//
//     for (const translation of sampleTranslation) {
//       await db.insert(translations).values({ ...translation, speechId: null });
//     }
//     console.log("Seeded successfully...");
//   } catch (error) {
//     console.log("Error seeding database...:", error);
//   }
// };
//
// seed();
