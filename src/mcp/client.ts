import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

type QueryOptions = Record<string, unknown>;
type TableData = Record<string, unknown>;
type FilterOptions = Record<string, unknown>;

export interface MCPClientConfig {
  serverPath?: string;
  serverArgs?: string[];
}

export class SupabaseMCPClient {
  private client: Client;
  private transport: StdioClientTransport | null = null;
  private isConnected = false;
  private config: MCPClientConfig;

  constructor(config: MCPClientConfig = {}) {
    this.config = config;
    this.client = new Client(
      {
        name: "supabase-mcp-client",
        version: "1.0.0",
      },
      {
        capabilities: {},
      }
    );
  }

  async connect(): Promise<void> {
    if (this.isConnected) {
      return;
    }

    try {
      // In a browser environment, you might need a different transport
      // For now, this is configured for Node.js environments
      const serverPath = this.config.serverPath || "node";
      const serverArgs = this.config.serverArgs || [
        "src/mcp/supabase-server.ts",
      ];

      this.transport = new StdioClientTransport({
        command: serverPath,
        args: serverArgs,
      });

      await this.client.connect(this.transport);
      this.isConnected = true;
      console.log("Connected to Supabase MCP Server");
    } catch (error) {
      console.error("Failed to connect to MCP server:", error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    if (!this.isConnected) {
      return;
    }

    try {
      await this.client.close();
      this.isConnected = false;
      console.log("Disconnected from Supabase MCP Server");
    } catch (error) {
      console.error("Error disconnecting from MCP server:", error);
    }
  }

  async listTools(): Promise<unknown> {
    if (!this.isConnected) {
      await this.connect();
    }

    try {
      const response = await this.client.listTools();
      return response;
    } catch (error) {
      console.error("Failed to list tools:", error);
      throw error;
    }
  }

  async callTool(
    name: string,
    arguments_: Record<string, unknown>
  ): Promise<unknown> {
    if (!this.isConnected) {
      await this.connect();
    }

    try {
      const response = await this.client.callTool({
        name,
        arguments: arguments_,
      });
      return response;
    } catch (error) {
      console.error(`Failed to call tool ${name}:`, error);
      throw error;
    }
  }

  // Convenience methods for Supabase operations
  async query(table: string, options: QueryOptions = {}): Promise<unknown> {
    return this.callTool("supabase_query", { table, ...options });
  }

  async insert(table: string, data: TableData): Promise<unknown> {
    return this.callTool("supabase_insert", { table, data });
  }

  async update(
    table: string,
    data: TableData,
    filter: FilterOptions
  ): Promise<unknown> {
    return this.callTool("supabase_update", { table, data, filter });
  }

  async delete(table: string, filter: FilterOptions): Promise<unknown> {
    return this.callTool("supabase_delete", { table, filter });
  }

  async getSchema(table?: string): Promise<unknown> {
    return this.callTool("supabase_get_schema", table ? { table } : {});
  }

  get connected(): boolean {
    return this.isConnected;
  }
}

// Singleton instance for use across the application
let mcpClientInstance: SupabaseMCPClient | null = null;

export function getMCPClient(config?: MCPClientConfig): SupabaseMCPClient {
  if (!mcpClientInstance) {
    mcpClientInstance = new SupabaseMCPClient(config);
  }
  return mcpClientInstance;
}

// React hook for using MCP client
export function useMCPClient(config?: MCPClientConfig) {
  const client = getMCPClient(config);

  return {
    client,
    connected: client.connected,
    connect: () => client.connect(),
    disconnect: () => client.disconnect(),
    query: (table: string, options?: QueryOptions) =>
      client.query(table, options),
    insert: (table: string, data: TableData) => client.insert(table, data),
    update: (table: string, data: TableData, filter: FilterOptions) =>
      client.update(table, data, filter),
    delete: (table: string, filter: FilterOptions) =>
      client.delete(table, filter),
    getSchema: (table?: string) => client.getSchema(table),
    listTools: () => client.listTools(),
    callTool: (name: string, args: Record<string, unknown>) =>
      client.callTool(name, args),
  };
}
