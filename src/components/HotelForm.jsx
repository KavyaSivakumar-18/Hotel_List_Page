import { useState } from "react";
import "../styles/HotelForm.css";

function HotelForm({ editHotel, onSubmit, onCancel }) {
  const [title, setTitle] = useState(editHotel?.title || "");
  const [description, setDescription] = useState(editHotel?.description || "");
  const [latitude, setLatitude] = useState(editHotel?.latitude || "");
  const [longitude, setLongitude] = useState(editHotel?.longitude || "");
  const [price, setPrice] = useState(editHotel?.price || "");
  const [image, setImage] = useState(editHotel?.image || "");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please upload a hotel image");
      return;
    }

    if (Number(latitude) < -90 || Number(latitude) > 90) {
      alert("Latitude must be between -90 and 90");
      return;
    }

    if (Number(longitude) < -180 || Number(longitude) > 180) {
      alert("Longitude must be between -180 and 180");
      return;
    }

    if (Number(price) <= 0) {
      alert("Price must be greater than 0");
      return;
    }

    const hotel = {
      id: editHotel?.id,
      title: title.trim(),
      description: description.trim(),
      latitude,
      longitude,
      price,
      image,
    };

    onSubmit(hotel);
  };

  return (
    <div className="hotel-form">
      <h2>{editHotel ? "Edit Hotel" : "Add Hotel"}</h2>

      <form onSubmit={handleSubmit}>
        <label>Hotel Image</label>

        <input
          type="file"
          accept="image/*"
          required={!image}
          onChange={(e) => {
            const file = e.target.files[0];

            if (file) {
              setImage(URL.createObjectURL(file));
            }
          }}
        />

        {image && (
          <img src={image} alt="Hotel preview" className="hotel-preview" />
        )}

        <label>Hotel Name</label>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter hotel name"
          required
        />

        <label>Description</label>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter hotel description"
          required
        />

        <label>Latitude</label>

        <input
          type="number"
          min="-90"
          max="90"
          step="any"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          placeholder="Enter latitude"
          required
        />

        <label>Longitude</label>

        <input
          type="number"
          min="-180"
          max="180"
          step="any"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          placeholder="Enter longitude"
          required
        />

        <label>Price</label>

        <input
          type="number"
          min="1"
          step="any"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter hotel price"
          required
        />

        <button type="submit">
          {editHotel ? "Update Hotel" : "Add Hotel"}
        </button>

        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default HotelForm;
