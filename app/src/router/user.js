const userRoutes = [
  {
    path: '/users',
    name: 'users.index',
    component: () => import(/* webpackChunkName: "users" */ '../views/User'),
  }
];

export default userRoutes;
