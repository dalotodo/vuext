# Vue eXTensions (XT)

This project helps VUEX developers to create featured-based modules, with well-known reusable patterns.

It also allows Typescript developers to use strong types when accessing state properties.

VUEXT is only compatible with version 4.x of VueX, and version 3.x of Vue.

>
> This project is intented only as an add-on for VueX projects, and it's in a very early stage.
>
> Developer team has very limited availability for issue tracking and resolution.
> 
> Any help is appreciated. Maintainers welcome.
>

## Introduction

[VueX](https://vuex.vuejs.org/) is a state management library for [Vue](https://v3.vuejs.org/). 

It allows developers to manage application data in a modular way, with a well-defined pattern based on a state and its transitions (mutations and actions).

In many cases, states at different points of the application share the same behavior (i.e. collections of items retrieved from an API with paging), so code is often reused to reproduce it.

Usually, this is performed by creating [Modules](https://next.vuex.vuejs.org/guide/modules.html), and using them in the main store.

But, when you try to add new features to Module's behaviour (i.e. keeping track of the loading state while performing remote API calls), developers are forced to refactor all the modules created in the app that share that behavior.

**VueXT** adds 2 functionalities to the core VueX library, that rely on the standard VueX Module functionality:

 - Declarative module creation, by adding _features_ to the Module 
 - Runtime module registration and access from Vue components inside the application


## Instalation

If using `npm`:

```
npm install --save @vuextnd/core
```

## Usage (basic)

VueXT is designed to be used with Composition API.

### Declarative Module Creation

You can create a module by adding features:

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


## Reference

- See a list of available features [feature reference](features/index.md)
