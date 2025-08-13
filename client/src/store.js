import Vue from "vue";
import Vuex from "vuex";
import ApiService from "./services/ApiService";
import { ShoppingCart } from "@/models/ShoppingCart";

Vue.use(Vuex);

export const CART_STORAGE_KEY = "cart";
export const ORDER_DETAIL_STORAGE_KEY = "orderDetail";

export default new Vuex.Store({
  state: {
    allBooks: [], // 用來取得所有書籍
    books: [], // 用來取得目前頁面顯示的書籍（可能是篩選後的或是所有的）
    categories: [], // 用來存放完整的類別清單
    selectedCategoryName: "", // 用來存放目前選擇的類別
    orderDetails: null,
    cart: new ShoppingCart(),
  },
  mutations: {
    SET_ALL_BOOKS(state, books) {
      state.allBooks = books;
    },
    SET_BOOKS(state, books) {
      state.books = books;
    },
    SET_CATEGORIES(state, newCategories) {
      state.categories = newCategories;
    },
    SELECT_CATEGORY(state, categoryName) {
      state.selectedCategoryName = categoryName;
    },
    ADD_TO_CART(state, book) {
      state.cart.addItem(book, 1);
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.state.cart));
    },
    UPDATE_CART(state, { book, quantity }) {
      state.cart.update(book, quantity);
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.state.cart));
    },
    CLEAR_CART(state) {
      state.cart.clear();
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.state.cart));
    },
    SET_CART(state, shoppingCart) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(shoppingCart));
      let newCart = new ShoppingCart();
      shoppingCart.items.forEach((item) => {
        newCart.addItem(item.book, item.quantity);
      });
      state.cart = newCart;
    },
    CLEAR_ORDER_DETAILS(state) {
      sessionStorage.removeItem(ORDER_DETAIL_STORAGE_KEY);
      state.orderDetails = null;
    },
    SET_ORDER_DETAILS(state, orderDetails) {
      state.orderDetails = orderDetails;
      sessionStorage.setItem(
        ORDER_DETAIL_STORAGE_KEY,
        JSON.stringify(orderDetails)
      );
    },
  },
  actions: {
    // 獲取所有書籍
    fetchAllBooks(context) {
      return ApiService.fetchAllBooks()
        .then((books) => {
          console.log("All books: ", books);
          context.commit("SET_ALL_BOOKS", books);
          context.commit('SET_BOOKS', books); // 預設顯示所有書籍
        })
        .catch((reason) => {
          console.log("Error fetching all books:", reason);
          throw reason;
        });
    },
    // 根據篩選條件獲取所有書籍
    fetchBooksByFilter(context, filters = {}) {
      return ApiService.fetchBooksByFilter(filters)
        .then((filteredBooks) => {
          console.log("Filtered books: ", filteredBooks);
          context.commit("SET_BOOKS", filteredBooks);
        })
        .catch((reason) => {
          console.log("Error fetching filtered books:", reason);
          throw reason;
        });
    },
    // 獲取所有類別
    fetchCategories(context) {
      // 檢查 allBooks 是否已經有資料
      if (context.state.allBooks.length > 0) {
        // 情境一：books 已存在，直接回傳
        const categories = [...new Set(context.state.allBooks.map(book => book.category))];
        console.log("Categories: ", categories);
        context.commit("SET_CATEGORIES", categories);
        return Promise.resolve(categories);
      } else {
        // 情境二：books 不存在，先執行 fetchAllBooks
        return context.dispatch("fetchAllBooks")
          .then(() => {
            // 等 fetchAllBooks 成功後，再從 state 中提取類別
            const categories = [...new Set(context.state.allBooks.map(book => book.category))];
            console.log("Categories: ", categories);
            context.commit("SET_CATEGORIES", categories);
            return categories;
          });
      }
    },
    addToCart(context, book) {
      context.commit("ADD_TO_CART", book);
    },
    updateCart(context, { book, quantity }) {
      context.commit("UPDATE_CART", { book, quantity });
    },
    selectCategory(context, categoryName) {
      context.commit("SELECT_CATEGORY", categoryName);
    },
    clearCart(context) {
      context.commit("CLEAR_CART");
    },
    placeOrder({ commit, state }, customerForm) {
      commit("CLEAR_ORDER_DETAILS");

      return ApiService.placeOrder({
        cart: state.cart,
        customerForm: customerForm,
      }).then((orderDetails) => {
        commit("CLEAR_CART");
        commit("SET_ORDER_DETAILS", orderDetails);
      });
    },
  },
});
