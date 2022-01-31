# backascout-schedule



<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description | Type                                                                                                          | Default     |
| --------- | --------- | ----------- | ------------------------------------------------------------------------------------------------------------- | ----------- |
| `apiUrl`  | `api-url` |             | `string`                                                                                                      | `undefined` |
| `variant` | `variant` |             | `"aventyrarna" \| "familjescouterna" \| "rover" \| "scouterna" \| "spararna" \| "upptackarna" \| "utmanarna"` | `undefined` |


## Dependencies

### Depends on

- [backascout-loader](../../backascout-loader)
- [backascout-alert](../../backascout-alert)
- [backascout-grid](../../backascout-grid/backascout-grid)
- [backascout-row](../../backascout-grid/backascout-row)
- [backascout-col](../../backascout-grid/backascout-col)
- [backascout-schedule-card](../backascout-schedule-card)
- [backascout-accordion](../../backascout-accordion/backascout-accordion)
- [backascout-tab-filter](../../backascout-tab-filter/backascout-tab-filter)
- [backascout-tab-filter-option](../../backascout-tab-filter/backascout-tab-filter-option)
- [backascout-accordion-item](../../backascout-accordion/backascout-accordion-item)
- [backascout-p](../../backascout-p)
- [backascout-link](../../backascout-link)

### Graph
```mermaid
graph TD;
  backascout-schedule --> backascout-loader
  backascout-schedule --> backascout-alert
  backascout-schedule --> backascout-grid
  backascout-schedule --> backascout-row
  backascout-schedule --> backascout-col
  backascout-schedule --> backascout-schedule-card
  backascout-schedule --> backascout-accordion
  backascout-schedule --> backascout-tab-filter
  backascout-schedule --> backascout-tab-filter-option
  backascout-schedule --> backascout-accordion-item
  backascout-schedule --> backascout-p
  backascout-schedule --> backascout-link
  backascout-alert --> backascout-heading
  backascout-alert --> backascout-p
  backascout-alert --> backascout-link
  backascout-schedule-card --> backascout-heading
  backascout-schedule-card --> backascout-p
  backascout-schedule-card --> backascout-alert
  backascout-schedule-card --> backascout-link
  backascout-accordion --> backascout-heading
  backascout-tab-filter-option --> backascout-p
  backascout-accordion-item --> backascout-heading
  style backascout-schedule fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
