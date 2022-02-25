#!/usr/bin/env node
import { start, getName } from "./functions.js";

const name = await getName();
await start(name);
