<template>
    <web-view :src="url" @load="loadData"></web-view>
</template>

<script>

export default {
    data() {
        return {
            url: "",
        };
    },
    onLoad(options) {
        if (options.query) {
            options = JSON.parse(decodeURIComponent(options.query))
        }
        let { url } = options;
        this.url = decodeURIComponent(url);
        console.log({url});
    },
    methods: {
        loadData(e) {
            console.log("loadData");
            console.log(e.detail);
            console.log(e);
        },
    },
};
</script>

<style></style>