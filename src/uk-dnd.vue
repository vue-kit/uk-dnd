<template lang="pug">
    .uk-draggable(@mousedown.stop.prevent="dragstart" :style="style")
        slot
</template>
<script>
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
                left: parseInt(this.x),
                top: parseInt(this.y),
                w: this.width,
                h: this.height,
                zIndex: 1,
                dragging: false,
                $clonedNode: null
            }
        },
        computed: {
            dndZone() {
                if (this.target && this.target.length > 1) {
                    if (/^#/.test(this.target)) {
                        let ele = document.getElementById(this.target.substring(1));
                        if (ele.style.overflow != "auto" && ele.style.overflow != "scroll") {
                            ele.style.overflow = "auto";
                        }
                        return ele;
                    } else if (/^\./.test(this.target)) {
                        let elms = document.getElementsByClassName(this.target.substring(1));
                        if (elms.length) {
                            if (elms[0].style.overflow != "auto" && elms[0].style.overflow != "scroll") {
                                elms[0].style.overflow = "auto";
                            }
                            return elms[0];
                        }
                    }
                }
                return null;
            },
            style() {
                return {
                    top: this.top + "px",
                    left: this.left + "px",
                    width: isNaN(this.w) ? this.w : this.w + "px",
                    height: isNaN(this.h) ? this.h : this.h + "px",
                    zIndex: this.zIndex
                }
            }
        },
        mounted() {
            let style = window.getComputedStyle(this.$el, null);
            this.w = parseFloat(style.getPropertyValue("width"));
            this.h = parseFloat(style.getPropertyValue("height"));
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
                this.dragging = true;
                if (this.dndZone && this.dndZone != this.$el.parentNode) {
                    document.documentElement.style.cursor = "grabbing";
                    let $parent = this.$el.parentNode;
                    this.$clonedNode = this.$el.cloneNode(true);
                    this.$clonedNode.style.opacity = .6;
                    this.$clonedNode.style.zIndex = 1000;
                    this.$clonedNode.style.cursor = "grabbing";
                    $parent.appendChild(this.$clonedNode);
                } else {
                    document.documentElement.style.cursor = "move";
                    this.zIndex += 1;
                }
            },
            drag(evt) {
                if (this.dragging) {
                    if (this.$clonedNode) {
                        this.$clonedNode.style.top =
                            (parseInt(this.$clonedNode.style.top) + evt.movementY) + "px";
                        this.$clonedNode.style.left =
                            (parseInt(this.$clonedNode.style.left) + evt.movementX) + "px";
                    } else {
                        let offsetX = this.left + evt.movementX;
                        let offsetY = this.top + evt.movementY;
                        if (!this.dndZone || offsetX >= 0) this.left = offsetX;
                        if (!this.dndZone || offsetY >= 0) this.top = offsetY;
                        this.$emit("drag", evt, offsetX, offsetY, this.w, this.h);
                    }
                }
            },
            dragend(evt) {
                if (this.dragging) {
                    this.dragging = false;
                    document.documentElement.style.cursor = "auto";
                    if (this.$clonedNode) {
                        this.$clonedNode.parentNode.removeChild(this.$clonedNode);
                        let x = parseInt(this.$clonedNode.style.left);
                        let y = parseInt(this.$clonedNode.style.top);
                        let originRect = this.$el.parentNode.getBoundingClientRect();
                        let targetRect = this.dndZone.getBoundingClientRect();
                        let offsetX = x + (originRect.x - targetRect.x) + this.dndZone.scrollLeft;
                        let offsetY = y + (originRect.y - targetRect.y) + this.dndZone.scrollTop;
                        if (offsetX >=0 && offsetY >= 0) {
                            this.$emit("drop-to-target",
                                        offsetX, offsetY,
                                        this.w, this.h,
                                        this.$slots.default);
                        }
                        this.$clonedNode = null;
                    } else {
                        this.zIndex -= 1;
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
        cursor: move;
    }
</style>
