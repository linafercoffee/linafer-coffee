-- ==========================================================================
-- SCRIPT DE CRIAÇÃO DE TABELAS - VENDAGEST
-- Copie todo este script e cole no menu "SQL Editor" -> "New Query" do painel
-- do seu projeto Supabase, depois clique em "Run" para criar o banco de dados.
-- ==========================================================================

-- 1. TABELA DE CLIENTES
CREATE TABLE IF NOT EXISTS clientes (
    id TEXT PRIMARY KEY,
    nome TEXT NOT NULL,
    razao TEXT,
    documento TEXT,
    telefone TEXT NOT NULL,
    segmento TEXT NOT NULL,
    endereco TEXT,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. TABELA DE FORNECECORES
CREATE TABLE IF NOT EXISTS fornecedores (
    id TEXT PRIMARY KEY,
    nome TEXT NOT NULL,
    contato TEXT,
    telefone TEXT NOT NULL,
    insumos TEXT NOT NULL,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. TABELA DE PEDIDOS
CREATE TABLE IF NOT EXISTS pedidos (
    id TEXT PRIMARY KEY,
    cliente_id TEXT NOT NULL REFERENCES clientes(id) ON DELETE CASCADE,
    cliente_nome TEXT NOT NULL,
    itens JSONB NOT NULL,
    subtotal NUMERIC(10, 2) NOT NULL,
    desconto NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    total NUMERIC(10, 2) NOT NULL,
    status TEXT NOT NULL DEFAULT 'pedido feito',
    pagamento TEXT NOT NULL,
    data DATE NOT NULL,
    data_status_update DATE,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. TABELA FINANCEIRA (FLUXO DE CAIXA)
CREATE TABLE IF NOT EXISTS financeiro (
    id TEXT PRIMARY KEY,
    tipo TEXT NOT NULL CHECK (tipo IN ('entrada', 'saida')),
    descricao TEXT NOT NULL,
    valor NUMERIC(10, 2) NOT NULL,
    data DATE NOT NULL,
    fornecedor_id TEXT REFERENCES fornecedores(id) ON DELETE SET NULL,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- HABILITAR CONTROLE DE ACESSO (Opcional - por simplicidade de teste inicial,
-- desabilitaremos ou permitiremos leitura/gravação anônima.
-- O Supabase já permite bypass RLS por padrão para novas tabelas se não habilitarmos RLS).

-- INSERT DE DADOS MOCK INICIAIS (Apenas se as tabelas estiverem vazias)
-- (Evita duplicidade ao rodar o script mais de uma vez)

INSERT INTO clientes (id, nome, razao, documento, telefone, segmento, endereco)
VALUES 
('c1', 'Cafeteria Santo Grão', 'Santo Grão Cafés Especiais LTDA', '12.345.678/0001-90', '(11) 98765-4321', 'Cafeteria', 'Av. Paulista, 1500 - Bela Vista, São Paulo - SP'),
('c2', 'Padaria Bella Vista', 'Panificadora Bella Vista EIRELI', '98.765.432/0001-10', '(11) 97654-3210', 'Padaria', 'Rua Treze de Maio, 450 - Bixiga, São Paulo - SP'),
('c3', 'Restaurante Sabor & Cia', 'Restaurante e Lanchonete Sabor LTDA', '45.678.901/0001-22', '(11) 96543-2109', 'Restaurante', 'Rua Augusta, 820 - Consolação, São Paulo - SP')
ON CONFLICT (id) DO NOTHING;

INSERT INTO fornecedores (id, nome, contato, telefone, insumos)
VALUES 
('f1', 'Fazenda Aliança Alta Mogiana', 'Carlos Fazendeiro', '(35) 99888-7766', 'Café verde, café torrado em grãos'),
('f2', 'EcoEmbalagens S.A.', 'Mariana Vendas', '(11) 95544-3322', 'Copos, filtros de papel, sacolas biodegradáveis'),
('f3', 'Laticínios Sul de Minas', 'Roberto Logística', '(31) 96677-8899', 'Leite tipo exportação, creme de leite, manteiga')
ON CONFLICT (id) DO NOTHING;

INSERT INTO pedidos (id, cliente_id, cliente_name, itens, subtotal, desconto, total, status, pagamento, data, data_status_update)
VALUES 
('o1', 'c1', 'Cafeteria Santo Grão', '[{"produtoId":"p1","nome":"Café Espresso Blend 1kg","quantidade":5,"preco":85.00}]'::jsonb, 425.00, 25.00, 400.00, 'entregue', 'Pix', '2026-06-10', '2026-06-11')
ON CONFLICT (id) DO NOTHING;
-- Fallback caso o cliente_nome seja mapeado de forma diferente
UPDATE pedidos SET cliente_nome = 'Cafeteria Santo Grão' WHERE id = 'o1';

INSERT INTO pedidos (id, cliente_id, cliente_name, itens, subtotal, desconto, total, status, pagamento, data, data_status_update)
VALUES 
('o2', 'c2', 'Padaria Bella Vista', '[{"produtoId":"p2","nome":"Café Gourmet Mogiana 250g","quantidade":10,"preco":28.90},{"produtoId":"p4","nome":"Leite Integral Barista 1L","quantidade":24,"preco":7.50}]'::jsonb, 469.00, 0.00, 469.00, 'faturado', 'Boleto 15 dias', '2026-06-12', '2026-06-13')
ON CONFLICT (id) DO NOTHING;
UPDATE pedidos SET cliente_nome = 'Padaria Bella Vista' WHERE id = 'o2';

INSERT INTO pedidos (id, cliente_id, cliente_name, itens, subtotal, desconto, total, status, pagamento, data, data_status_update)
VALUES 
('o3', 'c3', 'Restaurante Sabor & Cia', '[{"produtoId":"p1","nome":"Café Espresso Blend 1kg","quantidade":2,"preco":85.00},{"produtoId":"p5","nome":"Copo Descartável Biodegradável 200ml (100un)","quantidade":2,"preco":35.00}]'::jsonb, 240.00, 10.00, 230.00, 'pedido feito', 'Cartão de Crédito', '2026-06-14', '2026-06-14')
ON CONFLICT (id) DO NOTHING;
UPDATE pedidos SET cliente_nome = 'Restaurante Sabor & Cia' WHERE id = 'o3';

INSERT INTO financeiro (id, tipo, descricao, valor, data, fornecedor_id)
VALUES 
('t1', 'entrada', 'Faturamento Pedido #o1 - Cafeteria Santo Grão', 400.00, '2026-06-11', NULL),
('t2', 'saida', 'Compra de Insumos - Fazenda Aliança', 850.00, '2026-06-08', 'f1'),
('t3', 'entrada', 'Faturamento Pedido #o2 - Padaria Bella Vista', 469.00, '2026-06-13', NULL),
('t4', 'saida', 'Compra de Copos Biodegradáveis - EcoEmbalagens', 350.00, '2026-06-09', 'f2')
ON CONFLICT (id) DO NOTHING;
