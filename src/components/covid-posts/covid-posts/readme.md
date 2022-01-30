# covid-posts



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type     | Default     |
| -------- | --------- | ----------- | -------- | ----------- |
| `host`   | `host`    |             | `string` | `undefined` |


## Dependencies

### Depends on

- [loading-spinner](../../loading-spinner)
- [backascout-grid](../../backascout-grid/backascout-grid)
- [backascout-row](../../backascout-grid/backascout-row)
- [backascout-col](../../backascout-grid/backascout-col)
- [covid-post](../covid-post)

### Graph
```mermaid
graph TD;
  covid-posts --> loading-spinner
  covid-posts --> backascout-grid
  covid-posts --> backascout-row
  covid-posts --> backascout-col
  covid-posts --> covid-post
  covid-post --> backascout-blog-card
  backascout-blog-card --> backascout-link
  backascout-blog-card --> backascout-p
  backascout-blog-card --> backascout-heading
  style covid-posts fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
