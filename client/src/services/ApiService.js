// 取得後端 base url 路徑
const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;

export default {
  // call 後端 /books API 取得所有書籍
  fetchAllBooks() {
    const url = `${API_BASE_URL}/books`;

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

    let url = `${API_BASE_URL}/books`;

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
    const url = `${API_BASE_URL}/categories`;

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
    const url = `${API_BASE_URL}/orders`;

    console.log("POSTing to " + url);
    return fetch(url, {
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
