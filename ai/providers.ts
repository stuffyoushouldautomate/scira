import { wrapLanguageModel, customProvider, extractReasoningMiddleware } from 'ai';

import { openai, createOpenAI } from '@ai-sdk/openai';
import { xai } from '@ai-sdk/xai';
import { groq } from '@ai-sdk/groq';
import { anthropic } from '@ai-sdk/anthropic';
import { google } from '@ai-sdk/google';
import { mistral } from '@ai-sdk/mistral';

const middleware = extractReasoningMiddleware({
  tagName: 'think',
});

const huggingface = createOpenAI({
  baseURL: 'https://router.huggingface.co/v1',
  apiKey: process.env.HF_TOKEN,
});

export const scira = customProvider({
  languageModels: {
    'scira-default': xai('grok-3-mini'),
    'scira-nano': groq('llama-3.3-70b-versatile'),
    'scira-grok-3': xai('grok-3-fast'),
    'scira-grok-4': xai('grok-4'),
    'scira-gpt-oss-120': wrapLanguageModel({
      model: groq('openai/gpt-oss-120b'),
      middleware,
    }),
    'scira-gpt-oss-20': wrapLanguageModel({
      model: groq('openai/gpt-oss-20b'),
      middleware,
    }),
    'scira-5-nano': openai.responses('gpt-5-nano'),
    'scira-5-mini': openai.responses('gpt-5-mini'),
    'scira-5': openai.responses('gpt-5'),
    'scira-5-high': openai.responses('gpt-5'),
    'scira-qwen-32b': wrapLanguageModel({
      model: groq('qwen/qwen3-32b'),
      middleware,
    }),
    'scira-qwen-coder': huggingface.chat('Qwen/Qwen3-Coder-480B-A35B-Instruct:cerebras'),
    'scira-deepseek-v3': wrapLanguageModel({
      model: huggingface.chat('deepseek-ai/DeepSeek-V3-0324:fireworks-ai'),
      middleware,
    }),
    'scira-glm': wrapLanguageModel({
      model: huggingface.chat('zai-org/GLM-4.5:fireworks-ai'),
      middleware,
    }),
    'scira-glm-air': huggingface.chat('zai-org/GLM-4.5-Air:fireworks-ai'),
    'scira-qwen-235': huggingface.chat('Qwen/Qwen3-235B-A22B-Instruct-2507:fireworks-ai'),
    'scira-kimi-k2': groq('moonshotai/kimi-k2-instruct'),
    'scira-haiku': anthropic('claude-3-5-haiku-20241022'),
    'scira-mistral': mistral('mistral-small-latest'),
    'scira-mistral-medium': mistral('mistral-medium-2508'),
  },
});

interface Model {
  value: string;
  label: string;
  description: string;
  vision: boolean;
  reasoning: boolean;
  experimental: boolean;
  category: string;
  pdf: boolean;
  pro: boolean;
  requiresAuth: boolean;
  freeUnlimited: boolean;
  maxOutputTokens: number;
  requiredApiKey?: string; // Add this field to track which API key is needed
}

// Define all possible models with their required API keys
const allModels: Model[] = [
  // Free Unlimited Models (xAI)
  {
    value: 'scira-default',
    label: 'Grok 3 Mini',
    description: "xAI's most efficient reasoning LLM.",
    vision: false,
    reasoning: true,
    experimental: false,
    category: 'Mini',
    pdf: false,
    pro: false,
    requiresAuth: false,
    freeUnlimited: false,
    maxOutputTokens: 16000,
    requiredApiKey: 'XAI_API_KEY',
  },
  {
    value: 'scira-grok-3',
    label: 'Grok 3',
    description: "xAI's recent smartest LLM",
    vision: false,
    reasoning: false,
    experimental: false,
    category: 'Pro',
    pdf: false,
    pro: false,
    requiresAuth: true,
    freeUnlimited: false,
    maxOutputTokens: 16000,
    requiredApiKey: 'XAI_API_KEY',
  },
  {
    value: 'scira-grok-4',
    label: 'Grok 4',
    description: "xAI's most intelligent vision LLM",
    vision: true,
    reasoning: true,
    experimental: false,
    category: 'Pro',
    pdf: false,
    pro: false,
    requiresAuth: true,
    freeUnlimited: false,
    maxOutputTokens: 16000,
    requiredApiKey: 'XAI_API_KEY',
  },

  // Mini Models (Free/Paid)
  {
    value: 'scira-mistral',
    label: 'Mistral Small',
    description: "Mistral's small LLM",
    vision: true,
    reasoning: false,
    experimental: false,
    category: 'Mini',
    pdf: true,
    pro: false,
    requiresAuth: true,
    freeUnlimited: false,
    maxOutputTokens: 128000,
    requiredApiKey: 'MISTRAL_API_KEY',
  },
  {
    value: 'scira-5-nano',
    label: 'Bulldozer Nano',
    description: "OpenAI's latest flagship nano LLM - Perfect for quick research",
    vision: true,
    reasoning: false,
    experimental: false,
    category: 'Mini',
    pdf: true,
    pro: false,
    requiresAuth: true,
    freeUnlimited: false,
    maxOutputTokens: 128000,
    requiredApiKey: 'OPENAI_API_KEY',
  },
  {
    value: 'scira-5-mini',
    label: 'Bulldozer Mini',
    description: "OpenAI's latest flagship mini LLM - Great for detailed analysis",
    vision: true,
    reasoning: true,
    experimental: false,
    category: 'Mini',
    pdf: true,
    pro: false,
    requiresAuth: true,
    freeUnlimited: false,
    maxOutputTokens: 128000,
    requiredApiKey: 'OPENAI_API_KEY',
  },
  {
    value: 'scira-5',
    label: 'Bulldozer Pro',
    description: "OpenAI's latest flagship LLM - Expert-level research and insights",
    vision: true,
    reasoning: true,
    experimental: false,
    category: 'Pro',
    pdf: true,
    pro: false,
    requiresAuth: true,
    freeUnlimited: false,
    maxOutputTokens: 128000,
    requiredApiKey: 'OPENAI_API_KEY',
  },
  {
    value: 'scira-5-high',
    label: 'Bulldozer Max',
    description: "OpenAI's latest flagship high LLM - Maximum power for complex research",
    vision: true,
    reasoning: true,
    experimental: false,
    category: 'Pro',
    pdf: true,
    pro: false,
    requiresAuth: true,
    freeUnlimited: false,
    maxOutputTokens: 128000,
    requiredApiKey: 'OPENAI_API_KEY',
  },
  {
    value: 'scira-qwen-32b',
    label: 'Qwen 3 32B',
    description: "Qwen's efficient 32B model",
    vision: false,
    reasoning: false,
    experimental: false,
    category: 'Mini',
    pdf: false,
    pro: false,
    requiresAuth: true,
    freeUnlimited: false,
    maxOutputTokens: 8000,
    requiredApiKey: 'GROQ_API_KEY',
  },
  {
    value: 'scira-gpt-oss-120',
    label: 'OpenAI GPT OSS 120b',
    description: "OpenAI's advanced OSS LLM",
    vision: false,
    reasoning: true,
    experimental: false,
    category: 'Pro',
    pdf: false,
    pro: false,
    requiresAuth: true,
    freeUnlimited: false,
    maxOutputTokens: 8000,
    requiredApiKey: 'GROQ_API_KEY',
  },
  {
    value: 'scira-gpt-oss-20',
    label: 'OpenAI GPT OSS 20b',
    description: "OpenAI's efficient OSS LLM",
    vision: false,
    reasoning: true,
    experimental: false,
    category: 'Pro',
    pdf: false,
    pro: false,
    requiresAuth: true,
    freeUnlimited: false,
    maxOutputTokens: 8000,
    requiredApiKey: 'GROQ_API_KEY',
  },
  {
    value: 'scira-google',
    label: 'Gemini 2.5 Flash',
    description: "Google's advanced small LLM",
    vision: true,
    reasoning: false,
    experimental: false,
    category: 'Pro',
    pdf: true,
    pro: false,
    requiresAuth: true,
    freeUnlimited: false,
    maxOutputTokens: 10000,
    requiredApiKey: 'GOOGLE_GENERATIVE_AI_API_KEY',
  },
  {
    value: 'scira-google-pro',
    label: 'Gemini 2.5 Pro',
    description: "Google's most advanced LLM",
    vision: true,
    reasoning: false,
    experimental: false,
    category: 'Pro',
    pdf: true,
    pro: false,
    requiresAuth: true,
    freeUnlimited: false,
    maxOutputTokens: 10000,
    requiredApiKey: 'GOOGLE_GENERATIVE_AI_API_KEY',
  },
  {
    value: 'scira-glm',
    label: 'GLM 4.5',
    description: "Zhipu AI's advanced base LLM",
    vision: false,
    reasoning: true,
    experimental: false,
    category: 'Pro',
    pdf: false,
    pro: false,
    requiresAuth: true,
    freeUnlimited: false,
    maxOutputTokens: 13000,
    requiredApiKey: 'HF_TOKEN',
  },
  {
    value: 'scira-glm-air',
    label: 'GLM 4.5 Air',
    description: "Zhipu AI's efficient LLM",
    vision: false,
    reasoning: false,
    experimental: false,
    category: 'Mini',
    pdf: false,
    pro: false,
    requiresAuth: true,
    freeUnlimited: false,
    maxOutputTokens: 8000,
    requiredApiKey: 'HF_TOKEN',
  },
  {
    value: 'scira-qwen-235',
    label: 'Qwen 3 235B',
    description: "Qwen's largest model",
    vision: false,
    reasoning: false,
    experimental: false,
    category: 'Pro',
    pdf: false,
    pro: false,
    requiresAuth: true,
    freeUnlimited: false,
    maxOutputTokens: 8000,
    requiredApiKey: 'HF_TOKEN',
  },
  {
    value: 'scira-kimi-k2',
    label: 'Kimi K2',
    description: "Moonshot AI's K2 model",
    vision: false,
    reasoning: false,
    experimental: false,
    category: 'Mini',
    pdf: false,
    pro: false,
    requiresAuth: true,
    freeUnlimited: false,
    maxOutputTokens: 8000,
    requiredApiKey: 'GROQ_API_KEY',
  },
  {
    value: 'scira-haiku',
    label: 'Claude 3.5 Haiku',
    description: "Anthropic's efficient Claude model",
    vision: false,
    reasoning: false,
    experimental: false,
    category: 'Mini',
    pdf: false,
    pro: false,
    requiresAuth: true,
    freeUnlimited: false,
    maxOutputTokens: 8000,
    requiredApiKey: 'ANTHROPIC_API_KEY',
  },
  {
    value: 'scira-mistral-medium',
    label: 'Mistral Medium',
    description: "Mistral's medium LLM",
    vision: true,
    reasoning: false,
    experimental: false,
    category: 'Pro',
    pdf: false,
    pro: false,
    requiresAuth: true,
    freeUnlimited: false,
    maxOutputTokens: 8000,
    requiredApiKey: 'MISTRAL_API_KEY',
  },
  {
    value: 'scira-llama-4',
    label: 'Llama 4 Maverick',
    description: "Meta's latest LLM",
    vision: true,
    reasoning: false,
    experimental: true,
    category: 'Experimental',
    pdf: false,
    pro: false,
    requiresAuth: false,
    freeUnlimited: false,
    maxOutputTokens: 8000,
    requiredApiKey: 'GROQ_API_KEY',
  },
];

// Function to check if an API key is available
function isApiKeyAvailable(apiKeyName: string | undefined): boolean {
  if (!apiKeyName) return true; // No API key required
  
  const apiKey = process.env[apiKeyName];
  return Boolean(apiKey && apiKey.trim() !== '' && apiKey !== 'placeholder');
}

// Function to get available models based on API keys
export function getAvailableModels(): Model[] {
  return allModels.filter(model => {
    // If no API key is required, always include
    if (!model.requiredApiKey) return true;
    
    // Check if the required API key is available
    return isApiKeyAvailable(model.requiredApiKey);
  });
}

// Export the filtered models array
export const models: Model[] = getAvailableModels();

// Helper functions for model access checks
export function getModelConfig(modelValue: string) {
  return models.find((model) => model.value === modelValue);
}

export function requiresAuthentication(modelValue: string): boolean {
  const model = getModelConfig(modelValue);
  return model?.requiresAuth || false;
}

export function requiresProSubscription(modelValue: string): boolean {
  const model = getModelConfig(modelValue);
  return model?.pro || false;
}

export function isFreeUnlimited(modelValue: string): boolean {
  const model = getModelConfig(modelValue);
  return model?.freeUnlimited || false;
}

export function hasVisionSupport(modelValue: string): boolean {
  const model = getModelConfig(modelValue);
  return model?.vision || false;
}

export function hasPdfSupport(modelValue: string): boolean {
  const model = getModelConfig(modelValue);
  return model?.pdf || false;
}

export function hasReasoningSupport(modelValue: string): boolean {
  const model = getModelConfig(modelValue);
  return model?.reasoning || false;
}

export function isExperimentalModel(modelValue: string): boolean {
  const model = getModelConfig(modelValue);
  return model?.experimental || false;
}

export function getMaxOutputTokens(modelValue: string): number {
  const model = getModelConfig(modelValue);
  return model?.maxOutputTokens || 8000;
}

// Access control helper
export function canUseModel(modelValue: string, user: any, isProUser: boolean): { canUse: boolean; reason?: string } {
  const model = getModelConfig(modelValue);

  if (!model) {
    return { canUse: false, reason: 'Model not found' };
  }

  // Check if model requires authentication
  if (model.requiresAuth && !user) {
    return { canUse: false, reason: 'authentication_required' };
  }

  // All models are now free - no pro subscription required
  return { canUse: true };
}

// Helper to check if user should bypass rate limits
export function shouldBypassRateLimits(modelValue: string, user: any): boolean {
  const model = getModelConfig(modelValue);
  return Boolean(user && model?.freeUnlimited);
}

// Get acceptable file types for a model
export function getAcceptedFileTypes(modelValue: string, isProUser: boolean): string {
  const model = getModelConfig(modelValue);
  // Since all models are free, allow PDF for authenticated users regardless of pro status
  if (model?.pdf && isProUser !== undefined) {
    return 'image/*,.pdf';
  }
  return 'image/*';
}

// Legacy arrays for backward compatibility (deprecated - use helper functions instead)
export const authRequiredModels = models.filter((m) => m.requiresAuth).map((m) => m.value);
export const proRequiredModels: string[] = []; // No pro models anymore
export const freeUnlimitedModels = models.filter((m) => m.freeUnlimited).map((m) => m.value);
