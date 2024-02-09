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
    emits: [
        "form-submit",
        "term-change"
    ]
};
</script>

<template>
    <form @submit.prevent="$emit('form-submit', term)">
        <input type="text" v-model.trim="term" :placeholder="placeHolder" @keyup="$emit('term-change', term)">
        <button>{{ buttonLabel }}</button>
    </form>
</template>
