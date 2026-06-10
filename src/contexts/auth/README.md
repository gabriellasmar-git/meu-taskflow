# Contexto de Autenticação

Gerencia o estado de login, cadastro e sessão do usuário utilizando Supabase Auth.

## Estrutura
- `hooks- `hooks/useAuth.ts`: Hook para acessar dados do usuário e métodos de login/logout.
- `components/LoginForm.tsx`: Formulário de login.
- `components/RegisterForm.tsx`: Formulário de cadastro.

## Decisões Técnicas
- Persistência de sessão via Supabase (localStorage por padrão).
- Redirecionamento automático após login bem-sucedido.