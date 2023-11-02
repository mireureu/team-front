import { getItem } from "../api/auctionBoard";

const itemAPI = async (selectedCategory, selectedPage, sortOption) => {
  try {
    const result = await getItem(selectedPage, selectedCategory, sortOption);
    return result.data;
  } catch (error) {
    throw error;
  }
};

export default itemAPI;