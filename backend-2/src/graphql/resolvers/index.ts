import { ORDERS_MOCK } from "../../database/orders.mock";
import { USERS_MOCK } from "../../database/users.mock";

export const resolvers = {
  users: () =>
    USERS_MOCK.map(u => ({ ...u, orders: ORDERS_MOCK.filter(o => o.userId === u.id) })),
  user: ({ id }: { id: string }) => {
    const user = USERS_MOCK.find(u => u.id === id);
    if (!user) return null;
    return { ...user, orders: ORDERS_MOCK.filter(o => o.userId === id) };
  },
  orders: () =>
    ORDERS_MOCK.map(o => ({ ...o, user: USERS_MOCK.find(u => u.id === o.userId) })),
  createUser: ({ name, email }: { name: string; email: string }) => {
    if (USERS_MOCK.some(u => u.email === email)) throw new Error("Email ya registrado");
    const newUser = { id: String(USERS_MOCK.length + 1), name, email };
    USERS_MOCK.push(newUser);
    return newUser;
  },
  updateOrderStatus: ({ id, status }: { id: string; status: string }) => {
    const order = ORDERS_MOCK.find(o => o.id === id);
    if (!order) throw new Error("Orden no encontrada");
    order.status = status;
    return order;
  },
};
