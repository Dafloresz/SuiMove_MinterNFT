import { NFTStorage, File } from 'nft.storage';

const client = new NFTStorage({
  token: import.meta.env.VITE_NFT_STORAGE_KEY,
});

export async function uploadToIPFS(
  file: File,
  name: string,
  description: string
): Promise<string> {
  const metadata = await client.store({
    name,
    description,
    image: file,
  });

  return metadata.url; // ipfs://....
}
