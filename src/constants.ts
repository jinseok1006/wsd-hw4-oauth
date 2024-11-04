export const ROUTES = {
  root: "/",
  signin: "signin",
  wishlist: "whitelist",
  popular: "popular",
  search: "search",
} as const;

export const PAGES = [
  { title: "홈", route: ROUTES.root },
  { title: "NEW! 요즘 대세 콘텐츠", route: ROUTES.popular },
  { title: "찾아보기", route: ROUTES.search },
  { title: "내가 찜한 리스트", route: ROUTES.wishlist },
] as const;
