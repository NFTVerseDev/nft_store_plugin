import {Collections, NewlyMintedNFTs, NFTDetails} from '@nftverse/react-store-plugin'

function App1() {

  return (
    <div>
      <Collections marketplaceId={3} />
      <NewlyMintedNFTs marketplaceId={3} />
      <NFTDetails nftId={292} marketplaceId={3} />
    </div>
  )
}

export default App1
