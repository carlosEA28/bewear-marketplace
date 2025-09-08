export const formatAddress = (address: {
  recipientName: string;
  street: string;
  number: string;
  complement: string | null;
  neighborhood: string;
  city: string;
  state: string;
}) => {
  let formattedAddress = `${address.recipientName}, ${address.street}, ${address.number}`;

  if (address.complement) {
    formattedAddress += `, ${address.complement}`;
  }

  formattedAddress += `, ${address.neighborhood}, ${address.city} - ${address.state}`;

  return formattedAddress;
};
