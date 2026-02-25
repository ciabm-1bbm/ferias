// Configuração do Supabase
const SUPABASE_URL = 'https://afojrvjxcdxanoqcvjgm.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_YlCXizvQhRBprjD51ptpbg_asfFayMp';
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Função para verificar se o usuário está logado e redirecionar se necessário
async function verificarLogin() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user && !window.location.pathname.endsWith('index.html')) {
        window.location.href = 'index.html';
        return null;
    }
    return user;
}

// Função para buscar dados do usuário na tabela 'usuarios'
async function getUsuario(userId) {
    const { data, error } = await supabase
        .from('usuarios')
        .select('*, pelotoes(nome)')
        .eq('id', userId)
        .single();
    if (error) {
        console.error('Erro ao buscar usuário:', error);
        return null;
    }
    return data;
}

// Função para logout
async function logout() {
    await supabase.auth.signOut();
    window.location.href = 'index.html';
}

// Exporta as funções e o cliente supabase para uso nas páginas
window.app = {
    supabase,
    verificarLogin,
    getUsuario,
    logout
};
