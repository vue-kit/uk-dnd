import "uikit/dist/css/uikit.css";
import "./vue-logo.png";
import $ from "jquery";
import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";
import Vue from "vue";
import UkDnd from "../dist/build";

UIkit.use(Icons);

Vue.component("uk-dnd", UkDnd);
new Vue({
    el: "#app",
    methods: {
        dragend(x, y, width, height, children) {
            let rep = new Vue({
                render: h => h(
                    "uk-dnd",
                    {
                        attrs: {
                            x: x,
                            y: y,
                            width: width,
                            height: height,
                            clone: false
                        }
                    },
                    children
                )
            }).$mount();
            $(".uk-tile").append(rep.$el);
        }
    }
});
