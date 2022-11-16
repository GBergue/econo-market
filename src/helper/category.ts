export function getImageSource(categoryName: string) {
  
  if (categoryName === 'Bebidas')           return require('../../assets/bebidas-sem-fundo.png');
  if (categoryName === 'Carnes')            return require('../../assets/carnes-sem-fundo.png');
  if (categoryName === 'Mercearia')         return require('../../assets/mercearia-sem-fundo.png');
  if (categoryName === 'Cereais')           return require('../../assets/cereais-sem-fundo.png');
  if (categoryName === 'Doces')             return require('../../assets/doces-sem-fundo.png');
  if (categoryName === 'Hortifruti')        return require('../../assets/hortifruti-sem-fundo.png');
  if (categoryName === 'Limpeza')           return require('../../assets/limpeza-sem-fundo.png');
  if (categoryName === 'Jardinagem')        return require('../../assets/plantas-sem-fundo.png');
  if (categoryName === 'Outros')            return require('../../assets/outros-sem-fundo.png');
  if (categoryName === 'Frios')             return require('../../assets/frios-sem-fundo.png');
  if (categoryName === 'Laticínios')        return require('../../assets/laticinios-sem-fundo.png');
  if (categoryName === 'Padaria')           return require('../../assets/padaria-sem-fundo.png');
  if (categoryName === 'Higiene e Beleza')  return require('../../assets/higiene-beleza-sem-fundo.png');
  if (categoryName === 'Pet-Shop')          return require('../../assets/petshop-sem-fundo.png');

  return null;
}