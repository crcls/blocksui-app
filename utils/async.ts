export type ResolverTuple<T> = [Error | undefined, T?]

export async function resolver<T>(
  promise: Promise<T>
): Promise<ResolverTuple<T>> {
  return await promise
    .then((data: T): ResolverTuple<T> => [undefined, data])
    .catch((e: Error): ResolverTuple<T> => [e])
}
