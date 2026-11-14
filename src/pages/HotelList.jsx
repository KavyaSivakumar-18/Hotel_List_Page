import { useState, useEffect } from "react";
import "../styles/HotelList.css";

import { useSelector, useDispatch } from "react-redux";

import HotelForm from "../components/HotelForm";
import HotelCard from "../components/HotelCard";
import Pagination from "../components/Pagination";

import {
  setHotels,
  addHotel,
  updateHotel,
  deleteHotel,
} from "../redux/HotelSlice";

const API_URL = "http://localhost:5000";

function HotelList() {
  const hotels = useSelector((state) => state.hotels);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editHotel, setEditHotel] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch(`${API_URL}/hotels`);

        if (!response.ok) {
          throw new Error("Unable to fetch hotels");
        }

        const data = await response.json();
        dispatch(setHotels(data));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [dispatch]);

  const hotelsPerPage = 3;

  const filteredHotels = hotels.filter((hotel) => {
    const matchesName = hotel.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesMinPrice =
      minPrice === "" || Number(hotel.price) >= Number(minPrice);

    const matchesMaxPrice =
      maxPrice === "" || Number(hotel.price) <= Number(maxPrice);

    return matchesName && matchesMinPrice && matchesMaxPrice;
  });

  const sortedHotels = [...filteredHotels];

  if (sortOrder === "lowToHigh") {
    sortedHotels.sort((a, b) => Number(a.price) - Number(b.price));
  }

  if (sortOrder === "highToLow") {
    sortedHotels.sort((a, b) => Number(b.price) - Number(a.price));
  }

  const totalPages = Math.ceil(sortedHotels.length / hotelsPerPage);

  const lastIndex = currentPage * hotelsPerPage;
  const firstIndex = lastIndex - hotelsPerPage;

  const currentHotels = sortedHotels.slice(firstIndex, lastIndex);

  const handleAddHotel = async (hotel) => {
    try {
      const response = await fetch(`${API_URL}/hotels`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(hotel),
      });

      if (!response.ok) {
        throw new Error("Unable to add hotel");
      }

      const newHotel = await response.json();

      dispatch(addHotel(newHotel));
      setShowForm(false);
      setCurrentPage(1);
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEditHotel = (hotel) => {
    setEditHotel(hotel);
    setShowForm(true);
  };

  const handleUpdateHotel = async (hotel) => {
    try {
      const response = await fetch(`${API_URL}/hotels/${hotel.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(hotel),
      });

      if (!response.ok) {
        throw new Error("Unable to update hotel");
      }

      const updatedHotel = await response.json();

      dispatch(updateHotel(updatedHotel));
      setEditHotel(null);
      setShowForm(false);
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteHotel = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this hotel?",
    );

    if (confirmDelete) {
      try {
        const response = await fetch(`${API_URL}/hotels/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Unable to delete hotel");
        }

        dispatch(deleteHotel(id));

        const remainingHotels = filteredHotels.length - 1;
        const remainingPages = Math.ceil(remainingHotels / hotelsPerPage);

        if (currentPage > remainingPages && remainingPages > 0) {
          setCurrentPage(remainingPages);
        }

        setShowSuccess(true);
        setError("");

        setTimeout(() => {
          setShowSuccess(false);
        }, 2000);
      } catch (error) {
        setError(error.message);
      }
    }
  };

  if (loading) {
    return <p>Loading hotels...</p>;
  }

  return (
    <div className="hotel-list">
      <div className="hotel-list-header">
        <h2>Hotel Management System</h2>
      </div>

      <button
        className="add-hotel-button"
        onClick={() => {
          setEditHotel(null);
          setShowForm(true);
        }}
      >
        Add Hotel
      </button>

      {showForm && (
        <HotelForm
          onSubmit={editHotel ? handleUpdateHotel : handleAddHotel}
          onCancel={() => {
            setShowForm(false);
            setEditHotel(null);
          }}
          editHotel={editHotel}
        />
      )}

      <div className="filter-section">
        <input
          type="text"
          placeholder="Search hotels by name..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="search-input"
        />

        <input
          type="number"
          min="0"
          placeholder="Minimum price"
          value={minPrice}
          onChange={(e) => {
            setMinPrice(e.target.value);
            setCurrentPage(1);
          }}
          className="search-input"
        />

        <input
          type="number"
          min="0"
          placeholder="Maximum price"
          value={maxPrice}
          onChange={(e) => {
            setMaxPrice(e.target.value);
            setCurrentPage(1);
          }}
          className="search-input"
        />

        <select
          value={sortOrder}
          onChange={(e) => {
            setSortOrder(e.target.value);
            setCurrentPage(1);
          }}
          className="search-input"
        >
          <option value="">Sort by Price</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>
      </div>

      {error && <p className="error-message">{error}</p>}

      {sortedHotels.length === 0 ? (
        <p>No hotels found</p>
      ) : (
        <>
          <div className="hotels">
            {currentHotels.map((hotel) => (
              <HotelCard
                key={hotel.id}
                hotel={hotel}
                onEdit={handleEditHotel}
                onDelete={handleDeleteHotel}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}

      {showSuccess && (
        <div className="success-popup">Hotel deleted successfully!</div>
      )}
    </div>
  );
}

export default HotelList;
