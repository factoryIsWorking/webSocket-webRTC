import { makeItem, removeItem, addCallbacks } from 'src/common/globalFactory';

export type User = {
  name: string;
};

export const UserFactory = {
  info: {
    list: new Set<User>(),
  },
  make(params: { name: string }) {
    const baseInfo = {
      name: params.name,
    };
    const newOne: User = makeItem(baseInfo) as User;
    addCallbacks(newOne, {
      remove(item: User) {
        this.info.list.delete(item);
      },
    });
    this.info.list.add(newOne);
    return newOne;
  },
  remove(target: User) {
    removeItem(target);
  },
};
