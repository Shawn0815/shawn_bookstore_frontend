<template>
  <ul>
    <!-- 統一從 books 取得要顯示的內容（設定不同 books 物件會改變） -->
    <template v-for="book in $store.state.books">
      <li :key="book.bookId">
        <book-card :book="book"></book-card>
      </li>
    </template>
  </ul>
</template>

<script>
import BookCard from "./BookCard";

export default {
  name: "BookGrid",
  components: {
    BookCard,
  },
};
</script>

<style scoped>
ul {
  display: flex;
  flex-wrap: wrap;
  padding: 1em;
  gap: 1em;
  padding-left: 3em;  /* 讓整排往右 */
  margin-top: 0.1em;
}
</style>
