<template>
    <div class="kiccer-crx-vue-app-root-options">
        This is a Vue component.
    </div>
</template>

<script>
export default {
    name: 'kiccer-crx-vue-app-root-options',

    mounted () {
        this.$port.send('test', {
            isError: false
        }).then(res => {
            console.log('test 返回结果：', res)
        })
    }
}
</script>

<style lang="scss" scoped>
// .kiccer-crx-vue-app-root-options {

// }
</style>
