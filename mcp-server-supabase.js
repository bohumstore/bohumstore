#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { createClient } from '@supabase/supabase-js';

// Supabase 클라이언트 설정
const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('SUPABASE_URL and SUPABASE_ANON_KEY environment variables are required');
  console.error('Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// MCP 서버 생성
const server = new Server(
  {
    name: 'supabase-mcp-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      resources: {
        subscribe: false,
      },
      prompts: {
        list: false,
        read: false,
      },
      tools: {
        list: true,
        read: true,
      },
    },
  }
);

// 리소스 핸들러
server.setRequestHandler('resources/list', async () => {
  return {
    resources: [
      {
        uri: 'supabase://database',
        name: 'Supabase Database',
        description: 'Main database connection',
        mimeType: 'application/json',
      },
    ],
  };
});

server.setRequestHandler('resources/read', async (request) => {
  const { uri } = request.params;
  
  if (uri === 'supabase://database') {
    // 데이터베이스 정보 반환
    return {
      contents: [
        {
          uri: 'supabase://database',
          mimeType: 'application/json',
          text: JSON.stringify({
            url: supabaseUrl,
            tables: ['user', 'counsel', 'product', 'company', 'category', 'otp'],
          }),
        },
      ],
    };
  }
  
  throw new Error(`Unknown resource: ${uri}`);
});

// 도구 핸들러
server.setRequestHandler('tools/list', async () => {
  return {
    tools: [
      {
        name: 'query_users',
        description: 'Query users from the database',
        inputSchema: {
          type: 'object',
          properties: {
            limit: {
              type: 'number',
              description: 'Maximum number of users to return',
            },
            phone: {
              type: 'string',
              description: 'Filter by phone number',
            },
          },
        },
      },
      {
        name: 'create_user',
        description: 'Create a new user',
        inputSchema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'User name',
            },
            phone: {
              type: 'string',
              description: 'Phone number',
            },
            birth: {
              type: 'string',
              description: 'Birth date (YYYYMMDD)',
            },
            gender: {
              type: 'string',
              description: 'Gender (M/F)',
            },
          },
          required: ['name', 'phone', 'birth', 'gender'],
        },
      },
      {
        name: 'query_counsel',
        description: 'Query counsel records',
        inputSchema: {
          type: 'object',
          properties: {
            limit: {
              type: 'number',
              description: 'Maximum number of records to return',
            },
            counsel_type: {
              type: 'number',
              description: 'Filter by counsel type (1: 보험료 확인, 2: 상담신청)',
            },
          },
        },
      },
      {
        name: 'create_counsel',
        description: 'Create a new counsel record',
        inputSchema: {
          type: 'object',
          properties: {
            user_id: {
              type: 'number',
              description: 'User ID',
            },
            company_id: {
              type: 'number',
              description: 'Company ID',
            },
            product_id: {
              type: 'number',
              description: 'Product ID',
            },
            counsel_type_id: {
              type: 'number',
              description: 'Counsel type ID',
            },
          },
          required: ['user_id', 'company_id', 'product_id', 'counsel_type_id'],
        },
      },
    ],
  };
});

server.setRequestHandler('tools/call', async (request) => {
  const { name, arguments: args } = request.params;
  
  try {
    switch (name) {
      case 'query_users':
        const { data: users, error: usersError } = await supabase
          .from('user')
          .select('*')
          .limit(args.limit || 10);
        
        if (usersError) throw usersError;
        
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(users, null, 2),
            },
          ],
        };
      
      case 'create_user':
        const { data: newUser, error: createError } = await supabase
          .from('user')
          .insert({
            name: args.name,
            phone: args.phone,
            birth: args.birth,
            gender: args.gender,
          })
          .select()
          .single();
        
        if (createError) throw createError;
        
        return {
          content: [
            {
              type: 'text',
              text: `User created successfully: ${JSON.stringify(newUser, null, 2)}`,
            },
          ],
        };
      
      case 'query_counsel':
        const { data: counsel, error: counselError } = await supabase
          .from('counsel')
          .select('*')
          .limit(args.limit || 10);
        
        if (counselError) throw counselError;
        
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(counsel, null, 2),
            },
          ],
        };
      
      case 'create_counsel':
        const { data: newCounsel, error: counselCreateError } = await supabase
          .from('counsel')
          .insert({
            user_id: args.user_id,
            company_id: args.company_id,
            product_id: args.product_id,
            counsel_type_id: args.counsel_type_id,
          })
          .select()
          .single();
        
        if (counselCreateError) throw counselCreateError;
        
        return {
          content: [
            {
              type: 'text',
              text: `Counsel record created successfully: ${JSON.stringify(newCounsel, null, 2)}`,
            },
          ],
        };
      
      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error: ${error.message}`,
        },
      ],
      isError: true,
    };
  }
});

// 서버 시작
const transport = new StdioServerTransport();
await server.connect(transport); 