import { Task } from "@/types/training";

// Task verification system
export type VerificationResult = {
  verified: boolean;
  message: string;
};

// Verify a task based on its verification type
export async function verifyTask(task: Task): Promise<VerificationResult> {
  switch (task.verification_type) {
    case "api_check":
      return verifyViaApi(task);
    case "state_check":
      return verifyViaStateCheck(task);
    case "manual":
    default:
      // Manual verification always passes - user clicks "Mark Complete"
      return { verified: true, message: "Task marked as complete" };
  }
}

// Verify by checking TARA API (would require TARA API access)
async function verifyViaApi(task: Task): Promise<VerificationResult> {
  // In a full implementation, this would:
  // 1. Call TARA API to check if the expected entity exists
  // 2. Verify the entity matches expected criteria
  
  // For now, we'll use manual verification as fallback
  // since we don't have direct TARA API access
  console.log(`API verification for task ${task.id} - using manual fallback`);
  return { 
    verified: true, 
    message: "Verified (API check pending TARA integration)" 
  };
}

// Verify by checking iframe state (would require postMessage integration)
async function verifyViaStateCheck(task: Task): Promise<VerificationResult> {
  // In a full implementation, this would:
  // 1. Send a postMessage to the TARA iframe
  // 2. Wait for a response with the current state
  // 3. Compare against expected state
  
  // For now, we'll use manual verification as fallback
  console.log(`State verification for task ${task.id} - using manual fallback`);
  return { 
    verified: true, 
    message: "Verified (state check pending TARA integration)" 
  };
}

// Listen for messages from TARA iframe (for future auto-verification)
export function setupIframeListener(
  onEntityCreated: (entityType: string, entityId: string) => void
): () => void {
  const handler = (event: MessageEvent) => {
    // Verify origin for security
    if (!event.origin.includes("finite-state-tara-ai.vercel.app")) {
      return;
    }

    const data = event.data;
    if (data?.type === "ENTITY_CREATED") {
      onEntityCreated(data.entityType, data.entityId);
    }
  };

  window.addEventListener("message", handler);
  return () => window.removeEventListener("message", handler);
}
