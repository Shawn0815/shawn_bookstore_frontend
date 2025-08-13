<!-- 把原來的 Category.vue 改名為 BookPage.vue -->
<!-- 因為它同時包含顯示所有書籍以及特定類別書籍（未來還可以括充） -->

<template>
  <div class="category-page">
    <category-nav></category-nav>
    <category-book-list></category-book-list>
  </div>
</template>

<script>
import CategoryNav from "@/components/CategoryNav";
import CategoryBookList from "@/components/CategoryBookList";

export default {
  name: "bookPage",
  components: {
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

    // 從路由參數中取得類別名稱
    const categoryName = this.$route.query.category;

    if (categoryName) { // 如果有參數
      this.$store.dispatch("fetchBooksByFilter", { category: categoryName })
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
