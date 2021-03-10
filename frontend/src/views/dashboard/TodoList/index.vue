<template>
  <section class="todoapp">
    <!-- header -->
    <header class="header">
      <input
        class="new-todo"
        autocomplete="off"
        placeholder="待办事项"
        @keyup.enter="addTodo"
      />
    </header>
    <!-- main section -->
    <section v-show="todos.length" class="main">
      <input
        id="toggle-all"
        :checked="allChecked"
        class="toggle-all"
        type="checkbox"
        @change="toggleAll({ done: !allChecked })"
      />
      <label for="toggle-all" />
      <ul class="todo-list">
        <todo
          v-for="(todo, index) in filteredTodos"
          :key="index"
          :todo="todo"
          @toggleTodo="toggleTodo"
          @editTodo="editTodo"
          @deleteTodo="deleteTodo"
        />
      </ul>
    </section>
    <!-- footer -->
    <footer v-show="todos.length" class="footer">
      <span class="todo-count">
        <strong>共{{ remaining }}项未完成</strong>
      </span>
      <ul class="filters">
        <li v-for="(val, key) in filters" :key="key">
          <a
            :class="{ selected: visibility === key }"
            @click.prevent="visibility = key"
            >{{ key | capitalize }}</a
          >
        </li>
      </ul>
      <button
        class="clear-completed"
        v-show="todos.length > remaining"
        @click="clearCompleted"
      >
        清空已完成
      </button>
    </footer>
  </section>
</template>

<script>
import Todo from "./Todo.vue";

const STORAGE_KEY = "todos";
const filters = {
  all: (todos) => todos,
  未完成: (todos) => todos.filter((todo) => !todo.done),
  已完成: (todos) => todos.filter((todo) => todo.done),
};
const defalutList = [
  { text: "标注选项卡美化", done: false },
  { text: "标注文本列表自定义标签颜色", done: false },
  { text: "登录注册", done: false },
];
export default {
  components: { Todo },
  filters: {
    capitalize: (s) => s.charAt(0).toUpperCase() + s.slice(1),
  },
  data() {
    return {
      visibility: "all",
      filters,
      todos: defalutList,
    };
  },
  computed: {
    allChecked() {
      return this.todos.every((todo) => todo.done);
    },
    filteredTodos() {
      return filters[this.visibility](this.todos);
    },
    remaining() {
      return this.todos.filter((todo) => !todo.done).length;
    },
  },
  methods: {
    setLocalStorage() {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos));
    },
    addTodo(e) {
      const text = e.target.value;
      if (text.trim()) {
        this.todos.push({
          text,
          done: false,
        });
        this.setLocalStorage();
      }
      e.target.value = "";
    },
    toggleTodo(val) {
      val.done = !val.done;
      this.setLocalStorage();
    },
    deleteTodo(todo) {
      this.todos.splice(this.todos.indexOf(todo), 1);
      this.setLocalStorage();
    },
    editTodo({ todo, value }) {
      todo.text = value;
      this.setLocalStorage();
    },
    clearCompleted() {
      this.todos = this.todos.filter((todo) => !todo.done);
      this.setLocalStorage();
    },
    toggleAll({ done }) {
      this.todos.forEach((todo) => {
        todo.done = done;
        this.setLocalStorage();
      });
    },
  },
};
</script>

<style lang="scss">
  @import "./index.scss";
</style>
