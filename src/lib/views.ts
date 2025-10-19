import { create_indexed_db } from '$lib/indexed_store'

export type View = {
  id: string
  position: number
}

export const views = await create_indexed_db<View>({
  name: 'views',
  version: 1
})
