import "./style.less";
import Vue from "vue";
import UkDnd from "../dist/build";

Vue.component("uk-dnd", UkDnd);
new Vue({
    el: "#app"
});
