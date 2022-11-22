# supergraphq
One Graph Service with graphql federation v2.
We're using [Apollo Federation](https://www.apollographql.com/docs/federation/) which is an open source architecture for building a distributed graph.
With Apollo Federation, we're able to implement GraphQL in a microservice architecture. It’s designed to replace schema stitching and solve pain points such as coordination, separation of concerns, and brittle gateway code.

## Sub Graphs
Jus Edge GraphQL super graph is composed by the following sub graphs:

[Search Domain Graph Service](https://github.com/augustoscher/search-graphql)

[Document Domain Graph Service](https://github.com/augustoscher/document-graphql)

## Running

- Clone both subgraphs listed above.
- Make sure that all subgraphs are running.
- Run supergraph:

```
yarn dev
```

## Example

This query should fetch data from all subgraphs:

```gql
query Search($artifact: String!, $q: String!) {
  search(artifact: $artifact, q: $q) {
    id
    documentId
    title
    body
    relatedDocument {
      documentId
      title
      # available only in documents subgraph
      meritDecision
      mandatoryPrecedent
      readingTime
    }
  }
}

# variables
{
  "artifact": "JURISPRUDENCIA",
  "q": "danos morais"
}

```
## FAQ
- **How it works when subgraph schema changes in production? Supergraph needs to redeploy?**
Everytime that the schema of any subgraph changes, supergraph must run schema composition. The new schema will be available in the graph after this process.
See more: https://www.apollographql.com/docs/federation/federated-types/composition/

- **What happens  when a subgraph is down?**
If any subgraph is down, the supergraph application will raise an error when it starts: `Error: Couldn't load service definitions for "search" at http://localhost:4001/graphql: request to http://localhost:4001/graphql failed`.
When supergraph is already running and subgraph crashes for some reason, any request that it's handled by the crashed subgraph will fail.

- **Is it any performance issues?**
A note on performance: Query Planning and Execution adds a ~10ms overhead in the worst case. This includes the compute for building the query plan, as well as the deserialization of DGS responses and the serialization of merged gateway response.

- **How does it work with Relay subgraph?**
It doesnt work.

## Docs
[GraphQL Principle](https://principledgraphql.com/integrity#1-one-graph).

[Apollo Federation](https://www.apollographql.com/docs/federation/).

[Netflix API with GraphQL Federation](https://netflixtechblog.com/how-netflix-scales-its-api-with-graphql-federation-part-1-ae3557c187e2).
