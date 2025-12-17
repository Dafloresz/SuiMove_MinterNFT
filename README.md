# NFT Minter na Blockchain Sui

Este repositório contém um **projeto completo de mintagem de NFTs na blockchain Sui**, incluindo:

- 🧠 Um **smart contract escrito em Move**
- ⚛️ Um **frontend em React, TypeScript e Vite**
- 🌐 Integração com **IPFS** para armazenamento de imagens e metadados dos NFTs

Este projeto foi desenvolvido com **fins educacionais**, com foco em fundamentos de Web3, smart contracts e integração entre frontend e blockchain.

---

## 📂 Estrutura do Repositório
````
├── nft_minter/ # Smart contract em Move
└── front-end/ # Frontend em React + TypeScript
````
---

## 🧠 Smart Contract

 ```move 
Módulo: `nft_minter::nft_minter`
````
Este módulo implementa um **minter de NFTs simples** na blockchain Sui.

---

### 📦 Estrutura do NFT

```move
public struct NFT has key, store {
    id: UID,
    name: String,
    description: String,
    image_url: String,
}
````
---

### Cada NFT contém:

- id: Identificador único on-chain
- name: Nome do NFT
- description: Descrição do NFT
- image_url: URL da imagem (IPFS ou link externo)

### Evento de Mintagem
```move
public struct Minted has copy, drop {
    object_id: ID,
    owner: address,
    name: String,
}
````
---
Este evento é emitido sempre que um NFT é mintado, permitindo:

- Rastreamento on-chain
- Indexação no frontend
- Integração com wallets e exploradores

---
### ⚙️ Inicialização do Pacote (init)

```move
fun init(otw: NFT_MINTER, ctx: &mut TxContext)

````
---
Essa função é executada apenas uma vez, no momento em que o pacote é publicado.

O que ela faz:

- Reivindica a capacidade de publisher do pacote
- Cria um objeto Display para o tipo NFT
- Mapeia os campos (name, description, image_url) para visualização correta
- Publica o Display como um objeto compartilhado
- Transfere a capacidade de publisher para o deployer
- Isso permite que os NFTs sejam exibidos corretamente em wallets e exploradores da Sui.

---
### 🪙 Função de Mintagem
```move
public entry fun mint(
    name: vector<u8>,
    description: vector<u8>,
    image_url: vector<u8>,
    ctx: &mut TxContext
)
````
---

### Fluxo de mintagem:

- Obtém o remetente da transação
- Cria um novo objeto NFT
- Converte os bytes de entrada para strings UTF-8
- Emite o evento Minted
- Transfere o NFT para o chamador

- Qualquer pessoa pode mintar
- Propriedade do NFT totalmente on-chain
---

### ⚛️ Frontend

O frontend fornece uma interface web para mintar NFTs e interagir com a blockchain Sui.

🛠️ Stack Tecnológica

- React
- TypeScript
- Vite
- Sui JavaScript SDK
- IPFS (NFT.Storage)
- CSS
 
 ---
 
### 📁 Estrutura do Frontend
```
front-end/
├── src/
│   ├── components/     # Componentes de UI (MintNFT, NFTCard)
│   ├── libs/           # Helpers de Sui e IPFS
│   ├── styles/         # Estilos globais
│   ├── constants.ts    # Constantes do contrato
│   ├── upload.ts       # Lógica de upload para IPFS
│   ├── App.tsx
│   └── main.tsx
└── index.html

````


### 🔐 Variáveis de Ambiente

Crie um arquivo .env dentro do diretório front-end/ com base no .env.example:
VITE_NFT_STORAGE_KEY=sua_chave_api_ipfs

Essa chave é necessária para enviar imagens e metadados dos NFTs para o IPFS.

--- 
### ▶️ Rodando o Frontend
````
cd front-end
npm install
npm run dev
````

A aplicação estará disponível em:
````
http://localhost:5173
````
--- 
### 🪙 Como Mintar um NFT

Inicie uma rede local da Sui ou conecte-se à Devnet/Testnet
Publique o smart contract:
```move
sui client publish
````

- Execute o frontend
- Conecte uma wallet compatível com Sui
- Preencha o nome, descrição e o endereço de imagem do NFT 
- Clique em Mint
- Confirme a transação na wallet
- O NFT será mintado e transferido para seu endereço 🎉

---
### 📚 Objetivo Educacional

- Este projeto demonstra:
- Criação de NFTs usando Move
- Configuração de metadados com Display na Sui
- Emissão de eventos
- Integração entre frontend e blockchain
- Armazenamento descentralizado com IPFS

---
### 👤 Autor
- Thiago Figueiredo Piazentin
- GitHub: https://github.com/Dafloresz
- Linkedin: https://www.linkedin.com/in/thiagopiazentin/

---
Made with ❤️ on Sui
