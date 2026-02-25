#!/usr/bin/env node

/**
 * Markdown TOC 提取工具
 * 用法: node extract-toc.js <markdown文件路径> [--json]
 */

import fs from 'fs';
import path from 'path';

// 解析命令行参数
const args = process.argv.slice(2);
const filePath = args.find(arg => !arg.startsWith('--'));
const outputJson = args.includes('--json');
const maxDepth = parseInt(args.find(arg => arg.startsWith('--depth='))?.split('=')[1] || '6', 10);

if (!filePath) {
  console.error('❌ 请提供 Markdown 文件路径');
  console.error('用法: node extract-toc.js <文件路径> [--json] [--depth=3]');
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

// 提取标题的正则表达式
const headingRegex = /^(#{1,6})\s+(.+)$/gm;

// 提取所有标题
const headings = [];
let match;
while ((match = headingRegex.exec(content)) !== null) {
  const level = match[1].length;
  const text = match[2].trim();

  // 跳过超过最大深度的标题
  if (level > maxDepth) continue;

  // 生成锚点链接（GitHub 风格）
  const anchor = text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // 移除特殊字符
    .replace(/\s+/g, '-')      // 空格替换为 -
    .replace(/-+/g, '-');      // 合并连续的 -

  headings.push({ level, text, anchor });
}

// 输出结果
if (headings.length === 0) {
  console.log('⚠️ 未找到任何标题');
  process.exit(0);
}

if (outputJson) {
  // JSON 格式输出
  console.log(JSON.stringify(headings, null, 2));
} else {
  // Markdown 格式输出
  console.log(`\n📑 ${path.basename(absolutePath)} - 目录结构\n`);
  console.log('─'.repeat(50));

  // 找到最小层级，用于相对缩进
  const minLevel = Math.min(...headings.map(h => h.level));

  headings.forEach(({ level, text, anchor }) => {
    const indent = '  '.repeat(level - minLevel);
    const bullet = level === 1 ? '●' : level === 2 ? '○' : '◦';
    console.log(`${indent}${bullet} [${text}](#${anchor})`);
  });

  console.log('─'.repeat(50));
  console.log(`\n共 ${headings.length} 个标题\n`);
}
