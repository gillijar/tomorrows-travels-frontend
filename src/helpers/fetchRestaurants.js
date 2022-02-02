const fetchRestaurants = async (url, setStateFunc) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    setStateFunc(data.data.restaurants);
  } catch (err) {}
};

export default fetchRestaurants;
