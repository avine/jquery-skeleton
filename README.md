# jquery-skeleton
Show skeleton screen during asynchronous data loading

### Usage

#### Html fragment:

```html
<article class="wrapper">
  <header></header>
  <main></main>
</article>
```

#### jQuery plugin:

```javascript
$('.wrapper').avnSkeleton({
  cssPrefix: 'avn-skeleton',
  header: {
    selector: '> header',
    lines: 2,
    icon: true,
    loader: true
  },
  main: {
    selector: '> main',
    paragraphs: 3,
    lines: 4
  }
});
```

### Installation and build

```shell
npm install
npm run build
```

### Open a local server

```shell
npm start
```

![Skeleton screen](./screenshot.png)
