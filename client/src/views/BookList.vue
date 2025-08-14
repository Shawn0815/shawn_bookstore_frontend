<!-- 把原來的 Category.vue 改名為 BookList.vue -->
<!-- 因為它同時包含顯示所有書籍以及特定類別書籍（未來還可以括充） -->

<template>
  <div>
    <div class="category-page">
      <category-nav></category-nav>
      <category-book-list></category-book-list>
    </div>
    
    <page-bar
      :current-page="$store.state.currentPage"
      :total-pages="$store.state.totalPages"
    />
  </div>
</template>

<script>

import PageBar from "@/components/PageBar";
import CategoryNav from "@/components/CategoryNav";
import CategoryBookList from "@/components/CategoryBookList";

export default {
  name: "BookList",
  components: {
    PageBar,
    CategoryNav,
    CategoryBookList,
  },

  /*fetch books from database*/
  data: function () {
    return {
      cateName: this.cateName,
    };
  },
  created: function () {
    const self = this;

    // 從 query 中取出所有可能的篩選參數
    const filters = Object.fromEntries(
      Object.entries({
        category: this.$route.query.category,
        search: this.$route.query.search,
        orderBy: this.$route.query.orderBy,
        sort: this.$route.query.sort,
        page: this.$route.query.page,     // 新增
        limit: this.$route.query.limit    // 新增
      }).filter(([, v]) => v !== undefined && v !== "")
    );

    if (filters) { // 如果有篩選條件
      this.$store.dispatch("fetchBooksByFilter", filters)
      .catch(function () {self.$router.push("/404"); //'/404' triggers NotFound
      });
    } else { // 如果沒有參數
      this.$store.dispatch("fetchAllBooks").catch(function () {
        self.$router.push("/404"); //'/404' triggers NotFound
      });
    }
  },
};
</script>

<style scoped>
.category-page {
  background-color: var(--secondary-background-color);
  display: flex;
  flex-direction: row;
  flex-grow: 1;
}

</style>
