export type Options = {
  name: string
  key?: string
  version?: number
}

export async function create_indexed_db<T>(options: Options): Promise<IndexedStore<T>> {
  const name = options.name
  const version = options.version || 1
  const keyPath = options.key || 'id'
  const { promise, resolve, reject } = Promise.withResolvers<IndexedStore<T>>()
  const request = indexedDB.open(name, version)

  request.onerror = () => {
    reject(request.error)
  }

  request.onsuccess = () => {
    resolve(new IndexedStore<T>(request.result, options.name))
  }

  request.onupgradeneeded = () => {
    request.result.createObjectStore(name, { keyPath })
  }

  return promise
}

export class IndexedStore<T> {
  db: IDBDatabase
  name: string

  constructor(db: IDBDatabase, name: string) {
    this.db = db
    this.name = name
  }

  async get(id: string): Promise<T | null> {
    const { promise, resolve, reject } = Promise.withResolvers<T | null>()

    const request = this.#store('readonly')
      .get(id)

    request.onerror = () => {
      reject(request.error)
    }

    request.onsuccess = () => {
      resolve(request.result)
    }

    return promise
  }

  async put(record: T): Promise<void> {
    const { promise, resolve, reject } = Promise.withResolvers<void>()

    const request = this.#store('readwrite')
      .put(record)

    request.onerror = () => {
      reject(request.error)
    }

    request.onsuccess = () => {
      resolve()
    }

    return promise
  }

  #store(mode: IDBTransactionMode): IDBObjectStore {
    return this.db.transaction(this.name, mode)
      .objectStore(this.name)
  }
}

