import axios from "axios";
require("dotenv").config();

// Qiita API
const API_BASE = "https://qiita.com/api/v2/items";
const ORGANIZATION = process.env.QIITA_ORGANIZATION;

type QiitaItem = {
  title: string;
  url: string;
  created_at: string;
  user: {
    id: string;
  };
};

// array of qiita items
const items: QiitaItem[] = [];

// fetch qiita items
const fetchQiitaItems = async () => {
  try {
    const response = await axios.get(`${API_BASE}?query=org:${ORGANIZATION}`);
    if (response.status !== 200) {
      throw new Error("Failed to fetch Qiita items.");
    }

    const data = response.data;
    if (data.length === 0) {
      console.log("No items found.");
      return;
    }

    data.forEach((item: QiitaItem) => {
      items.push({
        title: item.title,
        url: item.url,
        created_at: item.created_at,
        user: {
          id: item.user.id,
        },
      });
    });
  } catch (error) {
    console.error(error);
  }
};

(async function main() {
  console.log("Starting fetch Qiita items...");
  await fetchQiitaItems();
  console.log("Finished fetch Qiita items.");
})();
