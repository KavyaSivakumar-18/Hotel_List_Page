import courtyard from "../assets/hotels/courtyard.jpeg";
import grandeInn from "../assets/hotels/grande inn.jpg";
import mayas from "../assets/hotels/Mayas.jpg";
import rockfort from "../assets/hotels/RockFort.jpg";
import parkAvenue from "../assets/hotels/Park Avenue.jpg";
import ramyas from "../assets/hotels/ramyas-hotel.jpg";

const hotels = [
  {
    id: 1,
    title: "CourtYard",
    description:
      "A comfortable hotel with spacious rooms, swimming pool and excellent service.",
    latitude: 10.803956,
    longitude: 78.677003,
    price: 2500,
    image: courtyard,
  },
  {
    id: 2,
    title: "Grande inn",
    description: "Enjoy a relaxing stay with modern facilities.",
    latitude: 10.835447,
    longitude: 78.696377,
    price: 4000,
    image: grandeInn,
  },
  {
    id: 3,
    title: "Hotel Mayas",
    description: "A peaceful hotel surrounded by beautiful landscapes.",
    latitude: 10.834348,
    longitude: 78.69273,
    price: 1800,
    image: mayas,
  },
  {
    id: 4,
    title: "Rockfort view",
    description:
      "A luxury hotel offering premium rooms and traditional hospitality.",
    latitude: 10.836826,
    longitude: 78.697788,
    price: 3500,
    image: rockfort,
  },
  {
    id: 5,
    title: "Park Avenue Hotel",
    description:
      "A budget-friendly hotel with clean rooms and convenient city access.",
    latitude: 10.827815,
    longitude: 78.696377,
    price: 1500,
    image: parkAvenue,
  },
  {
    id: 6,
    title: "Hotel Ramyas",
    description:
      "A modern hotel with comfortable accommodation and friendly staff.",
    latitude: 10.79986,
    longitude: 78.681748,
    price: 2200,
    image: ramyas,
  },
];

export default hotels;
