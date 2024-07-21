---
title: 数字化转型
description: 数字化转型一般指的是企业或组织利用数字技术来改变其业务模式、流程、文化和用户体验，以适应数字化时代的需求。
---

## Read

### Leveraging digital to improve the human experience

Source: [Leveraging digital to improve the human experience](https://www.cloudflare.com/zh-cn/the-net/illuminate/technology-transformation/)

> 67 percent of nonprofits are increasing their investment in technology to better engage constituents...Using digital tools to support fundraising, volunteer management, donor engagement, and program delivery can help nonprofits streamline processes and maximise their impact.

5 lessons the author learned:

* <q>Simplifying tech stack</q>, "almost free" products makes Orgs bending huge tech stack and increase the number of "Shadow ITs"
* <q>Moving to cloud-based solutions</q>
* <q>We use Zero Trust Network Access instead of VPN</q>
* <q>Collaborate with private and nonprofit peers ... have similar digital transformation objectives and challenges</q>
* ...

### How can on-site servers enable richer retail experiences?

现场服务器如何实现更丰富的零售体验？

Source: [How can on-site servers enable richer retail experiences?](https://www.thoughtworks.com/insights/blog/architecture/how-can-on-site-servers-enable-richer-retail-experiences-part-one)

> he was working on that deploys Docker containers to servers running in the stores of a large food retailer. They power point-of-sale systems that serve customer experience as well as store back office systems for processing payments and orders ... it sounded like an odd mixture of technologies, as I had previously only encountered containers used in data centers or for local development environments

听起来类似边缘服务器概念。

> The most likely disruptive event is the loss of network connectivity from the store to the central services ... A store server that caches the critical business information and is able to autonomously implement business flows acts as a buffer between the store and the central services, ensuring that local store operations can go on undisturbed, and that any changes will be synchronized as soon as the connection is restored.

网络连接确实非常脆弱。我确信这就是一个“边缘服务器”，他的数据的终点站仍然是中心服务器。

> An example you may be familiar with is Google Docs. If you install the app on your mobile it lets you continue to work even when you are offline, and transparently syncs with the server when you have connectivity again.

> In one of our projects we worked with a client supporting 40,000 devices in more than 2000 stores. Each device would be configured to receive daily business data updates and to send near real-time telemetry and analytical data to the central servers. At this scale, device failures and network interruptions happen all the time, so your system better be prepared to deal with them.
