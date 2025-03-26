export interface UserState {
  token: string;
  userInfo: {
    avatar?: string;
    username?: string;
  };
}

export interface AuthState {
  authMenuList: Menu.MenuOptions[];
}
