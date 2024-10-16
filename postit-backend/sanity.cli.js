import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '7x97x9yk',
    dataset: 'production',
    useCdn: true,
  }
})
