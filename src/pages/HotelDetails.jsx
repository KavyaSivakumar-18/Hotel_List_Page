import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import "../styles/HotelDetails.css";

function HotelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const hotels = useSelector((state) => state.hotels);

  const hotel = hotels.find((item) => item.id === Number(id));

  if (!hotel) {
    return (
      <div className="hotel-details">
        <Helmet>
          <title>Hotel Not Found</title>
        </Helmet>

        <h2>Hotel not found</h2>

        <button className="back-button" onClick={() => navigate("/")}>
          Back to Hotels
        </button>
      </div>
    );
  }

  const latitude = Number(hotel.latitude);
  const longitude = Number(hotel.longitude);

  const validLocation =
    hotel.latitude !== "" &&
    hotel.latitude !== undefined &&
    hotel.longitude !== "" &&
    hotel.longitude !== undefined &&
    Number.isFinite(latitude) &&
    Number.isFinite(longitude) &&
    latitude >= -90 &&
    latitude <= 90 &&
    longitude >= -180 &&
    longitude <= 180;

  const mapQuery = validLocation ? `${latitude},${longitude}` : "";

  return (
    <div className="hotel-details">
      <Helmet>
        <title>{hotel.title} | Hotel Details</title>
        <meta name="description" content={hotel.description} />
      </Helmet>

      <button className="back-button" onClick={() => navigate("/")}>
        Back to Hotels
      </button>

      <div className="details-card">
        <img src={hotel.image} alt={hotel.title} className="details-image" />

        <div className="details-info">
          <h2>{hotel.title}</h2>

          <p>{hotel.description}</p>

          <h3>Price</h3>
          <h3 className="details-price">₹{hotel.price}</h3>

          <h3>Location Coordinates</h3>

          <p>Latitude: {hotel.latitude}</p>
          <p>Longitude: {hotel.longitude}</p>
        </div>

        {validLocation ? (
          <div className="map-section">
            <h3>Hotel Location on Map</h3>

            <iframe
              title={`${hotel.title} Location Map`}
              src={`https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&z=15&output=embed`}
              width="100%"
              height="350"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
            ></iframe>

            <a
              href={`https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}`}
              target="_blank"
              rel="noreferrer"
            >
              View Location in Google Maps
            </a>
          </div>
        ) : (
          <p>Hotel location is not available.</p>
        )}
      </div>
    </div>
  );
}

export default HotelDetails;
