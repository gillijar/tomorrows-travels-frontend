const fetchRestaurants = async (url, setStateFunc) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data.data.restaurants);
    setStateFunc(data.data.restaurants);
  } catch (err) {
    console.log(err);
  }
};

export default fetchRestaurants;
