import React from 'react';
import ThreeDRenderer from '../common/ThreeDRenderer';

export type NFT = {
    nftId: number;
    transactionId: string;
    collectionId: number;
    blockchain: string;
    status: string;
    priceUnit: string;
    metaData: string;
};

export type NFTMetadata = {
    title: string;
    price: number;
    type: string;
    ipfsHash?: string;
    properties: { key: string; value: string }[];
};

export type NFTItemProps = {
    nft: NFT;
    onBuyNowClick?: (nft: NFT) => void;
};

const NFTItem = ({ nft, onBuyNowClick }: NFTItemProps) => {
    const metaData = JSON.parse(nft.metaData) as NFTMetadata;

    return (
        <div className={'flex flex-col w-full rounded-2xl overflow-y-hidden group bg-white'}>
            <div className={'object-cover h-[200px]'}>
                {metaData.type === 'image' &&
                    (metaData.ipfsHash ? (
                        <img
                            src={`https://nftverse-dev.mypinata.cloud/ipfs/${metaData.ipfsHash}`}
                            alt={metaData.title}
                            className={'rounded-t-2xl object-cover w-full h-full'}
                        />
                    ) : (
                        <div className={'rounded-t-2xl bg-gray-300 h-full text-gray-100'}>No image found</div>
                    ))}
                {metaData.type === 'video' &&
                    (metaData.ipfsHash ? (
                        <video
                            src={`https://nftverse-dev.mypinata.cloud/ipfs/${metaData.ipfsHash}`}
                            className={'rounded-t-2xl object-cover w-full h-full'}
                        />
                    ) : (
                        <div className={'rounded-t-2xl bg-gray-300 h-full text-gray-100'}>No video found</div>
                    ))}
                {metaData.type === 'threeD' &&
                    (metaData.ipfsHash ? (
                        <ThreeDRenderer
                            src={`https://nftverse-dev.mypinata.cloud/ipfs/${metaData.ipfsHash}`}
                            className={'rounded-t-2xl object-cover'}
                        />
                    ) : (
                        <div className={'rounded-t-2xl bg-gray-300 h-full text-gray-100'}>No 3D model found</div>
                    ))}
            </div>
            <div className={'flex-grow group-hover:flex-grow-0 flex flex-col gap-5 p-3'}>
                <div className={'flex gap-1 items-center'}>
                    <div>Title:</div>
                    <div className={'text-black font-semibold text-lg'}>{metaData.title}</div>
                </div>
                <div className={'flex gap-1 items-center'}>
                    <div>Price:</div>
                    <div className={'text-black font-semibold text-lg'}>{metaData.price ? metaData.price : 'N/A'}</div>
                    <div className={'text-black font-semibold text-lg'}>{nft.priceUnit}</div>
                </div>
            </div>
            <button
                className={
                    'text-xl text-white group-hover:translate-y-[0px] relative translate-y-[80px] h-[80px] transition-all ease-out duration-300 bg-green-500 rounded-b-2xl p-3'
                }
                onClick={() => onBuyNowClick && onBuyNowClick(nft)}
            >
                Buy Now
            </button>
        </div>
    );
};

export default NFTItem;
