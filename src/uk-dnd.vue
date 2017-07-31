<template lang="pug">
    .uk-draggable(draggable="true" @dragstart="drag")
        slot
</template>
<script>
    export default {
        methods: {
            drag(evt) {
                evt.dataTransfer.setData("text", evt.target.id);
            }
        }
    }
</script>
<style lang="less" scoped>
    .uk-draggable {
        display: inline-block;
        box-sizing: border-box;
        &:hover {
            cursor: move;
        }
    }
</style>
