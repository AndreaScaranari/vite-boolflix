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
        <div class="container">
            <SearchForm @form-submit="searchProductions" @term-change="setTitleFilter" buttonLabel="Cerca"
                placeHolder="Cosa vorresti vedere?" />
        </div>
    </header>

    <main>
        <div class="container">
            <section>
                <h2 v-show="store.movies.length > 0">MOVIES</h2>
                <div class="row">
                    <ProductionCard v-for="movie in store.movies" :key="movie.id" v-bind="movie" />
                </div>
            </section>

            <section>
                <h2 v-show="store.series.length > 0">SERIES</h2>
                <div class="row">
                    <ProductionCard v-for="series in store.series" :key="series.id" v-bind="series" />
                </div>
            </section>
        </div>
    </main>
</template>

<style lang="scss">
@use "./scss/style.scss";
</style>
