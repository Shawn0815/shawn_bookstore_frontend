<template>
  <div class="pagination-container">
    <!-- 上一頁 -->
    <router-link
      :to="getPageLink(currentPage - 1)"
      class="page-link"
      :class="{ disabled: currentPage === 1 }"
    >
      上一頁
    </router-link>

    <!-- 所有頁碼 -->
    <router-link
      v-for="page in totalPages"
      :key="page"
      :to="getPageLink(page)"
      class="page-link"
      :class="{ active: page === currentPage }"
    >
      {{ page }}
    </router-link>

    <!-- 下一頁 -->
    <router-link
      :to="getPageLink(currentPage + 1)"
      class="page-link"
      :class="{ disabled: currentPage === totalPages }"
    >
      下一頁
    </router-link>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "PageBar",
  computed: {
    ...mapState(["currentPage", "totalPages"]),
  },
  methods: {
    getPageLink(pageNumber) {
      // 確保不會出界
      if (pageNumber < 1) pageNumber = 1;
      if (pageNumber > this.totalPages) pageNumber = this.totalPages;

      return {
        path: this.$route.path,
        query: {
          ...this.$route.query,
          page: pageNumber,
        },
      };
    },
  },
};
</script>

<style scoped>
.pagination-container {
  display: flex;
  justify-content: center; /* 置中對齊 */
  flex-wrap: wrap;
  gap: 6px;

  /* 新增背景樣式 */
  background-color: var(--secondary-background-color);
  padding: 6px 8px;
  border-radius: 8px;
}

.pagination-container a:hover {
  background-color: #8b4513;
  color: #fff;
}

.page-link {
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-decoration: none;
  color: #333;
  min-width: 36px;
  text-align: center;
  background-color: white; /* 每個按鈕也有自己的底色 */
  transition: background-color 0.2s, color 0.2s;
}

.page-link:hover {
  background-color: #e6e6e6;
}

.page-link.active {
  background-color: #8b4513; /* 深咖啡色呼應 header */
  color: white;
  font-weight: bold;
}

.page-link.disabled {
  pointer-events: none; /* 禁止點擊 */
  opacity: 0.5;
}
</style>
