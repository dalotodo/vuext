## `withItems<T>`

Allows the module to manage a collection of items of a given type.

This feature is intended for states that handle collections as a whole (i.e. retrieve from API, queries, etc.).

It's not designed (has no getters or mutations) to handle items individually.

### State

```
interface WithItemsModuleState<T> {
    items: T[]
}
```

### Getters

| Name  | Description |
| ---   | --- |
| items | Returns the full items collection |

### Mutations

| Name  | Payload Type | Description |
| ---   | --- | --- |
| setItems | T[] | Sets the collection to the given payload |
| clearItems | _none_ | Clears the collection |