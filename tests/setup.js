// Set test environment variables before tests run
process.env.NODE_ENV = "test";
process.env.SESSION_SECRET = "test-secret-key";
// Tests will use the actual MONGODB_URL from .env if available
// or fail gracefully if not configured
