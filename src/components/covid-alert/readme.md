# covid-alert



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute   | Description | Type     | Default     |
| ---------- | ----------- | ----------- | -------- | ----------- |
| `body`     | `body`      |             | `string` | `undefined` |
| `heading`  | `heading`   |             | `string` | `undefined` |
| `linkHref` | `link-href` |             | `string` | `undefined` |
| `linkText` | `link-text` |             | `string` | `undefined` |


## Dependencies

### Depends on

- [backascout-alert](../backascout-alert)

### Graph
```mermaid
graph TD;
  covid-alert --> backascout-alert
  backascout-alert --> backascout-heading
  backascout-alert --> backascout-p
  backascout-alert --> backascout-link
  style covid-alert fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
