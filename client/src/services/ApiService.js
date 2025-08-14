const portFrom = {
  "http:": ":8080",
  "https:": ":8443",
};

const apiUrl =
  location.protocol +
  "//" +
  location.hostname +
  portFrom[location.protocol] +
  process.env.BASE_URL +
  "api";

export default {
  // call 後端 /books API 取得所有書籍
  fetchAllBooks() {
    const url = "http://localhost:8080/books";

    console.log("GET from " + url);
    
    return fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .catch((reason) => {
        console.log("Error fetching books data", reason);
        throw reason;
      });
  },
  // call 後端 /books?xxx API 取得特定篩選條件的書籍
  fetchBooksByFilter(filters) {
    // 建立 URLSearchParams 物件，它會自動將物件轉換成 URL 查詢字串
    const queryParams = new URLSearchParams(filters);

    let url = "http://localhost:8080/books";

    // 如果有查詢參數，就加到 URL 後面
    if (queryParams.toString()) {
      url += `?${queryParams.toString()}`;
    }

    console.log("GET from " + url);
    return fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .catch((reason) => {
        console.log("Error fetching books data", reason);
        throw reason;
      });
  },
  // call 後端 /categories API 取得所有類別
  fetchCategories() {
    const url = "http://localhost:8080/categories";

    console.log("GET from " + url);
    
    return fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .catch((reason) => {
        console.log("Error fetching categories data", reason);
        throw reason;
      });
  },
  placeOrder(order) {
    console.log("POSTing to " + `${apiUrl}/orders`);
    return fetch(`${apiUrl}/orders`, {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((stream) => {
      if (stream.ok) {
        return stream.json();
      }
      throw new Error("Network response was not ok.");
    });
  },
};
