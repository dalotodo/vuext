# Vue eXTensions (XT)

This project helps VUEX developers to create featured-based modules, with well-known reusable patterns.

It also allows Typescript developers to use strong types when accessing state properties.

VUEXT is only compatible with version 4.x of VueX, and version 3.x of Vue.

## Instalation

If using `npm`:

```
npm install --save @vuextnd/core
```

### Usage (basic)

You can create a module by adding

```

/* This is your items type */
export interface Item {
    id: string;
}

export function createMyCustomModule<A>()  {

    const module : Module<> = {
        namespaced: true,
        
        /* ... Add your custom state, mutations and actions here ... */
    }


    const featured = addFeatures(module,        
            withItems<Item>(),  // Allows you have a collection of items
            withSelectedItem<Item>(), // Allows you to have a single selected item
            withSearch(),   // Allows you have search
            withLoading(),  // Adds loading state management (during AJAX request)
            withPaging(),   // Allows you to have paging control over the collection
    )

    return featured;
}

```