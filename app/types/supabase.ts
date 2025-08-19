export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      category: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      company: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      counsel: {
        Row: {
          company_id: number | null
          counsel_type_id: number | null
          created_at: string
          id: number
          product_id: number | null
          user_id: number | null
        }
        Insert: {
          company_id?: number | null
          counsel_type_id?: number | null
          created_at?: string
          id?: number
          product_id?: number | null
          user_id?: number | null
        }
        Update: {
          company_id?: number | null
          counsel_type_id?: number | null
          created_at?: string
          id?: number
          product_id?: number | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "counsel_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "company"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "counsel_counsel_type_id_fkey"
            columns: ["counsel_type_id"]
            isOneToOne: false
            referencedRelation: "counsel_type"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "counsel_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "counsel"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "counsel_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      counsel_type: {
        Row: {
          created_at: string
          description: string | null
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          name?: string
        }
        Relationships: []
      }
      otp: {
        Row: {
          code: string
          created_at: string
          id: string
          phone: string
        }
        Insert: {
          code: string
          created_at?: string
          id?: string
          phone: string
        }
        Update: {
          code?: string
          created_at?: string
          id?: string
          phone?: string
        }
        Relationships: []
      }
      product: {
        Row: {
          category_id: number | null
          company_id: number | null
          created_at: string
          id: number
          name: string
        }
        Insert: {
          category_id?: number | null
          company_id?: number | null
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          category_id?: number | null
          company_id?: number | null
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "category"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "company"
            referencedColumns: ["id"]
          },
        ]
      }
      user: {
        Row: {
          birth: string
          created_at: string
          gender: string
          id: number
          name: string
          phone: string
          updated_at: string
        }
        Insert: {
          birth: string
          created_at?: string
          gender: string
          id?: number
          name: string
          phone: string
          updated_at?: string
        }
        Update: {
          birth?: string
          created_at?: string
          gender?: string
          id?: number
          name?: string
          phone?: string
          updated_at?: string
        }
        Relationships: []
      }
      visitor_tracking: {
        Row: {
          id: string
          created_at: string
          ip_address: string | null
          carrier: string | null
          session_count: number | null
          page_url: string | null
          device_model: string | null
          device_type: string | null
          browser: string | null
          os: string | null
          traffic_source: string | null
          referrer: string | null
          search_keyword: string | null
          search_engine: string | null
          counsel_type_id: number | null
          name: string | null
          phone: string | null
          user_agent: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          ip_address?: string | null
          carrier?: string | null
          session_count?: number | null
          page_url?: string | null
          device_model?: string | null
          device_type?: string | null
          browser?: string | null
          os?: string | null
          traffic_source?: string | null
          referrer?: string | null
          search_keyword?: string | null
          search_engine?: string | null
          counsel_type_id?: number | null
          name?: string | null
          phone?: string | null
          user_agent?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          ip_address?: string | null
          carrier?: string | null
          session_count?: number | null
          page_url?: string | null
          device_model?: string | null
          device_type?: string | null
          browser?: string | null
          os?: string | null
          traffic_source?: string | null
          referrer?: string | null
          search_keyword?: string | null
          search_engine?: string | null
          counsel_type_id?: number | null
          name?: string | null
          phone?: string | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "visitor_tracking_counsel_type_id_fkey"
            columns: ["counsel_type_id"]
            isOneToOne: false
            referencedRelation: "counsel_type"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
