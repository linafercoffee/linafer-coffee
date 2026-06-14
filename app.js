// ==========================================================================
// Banco de Dados Local Inicial (Dados Mock)
// ==========================================================================

const PRODUTOS_MOCK = [
    { id: 'p1', nome: 'Café Espresso Blend 1kg', preco: 85.00, categoria: 'Café', icone: '☕' },
    { id: 'p2', nome: 'Café Gourmet Mogiana 250g', preco: 28.90, categoria: 'Café', icone: '☕' },
    { id: 'p3', nome: 'Filtro de Papel Hario V60 (100un)', preco: 45.00, categoria: 'Acessórios', icone: '📄' },
    { id: 'p4', nome: 'Leite Integral Barista 1L', preco: 7.50, categoria: 'Insumos', icone: '🥛' },
    { id: 'p5', nome: 'Copo Descartável Biodegradável 200ml (100un)', preco: 35.00, categoria: 'Embalagens', icone: '🥤' },
    { id: 'p6', nome: 'Xarope de Baunilha p/ Soda/Café 700ml', preco: 62.00, categoria: 'Insumos', icone: '🧪' },
    { id: 'p7', nome: 'Prensa Francesa Clássica 600ml', preco: 120.00, categoria: 'Acessórios', icone: '🏺' }
];

const CLIENTES_INICIAIS = [
    { id: 'c1', nome: 'Cafeteria Santo Grão', razao: 'Santo Grão Cafés Especiais LTDA', documento: '12.345.678/0001-90', telefone: '(11) 98765-4321', segmento: 'Cafeteria', endereco: 'Av. Paulista, 1500 - Bela Vista, São Paulo - SP' },
    { id: 'c2', nome: 'Padaria Bella Vista', razao: 'Panificadora Bella Vista EIRELI', documento: '98.765.432/0001-10', telefone: '(11) 97654-3210', segmento: 'Padaria', endereco: 'Rua Treze de Maio, 450 - Bixiga, São Paulo - SP' },
    { id: 'c3', nome: 'Restaurante Sabor & Cia', razao: 'Restaurante e Lanchonete Sabor LTDA', documento: '45.678.901/0001-22', telefone: '(11) 96543-2109', segmento: 'Restaurante', endereco: 'Rua Augusta, 820 - Consolação, São Paulo - SP' }
];

const FORNECEDORES_INICIAIS = [
    { id: 'f1', nome: 'Fazenda Aliança Alta Mogiana', contato: 'Carlos Fazendeiro', telefone: '(35) 99888-7766', insumos: 'Café verde, café torrado em grãos' },
    { id: 'f2', nome: 'EcoEmbalagens S.A.', contato: 'Mariana Vendas', telefone: '(11) 95544-3322', insumos: 'Copos, filtros de papel, sacolas biodegradáveis' },
    { id: 'f3', nome: 'Laticínios Sul de Minas', contato: 'Roberto Logística', telefone: '(31) 96677-8899', insumos: 'Leite tipo exportação, creme de leite, manteiga' }
];

const PEDIDOS_INICIAIS = [
    { id: 'o1', clienteId: 'c1', clienteNome: 'Cafeteria Santo Grão', itens: [{ produtoId: 'p1', nome: 'Café Espresso Blend 1kg', quantidade: 5, preco: 85.00 }], subtotal: 425.00, desconto: 25.00, total: 400.00, status: 'entregue', pagamento: 'Pix', data: '2026-06-10', dataStatusUpdate: '2026-06-11' },
    { id: 'o2', clienteId: 'c2', clienteNome: 'Padaria Bella Vista', itens: [{ produtoId: 'p2', nome: 'Café Gourmet Mogiana 250g', quantidade: 10, preco: 28.90 }, { produtoId: 'p4', nome: 'Leite Integral Barista 1L', quantidade: 24, preco: 7.50 }], subtotal: 469.00, desconto: 0.00, total: 469.00, status: 'faturado', pagamento: 'Boleto 15 dias', data: '2026-06-12', dataStatusUpdate: '2026-06-13' },
    { id: 'o3', clienteId: 'c3', clienteNome: 'Restaurante Sabor & Cia', itens: [{ produtoId: 'p1', nome: 'Café Espresso Blend 1kg', quantidade: 2, preco: 85.00 }, { produtoId: 'p5', nome: 'Copo Descartável Biodegradável 200ml (100un)', quantidade: 2, preco: 35.00 }], subtotal: 240.00, desconto: 10.00, total: 230.00, status: 'pedido feito', pagamento: 'Cartão de Crédito', data: '2026-06-14', dataStatusUpdate: '2026-06-14' }
];

const FINANCEIRO_INICIAL = [
    { id: 't1', tipo: 'entrada', descricao: 'Faturamento Pedido #o1 - Cafeteria Santo Grão', valor: 400.00, data: '2026-06-11', fornecedorId: '' },
    { id: 't2', tipo: 'saida', descricao: 'Compra de Insumos - Fazenda Aliança', valor: 850.00, data: '2026-06-08', fornecedorId: 'f1' },
    { id: 't3', tipo: 'entrada', descricao: 'Faturamento Pedido #o2 - Padaria Bella Vista', valor: 469.00, data: '2026-06-13', fornecedorId: '' },
    { id: 't4', tipo: 'saida', descricao: 'Compra de Copos Biodegradáveis - EcoEmbalagens', valor: 350.00, data: '2026-06-09', fornecedorId: 'f2' }
];

// ==========================================================================
// Estado Global do Aplicativo
// ==========================================================================

let appState = {
    clientes: [],
    fornecedores: [],
    pedidos: [],
    financeiro: [],
    carrinho: {},
    perfilAtivo: 'vendedor',
    telaAtiva: 'dashboard',
    clienteSelecionadoId: null,
    clienteLogadoId: null // ID do cliente ativo na simulação do portal (Fase 3)
};

// ==========================================================================
// Funções de Inicialização e Persistência
// ==========================================================================

function initApp() {
    // Carregar dados salvos ou usar dados padrão
    if (localStorage.getItem('vendagest_db')) {
        try {
            appState = JSON.parse(localStorage.getItem('vendagest_db'));
            // Inicializar carrinho vazio se não houver
            appState.carrinho = appState.carrinho || {};
        } catch (e) {
            console.error('Erro ao ler banco de dados do localStorage, reiniciando dados...', e);
            setupDefaultState();
        }
    } else {
        setupDefaultState();
    }
    
    // Configurar manipuladores globais de eventos
    setupEventListeners();
    
    // Atualizar UI Inicial
    setPerfilAtivo(appState.perfilAtivo || 'vendedor');
    switchView(appState.telaAtiva || 'dashboard');
    
    // Aplicar a data de hoje no modal de despesa
    document.getElementById('despesa-data').value = new Date().toISOString().split('T')[0];
}

function setupDefaultState() {
    appState.clientes = [...CLIENTES_INICIAIS];
    appState.fornecedores = [...FORNECEDORES_INICIAIS];
    appState.pedidos = [...PEDIDOS_INICIAIS];
    appState.financeiro = [...FINANCEIRO_INICIAL];
    appState.carrinho = {};
    appState.perfilAtivo = 'vendedor';
    appState.telaAtiva = 'dashboard';
    saveState();
}

function saveState() {
    localStorage.setItem('vendagest_db', JSON.stringify(appState));
}

// ==========================================================================
// Roteamento e Controle de Visualização (Navegação)
// ==========================================================================

function setupEventListeners() {
    // Menu Hamburguer Mobile
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });

    // Fechar sidebar ao clicar fora em telas pequenas
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && !sidebar.contains(e.target) && e.target !== menuToggle && !menuToggle.contains(e.target)) {
            sidebar.classList.remove('active');
        }
    });

    // Navegação Lateral
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const target = item.getAttribute('data-target');
            
            // Fechar sidebar mobile
            sidebar.classList.remove('active');
            
            switchView(target);
        });
    });

    // Seletor de Perfil
    const profileSelect = document.getElementById('profile-select');
    profileSelect.addEventListener('change', (e) => {
        setPerfilAtivo(e.target.value);
    });

    // Form Submits
    document.getElementById('form-cliente').addEventListener('submit', handleClienteSubmit);
    document.getElementById('form-fornecedor').addEventListener('submit', handleFornecedorSubmit);
    document.getElementById('form-despesa').addEventListener('submit', handleDespesaSubmit);

    // Seletor de Sessão do Cliente (Fase 3)
    const clienteSessionSelect = document.getElementById('cliente-session-select');
    clienteSessionSelect.addEventListener('change', (e) => {
        appState.clienteLogadoId = e.target.value;
        saveState();
        updateClienteProfileSidebar();
        renderCurrentView();
    });
}

function updateClienteProfileSidebar() {
    const userDisplayName = document.getElementById('user-display-name');
    const userDisplayRole = document.getElementById('user-display-role');
    const userAvatar = document.getElementById('user-avatar');
    
    const cliente = appState.clientes.find(c => c.id === appState.clienteLogadoId);
    if (cliente) {
        userDisplayName.innerText = cliente.nome;
        userDisplayRole.innerText = 'Portal do Cliente (Linafer)';
        userAvatar.innerText = cliente.nome.substring(0, 2).toUpperCase();
        userAvatar.style.backgroundColor = 'var(--color-primary)';
    }
}

function setPerfilAtivo(perfil) {
    appState.perfilAtivo = perfil;
    saveState();
    
    document.getElementById('profile-select').value = perfil;
    
    const userDisplayName = document.getElementById('user-display-name');
    const userDisplayRole = document.getElementById('user-display-role');
    const userAvatar = document.getElementById('user-avatar');
    const clienteSessionContainer = document.getElementById('cliente-session-container');
    
    if (perfil === 'cliente') {
        // Exibir seletor de cliente ativo no header
        clienteSessionContainer.style.display = 'flex';
        
        // Popular o seletor com a lista de clientes
        const select = document.getElementById('cliente-session-select');
        select.innerHTML = appState.clientes.map(c => `<option value="${c.id}">${c.nome}</option>`).join('');
        
        // Definir cliente logado inicial se necessário
        if (!appState.clienteLogadoId || !appState.clientes.some(c => c.id === appState.clienteLogadoId)) {
            appState.clienteLogadoId = appState.clientes.length > 0 ? appState.clientes[0].id : null;
        }
        select.value = appState.clienteLogadoId;
        
        // Atualizar profile na barra lateral
        updateClienteProfileSidebar();
    } else {
        // Ocultar seletor de cliente ativo
        clienteSessionContainer.style.display = 'none';
        appState.clienteLogadoId = null;
        
        if (perfil === 'vendedor') {
            userDisplayName.innerText = 'Bruno Vendedor';
            userDisplayRole.innerText = 'Vendedor Externo';
            userAvatar.innerText = 'B';
            userAvatar.style.backgroundColor = 'var(--color-primary)';
        } else if (perfil === 'producao') {
            userDisplayName.innerText = 'Marcos Produção';
            userDisplayRole.innerText = 'Chefe de Produção';
            userAvatar.innerText = 'M';
            userAvatar.style.backgroundColor = 'var(--color-info)';
        } else if (perfil === 'gestor') {
            userDisplayName.innerText = 'Aline Gestora';
            userDisplayRole.innerText = 'Administrador Geral';
            userAvatar.innerText = 'A';
            userAvatar.style.backgroundColor = 'var(--color-success)';
        }
    }
    
    // Ajustar opções visíveis do menu dependendo do perfil
    adjustNavigationMenu(perfil);
    
    // Se a tela ativa não for mais permitida, mover para a tela padrão permitida
    const navItem = document.querySelector(`.nav-item[data-target="${appState.telaAtiva}"]`);
    if (!navItem || navItem.style.display === 'none') {
        if (perfil === 'producao') {
            switchView('pedidos-kanban');
        } else if (perfil === 'cliente') {
            switchView('cliente-pedidos');
        } else {
            switchView('dashboard');
        }
    } else {
        // Apenas re-renderizar a tela atual com as permissões atualizadas
        renderCurrentView();
    }
}

function adjustNavigationMenu(perfil) {
    const navDashboard = document.querySelector('.nav-item[data-target="dashboard"]');
    const navClientes = document.querySelector('.nav-item[data-target="clientes"]');
    const navFornecedores = document.querySelector('.nav-item[data-target="fornecedores"]');
    const navNovoPedido = document.querySelector('.nav-item[data-target="novo-pedido"]');
    const navKanban = document.querySelector('.nav-item[data-target="pedidos-kanban"]');
    const navFinanceiro = document.querySelector('.nav-item[data-target="financeiro"]');
    const navClienteCatalogo = document.querySelector('.nav-item[data-target="cliente-catalogo"]');
    const navClientePedidos = document.querySelector('.nav-item[data-target="cliente-pedidos"]');

    // Reset visibility
    navDashboard.style.display = 'flex';
    navClientes.style.display = 'flex';
    navFornecedores.style.display = 'flex';
    navNovoPedido.style.display = 'flex';
    navKanban.style.display = 'flex';
    navFinanceiro.style.display = 'flex';
    navClienteCatalogo.style.display = 'none';
    navClientePedidos.style.display = 'none';

    if (perfil === 'vendedor') {
        // Vendedor externo focado em visitas, clientes e vendas
        navFornecedores.style.display = 'none'; // Não gerencia fornecedores
        navFinanceiro.style.display = 'none';   // Não gerencia fluxo de caixa direto
    } else if (perfil === 'producao') {
        // Produção focada no kanban
        navDashboard.style.display = 'none';
        navClientes.style.display = 'none';
        navFornecedores.style.display = 'none';
        navNovoPedido.style.display = 'none';
        navFinanceiro.style.display = 'none';
    } else if (perfil === 'cliente') {
        // Cliente vê apenas o catálogo e o acompanhamento de pedidos dele
        navDashboard.style.display = 'none';
        navClientes.style.display = 'none';
        navFornecedores.style.display = 'none';
        navNovoPedido.style.display = 'none';
        navKanban.style.display = 'none';
        navFinanceiro.style.display = 'none';
        
        navClienteCatalogo.style.display = 'flex';
        navClientePedidos.style.display = 'flex';
    }
}

function switchView(target) {
    appState.telaAtiva = target;
    saveState();
    
    // Atualizar classe ativa na sidebar
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        if (item.getAttribute('data-target') === target) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    
    // Atualizar título do Header
    const pageTitle = document.getElementById('page-title');
    const titles = {
        'dashboard': 'Dashboard de Vendas',
        'clientes': 'Gerenciamento de Clientes',
        'fornecedores': 'Controle de Fornecedores',
        'novo-pedido': 'Lançar Novo Pedido',
        'pedidos-kanban': 'Fluxo & Status de Pedidos',
        'financeiro': 'Fluxo de Caixa & Financeiro',
        'cliente-detalhes': 'Ficha Detalhada do Cliente',
        'cliente-catalogo': 'Catálogo - Fazer Pedido',
        'cliente-pedidos': 'Acompanhar Meus Pedidos'
    };
    pageTitle.innerText = titles[target] || 'Sistema';
    
    // Renderizar
    renderCurrentView();
}

function renderCurrentView() {
    const container = document.getElementById('app-content');
    container.innerHTML = ''; // Limpar container
    
    switch (appState.telaAtiva) {
        case 'dashboard':
            renderDashboard(container);
            break;
        case 'clientes':
            renderClientes(container);
            break;
        case 'fornecedores':
            renderFornecedores(container);
            break;
        case 'novo-pedido':
            renderNovoPedido(container);
            break;
        case 'pedidos-kanban':
            renderPedidosKanban(container);
            break;
        case 'financeiro':
            renderFinanceiro(container);
            break;
        case 'cliente-detalhes':
            renderClienteDetalhes(container, appState.clienteSelecionadoId);
            break;
        case 'cliente-catalogo':
            renderClienteCatalogo(container);
            break;
        case 'cliente-pedidos':
            renderClientePedidos(container);
            break;
        default:
            container.innerHTML = `<h2>Página não encontrada</h2>`;
    }
    
    // Inicializar os ícones do Lucide após renderizar o HTML dinâmico
    lucide.createIcons();
}

// ==========================================================================
// TELA: Dashboard
// ==========================================================================

function renderDashboard(container) {
    // Cálculos dos KPIs
    const faturamentoTotal = appState.pedidos
        .filter(p => p.status === 'faturado' || p.status === 'entregue')
        .reduce((sum, p) => sum + p.total, 0);
        
    const entradas = appState.financeiro
        .filter(t => t.tipo === 'entrada')
        .reduce((sum, t) => sum + t.valor, 0);
        
    const despesas = appState.financeiro
        .filter(t => t.tipo === 'saida')
        .reduce((sum, t) => sum + t.valor, 0);
        
    const saldoLiquido = entradas - despesas;
    
    const totalPedidos = appState.pedidos.length;
    const totalClientes = appState.clientes.length;

    // Pedidos por Status
    const countStatus = (status) => appState.pedidos.filter(p => p.status === status).length;
    const statusFelt = countStatus('pedido feito');
    const statusProd = countStatus('producao');
    const statusFat = countStatus('faturado');
    const statusEnv = countStatus('enviado');
    const statusEnt = countStatus('entregue');

    const maxStatusVal = Math.max(statusFelt, statusProd, statusFat, statusEnv, statusEnt, 1);

    container.innerHTML = `
        <!-- Dashboard Grid KPIs -->
        <div class="dashboard-grid">
            <div class="card kpi-card kpi-primary">
                <div class="kpi-info">
                    <span class="kpi-title">Faturamento Emitido</span>
                    <span class="kpi-value">R$ ${faturamentoTotal.toFixed(2)}</span>
                </div>
                <div class="kpi-icon"><i data-lucide="receipt"></i></div>
            </div>
            
            <div class="card kpi-card kpi-success">
                <div class="kpi-info">
                    <span class="kpi-title">Fluxo de Caixa (Entradas)</span>
                    <span class="kpi-value">R$ ${entradas.toFixed(2)}</span>
                </div>
                <div class="kpi-icon"><i data-lucide="trending-up"></i></div>
            </div>

            <div class="card kpi-card kpi-danger">
                <div class="kpi-info">
                    <span class="kpi-title">Despesas (Saídas)</span>
                    <span class="kpi-value">R$ ${despesas.toFixed(2)}</span>
                </div>
                <div class="kpi-icon"><i data-lucide="trending-down"></i></div>
            </div>

            <div class="card kpi-card kpi-info-theme">
                <div class="kpi-info">
                    <span class="kpi-title">Total de Pedidos</span>
                    <span class="kpi-value">${totalPedidos}</span>
                </div>
                <div class="kpi-icon"><i data-lucide="shopping-bag"></i></div>
            </div>
        </div>

        <!-- Dashboard Charts & Tables -->
        <div class="dashboard-charts">
            <!-- Balanço Financeiro -->
            <div class="card chart-card">
                <h3>Balanço do Fluxo de Caixa</h3>
                <div class="financial-bars-container">
                    <div class="financial-bar-row">
                        <div class="bar-label">
                            <span>Entradas Realizadas</span>
                            <span>R$ ${entradas.toFixed(2)} (${entradas + despesas > 0 ? ((entradas / (entradas + despesas)) * 100).toFixed(0) : 0}%)</span>
                        </div>
                        <div class="bar-bg">
                            <div class="bar-fill entrada" style="width: ${entradas + despesas > 0 ? (entradas / (entradas + despesas)) * 100 : 0}%"></div>
                        </div>
                    </div>

                    <div class="financial-bar-row">
                        <div class="bar-label">
                            <span>Despesas & Custos</span>
                            <span>R$ ${despesas.toFixed(2)} (${entradas + despesas > 0 ? ((despesas / (entradas + despesas)) * 100).toFixed(0) : 0}%)</span>
                        </div>
                        <div class="bar-bg">
                            <div class="bar-fill saida" style="width: ${entradas + despesas > 0 ? (despesas / (entradas + despesas)) * 100 : 0}%"></div>
                        </div>
                    </div>
                </div>
                
                <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <span style="font-size: 13px; color: var(--text-secondary); font-weight: 500;">Saldo Líquido em Caixa</span>
                        <h4 style="font-size: 22px; color: ${saldoLiquido >= 0 ? 'var(--color-success)' : 'var(--color-danger)'}; font-family: var(--font-title); font-weight: 800; margin-top: 4px;">
                            R$ ${saldoLiquido.toFixed(2)}
                        </h4>
                    </div>
                    <div>
                        <span style="font-size: 13px; color: var(--text-secondary); font-weight: 500;">Clientes Ativos</span>
                        <h4 style="font-size: 22px; font-family: var(--font-title); font-weight: 800; margin-top: 4px; text-align: right;">${totalClientes}</h4>
                    </div>
                </div>
            </div>

            <!-- Pedidos por Status -->
            <div class="card chart-card">
                <h3>Pedidos por Status</h3>
                <div class="status-chart-list">
                    <div class="status-chart-item">
                        <div class="status-color-dot" style="background-color: var(--color-warning);"></div>
                        <span class="status-chart-label">Feitos</span>
                        <div class="status-chart-progress">
                            <div class="status-chart-progress-fill" style="width: ${(statusFelt/maxStatusVal)*100}%; background-color: var(--color-warning);"></div>
                        </div>
                        <span class="status-chart-value">${statusFelt}</span>
                    </div>

                    <div class="status-chart-item">
                        <div class="status-color-dot" style="background-color: var(--color-info);"></div>
                        <span class="status-chart-label">Em Produção</span>
                        <div class="status-chart-progress">
                            <div class="status-chart-progress-fill" style="width: ${(statusProd/maxStatusVal)*100}%; background-color: var(--color-info);"></div>
                        </div>
                        <span class="status-chart-value">${statusProd}</span>
                    </div>

                    <div class="status-chart-item">
                        <div class="status-color-dot" style="background-color: var(--color-purple);"></div>
                        <span class="status-chart-label">Faturados</span>
                        <div class="status-chart-progress">
                            <div class="status-chart-progress-fill" style="width: ${(statusFat/maxStatusVal)*100}%; background-color: var(--color-purple);"></div>
                        </div>
                        <span class="status-chart-value">${statusFat}</span>
                    </div>

                    <div class="status-chart-item">
                        <div class="status-color-dot" style="background-color: #60a5fa;"></div>
                        <span class="status-chart-label">Enviados</span>
                        <div class="status-chart-progress">
                            <div class="status-chart-progress-fill" style="width: ${(statusEnv/maxStatusVal)*100}%; background-color: #60a5fa;"></div>
                        </div>
                        <span class="status-chart-value">${statusEnv}</span>
                    </div>

                    <div class="status-chart-item">
                        <div class="status-color-dot" style="background-color: var(--color-success);"></div>
                        <span class="status-chart-label">Entregues</span>
                        <div class="status-chart-progress">
                            <div class="status-chart-progress-fill" style="width: ${(statusEnt/maxStatusVal)*100}%; background-color: var(--color-success);"></div>
                        </div>
                        <span class="status-chart-value">${statusEnt}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Pedidos Recentes -->
        <div class="card" style="margin-top: 24px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                <h3>Pedidos Recentes</h3>
                <button class="btn btn-secondary btn-sm" onclick="switchView('pedidos-kanban')">Ver Todos</button>
            </div>
            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Cliente</th>
                            <th>Data</th>
                            <th>Total</th>
                            <th>Pagamento</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${appState.pedidos.length === 0 ? `<tr><td colspan="6" style="text-align:center;">Nenhum pedido cadastrado.</td></tr>` : 
                          appState.pedidos.slice(-5).reverse().map(p => `
                            <tr style="cursor: pointer;" onclick="openPedidoDetalhesModal('${p.id}')">
                                <td><strong>#${p.id}</strong></td>
                                <td>${p.clienteNome}</td>
                                <td>${formatDate(p.data)}</td>
                                <td>R$ ${p.total.toFixed(2)}</td>
                                <td>${p.pagamento}</td>
                                <td>${getStatusBadge(p.status)}</td>
                            </tr>
                          `).join('')
                        }
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// ==========================================================================
// TELA: Clientes
// ==========================================================================

let clientSearchQuery = '';
let clientFilterSegment = 'Todos';

function renderClientes(container) {
    // Filtrar clientes
    let filteredClientes = appState.clientes.filter(c => {
        const matchesSearch = c.nome.toLowerCase().includes(clientSearchQuery.toLowerCase()) || 
                             (c.razao && c.razao.toLowerCase().includes(clientSearchQuery.toLowerCase())) ||
                             c.telefone.includes(clientSearchQuery);
        const matchesSegment = clientFilterSegment === 'Todos' || c.segmento === clientFilterSegment;
        return matchesSearch && matchesSegment;
    });

    container.innerHTML = `
        <div class="actions-bar">
            <div class="search-box">
                <i data-lucide="search"></i>
                <input type="text" id="client-search" placeholder="Buscar clientes por nome, razão ou telefone..." value="${clientSearchQuery}">
            </div>
            
            <div class="filter-group">
                <select id="client-filter-segment" class="filter-select">
                    <option value="Todos" ${clientFilterSegment === 'Todos' ? 'selected' : ''}>Todos os Segmentos</option>
                    <option value="Cafeteria" ${clientFilterSegment === 'Cafeteria' ? 'selected' : ''}>Cafeterias</option>
                    <option value="Padaria" ${clientFilterSegment === 'Padaria' ? 'selected' : ''}>Padarias</option>
                    <option value="Restaurante" ${clientFilterSegment === 'Restaurante' ? 'selected' : ''}>Restaurantes</option>
                    <option value="Lanchonete" ${clientFilterSegment === 'Lanchonete' ? 'selected' : ''}>Lanchonetes</option>
                    <option value="Outro" ${clientFilterSegment === 'Outro' ? 'selected' : ''}>Outros</option>
                </select>
                
                <button class="btn btn-primary" onclick="openClienteModal()">
                    <i data-lucide="plus"></i>
                    <span>Novo Cliente</span>
                </button>
            </div>
        </div>

        <div class="card">
            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Avatar</th>
                            <th>Nome Fantasia / Cliente</th>
                            <th>Segmento</th>
                            <th>Telefone / WhatsApp</th>
                            <th>Endereço</th>
                            <th style="text-align: right;">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${filteredClientes.length === 0 ? `<tr><td colspan="6" style="text-align:center; padding: 32px 0;">Nenhum cliente encontrado.</td></tr>` : 
                          filteredClientes.map(c => `
                            <tr>
                                <td style="width: 60px;">
                                    <div style="width: 38px; height: 38px; background-color: var(--color-primary-light); color: var(--color-primary); font-weight: 700; border-radius: var(--radius-full); display: flex; align-items: center; justify-content: center; font-family: var(--font-title);">
                                        ${c.nome.substring(0, 2).toUpperCase()}
                                    </div>
                                </td>
                                <td>
                                    <div style="font-weight: 600; color: var(--text-primary);">${c.nome}</div>
                                    <div style="font-size: 12px; color: var(--text-secondary);">${c.razao || 'Sem razão social'}</div>
                                </td>
                                <td>
                                    <span class="badge" style="background-color: #e2e8f0; color: var(--text-primary); font-weight:600;">${c.segmento}</span>
                                </td>
                                <td>${c.telefone}</td>
                                <td style="max-width: 250px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${c.endereco || ''}">${c.endereco || 'Não cadastrado'}</td>
                                <td style="text-align: right;">
                                    <button class="btn btn-secondary btn-sm" onclick="viewClientDetails('${c.id}')" style="margin-right: 4px;">
                                        <i data-lucide="eye" style="width:14px;height:14px;"></i> Ver Ficha
                                    </button>
                                    <button class="btn-icon" onclick="openClienteModal('${c.id}')">
                                        <i data-lucide="edit-2" style="width: 16px; height: 16px;"></i>
                                    </button>
                                    <button class="btn-icon" onclick="deleteCliente('${c.id}')" style="color: var(--color-danger);">
                                        <i data-lucide="trash" style="width: 16px; height: 16px;"></i>
                                    </button>
                                </td>
                            </tr>
                          `).join('')
                        }
                    </tbody>
                </table>
            </div>
        </div>
    `;

    // Listeners para Busca e Filtro
    const searchInput = document.getElementById('client-search');
    searchInput.addEventListener('input', (e) => {
        clientSearchQuery = e.target.value;
        // Re-renderizar com debounce natural ou imediato para Vanilla
        renderClientes(container);
        // Colocar cursor de volta no final do input
        const input = document.getElementById('client-search');
        input.focus();
        input.setSelectionRange(input.value.length, input.value.length);
    });

    const filterSelect = document.getElementById('client-filter-segment');
    filterSelect.addEventListener('change', (e) => {
        clientFilterSegment = e.target.value;
        renderClientes(container);
    });
}

function viewClientDetails(id) {
    appState.clienteSelecionadoId = id;
    switchView('cliente-detalhes');
}

// ==========================================================================
// TELA: Detalhes do Cliente (Ficha do Cliente)
// ==========================================================================

function renderClienteDetalhes(container, id) {
    const cliente = appState.clientes.find(c => c.id === id);
    if (!cliente) {
        container.innerHTML = `<h3>Cliente não encontrado</h3><button class="btn btn-secondary" onclick="switchView('clientes')">Voltar</button>`;
        return;
    }

    // Histórico de pedidos
    const pedidosCliente = appState.pedidos.filter(p => p.clienteId === id);
    const totalComprado = pedidosCliente.reduce((sum, p) => sum + p.total, 0);
    const ticketMedio = pedidosCliente.length > 0 ? totalComprado / pedidosCliente.length : 0;

    container.innerHTML = `
        <div style="margin-bottom: 20px;">
            <button class="btn btn-secondary btn-sm" onclick="switchView('clientes')">
                <i data-lucide="arrow-left"></i> Voltar para Lista
            </button>
        </div>

        <div class="client-profile-grid">
            <!-- Sidebar Lateral do Cliente -->
            <div class="client-info-sidebar">
                <div class="card client-main-card">
                    <div class="client-avatar-large">${cliente.nome.substring(0,2).toUpperCase()}</div>
                    <h2 style="font-size: 20px; font-family: var(--font-title); margin-bottom: 4px;">${cliente.nome}</h2>
                    <span class="badge client-segment-badge" style="background-color: var(--color-primary-light); color: var(--color-primary); font-weight:600;">
                        ${cliente.segmento}
                    </span>
                    
                    <div class="client-details-list">
                        <div class="client-detail-item">
                            <span class="client-detail-label">Razão Social</span>
                            <span class="client-detail-value">${cliente.razao || 'Não preenchido'}</span>
                        </div>
                        <div class="client-detail-item">
                            <span class="client-detail-label">CPF / CNPJ</span>
                            <span class="client-detail-value">${cliente.documento || 'Não preenchido'}</span>
                        </div>
                        <div class="client-detail-item">
                            <span class="client-detail-label">Telefone / WhatsApp</span>
                            <span class="client-detail-value">${cliente.telefone}</span>
                        </div>
                        <div class="client-detail-item">
                            <span class="client-detail-label">Endereço Completo</span>
                            <span class="client-detail-value">${cliente.endereco || 'Não preenchido'}</span>
                        </div>
                    </div>
                    
                    <div style="margin-top: 24px; display: flex; gap: 8px;">
                        <button class="btn btn-secondary btn-sm" onclick="openClienteModal('${cliente.id}')" style="flex:1;">
                            <i data-lucide="edit-2" style="width:14px;height:14px;"></i> Editar
                        </button>
                        <button class="btn btn-primary btn-sm" onclick="iniciarPedidoParaCliente('${cliente.id}')" style="flex:1.5;">
                            <i data-lucide="shopping-cart" style="width:14px;height:14px;"></i> Tirar Pedido
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- Conteúdo de Vendas / Estatísticas do Cliente -->
            <div style="display:flex; flex-direction:column; gap:24px;">
                <!-- KPIs do Cliente -->
                <div class="dashboard-grid" style="grid-template-columns: repeat(3, 1fr); margin-bottom: 0;">
                    <div class="card kpi-card kpi-success" style="padding:16px;">
                        <div class="kpi-info">
                            <span class="kpi-title" style="font-size:11px;">Total Comprado</span>
                            <span class="kpi-value" style="font-size:20px;">R$ ${totalComprado.toFixed(2)}</span>
                        </div>
                        <div class="kpi-icon" style="width:38px;height:38px;"><i data-lucide="dollar-sign" style="width:18px;height:18px;"></i></div>
                    </div>
                    <div class="card kpi-card kpi-primary" style="padding:16px;">
                        <div class="kpi-info">
                            <span class="kpi-title" style="font-size:11px;">Média por Pedido</span>
                            <span class="kpi-value" style="font-size:20px;">R$ ${ticketMedio.toFixed(2)}</span>
                        </div>
                        <div class="kpi-icon" style="width:38px;height:38px;"><i data-lucide="receipt" style="width:18px;height:18px;"></i></div>
                    </div>
                    <div class="card kpi-card kpi-info-theme" style="padding:16px;">
                        <div class="kpi-info">
                            <span class="kpi-title" style="font-size:11px;">Qtd. Pedidos</span>
                            <span class="kpi-value" style="font-size:20px;">${pedidosCliente.length}</span>
                        </div>
                        <div class="kpi-icon" style="width:38px;height:38px;"><i data-lucide="shopping-bag" style="width:18px;height:18px;"></i></div>
                    </div>
                </div>
                
                <!-- Histórico de Pedidos -->
                <div class="card">
                    <h3>Histórico de Pedidos</h3>
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Cód</th>
                                    <th>Data</th>
                                    <th>Produtos</th>
                                    <th>Total</th>
                                    <th>Pagamento</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${pedidosCliente.length === 0 ? `<tr><td colspan="6" style="text-align:center; padding: 24px 0;">Este cliente ainda não realizou pedidos.</td></tr>` : 
                                  pedidosCliente.map(p => `
                                    <tr style="cursor: pointer;" onclick="openPedidoDetalhesModal('${p.id}')">
                                        <td><strong>#${p.id}</strong></td>
                                        <td>${formatDate(p.data)}</td>
                                        <td style="max-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                                            ${p.itens.map(i => `${i.quantidade}x ${i.nome}`).join(', ')}
                                        </td>
                                        <td><strong>R$ ${p.total.toFixed(2)}</strong></td>
                                        <td>${p.pagamento}</td>
                                        <td>${getStatusBadge(p.status)}</td>
                                    </tr>
                                  `).join('')
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function iniciarPedidoParaCliente(clienteId) {
    // Limpar carrinho e inicializar novo pedido com este cliente
    appState.carrinho = {};
    saveState();
    switchView('novo-pedido');
    
    // Selecionar cliente na tela de pedido
    setTimeout(() => {
        const select = document.getElementById('pedido-cliente');
        if (select) {
            select.value = clienteId;
        }
    }, 100);
}

// Modais de Cliente
function openClienteModal(id = null) {
    const modal = document.getElementById('modal-cliente');
    const title = document.getElementById('modal-cliente-title');
    const form = document.getElementById('form-cliente');
    
    form.reset();
    document.getElementById('cliente-id').value = '';
    
    if (id) {
        title.innerText = 'Editar Cliente';
        const cliente = appState.clientes.find(c => c.id === id);
        if (cliente) {
            document.getElementById('cliente-id').value = cliente.id;
            document.getElementById('cliente-nome').value = cliente.nome;
            document.getElementById('cliente-razao').value = cliente.razao || '';
            document.getElementById('cliente-documento').value = cliente.documento || '';
            document.getElementById('cliente-telefone').value = cliente.telefone;
            document.getElementById('cliente-segmento').value = cliente.segmento;
            document.getElementById('cliente-endereco').value = cliente.endereco || '';
        }
    } else {
        title.innerText = 'Novo Cliente';
    }
    
    modal.classList.add('active');
    lucide.createIcons();
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

function handleClienteSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('cliente-id').value;
    const nome = document.getElementById('cliente-nome').value;
    const razao = document.getElementById('cliente-razao').value;
    const documento = document.getElementById('cliente-documento').value;
    const telefone = document.getElementById('cliente-telefone').value;
    const segmento = document.getElementById('cliente-segmento').value;
    const endereco = document.getElementById('cliente-endereco').value;

    if (id) {
        // Editar
        const index = appState.clientes.findIndex(c => c.id === id);
        if (index !== -1) {
            appState.clientes[index] = { ...appState.clientes[index], nome, razao, documento, telefone, segmento, endereco };
            // Atualizar o nome do cliente em pedidos dele se houver
            appState.pedidos.forEach(p => {
                if (p.clienteId === id) p.clienteNome = nome;
            });
        }
    } else {
        // Criar novo
        const novoCliente = {
            id: 'c_' + Date.now(),
            nome,
            razao,
            documento,
            telefone,
            segmento,
            endereco
        };
        appState.clientes.push(novoCliente);
    }
    
    saveState();
    closeModal('modal-cliente');
    renderCurrentView();
}

function deleteCliente(id) {
    if (confirm('Tem certeza que deseja excluir este cliente? Isto não apagará o histórico de pedidos dele.')) {
        appState.clientes = appState.clientes.filter(c => c.id !== id);
        saveState();
        renderCurrentView();
    }
}

// ==========================================================================
// TELA: Fornecedores
// ==========================================================================

function renderFornecedores(container) {
    container.innerHTML = `
        <div class="actions-bar" style="justify-content: flex-end;">
            <button class="btn btn-primary" onclick="openFornecedorModal()">
                <i data-lucide="plus"></i>
                <span>Novo Fornecedor</span>
            </button>
        </div>

        <div class="card">
            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Fornecedor / Empresa</th>
                            <th>Contato</th>
                            <th>Telefone / WhatsApp</th>
                            <th>Insumos Fornecidos</th>
                            <th style="text-align: right;">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${appState.fornecedores.length === 0 ? `<tr><td colspan="5" style="text-align:center; padding: 32px 0;">Nenhum fornecedor cadastrado.</td></tr>` : 
                          appState.fornecedores.map(f => `
                            <tr>
                                <td>
                                    <div style="font-weight: 600; color: var(--text-primary);">${f.nome}</div>
                                </td>
                                <td>${f.contato || 'Não preenchido'}</td>
                                <td>${f.telefone}</td>
                                <td>
                                    <span style="font-size:13px; color: var(--text-secondary);">${f.insumos}</span>
                                </td>
                                <td style="text-align: right;">
                                    <button class="btn btn-secondary btn-sm" onclick="abrirLancamentoDespesaParaFornecedor('${f.id}')" style="margin-right: 4px;">
                                        <i data-lucide="dollar-sign" style="width:14px;height:14px;"></i> Registrar Compra
                                    </button>
                                    <button class="btn-icon" onclick="openFornecedorModal('${f.id}')">
                                        <i data-lucide="edit-2" style="width: 16px; height: 16px;"></i>
                                    </button>
                                    <button class="btn-icon" onclick="deleteFornecedor('${f.id}')" style="color: var(--color-danger);">
                                        <i data-lucide="trash" style="width: 16px; height: 16px;"></i>
                                    </button>
                                </td>
                            </tr>
                          `).join('')
                        }
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function abrirLancamentoDespesaParaFornecedor(fornecedorId) {
    openDespesaModal();
    // Pré-selecionar o fornecedor
    setTimeout(() => {
        document.getElementById('despesa-fornecedor').value = fornecedorId;
        const fornecedor = appState.fornecedores.find(f => f.id === fornecedorId);
        if (fornecedor) {
            document.getElementById('despesa-descricao').value = `Compra de insumos: ${fornecedor.nome}`;
        }
    }, 100);
}

// Modais de Fornecedor
function openFornecedorModal(id = null) {
    const modal = document.getElementById('modal-fornecedor');
    const title = document.getElementById('modal-fornecedor-title');
    const form = document.getElementById('form-fornecedor');
    
    form.reset();
    document.getElementById('fornecedor-id').value = '';
    
    if (id) {
        title.innerText = 'Editar Fornecedor';
        const fornecedor = appState.fornecedores.find(f => f.id === id);
        if (fornecedor) {
            document.getElementById('fornecedor-id').value = fornecedor.id;
            document.getElementById('fornecedor-nome').value = fornecedor.nome;
            document.getElementById('fornecedor-contato').value = fornecedor.contato || '';
            document.getElementById('fornecedor-telefone').value = fornecedor.telefone;
            document.getElementById('fornecedor-insumos').value = fornecedor.insumos;
        }
    } else {
        title.innerText = 'Novo Fornecedor';
    }
    
    modal.classList.add('active');
    lucide.createIcons();
}

function handleFornecedorSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('fornecedor-id').value;
    const nome = document.getElementById('form-fornecedor').querySelector('#fornecedor-nome').value;
    const contato = document.getElementById('fornecedor-contato').value;
    const telefone = document.getElementById('form-fornecedor').querySelector('#fornecedor-telefone').value;
    const insumos = document.getElementById('fornecedor-insumos').value;

    if (id) {
        // Editar
        const index = appState.fornecedores.findIndex(f => f.id === id);
        if (index !== -1) {
            appState.fornecedores[index] = { ...appState.fornecedores[index], nome, contato, telefone, insumos };
        }
    } else {
        // Criar novo
        const novoFornecedor = {
            id: 'f_' + Date.now(),
            nome,
            contato,
            telefone,
            insumos
        };
        appState.fornecedores.push(novoFornecedor);
    }
    
    saveState();
    closeModal('modal-fornecedor');
    renderCurrentView();
}

function deleteFornecedor(id) {
    if (confirm('Deseja realmente excluir este fornecedor?')) {
        appState.fornecedores = appState.fornecedores.filter(f => f.id !== id);
        saveState();
        renderCurrentView();
    }
}

// ==========================================================================
// TELA: Novo Pedido (Catálogo + Carrinho)
// ==========================================================================

let productSearchQuery = '';
let productCategoryFilter = 'Todos';

function renderNovoPedido(container) {
    // Filtrar Produtos
    let filteredProdutos = PRODUTOS_MOCK.filter(p => {
        const matchesSearch = p.nome.toLowerCase().includes(productSearchQuery.toLowerCase());
        const matchesCategory = productCategoryFilter === 'Todos' || p.categoria === productCategoryFilter;
        return matchesSearch && matchesCategory;
    });

    // Renderizar estrutura da tela dividida (Catálogo | Carrinho)
    container.innerHTML = `
        <div class="order-screen-grid">
            <!-- Catálogo de Produtos -->
            <div>
                <div class="actions-bar" style="margin-bottom: 16px;">
                    <div class="search-box">
                        <i data-lucide="search"></i>
                        <input type="text" id="product-search" placeholder="Buscar produtos no catálogo..." value="${productSearchQuery}">
                    </div>
                    
                    <select id="product-filter-category" class="filter-select">
                        <option value="Todos" ${productCategoryFilter === 'Todos' ? 'selected' : ''}>Todos os Produtos</option>
                        <option value="Café" ${productCategoryFilter === 'Café' ? 'selected' : ''}>Cafés</option>
                        <option value="Insumos" ${productCategoryFilter === 'Insumos' ? 'selected' : ''}>Insumos</option>
                        <option value="Acessórios" ${productCategoryFilter === 'Acessórios' ? 'selected' : ''}>Acessórios</option>
                        <option value="Embalagens" ${productCategoryFilter === 'Embalagens' ? 'selected' : ''}>Embalagens</option>
                    </select>
                </div>

                <div class="product-grid">
                    ${filteredProdutos.map(p => {
                        const qty = appState.carrinho[p.id] || 0;
                        return `
                            <div class="product-card">
                                <div class="product-image">
                                    <span>${p.icone}</span>
                                </div>
                                <span class="product-category">${p.categoria}</span>
                                <div class="product-name">${p.nome}</div>
                                <div class="product-price">R$ ${p.preco.toFixed(2)}</div>
                                
                                <div class="product-actions">
                                    ${qty > 0 ? `
                                        <div class="quantity-control" style="width: 100%;">
                                            <button class="quantity-btn" onclick="updateCartQty('${p.id}', -1)" style="flex:1;">-</button>
                                            <span class="quantity-value" style="flex:1;">${qty}</span>
                                            <button class="quantity-btn" onclick="updateCartQty('${p.id}', 1)" style="flex:1;">+</button>
                                        </div>
                                    ` : `
                                        <button class="btn btn-primary btn-sm" onclick="updateCartQty('${p.id}', 1)" style="width:100%;">
                                            <i data-lucide="shopping-cart" style="width:14px;height:14px;"></i> Adicionar
                                        </button>
                                    `}
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>

            <!-- Carrinho e Finalização -->
            <div class="card cart-card">
                <div class="cart-header">
                    <h3 style="font-size: 16px; display:flex; align-items:center; gap:8px;">
                        <i data-lucide="shopping-cart"></i> Carrinho de Compras
                    </h3>
                    ${Object.keys(appState.carrinho).length > 0 ? `
                        <button class="btn btn-secondary btn-sm" onclick="clearCart()" style="padding:4px 8px; font-size:11px;">Limpar</button>
                    ` : ''}
                </div>

                <div class="cart-items-list">
                    ${Object.keys(appState.carrinho).length === 0 ? `
                        <div class="cart-empty">
                            <i data-lucide="shopping-bag"></i>
                            <span>Nenhum item adicionado</span>
                        </div>
                    ` : 
                      Object.entries(appState.carrinho).map(([pId, qty]) => {
                          const p = PRODUTOS_MOCK.find(item => item.id === pId);
                          if (!p) return '';
                          return `
                            <div class="cart-item">
                                <div class="cart-item-details">
                                    <div class="cart-item-name">${p.nome}</div>
                                    <div class="cart-item-price-qty">${qty}x R$ ${p.preco.toFixed(2)}</div>
                                </div>
                                <div class="cart-item-total">R$ ${(p.preco * qty).toFixed(2)}</div>
                                <button class="btn-icon" onclick="removeFromCart('${pId}')" style="margin-left: 8px; color: var(--color-danger); padding:4px;">
                                    <i data-lucide="trash-2" style="width:14px;height:14px;"></i>
                                </button>
                            </div>
                          `;
                      }).join('')
                    }
                </div>

                <!-- Resumo de Totais e Formulário -->
                ${Object.keys(appState.carrinho).length > 0 ? `
                    <div class="cart-totals">
                        <div class="total-row">
                            <span>Subtotal</span>
                            <span id="cart-subtotal">R$ ${calculateCartSubtotal().toFixed(2)}</span>
                        </div>
                        <div class="total-row">
                            <span>Desconto Especial (R$)</span>
                            <input type="number" id="cart-discount-input" value="0" min="0" step="0.01" style="width: 80px; padding: 2px 6px; border:1px solid #cbd5e1; border-radius:4px; text-align:right;" oninput="updateCartTotals()">
                        </div>
                        <div class="total-row grand-total">
                            <span>Total Geral</span>
                            <span id="cart-grand-total">R$ ${calculateCartSubtotal().toFixed(2)}</span>
                        </div>
                    </div>

                    <form id="form-finalizar-pedido" onsubmit="handleFinalizarPedido(event)" class="order-form-inputs">
                        <div class="form-group" style="margin-bottom: 12px;">
                            <label for="pedido-cliente">Selecione o Cliente *</label>
                            <select id="pedido-cliente" required>
                                <option value="">Selecione um cliente...</option>
                                ${appState.clientes.map(c => `<option value="${c.id}">${c.nome} (${c.segmento})</option>`).join('')}
                            </select>
                        </div>
                        
                        <div class="form-group" style="margin-bottom: 16px;">
                            <label for="pedido-pagamento">Forma de Pagamento *</label>
                            <select id="pedido-pagamento" required>
                                <option value="Pix">Pix / Dinheiro</option>
                                <option value="Cartão de Crédito">Cartão de Crédito</option>
                                <option value="Cartão de Débito">Cartão de Débito</option>
                                <option value="Boleto 15 dias">Boleto (15 dias)</option>
                                <option value="Boleto 30 dias">Boleto (30 dias)</option>
                            </select>
                        </div>
                        
                        <button type="submit" class="btn btn-primary" style="width: 100%;">
                            <i data-lucide="check-circle-2"></i>
                            <span>Salvar & Enviar Pedido</span>
                        </button>
                    </form>
                ` : ''}
            </div>
        </div>
    `;

    // Listeners
    const searchInput = document.getElementById('product-search');
    searchInput.addEventListener('input', (e) => {
        productSearchQuery = e.target.value;
        renderNovoPedido(container);
        const input = document.getElementById('product-search');
        input.focus();
        input.setSelectionRange(input.value.length, input.value.length);
    });

    const categorySelect = document.getElementById('product-filter-category');
    categorySelect.addEventListener('change', (e) => {
        productCategoryFilter = e.target.value;
        renderNovoPedido(container);
    });

    if (Object.keys(appState.carrinho).length > 0) {
        updateCartTotals();
    }
}

function updateCartQty(pId, change) {
    const currentQty = appState.carrinho[pId] || 0;
    const newQty = currentQty + change;
    
    if (newQty <= 0) {
        delete appState.carrinho[pId];
    } else {
        appState.carrinho[pId] = newQty;
    }
    
    saveState();
    renderCurrentView();
}

function removeFromCart(pId) {
    delete appState.carrinho[pId];
    saveState();
    renderCurrentView();
}

function clearCart() {
    appState.carrinho = {};
    saveState();
    renderCurrentView();
}

function calculateCartSubtotal() {
    return Object.entries(appState.carrinho).reduce((sum, [pId, qty]) => {
        const p = PRODUTOS_MOCK.find(item => item.id === pId);
        return sum + (p ? p.preco * qty : 0);
    }, 0);
}

function updateCartTotals() {
    const subtotal = calculateCartSubtotal();
    const discountInput = document.getElementById('cart-discount-input');
    const discount = discountInput ? parseFloat(discountInput.value) || 0 : 0;
    const total = Math.max(0, subtotal - discount);
    
    const grandTotalEl = document.getElementById('cart-grand-total');
    if (grandTotalEl) {
        grandTotalEl.innerText = `R$ ${total.toFixed(2)}`;
    }
}

function handleFinalizarPedido(e) {
    e.preventDefault();
    
    const clienteId = document.getElementById('pedido-cliente').value;
    const pagamento = document.getElementById('pedido-pagamento').value;
    const discountInput = document.getElementById('cart-discount-input');
    const desconto = discountInput ? parseFloat(discountInput.value) || 0 : 0;
    
    const cliente = appState.clientes.find(c => c.id === clienteId);
    if (!cliente) return alert('Selecione um cliente válido.');
    
    const subtotal = calculateCartSubtotal();
    const total = Math.max(0, subtotal - desconto);
    
    // Montar os itens do pedido
    const itens = Object.entries(appState.carrinho).map(([pId, qty]) => {
        const p = PRODUTOS_MOCK.find(item => item.id === pId);
        return {
            produtoId: pId,
            nome: p ? p.nome : 'Produto Desconhecido',
            quantidade: qty,
            preco: p ? p.preco : 0
        };
    });

    const novoPedido = {
        id: 'o_' + Date.now(),
        clienteId,
        clienteNome: cliente.nome,
        itens,
        subtotal,
        desconto,
        total,
        status: 'pedido feito', // Inicial
        pagamento,
        data: new Date().toISOString().split('T')[0],
        dataStatusUpdate: new Date().toISOString().split('T')[0]
    };

    appState.pedidos.push(novoPedido);
    appState.carrinho = {}; // Limpar carrinho
    
    saveState();
    alert('Pedido lançado com sucesso!');
    switchView('pedidos-kanban');
}

// ==========================================================================
// TELA: Kanban de Pedidos (Status do Pedido)
// ==========================================================================

function renderPedidosKanban(container) {
    const countStatus = (status) => appState.pedidos.filter(p => p.status === status).length;
    
    container.innerHTML = `
        <div style="margin-bottom: 20px; font-size:13px; color:var(--text-secondary); background-color: var(--color-primary-light); padding:10px 16px; border-radius: var(--radius-sm); border-left:4px solid var(--color-primary);">
            <i data-lucide="info" style="width:14px;height:14px;vertical-align:middle;margin-right:4px;"></i>
            <strong>Fluxo de Faturamento Inteligente:</strong> Ao mover o pedido para <strong>Faturado</strong> ou <strong>Entregue</strong>, o valor total do pedido é lançado automaticamente no caixa financeiro (Entrada).
        </div>

        <div class="kanban-board">
            <!-- Coluna 1: Pedido Feito -->
            <div class="kanban-column col-feito">
                <div class="kanban-column-header">
                    <div class="column-title-container">
                        <i data-lucide="file-text"></i>
                        <span class="column-title">Feito</span>
                    </div>
                    <span class="column-count">${countStatus('pedido feito')}</span>
                </div>
                <div class="kanban-cards-container">
                    ${renderKanbanCardsForStatus('pedido feito')}
                </div>
            </div>

            <!-- Coluna 2: Em Produção -->
            <div class="kanban-column col-producao">
                <div class="kanban-column-header">
                    <div class="column-title-container">
                        <i data-lucide="wrench"></i>
                        <span class="column-title">Produção</span>
                    </div>
                    <span class="column-count">${countStatus('producao')}</span>
                </div>
                <div class="kanban-cards-container">
                    ${renderKanbanCardsForStatus('producao')}
                </div>
            </div>

            <!-- Coluna 3: Faturado -->
            <div class="kanban-column col-faturado">
                <div class="kanban-column-header">
                    <div class="column-title-container">
                        <i data-lucide="receipt"></i>
                        <span class="column-title">Faturado</span>
                    </div>
                    <span class="column-count">${countStatus('faturado')}</span>
                </div>
                <div class="kanban-cards-container">
                    ${renderKanbanCardsForStatus('faturado')}
                </div>
            </div>

            <!-- Coluna 4: Enviado -->
            <div class="kanban-column col-enviado">
                <div class="kanban-column-header">
                    <div class="column-title-container">
                        <i data-lucide="truck"></i>
                        <span class="column-title">Enviado</span>
                    </div>
                    <span class="column-count">${countStatus('enviado')}</span>
                </div>
                <div class="kanban-cards-container">
                    ${renderKanbanCardsForStatus('enviado')}
                </div>
            </div>

            <!-- Coluna 5: Entregue -->
            <div class="kanban-column col-entregue">
                <div class="kanban-column-header">
                    <div class="column-title-container">
                        <i data-lucide="check-circle-2"></i>
                        <span class="column-title">Entregue</span>
                    </div>
                    <span class="column-count">${countStatus('entregue')}</span>
                </div>
                <div class="kanban-cards-container">
                    ${renderKanbanCardsForStatus('entregue')}
                </div>
            </div>
        </div>
    `;
}

function renderKanbanCardsForStatus(status) {
    const list = appState.pedidos.filter(p => p.status === status);
    if (list.length === 0) {
        return `<div style="text-align:center; padding:16px 0; color:var(--text-muted); font-size:12px; border:1px dashed #cbd5e1; border-radius:var(--radius-sm);">Nenhum pedido</div>`;
    }
    
    return list.map(p => {
        const productSummary = p.itens.map(i => `${i.quantidade}x ${i.nome.substring(0, 15)}...`).join(', ');
        
        // Determinar ações permitidas por status
        let actionButtons = '';
        if (status === 'pedido feito') {
            actionButtons = `
                <button class="btn btn-secondary btn-sm" onclick="event.stopPropagation(); changeOrderStatus('${p.id}', 'producao')" title="Colocar em Produção">
                    Produção <i data-lucide="play" style="width:10px;height:10px;"></i>
                </button>
            `;
        } else if (status === 'producao') {
            actionButtons = `
                <button class="btn btn-secondary btn-sm" onclick="event.stopPropagation(); changeOrderStatus('${p.id}', 'pedido feito')" title="Voltar para Feito">
                    <i data-lucide="chevron-left" style="width:10px;height:10px;"></i>
                </button>
                <button class="btn btn-primary btn-sm" onclick="event.stopPropagation(); changeOrderStatus('${p.id}', 'faturado')" title="Faturar Pedido">
                    Faturar <i data-lucide="check" style="width:10px;height:10px;"></i>
                </button>
            `;
        } else if (status === 'faturado') {
            actionButtons = `
                <button class="btn btn-secondary btn-sm" onclick="event.stopPropagation(); changeOrderStatus('${p.id}', 'producao')" title="Voltar para Produção">
                    <i data-lucide="chevron-left" style="width:10px;height:10px;"></i>
                </button>
                <button class="btn btn-primary btn-sm" onclick="event.stopPropagation(); changeOrderStatus('${p.id}', 'enviado')" title="Despachar Pedido">
                    Enviar <i data-lucide="truck" style="width:10px;height:10px;"></i>
                </button>
            `;
        } else if (status === 'enviado') {
            actionButtons = `
                <button class="btn btn-secondary btn-sm" onclick="event.stopPropagation(); changeOrderStatus('${p.id}', 'faturado')" title="Voltar para Faturado">
                    <i data-lucide="chevron-left" style="width:10px;height:10px;"></i>
                </button>
                <button class="btn btn-success btn-sm" onclick="event.stopPropagation(); changeOrderStatus('${p.id}', 'entregue')" style="color:white;" title="Entregar">
                    Entregar <i data-lucide="check-circle" style="width:10px;height:10px;"></i>
                </button>
            `;
        } else if (status === 'entregue') {
            actionButtons = `<span style="font-size:11px; color:var(--color-success); font-weight:700; display:flex; align-items:center; gap:2px;"><i data-lucide="smile" style="width:12px;height:12px;"></i> Finalizado</span>`;
        }

        return `
            <div class="kanban-card" onclick="openPedidoDetalhesModal('${p.id}')">
                <div class="kanban-card-header">
                    <span>#${p.id}</span>
                    <span>${formatDate(p.data)}</span>
                </div>
                <div class="kanban-card-client">${p.clienteNome}</div>
                <div class="kanban-card-summary" title="${p.itens.map(i => `${i.quantidade}x ${i.nome}`).join(', ')}">${productSummary}</div>
                
                <div class="kanban-card-footer">
                    <span class="kanban-card-total">R$ ${p.total.toFixed(2)}</span>
                    <div class="kanban-card-actions">
                        ${actionButtons}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function changeOrderStatus(orderId, newStatus) {
    const index = appState.pedidos.findIndex(p => p.id === orderId);
    if (index === -1) return;

    const oldStatus = appState.pedidos[index].status;
    appState.pedidos[index].status = newStatus;
    appState.pedidos[index].dataStatusUpdate = new Date().toISOString().split('T')[0];

    // Lógica Financeira Integrada:
    // Se o pedido passar para "faturado" ou "entregue", e antes não estava nessas colunas, gera uma ENTRADA no financeiro.
    // Se voltar de faturado/entregue para um status anterior, deve retirar a transação correspondente (ou mantemos e avisamos? Para simulação perfeita, vamos criar a entrada apenas uma vez).
    const isFaturamentoStatus = (s) => s === 'faturado' || s === 'entregue';
    
    if (isFaturamentoStatus(newStatus) && !isFaturamentoStatus(oldStatus)) {
        // Verificar se já existe transação para este pedido para evitar duplicidade
        const transacaoExiste = appState.financeiro.some(t => t.descricao.includes(`#${orderId}`));
        if (!transacaoExiste) {
            const transacao = {
                id: 't_' + Date.now(),
                tipo: 'entrada',
                descricao: `Faturamento Pedido #${orderId} - ${appState.pedidos[index].clienteNome}`,
                valor: appState.pedidos[index].total,
                data: new Date().toISOString().split('T')[0],
                fornecedorId: ''
            };
            appState.financeiro.push(transacao);
        }
    }
    
    saveState();
    renderCurrentView();
}

// ==========================================================================
// TELA: Financeiro (Fluxo de Caixa)
// ==========================================================================

function renderFinanceiro(container) {
    const entradas = appState.financeiro
        .filter(t => t.tipo === 'entrada')
        .reduce((sum, t) => sum + t.valor, 0);
        
    const despesas = appState.financeiro
        .filter(t => t.tipo === 'saida')
        .reduce((sum, t) => sum + t.valor, 0);
        
    const saldoLiquido = entradas - despesas;

    container.innerHTML = `
        <!-- Dashboard Rápido Financeiro -->
        <div class="dashboard-grid" style="grid-template-columns: repeat(3, 1fr); margin-bottom: 24px;">
            <div class="card kpi-card kpi-success">
                <div class="kpi-info">
                    <span class="kpi-title">Total Entradas</span>
                    <span class="kpi-value">R$ ${entradas.toFixed(2)}</span>
                </div>
                <div class="kpi-icon"><i data-lucide="trending-up"></i></div>
            </div>
            
            <div class="card kpi-card kpi-danger">
                <div class="kpi-info">
                    <span class="kpi-title">Total Saídas / Despesas</span>
                    <span class="kpi-value">R$ ${despesas.toFixed(2)}</span>
                </div>
                <div class="kpi-icon"><i data-lucide="trending-down"></i></div>
            </div>

            <div class="card kpi-card kpi-primary" style="background-color:${saldoLiquido >= 0 ? 'var(--color-success-light)' : 'var(--color-danger-light)'};">
                <div class="kpi-info">
                    <span class="kpi-title" style="color:var(--text-primary);">Saldo Líquido</span>
                    <span class="kpi-value" style="color:${saldoLiquido >= 0 ? '#047857' : '#b91c1c'};">R$ ${saldoLiquido.toFixed(2)}</span>
                </div>
                <div class="kpi-icon" style="background-color:rgba(255,255,255,0.4); color:${saldoLiquido >= 0 ? '#047857' : '#b91c1c'};">
                    <i data-lucide="wallet"></i>
                </div>
            </div>
        </div>

        <!-- Barra de Ações -->
        <div class="actions-bar" style="justify-content: flex-end;">
            <button class="btn btn-danger" onclick="openDespesaModal()">
                <i data-lucide="minus-circle"></i>
                <span>Registrar Despesa / Saída</span>
            </button>
        </div>

        <!-- Tabela de Transações -->
        <div class="card">
            <h3>Extrato do Fluxo de Caixa</h3>
            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Data</th>
                            <th>Descrição / Origem</th>
                            <th>Fornecedor Associado</th>
                            <th>Tipo</th>
                            <th style="text-align: right;">Valor</th>
                            <th style="text-align: right;">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${appState.financeiro.length === 0 ? `<tr><td colspan="6" style="text-align:center; padding: 24px 0;">Nenhuma movimentação financeira registrada.</td></tr>` : 
                          appState.financeiro.slice().reverse().map(t => {
                              const forn = appState.fornecedores.find(f => f.id === t.fornecedorId);
                              return `
                                <tr>
                                    <td>${formatDate(t.data)}</td>
                                    <td><strong>${t.descricao}</strong></td>
                                    <td>${forn ? forn.nome : '<span style="color:var(--text-muted);">Nenhum</span>'}</td>
                                    <td>
                                        <span class="badge ${t.tipo === 'entrada' ? 'badge-success' : 'badge-danger'}">
                                            ${t.tipo === 'entrada' ? 'Entrada' : 'Saída'}
                                        </span>
                                    </td>
                                    <td style="text-align: right; font-weight: 700; color: ${t.tipo === 'entrada' ? 'var(--color-success)' : 'var(--color-danger)'};">
                                        ${t.tipo === 'entrada' ? '+' : '-'} R$ ${t.valor.toFixed(2)}
                                    </td>
                                    <td style="text-align: right;">
                                        <button class="btn-icon" onclick="deleteTransacao('${t.id}')" style="color: var(--color-danger);" title="Excluir Lançamento">
                                            <i data-lucide="trash-2" style="width: 16px; height: 16px;"></i>
                                        </button>
                                    </td>
                                </tr>
                              `;
                          }).join('')
                        }
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// Modais Financeiros
function openDespesaModal() {
    const modal = document.getElementById('modal-despesa');
    const form = document.getElementById('form-despesa');
    form.reset();
    
    // Preencher select de fornecedores
    const select = document.getElementById('despesa-fornecedor');
    select.innerHTML = '<option value="">Nenhum</option>' + 
        appState.fornecedores.map(f => `<option value="${f.id}">${f.nome}</option>`).join('');
        
    document.getElementById('despesa-data').value = new Date().toISOString().split('T')[0];
    modal.classList.add('active');
    lucide.createIcons();
}

function handleDespesaSubmit(e) {
    e.preventDefault();
    
    const descricao = document.getElementById('despesa-descricao').value;
    const valor = parseFloat(document.getElementById('despesa-valor').value);
    const fornecedorId = document.getElementById('despesa-fornecedor').value;
    const data = document.getElementById('despesa-data').value;
    
    if (isNaN(valor) || valor <= 0) return alert('Insira um valor válido maior que zero.');

    const novaTransacao = {
        id: 't_' + Date.now(),
        tipo: 'saida',
        descricao,
        valor,
        data,
        fornecedorId
    };

    appState.financeiro.push(novaTransacao);
    saveState();
    closeModal('modal-despesa');
    renderCurrentView();
}

function deleteTransacao(id) {
    if (confirm('Deseja realmente excluir esta transação do extrato? Isso afetará os saldos do dashboard.')) {
        appState.financeiro = appState.financeiro.filter(t => t.id !== id);
        saveState();
        renderCurrentView();
    }
}

// ==========================================================================
// Funções Auxiliares de Formatação e UI
// ==========================================================================

function formatDate(dateStr) {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length === 3) {
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return dateStr;
}

function getStatusBadge(status) {
    const config = {
        'pedido feito': { text: 'Feito', class: 'badge-warning', icon: 'file-text' },
        'producao': { text: 'Em Produção', class: 'badge-info', icon: 'wrench' },
        'faturado': { text: 'Faturado', class: 'badge-purple', icon: 'receipt' },
        'enviado': { text: 'Enviado', class: 'badge-info', icon: 'truck' },
        'entregue': { text: 'Entregue', class: 'badge-success', icon: 'check-circle' }
    };
    
    const item = config[status] || { text: status, class: 'badge-warning', icon: 'info' };
    return `<span class="badge ${item.class}"><i data-lucide="${item.icon}" style="width:10px;height:10px;margin-right:2px;"></i> ${item.text}</span>`;
}

// Modal de Detalhes do Pedido
function openPedidoDetalhesModal(pedidoId) {
    const pedido = appState.pedidos.find(p => p.id === pedidoId);
    if (!pedido) return;

    const cliente = appState.clientes.find(c => c.id === pedido.clienteId);
    const modal = document.getElementById('modal-pedido');
    const modalIdSpan = document.getElementById('detalhe-pedido-id');
    const modalBody = document.getElementById('modal-pedido-body');

    modalIdSpan.innerText = `#${pedido.id}`;

    // Montar os itens do pedido
    const itemsHtml = pedido.itens.map(item => `
        <div class="pedido-detalhe-item-row">
            <div class="pedido-detalhe-item-qty">${item.quantidade}</div>
            <div class="pedido-detalhe-item-desc">${item.nome}</div>
            <div class="pedido-detalhe-item-prices">
                <div class="pedido-detalhe-item-price-unit">R$ ${item.preco.toFixed(2)} un</div>
                <div class="pedido-detalhe-item-price-total">R$ ${(item.preco * item.quantidade).toFixed(2)}</div>
            </div>
        </div>
    `).join('');

    // Determinar botões de ação do status no próprio modal
    let actionButtonsHtml = '';
    const status = pedido.status;
    const perfil = appState.perfilAtivo;

    // Permitir alteração se o perfil for Gestor ou Produção (para os status corretos)
    if (perfil === 'gestor' || perfil === 'producao') {
        if (status === 'pedido feito') {
            actionButtonsHtml = `
                <button class="btn btn-primary" onclick="closeModal('modal-pedido'); changeOrderStatus('${pedido.id}', 'producao')">
                    <i data-lucide="play"></i> Iniciar Produção
                </button>
            `;
        } else if (status === 'producao') {
            actionButtonsHtml = `
                <button class="btn btn-secondary" onclick="closeModal('modal-pedido'); changeOrderStatus('${pedido.id}', 'pedido feito')">
                    <i data-lucide="chevron-left"></i> Voltar p/ Feito
                </button>
                <button class="btn btn-primary" onclick="closeModal('modal-pedido'); changeOrderStatus('${pedido.id}', 'faturado')">
                    <i data-lucide="check"></i> Faturar Pedido
                </button>
            `;
        } else if (status === 'faturado') {
            actionButtonsHtml = `
                <button class="btn btn-secondary" onclick="closeModal('modal-pedido'); changeOrderStatus('${pedido.id}', 'producao')">
                    <i data-lucide="chevron-left"></i> Voltar p/ Produção
                </button>
                <button class="btn btn-primary" onclick="closeModal('modal-pedido'); changeOrderStatus('${pedido.id}', 'enviado')">
                    <i data-lucide="truck"></i> Despachar / Enviar
                </button>
            `;
        } else if (status === 'enviado') {
            actionButtonsHtml = `
                <button class="btn btn-secondary" onclick="closeModal('modal-pedido'); changeOrderStatus('${pedido.id}', 'faturado')">
                    <i data-lucide="chevron-left"></i> Voltar p/ Faturado
                </button>
                <button class="btn btn-success" style="color:white;" onclick="closeModal('modal-pedido'); changeOrderStatus('${pedido.id}', 'entregue')">
                    <i data-lucide="check-circle"></i> Confirmar Entrega
                </button>
            `;
        } else if (status === 'entregue') {
            actionButtonsHtml = `
                <span style="font-weight: 700; color: var(--color-success); display:flex; align-items:center; gap:6px;">
                    <i data-lucide="check-circle-2"></i> Pedido Entregue e Finalizado
                </span>
            `;
        }
    } else {
        // Vendedor apenas vê o status
        actionButtonsHtml = `
            <div style="font-weight: 600; color: var(--text-secondary);">
                Status Atual: ${getStatusBadge(pedido.status)}
            </div>
        `;
    }

    modalBody.innerHTML = `
        <div class="pedido-detalhe-header">
            <div class="pedido-detalhe-client-info">
                Cliente: <a href="#" onclick="closeModal('modal-pedido'); viewClientDetails('${pedido.clienteId}'); return false;" style="color: var(--color-primary); text-decoration: underline;">${pedido.clienteNome}</a>
            </div>
            <div class="pedido-detalhe-meta">
                <span>Data: ${formatDate(pedido.data)}</span>
                <span>Pagamento: <strong>${pedido.pagamento}</strong></span>
            </div>
            <div style="margin-top: 6px; display: flex; justify-content: space-between; align-items: center; font-size: 13px;">
                <span>Segmento: ${cliente ? cliente.segmento : 'N/A'}</span>
                <span>Status: ${getStatusBadge(pedido.status)}</span>
            </div>
        </div>

        <div class="pedido-detalhe-items-title">Itens do Pedido</div>
        <div class="pedido-detalhe-items-list">
            ${itemsHtml}
        </div>

        <div class="pedido-detalhe-summary-box">
            <div class="pedido-detalhe-summary-row">
                <span>Subtotal</span>
                <span>R$ ${pedido.subtotal.toFixed(2)}</span>
            </div>
            <div class="pedido-detalhe-summary-row">
                <span>Desconto</span>
                <span style="color: var(--color-danger);">- R$ ${pedido.desconto.toFixed(2)}</span>
            </div>
            <div class="pedido-detalhe-summary-row total-geral">
                <span>Total do Pedido</span>
                <span>R$ ${pedido.total.toFixed(2)}</span>
            </div>
        </div>

        <div class="pedido-detalhe-actions-box">
            ${actionButtonsHtml}
        </div>
    `;

    modal.classList.add('active');
    lucide.createIcons();
}

// ==========================================================================
// FASE 3: Portal do Cliente (Telas & Lógica)
// ==========================================================================

function renderClienteCatalogo(container) {
    let filteredProdutos = PRODUTOS_MOCK.filter(p => {
        const matchesSearch = p.nome.toLowerCase().includes(productSearchQuery.toLowerCase());
        const matchesCategory = productCategoryFilter === 'Todos' || p.categoria === productCategoryFilter;
        return matchesSearch && matchesCategory;
    });

    container.innerHTML = `
        <div class="order-screen-grid">
            <!-- Catálogo de Produtos -->
            <div>
                <div class="actions-bar" style="margin-bottom: 16px;">
                    <div class="search-box">
                        <i data-lucide="search"></i>
                        <input type="text" id="product-search-cliente" placeholder="Buscar produtos no catálogo..." value="${productSearchQuery}">
                    </div>
                    
                    <select id="product-filter-category-cliente" class="filter-select">
                        <option value="Todos" ${productCategoryFilter === 'Todos' ? 'selected' : ''}>Todos os Produtos</option>
                        <option value="Café" ${productCategoryFilter === 'Café' ? 'selected' : ''}>Cafés</option>
                        <option value="Insumos" ${productCategoryFilter === 'Insumos' ? 'selected' : ''}>Insumos</option>
                        <option value="Acessórios" ${productCategoryFilter === 'Acessórios' ? 'selected' : ''}>Acessórios</option>
                        <option value="Embalagens" ${productCategoryFilter === 'Embalagens' ? 'selected' : ''}>Embalagens</option>
                    </select>
                </div>

                <div class="product-grid">
                    ${filteredProdutos.map(p => {
                        const qty = appState.carrinho[p.id] || 0;
                        return `
                            <div class="product-card">
                                <div class="product-image">
                                    <span>${p.icone}</span>
                                </div>
                                <span class="product-category">${p.categoria}</span>
                                <div class="product-name">${p.nome}</div>
                                <div class="product-price">R$ ${p.preco.toFixed(2)}</div>
                                
                                <div class="product-actions">
                                    ${qty > 0 ? `
                                        <div class="quantity-control" style="width: 100%;">
                                            <button class="quantity-btn" onclick="updateCartQty('${p.id}', -1)" style="flex:1;">-</button>
                                            <span class="quantity-value" style="flex:1;">${qty}</span>
                                            <button class="quantity-btn" onclick="updateCartQty('${p.id}', 1)" style="flex:1;">+</button>
                                        </div>
                                    ` : `
                                        <button class="btn btn-primary btn-sm" onclick="updateCartQty('${p.id}', 1)" style="width:100%;">
                                            <i data-lucide="plus"></i> Adicionar
                                        </button>
                                    `}
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>

            <!-- Carrinho Lateral -->
            <div class="card cart-card">
                <div class="cart-header">
                    <h3 style="font-size: 16px; display:flex; align-items:center; gap:8px;">
                        <i data-lucide="shopping-cart"></i> Meu Carrinho
                    </h3>
                    ${Object.keys(appState.carrinho).length > 0 ? `
                        <button class="btn btn-secondary btn-sm" onclick="clearCart()" style="padding:4px 8px; font-size:11px;">Limpar</button>
                    ` : ''}
                </div>

                <div class="cart-items-list">
                    ${Object.keys(appState.carrinho).length === 0 ? `
                        <div class="cart-empty">
                            <i data-lucide="shopping-bag"></i>
                            <span>Seu carrinho está vazio</span>
                        </div>
                    ` : 
                      Object.entries(appState.carrinho).map(([pId, qty]) => {
                          const p = PRODUTOS_MOCK.find(item => item.id === pId);
                          if (!p) return '';
                          return `
                            <div class="cart-item">
                                <div class="cart-item-details">
                                    <div class="cart-item-name">${p.nome}</div>
                                    <div class="cart-item-price-qty">${qty}x R$ ${p.preco.toFixed(2)}</div>
                                </div>
                                <div class="cart-item-total">R$ ${(p.preco * qty).toFixed(2)}</div>
                                <button class="btn-icon" onclick="removeFromCart('${pId}')" style="margin-left: 8px; color: var(--color-danger); padding:4px;">
                                    <i data-lucide="trash-2" style="width:14px;height:14px;"></i>
                                </button>
                            </div>
                          `;
                      }).join('')
                    }
                </div>

                ${Object.keys(appState.carrinho).length > 0 ? `
                    <div class="cart-totals">
                        <div class="total-row grand-total">
                            <span>Total</span>
                            <span>R$ ${calculateCartSubtotal().toFixed(2)}</span>
                        </div>
                    </div>

                    <form id="form-cliente-finalizar" onsubmit="handleClienteFinalizarPedido(event)" class="order-form-inputs">
                        <div class="form-group" style="margin-bottom: 16px;">
                            <label for="cliente-pedido-pagamento">Forma de Pagamento Preferencial *</label>
                            <select id="cliente-pedido-pagamento" required>
                                <option value="Pix">Pix</option>
                                <option value="Cartão de Crédito">Cartão de Crédito</option>
                                <option value="Boleto 15 dias">Boleto (Faturado 15d)</option>
                            </select>
                        </div>
                        
                        <button type="submit" class="btn btn-primary" style="width: 100%;">
                            <i data-lucide="send"></i>
                            <span>Enviar Pedido p/ Linafer</span>
                        </button>
                    </form>
                ` : ''}
            </div>
        </div>
    `;

    // Listeners
    const searchInput = document.getElementById('product-search-cliente');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            productSearchQuery = e.target.value;
            renderClienteCatalogo(container);
            const input = document.getElementById('product-search-cliente');
            if (input) {
                input.focus();
                input.setSelectionRange(input.value.length, input.value.length);
            }
        });
    }

    const categorySelect = document.getElementById('product-filter-category-cliente');
    if (categorySelect) {
        categorySelect.addEventListener('change', (e) => {
            productCategoryFilter = e.target.value;
            renderClienteCatalogo(container);
        });
    }
}

function handleClienteFinalizarPedido(e) {
    e.preventDefault();
    const clienteId = appState.clienteLogadoId;
    const cliente = appState.clientes.find(c => c.id === clienteId);
    if (!cliente) return alert('Sessão expirada. Recarregue a página.');

    const pagamento = document.getElementById('cliente-pedido-pagamento').value;
    const subtotal = calculateCartSubtotal();
    
    const itens = Object.entries(appState.carrinho).map(([pId, qty]) => {
        const p = PRODUTOS_MOCK.find(item => item.id === pId);
        return {
            produtoId: pId,
            nome: p ? p.nome : 'Produto',
            quantidade: qty,
            preco: p ? p.preco : 0
        };
    });

    const novoPedido = {
        id: 'o_' + Date.now(),
        clienteId,
        clienteNome: cliente.nome,
        itens,
        subtotal,
        desconto: 0,
        total: subtotal,
        status: 'pedido feito', // Inicial
        pagamento,
        data: new Date().toISOString().split('T')[0],
        dataStatusUpdate: new Date().toISOString().split('T')[0]
    };

    appState.pedidos.push(novoPedido);
    appState.carrinho = {}; // Limpar
    saveState();
    
    alert('Seu pedido foi enviado com sucesso para a Linafer!');
    switchView('cliente-pedidos');
}

let clientePedidoSelecionadoId = null;

function renderClientePedidos(container) {
    const meusPedidos = appState.pedidos.filter(p => p.clienteId === appState.clienteLogadoId);
    
    // Se não houver nenhum pedido selecionado e houver pedidos, selecionar o mais recente
    if (!clientePedidoSelecionadoId && meusPedidos.length > 0) {
        meusPedidos.sort((a,b) => b.id.localeCompare(a.id));
        clientePedidoSelecionadoId = meusPedidos[0].id;
    } else if (meusPedidos.length === 0) {
        clientePedidoSelecionadoId = null;
    } else if (!meusPedidos.some(p => p.id === clientePedidoSelecionadoId)) {
        clientePedidoSelecionadoId = meusPedidos[0].id;
    }

    const pedidoSelecionado = meusPedidos.find(p => p.id === clientePedidoSelecionadoId);

    container.innerHTML = `
        <div class="order-screen-grid" style="grid-template-columns: 1fr 1.5fr;">
            <!-- Lista de Pedidos (Esquerda) -->
            <div>
                <h3 style="margin-bottom:12px;">Meus Pedidos</h3>
                <div class="cliente-order-history-grid">
                    ${meusPedidos.length === 0 ? `
                        <div class="card" style="text-align:center; padding: 32px 16px; color: var(--text-secondary);">
                            <i data-lucide="package-open" style="width: 40px; height: 40px; color: var(--text-muted); margin-bottom: 8px;"></i>
                            <p>Você ainda não realizou pedidos.</p>
                            <button class="btn btn-primary btn-sm" onclick="switchView('cliente-catalogo')" style="margin-top: 12px;">Fazer Meu Primeiro Pedido</button>
                        </div>
                    ` : 
                      meusPedidos.map(p => `
                        <div class="cliente-order-card ${p.id === clientePedidoSelecionadoId ? 'active' : ''}" style="${p.id === clientePedidoSelecionadoId ? 'border-color: var(--color-primary); background-color: var(--color-primary-light);' : ''}" onclick="selectClientePedido('${p.id}')">
                            <div class="cliente-order-card-header">
                                <span class="cliente-order-card-title">Pedido #${p.id.substring(2, 10) || p.id}</span>
                                <span class="cliente-order-card-date">${formatDate(p.data)}</span>
                            </div>
                            <div class="cliente-order-card-body">
                                <span class="cliente-order-card-summary">${p.itens.length} item(ns)</span>
                                <span class="cliente-order-card-total">R$ ${p.total.toFixed(2)}</span>
                            </div>
                            <div style="margin-top: 10px; display: flex; justify-content: space-between; align-items: center;">
                                <span>${getStatusBadge(p.status)}</span>
                                <span style="font-size:11px; color:var(--text-secondary);">${p.pagamento}</span>
                            </div>
                        </div>
                      `).join('')
                    }
                </div>
            </div>

            <!-- Detalhes & Timeline do Pedido Selecionado (Direita) -->
            <div>
                ${pedidoSelecionado ? `
                    <div class="card">
                        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #e2e8f0; padding-bottom:16px; margin-bottom: 20px;">
                            <div>
                                <h3 style="font-size:18px;">Acompanhamento do Pedido #${pedidoSelecionado.id.substring(2,10) || pedidoSelecionado.id}</h3>
                                <span style="font-size:12px; color:var(--text-secondary);">Data da Emissão: ${formatDate(pedidoSelecionado.data)}</span>
                            </div>
                            <div>
                                <span style="font-size:12px; color:var(--text-secondary);">Pagamento: <strong>${pedidoSelecionado.pagamento}</strong></span>
                            </div>
                        </div>

                        <!-- Timeline de Status Visual -->
                        <div class="status-timeline-container">
                            <div class="status-timeline">
                                ${renderTimelineSteps(pedidoSelecionado.status)}
                            </div>
                        </div>

                        <!-- Detalhes dos Itens do Pedido -->
                        <div class="pedido-detalhe-items-title" style="margin-top:24px;">Itens Solicitados</div>
                        <div class="pedido-detalhe-items-list" style="margin-bottom:24px;">
                            ${pedidoSelecionado.itens.map(item => `
                                <div class="pedido-detalhe-item-row" style="background-color: #f8fafc;">
                                    <div class="pedido-detalhe-item-qty" style="background-color: var(--color-primary-light); color: var(--color-primary);">${item.quantidade}</div>
                                    <div class="pedido-detalhe-item-desc">${item.nome}</div>
                                    <div class="pedido-detalhe-item-prices">
                                        <div class="pedido-detalhe-item-price-unit" style="font-size:10px;">R$ ${item.preco.toFixed(2)} un</div>
                                        <div class="pedido-detalhe-item-price-total">R$ ${(item.preco * item.quantidade).toFixed(2)}</div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>

                        <!-- Caixa de Totais -->
                        <div class="pedido-detalhe-summary-box" style="margin-bottom:0; background-color:#f1f5f9;">
                            <div class="pedido-detalhe-summary-row">
                                <span>Subtotal</span>
                                <span>R$ ${pedidoSelecionado.subtotal.toFixed(2)}</span>
                            </div>
                            <div class="pedido-detalhe-summary-row">
                                <span>Desconto</span>
                                <span style="color:var(--color-danger);">- R$ ${pedidoSelecionado.desconto.toFixed(2)}</span>
                            </div>
                            <div class="pedido-detalhe-summary-row total-geral">
                                <span>Valor Total</span>
                                <span>R$ ${pedidoSelecionado.total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                ` : `
                    <div class="card" style="text-align:center; padding: 48px; color: var(--text-muted);">
                        <i data-lucide="check-circle" style="width: 48px; height: 48px; margin-bottom: 12px; stroke-width:1;"></i>
                        <p>Selecione um pedido ao lado para acompanhar o status e a produção em tempo real.</p>
                    </div>
                `}
            </div>
        </div>
    `;
}

function selectClientePedido(pedidoId) {
    clientePedidoSelecionadoId = pedidoId;
    renderCurrentView();
}

function renderTimelineSteps(currentStatus) {
    const steps = [
        { status: 'pedido feito', label: 'Feito', icon: 'file-text' },
        { status: 'producao', label: 'Produção', icon: 'wrench' },
        { status: 'faturado', label: 'Faturado', icon: 'receipt' },
        { status: 'enviado', label: 'Enviado', icon: 'truck' },
        { status: 'entregue', label: 'Entregue', icon: 'check-circle-2' }
    ];

    const currentIndex = steps.findIndex(s => s.status === currentStatus);
    
    let html = '';
    
    steps.forEach((step, index) => {
        const isCompleted = index < currentIndex;
        const isActive = index === currentIndex;
        
        let stepClass = '';
        if (isCompleted) stepClass = 'completed';
        else if (isActive) stepClass = 'active';
        
        html += `
            <div class="timeline-step ${stepClass}">
                <div class="timeline-step-icon">
                    <i data-lucide="${step.icon}"></i>
                </div>
                <div class="timeline-step-label">${step.label}</div>
            </div>
        `;
        
        // Adicionar a linha de conexão se não for o último passo
        if (index < steps.length - 1) {
            const isLineCompleted = index < currentIndex;
            html += `<div class="timeline-line ${isLineCompleted ? 'completed' : ''}"></div>`;
        }
    });
    
    return html;
}

// Inicialização Geral do Aplicativo
window.addEventListener('DOMContentLoaded', initApp);
