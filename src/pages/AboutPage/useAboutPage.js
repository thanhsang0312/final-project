import useQuery from "../../hooks/useQuery";
import { pageService } from "../../services/pageServices";

const useAboutPage = () => {
    const { data: aboutPageData } = useQuery(() => pageService.getPageDataByName("about us"))

    const aboutData = aboutPageData?.data?.data || {};
    return {
        aboutData
    }
}

export default useAboutPage;