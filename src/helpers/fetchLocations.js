const fetchAttractions = async (url, setLoadingFunc, setStateFunc) => {
  try {
    setLoadingFunc(true);
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data.data.allLocations);
    setStateFunc(data.data.allLocations);
    setLoadingFunc(false);
  } catch (err) {
    console.log(err);
  }
};

export default fetchAttractions;
