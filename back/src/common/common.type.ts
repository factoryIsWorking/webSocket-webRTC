import { Socket } from 'socket.io';
import { ActionRequest } from 'src/module/app/socket.type';

export class CallbackList {
  delete: Set<Function> | Function = new Set<Function>();
  set: Set<Function> | Function = new Set<Function>();
}

export class Factory<T> {
  callbackMaps = new Map<T, CallbackList>();
  create(init: T) {
    const callbacks = new CallbackList();
    this.callbackMaps.set(init, callbacks);
    return new Proxy(init as Object, {
      set(obj, prop, value): boolean {
        for (const func of callbacks.set as Set<Function>) {
          func(obj, prop, value);
        }
        return Reflect.set(obj, prop, value);
      },
    });
  }
  delete(target: T): boolean {
    if (this.callbackMaps.has(target)) {
      const callbacks = this.callbackMaps.get(target);
      this.callbackMaps.delete(target);
      for (const func of callbacks.delete as Set<Function>) {
        func(target);
      }
      return true;
    } else {
      return false;
    }
  }
  addListener(target: T, callbacks: CallbackList): boolean {
    if (this.callbackMaps.has(target)) {
      const map = this.callbackMaps.get(target);
      for (const [event, func] of Object.entries(callbacks)) {
        map[event].add(func);
      }
      return true;
    } else {
      return false;
    }
  }
  removeListener(target: T, callbacks: CallbackList): boolean {
    if (this.callbackMaps.has(target)) {
      const map = this.callbackMaps.get(target);
      for (const [event, func] of Object.entries(callbacks)) {
        map[event].delete(func);
      }
      return true;
    } else {
      return false;
    }
  }
}
