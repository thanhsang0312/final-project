import { useParams } from "react-router-dom";
import useQuery from "../../hooks/useQuery";
import { blogServices } from "../../services/blogServices";

const useBlogSinglePage = () => {
    const { blogSlug } = useParams();

    const { data: blogDetailData, loading: blogDetailLoading } = useQuery(() => blogServices.getBlogBySlug(blogSlug))

    const blogDetail = blogDetailData?.data || {};

    const detailProps = {
        blogDetail,
    }

    return {
        detailProps,

    }
}

export default useBlogSinglePage;