import { useNavigate } from "react-router-dom";

function HotelCard({ hotel, onEdit, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="hotel-card" onClick={() => navigate(`/hotel/${hotel.id}`)}>
      <img src={hotel.image} alt={hotel.title} className="hotel-image" />

      <div className="hotel-info">
        <h3>{hotel.title}</h3>

        <p>{hotel.description}</p>

        {hotel.location && <p className="hotel-location">{hotel.location}</p>}

        <div className="hotel-buttons">
          <button
            className="edit-button"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(hotel);
            }}
          >
            Edit
          </button>

          <button
            className="delete-button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(hotel.id);
            }}
          >
            Delete
          </button>
        </div>
      </div>

      <div className="hotel-price">
        <h4>₹{hotel.price}</h4>
      </div>
    </div>
  );
}

export default HotelCard;
