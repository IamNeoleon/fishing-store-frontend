import ContentLoader from "react-content-loader"

const CardSkeleton = () => (
    <ContentLoader
        speed={2}
        width={250}
        height={360}
        viewBox="0 0 250 360"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <rect x="0" y="0" rx="10" ry="10" width="250" height="200" />
        <rect x="0" y="210" rx="2" ry="2" width="210" height="15" />
        <rect x="0" y="242" rx="2" ry="2" width="120" height="15" />
        <rect x="0" y="272" rx="2" ry="2" width="80" height="15" />
        <rect x="0" y="304" rx="5" ry="5" width="250" height="38" />
    </ContentLoader>
)

export default CardSkeleton

