export async function uploadNFT(
  file: File,
  name: string,
  description: string
): Promise<string> {
  const formData = new FormData();

  formData.append("file", file);
  formData.append(
    "metadata",
    JSON.stringify({
      name,
      description,
    })
  );

  const res = await fetch("https://api.nft.storage/upload", {
    method: "POST",
    headers: {
      Authorization: `Bearer 1d28789d.6e3b815c9b2e493abaebc6c4d44961d9`,
    },
    body: formData,
  });

  const json = await res.json();

  // URL da imagem no IPFS
  return `https://ipfs.io/ipfs/${json.value.cid}`;
}
