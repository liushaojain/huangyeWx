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
    },
    methods: {
        loadData(e) {
            console.log(e.detail.src);
            if (url !== "") {
                uni.reLaunch({
                    url: url,
                });
            }
        },
    },
};
</script>

<style></style>