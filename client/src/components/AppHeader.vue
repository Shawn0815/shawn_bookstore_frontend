<template>
  <header class="container">
    <!-- 新增一個包裹 category + sort 的 div，方便水平排列 -->
    <div class="left-dropdowns">
      <section class="category-dropdown-part">
        <category-dropdown-menu></category-dropdown-menu>
      </section>
      <section class="sort-dropdown-part">
        <sort-dropdown></sort-dropdown>
      </section>
    </div>

    <section class="text-logo">
      <router-link to="/books">
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
        <router-link to="/login">
          <strong class="top-text;"> Login </strong>
        </router-link>
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
import CategoryDropdownMenu from "@/components/CategoryDropdown";
import SortDropdown from "@/components/SortDropdown";

export default {
  name: "AppHeader",
  components: { 
    CategoryDropdownMenu,
    SortDropdown // 新增 SortDropdown
  },
  data() {
    return {
      searchQuery: "", // 新增一個資料屬性來綁定搜尋輸入
    };
  },
  methods: {
    // 處理搜尋邏輯，進行路由跳轉
    getQuery(newQuery) {
      const filteredQuery = { ...this.$route.query };
      
      if (newQuery.search && newQuery.search.trim() !== "") {
        filteredQuery.search = newQuery.search.trim();
      } else {
        delete filteredQuery.search; // 移除空的 search
      }

      // 只有當 page 不是 1 時，才重置
      if (filteredQuery.page && filteredQuery.page !== 1) {
        filteredQuery.page = 1;
      }

      return filteredQuery;
      
    },
    performSearch() {
      this.$router.push({
        name: "books",
        query: this.getQuery({ search: this.searchQuery })
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

/* 新增 flex 排列 category + sort */
.left-dropdowns {
  display: flex;
  gap: 2em; /* category 與 sort 間距 */
  align-items: center;
}

.category-dropdown-part,
.sort-dropdown-part {
  position: relative;
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
