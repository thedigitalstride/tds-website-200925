import type { PopulatedFAQ } from '@/blocks/AccordionBlock/types'
import { lexicalToPlainText } from './lexicalToPlainText'

/**
 * FAQPage schema structure for JSON-LD
 */
export interface FAQPageSchema {
  '@context': 'https://schema.org'
  '@type': 'FAQPage'
  mainEntity: QuestionSchema[]
}

/**
 * Question schema structure
 */
export interface QuestionSchema {
  '@type': 'Question'
  name: string
  acceptedAnswer: AnswerSchema
}

/**
 * Answer schema structure
 */
export interface AnswerSchema {
  '@type': 'Answer'
  text: string
}

/**
 * Generate Google FAQPage structured data (JSON-LD) from FAQ array
 *
 * Converts FAQs to FAQPage schema format following Google's requirements:
 * - Each Question must have a name (question text) and acceptedAnswer with text
 * - Answers are converted from Lexical rich text to plain text
 * - Invalid FAQs (empty question or answer) are skipped
 *
 * @param faqs - Array of populated FAQs
 * @returns FAQPage schema object or null if no valid FAQs
 */
export async function generateFAQSchema(
  faqs: PopulatedFAQ[],
): Promise<FAQPageSchema | null> {
  if (!faqs || faqs.length === 0) {
    return null
  }

  const questions: QuestionSchema[] = []

  for (const faq of faqs) {
    // Validate question
    if (!faq.question || typeof faq.question !== 'string' || faq.question.trim().length === 0) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`[FAQ Schema] Skipping FAQ with empty question (ID: ${faq.id})`)
      }
      continue
    }

    // Validate answer
    if (!faq.answer || typeof faq.answer !== 'object') {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`[FAQ Schema] Skipping FAQ with invalid answer (ID: ${faq.id})`)
      }
      continue
    }

    // Convert Lexical answer to plain text
    const answerText = lexicalToPlainText(faq.answer)

    // Skip if answer is empty after conversion
    if (!answerText || answerText.trim().length === 0) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`[FAQ Schema] Skipping FAQ with empty answer text (ID: ${faq.id})`)
      }
      continue
    }

    // Build question schema
    const question: QuestionSchema = {
      '@type': 'Question',
      name: faq.question.trim(),
      acceptedAnswer: {
        '@type': 'Answer',
        text: answerText,
      },
    }

    questions.push(question)
  }

  // Return null if no valid questions
  if (questions.length === 0) {
    return null
  }

  // Build FAQPage schema
  const schema: FAQPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions,
  }

  return schema
}

