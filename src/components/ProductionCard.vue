<script>
export default {
    name: "booflix",
    props: {
        production: Object,
    },
    computed: {
        hasFlag() {
            const flags = ["it", "en"];
            return flags.includes(this.production.original_language)
        },
        flagSearch() {
            const url = new URL(`../assets/img/${this.production.original_language}.png`, import.meta.url);
            return url.href
        }
    }
}
</script>

<template>
    <li>{{ production.title || production.name }}</li>
    <li>{{ production.original_title || production.original_name }}</li>
    <li>
        <img v-if="hasFlag" :src="flagSearch" :alt="production.original_language">
        <span v-else>{{ production.original_language }}</span>
    </li>
    <li>{{ production.vote_average }}</li>
</template>