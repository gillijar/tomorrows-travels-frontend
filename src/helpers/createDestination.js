const createDestination = async (url, formBody) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formBody),
    });

    await response.json();
  } catch (err) {
    console.log(err);
  }
};

export default createDestination;
