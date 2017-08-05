<template lang="pug">
    .uk-draggable(@mousedown.stop.prevent="dragstart" :style="style")
        slot
</template>
<script>
    function normalizedBoolean(boolean) {
        return typeof boolean === "string" ? boolean === "true" : boolean;
    }
    export default {
        name: "uk-dnd",
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
            },
            clone: {
                type: [String, Boolean],
                default: true
            },
            target: String
        },
        data() {
            return {
                top: this.y,
                left: this.x,
                w: this.width,
                h: this.height,
                enableDrag: this.draggable,
                enableClone: this.clone,
                dndZone: this.target,
                opacity: 1,
                zIndex: 1,
                dragging: false,
                mouseX: 0,
                mouseY: 0,
                $clonedNode: null,
                draggingClonedNode: false
            }
        },
        computed: {
            normalizedDraggable() {
                return normalizedBoolean(this.enableDrag);
            },
            normalizedClone() {
                return normalizedBoolean(this.enableClone);
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
            document.documentElement.addEventListener("mouseleave", this.dragend, false);
        },
        beforeDestroy() {
            document.documentElement.removeEventListener("mousemove", this.drag, true);
            document.documentElement.removeEventListener("mouseup", this.dragend, true);
            document.documentElement.removeEventListener("mouseleave", this.dragend, false);
        },
        methods: {
            dragstart(evt) {
                if (this.normalizedDraggable) {
                    this.mouseX = evt.clientX;
                    this.mouseY = evt.clientY;
                    if (this.normalizedClone) {
                        this.draggingClonedNode = true;
                        let $parent = this.$el.parentNode;
                        this.$clonedNode = this.$el.cloneNode(true);
                        this.$clonedNode.style.opacity = .6;
                        this.$clonedNode.style.zIndex = 1000;
                        this.$clonedNode.style.cursor = "grabbing";
                        $parent.appendChild(this.$clonedNode);
                    } else {
                        this.dragging = true;
                        this.zIndex += 1;
                    }
                    this.$emit("dragstart", this);
                }
            },
            drag(evt) {
                if (this.normalizedDraggable && (this.dragging || this.draggingClonedNode)) {
                    let diffX = evt.clientX - this.mouseX;
                    let diffY = evt.clientY - this.mouseY;
                    if (this.normalizedClone) {
                        this.$clonedNode.style.top = (parseInt(this.$clonedNode.style.top) + diffY) + "px";
                        this.$clonedNode.style.left = (parseInt(this.$clonedNode.style.left) + diffX) + "px";
                    } else {
                        if (!isNaN(this.top)) {
                            this.top = +this.top + +diffY;
                        }
                        if (!isNaN(this.left)) {
                            this.left = +this.left + +diffX;
                        }
                    }
                    this.mouseX = evt.clientX;
                    this.mouseY = evt.clientY;

                    this.$emit("drag", this);
                }
            },
            dragend(evt) {
                if (this.normalizedDraggable && (this.dragging || this.draggingClonedNode)) {
                    if (this.normalizedClone) {
                        this.draggingClonedNode = false;
                        this.$clonedNode.parentNode.removeChild(this.$clonedNode);
                    } else {
                        this.dragging = false;
                        this.zIndex -= 1;
                    }
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
