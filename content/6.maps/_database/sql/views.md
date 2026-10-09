---
title: 视图
description: 视图是存起来的查询语句，像表一样使用但每次现算，数据是活的
---

#### 视图是存起来的查询

视图（VIEW）是一条保存起来的查询语句，用起来像一张表：把 JOIN、GROUP BY 等复杂查询
存起来起个名字，之后 `SELECT * FROM 视图名` 即可。它不存数据，只存查询的定义，几乎不占空间；
查询时数据库把定义的查询重新执行一遍，所以底表数据变了，视图结果自动跟着变。
正因视图依赖底表，删除底表时数据库把视图列为依赖对象：默认直接报错拒绝，
`DROP TABLE ... CASCADE` 则把视图定义连带删除。

见：[PostgreSQL: CREATE VIEW](https://www.postgresql.org/docs/current/sql-createview.html)
