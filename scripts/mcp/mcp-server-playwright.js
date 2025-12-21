#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { chromium, firefox, webkit } from 'playwright';

class PlaywrightMCPServer {
  constructor() {
    this.server = new Server(
      {
        name: "playwright-mcp-server",
        version: "1.0.0",
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();
  }

  setupToolHandlers() {
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case "navigate":
            return await this.navigate(args);
          case "click":
            return await this.click(args);
          case "type":
            return await this.type(args);
          case "screenshot":
            return await this.screenshot(args);
          case "getText":
            return await this.getText(args);
          case "waitForElement":
            return await this.waitForElement(args);
          case "evaluate":
            return await this.evaluate(args);
          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error: ${error.message}`,
            },
          ],
        };
      }
    });
  }

  async navigate(args) {
    const { url, browser = "chromium" } = args;
    const browserInstance = await this.getBrowser(browser);
    const page = await browserInstance.newPage();
    await page.goto(url);
    
    return {
      content: [
        {
          type: "text",
          text: `Successfully navigated to ${url}`,
        },
      ],
    };
  }

  async click(args) {
    const { selector, browser = "chromium" } = args;
    const browserInstance = await this.getBrowser(browser);
    const page = await browserInstance.newPage();
    await page.click(selector);
    
    return {
      content: [
        {
          type: "text",
          text: `Successfully clicked element: ${selector}`,
        },
      ],
    };
  }

  async type(args) {
    const { selector, text, browser = "chromium" } = args;
    const browserInstance = await this.getBrowser(browser);
    const page = await browserInstance.newPage();
    await page.fill(selector, text);
    
    return {
      content: [
        {
          type: "text",
          text: `Successfully typed "${text}" into ${selector}`,
        },
      ],
    };
  }

  async screenshot(args) {
    const { path = "screenshot.png", browser = "chromium" } = args;
    const browserInstance = await this.getBrowser(browser);
    const page = await browserInstance.newPage();
    await page.screenshot({ path });
    
    return {
      content: [
        {
          type: "text",
          text: `Screenshot saved to ${path}`,
        },
      ],
    };
  }

  async getText(args) {
    const { selector, browser = "chromium" } = args;
    const browserInstance = await this.getBrowser(browser);
    const page = await browserInstance.newPage();
    const text = await page.textContent(selector);
    
    return {
      content: [
        {
          type: "text",
          text: `Text content: ${text}`,
        },
      ],
    };
  }

  async waitForElement(args) {
    const { selector, timeout = 30000, browser = "chromium" } = args;
    const browserInstance = await this.getBrowser(browser);
    const page = await browserInstance.newPage();
    await page.waitForSelector(selector, { timeout });
    
    return {
      content: [
        {
          type: "text",
          text: `Element ${selector} found after waiting`,
        },
      ],
    };
  }

  async evaluate(args) {
    const { code, browser = "chromium" } = args;
    const browserInstance = await this.getBrowser(browser);
    const page = await browserInstance.newPage();
    const result = await page.evaluate(code);
    
    return {
      content: [
        {
          type: "text",
          text: `Evaluation result: ${JSON.stringify(result)}`,
        },
      ],
    };
  }

  async getBrowser(browserType) {
    switch (browserType.toLowerCase()) {
      case "chromium":
        return await chromium.launch();
      case "firefox":
        return await firefox.launch();
      case "webkit":
        return await webkit.launch();
      default:
        return await chromium.launch();
    }
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("Playwright MCP Server started");
  }
}

const server = new PlaywrightMCPServer();
server.run().catch(console.error);
