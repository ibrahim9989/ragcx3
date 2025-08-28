import { supabase } from "../lib/supabase";

// Types for request access form
export interface RequestAccessData {
  name: string;
  email: string;
}

export interface RequestAccessResponse {
  success: boolean;
  data?: {
    id: string;
    submitted_at: string;
  };
  error?: string;
}

/**
 * Submit form data to Web3Forms
 */
async function submitToWeb3Forms(
  formData: RequestAccessData
): Promise<{ success: boolean; error?: string }> {
  try {
    const web3FormsKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    if (!web3FormsKey) {
      console.warn("Web3Forms access key not configured");
      return { success: false, error: "Web3Forms not configured" };
    }

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: web3FormsKey,
        name: formData.name,
        email: formData.email,
        subject: "New Access Request - RAG.CX",
        from_name: "RAG.CX Access Request",
        message: `New access request from ${formData.name} (${formData.email})`,
      }),
    });

    const result = await response.json();

    if (result.success) {
      return { success: true };
    } else {
      return {
        success: false,
        error: result.message || "Web3Forms submission failed",
      };
    }
  } catch (error) {
    console.error("Web3Forms submission error:", error);
    return { success: false, error: "Failed to send notification email" };
  }
}

/**
 * Submit a request access form to Supabase and Web3Forms
 */
export async function submitRequestAccess(
  formData: RequestAccessData
): Promise<RequestAccessResponse> {
  try {
    // Validate required fields
    if (!formData.name.trim() || !formData.email.trim()) {
      return {
        success: false,
        error: "Name and email are required fields",
      };
    }

    // Validate email format
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      return {
        success: false,
        error: "Please enter a valid email address",
      };
    }

    // Check if email already exists
    const { data: existingRequest, error: checkError } = await supabase
      .from("request_access")
      .select("id, email")
      .eq("email", formData.email.toLowerCase())
      .maybeSingle();

    if (checkError) {
      console.error("Error checking existing request:", checkError);
      return {
        success: false,
        error: "An error occurred while processing your request",
      };
    }

    if (existingRequest) {
      return {
        success: false,
        error:
          "An access request has already been submitted with this email address",
      };
    }

    // Submit to Supabase database
    const { data, error } = await supabase
      .from("request_access")
      .insert({
        name: formData.name.trim(),
        email: formData.email.toLowerCase().trim(),
      })
      .select("id, submitted_at")
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return {
        success: false,
        error: "Failed to submit your request. Please try again.",
      };
    }

    // Submit to Web3Forms for email notification (non-blocking)
    submitToWeb3Forms(formData).catch((error) => {
      console.warn("Web3Forms notification failed:", error);
      // Don't fail the main submission if email notification fails
    });

    return {
      success: true,
      data: {
        id: data.id,
        submitted_at: data.submitted_at,
      },
    };
  } catch (error) {
    console.error("Request access submission error:", error);
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    };
  }
}

/**
 * Get all request access submissions (for admin use)
 */
export async function getRequestAccessSubmissions(
  limit = 50,
  offset = 0
): Promise<{
  success: boolean;
  data?: Array<{
    id: string;
    name: string;
    email: string;
    submitted_at: string;
  }>;
  error?: string;
  total?: number;
}> {
  try {
    const { data, error, count } = await supabase
      .from("request_access")
      .select("*", { count: "exact" })
      .order("submitted_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error("Error fetching request access submissions:", error);
      return {
        success: false,
        error: "Failed to fetch submissions",
      };
    }

    return {
      success: true,
      data: data || [],
      total: count || 0,
    };
  } catch (error) {
    console.error("Get submissions error:", error);
    return {
      success: false,
      error: "An unexpected error occurred",
    };
  }
}
