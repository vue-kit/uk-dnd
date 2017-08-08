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
                default: 0,
                validator(val) {
                    return !isNaN(val);
                }
            },
            y: {
                type: [String, Number],
                default: 0,
                validator(val) {
                    return !isNaN(val);
                }
            },
            width: {
                type: [String, Number],
                default: "auto",
                validator(val) {
                    return val === "auto" || (!isNaN(val) && parseFloat(val) > 0) ||
                        (/^\d+(\.\d+)?vw|%|cm|mm|in|px$/.test(val) && parseFloat(val) > 0);
                }
            },
            height: {
                type: [String, Number],
                default: "auto",
                validator(val) {
                    return val === "auto" || (!isNaN(val) && parseFloat(val) > 0) ||
                        (/^\d+(\.\d+)?vh|%|cm|mm|in|px$/.test(val) && parseFloat(val) > 0);
                }
            },
            draggable: {
                type: [String, Boolean],
                default: true,
                validator(val) {
                    return typeof val === "boolean" || val === "true" || val === "false";
                }
            },
            clone: {
                type: [String, Boolean],
                default: true,
                validator(val) {
                    return typeof val === "boolean" || val === "true" || val === "false";
                }
            },
            target: {
                type: String,
                default: null,
                validator(val) {
                    return /^(#|\.)/.test(val) && val.length > 1;
                }
            }
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
                zIndex: 1,
                dragging: false,
                mouseX: 0,
                mouseY: 0,
                $clonedNode: null
            }
        },
        computed: {
            normalizedDraggable() {
                return normalizedBoolean(this.enableDrag);
            },
            normalizedClone() {
                return normalizedBoolean(this.enableClone);
            },
            normalizedDndZone() {
                if (this.dndZone) {
                    if (this.dndZone.substring(0, 1) === "#") {
                        return document.getElementById(this.dndZone.substring(1));
                    } else if (this.dndZone.substring(0, 1) === ".") {
                        let elms = document.getElementsByClassName(this.dndZone.substring(1));
                        if (elms.length) return elms[0];
                    }
                }
                return null;
            },
            style() {
                return {
                    top: isNaN(this.top) ? this.top : this.top + "px",
                    left: isNaN(this.left) ? this.left : this.left + "px",
                    width: isNaN(this.w) ? this.w : this.w + "px",
                    height: isNaN(this.h) ? this.h : this.h + "px",
                    zIndex: this.zIndex,
                    cursor: this.normalizedDraggable ? "move" : "default"
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
                    this.dragging = true;
                    this.mouseX = evt.clientX;
                    this.mouseY = evt.clientY;
                    if (this.normalizedClone) {
                        let $parent = this.$el.parentNode;
                        this.$clonedNode = this.$el.cloneNode(true);
                        this.$clonedNode.style.opacity = .6;
                        this.$clonedNode.style.zIndex = 1000;
                        this.$clonedNode.style.cursor = "grabbing";
                        $parent.appendChild(this.$clonedNode);
                    } else {
                        this.zIndex += 1;
                    }
                    this.$emit("dragstart", this);
                }
            },
            drag(evt) {
                if (this.normalizedDraggable && this.dragging) {
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
                if (this.normalizedDraggable && this.dragging) {
                    this.dragging = false;
                    let style = window.getComputedStyle(this.$el, null);
                    let _x, _y;
                    let _w = parseFloat(style.getPropertyValue("width"));
                    let _h = parseFloat(style.getPropertyValue("height"));

                    if (this.normalizedClone) {
                        _x = parseInt(this.$clonedNode.style.left);
                        _y = parseInt(this.$clonedNode.style.top);
                        this.$clonedNode.parentNode.removeChild(this.$clonedNode);
                    } else {
                        this.zIndex -= 1;
                        _x = parseInt(this.left);
                        _y = parseInt(this.top);
                    }
                    if (this.normalizedDndZone) {
                        let originRect = this.$el.parentNode.getBoundingClientRect();
                        let targetRect = this.normalizedDndZone.getBoundingClientRect();
                        let diffX = originRect.x - targetRect.x;
                        let diffY = originRect.y - targetRect.y;
                        _x = +_x + +diffX;
                        _y = +_y + +diffY;
                    }
                    this.$emit("dragend", _x, _y, _w, _h, this.$slots.default);
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
