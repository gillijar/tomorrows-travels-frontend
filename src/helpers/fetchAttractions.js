const fetchAttractions = async (url, setStateFunc) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer token",
      },
    });

    const data = await response.json();

    setStateFunc(data.data.attractions);
  } catch (err) {}
};

export default fetchAttractions;
