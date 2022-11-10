import React from 'react';
//@ts-ignore
import placeholder from '../../assets/placeholder.png';

export type CollectionItemProps = {
    collection: Collection;
    index: number;
};

export type Collection = {
    collectionId: number;
    name: string;
    logo: string;
    cover_image: string;
    floorPrice: number;
    volume: number;
};

const CollectionItem = ({ collection, index }: CollectionItemProps) => {
    return (
        <div className={'flex items-center gap-5 w-full'}>
            <div className={'text-white'}>{index}.</div>
            <div className={'flex justify-between flex-grow items-center'}>
                <div className={'flex gap-3 items-center w-3/5'}>
                    <img
                        className={
                            'max-w-[60x] max-h-[60px] w-[60px] h-[60px] rounded-full border-2 border-white mr-[10%]'
                        }
                        src={collection.cover_image ? collection.cover_image : placeholder}
                        alt={''}
                    />
                    <div className={'text-white'}>{collection.name}</div>
                </div>
                <div className={'text-white w-1/5'}>{collection.floorPrice ? collection.floorPrice : '----'}</div>
                <div className={'text-white w-1/5'}>{collection.volume ? collection.volume : '----'}</div>
            </div>
        </div>
    );
};

export default CollectionItem;
