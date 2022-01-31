# covid-post



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute       | Description | Type     | Default     |
| ------------- | --------------- | ----------- | -------- | ----------- |
| `host`        | `host`          |             | `string` | `undefined` |
| `postExcerpt` | `post-excerpt`  |             | `string` | `undefined` |
| `postLink`    | `post-link`     |             | `string` | `undefined` |
| `postMediaId` | `post-media-id` |             | `number` | `undefined` |
| `postTitle`   | `post-title`    |             | `string` | `undefined` |


## Dependencies

### Used by

 - [covid-posts](../covid-posts)

### Depends on

- [backascout-blog-card](../../backascout-blog-card)

### Graph
```mermaid
graph TD;
  covid-post --> backascout-blog-card
  backascout-blog-card --> backascout-link
  backascout-blog-card --> backascout-p
  backascout-blog-card --> backascout-heading
  covid-posts --> covid-post
  style covid-post fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
