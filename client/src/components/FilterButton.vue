<template>
  <div class="filter-button">
    <!-- 下拉選單 -->
    <div v-if="type === 'dropdown'" class="dropdown">
      <button class="filter-btn dropdown-btn">
        {{ label }} <i class="fas fa-caret-down"></i>
      </button>
      <ul>
        <li v-for="option in options" :key="option.label">
          <router-link
            :to="{ name: 'books', query: getQuery(option.query) }"
            class="dropdown-link"
          >
            {{ option.label }}
          </router-link>
        </li>
      </ul>
    </div>

    <!-- 普通按鈕 -->
    <router-link
      v-else
      :to="to"
      class="filter-btn"
    >
      {{ label }}
    </router-link>
  </div>
</template>

<script>
export default {
  name: "FilterButton",
  props: {
    type: { type: String, default: "link" }, // dropdown / link
    label: { type: String, required: true },
    options: { type: Array, default: () => [] },
    to: { type: [String, Object], default: () => ({}) }
  },
  methods: {
    getQuery(newQuery) {
      const filteredQuery = { ...this.$route.query };

      // 合併 query，保留原本的 category/sort
      Object.keys(newQuery).forEach(key => {
        if (newQuery[key] === null) {
          delete filteredQuery[key];
        } else {
          filteredQuery[key] = newQuery[key];
        }
      });

      // page 歸 1
      filteredQuery.page = 1;

      return filteredQuery;
    }
  }
};
</script>

<style scoped>
/* 統一 filter-btn 樣式（分類/排序/其他） */
.filter-btn {
  background-color: #fff;
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
  width: 120px;
  height: 36px;
  border-radius: 6px;
  cursor: pointer;
  text-align: center;
  line-height: 36px;
  display: inline-block;
  text-decoration: none;
  margin-right: 8px;
}

.filter-btn:hover {
  background-color: var(--primary-color);
  color: #fff;
}

/* 下拉 */
.dropdown {
  position: relative;
  display: inline-block;
}
.dropdown ul {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 130px;
  background: var(--secondary-background-color);
  border-radius: 6px;
  box-shadow: 0 8px 16px rgba(0,0,0,.2);
  z-index: 1000;
  margin: 0;
  padding: 0;
}
.dropdown:hover ul {
  display: block;
}
.dropdown-link {
  display: block;
  padding: 0.5em;
  border-radius: 6px;
  text-align: center;
  color: var(--primary-color);
  background: var(--secondary-background-color);
  text-decoration: none;
}
.dropdown-link:hover {
  background: var(--primary-color);
  color: #fff;
}
</style>
