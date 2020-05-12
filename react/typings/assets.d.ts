declare module '*.css' {
  const styles: { [key: string]: string }
  export default styles
}

declare module '*.graphql' {
  import { DocumentNode } from 'graphql'

  const document: DocumentNode
  export default document
}
