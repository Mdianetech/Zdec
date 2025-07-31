export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      team_members: {
        Row: {
          id: string
          name: string
          role: string
          description: string | null
          image_url: string | null
          linkedin_url: string | null
          crop_position_x: number
          crop_position_y: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          role: string
          description?: string | null
          image_url?: string | null
          linkedin_url?: string | null
          crop_position_x?: number
          crop_position_y?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          role?: string
          description?: string | null
          image_url?: string | null
          linkedin_url?: string | null
          crop_position_x?: number
          crop_position_y?: number
          created_at?: string
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          title: string
          description: string | null
          date: string
          category: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          date?: string
          category?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          date?: string
          category?: string
          created_at?: string
          updated_at?: string
        }
      }
      project_content: {
        Row: {
          id: string
          project_id: string
          type: string
          content: string
          order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          project_id: string
          type: string
          content: string
          order: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          type?: string
          content?: string
          order?: number
          created_at?: string
          updated_at?: string
        }
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
  }
}