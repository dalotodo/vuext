## `withItem<T>`

Allows the module to manage a single item of a given type.

### State

```
interface WithItemModuleState<T> {
    item?: T
}
```

### Getters

| Name  | Description |
| ---   | --- |
| item | Returns the item (if set) |

### Mutations

| Name  | Payload Type | Description |
| ---   | --- | --- |
| setItem | T   | Sets the item to the given payload |