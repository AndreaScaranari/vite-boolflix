<script>
import { pics } from "../data/index"
export default {
    name: "booflix",
    props: {
        id: Number,
        title: String,
        originalTitle: String,
        voteAverage: Number,
        lang: String,
        posterPath: String || null
    },
    computed: {
        hasFlag() {
            const flags = ["it", "en"];
            return flags.includes(this.lang)
        },
        flagSearch() {
            const url = new URL(`../assets/img/${this.lang}.png`, import.meta.url);
            return url.href
        },
        posterSearch() {
            return this.posterPath ? pics.baseUri + this.posterPath : pics.placeholder;
        },
        vote() {
            return Math.ceil(this.voteAverage / 2);
        }
    }
}
</script>

<template>
    <li>{{ title }}</li>
    <li>{{ originalTitle }}</li>
    <li><img :src="posterSearch" :alt="title"></li>
    <li>
        <img v-if="hasFlag" :src="flagSearch" :alt="lang">
        <span v-else>{{ lang }}</span>
    </li>
    <li> <i v-for="n in 5" :key="n" class="fa-star" :class="n <= vote ? 'fas' : 'far'"></i></li>
</template>