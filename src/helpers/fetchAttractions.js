const fetchAttractions = async (url, setStateFunc, setLoadingFunc) => {
  try {
    setLoadingFunc(true);
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer token",
      },
    });

    const data = await response.json();

    setStateFunc(data.data.attractions);
    setLoadingFunc(false);
  } catch (err) {
    setLoadingFunc(false);
  }
};

export default fetchAttractions;
