import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

import { ApolloGateway, IntrospectAndCompose } from '@apollo/gateway'

import {
  PORT,
  SEARCH_SUBGRAPH_URL,
  DOCUMENTS_SUBGRAPH_URL
} from './config/constants'

const gateway = new ApolloGateway({
  // Notice that we used IntrospectAndCompose method to introspect subschemas.
  // This approach is low performance and should be used only for development purpose.
  // Consider to use either managed or manual composition for production environments:
  // https://www.apollographql.com/docs/federation/federated-types/composition
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      {
        name: 'search',
        url: SEARCH_SUBGRAPH_URL
      },
      {
        name: 'documents',
        url: DOCUMENTS_SUBGRAPH_URL
      }
    ]
  })
})

type MyContext = {
  token?: string
}

const server = new ApolloServer<MyContext>({ gateway })

;(async () => {
  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
    listen: { port: Number(PORT) }
  })
  console.log(`Jus Edge GraphQL ready at ${url}`)
})()
