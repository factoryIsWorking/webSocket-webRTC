const GLOBAL = {
  onManaging: new Set<Object>(),
  callbacks: {
    set: new Map<Object, Set<Function>>(),
    remove: new Map<Object, Set<Function>>(),
  },
};

export function makeItem(init: Object): Object {
  const res = new Proxy(init, {
    set(
      target: Object,
      p: string | symbol,
      newValue: any,
      receiver: any,
    ): boolean {
      for (const callback of GLOBAL.callbacks.set.get(res)) {
        callback(res, p, newValue, receiver);
      }
      target[p] = newValue;
      return true;
    },
  });
  for (const callbacks of Object.values(GLOBAL.callbacks)) {
    callbacks.set(res, new Set<Function>());
  }
  GLOBAL.onManaging.add(res);
  return res;
}

export function removeItem(item: Object): boolean {
  if (!GLOBAL.onManaging.has(item)) return false;
  for (const callback of GLOBAL.callbacks.remove.get(item)) {
    callback(item);
  }
  for (const callbacks of Object.values(GLOBAL.callbacks)) {
    callbacks.delete(item);
  }

  GLOBAL.onManaging.delete(item);
  return true;
}

export function addCallbacks(
  item: Object,
  callbacks: {
    set?: Function;
    remove?: Function;
  },
): boolean {
  if (!GLOBAL.onManaging.has(item)) return false;
  for (const [event, callback] of Object.entries(callbacks)) {
    GLOBAL.callbacks[event].get(item).add(callback);
  }
  return true;
}

export function removeCallbacks(
  item: Object,
  callbacks: {
    set?: Function;
    remove?: Function;
  },
) {
  if (!GLOBAL.onManaging.has(item)) return false;
  for (const [event, callback] of Object.entries(callbacks)) {
    GLOBAL.callbacks[event].get(item).delete(callback);
  }
  return true;
}
