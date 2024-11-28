
const useFetchChuckNorrisApi = () => {
  const BASE_URL = "https://api.chucknorris.io/jokes";

  // Fetch a random Chuck Norris joke.
  const fetchRandomJoke = async () => {
    try {
      const response = await fetch(`${BASE_URL}/random`);
      if (!response.ok) {
        throw new Error("Failed to fetch a random joke");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };


  // Fetch a random Chuck Norris joke from a specific category.
  const fetchRandomJokeByCategory = async (category) => {
    try {
      const response = await fetch(`${BASE_URL}/random?category=${category}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch a joke from category: ${category}`);
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  //Fetch all available joke categories.
  const fetchJokeCategories = async () => {
    try {
      const response = await fetch(`${BASE_URL}/categories`);
      if (!response.ok) {
        throw new Error("Failed to fetch joke categories");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  //Fetch joke by id
  const fetchJokeById = async (id) => {
    const url = `${BASE_URL}/${id}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const joke = await response.json();
      console.log("Joke fetched by ID:", joke);
      return joke;
    } catch (error) {
      console.error("Failed to fetch the joke:", error);
      throw error;
    }
  };

  // Return an object containing all the functions
  return {
    fetchRandomJoke,
    fetchRandomJokeByCategory,
    fetchJokeCategories,
    fetchJokeById
  };
};

export default useFetchChuckNorrisApi;
