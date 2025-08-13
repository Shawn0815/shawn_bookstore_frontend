<template>
  <header class="container">
    <section class="header-dropdown-part">
      <header-dropdown-menu></header-dropdown-menu>
    </section>
    <section class="text-logo">
      <router-link to="/">
        <img
          src="@/assets/images/site/Bookshop_logo.png"
          alt="Book Galaxy Logo"
          class="img-style"
        />
      </router-link>
    </section>
    <section class="login-cart-and-search-bar">
      <button class="button cart">
        <router-link to="/cart">
          <span class="fa-stack">
            <i class="fas fa-shopping-cart fa-stack-1x cart-icon-style">
              <strong class="cart-number-style">
                {{ $store.state.cart.numberOfItems }}
              </strong>
            </i>
          </span>
        </router-link>
      </button>
      <button class="button login login-style">
        <strong class="top-text;"> WH </strong>
      </button>
      <form class="search-form" @submit.prevent="performSearch">
        <input
          type="text"
          class="search-bar"
          placeholder="Search any book"
          v-model="searchQuery"
        />
        <button type="submit" class="search-button">
          <i class="fa fa-search submit-style"></i>
        </button>
      </form>
    </section>
  </header>
</template>

<script>
import HeaderDropdownMenu from "@/components/HeaderDropdown";
export default {
  name: "AppHeader",
  components: { HeaderDropdownMenu },
  data() {
    return {
      searchQuery: "", // 新增一個資料屬性來綁定搜尋輸入
    };
  },
  methods: {
    // 處理搜尋邏輯，進行路由跳轉
    performSearch() {
      const query = {};

      // 只要搜尋欄沒東西，回 /books
      if (!this.searchQuery && this.$route.name == 'home') {
          return;
      }

      // 如果目前路由有 category，保留它
      if (this.$route.query.category) {
        query.category = this.$route.query.category;
      }

      // 如果搜尋框有文字，帶 search
      if (this.searchQuery && this.searchQuery.trim() !== "") {
        query.search = this.searchQuery.trim();
      }

      // 跳轉到 /books，帶上 query
      this.$router.push({
        name: "books",
        query: query
      });
    }
  },
};
</script>

<style scoped>
header {
  background: var(--primary-color);
  display: grid;
  grid-template-columns: 40% 20% 40%;
  width: 100%;
  height: 167px;
  padding: 0.5em;
  gap: 0.45em;
}

.text-logo {
  font-family: var(--title-font-family);
}

.login-cart-and-search-bar {
  display: grid;
  grid-template-columns: 33% 33% 33%;
  grid-template-rows: 33% 33% 33%;
}

.search-form {
  display: flex;
  align-items: center; /* 垂直置中 */
  width: 200%;
  margin-top: -10px; /* 調整整個搜尋欄的位置 */
}

.search-bar {
  flex: 1;
  padding: 0.15em;
  min-width: 120px;
  border-radius: 8px;
  border-style: none;
  text-align: center;
}

.header-dropdown-part {
  text-align: center;
  display: grid;
  grid-template-columns: 33% 33% 33%;
  grid-template-rows: 33% 33% 33%;
}

.submit-style {
  color: burlywood;
}

.login-style {
  color: #110780;
  font-size: medium;
}

.img-style {
  min-width: 150px;
  min-height: 110px;
}

.cart-icon-style {
  font-size: medium;
  text-align: center;
}

.cart-number-style {
  color: #110780;
  font-size: medium;
  text-align: center;
}

@media (max-width: 600px) {
}
</style>
