

# Plano: Igreja CRM — Sistema Completo

Este é um projeto grande. Vou dividir em fases para implementar de forma incremental e segura.

---

## Fase 1 — Base de Dados e Autenticação (Prioridade)

### Tabelas a criar:

1. **profiles** — dados do utilizador autenticado (nome, avatar, telefone)
2. **user_roles** — roles com enum: `super_admin`, `admin`, `pastor`, `secretario`, `tesoureiro`, `multimedia`, `professor_infantil`, `lider_ministerio`, `membro`, `voluntario`
3. **members** — membros da igreja (nome, email, telefone, morada, data nascimento, batismo, status, tipo: membro/visitante)
4. **visitors** — visitantes com campo `converted_to_member` e data da primeira visita
5. **discipleship** — discipulado (mentor_id, disciple_id, status, notas, datas)
6. **events** — eventos (título, descrição, data, local, tipo, recorrência)
7. **event_attendees** — presenças em eventos
8. **volunteers** — voluntários (member_id, ministério, disponibilidade, status)
9. **blog_posts** — artigos (título, conteúdo, autor, status draft/published, tags)
10. **chat_messages** — mensagens internas (remetente, destinatário ou grupo, conteúdo, timestamp)
11. **chat_rooms** — salas de chat (nome, tipo: direto/grupo)

### Autenticação:
- Página de Login/Registo com email + password
- Proteção de rotas por role
- AuthContext global com session listener

---

## Fase 2 — Páginas e Navegação

### Páginas a criar/atualizar:

| Rota | Página | Descrição |
|------|--------|-----------|
| `/login` | Login | Login + Registo |
| `/` | Dashboard | Cards dinâmicos com dados reais do BD |
| `/members` | Membros | CRUD completo, filtros, pesquisa |
| `/visitors` | Visitantes | Registo de visitantes, conversão a membro |
| `/discipleship` | Discipulado | Relações mentor-discípulo, progresso |
| `/events` | Eventos | Calendário, criar/editar eventos, presenças |
| `/volunteers` | Voluntários | Gestão de voluntários por ministério |
| `/financial` | Financeiro | Dízimos, ofertas, relatórios |
| `/chat` | Chat | Mensagens internas entre membros |
| `/blog` | Blog | Criar/editar artigos, publicar |
| `/settings` | Configurações | Perfil, preferências |

### Sidebar atualizada:
- Adicionar Visitantes, Discipulado, Voluntários
- Mostrar/esconder itens conforme role do utilizador

---

## Fase 3 — Funcionalidades Avançadas

- **Mensagem de boas-vindas automática**: quando visitante é registado, enviar notificação/email
- **Integração YouTube**: embed de vídeos na página de Mídia (API pública, sem chave necessária para embeds)
- **WhatsApp Business**: requer integração futura via Twilio connector (disponível)

---

## Abordagem de Implementação

Dado o tamanho, recomendo implementar em **3 mensagens**:

1. **Mensagem 1**: Criar todas as tabelas + RLS + autenticação + login/registo + AuthContext + proteção de rotas
2. **Mensagem 2**: Páginas de Membros, Visitantes, Discipulado, Voluntários (CRUD completo com BD)
3. **Mensagem 3**: Eventos, Chat, Blog + Dashboard dinâmico + sidebar por role

### Detalhes técnicos:
- Enum `app_role` para os 10 cargos definidos
- Função `has_role()` security definer para RLS sem recursão
- Trigger para criar perfil automaticamente no signup
- RLS em todas as tabelas
- Sidebar condicional por role (super_admin vê tudo, membro vê limitado)

