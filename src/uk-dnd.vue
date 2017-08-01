<template lang="pug">
    .uk-draggable(
        @mousedown.stop.prevent="dragstart"
        @mousemove.stop.prevent="drag"
        @mouseup.stop.prevent="dragend"
    )
        slot
</template>
<script>
    export default {
        methods: {
            dragstart(evt) {
                this.$emit("dragstart");
            },
            drag(evt) {
                this.$emit("drag");
            },
            dragend(evt) {
                this.$emit("dragend");
            }
        }
    }
</script>
<style lang="less" scoped>
    .uk-draggable {
        position: absolute;
        box-sizing: border-box;
        &:hover {
            cursor: move;
        }
    }
</style>
