type NFTCardProps = {
  name: string;
  description: string;
  image: string;
};

export function NFTCard({ name, description, image }: NFTCardProps) {
  return (
    <div className="nft-card">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>{description}</p>
    </div>
  );
}
