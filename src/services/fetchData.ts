const { VITE_BASE_URL } = import.meta.env;

const fetchData = async (url: string, noBaseUrl: boolean = false) => {
  try {
    const fullUrl = noBaseUrl ? url : `${VITE_BASE_URL}/${url}`;
    const response = await fetch(fullUrl);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
  }
};

export default fetchData;
