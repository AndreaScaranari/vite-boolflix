<script>
import axios from "axios";
import { api, mapProductions } from "./data/index.js";
import { store } from "./data/store.js";
import SearchForm from "./components/SearchForm.vue";
import ProductionCard from "./components/ProductionCard.vue"

export default {
    name: "booflix",
    data: () => ({
        store,
    }),
    components: { SearchForm, ProductionCard },
    methods: {
        setTitleFilter(term) {
            store.titleFilter = term;
        },
        searchProductions() {
            if (!store.titleFilter) {
                store.movies = [];
                store.series = [];
                return;
            }

            this.fetchApi("search/movie", "movies");
            this.fetchApi("search/tv", "series");
        },
        fetchApi(endpoint, collection) {
            const { baseUri, language, apiKey } = api;

            const params = {
                query: store.titleFilter,
                api_key: apiKey,
                language
            }
            axios.get(`${baseUri}/${endpoint}`, { params })
                .then((res) => {
                    store[collection] = res.data.results.map(mapProductions);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }
};
</script>

<template>
    <header>
        <SearchForm @form-submit="searchProductions" @term-change="setTitleFilter" buttonLabel="Cerca"
            placeHolder="Cosa vorresti vedere?" />
    </header>

    <main>
        <section>
            <h2>Movies</h2>
            <ProductionCard v-for="movie in store.movies" :key="movie.id" v-bind="movie" />
        </section>
        <section>
            <h2>Series</h2>
            <ProductionCard v-for="series in store.series" :key="series.id" v-bind="series" />
        </section>
    </main>
</template>

<style scoped></style>
