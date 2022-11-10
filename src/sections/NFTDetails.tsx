import React from 'react';
import CollapsableView from '../components/nft-details/CollapsableView';
import useHttp from '../hooks/use-http';
import ListIcon from '@mui/icons-material/List';
import NotesIcon from '@mui/icons-material/Notes';
import InfoIcon from '@mui/icons-material/Info';
import { ArrowRightAltRounded } from '@mui/icons-material';
import { algorand, ethereum, flow } from '../assets';
import ThreeDRenderer from '../components/common/ThreeDRenderer';

export type NFTDetailsProps = {
    className?: string;
    nftId: number;
    marketplaceId: number;
};

export type NFT = {
    nftId: number;
    blockchainNftId: number;
    metaData: string;
    blockchain: string;
    priceUnit: string;
    transactionId: string;
    price: string;
};

export type NFTMetaData = {
    name: string;
    description: string;
    type: string;
    ipfsHash: string;
    collection: string;
    properties: { key: string; value: string }[];
};

const NFTDetails = ({ className, nftId, marketplaceId }: NFTDetailsProps) => {
    const [nftMetaData, setNftMetaData] = React.useState<NFTMetaData | null>(null);
    const [nft, setNft] = React.useState<NFT | null>(null);

    const makeRequest = useHttp();

    React.useEffect(() => {
        makeRequest(
            {
                url: `https://bs-dev.api.onnftverse.com/v1/marketplace/${marketplaceId}/nft/${nftId}/detail`,
                method: 'GET',
                headers: {
                    'X-App-Token': '123',
                },
            },
            (data: NFT) => {
                setNft(data);
                setNftMetaData(JSON.parse(data.metaData) as NFTMetaData);
            },
            (error: any) => console.log(error),
            () => console.log('done'),
        );
    }, [makeRequest, marketplaceId, nftId]);

    return (
        nftMetaData && (
            <div className={`bg-black flex w-full gap-10 ${className} gap-10`}>
                <div className="w-1/2 flex flex-col gap-5">
                    <div className="h-[300px] rounded-2xl object-contain border-2 border-gray-200 overflow-hidden mb-10">
                        {nftMetaData.type === 'image' &&
                            (nftMetaData.ipfsHash ? (
                                <img
                                    src={`https://nftverse-dev.mypinata.cloud/ipfs/${nftMetaData.ipfsHash}`}
                                    alt={nftMetaData.name}
                                    className={'rounded-t-2xl object-contain w-full h-full'}
                                />
                            ) : (
                                <div className={'rounded-2xl bg-gray-300 h-full text-gray-100'}>No image found</div>
                            ))}
                        {nftMetaData.type === 'video' &&
                            (nftMetaData.ipfsHash ? (
                                <video
                                    src={`https://nftverse-dev.mypinata.cloud/ipfs/${nftMetaData.ipfsHash}`}
                                    className={'rounded-t-2xl object-contain w-full h-full'}
                                />
                            ) : (
                                <div className={'rounded-2xl bg-gray-300 h-full text-gray-100'}>No video found</div>
                            ))}
                        {nftMetaData.type === 'threeD' &&
                            (nftMetaData.ipfsHash ? (
                                <ThreeDRenderer
                                    src={`https://nftverse-dev.mypinata.cloud/ipfs/${nftMetaData.ipfsHash}`}
                                    className={'rounded-t-2xl object-cover'}
                                />
                            ) : (
                                <div className={'rounded-2xl bg-gray-300 h-full text-gray-100'}>No 3D model found</div>
                            ))}
                    </div>
                    <CollapsableView
                        headerText="Description"
                        headerIcon={<NotesIcon />}
                        body={
                            <>
                                <div className="font-semibold text-lg">About this item</div>
                                <div>
                                    {nftMetaData.description ? nftMetaData.description : 'No description available'}
                                </div>
                            </>
                        }
                    />
                    <CollapsableView
                        headerText="Properties"
                        headerIcon={<ListIcon />}
                        body={
                            <>
                                <div className="font-semibold text-lg">Properties</div>
                                <div className="flex flex-col gap-5">
                                    {nftMetaData.properties.map((property, index) => (
                                        <div key={index} className="flex flex-row gap-5">
                                            <div className="font-semibold">{property.key}</div>
                                            <div>{property.value}</div>
                                        </div>
                                    ))}
                                    {nftMetaData.properties.length === 0 && <div>No properties available</div>}
                                </div>
                            </>
                        }
                    />
                    <CollapsableView
                        headerText="Details"
                        headerIcon={<InfoIcon />}
                        body={
                            <>
                                <div>NFT standard: {nft?.blockchain}</div>
                                <div className="flex items-center gap-2 my-2">
                                    <a
                                        href={
                                            nft?.blockchain === 'FLOW'
                                                ? `https://testnet.flowscan.org/transaction/${nft?.transactionId}`
                                                : `https://testnet.algoexplorer.io/tx/${nft?.transactionId}`
                                        }
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        View on {nft?.blockchain}scan
                                    </a>
                                    <ArrowRightAltRounded className="text-green-500" />
                                </div>
                                <span className="text-lg font-bold flex justify-center items-center">
                                    <p className="text-sm">Mint address:</p>
                                    <ArrowRightAltRounded />
                                    <p className="text-sm">0xdc609e8559a04a30</p>
                                </span>
                            </>
                        }
                    />
                </div>
                <div className="w-1/2 flex flex-col gap-5 text-white">
                    <div className="text-2xl">NFT Id # {nft?.blockchainNftId}</div>
                    <div className="text-xl">Title: {nftMetaData.name}</div>
                    <div className="flex gap-2 items-center">
                        <img
                            src={nft?.blockchain === 'FLOW' ? flow : nft?.blockchain === 'ALGO' ? algorand : ethereum}
                            alt="NFT"
                            className="w-10 h-10 rounded-full"
                        />
                        <div className="text-xl">{nft?.blockchain}</div>
                    </div>
                    <div className="rounded-lg bg-gray-800 text-white p-5 w-fit flex flex-col gap-2 mb-10">
                        <div>Price</div>
                        <div className="text-2xl">
                            {nft?.price} {nft?.blockchain}
                        </div>
                        <div className="text-xl">{nft?.price ? `$${+nft?.price * 1.5}` : 'No Data'}</div>
                    </div>
                    <CollapsableView headerText="Owners" body={<>No data available</>} />
                    <CollapsableView headerText="Offers" body={<>No data available</>} />
                </div>
            </div>
        )
    );
};

export default NFTDetails;
