import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { supabase } from "../lib/supabase.js";

// Type definitions for MCP tool arguments
interface QueryArgs {
  table: string;
  select?: string;
  filter?: Record<string, unknown>;
  limit?: number;
}

interface InsertArgs {
  table: string;
  data: Record<string, unknown> | Record<string, unknown>[];
}

interface UpdateArgs {
  table: string;
  data: Record<string, unknown>;
  filter: Record<string, unknown>;
}

interface DeleteArgs {
  table: string;
  filter: Record<string, unknown>;
}

interface SchemaArgs {
  table?: string;
}

class SupabaseMCPServer {
  private server: Server;

  constructor() {
    this.server = new Server(
      {
        name: "supabase-mcp-server",
        version: "1.0.0",
        description: "MCP server for Supabase database operations",
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();
  }

  private setupToolHandlers() {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: "supabase_query",
            description: "Execute a SELECT query on Supabase database",
            inputSchema: {
              type: "object",
              properties: {
                table: {
                  type: "string",
                  description: "The table name to query from",
                },
                select: {
                  type: "string",
                  description: "Columns to select (default: *)",
                  default: "*",
                },
                filter: {
                  type: "object",
                  description: "Filter conditions as key-value pairs",
                  additionalProperties: true,
                },
                limit: {
                  type: "number",
                  description: "Maximum number of rows to return",
                },
              },
              required: ["table"],
            },
          },
          {
            name: "supabase_insert",
            description: "Insert data into a Supabase table",
            inputSchema: {
              type: "object",
              properties: {
                table: {
                  type: "string",
                  description: "The table name to insert into",
                },
                data: {
                  type: "object",
                  description: "Data to insert as key-value pairs",
                  additionalProperties: true,
                },
              },
              required: ["table", "data"],
            },
          },
          {
            name: "supabase_update",
            description: "Update data in a Supabase table",
            inputSchema: {
              type: "object",
              properties: {
                table: {
                  type: "string",
                  description: "The table name to update",
                },
                data: {
                  type: "object",
                  description: "Data to update as key-value pairs",
                  additionalProperties: true,
                },
                filter: {
                  type: "object",
                  description: "Filter conditions as key-value pairs",
                  additionalProperties: true,
                },
              },
              required: ["table", "data", "filter"],
            },
          },
          {
            name: "supabase_delete",
            description: "Delete data from a Supabase table",
            inputSchema: {
              type: "object",
              properties: {
                table: {
                  type: "string",
                  description: "The table name to delete from",
                },
                filter: {
                  type: "object",
                  description: "Filter conditions as key-value pairs",
                  additionalProperties: true,
                },
              },
              required: ["table", "filter"],
            },
          },
          {
            name: "supabase_get_schema",
            description: "Get the schema information for tables",
            inputSchema: {
              type: "object",
              properties: {
                table: {
                  type: "string",
                  description:
                    "Specific table name (optional - returns all tables if not provided)",
                },
              },
            },
          },
        ],
      };
    });

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        // Ensure args is defined and is an object
        const toolArgs = args || {};

        switch (name) {
          case "supabase_query":
            return await this.handleQuery(toolArgs as unknown as QueryArgs);
          case "supabase_insert":
            return await this.handleInsert(toolArgs as unknown as InsertArgs);
          case "supabase_update":
            return await this.handleUpdate(toolArgs as unknown as UpdateArgs);
          case "supabase_delete":
            return await this.handleDelete(toolArgs as unknown as DeleteArgs);
          case "supabase_get_schema":
            return await this.handleGetSchema(
              toolArgs as unknown as SchemaArgs
            );
          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error executing ${name}: ${
                error instanceof Error ? error.message : "Unknown error"
              }`,
            },
          ],
        };
      }
    });
  }

  private async handleQuery(args: QueryArgs) {
    const { table, select = "*", filter, limit } = args;

    let query = supabase.from(table).select(select);

    if (filter) {
      Object.entries(filter).forEach(([key, value]) => {
        query = query.eq(key, value);
      });
    }

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(`Query failed: ${error.message}`);
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              success: true,
              data,
              count: data?.length || 0,
            },
            null,
            2
          ),
        },
      ],
    };
  }

  private async handleInsert(args: InsertArgs) {
    const { table, data } = args;

    const { data: result, error } = await supabase
      .from(table)
      .insert(data)
      .select();

    if (error) {
      throw new Error(`Insert failed: ${error.message}`);
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              success: true,
              data: result,
              message: "Data inserted successfully",
            },
            null,
            2
          ),
        },
      ],
    };
  }

  private async handleUpdate(args: UpdateArgs) {
    const { table, data, filter } = args;

    let query = supabase.from(table).update(data);

    Object.entries(filter).forEach(([key, value]) => {
      query = query.eq(key, value);
    });

    const { data: result, error } = await query.select();

    if (error) {
      throw new Error(`Update failed: ${error.message}`);
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              success: true,
              data: result,
              message: "Data updated successfully",
            },
            null,
            2
          ),
        },
      ],
    };
  }

  private async handleDelete(args: DeleteArgs) {
    const { table, filter } = args;

    let query = supabase.from(table).delete();

    Object.entries(filter).forEach(([key, value]) => {
      query = query.eq(key, value);
    });

    const { error } = await query;

    if (error) {
      throw new Error(`Delete failed: ${error.message}`);
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              success: true,
              message: "Data deleted successfully",
            },
            null,
            2
          ),
        },
      ],
    };
  }

  private async handleGetSchema(args: SchemaArgs) {
    const { table } = args;

    try {
      // This is a basic schema query - in practice you might want to use Supabase's introspection
      const query = table
        ? `SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_name = '${table}'`
        : `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`;

      const { data, error } = await supabase.rpc("exec_sql", { sql: query });

      if (error) {
        throw new Error(`Schema query failed: ${error.message}`);
      }

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                success: true,
                schema: data,
                table: table || "all_tables",
              },
              null,
              2
            ),
          },
        ],
      };
    } catch (error) {
      // Fallback if RPC is not available
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                success: false,
                message:
                  "Schema introspection not available. Please check your Supabase RPC configuration.",
                error: error instanceof Error ? error.message : "Unknown error",
              },
              null,
              2
            ),
          },
        ],
      };
    }
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("Supabase MCP Server running on stdio");
  }
}

// Export for use in other modules
export { SupabaseMCPServer };

// Run the server if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const server = new SupabaseMCPServer();
  server.run().catch(console.error);
}
