import "uikit/dist/css/uikit.css";
import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";
import Vue from "vue";
import UkDnd from "../dist/build";

UIkit.use(Icons);

Vue.component("uk-dnd", UkDnd);
new Vue({
    el: "#app"
});
