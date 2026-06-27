---
title: Designing APIs That Developers Actually Love
description: Lessons from building 50+ public APIs at Stripe
---

When designing a public API, most teams focus on the wrong things. They obsess over REST vs GraphQL, HTTP status codes,
and whether to use camelCase or snake_case. These decisions matter, but they'
re not what makes developers love or hate your API.

At Stripe, we learned this the hard way. In our first year, we iterated through 17 major API versions.
Each version addressed real developer feedback, but the churn frustrated our users. Developers don'
t want perfect REST semantics. They want to get their job done with minimal friction.

The real metric isn't how RESTful your API is. It's how many support tickets you generate per 1000 API calls.
When we measured this, we found that 73% of support tickets weren't about API bugs at all.
They were about unclear error messages, missing documentation for edge cases,
and inconsistent parameter naming across endpoints.

For example, our refunds endpoint originally returned a generic `400 Bad Request` for every validation failure.
Developers had to guess whether the issue was an invalid charge ID, an expired window, or insufficient funds.
After we switched to structured error codes with human-readable messages, support tickets for refunds dropped by 61%.

The pattern repeated across every endpoint we audited. The APIs developers loved weren't the most technically elegant.
They were the most predictable. Consistent naming conventions. Idempotent operations by default.
Error messages that tell you exactly what went wrong and how to fix it.

We also discovered something counterintuitive about versioning. Conventional wisdom says "
never break backward compatibility." But keeping every deprecated field forever creates its own problems.
Our `/v1/charges` endpoint accumulated 47 optional parameters over five years.
New developers were overwhelmed by the documentation.
We found that APIs with clear deprecation timelines and migration guides actually had higher long-term satisfaction 
scores than APIs that never removed anything.

Here's what changed our approach:

- Error messages include a `doc_url` linking directly to the relevant documentation
- Every parameter has a one-sentence description in the API reference, not just a type annotation
- Breaking changes are announced 12 months in advance with automated migration guides
- SDKs abstract common patterns so developers never need to think about pagination or retries

The result? Our API NPS score went from 34 to 67 over 18 months. But more importantly,
the ratio of support tickets to API calls dropped by 4x.

This isn't Stripe-specific. Talk to any developer who's integrated with Twilio, SendGrid, or AWS.
The APIs they remember fondly share the same traits: they stay out of the way, they fail loudly and clearly,
and they evolve without surprising you.

---

**Further reading**

- Stripe API design guide: https://stripe.com/docs/api
- Our error message framework: https://github.com/stripe/stripe-node

