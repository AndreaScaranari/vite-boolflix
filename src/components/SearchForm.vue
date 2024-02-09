<script>
export default {
    name: "booflix",
    data: () => ({
        term: "",
    }),
    props: {
        buttonLabel: String,
        placeHolder: String
    },
    methods: {
        cleanBar() {
            this.term = "";
        }
    },
    emits: [
        "form-submit",
        "term-change"
    ]
};
</script>

<template>
    <h1>BOOFLIX</h1>

    <form @submit.prevent="$emit('form-submit', term), emptySearch; cleanBar()">
        <input type="text" v-model.trim="term" :placeholder="placeHolder" @keyup="$emit('term-change', term)">
        <button>{{ buttonLabel }}</button>
    </form>
</template>

<style lang="scss" scoped>
form {

    input {
        padding: 0.5rem 0 0.5rem 0.3rem;
        border-radius: 10px;
        margin-right: 0.5rem;
    }

    button {
        border-radius: 10px;
        padding: 0.5rem;
    }
}
</style>
