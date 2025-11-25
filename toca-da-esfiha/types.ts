export interface MenuItem {
  id: string;
  nome: string;
  descricao?: string;
  preco: number;
  categoria: string;
  imagem_url: string;
  disponivel: boolean;
  tem_opcoes_sabor: boolean;
  opcoes_sabor?: string[];
  ordem?: number;
  codigo?: string;
}

export interface CartItem extends MenuItem {
  quantidade: number;
  sabor?: string;
  cartItemId: string;
}

export interface Category {
  id: string;
  name: string;
  emoji: string;
}