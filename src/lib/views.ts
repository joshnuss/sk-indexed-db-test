import { create_indexed_db } from '$lib/indexed_store'

export type View = {
  src: string
  position: number
}

export const views = await create_indexed_db<View>({
  name: 'views',
  key: 'src',
  version: 1
})
