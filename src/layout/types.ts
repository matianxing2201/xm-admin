export type routeMetaType = {
  title?: string;
  icon?: string;
  showLink?: boolean;
  savedPosition?: boolean;
  auths?: Array<string>;
};

export type RouteConfigs = {
  path?: string;
  query?: string;
  params?: string;
  meta?: routeMetaType;
  children?: RouteConfigs[];
  name?: string;
};
export const routerArrays: Array<RouteConfigs> = [];
