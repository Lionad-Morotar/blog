#!/usr/bin/env node

/**
 * Markdown 元数据提取工具
 * 提取 frontmatter (title, description) 和 TOC 结构
 * 用法: node extract-markdown-meta.js <markdown文件路径>
 */

import fs from 'fs';
import path from 'path';

// 解析命令行参数
const args = process.argv.slice(2);
const filePath = args.find(arg => !arg.startsWith('--'));
const maxDepth = parseInt(args.find(arg => arg.startsWith('--depth='))?.split('=')[1] || '6', 10);

if (!filePath) {
  console.error('❌ 请提供 Markdown 文件路径');
  console.error('用法: node extract-markdown-meta.js <文件路径> [--depth=3]');
  process.exit(1);
}

// 解析绝对路径
const absolutePath = path.resolve(filePath);

// 检查文件是否存在
if (!fs.existsSync(absolutePath)) {
  console.error(`❌ 文件不存在: ${absolutePath}`);
  process.exit(1);
}

// 读取文件内容
const content = fs.readFileSync(absolutePath, 'utf-8');

// 解析 frontmatter
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return { title: null, description: null };
  }

  const frontmatterText = match[1];
  const result = { title: null, description: null };

  // 解析 title
  const titleMatch = frontmatterText.match(/^title:\s*(.+)$/m);
  if (titleMatch) {
    result.title = titleMatch[1].trim().replace(/^["']|["']$/g, '');
  }

  // 解析 description
  const descMatch = frontmatterText.match(/^description:\s*(.+)$/m);
  if (descMatch) {
    result.description = descMatch[1].trim().replace(/^["']|["']$/g, '');
  }

  return result;
}

// TOON 格式辅助函数
function needsQuote(str) {
  if (!str) return false;
  // 根据 TOON 规范需要引号的情况
  if (str === '' || str === 'true' || str === 'false' || str === 'null') return true;
  if (/^\d+$/.test(str)) return true; // 看起来像数字
  if (/^\s|\s$/.test(str)) return true; // 前后有空格
  if (/[,:"\[\]{}\n\t\r]/.test(str)) return true; // 包含特殊字符
  if (str.startsWith('-')) return true; // 以 - 开头
  return false;
}

function escapeStr(str) {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t');
}

// 提取标题
function extractTOC(content) {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();

    if (level > maxDepth) continue;

    // 生成锚点：保留中文字符，移除标点符号
    const anchor = text
      .toLowerCase()
      .replace(/[^\w\s\u4e00-\u9fa5-]/g, '') // 保留中文、字母、数字、空格、连字符
      .replace(/\s+/g, '-')                   // 空格替换为 -
      .replace(/-+/g, '-')                     // 合并连续的 -
      .replace(/^-|-$/g, '');                  // 移除首尾连字符

    headings.push({ level, text, anchor });
  }

  return headings;
}

// 执行提取
const frontmatter = parseFrontmatter(content);
const toc = extractTOC(content);

// 输出 TOON 格式
const lines = [];

// 文件信息
lines.push(`file: ${path.basename(absolutePath)}`);
lines.push(`hasFrontmatter: ${frontmatter.title || frontmatter.description ? 'true' : 'false'}`);

// Frontmatter（如果有）
if (frontmatter.title) {
  lines.push(`title: ${frontmatter.title}`);
}
if (frontmatter.description) {
  // 描述截断到100字符，避免过长
  const desc = frontmatter.description.length > 100
    ? frontmatter.description.substring(0, 100) + '...'
    : frontmatter.description;
  lines.push(`description: ${desc}`);
}

// TOC 使用表格数组格式
if (toc.length > 0) {
  lines.push(`toc[${toc.length}]{level,text,anchor}:`);
  toc.forEach(h => {
    // 转义包含逗号或需要引号的文本
    const text = needsQuote(h.text) ? `"${escapeStr(h.text)}"` : h.text;
    const anchor = needsQuote(h.anchor) ? `"${escapeStr(h.anchor)}"` : h.anchor;
    lines.push(`  ${h.level},${text},${anchor}`);
  });
}

// 统计
lines.push(`totalHeadings: ${toc.length}`);

console.log(lines.join('\n'));
