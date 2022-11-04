# jus-edge-graphql
One Graph Service with graphql federation v2.
We're using [Apollo Federation](https://www.apollographql.com/docs/federation/) which is an open source architecture for building a distributed graph.
With Apollo Federation, we're able to implement GraphQL in a microservice architecture. It’s designed to replace schema stitching and solve pain points such as coordination, separation of concerns, and brittle gateway code.

## Sub Graphs
Edge GraphQL super graph is composed by the following sub graphs:

[Search Domain Graph Service](https://github.com/augustoscher/search-graphql)

[Document Domain Graph Service](https://github.com/augustoscher/document-graphql)

## Running

Make sure that all subgraphs are running.
To run the edge graphql, type:

```
yarn dev
```
or
```
make dev
```
