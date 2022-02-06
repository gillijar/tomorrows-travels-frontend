const fetchLocations = async (url, setLoadingFunc, setStateFunc) => {
  try {
    setLoadingFunc(true);
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    setStateFunc(data.data.allLocations);
    setLoadingFunc(false);
  } catch (err) {
    setLoadingFunc(false);
  }
};

export default fetchLocations;
