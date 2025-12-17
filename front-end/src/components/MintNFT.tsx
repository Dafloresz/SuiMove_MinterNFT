import { useCurrentAccount, useSignAndExecuteTransaction } from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import { useState } from 'react';
import { NFTCard } from './NFTCard';
import { PACKAGE_ID, MODULE_NAME } from '../constants';


export default function MintNFT() {
  const account = useCurrentAccount();
  const { mutate: signAndExecute, isPending } = useSignAndExecuteTransaction();

// Estado para os inputs do NFT 
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');


  // --- FUNÇÃO DE MINT DO NFT ---

  const mintNFT = () => {
    if (!account) return alert('Conecte a sua Wallet!');

    const tx = new Transaction();
    tx.moveCall({
      target: `${PACKAGE_ID}::${MODULE_NAME}::mint`,
      arguments: [
        tx.pure.string(name),
        tx.pure.string(description),
        tx.pure.string(imageUrl),
      ],
    });

    signAndExecute(
      { transaction: tx },
      {
        onSuccess: () => alert('NFT mintado com sucesso!'),
        onError: (e) => {
          console.error(e);
          alert('Erro ao mintar NFT');
        },
      }
    );
  };

  if (!account) return null;

return (
        <div className="mint-box">
            
            {}
            
            <h2>Mintar Novo NFT</h2>
            
            <input
                placeholder="Nome do NFT"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <input
                placeholder="Descrição"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <input
                placeholder="URL da Imagem"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
            />

            {imageUrl && (
                <NFTCard
                    name={name || 'Preview'}
                    description={description || 'Descrição'}
                    image={imageUrl}
                />
            )}

            <button onClick={mintNFT} disabled={isPending || !name || !imageUrl} >
                {isPending ? 'Mintando...' : 'Mintar NFT'}
            </button>
        </div>
    );
}
