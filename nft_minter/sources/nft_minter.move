module nft_minter::nft_minter {
    use sui::object::{Self, UID, ID};
    use sui::tx_context::{Self, TxContext, sender};
    use sui::transfer;
    use sui::event;
    use sui::display;
    use sui::package;
    use std::string::{Self, String, utf8};

    public struct NFT_MINTER has drop {}

    /// Estrutura do NFT
    public struct NFT has key, store {
        id: UID,
        name: String,
        description: String,
        image_url: String,
    }

    /// Evento emitido ao mintar um NFT
    public struct Minted has copy, drop {
        object_id: ID,
        owner: address,
        name: String,
    }

    /// Função init — executada apenas uma vez ao publicar o pacote
    fun init(otw: NFT_MINTER, ctx: &mut TxContext) {
 
        let publisher = package::claim(otw, ctx);

        // Cria o Display para o tipo NFT
        let mut display = display::new<NFT>(&publisher, ctx);

        // Configura os campos do Display
        display::add(&mut display, utf8(b"name"), utf8(b"{name}"));
        display::add(&mut display, utf8(b"description"), utf8(b"{description}"));
        display::add(&mut display, utf8(b"image_url"), utf8(b"{image_url}"));

        display::update_version(&mut display);

        // Torna o Display um objeto compartilhado
        transfer::public_share_object(display);

        transfer::public_transfer(publisher, sender(ctx));
    }

    /// Função pública para mintar um NFT
    public entry fun mint(
        name: vector<u8>,
        description: vector<u8>,
        image_url: vector<u8>,
        ctx: &mut TxContext
    )       {
        let owner = sender(ctx);

        let nft = NFT {
            id: object::new(ctx),
            name: string::utf8(name),
            description: string::utf8(description),
            image_url: string::utf8(image_url),
        };

        let nft_id = object::id(&nft);

        event::emit(Minted {
            object_id: nft_id,
            owner,
            name: nft.name,
        });

        transfer::public_transfer(nft, owner);
    }
}

