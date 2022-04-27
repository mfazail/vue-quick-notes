<h1 align="center">Vue Quick Notes</h1>
<p align="center">Quickly add notes to admin panel/dashboard or websites.</p>

<p align="center">
  <img width="300px" src="https://raw.githubusercontent.com/mfazail/vue-quick-notes/main/light.png" />
  <img width="300px" src="https://raw.githubusercontent.com/mfazail/vue-quick-notes/main/dark.png" />
</p>

## Installation

### npm

Use npm to install.

```bash
npm i vue-quick-notes
```

## Usage

```js
import { VueQuickNotes } from "vue-quick-notes";
import "vue-quick-notes/dist/style.css";
```

```html
<VueQuickNotes label="Quick notes" v-model="text" />
```

## Composable

```js
// Get the value of the text in any component
import { useQuickNotes } from "vue-quick-notes";

let text = useQuickNotes(); // returns ref

console.log(text.value);
```

## Use *ctrl+alt+k* to show quick note 

## Props

| Props        | Type   | Default            | Detail                      |
| ------------ | ------ | ------------------ | --------------------------- |
| x            | number | screenWidth - 350  | Initial x position of div   |
| y            | number | screenHeight - 250 | Initial y position of div   |
| label        | string | null               | Label for textarea          |
| z-index      | string | 20                 | z index of div              |
| lang         | string | en-US              | Speech recognition language |
| parent-class | string | null               | class of div                |
| button-class | string | null               | class of mic button         |

> Any other attributes will be passed to textarea