const {
  NODE_ENV = 'development',
  PORT = 4000,
  SEARCH_SUBGRAPH_URL = 'http://localhost:4001/graphql',
  DOCUMENTS_SUBGRAPH_URL = 'http://localhost:4002/graphql'
} = process.env

export { NODE_ENV, PORT, SEARCH_SUBGRAPH_URL, DOCUMENTS_SUBGRAPH_URL }
