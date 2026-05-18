import HorizontalCardList from "./HorizontalCardList";

type ContentCardsProps = {
    title: string
    data: any[]
    loadMore: () => void
    category: string
}

export default function ContentCards({ title, data, loadMore, category }: Readonly<ContentCardsProps>) {
    return (
        <HorizontalCardList
            title={title}
            data={data}
            category={category}
            onEndReached={loadMore}
        />
    );
}