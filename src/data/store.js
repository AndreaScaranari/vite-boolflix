import { reactive } from "vue";

const store = reactive({ movies: [], series: [], titleFilter: "" });

export { store };