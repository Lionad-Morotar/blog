---
title: 知识图谱
description: 本体与知识图谱的概念体系，及其与图数据库的关系
---

## 本体与图模型

#### 本体是对概念化的显式规范说明

本体论（Ontology）原为哲学术语，研究"什么东西存在、存在之物如何分类"。
知识工程领域借用了这个词：Gruber 在 1993 年给出经典定义——本体是对概念化的显式规范说明
（an explicit specification of a conceptualization），即把某个领域的知识形式化为机器可处理的体系。
一个本体通常包含四类要素：类（Class，概念类型）、实例（Instance，具体个体）、
关系（Relation，类之间的连接方式）、公理（Axiom，推理规则与约束）。
与普通数据库 Schema 的差别在于，Schema 只约束结构，本体还承载语义，支持逻辑推理。

见：[Portable Ontology Specifications @Tom Gruber, 1993](https://tomgruber.org/writing/ontolingua-kaj-1993.htm)

#### 知识图谱分为本体层（TBox）与实例层（ABox）

知识图谱（Knowledge Graph）在结构上分为两层：本体层（TBox，术语层）定义
"这个世界有哪些类型的实体和关系"，相当于图谱的 Schema；实例层（ABox，断言层）填充具体事实，
如"parseQuery 这个函数定义于 query.ts"。本体层通常用 OWL（Web Ontology Language）等语言表达，
实例层以 RDF 三元组（主语—谓语—宾语）存储。两层分离让同一份本体可复用到不同数据集，
也让推理引擎能基于本体规则从显式事实推出隐含事实。

见：[OWL 2 Web Ontology Language Document Overview @W3C](https://www.w3.org/TR/owl2-overview/)

#### 本体的天然形态是图，图数据库是其载体

类与实例是节点，关系是边，一组三元组拼起来就是一张图。多对多关系
（如一个函数调用 N 个函数、被 M 个模块引用）在关系型数据库里需要中间表加递归 JOIN，
在图数据库里只是加几条边、一次遍历。图查询语言（SPARQL、Cypher）也以图遍历为核心，
"找出 A 调用链三跳内的所有函数"这类沿本体关系展开的查询可以一步到位。更重要的是，
本体定义的公理（传递性、类继承）让推理沿图的边进行，可推出未显式存储的事实。

见：[What is a Graph Database? @Neo4j](https://neo4j.com/docs/getting-started/graph-database/)

#### RDF 三元组库与属性图两大流派

图数据库有两大流派。RDF 三元组库（Triple Store）严格遵循 W3C 语义网技术栈：
数据以三元组存储，用 OWL 定义本体、SPARQL 查询，配套推理引擎可从公理推出隐含事实，
适合需要形式化语义与跨数据集互联的场景。属性图（Property Graph，如 Neo4j）更工程化：
节点和边都能携带属性，查询用 Cypher，不内置本体推理，"推理"靠应用层遍历实现。
多数工程型图谱工具（代码图谱、依赖分析等）采用属性图思路；
需要语义互操作与自动推理的知识库则走 RDF 路线。

见：[RDF 1.1 Concepts and Abstract Syntax @W3C](https://www.w3.org/TR/rdf11-concepts/)
