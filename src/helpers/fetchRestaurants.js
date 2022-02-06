const fetchRestaurants = async (url, setStateFunc, setLoadingFunc) => {
  try {
    setLoadingFunc(true);
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    setStateFunc(data.data.restaurants);
    setLoadingFunc(false);
  } catch (err) {
    setLoadingFunc(false);
  }
};

export default fetchRestaurants;
