<template>
  <div class="header-dropdown">
    <button class="button categories-button" style="float: left">
      <i class="fas fa-caret-down" style="float: left"></i>
      Categories
    </button>
    <ul>
      <!-- 增加所有書籍下拉式選單 -->
      <li>
        <router-link
          tabindex="1"
          to="/books"
          class="header-dropdown unselected-link"
        >
          所有書籍
        </router-link>
      </li>
      <template v-for="category in $store.state.categories">
        <!-- key 改為 category（本身就是字串） -->
        <li :key="category">
          <!-- 跳轉到 /books?category=category變數 -->
          <router-link
            tabindex="1"
            :to="{ name: 'books', query: { category: category } }"
            class="header-dropdown unselected-link"
          >
            {{ category }}
          </router-link>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
export default {
  name: "HeaderDropdownMenu",
};
</script>

<style scoped>
.categories-button {
  background-color: #B55A30; /* 調整 category 按鈕顏色 */
  color: var(--card-background-color);
  float: left;
  width: 150px;
  height: 35px;
  box-shadow: 0 15px 25px 0 rgba(0, 0, 0, 0.19);
  border-style: none;
  border-radius: 8px;
}

.categories-button:hover {
  background-color: var(--card-background-color);
  color: var(--primary-color);
}

.header-dropdown {
  grid-column: 1/2;
  grid-row: -3/-2;
  text-align: center;
}

.header-dropdown ul {
  /*drop down list*/
  display: none;
  background-color: var(--secondary-background-color);
  color: var(--primary-color);
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  z-index: 1;
  position: absolute;
  border-radius: 8px;
}

.header-dropdown.unselected-link {
  display: block;
  padding: 0.25em 0.25em;
  border-radius: 8px;
  color: var(--primary-color);
  background-color: var(--secondary-background-color);
  text-decoration: none;
  margin-top: 1px;
  margin-bottom: 5px; /* 調整 category 下拉式選單的上下間距 */
}

.header-dropdown.unselected-link:hover,
.header-dropdown.unselected-link:active {
  display: block;
  height: 35px;
  font-size: large;
  text-align: center;
  transition: all 250ms;
  color: var(--secondary-background-color);
  background-color: var(--primary-color);
  text-decoration: none;
}

.header-dropdown:hover ul {
  /*different when hover*/
  display: inline-block;
  position: absolute;
  min-width: 7em;
  z-index: 1;
  cursor: pointer;
}
</style>
