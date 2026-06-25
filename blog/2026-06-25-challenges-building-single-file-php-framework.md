---
slug: challenges-single-file-framework
title: The Challenges of Building a Single-File PHP Framework
authors: [qu]
tags: [noor, php, engineering, architecture]
---

Building a framework in a single file sounds like a constraint you'd impose for fun. And it was fun. But it also forced some interesting trade-offs that are worth documenting.

## 1. Namespace Management in a Flat File

Without Composer's PSR-4 autoloader, every class lives in the global namespace. That means class name collisions are a real possibility if the user brings in external libraries or defines their own classes.

The solution was a simple spl_autoload_register at the bottom of noor.php that checks the project root, controllers/, and models/ directories. User classes take priority over framework internals. This buys reasonable interoperability without compromising the single-file constraint.

<!-- truncate -->

## 2. The Template Engine: Regex vs. Parser

A proper template engine uses a lexer and parser. A single-file framework can't ship a parser. The template engine had to use regular expressions.

Getting Blade-style directives right with regex was harder than expected:

- **`@if (Auth::check())`** — The naive `(.+?)` capture group stops at the first closing paren, capturing `Auth::check(` instead of `Auth::check()`. Fixing this required a balanced-parentheses pattern.
- **`@endforeach` vs `@endfor`** — The `@endfor` pattern matches the first 6 characters of `@endforeach`, leaving `each` as orphaned text. Processing `@endforeach` before `@endfor` solved it.
- **`@section('title', $variable)` vs `@section('content')...@endsection`** — Two forms of the same directive with different semantics required different regex branches.

The final engine compiles directives to PHP, writes to a temp file, and includes it. No cache layer — compilation happens on every request. On shared hosting with opcache, this is fast enough.

## 3. Route Matching Without a Router Library

Laravel's router compiles all routes into a single regex. Noor can't do that without a lexer. Instead, it iterates the route collection and matches each against the request URI using regex derived from the route pattern.

For most applications (under 100 routes), this is negligible. For API-heavy apps with hundreds of routes, it could matter. The trade-off was accepted.

Optional parameters (`{param?}`) and `where` constraints added complexity. The `where` constraints had to be threaded through the RouteBuilder into the matching regex without coupling the classes too tightly.

## 4. Session Flash Data

The built-in PHP session lifecycle doesn't map cleanly to "flash for one request." PHP sessions start on `session_start()` and are saved on shutdown. There's no concept of a request boundary.

Noor's session flash works by marking flash data with expiration timestamps. On the next `Session::start()`, expired data is cleaned. This works for the standard request-response cycle but required careful ordering: flash data set during the current request shouldn't be cleaned until the *next* request's session start.

## 5. Template Inheritance Without Output Buffering

Laravel's Blade handles `@extends` and `@section` by compiling to PHP class structures. Noor's approach is simpler: the child view is rendered first, capturing sections into a static array. Then the parent layout is rendered with `@yield` pulling from that array.

The tricky part was that `@section` blocks need to start `ob_start()` and `@endsection` needs `ob_get_clean()`. Both are runtime operations, not compile-time. The directive compiler emits PHP function calls (`View::startSection()`, `View::endSection()`) that manage the buffer stack.

This works but means the entire child view is buffered before the layout is rendered. Deeply nested layouts would create nested buffers, though in practice layouts rarely nest more than one level.

## 6. Auth Without a Password Library

Password hashing was trivial — `password_hash()` and `password_verify()` are built into PHP. The harder part was designing Auth::register() to automatically hash passwords before insert, and Auth::attempt() to verify credentials and handle password rehashing when the cost factor changes.

The tight coupling between Auth and Session (via `_auth_id`) is not ideal architecturally, but it's pragmatic. On shared hosting, you're not swapping auth backends.

## Closing Thoughts

Building Noor taught me that the constraints that seem limiting are often the most productive ones. The single-file requirement forced simplicity in API design, clarity in naming, and discipline in implementation.

Every feature had to justify its existence. If it couldn't fit cleanly in a single file without creating confusion, it didn't belong. That's a good filter for any framework — regardless of how many files it ships in.
