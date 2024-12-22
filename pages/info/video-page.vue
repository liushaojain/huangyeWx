<template>
    <view>
        <video v-if="url" :src="url" autoplay controls></video>
    </view>
</template>

<script>

export default {
    data() {
        return {
            url: ""
        };
    },
    onLoad(options) {
        if (options.query) {
            options = JSON.parse(decodeURIComponent(options.query))
        }
        let { url } = options;
        if (url) {
            this.url = decodeURIComponent(url);
        }
    },
    methods: {
        loadData(e) {

        },
    },
};
</script>

<style>
video {
    width: 100vw;
    height: 100vh;
}
</style>