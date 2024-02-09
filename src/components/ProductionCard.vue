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
    <div class="card">

        <img class="poster" :src="posterSearch" :alt="title">

        <ul class="hidden">
            <li><b>Titolo:</b> {{ title }}</li>
            <li><b>Titolo Originale:</b> {{ originalTitle }}</li>
            <li>
                <img class="flag" v-if="hasFlag" :src="flagSearch" :alt="lang">
                <b v-else>{{ lang }}</b>
            </li>
            <li><b>Voto:</b> <i v-for="n in 5" :key="n" class="fa-star" :class="n <= vote ? 'fas' : 'far'"></i></li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
.card {
    padding: 1rem;
    width: 20%;
    color: white;
    position: relative;

    &:hover .poster {
        filter: brightness(10%);
    }

    &:hover .hidden {
        display: block;
    }


    .poster {
        object-fit: cover;
        width: 100%;
        height: 100%;
    }

    .flag {
        width: 50%;
        margin: 0 auto;
    }

    .hidden {
        display: none;
        position: absolute;
        width: 100%;
        padding: 2rem;
        top: 50%;
        left: 50%;
        translate: -50% -50%;

        &>* {
            padding: 0.5rem 0rem;
        }
    }

    i {
        color: goldenrod;
    }
}
</style>