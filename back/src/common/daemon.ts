export const daemonList = {
  dummy: {
    timer: null,
    async callback() {
      //const users = Array.from(lobbyState.users).filter((e) => e);
      console.log('dummyDaemon : timer - ' + new Date());
    },
    intv: 300000,
  },
};
const INTV = 10000;
export function activate(target: string, intv?: number) {
  daemonList[target].timer = setInterval(
    daemonList[target].callback,
    intv ? intv : daemonList[target].intv ? daemonList[target].intv : INTV,
  );
}
export function deactivate(target) {
  clearInterval(daemonList[target].timer);
  daemonList[target] = null;
}

export function init() {
  for (const key of Object.keys(daemonList)) {
    activate(key);
  }
}
