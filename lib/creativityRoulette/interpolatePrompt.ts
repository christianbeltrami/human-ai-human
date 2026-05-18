const DEFAULT_TOPIC = "[paste your idea]";

export function normalizeTopic(topic?: string | null): string {
  return (topic ?? "").trim().replace(/\s+/g, " ").slice(0, 240);
}

export function interpolatePrompt(template: string, topic?: string | null): string {
  const safeTopic = normalizeTopic(topic) || DEFAULT_TOPIC;
  return template.replace(/\{\{topic\}\}/g, safeTopic);
}
