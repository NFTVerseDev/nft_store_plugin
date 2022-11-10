# Description

This plugin can be used to integrate the marketplace components of NFTVerse into your very own react application

# Components

1. The `Collection` component can be used to display the collections that the marketplace has to offer. It takes in the
   following props:
    - `marketplaceId*`: The id of the marketplace that you want to display the collections of
    - `className`: Styles to be applied to the component
2. The `NewlyMintedNFTs` component can be used to display the newly minted NFTs in the marketplace. It takes in the
   following props:
    - `marketplaceId*`: The id of the marketplace that you want to display the newly minted NFTs of
    - `className`: Styles to be applied to the component
    - `onBuyNowClick`: A callback function that is called when the user clicks on the buy now button.
3. The `NFTDetails` component can be used to display the details of a particular NFT. It takes in the following props:
    - `nftId*`: The id of the NFT that you want to display the details of
    - `marketplaceId*`: The id of the marketplace that the NFT belongs to
    - `className`: Styles to be applied to the component

# Installation and usage

- Installing the package
  ```
  npm i @nftverse/react-store-plugin
  ```
- Importing the components
  ```
    import { Collection, NewlyMintedNFTs, NFTDetails } from '@nftverse/react-store-plugin'
  ```
- Using the components
  ```
    <Collection marketplaceId={3} className="className" />
    <NewlyMintedNFTs marketplaceId={3} className="className" onBuyNowClick={onBuyNowClick} />
    <NFTDetails nftId={3} marketplaceId={4} className="className" />
  ```