import HomeIcon from "@mui/icons-material/Home";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";

export const ROUTES = {
  root: "/",
  signin: "signin",
  wishlist: "whitelist",
  popular: "popular",
  search: "search",
  userInfo: 'userInfo'
} as const;

export const PAGES = [
  { title: "홈", route: ROUTES.root, icon: HomeIcon },
  {
    title: "NEW! 요즘 대세 콘텐츠",
    route: ROUTES.popular,
    icon: LocalFireDepartmentIcon,
  },
  { title: "찾아보기", route: ROUTES.search, icon: SearchIcon },
  { title: "내가 찜한 리스트", route: ROUTES.wishlist, icon: FavoriteIcon },
] as const;
