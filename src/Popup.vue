<template>
    <div class="kiccer-crx-vue-app-root-popup">
        This is a Vue component.
    </div>
</template>

<script>
export default {
    name: 'kiccer-crx-vue-app-root-popup',

    mounted () {
    // 使用 background.js 中的方法，使用 emit 主动触发 Connect 中注册的事件
        this.$background.conn.emit('test', {
            isError: false
        })
    }
}
</script>

<style lang="scss" scoped>
// .kiccer-crx-vue-app-root-popup {

// }
</style>
