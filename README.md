# uk-dnd
It is a uikit drag and drop component for vue.

![uk-dnd.gif](uk-dnd.gif)

## Installation

```
$ npm install --save uk-dnd
```

## Usage

To enable drag and drop, only need to use the uk-dnd element as your node (e.g: span, img, div, etc.) wrapper, for example:

```
<!--
options: {
    x (optional): Number, [default: 0]
    y (optional): Number, [default: 0]
    width (optional): String or Number, [e.g: "200" or "200px" or "100%"] [default: "auto"]
    height (optional): String or Number, [e.g: "100" or "100px" or "50%"] [default: "auto"]
    draggable (optional): Boolean, [default: true]
    clone (optional): Boolean, [default: true]
    target (optional): String [e.g: "#id" or ".class"] [default: null]
}
event: {
    name: "drop-to-target",
    description: "If target option is exist and the draggable node drop to the target, will fire the event.",
    arguments: {
        x: "Left position of draggable node relative to target",
        y: "Top position of draggable node relative to target",
        width: "The computed width of draggable node",
        height: "The computed height of draggable node",
        children: "A collection of child nodes of draggable node"
    }
}
-->
<div id="app">
    <uk-dnd target="#container" @drop-to-target="dragend">
        <span>It is draggable text!</span>
    </uk-dnd>
</div>
<div id="container"></div>
```

```
import Vue from "vue";
import UkDnd from "uk-dnd";

Vue.component("uk-dnd", UkDnd);
new Vue({
    el: "#app",
    methods: {
        dragend(x, y, width, height, children) {
            //after drop to target, replicate the draggable node in the container
            let rep = new Vue({
                render: h => h(
                    "uk-dnd",
                    {
                        attrs: {
                            x: x,
                            y: y,
                            width: width,
                            height: height,
                            clone: false,
                            target: "#container"
                        }
                    },
                    children
                )
            }).$mount();
            $("#container").append(rep.$el);
        }
    }
});
```

## Local test

1. Clone repository.

    ```
    $ git clone git@github.com:vue-kit/uk-dnd.git
    ```

2. Install dependencies.

    ```
    $ npm install
    ```

3. Run test page with hot reload at localhost:8080.

    ```
    $ npm test
    ```
