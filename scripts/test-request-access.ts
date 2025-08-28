import { config } from "dotenv";
import {
  submitRequestAccess,
  getRequestAccessSubmissions,
} from "../src/services/requestAccess.js";

// Load environment variables
config();

async function testRequestAccessIntegration() {
  console.log("🚀 Testing Request Access Integration with Supabase...\n");

  // Test 1: Submit a test request
  console.log("📝 Test 1: Submitting a test request");
  try {
    const testData = {
      name: "John Doe",
      email: `test-${Date.now()}@example.com`,
    };

    const result = await submitRequestAccess(testData);

    if (result.success && result.data) {
      console.log("✅ Request submission: PASSED");
      console.log(`   ID: ${result.data.id}`);
      console.log(`   Submitted at: ${result.data.submitted_at}`);
    } else {
      console.log("❌ Request submission: FAILED");
      console.log(`   Error: ${result.error}`);
    }
  } catch (error) {
    console.log(
      "❌ Request submission error:",
      error instanceof Error ? error.message : "Unknown error"
    );
  }
  console.log();

  // Test 2: Test duplicate email validation
  console.log("🔍 Test 2: Testing duplicate email validation");
  try {
    const duplicateData = {
      name: "Jane Doe",
      email: "test@example.com", // Use a consistent email for duplicate testing
    };

    // Submit first request
    const firstResult = await submitRequestAccess(duplicateData);
    console.log(
      `   First submission: ${firstResult.success ? "SUCCESS" : "FAILED"}`
    );

    // Submit duplicate request
    const duplicateResult = await submitRequestAccess(duplicateData);
    if (
      !duplicateResult.success &&
      duplicateResult.error?.includes("already been submitted")
    ) {
      console.log("✅ Duplicate validation: PASSED");
      console.log("   Correctly prevented duplicate email submission");
    } else {
      console.log("⚠️ Duplicate validation: UNEXPECTED RESULT");
      console.log(
        `   Result: ${
          duplicateResult.success ? "SUCCESS" : duplicateResult.error
        }`
      );
    }
  } catch (error) {
    console.log(
      "❌ Duplicate validation error:",
      error instanceof Error ? error.message : "Unknown error"
    );
  }
  console.log();

  // Test 3: Test validation errors
  console.log("🔍 Test 3: Testing input validation");
  try {
    const invalidData = {
      name: "",
      email: "invalid-email",
    };

    const result = await submitRequestAccess(invalidData);

    if (!result.success) {
      console.log("✅ Validation test: PASSED");
      console.log(`   Error caught: ${result.error}`);
    } else {
      console.log("❌ Validation test: FAILED");
      console.log("   Should have caught validation error");
    }
  } catch (error) {
    console.log(
      "❌ Validation test error:",
      error instanceof Error ? error.message : "Unknown error"
    );
  }
  console.log();

  // Test 4: Fetch submissions (requires authenticated access)
  console.log("📊 Test 4: Testing submissions retrieval");
  try {
    const submissions = await getRequestAccessSubmissions(5);

    if (submissions.success && submissions.data) {
      console.log("✅ Submissions retrieval: PASSED");
      console.log(`   Found ${submissions.data.length} submissions`);
      console.log(`   Total count: ${submissions.total}`);

      // Show first submission details if any exist
      if (submissions.data.length > 0) {
        const latest = submissions.data[0];
        console.log("   Latest submission:");
        console.log(`     Name: ${latest.name}`);
        console.log(`     Email: ${latest.email}`);
        console.log(
          `     Submitted: ${new Date(latest.submitted_at).toLocaleString()}`
        );
      }
    } else {
      console.log("⚠️ Submissions retrieval: LIMITED ACCESS");
      console.log(
        `   ${submissions.error || "May require authenticated access"}`
      );
    }
  } catch (error) {
    console.log(
      "❌ Submissions retrieval error:",
      error instanceof Error ? error.message : "Unknown error"
    );
  }
  console.log();

  console.log("🎉 Request Access Integration Test Complete!");
  console.log(
    "📝 Note: Some tests may show limited access - this is normal for anonymous users."
  );
  console.log("💡 The form should now be ready to accept real submissions!");
}

// Run the test
testRequestAccessIntegration().catch(console.error);
