import { createPublicFormsPlugin, LeadSubmitError, type PublicLeadDataProvider } from '@fayz-ai/plugin-crm/public'
import { createClient } from '@supabase/supabase-js'

const tenantId = import.meta.env.VITE_WALTERS_TENANT_ID?.trim()
const supabaseUrl = import.meta.env.VITE_WALTERS_SUPABASE_URL?.trim()
const publishableKey = import.meta.env.VITE_WALTERS_SUPABASE_PUBLISHABLE_KEY?.trim()

// Never send or retain personal data in the visual preview. All three public
// settings are required before this SDK form can submit to the CRM RPC.
export const franchiseLeadEnabled = Boolean(tenantId && supabaseUrl && publishableKey)

const client = franchiseLeadEnabled
  ? createClient(supabaseUrl!, publishableKey!, {
      auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false },
    })
  : null

const dataProvider: PublicLeadDataProvider = {
  async createLead(input) {
    if (!client || !tenantId) {
      throw new LeadSubmitError('unavailable', 'O envio ainda não está conectado ao CRM.')
    }
    const { data, error } = await client.rpc('create_public_lead', {
      p_tenant_id: tenantId,
      p_name: input.name,
      p_phone: input.phone ?? null,
      p_email: input.email ?? null,
      p_form_id: input.formId,
      p_form_name: input.formName,
      p_fields: input.fields,
      p_notes: input.notes ?? null,
      p_utm: input.attribution,
      p_tags: input.tags ?? [],
      p_attachments: [],
      p_document: null,
    })
    if (error) throw new LeadSubmitError('unavailable', 'Não foi possível enviar agora. Tente novamente mais tarde.')
    const row = Array.isArray(data) ? data[0] as { lead_id?: string; created_at?: string } | undefined : undefined
    if (!row?.lead_id || !row.created_at) throw new LeadSubmitError('unavailable', 'Não recebemos a confirmação do CRM.')
    return { leadId: row.lead_id, createdAt: row.created_at }
  },
}

export const franchiseLeadPlugin = createPublicFormsPlugin({
  tenantId: tenantId || 'walters-preview-unconfigured',
  forms: [{
    id: 'franchise-interest',
    name: 'Interesse em franquia Walter’s',
    required: ['name', 'email', 'phone', 'city'],
    identity: { name: 'name', email: 'email', phone: 'phone', notes: 'message' },
    labels: { city: 'Cidade de interesse', state: 'Estado', experience: 'Experiência no setor', consent: 'Autorização de contato' },
    tags: ['franquias', 'site-walters'],
  }],
  dataProvider,
  inbox: false,
  uploads: false,
})
