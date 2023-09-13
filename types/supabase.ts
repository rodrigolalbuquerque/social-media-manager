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
      hashtags_Block: {
        Row: {
          content: string
          hBlockName: string
          id: number
        }
        Insert: {
          content: string
          hBlockName: string
          id?: number
        }
        Update: {
          content?: string
          hBlockName?: string
          id?: number
        }
        Relationships: []
      }
      post: {
        Row: {
          date: string | null
          id: number
          isPosted: boolean
        }
        Insert: {
          date?: string | null
          id?: number
          isPosted?: boolean
        }
        Update: {
          date?: string | null
          id?: number
          isPosted?: boolean
        }
        Relationships: []
      }
      post_img: {
        Row: {
          id: number
          img: string | null
          postId: number
        }
        Insert: {
          id?: number
          img?: string | null
          postId: number
        }
        Update: {
          id?: number
          img?: string | null
          postId?: number
        }
        Relationships: [
          {
            foreignKeyName: "post_img_postId_fkey"
            columns: ["postId"]
            referencedRelation: "post"
            referencedColumns: ["id"]
          }
        ]
      }
      post_text: {
        Row: {
          hBlockId: number | null
          id: number
          postId: number | null
          text: string | null
        }
        Insert: {
          hBlockId?: number | null
          id?: number
          postId?: number | null
          text?: string | null
        }
        Update: {
          hBlockId?: number | null
          id?: number
          postId?: number | null
          text?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "post_text_hBlockId_fkey"
            columns: ["hBlockId"]
            referencedRelation: "hashtags_Block"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_text_postId_fkey"
            columns: ["postId"]
            referencedRelation: "post"
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
