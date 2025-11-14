let modals: string[] = [];

const listeners = new Set<() => void>();

const notify = () => {
  listeners.forEach((callback) => callback());
};

const modalManager = {
  register(id: string) {
    modals = [...modals, id];
    notify();
  },

  unregister(id: string) {
    modals = modals.filter((m) => m !== id);
    notify();
  },

  depthOf(id: string) {
    return modals.indexOf(id);
  },

  isTop(id: string) {
    return modals[modals.length - 1] === id;
  },

  subscribe(callback: () => void) {
    listeners.add(callback);

    return () => listeners.delete(callback);
  },

  get size() {
    return modals.length;
  },

  get all() {
    return [...modals];
  },
};

export default modalManager;
