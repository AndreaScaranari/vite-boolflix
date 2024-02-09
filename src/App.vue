<script>
import axios from "axios";
import { api } from "./data/index.js";
import { store } from "./data/store.js";
import SearchForm from "./components/SearchForm.vue";

export default {
    name: "booflix",
    data: () => ({
        store,
    }),
    components: { SearchForm },
    methods: {
        setTitleFilter(term) {
            store.titleFilter = term;
        },
        searchMovies() {
            if (!store.titleFilter) {
                store.movies = [];
                return;
            }

            const { baseUri, language, apiKey } = api;

            const params = {
                query: store.titleFilter,
                api_key: apiKey,
                language
            }

            axios.get(`${baseUri}/search/movie`, { params })
                .then((res) => {
                    store.movies = res.data.results;
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    },
};
</script>

<template>
    <SearchForm @form-submit="searchMovies" @term-change="setTitleFilter" buttonLabel="Cerca"
        placeHolder="Cosa vorresti vedere?" />

    <main>
        <section>
            <h2>movies</h2>
            <ul v-for="movie in store.movies" :key="movie.id">
                <li>{{ movie.title }}</li>
                <li>{{ movie.original_title }}</li>
                <li>{{ movie.original_language }}</li>
                <li>{{ movie.vote_average }}</li>
            </ul>
        </section>
    </main>
</template>

<style scoped></style>
