const createDestination = async (url, formBody) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formBody),
    });

    const data = await response.json();

    console.log(data);
  } catch (err) {
    console.log(err);
  }
};

export default createDestination;
