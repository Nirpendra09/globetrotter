const { mockDestinations } = require("../app/data/mockData");
const axios = require("axios");

async function seedData() {
  try {
    console.log("Starting to seed data...");

    // Clear existing data
    console.log("Clearing existing data...");
    await axios.delete("http://127.0.0.1:3000/api/destinations", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Existing data cleared");

    // Seed new data
    console.log(`Seeding ${mockDestinations.length} destinations...`);
    const response = await axios.post(
      "http://127.0.0.1:3000/api/destinations",
      mockDestinations,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Successfully seeded data:", response.data);
    process.exit(0);
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      console.error(
        "Error response:",
        error.response.status,
        error.response.data
      );
    } else {
      console.error("Error seeding data:", error.message);
    }
    process.exit(1);
  }
}

seedData();
