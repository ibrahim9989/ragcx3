/**
 * Google Analytics utility functions for event tracking
 */

// Define the window.gtag function type
declare global {
  interface Window {
    gtag: (
      command: string,
      action: string,
      params?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
  }
}

/**
 * Track a page view in Google Analytics
 * @param page_title - The title of the page
 * @param page_location - The URL of the page (defaults to window.location.href)
 * @param page_path - The path of the page (defaults to window.location.pathname)
 */
export const pageView = (
  page_title: string,
  page_location: string = window.location.href,
  page_path: string = window.location.pathname
) => {
  const pageViewParams = {
    page_title,
    page_location,
    page_path,
  };
  
  // Skip actual tracking in development mode
  const isDev = import.meta.env.DEV;
  
  if (isDev) {
    console.log(`Analytics Page View (DEV): ${page_title}`, pageViewParams);
    return;
  }
  
  // In production, send the page view to GA
  window.gtag('event', 'page_view', pageViewParams);
};

/**
 * Track an event in Google Analytics
 * @param action - The action name
 * @param category - The event category
 * @param label - The event label
 * @param value - The event value (optional)
 */
export const trackEvent = (
  action: string,
  category: string,
  label: string,
  value?: number
) => {
  const eventParams = {
    event_category: category,
    event_label: label,
    value: value,
  };
  
  // Skip actual tracking in development mode
  const isDev = import.meta.env.DEV;
  
  if (isDev) {
    console.log(`Analytics Event (DEV): ${action}`, eventParams);
    return;
  }
  
  // In production, send the event to GA
  window.gtag('event', action, eventParams);
};

/**
 * Track user engagement in Google Analytics
 * @param method - The engagement method (e.g., 'sign_up', 'login')
 */
export const trackUserEngagement = (method: string) => {
  const params = { method };
  
  // Skip actual tracking in development mode
  const isDev = import.meta.env.DEV;
  
  if (isDev) {
    console.log(`Analytics User Engagement (DEV): ${method}`, params);
    return;
  }
  
  // In production, send the engagement event to GA
  window.gtag('event', 'user_engagement', params);
};

/**
 * Track form submissions in Google Analytics
 * @param form_id - The ID of the form
 * @param form_name - The name of the form
 */
export const trackFormSubmission = (form_id: string, form_name: string) => {
  const params = { form_id, form_name };
  
  // Skip actual tracking in development mode
  const isDev = import.meta.env.DEV;
  
  if (isDev) {
    console.log(`Analytics Form Submission (DEV): ${form_name}`, params);
    return;
  }
  
  // In production, send the form submission event to GA
  window.gtag('event', 'form_submission', params);
};

/**
 * Initialize Google Analytics
 * @param measurementId - The Google Analytics measurement ID
 */
export const initGA = (measurementId: string) => {
  // Skip actual tracking in development mode
  const isDev = import.meta.env.DEV;
  
  if (isDev) {
    console.log(`Google Analytics initialized in development mode with ID: ${measurementId}`);
    return;
  }

  // In production, configure GA with the measurement ID
  window.gtag('config', measurementId);
  console.log(`Google Analytics initialized with ID: ${measurementId}`);
};

export default {
  pageView,
  trackEvent,
  trackUserEngagement,
  trackFormSubmission,
  initGA,
};