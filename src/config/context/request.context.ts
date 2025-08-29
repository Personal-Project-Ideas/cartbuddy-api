// request-context.ts
import { AsyncLocalStorage } from 'async_hooks';

interface IContextStore {
  requestId?: string;
}

const asyncLocalStorage = new AsyncLocalStorage<IContextStore>();

export function runWithContext(callback: () => void, context: IContextStore) {
  asyncLocalStorage.run(context, callback);
}

export function getRequestId(): string | undefined {
  return asyncLocalStorage.getStore()?.requestId;
}

export function setRequestId(requestId: string) {
  const store = asyncLocalStorage.getStore();
  if (store) store.requestId = requestId;
}
