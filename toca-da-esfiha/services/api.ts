import { MenuItem } from '../types';

const IMAGES = {
  esfihaCarne: 'https://images.unsplash.com/photo-1698864673891-628d3e8e970a?auto=format&fit=crop&q=80&w=800',
  esfihaQueijo: 'https://images.unsplash.com/photo-1698864673934-8b65225d33f7?auto=format&fit=crop&q=80&w=800',
  esfihaFrango: 'https://images.unsplash.com/photo-1605494458316-2915cb0b1156?auto=format&fit=crop&q=80&w=800', // Tom mais alaranjado/frango
  esfihaDoce: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&q=80&w=800', // Estilo pizza doce/chocolate
  miniPizza: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800',
  pizzaFamilia: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800',
  quibe: 'https://images.unsplash.com/photo-1599321955726-e04842d994e7?auto=format&fit=crop&q=80&w=800',
  pastel: 'https://plus.unsplash.com/premium_photo-1695126839352-25e227092925?auto=format&fit=crop&q=80&w=800',
  soda: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=800',
  water: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&q=80&w=800',
  juice: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80&w=800',
  beer: 'https://images.unsplash.com/photo-1605256486073-1ef9f1d24c0d?auto=format&fit=crop&q=80&w=800'
};

// Mock data based on the provided list
const MOCK_MENU_ITEMS: MenuItem[] = [
  // SALGADAS
  { id: '1', nome: 'CARNE', descricao: 'Carne moída temperada', preco: 8, categoria: 'salgadas', imagem_url: IMAGES.esfihaCarne, disponivel: true, tem_opcoes_sabor: false, ordem: 1, codigo: '1' },
  { id: '2', nome: 'CARNE COM QUEIJO', descricao: 'Carne moída e mussarela', preco: 9, categoria: 'salgadas', imagem_url: IMAGES.esfihaCarne, disponivel: true, tem_opcoes_sabor: false, ordem: 2, codigo: '2' },
  { id: '3', nome: 'CARNE, QUEIJO, CATUPIRY', descricao: 'Carne moída, mussarela e catupiry', preco: 10, categoria: 'salgadas', imagem_url: IMAGES.esfihaCarne, disponivel: true, tem_opcoes_sabor: false, ordem: 3, codigo: '3' },
  { id: '4', nome: 'CARNE, QUEIJO, CATUPIRY, BACON', descricao: 'Carne, queijo, catupiry e bacon', preco: 12, categoria: 'salgadas', imagem_url: IMAGES.esfihaCarne, disponivel: true, tem_opcoes_sabor: false, ordem: 4, codigo: '4' },
  { id: '5', nome: 'CARNE SECA C/ QUEIJO, BANANA, CATUPIRY', descricao: 'Carne seca desfiada, queijo, banana e catupiry', preco: 13, categoria: 'salgadas', imagem_url: IMAGES.esfihaCarne, disponivel: true, tem_opcoes_sabor: false, ordem: 5, codigo: '5' },
  { id: '6', nome: 'CARNE SECA COM BANANA', descricao: 'Carne seca desfiada com banana', preco: 11.5, categoria: 'salgadas', imagem_url: IMAGES.esfihaCarne, disponivel: true, tem_opcoes_sabor: false, ordem: 6, codigo: '6' },
  { id: '7', nome: 'FRANGO', descricao: 'Frango desfiado temperado', preco: 8, categoria: 'salgadas', imagem_url: IMAGES.esfihaFrango, disponivel: true, tem_opcoes_sabor: false, ordem: 7, codigo: '7' },
  { id: '8', nome: 'FRANGO C/ QUEIJO', descricao: 'Frango desfiado e mussarela', preco: 9, categoria: 'salgadas', imagem_url: IMAGES.esfihaFrango, disponivel: true, tem_opcoes_sabor: false, ordem: 8, codigo: '8' },
  { id: '9', nome: 'FRANGO, QUEIJO, CATUPIRY', descricao: 'Frango, mussarela e catupiry', preco: 10, categoria: 'salgadas', imagem_url: IMAGES.esfihaFrango, disponivel: true, tem_opcoes_sabor: false, ordem: 9, codigo: '9' },
  { id: '10', nome: 'FRANGO, BACON, MILHO, CATUPIRY', descricao: 'Frango, bacon, milho e catupiry', preco: 13, categoria: 'salgadas', imagem_url: IMAGES.esfihaFrango, disponivel: true, tem_opcoes_sabor: false, ordem: 10, codigo: '10' },
  { id: '11', nome: 'FRANGO, QUEIJO, MILHO, CATUPIRY', descricao: 'Frango, mussarela, milho e catupiry', preco: 12, categoria: 'salgadas', imagem_url: IMAGES.esfihaFrango, disponivel: true, tem_opcoes_sabor: false, ordem: 11, codigo: '11' },
  { id: '12', nome: 'CALABRESA, QUEIJO, ORÉGANO', descricao: 'Calabresa, mussarela e orégano', preco: 9, categoria: 'salgadas', imagem_url: IMAGES.esfihaQueijo, disponivel: true, tem_opcoes_sabor: false, ordem: 12, codigo: '12' },
  { id: '13', nome: 'CALABRESA, QUEIJO, CATUPIRY, ORÉGANO', descricao: 'Calabresa, queijo, catupiry e orégano', preco: 10, categoria: 'salgadas', imagem_url: IMAGES.esfihaQueijo, disponivel: true, tem_opcoes_sabor: false, ordem: 13, codigo: '13' },
  { id: '14', nome: 'QUEIJO, ORÉGANO', descricao: 'Mussarela e orégano', preco: 8.5, categoria: 'salgadas', imagem_url: IMAGES.esfihaQueijo, disponivel: true, tem_opcoes_sabor: false, ordem: 14, codigo: '14' },
  { id: '15', nome: 'QUEIJO, CATUPIRY, ORÉGANO', descricao: 'Mussarela, catupiry e orégano', preco: 9, categoria: 'salgadas', imagem_url: IMAGES.esfihaQueijo, disponivel: true, tem_opcoes_sabor: false, ordem: 15, codigo: '15' },
  { id: '16', nome: 'QUEIJO, MILHO, CATUPIRY, ORÉGANO', descricao: 'Mussarela, milho, catupiry e orégano', preco: 10, categoria: 'salgadas', imagem_url: IMAGES.esfihaQueijo, disponivel: true, tem_opcoes_sabor: false, ordem: 16, codigo: '16' },
  { id: '17', nome: 'QUEIJO, BACON', descricao: 'Mussarela e bacon', preco: 12, categoria: 'salgadas', imagem_url: IMAGES.esfihaQueijo, disponivel: true, tem_opcoes_sabor: false, ordem: 17, codigo: '17' },
  { id: '18', nome: 'MISTA', descricao: 'Queijo, presunto, calabresa, milho, catupiry', preco: 10, categoria: 'salgadas', imagem_url: IMAGES.esfihaQueijo, disponivel: true, tem_opcoes_sabor: false, ordem: 18, codigo: '18' },
  { id: '19', nome: 'SALAMINHO, QUEIJO, CATUPIRY, ORÉGANO', descricao: 'Salaminho, queijo, catupiry e orégano', preco: 12, categoria: 'salgadas', imagem_url: IMAGES.esfihaQueijo, disponivel: true, tem_opcoes_sabor: false, ordem: 19, codigo: '19' },
  { id: '20', nome: 'ATUM, QUEIJO, ORÉGANO', descricao: 'Atum, mussarela e orégano', preco: 12, categoria: 'salgadas', imagem_url: IMAGES.esfihaQueijo, disponivel: true, tem_opcoes_sabor: false, ordem: 20, codigo: '20' },
  { id: '21', nome: 'ATUM, QUEIJO, CATUPIRY, ORÉGANO', descricao: 'Atum, mussarela, catupiry e orégano', preco: 13, categoria: 'salgadas', imagem_url: IMAGES.esfihaQueijo, disponivel: true, tem_opcoes_sabor: false, ordem: 21, codigo: '21' },
  { id: '22', nome: 'CAMARÃO, QUEIJO, CATUPIRY, ORÉGANO', descricao: 'Camarão, mussarela, catupiry e orégano', preco: 15, categoria: 'salgadas', imagem_url: IMAGES.esfihaQueijo, disponivel: true, tem_opcoes_sabor: false, ordem: 22, codigo: '22' },

  // VEGETARIANAS
  { id: '23', nome: 'QUEIJO, TOMATE-SECO, CATUPIRY, ORÉGANO', descricao: 'Mussarela, tomate seco, catupiry e orégano', preco: 12, categoria: 'vegetarianas', imagem_url: IMAGES.esfihaQueijo, disponivel: true, tem_opcoes_sabor: false, ordem: 23, codigo: '23' },
  { id: '24', nome: 'QUEIJO, PALMITO, CATUPIRY, ORÉGANO', descricao: 'Mussarela, palmito, catupiry e orégano', preco: 12, categoria: 'vegetarianas', imagem_url: IMAGES.esfihaQueijo, disponivel: true, tem_opcoes_sabor: false, ordem: 24, codigo: '24' },
  { id: '25', nome: 'QUEIJO, ABOBRINHA, CATUPIRY, ALHO, ORÉGANO', descricao: 'Mussarela, abobrinha, catupiry, alho e orégano', preco: 12, categoria: 'vegetarianas', imagem_url: IMAGES.esfihaQueijo, disponivel: true, tem_opcoes_sabor: false, ordem: 25, codigo: '25' },

  // DOCES
  { id: '26', nome: 'ROMEU E JULIETA', descricao: 'Queijo e goiabada', preco: 9, categoria: 'doces', imagem_url: IMAGES.esfihaDoce, disponivel: true, tem_opcoes_sabor: false, ordem: 26, codigo: '26' },
  { id: '27', nome: 'DOCE DE LEITE', descricao: 'Doce de leite cremoso', preco: 9.5, categoria: 'doces', imagem_url: IMAGES.esfihaDoce, disponivel: true, tem_opcoes_sabor: false, ordem: 27, codigo: '27' },
  { id: '28', nome: 'NUTELLA', descricao: 'Creme de avelã Nutella', preco: 14, categoria: 'doces', imagem_url: IMAGES.esfihaDoce, disponivel: true, tem_opcoes_sabor: false, ordem: 28, codigo: '28' },
  { id: '29', nome: 'CHOCOLATE C/ GRANULADO', descricao: 'Chocolate ao leite com granulado', preco: 12, categoria: 'doces', imagem_url: IMAGES.esfihaDoce, disponivel: true, tem_opcoes_sabor: false, ordem: 29, codigo: '29' },
  { id: '30', nome: 'NUTELLA COM BANANA DA TERRA', descricao: 'Nutella e banana da terra frita', preco: 15, categoria: 'doces', imagem_url: IMAGES.esfihaDoce, disponivel: true, tem_opcoes_sabor: false, ordem: 30, codigo: '30' },

  // MINI-PIZZAS
  { id: '31', nome: 'Mini-Pizza FRANGO', descricao: 'Mussarela, milho, catupiry, orégano', preco: 23, categoria: 'mini-pizzas', imagem_url: IMAGES.miniPizza, disponivel: true, tem_opcoes_sabor: false, ordem: 31, codigo: 'MP1' },
  { id: '32', nome: 'Mini-Pizza QUEIJO', descricao: 'Mussarela, catupiry, azeitona, orégano', preco: 23, categoria: 'mini-pizzas', imagem_url: IMAGES.miniPizza, disponivel: true, tem_opcoes_sabor: false, ordem: 32, codigo: 'MP2' },
  { id: '33', nome: 'Mini-Pizza MILHO', descricao: 'Mussarela, catupiry, azeitona, orégano', preco: 23, categoria: 'mini-pizzas', imagem_url: IMAGES.miniPizza, disponivel: true, tem_opcoes_sabor: false, ordem: 33, codigo: 'MP3' },
  { id: '34', nome: 'Mini-Pizza MISTA', descricao: 'Mussarela, presunto, calabresa, milho, cebola, catupiry, orégano', preco: 25, categoria: 'mini-pizzas', imagem_url: IMAGES.miniPizza, disponivel: true, tem_opcoes_sabor: false, ordem: 34, codigo: 'MP4' },
  { id: '35', nome: 'Mini-Pizza CARNE SECA C/ BANANA', descricao: 'Mussarela e catupiry', preco: 25, categoria: 'mini-pizzas', imagem_url: IMAGES.miniPizza, disponivel: true, tem_opcoes_sabor: false, ordem: 35, codigo: 'MP5' },
  { id: '36', nome: 'Mini-Pizza PORTUGUESA', descricao: 'Mussarela, presunto, bacon, ovo, cebola, catupiry', preco: 25, categoria: 'mini-pizzas', imagem_url: IMAGES.miniPizza, disponivel: true, tem_opcoes_sabor: false, ordem: 36, codigo: 'MP6' },
  { id: '37', nome: 'Mini-Pizza CALABRESA', descricao: 'Queijo, catupiry, cebola e orégano', preco: 23, categoria: 'mini-pizzas', imagem_url: IMAGES.miniPizza, disponivel: true, tem_opcoes_sabor: false, ordem: 37, codigo: 'MP7' },

  // PIZZAS FAMÍLIA
  { id: '38', nome: 'Pizza Família FRANGO', descricao: 'Mussarela, milho, catupiry, orégano', preco: 80, categoria: 'familia', imagem_url: IMAGES.pizzaFamilia, disponivel: true, tem_opcoes_sabor: false, ordem: 38, codigo: 'PF1' },
  { id: '39', nome: 'Pizza Família QUEIJO', descricao: 'Mussarela, catupiry, azeitona, orégano', preco: 80, categoria: 'familia', imagem_url: IMAGES.pizzaFamilia, disponivel: true, tem_opcoes_sabor: false, ordem: 39, codigo: 'PF2' },
  { id: '40', nome: 'Pizza Família MILHO', descricao: 'Mussarela, catupiry, azeitona, orégano', preco: 80, categoria: 'familia', imagem_url: IMAGES.pizzaFamilia, disponivel: true, tem_opcoes_sabor: false, ordem: 40, codigo: 'PF3' },
  { id: '41', nome: 'Pizza Família MISTA', descricao: 'Mussarela, presunto, calabresa, milho, cebola, catupiry, orégano', preco: 90, categoria: 'familia', imagem_url: IMAGES.pizzaFamilia, disponivel: true, tem_opcoes_sabor: false, ordem: 41, codigo: 'PF4' },
  { id: '42', nome: 'Pizza Família CARNE SECA C/ BANANA', descricao: 'Mussarela e catupiry', preco: 97, categoria: 'familia', imagem_url: IMAGES.pizzaFamilia, disponivel: true, tem_opcoes_sabor: false, ordem: 42, codigo: 'PF5' },
  { id: '43', nome: 'Pizza Família PORTUGUESA', descricao: 'Mussarela, presunto, bacon, ovo, cebola, catupiry', preco: 98, categoria: 'familia', imagem_url: IMAGES.pizzaFamilia, disponivel: true, tem_opcoes_sabor: false, ordem: 43, codigo: 'PF6' },
  { id: '44', nome: 'Pizza Família CALABRESA', descricao: 'Queijo, catupiry, cebola e orégano', preco: 85, categoria: 'familia', imagem_url: IMAGES.pizzaFamilia, disponivel: true, tem_opcoes_sabor: false, ordem: 44, codigo: 'PF7' },

  // QUIBES E PASTÉIS
  { id: '45', nome: 'QUIBE TRADICIONAL', descricao: '', preco: 12, categoria: 'quibes', imagem_url: IMAGES.quibe, disponivel: true, tem_opcoes_sabor: false, ordem: 45, codigo: 'QP1' },
  { id: '46', nome: 'QUIBE C/ QUEIJO', descricao: '', preco: 14, categoria: 'quibes', imagem_url: IMAGES.quibe, disponivel: true, tem_opcoes_sabor: false, ordem: 46, codigo: 'QP2' },
  { id: '47', nome: 'QUIBE C/ QUEIJO E CATUPIRY', descricao: '', preco: 15, categoria: 'quibes', imagem_url: IMAGES.quibe, disponivel: true, tem_opcoes_sabor: false, ordem: 47, codigo: 'QP3' },
  { id: '48', nome: 'PASTEL DE CARNE', descricao: '', preco: 12, categoria: 'quibes', imagem_url: IMAGES.pastel, disponivel: true, tem_opcoes_sabor: false, ordem: 48, codigo: 'QP4' },
  { id: '49', nome: 'PASTEL DE FRANGO', descricao: '', preco: 12, categoria: 'quibes', imagem_url: IMAGES.pastel, disponivel: true, tem_opcoes_sabor: false, ordem: 49, codigo: 'QP5' },
  { id: '50', nome: 'PASTEL DE QUEIJO', descricao: '', preco: 12, categoria: 'quibes', imagem_url: IMAGES.pastel, disponivel: true, tem_opcoes_sabor: false, ordem: 50, codigo: 'QP6' },
  { id: '51', nome: 'PASTEL DE CARNE C/ QUEIJO', descricao: '', preco: 13, categoria: 'quibes', imagem_url: IMAGES.pastel, disponivel: true, tem_opcoes_sabor: false, ordem: 51, codigo: 'QP7' },
  { id: '52', nome: 'PASTEL DE FRANGO C/ QUEIJO', descricao: '', preco: 13, categoria: 'quibes', imagem_url: IMAGES.pastel, disponivel: true, tem_opcoes_sabor: false, ordem: 52, codigo: 'QP8' },
  { id: '53', nome: 'PASTEL DE CARNE SECA', descricao: 'Queijo, Banana da Terra e Catupiry', preco: 18, categoria: 'quibes', imagem_url: IMAGES.pastel, disponivel: true, tem_opcoes_sabor: false, ordem: 53, codigo: 'QP9' },
  { id: '54', nome: 'PASTEL DE NUTELLA', descricao: 'Com Banana da Terra', preco: 20, categoria: 'quibes', imagem_url: IMAGES.pastel, disponivel: true, tem_opcoes_sabor: false, ordem: 54, codigo: 'QP10' },

  // BEBIDAS
  { id: '55', nome: 'Refrigerante Lata', descricao: '350ml', preco: 9, categoria: 'bebidas', imagem_url: IMAGES.soda, disponivel: true, tem_opcoes_sabor: true, opcoes_sabor: ["Coca-Cola","Guaraná","Sprite/Soda","Fanta"], ordem: 55, codigo: 'BEB1' },
  { id: '56', nome: 'Refrigerante KS 290ml', descricao: '', preco: 8, categoria: 'bebidas', imagem_url: IMAGES.soda, disponivel: true, tem_opcoes_sabor: false, ordem: 56, codigo: 'BEB2' },
  { id: '57', nome: 'Água Mineral sem Gás 500ml', descricao: '', preco: 5, categoria: 'bebidas', imagem_url: IMAGES.water, disponivel: true, tem_opcoes_sabor: false, ordem: 57, codigo: 'BEB3' },
  { id: '58', nome: 'Água Mineral C/Gás 500ml', descricao: '', preco: 6, categoria: 'bebidas', imagem_url: IMAGES.water, disponivel: true, tem_opcoes_sabor: false, ordem: 58, codigo: 'BEB4' },
  { id: '59', nome: 'Água Mineral Aquarius Fresh', descricao: '', preco: 9, categoria: 'bebidas', imagem_url: IMAGES.soda, disponivel: true, tem_opcoes_sabor: false, ordem: 59, codigo: 'BEB5' },
  { id: '60', nome: 'Suco de Polpa 500ml', descricao: '', preco: 12.5, categoria: 'bebidas', imagem_url: IMAGES.juice, disponivel: true, tem_opcoes_sabor: true, opcoes_sabor: ["Graviola","Cacau","Cajá","Cupuaçu","Maracujá","Manga"], ordem: 60, codigo: 'BEB6' },
  { id: '61', nome: 'Suco de Polpa 1L', descricao: '', preco: 25, categoria: 'bebidas', imagem_url: IMAGES.juice, disponivel: true, tem_opcoes_sabor: true, opcoes_sabor: ["Graviola","Cacau","Cajá","Cupuaçu","Maracujá","Manga"], ordem: 61, codigo: 'BEB7' },
  { id: '62', nome: 'Corona Long Neck', descricao: '', preco: 13, categoria: 'bebidas', imagem_url: IMAGES.beer, disponivel: true, tem_opcoes_sabor: false, ordem: 62, codigo: 'BEB8' }
];

// Mimicking the base44 client structure provided in the prompt
export const base44 = {
  entities: {
    MenuItem: {
      filter: async (_query: any, _orderBy: string, _limit: number): Promise<MenuItem[]> => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));
        return MOCK_MENU_ITEMS;
      }
    }
  }
};