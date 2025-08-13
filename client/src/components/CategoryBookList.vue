<template>
  <ul>
    <!-- 統一從 books 取得要顯示的內容（設定不同 books 物件會改變） -->
    <template v-for="book in $store.state.books">
      <li :key="book.bookId">
        <category-book-list-item :book="book"></category-book-list-item>
      </li>
    </template>
  </ul>
</template>

<script>
import CategoryBookListItem from "./CategoryBookListItem";

export default {
  name: "CategoryBookList",
  components: {
    CategoryBookListItem,
  },
};
</script>

<style scoped>
ul {
  display: flex;
  flex-wrap: wrap;
  padding: 1em;
  gap: 1em;
}
</style>
