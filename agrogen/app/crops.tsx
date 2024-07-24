import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/crops.module.css";

interface Crop {
  id: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
}

const Crops = () => {
  const [crops, setCrops] = useState<Crop[]>([]);
  const [newCrop, setNewCrop] = useState<Partial<Crop>>({});

  useEffect(() => {
    // Fetch crops data from the API
    const fetchCrops = async () => {
      try {
        const response = await axios.get("/api/crops");
        setCrops(response.data);
      } catch (error) {
        console.error("Error fetching crops:", error);
      }
    };

    fetchCrops();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCrop({ ...newCrop, [e.target.name]: e.target.value });
  };

  const addCrop = async () => {
    try {
      const response = await axios.post("/api/crops", newCrop);
      setCrops([...crops, response.data]);
      setNewCrop({});
    } catch (error) {
      console.error("Error adding crop:", error);
    }
  };

  const deleteCrop = async (id: string) => {
    try {
      await axios.delete(`/api/crops/${id}`);
      setCrops(crops.filter((crop) => crop.id !== id));
    } catch (error) {
      console.error("Error deleting crop:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Manage Crops</h1>

      <div className={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Crop Name"
          value={newCrop.name || ""}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={newCrop.category || ""}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={newCrop.quantity || ""}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newCrop.price || ""}
          onChange={handleInputChange}
        />
        <button onClick={addCrop}>Add Crop</button>
      </div>

      <ul className={styles.cropsList}>
        {crops.map((crop) => (
          <li key={crop.id} className={styles.cropItem}>
            <span>
              {crop.name} - {crop.category} - {crop.quantity} units - $
              {crop.price}
            </span>
            <button onClick={() => deleteCrop(crop.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Crops;
