<template lang="pug">
    .uk-draggable(@mousedown.stop.prevent="dragstart" :style="style")
        slot
</template>
<script>
    export default {
        props: {
            x: {
                type: [String, Number],
                default: 0
            },
            y: {
                type: [String, Number],
                default: 0
            },
            w: {
                type: [String, Number],
                default: "auto",
                validator(val) {
                    return isNaN(val) ? true : val > 0;
                }
            },
            h: {
                type: [String, Number],
                default: "auto",
                validator(val) {
                    return isNaN(val) ? true : val > 0;
                }
            }
        },
        data() {
            return {
                top: this.y,
                left: this.x,
                width: this.w,
                height: this.h,
                zIndex: 1,
                dragging: false,
                mouseX: 0,
                mouseY: 0
            }
        },
        mounted() {
            let style = window.getComputedStyle(this.$el, null);
            if (this.width === "auto") {
                this.width = parseFloat(style.getPropertyValue("width"));
            }
            if (this.height === "auto") {
                this.height = parseFloat(style.getPropertyValue("height"));
            }
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

                    if (!isNaN(this.top)) {
                        this.top = +this.top + +diffY;
                    }
                    if (!isNaN(this.left)) {
                        this.left = +this.left + +diffX;
                    }
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
                return {
                    top: isNaN(this.top) ? this.top : this.top + "px",
                    left: isNaN(this.left) ? this.left : this.left + "px",
                    width: isNaN(this.width) ? this.width : this.width + "px",
                    height: isNaN(this.height) ? this.height : this.height + "px",
                    zIndex: this.zIndex
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
