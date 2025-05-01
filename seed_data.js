// seedData.js
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://semaldesilva2002:semal2002@clinitech.hmc9j.mongodb.net/"; // Replace with your MongoDB connection string
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db(); // use default database from connection string

    // Define hardcoded hospital services
    const hospitalServices = [
      { name: 'X-Ray', price: 1000 },
      { name: 'CT Scan', price: 3000 },
      { name: 'MRI', price: 5000 },
      { name: 'Ultrasound', price: 1500 },
      { name: 'Blood Test', price: 500 }
    ];

    // Define hardcoded treatments
    const treatments = [
      { name: 'Chemotherapy', price: 2000 },
      { name: 'Radiation Therapy', price: 2500 },
      { name: 'Surgery', price: 15000 },
      { name: 'Physical Therapy', price: 1000 },
      { name: 'Dialysis', price: 4000 }
    ];

    // Insert into collections (create collections if not exists)
    const servicesCollection = db.collection('HospitalServices');
    const treatmentsCollection = db.collection('Treatments');

    await servicesCollection.deleteMany({});
    await treatmentsCollection.deleteMany({});

    await servicesCollection.insertMany(hospitalServices);
    await treatmentsCollection.insertMany(treatments);

    console.log('Seed data inserted successfully');
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

run();
