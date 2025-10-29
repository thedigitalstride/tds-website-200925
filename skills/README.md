# Skills Directory

This directory contains specialized skills for Claude Code that provide structured workflows and best practices for specific development tasks.

## What are Skills?

Skills are detailed guides that Claude Code uses to perform complex tasks following proven patterns. They combine:

- **Mandatory workflows** for tasks that benefit from systematic approaches
- **Checklists** that ensure no steps are missed
- **Project-specific patterns** that align with this codebase's conventions
- **Official documentation** from framework/tool authors
- **Troubleshooting guides** for common issues

## How to Use Skills

Skills are automatically detected and used by Claude Code when they match your task. You can also explicitly invoke a skill:

```bash
# Claude Code will automatically detect when a skill applies
# For example, working with Payload CMS will trigger the payload-cms skill
```

## Available Skills

### payload-cms

**File**: `payload-cms/SKILL.md`

**Use for**:
- Creating or modifying Payload CMS collections
- Adding/configuring fields in collections
- Implementing hooks for data processing
- Setting up access control rules
- Database schema changes and migrations
- Working with rich text, uploads, or relationships
- Configuring blocks for layout builder
- Troubleshooting Payload-related errors

**Key Features**:
- Comprehensive Payload CMS development guide
- Combines official Payload docs with project-specific patterns
- Mandatory checklists for complex tasks (creating collections, migrations)
- Guidelines for simpler tasks (hooks, access control)
- Integration with existing project documentation

**When to invoke**: Claude Code will automatically use this skill when working with Payload CMS files, configurations, or when you mention Payload-related tasks.

## Creating New Skills

To create a new skill:

1. **Create directory**: `skills/your-skill-name/`
2. **Create skill file**: `skills/your-skill-name/SKILL.md`
3. **Add frontmatter**:
   ```markdown
   ---
   name: your-skill-name
   description: Brief description of what this skill does and when to use it
   ---
   ```
4. **Structure content**:
   - Overview section explaining what the skill covers
   - "When to Use This Skill" section listing specific scenarios
   - Core concepts and principles
   - Critical rules (DO/DON'T lists)
   - Common tasks with step-by-step instructions
   - Troubleshooting section
   - Related documentation links

5. **Use checklists appropriately**:
   - For complex multi-step tasks that require TodoWrite tracking
   - For tasks where missing steps causes problems
   - For tasks with specific ordering requirements

6. **Update this README**: Add your new skill to the "Available Skills" section

## Skill Best Practices

### Writing Skills

- **Be specific**: Include exact file paths, command syntax, and code examples
- **Be comprehensive**: Cover both happy paths and error scenarios
- **Be practical**: Focus on common tasks and real-world usage
- **Be consistent**: Follow patterns from existing skills
- **Cross-reference**: Link to related documentation and other skills

### Using Checklists

**Use mandatory checklists for**:
- Multi-step processes where order matters
- Tasks with hidden gotchas or easy-to-miss steps
- Production-critical operations (migrations, deployments)
- Tasks requiring coordination between multiple systems

**Use guidelines/best practices for**:
- Simple tasks with few steps
- Tasks where approach varies based on context
- Reference information and examples

### Maintaining Skills

- **Update regularly**: Keep skills in sync with framework updates
- **Add learnings**: When you encounter an issue, document the solution
- **Test instructions**: Verify commands and examples actually work
- **Version-specific**: Note when instructions are specific to certain versions

## Skill Structure Template

```markdown
---
name: skill-name
description: Brief description (appears in skill listings)
---

<EXTREMELY_IMPORTANT>
Optional: Add mandatory workflow warnings here
</EXTREMELY_IMPORTANT>

# Skill Name

## What is [Technology/Pattern]?

Brief overview explaining the technology or pattern.

## When to Use This Skill

Bullet list of specific scenarios:
- Scenario 1
- Scenario 2
- Scenario 3

## Core Principles

Key concepts that guide all work in this area.

## Critical Rules

### ✅ DO:
- Rule 1
- Rule 2

### ❌ DON'T:
- Anti-pattern 1
- Anti-pattern 2

## Common Tasks

### TASK 1: Task Name [CHECKLIST or GUIDELINES]

For checklists:
**When you perform this task, you MUST use TodoWrite to track these steps:**

1. ☐ Step 1
2. ☐ Step 2
3. ☐ Step 3

For guidelines:
**Guidelines (No Mandatory Checklist):**

Overview and examples...

### TASK 2: Another Task

...

## Project-Specific Patterns

Patterns specific to this codebase.

## Troubleshooting

Common issues and solutions.

## Related Documentation

Links to other docs and resources.

## Quick Reference

Cheat sheet of common patterns.
```

## Contributing

To improve or add skills:

1. Test the skill thoroughly with Claude Code
2. Ensure examples are accurate and up-to-date
3. Add cross-references to related documentation
4. Update this README with any new skills
5. Consider creating a skill for any repetitive task that has "gotchas"

---

**Note**: Skills are most effective when they combine official documentation, project-specific patterns, and lessons learned from actual development work. Don't hesitate to add new skills for complex patterns in your codebase!
