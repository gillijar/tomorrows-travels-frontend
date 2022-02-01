const createReview = async (url, formBody, close, error) => {
  let data;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formBody),
    });

    data = await response.json();

    if (response.ok) {
      close();
    }

    if (!response.ok) {
      throw new Error();
    }
  } catch (err) {
    console.log(data);
    error(data);
  }
};

export default createReview;
