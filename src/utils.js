// src/utils.js

/**
 * Cria uma URL simulada para navegação entre páginas/rotas.
 * Em um ambiente real com React Router, esta função pode apenas retornar o nome da rota,
 * mas a lógica nos seus componentes sugere que ela cria uma string de URL.
 */
export function createPageUrl(pageName, params = {}) {
  const url = `/${pageName}`;
  const query = new URLSearchParams(params).toString();
  return query ? `${url}?${query}` : url;
}