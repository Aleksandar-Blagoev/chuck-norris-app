import { useRoute } from "vue-router";
const isHomePage = () => {
  const route = useRoute();

  const endPath = route.path.split("/").pop().toLowerCase();
  return endPath !== "jokes" && endPath !== "favourites";
};

export default isHomePage;
