<template lang="pug">
    .uk-draggable(@mousedown.stop.prevent="dragstart" :style="style")
        slot
</template>
<script>
    export default {
        data() {
            return {
                top: 0,
                left: 0,
                width: 0,
                height: 0,
                zIndex: 1,
                dragging: false,
                mouseX: 0,
                mouseY: 0
            }
        },
        mounted() {
            let style = window.getComputedStyle(this.$el, null);
            this.width = parseFloat(style.getPropertyValue("width"));
            this.height = parseFloat(style.getPropertyValue("height"));

            document.documentElement.addEventListener("mousemove", this.drag, true);
            document.documentElement.addEventListener("mouseup", this.dragend, true);
        },
        beforeDestroy() {
            document.documentElement.removeEventListener("mousemove", this.drag, true);
            document.documentElement.removeEventListener("mouseup", this.dragend, true);
        },
        methods: {
            dragstart(evt) {
                this.dragging = true;
                this.mouseX = evt.clientX;
                this.mouseY = evt.clientY;
                this.zIndex += 1;

                this.$emit("dragstart");
            },
            drag(evt) {
                if (this.dragging) {
                    let diffX = evt.clientX - this.mouseX;
                    let diffY = evt.clientY - this.mouseY;

                    this.top += diffY;
                    this.left += diffX;

                    this.mouseX = evt.clientX;
                    this.mouseY = evt.clientY;

                    this.$emit("drag");
                }
            },
            dragend(evt) {
                if (this.dragging) {
                    this.dragging = false;
                    this.zIndex -= 1;

                    this.$emit("dragend");
                }
            }
        },
        computed: {
            style() {
                if (this.width && this.height) {
                    return {
                        top: this.top + "px",
                        left: this.left + "px",
                        width: this.width + "px",
                        height: this.height + "px",
                        zIndex: this.zIndex
                    }
                }
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
