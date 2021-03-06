const getters = {
  token: state => state.user.token,
  name: state => state.user.name,
  avatar: state => state.user.avatar,
  role: state => state.user.role,
  scrollTop: state => state.app.scrollTop,
  permission_routes: state => state.permission.routes
};
export default getters;
