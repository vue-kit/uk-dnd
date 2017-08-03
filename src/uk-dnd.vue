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
            width: {
                type: [String, Number],
                default: "auto",
                validator(val) {
                    return isNaN(val) ? true : val > 0;
                }
            },
            height: {
                type: [String, Number],
                default: "auto",
                validator(val) {
                    return isNaN(val) ? true : val > 0;
                }
            },
            draggable: {
                type: [String, Boolean],
                default: true
            }
        },
        data() {
            return {
                top: this.y,
                left: this.x,
                w: this.width,
                h: this.height,
                enableDrag: this.draggable,
                zIndex: 1,
                dragging: false,
                mouseX: 0,
                mouseY: 0
            }
        },
        computed: {
            normalizedDraggable() {
                return typeof this.enableDrag === "string" ?
                                this.enableDrag === "true" :
                                this.enableDrag;
            },
            style() {
                return {
                    top: isNaN(this.top) ? this.top : this.top + "px",
                    left: isNaN(this.left) ? this.left : this.left + "px",
                    width: isNaN(this.w) ? this.w : this.w + "px",
                    height: isNaN(this.h) ? this.h : this.h + "px",
                    zIndex: this.zIndex,
                    cursor: this.normalizedDraggable ? (this.dragging ? "grabbing" : "grab") : "default"
                }
            }
        },
        mounted() {
            let style = window.getComputedStyle(this.$el, null);
            if (this.w === "auto") {
                this.w = parseFloat(style.getPropertyValue("width"));
            }
            if (this.h === "auto") {
                this.h = parseFloat(style.getPropertyValue("height"));
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
                if (this.normalizedDraggable) {
                    this.dragging = true;
                    this.mouseX = evt.clientX;
                    this.mouseY = evt.clientY;
                    this.zIndex += 1;

                    this.$emit("dragstart", this);
                }
            },
            drag(evt) {
                if (this.normalizedDraggable && this.dragging) {
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

                    this.$emit("drag", this);
                }
            },
            dragend(evt) {
                if (this.normalizedDraggable && this.dragging) {
                    this.dragging = false;
                    this.zIndex -= 1;

                    this.$emit("dragend", this);
                }
            }
        }
    }
</script>
<style lang="less" scoped>
    .uk-draggable {
        position: absolute;
        box-sizing: border-box;
    }
</style>
