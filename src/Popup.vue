<template>
    <div class="kiccer-crx-vue-app-root-popup">
        This is a Vue component.
    </div>
</template>

<script>
export default {
    name: 'kiccer-crx-vue-app-root-popup',

    mounted () {
        this.$port.send('test', {
            isError: false
        })
    }
}
</script>

<style lang="scss" scoped>
// .kiccer-crx-vue-app-root-popup {

// }
</style>
