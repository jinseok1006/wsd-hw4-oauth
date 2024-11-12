import { useEffect } from "react";

export default function WishListPage() {
  useEffect(() => {
    console.log("mount!");
    return () => {
      console.log("unmount?");
    };
  }, []);

  return <div>helo</div>;
}
