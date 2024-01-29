const { VITE_BASE_URL } = import.meta.env;

const fetchData = async (url: string) => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/${url}`);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
  }
};

export default fetchData;
