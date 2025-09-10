export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      banned_emails: {
        Row: {
          banned_by: string | null
          created_at: string
          email: string
          id: string
          reason: string | null
        }
        Insert: {
          banned_by?: string | null
          created_at?: string
          email: string
          id?: string
          reason?: string | null
        }
        Update: {
          banned_by?: string | null
          created_at?: string
          email?: string
          id?: string
          reason?: string | null
        }
        Relationships: []
      }
      blog_categories: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          name: string
          slug: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          name: string
          slug: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          name?: string
          slug?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      blog_post_views: {
        Row: {
          id: string
          ip_address: unknown | null
          post_id: string
          user_agent: string | null
          viewed_at: string
        }
        Insert: {
          id?: string
          ip_address?: unknown | null
          post_id: string
          user_agent?: string | null
          viewed_at?: string
        }
        Update: {
          id?: string
          ip_address?: unknown | null
          post_id?: string
          user_agent?: string | null
          viewed_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_post_views_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts: {
        Row: {
          author_id: string | null
          category: string
          category_id: string | null
          content: string
          created_at: string
          excerpt: string | null
          featured_image: string | null
          id: string
          published_at: string | null
          slug: string
          status: string | null
          title: string
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          category: string
          category_id?: string | null
          content: string
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          published_at?: string | null
          slug: string
          status?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string | null
          category?: string
          category_id?: string | null
          content?: string
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          published_at?: string | null
          slug?: string
          status?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "blog_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_submissions: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          status: string | null
          subject: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          status?: string | null
          subject?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          status?: string | null
          subject?: string | null
        }
        Relationships: []
      }
      cookie_consents: {
        Row: {
          analytics_cookies: boolean
          consent_given: boolean
          consent_timestamp: string
          consent_version: string
          essential_cookies: boolean
          id: string
          ip_address: unknown | null
          marketing_cookies: boolean
          page_url: string | null
          preferences_cookies: boolean
          referrer: string | null
          session_id: string | null
          updated_at: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          analytics_cookies?: boolean
          consent_given?: boolean
          consent_timestamp?: string
          consent_version?: string
          essential_cookies?: boolean
          id?: string
          ip_address?: unknown | null
          marketing_cookies?: boolean
          page_url?: string | null
          preferences_cookies?: boolean
          referrer?: string | null
          session_id?: string | null
          updated_at?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          analytics_cookies?: boolean
          consent_given?: boolean
          consent_timestamp?: string
          consent_version?: string
          essential_cookies?: boolean
          id?: string
          ip_address?: unknown | null
          marketing_cookies?: boolean
          page_url?: string | null
          preferences_cookies?: boolean
          referrer?: string | null
          session_id?: string | null
          updated_at?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      custom_quote_requests: {
        Row: {
          admin_notes: string | null
          budget_range: string | null
          company: string | null
          created_at: string
          email: string
          has_existing_branding: boolean | null
          id: string
          name: string
          needs_hosting: boolean | null
          needs_maintenance: boolean | null
          phone: string | null
          project_description: string
          project_type: string
          quote_amount: number | null
          quoted_at: string | null
          quoted_by: string | null
          special_requirements: string | null
          status: string
          timeline: string | null
          updated_at: string
        }
        Insert: {
          admin_notes?: string | null
          budget_range?: string | null
          company?: string | null
          created_at?: string
          email: string
          has_existing_branding?: boolean | null
          id?: string
          name: string
          needs_hosting?: boolean | null
          needs_maintenance?: boolean | null
          phone?: string | null
          project_description: string
          project_type: string
          quote_amount?: number | null
          quoted_at?: string | null
          quoted_by?: string | null
          special_requirements?: string | null
          status?: string
          timeline?: string | null
          updated_at?: string
        }
        Update: {
          admin_notes?: string | null
          budget_range?: string | null
          company?: string | null
          created_at?: string
          email?: string
          has_existing_branding?: boolean | null
          id?: string
          name?: string
          needs_hosting?: boolean | null
          needs_maintenance?: boolean | null
          phone?: string | null
          project_description?: string
          project_type?: string
          quote_amount?: number | null
          quoted_at?: string | null
          quoted_by?: string | null
          special_requirements?: string | null
          status?: string
          timeline?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      customer_services: {
        Row: {
          created_at: string
          customer_id: string
          id: string
          payment_type: string
          service_name: string
          service_price: number
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer_id: string
          id?: string
          payment_type?: string
          service_name: string
          service_price?: number
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          customer_id?: string
          id?: string
          payment_type?: string
          service_name?: string
          service_price?: number
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "customer_services_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          approval_status: string
          approved_at: string | null
          approved_by: string | null
          company: string | null
          created_at: string
          email: string
          id: string
          jobs_completed: number
          name: string
          next_payment_date: string | null
          payment_amount: number
          phone: string | null
          plan_name: string
          plan_price: number
          updated_at: string
          user_id: string | null
          website_url: string | null
        }
        Insert: {
          approval_status?: string
          approved_at?: string | null
          approved_by?: string | null
          company?: string | null
          created_at?: string
          email: string
          id?: string
          jobs_completed?: number
          name: string
          next_payment_date?: string | null
          payment_amount?: number
          phone?: string | null
          plan_name?: string
          plan_price?: number
          updated_at?: string
          user_id?: string | null
          website_url?: string | null
        }
        Update: {
          approval_status?: string
          approved_at?: string | null
          approved_by?: string | null
          company?: string | null
          created_at?: string
          email?: string
          id?: string
          jobs_completed?: number
          name?: string
          next_payment_date?: string | null
          payment_amount?: number
          phone?: string | null
          plan_name?: string
          plan_price?: number
          updated_at?: string
          user_id?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      newsletter_subscriptions: {
        Row: {
          email: string
          id: string
          status: string | null
          subscribed_at: string
        }
        Insert: {
          email: string
          id?: string
          status?: string | null
          subscribed_at?: string
        }
        Update: {
          email?: string
          id?: string
          status?: string | null
          subscribed_at?: string
        }
        Relationships: []
      }
      orders: {
        Row: {
          amount: number
          created_at: string
          currency: string | null
          customer_company: string | null
          customer_email: string | null
          customer_name: string | null
          customer_phone: string | null
          id: string
          service_name: string | null
          status: string | null
          stripe_session_id: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string | null
          customer_company?: string | null
          customer_email?: string | null
          customer_name?: string | null
          customer_phone?: string | null
          id?: string
          service_name?: string | null
          status?: string | null
          stripe_session_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string | null
          customer_company?: string | null
          customer_email?: string | null
          customer_name?: string | null
          customer_phone?: string | null
          id?: string
          service_name?: string | null
          status?: string | null
          stripe_session_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          company: string | null
          created_at: string
          full_name: string | null
          id: string
          phone: string | null
          role: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          company?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          role?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          company?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          role?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      promo_strips: {
        Row: {
          background_color: string
          created_at: string
          end_date: string
          id: string
          is_active: boolean
          text: string
          text_color: string
          updated_at: string
        }
        Insert: {
          background_color?: string
          created_at?: string
          end_date: string
          id?: string
          is_active?: boolean
          text: string
          text_color?: string
          updated_at?: string
        }
        Update: {
          background_color?: string
          created_at?: string
          end_date?: string
          id?: string
          is_active?: boolean
          text?: string
          text_color?: string
          updated_at?: string
        }
        Relationships: []
      }
      template_purchases: {
        Row: {
          business_name: string
          color_preferences: string | null
          created_at: string
          email: string
          id: string
          image_urls: string[] | null
          logo_url: string | null
          name: string | null
          phone: string | null
          services_offered: string | null
          status: string
          stripe_session_id: string | null
          submitted_at: string
          template_name: string
          updated_at: string
        }
        Insert: {
          business_name: string
          color_preferences?: string | null
          created_at?: string
          email: string
          id?: string
          image_urls?: string[] | null
          logo_url?: string | null
          name?: string | null
          phone?: string | null
          services_offered?: string | null
          status?: string
          stripe_session_id?: string | null
          submitted_at?: string
          template_name: string
          updated_at?: string
        }
        Update: {
          business_name?: string
          color_preferences?: string | null
          created_at?: string
          email?: string
          id?: string
          image_urls?: string[] | null
          logo_url?: string | null
          name?: string | null
          phone?: string | null
          services_offered?: string | null
          status?: string
          stripe_session_id?: string | null
          submitted_at?: string
          template_name?: string
          updated_at?: string
        }
        Relationships: []
      }
      website_setup_submissions: {
        Row: {
          business_name: string
          created_at: string
          email: string
          id: string
          images_urls: string[] | null
          logo_url: string | null
          name: string
          phone: string | null
          services_offered: string | null
          style_preferences: string | null
        }
        Insert: {
          business_name: string
          created_at?: string
          email: string
          id?: string
          images_urls?: string[] | null
          logo_url?: string | null
          name: string
          phone?: string | null
          services_offered?: string | null
          style_preferences?: string | null
        }
        Update: {
          business_name?: string
          created_at?: string
          email?: string
          id?: string
          images_urls?: string[] | null
          logo_url?: string | null
          name?: string
          phone?: string | null
          services_offered?: string | null
          style_preferences?: string | null
        }
        Relationships: []
      }
      work_requests: {
        Row: {
          completed_at: string | null
          created_at: string
          customer_id: string
          customer_responded_at: string | null
          customer_response: string | null
          description: string | null
          estimated_timeline: number | null
          hours_logged: number | null
          id: string
          notes: string | null
          quote_price: number | null
          requested_at: string
          reviewed_at: string | null
          status: string
          timeline_unit: string | null
          title: string
          updated_at: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          customer_id: string
          customer_responded_at?: string | null
          customer_response?: string | null
          description?: string | null
          estimated_timeline?: number | null
          hours_logged?: number | null
          id?: string
          notes?: string | null
          quote_price?: number | null
          requested_at?: string
          reviewed_at?: string | null
          status?: string
          timeline_unit?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          customer_id?: string
          customer_responded_at?: string | null
          customer_response?: string | null
          description?: string | null
          estimated_timeline?: number | null
          hours_logged?: number | null
          id?: string
          notes?: string | null
          quote_price?: number | null
          requested_at?: string
          reviewed_at?: string | null
          status?: string
          timeline_unit?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "work_requests_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_customer_bypassing_rls: {
        Args: {
          p_company?: string
          p_email: string
          p_name: string
          p_user_id: string
        }
        Returns: string
      }
      create_user_profile: {
        Args: {
          full_name_param?: string
          role_param?: string
          user_id_param: string
        }
        Returns: undefined
      }
      generate_slug: {
        Args: { title_text: string }
        Returns: string
      }
      get_current_user_role: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
