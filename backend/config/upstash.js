import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"
import dotenv from "dotenv"

dotenv.config()

// rateLimiter that allows 20 requests per 20 seconds
const rateLimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(20, "20 s")
})

export default rateLimit