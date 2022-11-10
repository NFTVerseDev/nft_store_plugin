import React from 'react';
import '../styles/tailwind.css';
import useHttp from '../hooks/use-http';
import CollectionItem, { Collection } from '../components/collections/CollectionItem';

export type CollectionsProps = {
    marketplaceId: number;
    className?: string;
};

const Collections = ({ marketplaceId, className }: CollectionsProps) => {
    const makeRequest = useHttp();
    const [collections, setCollections] = React.useState<Collection[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        makeRequest(
            {
                url: `https://bs-dev.api.onnftverse.com/v1/marketplace/${marketplaceId}/collection/list`,
                method: 'GET',
                headers: {
                    'X-App-Token': '123',
                },
            },
            data => setCollections(data.content),
            error => console.log(error),
            () => setLoading(false),
        );
    }, [makeRequest]);

    return (
        <div className={`bg-black flex flex-col w-full gap-10 ${className}`}>
            <div className={'text-white font-semibold text-2xl'}>Explore Collections</div>
            <div className={'grid grid-cols-2 gap-x-10 gap-y-5 mx-10'}>
                {!loading &&
                    collections.length > 0 &&
                    collections.map((c, i) => <CollectionItem collection={c} key={c.collectionId} index={i} />)}
            </div>
        </div>
    );
};

export default Collections;
