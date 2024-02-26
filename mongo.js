const { MongoClient } = require('mongodb');
async function retrieveAndPreprocessData() {
  const { MongoClient } = require('mongodb');
  const uri = 'mongodb+srv://alphagamers456:1AiKIagNI4kNuiNX@smart-indiahackathon.5m7iwx4.mongodb.net/?retryWrites=true&w=majority';
  const client = new MongoClient(uri);

  try {
  
    await client.connect();
    const db = client.db('test');

    const waterConsumptionCollection = db.collection('smart-indiahackathons');
    const data = await waterConsumptionCollection.find({}, { projection: { flowRate: 1, totalConsumption: 1, _id: 0 } }).toArray();
    console.log('Retrieved data:');
    console.log(data);
    await client.close();
    return data;
  } catch (error) {
    console.error('Error retrieving and preprocessing data:', error);
    throw error;
  }
}
retrieveAndPreprocessData()
  .then((data) => {
   
  })
  .catch((error) => {
    
  });