# Inception Health React-Native Coding Challenge

Using [Star Wars GraphQL API](https://graphql.org/swapi-graphql), create an _informative_ mobile app that _delights_ Star Wars fans!

## Ideas

- Visualize an Entity details.
- Visualize Entity Connections
- Search
- Rate Star Wars Characters
- Vehicle E-Commerce
- Planet Tourism Brochure

## Getting Started

### Use Template and Clone git repo

```bash
git clone git@github.com:{GH_USERNAME}/ih-mobile-challenge.git
```

### Local Development

This app follows the standard setup fo [react-native applications](https://reactnative.dev/docs/0.66/environment-setup) with typescript.

#### Run Android

```bash
npm run android
```

#### Run iOS

```bash
npm run ios
```

#### GraphQL

[GraphQL](https://graphql.org/learn/) generated types are located under `src/__generated__/graphql.tsx`. Uses [GraphQL Code Generator](https://www.graphql-code-generator.com/docs/getting-started) to generate the types. 

```bash
npm run client:codegen
```

#### UI Component Library

This project has pre-installed the [React Native Elements](https://reactnativeelements.com/docs) library for convenience. It is not required to use this component library.
