## `withPaging`

Allows the module to manage offset and paging within a collection.

>
> Please, take into account that this feature does not manage collection itself.
>

This feature is intended to be used with states that also manage collections. 

### State

```
export interface WithPagingState {
    count: number;
    size: number;
    skip: number;
    take: number;
}
```

### Getters

| Name  | Type | Default Value | Description |
| ---   | --- | --- | --- |
| size | number | 0 | Returns the full size of the collection | 
| count | number | 0 | Returns the current size of the collection (available items in the state) | 
| skip | number | 0 | Returns the offset of the current set within the complete collection | 
| take | number | 25 | Returns the number of elements per page to be taken | 
| page | number | 0 | Current page within the collection. First page is number 1 | 
| pages | number | 0 | Total pages within the collection. | 


### Mutations

| Name  | Payload Type | Description |
| ---   | --- | --- |
| setSize | number | Sets the total size value to the given payload |
| setSkip | number | Sets the offset to the given payload |
| setTake | number | Sets the number of elements per page to the given payload |
| setPage | number | Sets the page value to the given payload |