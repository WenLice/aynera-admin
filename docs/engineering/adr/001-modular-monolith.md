# ADR 001: Modular monolith

## Status

Accepted

## Context

ElAris needs atomic Focus/Together/match flows, city-scoped matching, and future cross-city guardian links.

## Decision

Ship a single ASP.NET Core modular monolith (`elaris-api`) with in-process modules. Do not deploy one microservice per city.

## Consequences

Simpler transactions and ops for the pilot; extract Chat/Notifications later only if load requires it.
