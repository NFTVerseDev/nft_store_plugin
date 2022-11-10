import React from 'react';
import { Collection, NewlyMintedNFTs, NFTDetails } from '@nftverse/react-store-plugin';

const App = () => {
    const handleBuyNowClick = React.useCallback(nft => {
        console.log(nft);
    }, []);

    return (
        <div>
            <Collection marketplaceId={3} className="" />
            <NewlyMintedNFTs marketplaceId={3} className="" onBuyNowClick={handleBuyNowClick} />
            <NFTDetails nftId={292} marketplaceId={4} className="" />
        </div>
    );
};

export default App;
