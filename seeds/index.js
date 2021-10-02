// const mongoose = require('mongoose');
// const Campground = require('../models/campground');
// const cities = require('./cities');
// const { places, descriptors } = require('./seedHelpers');

// const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/yelp-camp';

// mongoose.connect(dbUrl, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true
// })

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', () => {
//   console.log('Database connected');
// })

// const sample = array => array[Math.floor(Math.random() * array.length)];

// const seedDB = async () => {
//   await Campground.deleteMany({});
//   for (let i = 0; i < 300; i++) {
//     const random1000 = Math.floor(Math.random() * 1000);
//     const price = Math.floor(Math.random() * 20) + 10;
//     const camp = new Campground({
//       author: '607fbe6d8cb5ae15591b99c7',
//       location: `${cities[random1000].city}, ${cities[random1000].state}`,
//       title: `${sample(descriptors)} ${sample(places)}`,
//       geometry: {
//         type: "Point",
//         coordinates: [
//           cities[random1000].longitude,
//           cities[random1000].latitude
//         ]
//       },
//       images: [
//         {
//           url: 'https://res.cloudinary.com/dlkcz7vpy/image/upload/v1619370163/YelpCamp/pdhhe58lmpat2nw2ibtl.jpg',
//           filename: 'YelpCamp/pdhhe58lmpat2nw2ibtl'
//         },
//         {
//           url: 'https://res.cloudinary.com/dlkcz7vpy/image/upload/v1619370163/YelpCamp/t1sbq5piqshe0uxfzaux.jpg',
//           filename: 'YelpCamp/t1sbq5piqshe0uxfzaux'
//         }
//       ],
//       description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores optio amet illum ab perferendis! Non, atque, laboriosam itaque voluptas quam perspiciatis animi quidem eum optio eaque fuga magni fugiat inventore!',
//       price: `${price}`
//     })
//     await camp.save();
//   }
// }

// seedDB()
//   .then(() => {
//     mongoose.connection.close();
//   })


const mongoose = require('mongoose');
const campground = require('../models/campground');
const Campground = require('../models/campground');
const cities = require('./cities');
const authors = require('./authors');
const { places, descriptors } = require('./seedHelpers');
const imageFiles = require('./imageFiles');

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/yelp-camp';

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  // await Campground.deleteMany({});
  for (let i = 0; i < 2; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const random24 = Math.floor(Math.random() * 24);
    const random35 = Math.floor(Math.random() * 35) + 1;
    const price = Math.floor(Math.random() * 30) + 10;
    const camp = new Campground({
      author: `${authors[random24]}`,
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude
        ]
      },
      images: [
        {
          url: `${imageFiles[random35].url}`,
          filename: `YelpCamp/${imageFiles[random35].filename}`
        }
      ],
      description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores optio amet illum ab perferendis! Non, atque, laboriosam itaque voluptas quam perspiciatis animi quidem eum optio eaque fuga magni fugiat inventore!',
      price: `${price}`
    })
    await camp.save();
  }
}

seedDB()
  .then(() => {
    mongoose.connection.close();
  })