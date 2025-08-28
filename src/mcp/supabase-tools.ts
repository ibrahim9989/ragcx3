import { supabase } from "../lib/supabase";

// Types for MCP tool operations
export interface QueryOptions {
  table: string;
  select?: string;
  filter?: Record<string, unknown>;
  limit?: number;
  orderBy?: {
    column: string;
    ascending?: boolean;
  };
}

export interface InsertOptions {
  table: string;
  data: Record<string, unknown> | Record<string, unknown>[];
}

export interface UpdateOptions {
  table: string;
  data: Record<string, unknown>;
  filter: Record<string, unknown>;
}

export interface DeleteOptions {
  table: string;
  filter: Record<string, unknown>;
}

export interface MCPResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  count?: number;
}

// MCP-style Supabase operations
export class SupabaseMCPTools {
  /**
   * Query data from Supabase table
   */
  static async query(options: QueryOptions): Promise<MCPResponse> {
    try {
      const { table, select = "*", filter, limit, orderBy } = options;

      let query = supabase.from(table).select(select);

      // Apply filters
      if (filter) {
        Object.entries(filter).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            query = query.in(key, value);
          } else if (typeof value === "string" && value.includes("%")) {
            query = query.like(key, value);
          } else {
            query = query.eq(key, value);
          }
        });
      }

      // Apply ordering
      if (orderBy) {
        query = query.order(orderBy.column, {
          ascending: orderBy.ascending ?? true,
        });
      }

      // Apply limit
      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;

      if (error) {
        return {
          success: false,
          error: `Query failed: ${error.message}`,
        };
      }

      return {
        success: true,
        data,
        count: data?.length || 0,
        message: `Successfully queried ${
          data?.length || 0
        } records from ${table}`,
      };
    } catch (error) {
      return {
        success: false,
        error: `Query error: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      };
    }
  }

  /**
   * Insert data into Supabase table
   */
  static async insert(options: InsertOptions): Promise<MCPResponse> {
    try {
      const { table, data } = options;

      const { data: result, error } = await supabase
        .from(table)
        .insert(data)
        .select();

      if (error) {
        return {
          success: false,
          error: `Insert failed: ${error.message}`,
        };
      }

      return {
        success: true,
        data: result,
        count: Array.isArray(result) ? result.length : 1,
        message: `Successfully inserted ${
          Array.isArray(result) ? result.length : 1
        } record(s) into ${table}`,
      };
    } catch (error) {
      return {
        success: false,
        error: `Insert error: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      };
    }
  }

  /**
   * Update data in Supabase table
   */
  static async update(options: UpdateOptions): Promise<MCPResponse> {
    try {
      const { table, data, filter } = options;

      let query = supabase.from(table).update(data);

      // Apply filters
      Object.entries(filter).forEach(([key, value]) => {
        query = query.eq(key, value);
      });

      const { data: result, error } = await query.select();

      if (error) {
        return {
          success: false,
          error: `Update failed: ${error.message}`,
        };
      }

      return {
        success: true,
        data: result,
        count: Array.isArray(result) ? result.length : 0,
        message: `Successfully updated ${
          Array.isArray(result) ? result.length : 0
        } record(s) in ${table}`,
      };
    } catch (error) {
      return {
        success: false,
        error: `Update error: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      };
    }
  }

  /**
   * Delete data from Supabase table
   */
  static async delete(options: DeleteOptions): Promise<MCPResponse> {
    try {
      const { table, filter } = options;

      let query = supabase.from(table).delete();

      // Apply filters
      Object.entries(filter).forEach(([key, value]) => {
        query = query.eq(key, value);
      });

      const { error, count } = await query;

      if (error) {
        return {
          success: false,
          error: `Delete failed: ${error.message}`,
        };
      }

      return {
        success: true,
        count: count || 0,
        message: `Successfully deleted ${count || 0} record(s) from ${table}`,
      };
    } catch (error) {
      return {
        success: false,
        error: `Delete error: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      };
    }
  }

  /**
   * Get table schema information
   */
  static async getSchema(table?: string): Promise<MCPResponse> {
    try {
      // For now, we'll return a basic schema - this could be enhanced with actual introspection
      const message = table
        ? `Schema information for table: ${table}`
        : "Schema information for all tables";

      return {
        success: true,
        data: {
          message,
          note: "Schema introspection can be implemented based on your Supabase setup",
        },
        message,
      };
    } catch (error) {
      return {
        success: false,
        error: `Schema error: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      };
    }
  }

  /**
   * Execute a custom RPC function
   */
  static async executeRPC(
    functionName: string,
    params?: Record<string, unknown>
  ): Promise<MCPResponse> {
    try {
      const { data, error } = await supabase.rpc(functionName, params);

      if (error) {
        return {
          success: false,
          error: `RPC failed: ${error.message}`,
        };
      }

      return {
        success: true,
        data,
        message: `Successfully executed RPC function: ${functionName}`,
      };
    } catch (error) {
      return {
        success: false,
        error: `RPC error: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      };
    }
  }

  /**
   * Batch operations helper
   */
  static async batch(
    operations: Array<{
      type: "query" | "insert" | "update" | "delete";
      options: QueryOptions | InsertOptions | UpdateOptions | DeleteOptions;
    }>
  ): Promise<MCPResponse[]> {
    const results: MCPResponse[] = [];

    for (const operation of operations) {
      let result: MCPResponse;

      switch (operation.type) {
        case "query":
          result = await this.query(operation.options as QueryOptions);
          break;
        case "insert":
          result = await this.insert(operation.options as InsertOptions);
          break;
        case "update":
          result = await this.update(operation.options as UpdateOptions);
          break;
        case "delete":
          result = await this.delete(operation.options as DeleteOptions);
          break;
        default:
          result = {
            success: false,
            error: `Unknown operation type: ${
              (operation as { type: string }).type
            }`,
          };
      }

      results.push(result);
    }

    return results;
  }
}

// Export individual functions for convenience
export const {
  query: mcpQuery,
  insert: mcpInsert,
  update: mcpUpdate,
  delete: mcpDelete,
  getSchema: mcpGetSchema,
  executeRPC: mcpExecuteRPC,
  batch: mcpBatch,
} = SupabaseMCPTools;
