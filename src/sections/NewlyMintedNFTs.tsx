import React from 'react';
import useHttp from '../hooks/use-http';
import NFTItem, { NFT } from '../components/newly-minted-nfts/NFTItem';

export type NewlyMintedNFTsProps = {
    className?: string;
    marketplaceId: number;
    onBuyNowClick?: (nft: NFT) => void;
};

const NewlyMintedNFTs = ({ className, marketplaceId, onBuyNowClick }: NewlyMintedNFTsProps) => {
    const makeRequest = useHttp();
    const [nfts, setNfts] = React.useState<NFT[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        makeRequest(
            {
                url: `https://bs-dev.api.onnftverse.com/v1/marketplace/${marketplaceId}/nft/list?page=0&size=20&type=listed`,
                method: 'GET',
                headers: {
                    'X-App-Token': '123',
                },
            },
            data => setNfts(data.content),
            error => console.log(error),
            () => setLoading(false),
        );
    }, [makeRequest, marketplaceId]);

    return (
        <div className={`bg-black flex flex-col w-full gap-10 ${className}`}>
            <div className={'text-2xl font-semibold text-white'}>Newly Minted</div>
            <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'}>
                {!loading &&
                    nfts.length > 0 &&
                    nfts.map((nft, i) => <NFTItem onBuyNowClick={onBuyNowClick} key={nft.nftId} nft={nft} />)}
            </div>
        </div>
    );
};

export default NewlyMintedNFTs;
